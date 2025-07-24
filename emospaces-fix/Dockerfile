FROM golang:alpine AS builder

WORKDIR /home/app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/main.go

FROM alpine:latest

WORKDIR /home/app

COPY --from=builder /home/app/server .

RUN chmod +x /home/app/server

CMD ["/home/app/server"]
