package routes

import (
	"emospaces-backend/config"
	"emospaces-backend/internal/handler"
	"emospaces-backend/internal/repository"
	"emospaces-backend/internal/service"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	r.SetTrustedProxies(nil)
	r.ForwardedByClientIP = true

	db := config.DB

	userRepo := repository.NewUserRepo(db)
	userService := service.NewUserService(userRepo)
	authHandler := handler.NewAuthHandler(userService)
	userHandler := handler.NewUserHandler(userService)

	moodRepo := repository.NewMoodRepository(db)
	moodService := service.NewMoodService(moodRepo)
	moodHandler := handler.NewMoodHandler(moodService)
	
	chatRepo := repository.NewChatRepository(db)
	aiHandler := handler.NewAIHandler(chatRepo, userRepo)

	planRepo := repository.NewPlanRepository(db)
	planService := service.NewPlanService(planRepo)
	planHandler := handler.NewPlanHandler(planService)

	paymentService := service.NewPaymentService(userRepo, planRepo)
	paymentHandler := handler.NewPaymentHandler(paymentService)

	
	api := r.Group("/api")
	RegisterAuthRoutes(api, authHandler)
	RegisterMoodRoutes(api, moodHandler)
	RegisterAIRoutes(api, aiHandler)
	RegisterPaymentRoutes(api, paymentHandler)
	RegisterPlanRoutes(api, planHandler)
	RegisterUserRoutes(api, userHandler)

	return r
}

