package models

import "time"

type Mood struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `gorm:"uniqueIndex:idx_user_date"` 
	Date      time.Time `gorm:"uniqueIndex:idx_user_date"` 
	MoodCode  string    `gorm:"not null"` // contoh: "MOOD_HAPPY"
	CreatedAt time.Time
}
