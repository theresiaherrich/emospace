package dto

type PremiumPlanDTO struct {
	Name     	string `json:"name"`
	Code     	string `json:"code"`
	Price    	int64  `json:"price"`
	Duration 	int    `json:"duration_days"`
	Featured 	bool   `json:"featured"`
	Description string `json:"desc"`
}