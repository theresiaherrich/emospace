package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterPlanRoutes(rg *gin.RouterGroup, planHandler *handler.PlanHandler) {
	plan := rg.Group("/plans")

	plan.GET("", planHandler.GetPlans) 
	
	adminPlans := plan.Use(middleware.JWTMiddleware(), middleware.RequireRole("admin"))
	{
		adminPlans.POST("", planHandler.CreatePlan)
		adminPlans.PUT(":id", planHandler.UpdatePlan)
		adminPlans.DELETE(":id", planHandler.DeletePlan)
	}
}
