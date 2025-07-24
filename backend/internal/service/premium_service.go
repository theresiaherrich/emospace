package service

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
)

type PlanService interface {
	GetAll() ([]models.PremiumPlan, error)
	Create(input dto.PremiumPlanDTO) error
	Update(id uint, input dto.PremiumPlanDTO) error
	Delete(id uint) error
}

type planService struct {
	repo repository.PlanRepository
}

func NewPlanService(repo repository.PlanRepository) PlanService {
	return &planService{repo: repo}
}

func (s *planService) GetAll() ([]models.PremiumPlan, error) {
	return s.repo.FindAll()
}

func (s *planService) Create(input dto.PremiumPlanDTO) error {
	plan := models.PremiumPlan{
		Name:     input.Name,
		Code:     input.Code,
		Price:    input.Price,
		Duration: input.Duration,
		Featured: input.Featured,
		Description:     input.Description,
	}
	return s.repo.Create(&plan)
}

func (s *planService) Update(id uint, input dto.PremiumPlanDTO) error {
	plan, err := s.repo.FindByID(id)
	if err != nil {
		return err
	}

	plan.Name = input.Name
	plan.Code = input.Code
	plan.Price = input.Price
	plan.Duration = input.Duration
	plan.Featured = input.Featured
	plan.Description = input.Description

	return s.repo.Update(plan)
}

func (s *planService) Delete(id uint) error {
	return s.repo.Delete(id)
}
