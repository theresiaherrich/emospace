package models

import "time"

type ConsultanAccess struct {
	ID           uint `gorm:"primaryKey"`
	UserID       uint
	ConsultanID  uint
	CreatedAt    time.Time
}
