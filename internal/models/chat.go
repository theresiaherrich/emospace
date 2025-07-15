package models

import "time"

type ChatLog struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"index"`
	UserName  string    `gorm:"index"`
	Mood      string
	UserInput string
	AIOutput  string
	CreatedAt time.Time
}
