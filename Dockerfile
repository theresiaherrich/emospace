FROM golang:alpine AS builder

WORKDIR /home/app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o server ./cmd/main.go

FROM alpine:latest

WORKDIR /home/app

# ⬅️ Copy binary yang sudah dibuild
COPY --from=builder /home/app/server .

# ⬅️ Tambahkan ini untuk menyalin .env ke image final
COPY --from=builder /home/app/.env .

# (Opsional) pastikan server bisa dijalankan
RUN chmod +x /home/app/server

CMD ["/home/app/server"]