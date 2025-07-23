package models

import "time"

type Consultan struct {
	ID         uint      `gorm:"primaryKey"`
	UserID     uint      `gorm:"not null"`
	Name       string    `gorm:"not null"`
	Title      string    `gorm:"not null"`
	Speciality string    `gorm:"not null"`
	Experience int       `gorm:"not null"`
	Rating     float64       `gorm:"not null"`
	Price      int       `gorm:"not null"`
	ImageURL   string    `gorm:"not null"`
	CreatedAt  time.Time
	UpdatedAt  time.Time
}
