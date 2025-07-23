package repository

import (
	"emospaces-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type ConsultanRepository interface {
	Create(c *models.Consultan) error
	FindAll() ([]models.Consultan, error)
	FindByID(id uint) (*models.Consultan, error)
	Update(c *models.Consultan) error
	Delete(id uint) error
	CreateAccess(userID, consultanID uint) error
}

type consultanRepository struct {
	db *gorm.DB
}

func NewConsultanRepository(db *gorm.DB) ConsultanRepository {
	return &consultanRepository{db}
}

func (r *consultanRepository) Create(c *models.Consultan) error {
	return r.db.Create(c).Error
}

func (r *consultanRepository) FindAll() ([]models.Consultan, error) {
	var consultans []models.Consultan
	err := r.db.Order("id desc").Find(&consultans).Error
	return consultans, err
}

func (r *consultanRepository) FindByID(id uint) (*models.Consultan, error) {
	var c models.Consultan
	err := r.db.First(&c, id).Error
	return &c, err
}

func (r *consultanRepository) Update(c *models.Consultan) error {
	return r.db.Save(c).Error
}

func (r *consultanRepository) Delete(id uint) error {
	return r.db.Delete(&models.Consultan{}, id).Error
}

func (r *consultanRepository) CreateAccess(userID, consultanID uint) error {
	access := &models.ConsultanAccess{
		UserID:      userID,
		ConsultanID: consultanID,
		CreatedAt:   time.Now(),
	}
	return r.db.Create(access).Error
}
