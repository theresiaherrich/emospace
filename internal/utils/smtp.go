package utils

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendSMTPEmail(to, subject, body string) error {
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpEmail := os.Getenv("SMTP_EMAIL")
	smtpPass := os.Getenv("SMTP_PASSWORD")
	smtpName := os.Getenv("SMTP_NAME")

	auth := smtp.PlainAuth("", smtpEmail, smtpPass, smtpHost)

	msg := []byte("From: " + smtpName + " <" + smtpEmail + ">\r\n" +
		"To: " + to + "\r\n" +
		"Reply-To: " + smtpEmail + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"MIME-Version: 1.0\r\n" +
		"Content-Type: text/html; charset=\"UTF-8\"\r\n" +
		"\r\n" +
		body)

	addr := smtpHost + ":" + smtpPort
	err := smtp.SendMail(addr, auth, smtpEmail, []string{to}, msg)
	if err != nil {
		fmt.Println("❌ Failed to send SMTP email:", err)
		return err
	}

	fmt.Println("✅ SMTP email sent successfully to", to)
	return nil
}

