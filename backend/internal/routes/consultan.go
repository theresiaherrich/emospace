package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterConsultanRoutes(r *gin.RouterGroup, h *handler.ConsultanHandler) {
	consultanGroup := r.Group("/consultans")

	consultanGroup.GET("", h.GetAll)
	consultanGroup.GET("/:id", h.GetByID)

	adminConsultan := consultanGroup.Use(middleware.JWTMiddleware(), middleware.RequireRole("admin"))
	{
		adminConsultan.POST("", h.Create)
		adminConsultan.PUT("/:id", h.Update)
		adminConsultan.DELETE("/:id", h.Delete)
	}
}
