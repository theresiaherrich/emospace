package dto

import "time"

type TransactionResponse struct {
	OrderID    string    `json:"order_id"`
	PlanID     uint      `json:"plan_id"`
	Amount     int64     `json:"amount"`
	Status     string    `json:"status"`
	ExpiredAt  time.Time `json:"expired_at"`
	CreatedAt  time.Time `json:"created_at"`
}
