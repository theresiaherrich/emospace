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
	GenerateSnapTokenForConsultan(userID, consultanID uint) (string, string, error)
	UpdateTransactionStatus(orderID string, status string) error
	
}

type paymentService struct {
	userRepo      repository.UserRepository
	planRepo      repository.PlanRepository
	txRepo        repository.TransactionRepository
	consultanRepo repository.ConsultanRepository
}

func NewPaymentService(userRepo repository.UserRepository, planRepo repository.PlanRepository, txRepo repository.TransactionRepository, consultanRepo repository.ConsultanRepository) PaymentService {
	return &paymentService{
		userRepo:      userRepo,
		planRepo:      planRepo,
		txRepo:        txRepo,
		consultanRepo: consultanRepo,
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

	grossAmountStr, ok := payload["gross_amount"].(string)
	if !ok {
		return errors.New("invalid or missing gross_amount in payload")
	}

	log.Println("[Midtrans Callback] order_id:", rawOrderID)
	log.Println("[Midtrans Callback] transaction_status:", status)

	if status != "settlement" {
		log.Println("[Midtrans Callback] Payment not settled, ignoring")
		return nil
	}

	parts := strings.Split(rawOrderID, "-")
	if len(parts) < 4 {
		return fmt.Errorf("invalid order_id format: %s", rawOrderID)
	}

	switch parts[0] {
	case "PREMIUM":
		return s.handlePremiumPayment(parts, rawOrderID, status, grossAmountStr)
	case "CONSULTAN":
		return s.handleConsultationPayment(parts, rawOrderID, status, grossAmountStr)
	default:
		return fmt.Errorf("unknown order prefix: %s", parts[0])
	}
}

func (s *paymentService) handlePremiumPayment(parts []string, rawOrderID, status, grossAmountStr string) error {
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

	var grossAmount float64
	fmt.Sscanf(grossAmountStr, "%f", &grossAmount)

	expiredAt := time.Now().AddDate(0, 0, plan.Duration)
	err = s.userRepo.SetPremiumWithDuration(userID, expiredAt)
	if err != nil {
		return fmt.Errorf("failed to update premium status: %v", err)
	}

	transaction := &models.Transaction{
		UserID:    userID,
		PlanID:    &planID,
		OrderID:   rawOrderID,
		Amount:    int64(grossAmount),
		Status:    status,
		ExpiredAt: &expiredAt,
		CreatedAt: time.Now(),
	}
	if err := s.txRepo.Create(transaction); err != nil {
		log.Println("Gagal menyimpan transaksi:", err)
	}

	log.Printf("[Midtrans Callback] Premium activated for user %d until %s\n", userID, expiredAt.Format(time.RFC3339))
	return nil
}

func (s *paymentService) handleConsultationPayment(parts []string, rawOrderID, status, grossAmountStr string) error {
	var (
		consultanID uint
		userID      uint
	)
	_, err := fmt.Sscanf(parts[1], "%d", &consultanID)
	if err != nil {
		return fmt.Errorf("failed to parse consultanID: %v", err)
	}
	_, err = fmt.Sscanf(parts[2], "%d", &userID)
	if err != nil {
		return fmt.Errorf("failed to parse userID: %v", err)
	}

	var grossAmount float64
	fmt.Sscanf(grossAmountStr, "%f", &grossAmount)

	transaction := &models.Transaction{
		UserID:      userID,
		ConsultanID: &consultanID,
		OrderID:     rawOrderID,
		Amount:      int64(grossAmount),
		Status:      status,
		CreatedAt:   time.Now(),
	}
	if err := s.txRepo.Create(transaction); err != nil {
		log.Println("Gagal menyimpan transaksi konsultasi:", err)
	}

	err = s.consultanRepo.CreateAccess(userID, consultanID)
	if err != nil {
		log.Println("Gagal memberikan akses konsultasi:", err)
		return err
	}

	log.Printf("[Midtrans Callback] Consultation access granted: user=%d consultan=%d\n", userID, consultanID)
	return nil
}

func (s *paymentService) GetUserTransactions(userID uint) ([]models.Transaction, error) {
	return s.txRepo.FindByUserID(userID)
}

func (s *paymentService) GetAllTransactions() ([]models.Transaction, error) {
	return s.txRepo.FindAll()
}

func (s *paymentService) GenerateSnapTokenForConsultan(userID uint, consultanID uint) (string, string, error) {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return "", "", err
	}

	consultan, err := s.consultanRepo.FindByID(consultanID)
	if err != nil {
		return "", "", err
	}

	harga := int64(consultan.Price)
	orderID := fmt.Sprintf("CONSULTAN-%d-%d-%d", consultanID, user.ID, time.Now().Unix())

	token, redirectURL, err := midtrans.CreateSnapTransaction(orderID, user.ID, harga, user.Name, user.Email)
	if err != nil {
		return "", "", err
	}

	return token, redirectURL, nil
}

func (s *paymentService) UpdateTransactionStatus(orderID string, status string) error {
	return s.txRepo.UpdateTransactionStatus(orderID, status)
}
