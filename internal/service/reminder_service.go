package service

import (
	"emospaces-backend/internal/repository"
	"emospaces-backend/internal/utils"
	"log"
)

type ReminderService interface {
	SendDailyReminders() error
}

type reminderService struct {
	userRepo repository.UserRepository
}

func NewReminderService(repo repository.UserRepository) ReminderService {
	return &reminderService{repo}
}

func (s *reminderService) SendDailyReminders() error {
	users, err := s.userRepo.GetUsersWithoutMoodOrJournalToday()
	if err != nil {
		return err
	}
	for _, user := range users {
		if user.FCMToken != "" {
			err := utils.SendPushNotification(user.FCMToken,
				"Yuk isi mood kamu hari ini!",
				"Jangan lupa curhat di EmoSpace ✨")
			if err != nil {
				log.Printf("Gagal kirim notifikasi ke %s: %v", user.Email, err)
			}
		}
	}
	return nil
}
