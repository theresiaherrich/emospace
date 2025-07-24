package service

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/internal/utils"
	"emospaces-backend/pkg/ai"
	"fmt"
	"time"
)

var MoodColorMap = map[string]string{
	"MOOD_HAPPY": "#FFD700",
	"MOOD_SAD":   "#2196F3",
	"MOOD_ANGRY": "#F44336",
	"MOOD_CALM":  "#9C27B0",
	"MOOD_CRY":   "#00BCD4",
	"MOOD_HOPE":  "#4CAF50",
}

type MoodService interface {
	SetMood(userID uint, moodCode string) error
	GetMonthlyMood(userID uint, month time.Time) ([]dto.MoodCalendarResponse, error)
	GenerateMoodSummary(userID uint, month time.Time) (string, error)
	GetLatestMood(userID uint) (*models.Mood, error)
}

type moodService struct {
	repo repository.MoodRepository
}

func NewMoodService(repo repository.MoodRepository) MoodService {
	return &moodService{repo}
}

func (s *moodService) SetMood(userID uint, moodCode string) error {
	today := time.Now().Truncate(24 * time.Hour)
	return s.repo.SetMood(userID, today, moodCode)
}

func (s *moodService) GetMonthlyMood(userID uint, month time.Time) ([]dto.MoodCalendarResponse, error) {
	moods, err := s.repo.GetMoodByMonth(userID, month)
	if err != nil {
		return nil, err
	}

	var result []dto.MoodCalendarResponse
	for _, m := range moods {
		result = append(result, dto.MoodCalendarResponse{
			Date:     m.Date.Format("2006-01-02"),
			MoodCode: m.MoodCode,
			Color:    MoodColorMap[m.MoodCode],
		})
	}
	return result, nil
}

func (s *moodService) GenerateMoodSummary(userID uint, month time.Time) (string, error) {
	moods, err := s.repo.GetMoodByMonth(userID, month)
	if err != nil {
		fmt.Println("[GenerateMoodSummary] DB error:", err)
		return "", err
	}
	if len(moods) == 0 {
		return "Belum ada data mood di bulan ini.", nil
	}

	prompt := utils.FormatMoodPrompt(month, moods)
	fmt.Println("Prompt ke Gemini:\n", prompt)

	return ai.GeminiCall(prompt)
}

func (s *moodService) GetLatestMood(userID uint) (*models.Mood, error) {
	mood, err := s.repo.GetLatestMood(userID)
	if err != nil {
		return nil, err
	}
	return mood, nil 
}
