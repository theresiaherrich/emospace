package utils

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

func UploadImageToSupabase(file multipart.File, fileHeader *multipart.FileHeader, userID uint) (string, error) {
	defer file.Close()

	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_API_KEY")
	bucket := "avatars"

	ext := filepath.Ext(fileHeader.Filename)
	timestamp := time.Now().Unix()
	objectName := fmt.Sprintf("%d_%d%s", userID, timestamp, ext)

	uploadURL := fmt.Sprintf("%s/storage/v1/object/%s/%s", supabaseURL, bucket, objectName)

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		fmt.Printf("Failed to read file: %v\n", err)
		return "", err
	}

	fmt.Printf("📤 Uploading to URL: %s\n", uploadURL)
	fmt.Printf("📦 File size: %d bytes\n", len(fileBytes))

	req, err := http.NewRequest("PUT", uploadURL, bytes.NewReader(fileBytes))
	if err != nil {
		fmt.Printf("Failed to create request: %v\n", err)
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+supabaseKey)
	req.Header.Set("Content-Type", fileHeader.Header.Get("Content-Type"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("HTTP request failed: %v\n", err)
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		bodyBytes, _ := io.ReadAll(resp.Body)
		fmt.Printf("Upload failed with status %s: %s\n", resp.Status, string(bodyBytes))
		return "", fmt.Errorf("upload failed: %s | %s", resp.Status, string(bodyBytes))
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", supabaseURL, bucket, objectName)
	fmt.Printf("✅ Upload success! Public URL: %s\n", publicURL)

	return publicURL, nil
}
