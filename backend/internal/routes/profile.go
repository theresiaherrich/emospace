package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterUserRoutes(rg *gin.RouterGroup, userHandler *handler.UserHandler) {
	user := rg.Group("/user")
	user.Use(middleware.JWTMiddleware())

	user.GET("/profile", userHandler.GetProfile)
	user.PUT("/profile", userHandler.UpdateProfile)
}
