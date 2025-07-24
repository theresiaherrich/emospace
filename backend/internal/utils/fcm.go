package utils

import (
	"context"
	"firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

var FCMClient *messaging.Client

func InitFCM(path string) error {
	opt := option.WithCredentialsFile(path)
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return err
	}
	client, err := app.Messaging(context.Background())
	if err != nil {
		return err
	}
	FCMClient = client
	return nil
}

func SendPushNotification(toToken, title, body string) error {
	msg := &messaging.Message{
		Token: toToken,
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
	}
	_, err := FCMClient.Send(context.Background(), msg)
	return err
}
