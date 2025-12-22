# Carmel Rose Collective Website

A beautifully designed website for an experiential marketing and brand activation company.

## Tech Stack

- **Frontend**: Next.js 14 (TypeScript, Tailwind CSS)
- **Backend**: Go 1.22 (minimal REST API)
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

## Features

### Design
- Elegant luxury aesthetic with cream/charcoal palette
- Responsive mobile-first design
- Smooth CSS animations (no heavy JS libraries)
- Accessible with proper focus states and ARIA labels
- Respects `prefers-reduced-motion`

### Security
- Comprehensive security headers (HSTS, CSP, etc.)
- Input validation on both client and server
- Rate limiting on contact endpoint
- Request size limits
- Non-root container users

### Performance
- Server-side rendering where possible
- Optimized Next.js Image component
- Framer Motion removed in favor of CSS animations
- Gzip/Zstd compression
- Minimal client-side JavaScript

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

### Environment Variables

For production, update these in `docker-compose.yml`:

- `NODE_ENV`: Set to `production`
- Update email in `Caddyfile` for SSL certificate notifications

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

**Response:**
```json
{
  "status": "success",
  "message": "Inquiry received. We will be in touch shortly."
}
```

### GET /api/health

Health check endpoint for container orchestration.

```json
{
  "status": "healthy",
  "message": "Service is running"
}
```

## Customization

### Adding Your Logo

Replace the text in `Hero.tsx` with your SVG logo:

```tsx
{/* Replace this span with your SVG */}
<span className="font-script text-8xl ...">Rose</span>

{/* With something like: */}
<img src="/logo.svg" alt="Rose" className="h-32 md:h-48" />
```

### Updating Images

Replace Unsplash URLs in `Portfolio.tsx` and `About.tsx` with your own images. For best results:

1. Add images to `frontend/public/images/`
2. Update image paths in components
3. Consider using Next.js `<Image>` component for optimization

### Email Integration

The backend currently logs contact submissions. To send emails:

1. Add SendGrid, AWS SES, or SMTP credentials
2. Update `contactHandler` in `backend/main.go`
3. Add environment variables for API keys

## License

Private - All Rights Reserved
