# Carmel Rose Collective Website

A beautifully designed website for an experiential marketing and brand activation company.

## Tech Stack

- **Frontend**: Next.js 14 (TypeScript, Tailwind CSS)
- **Backend**: Go 1.23 (minimal REST API)
- **Server**: Caddy (reverse proxy, automatic HTTPS)
- **Container**: Docker & Docker Compose

## Project Structure

```
├── frontend/
│   ├── app/
│   │   ├── globals.css      # Global styles & animations
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── page.tsx         # Main page (server component)
│   ├── components/
│   │   ├── Navigation.tsx   # Mobile-responsive nav (client)
│   │   ├── Hero.tsx         # Hero section
│   │   ├── Services.tsx     # Services grid
│   │   ├── Portfolio.tsx    # Image gallery
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form (client)
│   │   ├── Footer.tsx       # Footer
│   │   └── index.ts         # Barrel exports
│   ├── public/              # Static assets
│   ├── Dockerfile
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── backend/
│   ├── main.go              # Go API server
│   ├── go.mod
│   └── Dockerfile
├── Caddyfile                 # Caddy server config
├── docker-compose.yml
└── README.md
```

## Getting Started

### Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
go run main.go
```

### Production (Docker)

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The site will be available at:
- HTTP: http://localhost (redirects to HTTPS)
- HTTPS: https://localhost

## API Endpoints

### POST /api/contact

Submit a contact inquiry.

```json
{
  "name": "string (required, max 200 chars)",
  "email": "string (required, valid email, max 254 chars)",
  "message": "string (required, max 5000 chars)"
}
```

### GET /api/health

Health check endpoint for container orchestration.

## License

Private - All Rights Reserved
