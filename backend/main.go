package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"os/signal"
	"regexp"
	"strings"
	"syscall"
	"time"
)

// Config constants
const (
	maxRequestSize = 1 << 20 // 1MB max request body
	maxNameLen     = 200
	maxEmailLen    = 254
	maxMessageLen  = 5000
	readTimeout    = 10 * time.Second
	writeTimeout   = 10 * time.Second
	idleTimeout    = 60 * time.Second
	shutdownTimeout = 30 * time.Second
)

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

type APIResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
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
	json.NewEncoder(os.Stdout).Encode(entry)
}

func sendJSON(w http.ResponseWriter, status int, response APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(response)
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
	// Only allow POST
	if r.Method != http.MethodPost {
		sendJSON(w, http.StatusMethodNotAllowed, APIResponse{
			Status:  "error",
			Message: "Method not allowed",
		})
		return
	}

	// Limit request body size
	r.Body = http.MaxBytesReader(w, r.Body, maxRequestSize)

	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		logJSON("warn", "Failed to decode request body", map[string]any{
			"error":     err.Error(),
			"remote_ip": r.RemoteAddr,
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
		"name":  req.Name,
		"email": req.Email,
		// Don't log full message for privacy, just length
		"message_length": len(req.Message),
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
	mux := http.NewServeMux()
	mux.HandleFunc("/contact", contactHandler)
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
			"port": 8080,
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
