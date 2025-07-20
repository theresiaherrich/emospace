package routes

import (
	"emospaces-backend/config"
	"emospaces-backend/internal/handler"
	"emospaces-backend/internal/repository"
	"emospaces-backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	gin.SetMode(gin.ReleaseMode) 

    r := gin.Default()
    r.SetTrustedProxies(nil)
    r.ForwardedByClientIP = true

    r.Use(func(c *gin.Context) {
        if c.Request.Header.Get("X-Forwarded-Proto") == "https" {
            c.Request.URL.Scheme = "https"
        }
        c.Next()
    })

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

	txRepo := repository.NewTransactionRepository(db)

	paymentService := service.NewPaymentService(userRepo, planRepo, txRepo)
	paymentHandler := handler.NewPaymentHandler(paymentService)

	
	api := r.Group("/api")
	RegisterAuthRoutes(api, authHandler)
	RegisterMoodRoutes(api, moodHandler)
	RegisterAIRoutes(api, aiHandler)
	RegisterPaymentRoutes(api, paymentHandler)
	RegisterPlanRoutes(api, planHandler)
	RegisterUserRoutes(api, userHandler)
	RegisterAdminRoutes(api, userHandler)

	r.GET("/", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "EmoSpace backend is running 🚀"})
	})


	return r
}

