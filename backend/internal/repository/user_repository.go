package repository

import (
	"emospaces-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type UserRepository interface {
	Create(user *models.User) error
	FindByEmail(email string) (*models.User, error)
	FindByEmailOrUsername(identifier string) (*models.User, error)
	FindByID(id uint) (*models.User, error)
	UpgradeToPremium(id uint) error
	SetPremiumWithDuration(id uint, until time.Time) error
	GetByID(id uint) (*models.User, error)
	Update(user *models.User) error
	FindAll() ([]*models.User, error)
	UpdateFCMToken(userID uint, token string) error
	GetUsersWithoutMoodOrJournalToday() ([]models.User, error)
}

type userRepo struct {
	db *gorm.DB
}

func NewUserRepo(db *gorm.DB) UserRepository {
	return &userRepo{db}
}

func (r *userRepo) Create(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *userRepo) FindByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	return &user, err
}

func (r *userRepo) FindByEmailOrUsername(identifier string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ? OR username = ?", identifier, identifier).First(&user).Error
	return &user, err
}

func (r *userRepo) FindByID(id uint) (*models.User, error) {
	var user models.User
	if err := r.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepo) UpgradeToPremium(id uint) error {
	return r.db.Model(&models.User{}).Where("id = ?", id).Update("is_premium", true).Error
}

func (r *userRepo) SetPremiumWithDuration(id uint, until time.Time) error {
	return r.db.Model(&models.User{}).Where("id = ?", id).Updates(map[string]interface{}{
		"is_premium":    true,
		"premium_until": until,
	}).Error
}

func (r *userRepo) GetByID(userID uint) (*models.User, error) {
	var user models.User
	if err := r.db.First(&user, userID).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepo) Update(user *models.User) error {
	return r.db.Save(user).Error
}

func (r *userRepo) FindAll() ([]*models.User, error) {
	var users []*models.User
	err := r.db.Order("created_at desc").Find(&users).Error
	return users, err
}

func (r *userRepo) UpdateFCMToken(userID uint, token string) error {
	return r.db.Model(&models.User{}).Where("id = ?", userID).Update("fcm_token", token).Error
}

func (r *userRepo) GetUsersWithoutMoodOrJournalToday() ([]models.User, error) {
	today := time.Now().Format("2006-01-02")
	var users []models.User
	err := r.db.Raw(`
		SELECT * FROM users
		WHERE id NOT IN (
			SELECT user_id FROM moods WHERE DATE(created_at) = ?
			UNION
			SELECT user_id FROM journals WHERE DATE(created_at) = ?
		)
	`, today, today).Scan(&users).Error
	return users, err
}

