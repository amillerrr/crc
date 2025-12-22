# Carmel Rose Collective Website

A beautifully designed website for an experiential marketing and brand activation company.

## Quick Start

```bash
# Build and start all services
docker-compose up -d --build

# The site will be available at:
# https://localhost (you'll need to accept the self-signed certificate)
```

## Debugging

If the page doesn't load, run these commands:

```bash
# Check container status
docker-compose ps

# Check if all containers are healthy
docker-compose ps --format "table {{.Name}}\t{{.Status}}"

# View Caddy logs
docker-compose logs caddy

# View Frontend logs
docker-compose logs frontend

# View Backend logs  
docker-compose logs backend

# Test if frontend is responding inside the network
docker-compose exec caddy wget -qO- http://frontend:3000

# Test if backend is responding
docker-compose exec caddy wget -qO- http://backend:8080/health
```

## Common Issues

### Browser shows certificate error
This is expected - Caddy uses a self-signed certificate for localhost. Click "Advanced" and "Proceed to localhost".

### Containers keep restarting
Check the logs with `docker-compose logs <service>` to see the error.

### Page loads but is blank
- Check browser console for JavaScript errors
- Ensure you're using https:// not http://

## Tech Stack

- **Frontend**: Next.js 14 (TypeScript, Tailwind CSS)
- **Backend**: Go 1.23 (minimal REST API)  
- **Server**: Caddy 2.10 (reverse proxy, automatic HTTPS)
- **Container**: Docker & Docker Compose

## Project Structure

```
├── frontend/           # Next.js application
│   ├── app/           # App router pages
│   ├── components/    # React components
│   └── public/        # Static assets
├── backend/           # Go API server
├── Caddyfile         # Caddy configuration
└── docker-compose.yml
```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check
