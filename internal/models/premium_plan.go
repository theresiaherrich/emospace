package models

import "gorm.io/gorm"

type PremiumPlan struct {
	gorm.Model
	Name     	string `json:"name"`    // e.g., "Monthly", "Quarterly", "Annual"
	Code     	string `json:"code"`    // e.g., "monthly", "quarterly", "annual"
	Price    	int64  `json:"price"`
	Duration 	int    `json:"duration_days"` // in days
	Featured 	bool   `json:"featured"`
	Description string `json:"desc"`
}