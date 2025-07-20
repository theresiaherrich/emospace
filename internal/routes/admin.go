package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterAdminRoutes(rg *gin.RouterGroup, userHandler *handler.UserHandler) {
	admin := rg.Group("/admin")
	admin.Use(middleware.JWTMiddleware(), middleware.RequireRole("admin"))
	{
		admin.GET("/users", userHandler.GetAllUsers)
	}
}

