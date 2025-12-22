# Build Stage
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod ./
# Download dependencies (if any)
RUN go mod download
COPY . .
# Compile to a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o main .

# Run Stage - using distroless for minimal attack surface
FROM gcr.io/distroless/static-debian12
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
USER nonroot:nonroot
CMD ["./main"]
