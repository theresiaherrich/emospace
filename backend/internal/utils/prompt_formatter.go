package utils

import (
	"emospaces-backend/internal/models"
	"fmt"
	"time"
)

func FormatMoodPrompt(month time.Time, moods []models.Mood) string {
	result := fmt.Sprintf("Bulan: %s\n\n", month.Format("January 2006"))
	result += "Riwayat mood harian:\n"
	for _, m := range moods {
		result += fmt.Sprintf("- %s: %s\n", m.Date.Format("02 Jan"), m.MoodCode)
	}

	result += `

Buatkan ringkasan suasana hati user selama bulan ini berdasarkan data di atas.
Gunakan nada yang suportif, hangat, dan beri afirmasi positif.
Hindari diagnosa medis.
Tampilkan ringkasan emosi dan beri semangat agar user merasa didengar.

Contoh gaya: 
"Hari-hari kamu tidak selalu mudah, tapi kamu telah menjalaninya dengan baik..."`

	return result
}
