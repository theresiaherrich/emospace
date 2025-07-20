package repository

import (
	"emospaces-backend/internal/models"
	"gorm.io/gorm"
)

type TransactionRepository interface {
    Create(tx *models.Transaction) error
    FindByUserID(userID uint) ([]models.Transaction, error)
    FindAll() ([]models.Transaction, error)
}

type transactionRepository struct {
    db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) TransactionRepository {
    return &transactionRepository{db}
}

func (r *transactionRepository) Create(tx *models.Transaction) error {
    return r.db.Create(tx).Error
}

func (r *transactionRepository) FindByUserID(userID uint) ([]models.Transaction, error) {
    var txs []models.Transaction
    err := r.db.Where("user_id = ?", userID).Find(&txs).Error
    return txs, err
}

func (r *transactionRepository) FindAll() ([]models.Transaction, error) {
    var txs []models.Transaction
    err := r.db.Find(&txs).Error
    return txs, err
}

