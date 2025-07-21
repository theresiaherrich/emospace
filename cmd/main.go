package main

import (
	"log"
	"os"

	"emospaces-backend/config"
	"emospaces-backend/internal/routes"
	"emospaces-backend/seeder"
)

func main() {
	config.LoadEnv()

	requiredEnvs := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME"}
	for _, env := range requiredEnvs {
		if os.Getenv(env) == "" {
			log.Fatalf("Missing required environment variable: %s", env)
		}
	}

	if err := config.InitDB(); err != nil {
		log.Fatalf("Database initialization failed: %v", err)
	}

	seeder.SeedAdminUser()
	
	r := routes.SetupRoutes()

	log.Println("Server is running on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
