# Personal Branding Website

A production-ready personal branding website for a technical professional. Includes a full React frontend, Express API backend, PostgreSQL storage, admin panel, and Docker deployment support.

## Features

- Home, About, Projects, and Contact pages
- Responsive dark-themed design
- Contact form with server-side validation and rate limiting (5 submissions per 15 minutes per IP)
- All contact submissions stored in PostgreSQL
- Admin panel (`/admin`) protected by username/password to view submissions
- Health check endpoint at `/api/health`
- Structured JSON logs via Pino (pretty-printed in development)
- Environment variables for all secrets and config — no hardcoded values
- Seed script to populate sample project data and create an admin user

## Project Structure

```
.
├── artifacts/
│   ├── api-server/          # Express 5 backend (serves API + built frontend)
│   └── web/                 # React + Vite frontend (builds into api-server/public/)
├── lib/
│   ├── db/                  # Drizzle ORM schema + PostgreSQL client
│   ├── api-spec/            # OpenAPI spec + codegen config
│   ├── api-zod/             # Generated Zod validation schemas
│   └── api-client-react/    # Generated React Query hooks
├── scripts/                 # Utility scripts (seed)
├── Dockerfile               # Multi-stage production Docker image
├── docker-compose.yml       # Full stack: app + PostgreSQL
└── .env.example             # Example environment variables
```

## Quick Start (Linux)

### Prerequisites

- Node.js 22+
- pnpm 10+
- PostgreSQL 16+ (or use Docker Compose)

### 1. Clone and install dependencies

```bash
git clone <your-repo>
cd <your-repo>
npm install -g pnpm
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — set SESSION_SECRET, DATABASE_URL, and ADMIN_PASSWORD at minimum
nano .env
```

### 3. Push database schema

```bash
pnpm --filter @workspace/db run push
```

### 4. Seed sample data and admin user

```bash
pnpm --filter @workspace/scripts run seed
```

The seed script reads `ADMIN_USERNAME` (default: `admin`) and `ADMIN_PASSWORD` (default: `changeme123`) from your `.env`. Change these before running in production.

### 5. Build the frontend

```bash
pnpm --filter @workspace/web run build
```

### 6. Run the server

```bash
pnpm --filter @workspace/api-server run start
# Or for development with auto-rebuild:
pnpm --filter @workspace/api-server run dev
```

The server listens on `PORT` (default: 3000). Open `http://localhost:3000` to view the site.

The admin panel is at `http://localhost:3000/admin`.

---

## Docker Deployment

### Build and run with Docker Compose

```bash
cp .env.example .env
# Edit .env — set SESSION_SECRET and ADMIN_PASSWORD
nano .env

docker compose up --build -d
```

The app will be available at `http://localhost:3000`.

To seed sample data after startup:

```bash
docker compose exec app sh -c "DATABASE_URL=<your-db-url> node --enable-source-maps ./dist/seed.mjs"
```

Or run the seed script locally with the container's database URL.

### Build Docker image only

```bash
docker build -t personal-site .
docker run -p 3000:3000 --env-file .env personal-site
```

---

## Nginx Reverse Proxy

The app listens on a configurable port and works behind Nginx with a simple proxy_pass configuration.

Example Nginx config (`/etc/nginx/sites-available/mysite`):

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

For HTTPS, use Certbot:

```bash
sudo certbot --nginx -d yourdomain.com
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | Yes | — | Port the HTTP server listens on |
| `NODE_ENV` | No | `development` | `development` or `production` |
| `LOG_LEVEL` | No | `info` | Pino log level |
| `SESSION_SECRET` | Yes | — | Secret key for signing session cookies |
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `ADMIN_USERNAME` | No | `admin` | Admin username (used by seed script) |
| `ADMIN_PASSWORD` | No | `changeme123` | Admin password (used by seed script) |
| `CORS_ORIGIN` | No | allow all | Allowed CORS origin |

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/projects` | List all projects |
| `POST` | `/api/contact` | Submit contact form (rate-limited: 5/15min) |
| `POST` | `/api/admin/login` | Admin login |
| `POST` | `/api/admin/logout` | Admin logout |
| `GET` | `/api/admin/contacts` | List contact submissions (auth required) |

---

## Development

### Run codegen after OpenAPI spec changes

```bash
pnpm --filter @workspace/api-spec run codegen
```

### Run type check across all packages

```bash
pnpm run typecheck
```

### Database schema changes

Edit files in `lib/db/src/schema/`, then push:

```bash
pnpm --filter @workspace/db run push
```

### Dev workflow

```bash
# Terminal 1 — API server (rebuilds on change)
pnpm --filter @workspace/api-server run dev

# Terminal 2 — Frontend dev server (hot reload)
pnpm --filter @workspace/web run dev
```
