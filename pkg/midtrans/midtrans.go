package midtrans

import (
	"os"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

func CreateSnapTransaction(orderID string, userID uint, amount int64, name, email string) (string, string, error) {
	midtrans.ServerKey = os.Getenv("MIDTRANS_SERVER_KEY")
	midtrans.Environment = midtrans.Sandbox

	snapReq := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  orderID,
			GrossAmt: amount,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: name,
			Email: email,
		},
	}

	snapResp, err := snap.CreateTransaction(snapReq)
	if err != nil {
		return "", "", err
	}

	return snapResp.Token, snapResp.RedirectURL, nil
}

