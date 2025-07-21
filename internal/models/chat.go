package models

import "time"

type ChatLog struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"index"`
	UserName  string    `gorm:"index"`
	Mood      string
	UserInput string
	AIOutput  string
	Stage     int       `gorm:"default:1"`
	CreatedAt time.Time
}
