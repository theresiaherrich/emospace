package service

import (
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/pkg/midtrans"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"
)

type PaymentService interface {
	GenerateSnapTokenFromPlan(userID uint, planID uint) (string, string, error)
	HandleMidtransCallback(payload map[string]interface{}) error
	GetUserTransactions(userID uint) ([]models.Transaction, error)
    GetAllTransactions() ([]models.Transaction, error)
}

type paymentService struct {
	userRepo repository.UserRepository
	planRepo repository.PlanRepository
	txRepo   repository.TransactionRepository
}

func NewPaymentService(userRepo repository.UserRepository, planRepo repository.PlanRepository, txRepo repository.TransactionRepository) PaymentService {
    return &paymentService{
        userRepo: userRepo,
        planRepo: planRepo,
        txRepo:   txRepo,
    }
}

func (s *paymentService) GenerateSnapTokenFromPlan(userID uint, planID uint) (string, string, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return "", "", err
	}

	plan, err := s.planRepo.FindByID(planID)
	if err != nil {
		return "", "", err
	}

	orderID := fmt.Sprintf("PREMIUM-%d-%d-%d", plan.ID, user.ID, time.Now().Unix())
	amount := plan.Price

	token, redirectURL, err := midtrans.CreateSnapTransaction(orderID, user.ID, amount, user.Name, user.Email)
	if err != nil {
		return "", "", err
	}

	return token, redirectURL, nil
}

func (s *paymentService) HandleMidtransCallback(payload map[string]interface{}) error {
	log.Println("[Midtrans Callback] Payload:", payload)

	rawOrderID, ok := payload["order_id"].(string)
	if !ok {
		return errors.New("invalid or missing order_id in payload")
	}

	status, ok := payload["transaction_status"].(string)
	if !ok {
		return errors.New("invalid or missing transaction_status in payload")
	}

	log.Println("[Midtrans Callback] order_id:", rawOrderID)
	log.Println("[Midtrans Callback] transaction_status:", status)

	if status != "settlement" {
		log.Println("[Midtrans Callback] Payment not settled, ignoring")
		return nil
	}

	parts := strings.Split(rawOrderID, "-")
	if len(parts) < 4 || parts[0] != "PREMIUM" {
		return errors.New("invalid order_id format")
	}

	var (
		planID uint
		userID uint
	)

	_, err := fmt.Sscanf(parts[1], "%d", &planID)
	if err != nil {
		return fmt.Errorf("failed to parse planID: %v", err)
	}
	_, err = fmt.Sscanf(parts[2], "%d", &userID)
	if err != nil {
		return fmt.Errorf("failed to parse userID: %v", err)
	}

	plan, err := s.planRepo.FindByID(planID)
	if err != nil {
		return fmt.Errorf("plan not found: %v", err)
	}

	expiredAt := time.Now().AddDate(0, 0, plan.Duration)
	err = s.userRepo.SetPremiumWithDuration(userID, expiredAt)
	if err != nil {
		return fmt.Errorf("failed to update premium status: %v", err)
	}

	log.Printf("[Midtrans Callback] Premium activated for user %d until %s\n", userID, expiredAt.Format(time.RFC3339))
	return nil
}

func (s *paymentService) GetUserTransactions(userID uint) ([]models.Transaction, error) {
    return s.txRepo.FindByUserID(userID)
}

func (s *paymentService) GetAllTransactions() ([]models.Transaction, error) {
    return s.txRepo.FindAll()
}

