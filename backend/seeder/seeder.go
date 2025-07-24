package seeder

import (
	"emospaces-backend/config"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/utils"
	"log"
	"os"
)

func SeedAdminUser() {
	email := os.Getenv("DEFAULT_ADMIN_EMAIL")
	password := os.Getenv("DEFAULT_ADMIN_PASSWORD")

	if email == "" || password == "" {
		log.Println("Skipping admin seeding: DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD not set")
		return
	}

	var count int64
	config.DB.Model(&models.User{}).Where("email = ?", email).Count(&count)
	if count == 0 {
		hashed, _ := utils.HashPassword(password)
		admin := models.User{
			Name:      "Admin",
			Username:  "admin",
			Email:     email,
			Password:  hashed,
			Gender:    "Male",
			BirthDate: "2000-01-01",
			Role:      "admin",
		}
		if err := config.DB.Create(&admin).Error; err != nil {
			log.Println("Failed to seed admin user:", err)
		} else {
			log.Println("Admin user seeded successfully.")
		}
	} else {
		log.Println("Admin user already exists.")
	}
}
