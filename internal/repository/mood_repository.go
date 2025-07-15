package repository

import (
	"emospaces-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type MoodRepository interface {
	SetMood(userID uint, date time.Time, moodCode string) error
	GetMoodByMonth(userID uint, month time.Time) ([]models.Mood, error)
}

type moodRepository struct {
	db *gorm.DB
}

func NewMoodRepository(db *gorm.DB) MoodRepository {
	return &moodRepository{db}
}

func (r *moodRepository) SetMood(userID uint, date time.Time, moodCode string) error {
	var mood models.Mood
	result := r.db.Where("user_id = ? AND date = ?", userID, date).First(&mood)

	if result.RowsAffected == 0 {
		mood = models.Mood{UserID: userID, Date: date, MoodCode: moodCode}
		return r.db.Create(&mood).Error
	}

	mood.MoodCode = moodCode
	return r.db.Save(&mood).Error
}

func (r *moodRepository) GetMoodByMonth(userID uint, month time.Time) ([]models.Mood, error) {
	start := time.Date(month.Year(), month.Month(), 1, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 1, 0)
	var moods []models.Mood

	err := r.db.Where("user_id = ? AND date >= ? AND date < ?", userID, start, end).Find(&moods).Error
	return moods, err
}
