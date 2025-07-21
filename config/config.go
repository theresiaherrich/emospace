package config

import (
	"emospaces-backend/internal/models"
	"fmt"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=true",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)
	
	fmt.Println("DSN:", dsn)

	var db *gorm.DB
	var err error
	maxRetries := 10

	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		fmt.Printf("Attempt %d/%d: Failed to connect to database: %v\n", i+1, maxRetries, err)
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		return fmt.Errorf("could not connect to database after %d attempts: %w", maxRetries, err)
	}

	err = db.AutoMigrate(&models.User{}, &models.Mood{}, &models.ChatLog{}, &models.ChatStage{}, &models.PremiumPlan{}, &models.Transaction{})
	if err != nil {
		return fmt.Errorf("auto migration failed: %w", err)
	}

	DB = db
	return nil
}
