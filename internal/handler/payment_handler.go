package handler

import (
	"emospaces-backend/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PaymentHandler struct {
	Service service.PaymentService
}

func NewPaymentHandler(service service.PaymentService) *PaymentHandler {
	return &PaymentHandler{Service: service}
}

func (h *PaymentHandler) GetSnapTokenFromPlan(c *gin.Context) {
	userID := c.GetUint("user_id")
	planIDStr := c.Param("planID")

	planID, err := strconv.Atoi(planIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID plan tidak valid"})
		return
	}

	token, redirectURL, err := h.Service.GenerateSnapTokenFromPlan(userID, uint(planID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":        token,
		"redirect_url": redirectURL,
	})
}

func (h *PaymentHandler) PaymentCallback(c *gin.Context) {
	var payload map[string]interface{}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payload tidak valid"})
		return
	}

	if err := h.Service.HandleMidtransCallback(payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memproses pembayaran"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pembayaran berhasil diproses"})
}
