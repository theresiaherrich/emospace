package main

import (
	"emospaces-backend/config"
	"emospaces-backend/internal/routes"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.InitDB()
	r := routes.SetupRoutes()
	log.Fatal(r.Run(":8080"))
}
