package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterJournalRoutes(r *gin.RouterGroup, h *handler.JournalHandler) {
	journal := r.Group("/journals")
	journal.Use(middleware.JWTMiddleware())
	{
		journal.POST("/", h.CreateJournal)
		journal.GET("/", h.GetJournalDetail)
		journal.PUT("/:id", h.UpdateJournal)
		journal.DELETE("/:id", h.DeleteJournal)

		journal.GET("/all", middleware.RequireRole("admin"), h.GetJournals)
	}
}
