package routes

import (
	"emospaces-backend/internal/handler"
	"github.com/gin-gonic/gin"
)

func RegisterPlanRoutes(rg *gin.RouterGroup, planHandler *handler.PlanHandler) {
	plan := rg.Group("/plans")
	{
		plan.GET("", planHandler.GetPlans)        // Ambil semua premium plan
		plan.POST("", planHandler.CreatePlan)     // Buat plan baru
		plan.PUT(":id", planHandler.UpdatePlan)   // Edit plan berdasarkan ID
		plan.DELETE(":id", planHandler.DeletePlan) // Hapus plan berdasarkan ID
	}
}
