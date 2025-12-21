# Build Stage
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY . .
# Compile to a static binary (tiny size)
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Run Stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
