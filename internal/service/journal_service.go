package service

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/pkg/supabase"
	"errors"
	"time"
)

type JournalService interface {
	CreateJournal(userID uint, req dto.CreateJournalRequest) error
	UpdateJournal(userID, journalID uint, req dto.CreateJournalRequest) error
	DeleteJournal(userID, journalID uint) error
	GetJournals(userID uint) ([]dto.JournalResponse, error)
	GetJournalDetail(id uint) (*dto.JournalResponse, error)
}

type journalService struct {
	repo repository.JournalRepository
}

func NewJournalService(repo repository.JournalRepository) JournalService {
	return &journalService{repo}
}


func (s *journalService) CreateJournal(userID uint, req dto.CreateJournalRequest) error {
	var imageURL string
	if req.Image != nil {
		url, err := supabase.UploadJournalImage(req.Image, userID)
		if err != nil {
			return err
		}
		imageURL = url
	}

	j := &models.Journal{
		UserID:   userID,
		Title:    req.Title,
		Content:  req.Content,
		ImageURL: imageURL,
		Date:     time.Now(),
	}

	return s.repo.Create(j)
}

func (s *journalService) GetJournals(userID uint) ([]dto.JournalResponse, error) {
	journals, err := s.repo.GetByUserID(userID)
	if err != nil {
		return nil, err
	}

	var result []dto.JournalResponse
	for _, j := range journals {
		result = append(result, dto.JournalResponse{
			ID:      j.ID,
			Title:   j.Title,
			Content: j.Content,
			Date:    j.Date.Format("January 2, 2006"),
		})
	}
	return result, nil
}

func (s *journalService) GetJournalDetail(id uint) (*dto.JournalResponse, error) {
	j, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	return &dto.JournalResponse{
		ID:      j.ID,
		Title:   j.Title,
		Content: j.Content,
		Date:    j.Date.Format("January 2, 2006"),
	}, nil
}

func (s *journalService) UpdateJournal(userID, journalID uint, req dto.CreateJournalRequest) error {
	j, err := s.repo.GetByID(journalID)
	if err != nil {
		return err
	}
	if j.UserID != userID {
		return errors.New("unauthorized")
	}

	if req.Image != nil {
		if j.ImageURL != "" {
			_ = supabase.DeleteImageFromSupabase(j.ImageURL) // aman walau gagal
		}
		newURL, err := supabase.UploadJournalImage(req.Image, userID)
		if err != nil {
			return err
		}
		j.ImageURL = newURL
	}

	j.Title = req.Title
	j.Content = req.Content
	j.UpdatedAt = time.Now()

	return s.repo.Update(j)
}

func (s *journalService) DeleteJournal(userID, journalID uint) error {
	j, err := s.repo.GetByID(journalID)
	if err != nil {
		return err
	}
	if j.UserID != userID {
		return errors.New("unauthorized")
	}

	if j.ImageURL != "" {
		_ = supabase.DeleteImageFromSupabase(j.ImageURL)
	}

	return s.repo.Delete(j)
}
