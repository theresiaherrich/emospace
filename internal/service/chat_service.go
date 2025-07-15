package service

import (
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/pkg/ai"
	"strings"
	"time"
)

func GenerateAIResponse(user *models.User, mood string, userMessage string, repo repository.ChatRepository) (string, error) {
	history, _ := repo.GetChatsByUser(user.Username)

	var contextBuilder strings.Builder
	contextBuilder.WriteString("Kamu adalah Space, chatbot AI empatik untuk remaja. Gunakan gaya ramah dan santai.\n")
	contextBuilder.WriteString("Mood awal user: " + mood + "\n")

	for _, h := range history {
		contextBuilder.WriteString("User: " + h.UserInput + "\n")
		contextBuilder.WriteString("Space: " + h.AIOutput + "\n")
	}
	contextBuilder.WriteString("Sekarang user berkata: \"" + userMessage + "\"\n")
	contextBuilder.WriteString("Balaslah seolah sedang ngobrol dan jangan beri jawaban final. Beri validasi, lalu lanjutkan percakapan dengan pertanyaan ringan.")

	prompt := contextBuilder.String()

	response, err := ai.SendToGemini(prompt)
	if err != nil {
		return "", err
	}

	repo.SaveChat(models.ChatLog{
		UserID:    user.ID,
		UserName:  user.Username,
		Mood:      mood,
		UserInput: userMessage,
		AIOutput:  response,
	})

	return response, nil
}

func SearchUserInputOnly(userName, keyword string, repo repository.ChatRepository) ([]string, error) {
	return repo.SearchUserInputsOnly(userName, keyword)
}

func CanUserChat(user *models.User, chatRepo repository.ChatRepository) (bool, error) {
	if user.IsPremium && user.PremiumUntil != nil && user.PremiumUntil.After(time.Now()) {
		return true, nil 
	}

	today := time.Now()
	count, err := chatRepo.CountChatsToday(user.ID, today)
	if err != nil {
		return false, err
	}

	if count >= 10 {
		return false, nil 
	}

	return true, nil
}
