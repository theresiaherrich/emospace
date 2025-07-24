package handler

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type JournalHandler struct {
	Service service.JournalService
}

func NewJournalHandler(service service.JournalService) *JournalHandler {
	return &JournalHandler{Service: service}
}

func (h *JournalHandler) CreateJournal(c *gin.Context) {
	var req dto.CreateJournalRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetUint("user_id")

	err := h.Service.CreateJournal(userID, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create journal"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Journal created successfully"})
}


func (h *JournalHandler) GetJournals(c *gin.Context) {
	userID := c.GetUint("user_id")
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user token"})
		return
	}

	journals, err := h.Service.GetJournals(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch journals"})
		return
	}
	c.JSON(http.StatusOK, journals)
}

func (h *JournalHandler) GetJournalDetail(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid journal ID"})
		return
	}

	journal, err := h.Service.GetJournalDetail(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Journal not found"})
		return
	}
	c.JSON(http.StatusOK, journal)
}

func (h *JournalHandler) UpdateJournal(c *gin.Context) {
	var req dto.CreateJournalRequest
	if err := c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	userID := c.GetUint("user_id")

	err := h.Service.UpdateJournal(userID, uint(id), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update journal"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Journal updated"})
}

func (h *JournalHandler) DeleteJournal(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	userID := c.GetUint("user_id")

	err := h.Service.DeleteJournal(userID, uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete journal"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Journal deleted"})
}
