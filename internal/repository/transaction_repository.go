package repository

import (
	"emospaces-backend/internal/models"
	"gorm.io/gorm"
)

type TransactionRepository interface {
	Save(tx *models.Transaction) error
	GetUserTransactions(userID uint) ([]models.Transaction, error)
}

type transactionRepo struct {
	db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) TransactionRepository {
	return &transactionRepo{db}
}

func (r *transactionRepo) Save(tx *models.Transaction) error {
	return r.db.Create(tx).Error
}

func (r *transactionRepo) GetUserTransactions(userID uint) ([]models.Transaction, error) {
	var txs []models.Transaction
	err := r.db.Where("user_id = ?", userID).Order("created_at desc").Find(&txs).Error
	return txs, err
}
