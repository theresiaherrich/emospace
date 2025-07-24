package ai

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"fmt"
	"os"

	"github.com/go-resty/resty/v2"
)

const GeminiEndpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

func GeminiCall(prompt string) (string, error) {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		return "", ErrMissingAPIKey
	}

	client := resty.New()
	resp := struct {
		Candidates []struct {
			Content struct {
				Parts []struct {
					Text string `json:"text"`
				} `json:"parts"`
			} `json:"content"`
		} `json:"candidates"`
	}{}

	reqBody := map[string]interface{}{
		"contents": []map[string]interface{}{
			{
				"role": "user",
				"parts": []map[string]string{
					{"text": prompt},
				},
			},
		},
	}

	r, err := client.R().
		SetQueryParam("key", apiKey).
		SetBody(reqBody).
		SetResult(&resp).
		Post(GeminiEndpoint)

	if err != nil {
		return "", err
	}

	if r.StatusCode() != 200 {
	return "", fmt.Errorf("Gemini gagal: %d - %s", r.StatusCode(), r.String())
}
	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", ErrEmptyResponse
	}

	return resp.Candidates[0].Content.Parts[0].Text, nil
}

var (
	ErrMissingAPIKey  = &GeminiError{"API Key Gemini tidak ditemukan"}
	ErrEmptyResponse  = &GeminiError{"Gemini tidak memberikan balasan"}
)

type GeminiError struct {
	Msg string
}

func (e *GeminiError) Error() string {
	return e.Msg
}

type GeminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

func SendToGemini(prompt string) (string, error) {
	apiKey := os.Getenv("GEMINI_API_KEY")
	url := "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey

	payload := map[string]interface{}{
		"contents": []map[string]interface{}{
			{
				"role": "user",
				"parts": []map[string]string{
					{"text": prompt},
				},
			},
		},
	}
	jsonPayload, _ := json.Marshal(payload)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonPayload))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	var geminiResp GeminiResponse
	json.Unmarshal(body, &geminiResp)

	if len(geminiResp.Candidates) > 0 {
		return geminiResp.Candidates[0].Content.Parts[0].Text, nil
	}
	return "Maaf, aku belum bisa membalas sekarang.", nil
}