package dto


type CreateConsultanRequest struct {
	Name       string                `form:"name" binding:"required"`
	Title      string                `form:"title" binding:"required"`
	Speciality string                `form:"speciality" binding:"required"`
	Experience int                   `form:"experience" binding:"required"`
	Rating     float64               `form:"rating" binding:"required"`
	Price      int                   `form:"price" binding:"required"`
}

type UpdateConsultanRequest = CreateConsultanRequest
