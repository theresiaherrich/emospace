package handler

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/repository"
	"emospaces-backend/internal/service"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AIHandler struct {
	ChatRepo repository.ChatRepository
	UserRepo repository.UserRepository
	Service  service.ChatService
}

func NewAIHandler(chatRepo repository.ChatRepository, userRepo repository.UserRepository, service service.ChatService) *AIHandler {
	return &AIHandler{
		ChatRepo: chatRepo,
		UserRepo: userRepo,
		Service:  service,
	}
}

func (h *AIHandler) Welcome(c *gin.Context) {
	userName := c.GetString("user_name")

	if userName == "" {
		log.Println("[WELCOME] Missing user_name in context")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized or missing user data"})
		return
	}

	message := fmt.Sprintf(
		"👋 Hai %s! Aku Space, teman curhat kamu. Aku senang kamu datang hari ini. Cerita yuk, kamu lagi ngerasa apa?",
		userName,
	)

	c.JSON(http.StatusOK, dto.AIResponseDTO{Response: message})
}

func (h *AIHandler) HandleChat(c *gin.Context) {
	var input dto.AIUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("[CHAT] Invalid input: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid. Pastikan format JSON benar dan message diisi."})
		return
	}

	userID := c.GetUint("user_id")
	user, err := h.UserRepo.FindByID(userID)
	if err != nil {
		log.Println("[CHAT] User tidak ditemukan")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User tidak valid"})
		return
	}

	mood := c.GetString("mood")
	if mood == "" {
		log.Println("[CHAT] Missing mood in context")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Mood belum diisi hari ini"})
		return
	}

	allowed, err := h.Service.CanUserChat(user)
	if err != nil {
		log.Printf("[CHAT] Error cek limit user: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengecek batas harian"})
		return
	}
	if !allowed {
		c.JSON(http.StatusTooManyRequests, gin.H{"error": "Batas curhat harian tercapai. Upgrade ke Premium yuk!"})
		return
	}

	response, err := h.Service.GenerateAIResponse(user, mood, input.Message)
	if err != nil {
		log.Printf("[CHAT] Gagal generate respon AI: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "AI gagal membalas. Mohon coba lagi."})
		return
	}

	c.JSON(http.StatusOK, dto.AIResponseDTO{Response: response})
}

func (h *AIHandler) SearchUserInputOnly(c *gin.Context) {
	userName := c.GetString("user_name")
	keyword := c.Query("query")

	if userName == "" {
		log.Println("[SEARCH] Missing user_name")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if keyword == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Query kosong. Tambahkan parameter ?query=keyword"})
		return
	}

	inputs, err := h.Service.SearchUserInputOnly(userName, keyword)
	if err != nil {
		log.Printf("[SEARCH] Gagal cari keyword: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mencari curhatan"})
		return
	}

	if len(inputs) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "Tidak ditemukan curhatan dengan kata itu"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"results": inputs})
}

func (h *AIHandler) GetChatHistory(c *gin.Context) {
	userName := c.GetString("user_name")

	if userName == "" {
		log.Println("[HISTORY] Missing user_name in context")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	history, err := h.ChatRepo.GetChatHistoryByUser(userName)
	if err != nil {
		log.Printf("[HISTORY] Failed to get chat history: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil riwayat curhat"})
		return
	}

	var simplified []gin.H
	for _, h := range history {
		simplified = append(simplified, gin.H{
			"user_input": h.UserInput,
			"ai_output":  h.AIOutput,
			"created_at": h.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{"history": simplified})
}

func (h *AIHandler) ChatStepByStep(c *gin.Context) {
	userID := c.GetUint("user_id")
	user, err := h.UserRepo.FindByID(userID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var input struct {
		Mood    string `json:"mood"`
		Message string `json:"message"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	responses, err := h.Service.GenerateStepByStepResponse(user, input.Mood, input.Message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate response"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"responses": responses})
}
