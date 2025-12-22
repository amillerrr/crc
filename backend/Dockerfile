# Build Stage
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
# Compile to a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o main .

# Run Stage - using alpine so healthcheck works
FROM alpine:3.21
WORKDIR /app

# Install wget for healthcheck and ca-certificates for HTTPS
RUN apk add --no-cache wget ca-certificates

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/main .

# Change ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

CMD ["./main"]
