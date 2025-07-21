package dto

import "mime/multipart"

type CreateJournalRequest struct {
	Title   string                `form:"title" binding:"required"`
	Content string                `form:"content" binding:"required"`
	Image   *multipart.FileHeader `form:"image"`
}

type JournalResponse struct {
	ID       uint   `json:"id"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Date     string `json:"date"`
	ImageURL string `json:"image_url,omitempty"`
}
