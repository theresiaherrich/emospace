package dto

type SaveTokenRequest struct {
	Token string `json:"token" binding:"required"`
}

type UpdateFCMTokenRequest struct {
	FCMToken string `json:"fcm_token" binding:"required"`
}