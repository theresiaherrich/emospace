package handler

import (
	"emospaces-backend/internal/service"
	"fmt"
	"log"
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
		log.Println("[PaymentCallback] Invalid JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payload tidak valid"})
		return
	}

	log.Println("[PaymentCallback] Received:", payload)

	if err := h.Service.HandleMidtransCallback(payload); err != nil {
		log.Println("[PaymentCallback] Error:", err)
 		c.JSON(http.StatusOK, gin.H{"message": "Callback diterima, tapi terjadi kesalahan saat memproses"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pembayaran berhasil diproses"})
}

func (h *PaymentHandler) GetMyTransactions(c *gin.Context) {
    userID := c.GetUint("user_id") 

    txs, err := h.Service.GetUserTransactions(userID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil transaksi"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"transactions": txs})
}

func (h *PaymentHandler) GetAllTransactions(c *gin.Context) {
    role := c.GetString("role") 
    if role != "admin" {
        c.JSON(http.StatusForbidden, gin.H{"error": "Hanya admin yang bisa melihat semua transaksi"})
        return
    }

    txs, err := h.Service.GetAllTransactions()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil semua transaksi"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"transactions": txs})
}

func (h *PaymentHandler) GetSnapTokenForConsultan(c *gin.Context) {
	userID := c.GetUint("user_id")
	consultanIDStr := c.Param("consultanID")

	consultanID, err := strconv.Atoi(consultanIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid consultan ID"})
		return
	}

	token, redirectURL, err := h.Service.GenerateSnapTokenForConsultan(userID, uint(consultanID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":        token,
		"redirect_url": redirectURL,
	})
}

func (h *PaymentHandler) HandleMidtransCallback(c *gin.Context) {
	var notifPayload map[string]interface{}
	if err := c.ShouldBindJSON(&notifPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid notification payload"})
		return
	}

	orderID, ok := notifPayload["order_id"].(string)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order_id not found or invalid"})
		return
	}

	transactionStatus := notifPayload["transaction_status"]
	fraudStatus := notifPayload["fraud_status"]

	log.Println("MIDTRANS CALLBACK:", orderID, transactionStatus, fraudStatus)

	err := h.Service.UpdateTransactionStatus(orderID, fmt.Sprintf("%v", transactionStatus))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update transaction status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Transaction updated successfully"})
}


