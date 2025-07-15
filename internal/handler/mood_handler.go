package handler

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/service"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type MoodHandler struct {
	Service service.MoodService
}

func NewMoodHandler(service service.MoodService) *MoodHandler {
	return &MoodHandler{Service: service}
}

func (h *MoodHandler) SetMood(c *gin.Context) {
	var req dto.MoodRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mood code diperlukan"})
		return
	}

	userID := c.GetUint("user_id")
	if err := h.Service.SetMood(userID, req.MoodCode); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan mood"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Mood berhasil disimpan"})
}

func (h *MoodHandler) GetMonthlyMood(c *gin.Context) {
	userID := c.GetUint("user_id")
	monthStr := c.Query("month") // e.g. 2025-07
	month, err := time.Parse("2006-01", monthStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format bulan salah. Gunakan format YYYY-MM"})
		return
	}

	data, err := h.Service.GetMonthlyMood(userID, month)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data mood"})
		return
	}

	c.JSON(http.StatusOK, data)
}

func (h *MoodHandler) GetMoodSummary(c *gin.Context) {
	userID := c.GetUint("user_id")
	monthStr := c.Query("month") // format YYYY-MM
	month, err := time.Parse("2006-01", monthStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Format bulan salah. Gunakan format YYYY-MM",
		})
		return
	}

	summary, err := h.Service.GenerateMoodSummary(userID, month)
	if err != nil {
		fmt.Println("[Handler] Summary error:", err)
		c.JSON(http.StatusBadGateway, gin.H{
			"summary": "Maaf, kami sedang kesulitan merangkai ringkasan untukmu saat ini. Tapi ingat, perasaanmu tetap valid dan kamu sudah luar biasa sejauh ini 🌼",
		})
		return
	}
	cleaned := strings.ReplaceAll(summary, "\n", "<br>")
	c.JSON(http.StatusOK, gin.H{
		"summary": cleaned,
	})
}

