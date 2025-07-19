package models

import (
	"time"
)

type Transaction struct {
	ID         uint      `gorm:"primaryKey"`
	UserID     uint
	PlanID     uint
	OrderID    string    `gorm:"uniqueIndex"`
	Amount     int64
	Status     string
	ExpiredAt  time.Time
	CreatedAt  time.Time
}
