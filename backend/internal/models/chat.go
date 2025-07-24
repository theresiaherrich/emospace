package models

import "time"

type ChatLog struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"index"`
	UserName  string    `gorm:"index"`
	Mood      string
	UserInput string    `gorm:"type:text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
	AIOutput  string    `gorm:"type:text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"`
	CreatedAt time.Time
}
