package main

import (
	"emospaces-backend/config"
	"emospaces-backend/internal/routes"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
    log.Println(".env file not found, relying on environment variables.")}

	config.InitDB()
	r := routes.SetupRoutes()
	log.Fatal(r.Run(":8080"))
}
