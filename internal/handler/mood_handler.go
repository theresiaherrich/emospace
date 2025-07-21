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
	UserService service.UserService
}

func NewMoodHandler(service service.MoodService, userService service.UserService) *MoodHandler {
	return &MoodHandler{
		Service:     service,
		UserService: userService,
	}
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

	user, err := h.UserService.FindByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data pengguna"})
		return
	}

	if !user.IsPremium {
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Fitur ringkasan suasana hati hanya tersedia untuk pengguna Premium. Yuk upgrade sekarang ✨",
		})
		return
	}

	monthStr := c.Query("month")
	month, err := time.Parse("2006-01", monthStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format bulan salah. Gunakan format YYYY-MM"})
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
	c.JSON(http.StatusOK, gin.H{"summary": cleaned})
}


func (h *MoodHandler) GetLatestMood(c *gin.Context) {
	userID := c.GetUint("user_id")
	mood, err := h.Service.GetLatestMood(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data mood"})
		return
	}

	if mood == nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "Kamu belum mengisi mood apapun. Yuk mulai hari ini dengan mengekspresikan perasaanmu 🌈",
			"mood":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"mood": mood,
	})
}
