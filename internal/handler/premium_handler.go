package handler

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PlanHandler struct {
	Service service.PlanService
}

func NewPlanHandler(service service.PlanService) *PlanHandler {
	return &PlanHandler{Service: service}
}

func (h *PlanHandler) GetPlans(c *gin.Context) {
	plans, err := h.Service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data plan"})
		return
	}
	c.JSON(http.StatusOK, plans)
}

func (h *PlanHandler) CreatePlan(c *gin.Context) {
	var input dto.PremiumPlanDTO
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}
	if err := h.Service.Create(input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat plan"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Plan berhasil dibuat"})
}

func (h *PlanHandler) UpdatePlan(c *gin.Context) {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var input dto.PremiumPlanDTO
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}
	if err := h.Service.Update(uint(id), input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memperbarui plan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Plan berhasil diperbarui"})
}

func (h *PlanHandler) DeletePlan(c *gin.Context) {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)
	if err := h.Service.Delete(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus plan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Plan berhasil dihapus"})
}