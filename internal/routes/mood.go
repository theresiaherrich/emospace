package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterMoodRoutes(r *gin.RouterGroup, moodHandler *handler.MoodHandler) {
	mood := r.Group("/mood")
	mood.Use(middleware.JWTMiddleware())
	{
		mood.POST("/", moodHandler.SetMood)
		mood.GET("/monthly", moodHandler.GetMonthlyMood)
		mood.GET("/summary", moodHandler.GetMoodSummary)
	}
}
