package handler

import (
	"emospaces-backend/internal/service"
	"emospaces-backend/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserHandler struct {
	userService service.UserService
}

func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{userService}
}

func (h *UserHandler) GetProfile(c *gin.Context) {
	userID := c.GetUint("user_id") 

	user, err := h.userService.GetByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, h.userService.ToProfileResponse(user))
}

func (h *UserHandler) UpdateProfile(c *gin.Context) {
	userID := c.GetUint("user_id")

	user, err := h.userService.GetByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if v := c.PostForm("name"); v != "" {
		user.Name = v
	}
	if v := c.PostForm("username"); v != "" {
		user.Username = v
	}
	if v := c.PostForm("email"); v != "" {
		user.Email = v
	}
	if v := c.PostForm("phone"); v != "" {
		user.Phone = v
	}
	if v := c.PostForm("gender"); v != "" {
		if v != "Female" && v != "Male" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Gender must be either 'Male' or 'Female'"})
			return
		}
		user.Gender = v
	}
	if v := c.PostForm("birth_date"); v != "" {
		user.BirthDate = v
	}

	file, fileHeader, err := c.Request.FormFile("profile_picture")
	if err == nil && file != nil {
		imageURL, err := utils.UploadImageToSupabase(file, fileHeader, userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Image upload failed"})
			return
		}
		user.ProfilePicture = imageURL
	}

	if err := h.userService.UpdateUser(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, h.userService.ToProfileResponse(user))
}
