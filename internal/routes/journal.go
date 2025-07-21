package routes

import (
	"emospaces-backend/internal/handler"
	"github.com/gin-gonic/gin"
)

func RegisterJournalRoutes(r *gin.RouterGroup, h *handler.JournalHandler) {
	journal := r.Group("/journals")
	{
		journal.POST("/", h.CreateJournal)
		journal.GET("/", h.GetJournals)
		journal.GET("/:id", h.GetJournalDetail)
		journal.PUT("/:id", h.UpdateJournal)
		journal.DELETE("/:id", h.DeleteJournal)
	}
}
