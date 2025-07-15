package routes

import (
	"emospaces-backend/internal/handler"
	"github.com/gin-gonic/gin"
)

func RegisterPlanRoutes(rg *gin.RouterGroup, planHandler *handler.PlanHandler) {
	plan := rg.Group("/plans")
	{
		plan.GET("", planHandler.GetPlans)        
		plan.POST("", planHandler.CreatePlan)     
		plan.PUT(":id", planHandler.UpdatePlan)   
		plan.DELETE(":id", planHandler.DeletePlan) 
	}
}
