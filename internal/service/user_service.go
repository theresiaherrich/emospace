package service

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/repository"
	"emospaces-backend/internal/utils"
	"errors"
	"time"
)

type UserService interface {
	Register(user *models.User) error
	Login(identifier, password string) (*models.User, error)
	FindByID(id uint) (*models.User, error)
	FindByEmail(email string) (*models.User, error)
	GetByID(userID uint) (*models.User, error)
	UpdateUser(user *models.User) error
	ToProfileResponse(user *models.User) *dto.UserProfileResponse
	GetAllUsers() ([]*models.User, error)
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo}
}

func (s *userService) Register(user *models.User) error {
	hash, err := utils.HashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hash
	return s.repo.Create(user)
}

func (s *userService) Login(identifier, password string) (*models.User, error) {
	user, err := s.repo.FindByEmailOrUsername(identifier)
	if err != nil {
		return nil, errors.New("invalid email/username or password")
	}
	if !utils.CheckPasswordHash(password, user.Password) {
		return nil, errors.New("invalid email/username or password")
	}
	return user, nil
}

func (s *userService) FindByID(id uint) (*models.User, error) {
	return s.repo.FindByID(id)
}

func (s *userService) FindByEmail(email string) (*models.User, error) {
	return s.repo.FindByEmail(email)
}

func (s *userService) GetByID(userID uint) (*models.User, error) {
	user, err := s.repo.GetByID(userID)
	if err != nil {
		return nil, err
	}

	if user.IsPremium && user.PremiumUntil != nil && user.PremiumUntil.Before(time.Now()) {
		user.IsPremium = false
		user.PremiumUntil = nil
		_ = s.repo.Update(user)
	}

	if user.Gender != "" && user.Gender != "Male" && user.Gender != "Female" {
		return nil, errors.New("gender must be either 'Male' or 'Female'")
	}

	return user, nil
}


func (s *userService) UpdateUser(user *models.User) error {
	if user.Name == "" || user.Username == "" || user.Email == "" ||
		user.Phone == "" || user.Gender == "" || user.BirthDate == "" {
		return errors.New("all fields must be filled")
	}
	return s.repo.Update(user)
}

func (s *userService) ToProfileResponse(user *models.User) *dto.UserProfileResponse {
	return &dto.UserProfileResponse{
		ID:             user.ID,
		Name:           user.Name,
		Username:       user.Username,
		Email:          user.Email,
		Phone:          user.Phone,
		Gender:         user.Gender,
		BirthDate:      user.BirthDate,
		ProfilePicture: user.ProfilePicture,
		IsPremium:      user.IsPremium,
		PremiumUntil:   user.PremiumUntil,
	}
}

func (s *userService) GetAllUsers() ([]*models.User, error) {
	return s.repo.FindAll()
}