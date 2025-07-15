package handler

import (
	"emospaces-backend/dto"
	"emospaces-backend/internal/models"
	"emospaces-backend/internal/service"
	"emospaces-backend/internal/utils"
	"emospaces-backend/middleware"
	"fmt"
	"net/http"
	"os"

	"emospaces-backend/config"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type AuthHandler struct {
	service service.UserService
}

func NewAuthHandler(service service.UserService) *AuthHandler {
	return &AuthHandler{service}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var input dto.RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Password != input.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password and confirm password do not match."})
		return
	}

	if !input.AgreeToTerms {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You must agree to the terms and conditions."})
		return
	}

	user := models.User{
		Name:      input.Name,
		Username:  input.Username,
		Email:     input.Email,
		Password:  input.Password,
		Gender:    input.Gender,
		BirthDate: input.BirthDate,
	}

	if err := h.service.Register(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Registered successfully!"})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var input dto.LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.service.Login(input.Identifier, input.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	token, err := middleware.GenerateToken(user.ID, input.RememberMe)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful!",
		"token":   token,
	})
}

func (h *AuthHandler) ForgotPassword(c *gin.Context) {
	var req struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	user, err := h.service.FindByEmail(req.Email)
	if err != nil {
		fmt.Println("Email tidak ditemukan:", req.Email)
		c.JSON(200, gin.H{"message": "If your email exists, a reset link has been sent."})
		return
	}

	token, _ := middleware.GenerateResetToken(user.Email)
	link := fmt.Sprintf("https://emospaces.com/reset-password?token=%s", token)

	body := fmt.Sprintf("Hi %s,\n\nClick this link to reset your password:\n%s", user.Name, link)

	if err := utils.SendSMTPEmail(user.Email, "Reset Your Password", body); err != nil {
		c.JSON(500, gin.H{"error": "Failed to send email"})
		return
	}

	c.JSON(200, gin.H{"message": "If your email exists, a reset link has been sent."})
}

func (h *AuthHandler) ResetPassword(c *gin.Context) {
	var req struct {
		Token       string `json:"token"`
		NewPassword string `json:"new_password"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	token, err := jwt.Parse(req.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil || !token.Valid {
		c.JSON(400, gin.H{"error": "Invalid or expired token"})
		return
	}

	claims := token.Claims.(jwt.MapClaims)
	email := claims["email"].(string)

	user, err := h.service.FindByEmail(email)
	if err != nil {
		c.JSON(400, gin.H{"error": "User not found"})
		return
	}

	hashed, err := utils.HashPassword(req.NewPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = hashed
	config.DB.Save(&user)

	c.JSON(200, gin.H{"message": "Password successfully reset"})
}

