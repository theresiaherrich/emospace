package models

import (
	"time"
)

type ChatStage struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"index"`
	Stage     int       
	Mood      string
	LastInput string
	CreatedAt time.Time
}
