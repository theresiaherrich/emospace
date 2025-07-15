package repository

import (
	"emospaces-backend/internal/models"
	"gorm.io/gorm"
)

type PlanRepository interface {
	FindAll() ([]models.PremiumPlan, error)
	FindByID(id uint) (*models.PremiumPlan, error)
	Create(plan *models.PremiumPlan) error
	Update(plan *models.PremiumPlan) error
	Delete(id uint) error
}

type planRepository struct {
	db *gorm.DB
}

func NewPlanRepository(db *gorm.DB) PlanRepository {
	return &planRepository{db}
}

func (r *planRepository) FindAll() ([]models.PremiumPlan, error) {
	var plans []models.PremiumPlan
	err := r.db.Find(&plans).Error
	return plans, err
}

func (r *planRepository) FindByID(id uint) (*models.PremiumPlan, error) {
	var plan models.PremiumPlan
	err := r.db.First(&plan, id).Error
	return &plan, err
}

func (r *planRepository) Create(plan *models.PremiumPlan) error {
	return r.db.Create(plan).Error
}

func (r *planRepository) Update(plan *models.PremiumPlan) error {
	return r.db.Save(plan).Error
}

func (r *planRepository) Delete(id uint) error {
	return r.db.Delete(&models.PremiumPlan{}, id).Error
}