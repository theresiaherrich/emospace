package routes

import (
	"emospaces-backend/internal/handler"
	"github.com/gin-gonic/gin"
	"emospaces-backend/middleware"
)

func RegisterAuthRoutes(r *gin.RouterGroup, authHandler *handler.AuthHandler) {
	r.POST("/register", authHandler.Register)
	r.POST("/login", authHandler.Login)
	r.POST("/forgot-password", authHandler.ForgotPassword)
	r.POST("/reset-password", authHandler.ResetPassword)
	r.POST("/fcm-token", middleware.JWTMiddleware(), authHandler.UpdateFCMToken)
}
