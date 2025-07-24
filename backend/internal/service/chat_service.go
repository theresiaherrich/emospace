package service

import (
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/pkg/ai"
	"strings"
	"time"
	"unicode/utf8"
)

type ChatService interface {
	GenerateAIResponse(user *models.User, mood, userMessage string) (string, error)
	GenerateStepByStepResponse(user *models.User, mood, userMessage string) ([]string, error)
	CanUserChat(user *models.User) (bool, error)
	SearchUserInputOnly(userName, keyword string) ([]string, error)
}

type chatService struct {
	repo repository.ChatRepository
}

func NewChatService(repo repository.ChatRepository) ChatService {
	return &chatService{repo: repo}
}

func sanitizeUTF8(s string) string {
	if !utf8.ValidString(s) {
		return strings.ToValidUTF8(s, "")
	}
	return s
}

func (s *chatService) GenerateAIResponse(user *models.User, mood string, userMessage string) (string, error) {
	history, _ := s.repo.GetRecentChatsByUser(user.Username, 5)

	var contextBuilder strings.Builder
	contextBuilder.WriteString("Kamu adalah Space, chatbot AI yang empatik dan suportif untuk remaja. Gaya bahasa kamu santai, anak muda, dan tidak formal. Jangan beri jawaban panjang atau berulang. Fokus: validasi emosi, beri semangat, dan ajak ngobrol ringan.\n")
	contextBuilder.WriteString("Mood awal user: " + mood + "\n")

	for _, h := range history {
		contextBuilder.WriteString("User: " + sanitizeUTF8(h.UserInput) + "\n")
		contextBuilder.WriteString("Space: " + sanitizeUTF8(h.AIOutput) + "\n")
	}

	contextBuilder.WriteString("Sekarang user berkata: \"" + userMessage + "\"\n")
	contextBuilder.WriteString("Tugas kamu adalah menjawab dengan:\n")
	contextBuilder.WriteString("- 1 kalimat validasi perasaan dari pernyataan terakhir user\n")
	contextBuilder.WriteString("- 1 kalimat empati atau semangat\n")
	contextBuilder.WriteString("- 1 kalimat pertanyaan ringan yang nyambung dengan isi kalimat user terakhir\n")
	contextBuilder.WriteString("Jawaban harus singkat, ramah, dan tidak memberi solusi final.\n")
	contextBuilder.WriteString("Akhiri dengan ajakan ringan untuk ke halaman Konsultasi jika ingin cerita lebih dalam.\n")

	prompt := contextBuilder.String()

	response, err := ai.SendToGemini(prompt)
	if err != nil {
		return "", err
	}

	response = sanitizeUTF8(response)
	userMessage = sanitizeUTF8(userMessage)

	err = s.repo.SaveChat(models.ChatLog{
		UserID:    user.ID,
		UserName:  user.Username,
		Mood:      mood,
		UserInput: userMessage,
		AIOutput:  response,
	})
	if err != nil {
		return "", err
	}

	return response, nil
}

func (s *chatService) SearchUserInputOnly(userName, keyword string) ([]string, error) {
	return s.repo.SearchUserInputsOnly(userName, keyword)
}

func (s *chatService) CanUserChat(user *models.User) (bool, error) {
	today := time.Now()
	count, err := s.repo.CountChatsToday(user.ID, today)
	if err != nil {
		return false, err
	}

	if user.IsPremium {
		return true, nil
	}

	return count < 10, nil
}

func (s *chatService) GenerateStepByStepResponse(user *models.User, mood, userMessage string) ([]string, error) {
	stage, err := s.repo.GetStageByUser(user.ID)
	if err != nil || stage == nil {
		stage = &models.ChatStage{
			UserID:    user.ID,
			Mood:      mood,
			LastInput: sanitizeUTF8(userMessage),
			Stage:     1,
		}
		s.repo.SaveOrUpdateStage(stage)

		return []string{"Space: Hai! Aku di sini buat dengerin kamu. Gimana perasaanmu hari ini?"}, nil
	}

	if stage.Stage == 1 {
		stage.Stage = 2
		stage.Mood = mood
		stage.LastInput = sanitizeUTF8(userMessage)
		s.repo.SaveOrUpdateStage(stage)

		return []string{"Space: Hai! Aku di sini buat dengerin kamu. Gimana perasaanmu hari ini?"}, nil
	}

	history, _ := s.repo.GetChatsByUser(user.Username)

	var prompt strings.Builder
	prompt.WriteString("Kamu adalah Space, chatbot empatik remaja.\n")
	prompt.WriteString("Mood user: " + stage.Mood + "\n")
	for _, h := range history {
		prompt.WriteString("User: " + sanitizeUTF8(h.UserInput) + "\n")
		prompt.WriteString("Space: " + sanitizeUTF8(h.AIOutput) + "\n")
	}
	prompt.WriteString("Sekarang user berkata: " + sanitizeUTF8(userMessage) + "\n")
	prompt.WriteString("Balaslah dengan gaya validasi hangat, ringkas, dan beri semangat. Jangan panjang. Akhiri dengan ajakan konsultasi jika dirasa perlu.")

	response, err := ai.SendToGemini(prompt.String())
	if err != nil {
		return nil, err
	}

	s.repo.SaveChat(models.ChatLog{
		UserID:    user.ID,
		UserName:  user.Username,
		Mood:      stage.Mood,
		UserInput: sanitizeUTF8(userMessage),
		AIOutput:  sanitizeUTF8(response),
	})

	return []string{response}, nil
}
