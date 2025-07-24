package dto

type AIUserInput struct {
	Message string `json:"message" binding:"required"`
}

type AIResponseDTO struct {
	Response string `json:"response"`
}