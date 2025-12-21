package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func contactHandler(w http.ResponseWriter, r *http.Request) {
	// Security: Ensure only POST requests are allowed
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ContactRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// TODO: Integrate SendGrid or SMTP here to actually email the client
	log.Printf("📩 New Inquiry Received:\nName: %s\nEmail: %s\nMessage: %s\n", req.Name, req.Email, req.Message)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"success", "message":"Inquiry received"}`))
}

func main() {
	http.HandleFunc("/contact", contactHandler)

	fmt.Println("💎 Carmel Rose Backend running on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
