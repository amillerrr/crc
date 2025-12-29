package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"os/signal"
	"regexp"
	"strings"
	"sync"
	"syscall"
	"time"
)

// Config constants
const (
	maxRequestSize  = 1 << 20 // 1MB max request body
	maxNameLen      = 200
	maxEmailLen     = 254
	maxMessageLen   = 5000
	readTimeout     = 10 * time.Second
	writeTimeout    = 10 * time.Second
	idleTimeout     = 60 * time.Second
	shutdownTimeout = 30 * time.Second

	// Rate limiting
	rateLimitWindow   = 1 * time.Minute
	rateLimitRequests = 5 // 5 requests per minute per IP
)

// Stricter email regex - requires valid TLD length and proper domain format
var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9][a-zA-Z0-9.\-]*\.[a-zA-Z]{2,63}$`)

type contextKey string

const requestIDKey contextKey = "requestID"

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

type APIResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// RateLimiter provides simple in-memory rate limiting per IP
type RateLimiter struct {
	mu       sync.Mutex
	requests map[string][]time.Time
	limit    int
	window   time.Duration
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	rl := &RateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
	// Cleanup old entries periodically
	go rl.cleanup()
	return rl
}

func (rl *RateLimiter) cleanup() {
	ticker := time.NewTicker(5 * time.Minute)
	for range ticker.C {
		rl.mu.Lock()
		now := time.Now()
		for ip, times := range rl.requests {
			valid := times[:0]
			for _, t := range times {
				if now.Sub(t) < rl.window {
					valid = append(valid, t)
				}
			}
			if len(valid) == 0 {
				delete(rl.requests, ip)
			} else {
				rl.requests[ip] = valid
			}
		}
		rl.mu.Unlock()
	}
}

func (rl *RateLimiter) Allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-rl.window)

	// Filter old requests
	valid := rl.requests[ip][:0]
	for _, t := range rl.requests[ip] {
		if t.After(cutoff) {
			valid = append(valid, t)
		}
	}
	rl.requests[ip] = valid

	if len(rl.requests[ip]) >= rl.limit {
		return false
	}
	rl.requests[ip] = append(rl.requests[ip], now)
	return true
}

// Structured logging helper
func logJSON(level, message string, fields map[string]any) {
	entry := map[string]any{
		"timestamp": time.Now().UTC().Format(time.RFC3339),
		"level":     level,
		"message":   message,
	}
	for k, v := range fields {
		entry[k] = v
	}
	if err := json.NewEncoder(os.Stdout).Encode(entry); err != nil {
		fmt.Fprintf(os.Stderr, "logging error: %v\n", err)
	}
}

func sendJSON(w http.ResponseWriter, status int, response APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		logJSON("error", "Failed to encode response", map[string]any{
			"error": err.Error(),
		})
	}
}

// getClientIP extracts the real client IP, considering proxy headers
func getClientIP(r *http.Request) string {
	// Check X-Forwarded-For first (set by Caddy)
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// Take the first IP in the chain
		if idx := strings.Index(xff, ","); idx != -1 {
			return strings.TrimSpace(xff[:idx])
		}
		return strings.TrimSpace(xff)
	}
	// Check X-Real-IP
	if xri := r.Header.Get("X-Real-IP"); xri != "" {
		return xri
	}
	// Fall back to RemoteAddr
	if idx := strings.LastIndex(r.RemoteAddr, ":"); idx != -1 {
		return r.RemoteAddr[:idx]
	}
	return r.RemoteAddr
}

// generateRequestID creates a unique request identifier
func generateRequestID() string {
	return fmt.Sprintf("%d-%d", time.Now().UnixNano(), rand.Int63()%100000)
}

// requestIDMiddleware adds a unique request ID to each request
func requestIDMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Header.Get("X-Request-ID")
		if requestID == "" {
			requestID = generateRequestID()
		}
		ctx := context.WithValue(r.Context(), requestIDKey, requestID)
		w.Header().Set("X-Request-ID", requestID)
		next(w, r.WithContext(ctx))
	}
}

// rateLimitMiddleware applies rate limiting per IP
func rateLimitMiddleware(rl *RateLimiter, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ip := getClientIP(r)
		if !rl.Allow(ip) {
			requestID, _ := r.Context().Value(requestIDKey).(string)
			logJSON("warn", "Rate limit exceeded", map[string]any{
				"ip":         ip,
				"request_id": requestID,
			})
			sendJSON(w, http.StatusTooManyRequests, APIResponse{
				Status:  "error",
				Message: "Too many requests. Please try again later.",
			})
			return
		}
		next(w, r)
	}
}

func validateContactRequest(req *ContactRequest) (bool, string) {
	// Trim whitespace
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.Message = strings.TrimSpace(req.Message)

	// Check required fields
	if req.Name == "" {
		return false, "Name is required"
	}
	if req.Email == "" {
		return false, "Email is required"
	}
	if req.Message == "" {
		return false, "Message is required"
	}

	// Check lengths
	if len(req.Name) > maxNameLen {
		return false, "Name is too long"
	}
	if len(req.Email) > maxEmailLen {
		return false, "Email is too long"
	}
	if len(req.Message) > maxMessageLen {
		return false, "Message is too long"
	}

	// Validate email format
	if !emailRegex.MatchString(req.Email) {
		return false, "Invalid email format"
	}

	return true, ""
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	requestID, _ := r.Context().Value(requestIDKey).(string)
	clientIP := getClientIP(r)

	// Only allow POST
	if r.Method != http.MethodPost {
		sendJSON(w, http.StatusMethodNotAllowed, APIResponse{
			Status:  "error",
			Message: "Method not allowed",
		})
		return
	}

	// Check Content-Length before reading
	if r.ContentLength > maxRequestSize {
		sendJSON(w, http.StatusRequestEntityTooLarge, APIResponse{
			Status:  "error",
			Message: "Request too large",
		})
		return
	}

	// Limit request body size
	r.Body = http.MaxBytesReader(w, r.Body, maxRequestSize)

	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		logJSON("warn", "Failed to decode request body", map[string]any{
			"error":      err.Error(),
			"remote_ip":  clientIP,
			"request_id": requestID,
		})
		sendJSON(w, http.StatusBadRequest, APIResponse{
			Status:  "error",
			Message: "Invalid request body",
		})
		return
	}

	// Validate input
	if valid, errMsg := validateContactRequest(&req); !valid {
		sendJSON(w, http.StatusBadRequest, APIResponse{
			Status:  "error",
			Message: errMsg,
		})
		return
	}

	// Log the inquiry (structured)
	logJSON("info", "New inquiry received", map[string]any{
		"name":           req.Name,
		"email":          req.Email,
		"message_length": len(req.Message),
		"remote_ip":      clientIP,
		"request_id":     requestID,
	})

	// TODO: Integrate SendGrid or SMTP here to actually email the client

	sendJSON(w, http.StatusOK, APIResponse{
		Status:  "success",
		Message: "Inquiry received. We will be in touch shortly.",
	})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	sendJSON(w, http.StatusOK, APIResponse{
		Status:  "healthy",
		Message: "Service is running",
	})
}

func main() {
	// Seed random for request IDs
	rand.Seed(time.Now().UnixNano())

	// Initialize rate limiter
	rateLimiter := NewRateLimiter(rateLimitRequests, rateLimitWindow)

	mux := http.NewServeMux()

	// Apply middleware chain: requestID -> rateLimit -> handler
	mux.HandleFunc("/contact", requestIDMiddleware(rateLimitMiddleware(rateLimiter, contactHandler)))
	mux.HandleFunc("/health", healthHandler)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  readTimeout,
		WriteTimeout: writeTimeout,
		IdleTimeout:  idleTimeout,
	}

	// Channel to listen for shutdown signals
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGTERM)

	// Start server in goroutine
	go func() {
		logJSON("info", "Server starting", map[string]any{
			"port":             8080,
			"rate_limit":       rateLimitRequests,
			"rate_limit_window": rateLimitWindow.String(),
		})
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logJSON("error", "Server failed to start", map[string]any{
				"error": err.Error(),
			})
			os.Exit(1)
		}
	}()

	// Wait for shutdown signal
	<-done
	logJSON("info", "Shutdown signal received", nil)

	// Create context with timeout for graceful shutdown
	ctx, cancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer cancel()

	// Attempt graceful shutdown
	if err := server.Shutdown(ctx); err != nil {
		logJSON("error", "Server forced to shutdown", map[string]any{
			"error": err.Error(),
		})
		os.Exit(1)
	}

	logJSON("info", "Server gracefully stopped", nil)
}
