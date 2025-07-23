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

func UploadConsultanImage(fileHeader *multipart.FileHeader, consultanName string) (string, error) {
	supabaseURL := os.Getenv("SUPABASE_URL")
	apiKey := os.Getenv("SUPABASE_API_KEY")
	bucketURL := supabaseURL + "/storage/v1/object"


	file, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer file.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}

	safeName := strings.ReplaceAll(strings.ToLower(consultanName), " ", "-")
	path := fmt.Sprintf("consultans/%s-%d-%s", safeName, time.Now().Unix(), fileHeader.Filename)
	uploadURL := fmt.Sprintf("%s/%s", bucketURL, path)

	req, err := http.NewRequest("POST", uploadURL, bytes.NewReader(fileBytes))
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", fileHeader.Header.Get("Content-Type"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("failed to upload consultan image: %s, %s", resp.Status, string(body))
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/consultans/%s", supabaseURL, path)
	return publicURL, nil
}

func DeleteConsultanImage(publicURL string) error {
	supabaseURL := os.Getenv("SUPABASE_URL")
	apiKey := os.Getenv("SUPABASE_API_KEY")
	bucketURL := supabaseURL + "/storage/v1/object"

	parts := strings.Split(publicURL, "/consultans/")
	if len(parts) != 2 {
		return fmt.Errorf("invalid consultan image URL")
	}
	path := "consultans/" + parts[1]

	req, err := http.NewRequest("DELETE", fmt.Sprintf("%s/%s", bucketURL, path), nil)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("failed to delete consultan image: %s, %s", resp.Status, string(body))
	}
	return nil
}
