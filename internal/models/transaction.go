package models

import (
	"time"
)

type Transaction struct {
	ID          uint       `gorm:"primaryKey" json:"id"`
	UserID      uint       `json:"user_id"`
	PlanID      *uint      `gorm:"type:varchar(255);uniqueIndex" json:"plan_id"`
	ConsultanID *uint      `gorm:"type:varchar(255);uniqueIndex" json:"consultan_id"`
	OrderID     string     `json:"order_id"`
	Amount      int64      `json:"amount"`
	Status      string     `json:"status"`
	ExpiredAt   *time.Time `json:"expired_at"`
	CreatedAt   time.Time  `json:"created_at"`
}
