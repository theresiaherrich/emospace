package service

import (
	"context"
	"emospaces-backend/dto"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/pkg/supabase"
	"mime/multipart"
	"time"
)

type ConsultanService interface {
	Create(ctx context.Context, userID uint, req dto.CreateConsultanRequest, file multipart.File, fileHeader *multipart.FileHeader) error	
	GetAll() ([]models.Consultan, error)
	GetByID(id uint) (*models.Consultan, error)
	Update(ctx context.Context, id uint, req dto.UpdateConsultanRequest, file multipart.File, fileHeader *multipart.FileHeader) error
	Delete(id uint) error
}

type consultanService struct {
	repo repository.ConsultanRepository
}

func NewConsultanService(r repository.ConsultanRepository) ConsultanService {
	return &consultanService{r}
}

func (s *consultanService) Create(ctx context.Context, userID uint, req dto.CreateConsultanRequest, file multipart.File, fileHeader *multipart.FileHeader) error {
	var imageURL string
	if fileHeader != nil {
		url, err := supabase.UploadConsultanImage(fileHeader, req.Name)
		if err != nil {
			return err
		}
		imageURL = url
	}

	c := &models.Consultan{
		UserID:     userID,
		Name:       req.Name,
		Title:      req.Title,
		Speciality: req.Speciality,
		Experience: req.Experience,
		Rating:     req.Rating,
		Price:      req.Price,
		ImageURL:   imageURL,
	}

	return s.repo.Create(c)
}


func (s *consultanService) GetAll() ([]models.Consultan, error) {
	return s.repo.FindAll()
}

func (s *consultanService) GetByID(id uint) (*models.Consultan, error) {
	return s.repo.FindByID(id)
}

func (s *consultanService) Update(ctx context.Context, id uint, req dto.UpdateConsultanRequest, file multipart.File, fileHeader *multipart.FileHeader) error {
	c, err := s.repo.FindByID(id)
	if err != nil {
		return err
	}

	if file != nil && fileHeader != nil {
		if c.ImageURL != "" {
			_ = supabase.DeleteConsultanImage(c.ImageURL)
		}
		url, err := supabase.UploadConsultanImage(fileHeader, req.Name)
		if err != nil {
			return err
		}
		c.ImageURL = url
	}

	c.Name = req.Name
	c.Title = req.Title
	c.Speciality = req.Speciality
	c.Experience = req.Experience
	c.Rating = req.Rating
	c.Price = req.Price
	c.UpdatedAt = time.Now()

	return s.repo.Update(c)
}


func (s *consultanService) Delete(id uint) error {
	return s.repo.Delete(id)
}
