package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterPaymentRoutes(rg *gin.RouterGroup, paymentHandler *handler.PaymentHandler) {
	payment := rg.Group("/payment")
	payment.Use(middleware.JWTMiddleware())
	{
		payment.GET("/snap/:planID", paymentHandler.GetSnapTokenFromPlan)
	}

	rg.POST("/payment/callback", paymentHandler.PaymentCallback)
}