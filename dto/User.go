package dto

import "time"

type RegisterInput struct {
	Name            string `json:"name" binding:"required"`
	Username        string `json:"username" binding:"required"`
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required,min=6"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
	Gender          string `json:"gender" binding:"required"`
	BirthDate       string `json:"birth_date" binding:"required"`
	AgreeToTerms    bool   `json:"agree_to_terms" binding:"required"`
}

type LoginRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FCMToken  string `json:"fcm_token"`
}

type LoginInput struct {
	Identifier string `json:"identifier" binding:"required"`
	Password   string `json:"password" binding:"required"`
	RememberMe bool   `json:"remember_me"`
}

type UserProfileResponse struct {
	ID               uint       `json:"id"`
	Name             string     `json:"name"`
	Username         string     `json:"username"`
	Email            string     `json:"email"`
	Phone            string     `json:"phone"`
	Gender           string     `json:"gender"`
	BirthDate        string     `json:"birth_date"`
	ProfilePicture   string     `json:"profile_picture"`
	IsPremium        bool       `json:"is_premium"`
	PremiumUntil     *time.Time `json:"premium_until,omitempty"`
}
