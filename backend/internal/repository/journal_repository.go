package repository

import (
	"emospaces-backend/internal/models"
	"gorm.io/gorm"
)

type JournalRepository interface {
	Create(j *models.Journal) error
	Update(j *models.Journal) error
	Delete(j *models.Journal) error
	GetByUserID(userID uint) ([]models.Journal, error)
	GetByID(id uint) (*models.Journal, error)
}

type journalRepository struct {
	db *gorm.DB
}

func NewJournalRepository(db *gorm.DB) JournalRepository {
	return &journalRepository{db}
}

func (r *journalRepository) Create(j *models.Journal) error {
	return r.db.Create(j).Error
}

func (r *journalRepository) GetByUserID(userID uint) ([]models.Journal, error) {
	var journals []models.Journal
	err := r.db.Where("user_id = ?", userID).Order("date DESC").Find(&journals).Error
	return journals, err
}

func (r *journalRepository) GetByID(id uint) (*models.Journal, error) {
	var journal models.Journal
	err := r.db.First(&journal, id).Error
	if err != nil {
		return nil, err
	}
	return &journal, nil
}

func (r *journalRepository) Update(j *models.Journal) error {
	return r.db.Save(j).Error
}

func (r *journalRepository) Delete(j *models.Journal) error {
	return r.db.Delete(j).Error
}
