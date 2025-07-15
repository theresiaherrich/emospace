package routes

import (
	"emospaces-backend/internal/handler"
	"emospaces-backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterAIRoutes(rg *gin.RouterGroup, aiHandler *handler.AIHandler) {
	chat := rg.Group("/ai")
	chat.Use(middleware.JWTMiddleware())
	{
		chat.POST("/chat", aiHandler.HandleChat)
		chat.GET("/welcome", aiHandler.Welcome)
		chat.GET("/search", aiHandler.SearchUserInputOnly)
	}
}