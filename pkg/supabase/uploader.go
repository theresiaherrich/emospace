package supabase

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strings"
	"time"
)

var (
	supabaseURL       = os.Getenv("SUPABASE_URL")             // e.g. https://xyzcompany.supabase.co
	supabaseAPIKey    = os.Getenv("SUPABASE_API_KEY")         // service_role token
	supabaseBucketURL = supabaseURL + "/storage/v1/object"    // base URL for upload
)

func UploadJournalImage(fileHeader *multipart.FileHeader, userID uint) (string, error) {
	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}

	path := fmt.Sprintf("journals/user-%d-%d-%s", userID, time.Now().Unix(), fileHeader.Filename)
	uploadURL := fmt.Sprintf("%s/journals/%s", supabaseBucketURL, path)

	req, err := http.NewRequest("POST", uploadURL, bytes.NewReader(fileBytes))
	if err != nil {
		return "", err
	}

	req.Header.Set("Authorization", "Bearer "+supabaseAPIKey)
	req.Header.Set("Content-Type", fileHeader.Header.Get("Content-Type"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return "", fmt.Errorf("failed to upload image: %s", resp.Status)
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/journals/%s", supabaseURL, path)
	return publicURL, nil
}

func DeleteImageFromSupabase(publicURL string) error {
	parts := strings.Split(publicURL, "/journals/")
	if len(parts) != 2 {
		return fmt.Errorf("invalid journal image URL")
	}
	path := "journals/" + parts[1]

	req, err := http.NewRequest("DELETE", fmt.Sprintf("%s/%s", supabaseBucketURL, path), nil)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+supabaseAPIKey)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return fmt.Errorf("failed to delete image: %s", resp.Status)
	}
	return nil
}