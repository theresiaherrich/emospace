package repository

import (
	"emospaces-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type ChatRepository interface {
	SaveChat(chat models.ChatLog) error
	GetChatsByUser(userName string) ([]models.ChatLog, error)
	SearchUserInputsOnly(userName, keyword string) ([]string, error)
	CountChatsToday(userID uint, date time.Time) (int64, error)
}

type chatRepository struct {
	db *gorm.DB
}

func NewChatRepository(db *gorm.DB) ChatRepository {
	return &chatRepository{db: db}
}

func (r *chatRepository) SaveChat(chat models.ChatLog) error {
	return r.db.Create(&chat).Error
}

func (r *chatRepository) GetChatsByUser(userName string) ([]models.ChatLog, error) {
	var chats []models.ChatLog
	err := r.db.
		Where("user_name = ?", userName).
		Order("created_at ASC").
		Find(&chats).Error
	return chats, err
}

func (r *chatRepository) SearchUserInputsOnly(userName, keyword string) ([]string, error) {
	var inputs []string
	err := r.db.
		Model(&models.ChatLog{}).
		Where("user_name = ? AND user_input LIKE ?", userName, "%"+keyword+"%").
		Pluck("user_input", &inputs).Error
	return inputs, err
}

func (r *chatRepository) CountChatsToday(userID uint, date time.Time) (int64, error) {
	var count int64
	startOfDay := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, date.Location())
	endOfDay := startOfDay.Add(24 * time.Hour)

	err := r.db.Model(&models.ChatLog{}).
		Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startOfDay, endOfDay).
		Count(&count).Error

	return count, err
}
