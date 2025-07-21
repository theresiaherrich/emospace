package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name           string     `json:"name"`
	Username       string     `json:"username" gorm:"unique"`
	Email          string     `json:"email" gorm:"unique"`
	Password       string     `json:"password"`
	Phone          string     `json:"phone"`
	Gender         string     `json:"gender"`
	BirthDate      string     `json:"birth_date"`
	IsPremium      bool       `json:"is_premium" gorm:"default:false"`
	ProfilePicture string     `json:"profile_picture"`
	PremiumUntil   *time.Time `json:"premium_until"`
	Role           string     `json:"role" gorm:"default:'user'"`
	FCMToken       string     `json:"fcm_token"`
}
