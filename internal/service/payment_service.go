
package service

import (
	"emospaces-backend/internal/repository"
	"emospaces-backend/pkg/midtrans"
	"errors"
	"fmt"
	"strings"
	"time"
)

type PaymentService interface {
	GenerateSnapTokenFromPlan(userID uint, planID uint) (string, string, error)
	HandleMidtransCallback(payload map[string]interface{}) error
}

type paymentService struct {
	userRepo repository.UserRepository
	planRepo repository.PlanRepository
}

func NewPaymentService(userRepo repository.UserRepository, planRepo repository.PlanRepository) PaymentService {
	return &paymentService{
		userRepo: userRepo,
		planRepo: planRepo,
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
	orderID := payload["order_id"].(string)
	status := payload["transaction_status"].(string)

	if status != "settlement" {
		return nil
	}

	parts := strings.Split(orderID, "-")
	if len(parts) < 3 {
		return errors.New("invalid order id")
	}

	planID := parts[1]
	userID := parts[2]

	var uid, pid uint
	fmt.Sscanf(userID, "%d", &uid)
	fmt.Sscanf(planID, "%d", &pid)

	plan, err := s.planRepo.FindByID(pid)
	if err != nil {
		return err
	}

	expiredAt := time.Now().AddDate(0, 0, plan.Duration)
	return s.userRepo.SetPremiumWithDuration(uid, expiredAt)
}
