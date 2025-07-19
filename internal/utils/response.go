package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RespondError(c *gin.Context, status int, field, code, message string) {
	c.JSON(status, gin.H{
		"error": gin.H{
			"field":   field,
			"code":    code,
			"message": message,
		},
	})
}

func RespondSuccess(c *gin.Context, data any) {
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}