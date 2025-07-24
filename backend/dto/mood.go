package dto

type MoodRequest struct {
	MoodCode string `json:"mood_code" binding:"required"` // contoh: "MOOD_SAD"
}

type MoodCalendarResponse struct {
	Date     string `json:"date"`       // format: 2025-07-01
	MoodCode string `json:"mood_code"`  // contoh: "MOOD_HAPPY"
	Color    string `json:"color"`      
}
