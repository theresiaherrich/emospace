package scheduler

import (
	"emospaces-backend/internal/service"
	"github.com/robfig/cron/v3"
)

func Start(reminderService service.ReminderService) {
	c := cron.New()
	c.AddFunc("0 0 13 * * *", func() { // jam 13:00 WIB
		reminderService.SendDailyReminders()
	})
	c.Start()
}
