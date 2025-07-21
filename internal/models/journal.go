package models

import "time"

type Journal struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint
	Title     string
	Content   string
	ImageURL  string    `gorm:"type:text"`
	Date      time.Time
	CreatedAt time.Time
	UpdatedAt time.Time
}
