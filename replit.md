# Personal Branding Website

## Overview

A production-ready personal branding website for a technical professional. Built as a pnpm monorepo with a React + Vite frontend and an Express 5 API backend. Both are served from a single Node.js process.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 22+
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS v4 + React Router v7
- **Backend**: Express 5 (also serves frontend static files)
- **Database**: PostgreSQL + Drizzle ORM
- **Session auth**: cookie-session (admin panel)
- **Rate limiting**: express-rate-limit (contact form: 5 req/15 min)
- **Logging**: Pino (JSON in prod, pretty in dev)
- **Validation**: Zod (generated from OpenAPI spec)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle for server), Vite (frontend)
- **Deployment**: Dockerfile + docker-compose.yml included

## Pages

- `/` — Home page with skills and featured projects
- `/about` — About page with experience timeline
- `/projects` — Projects page (fetches from DB)
- `/contact` — Contact form (server-side validation + rate limited)
- `/admin` — Admin panel (protected by username/password, lists contact submissions)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/web run build` — build frontend into api-server/public/
- `pnpm --filter @workspace/web run dev` — run frontend dev server
- `pnpm --filter @workspace/scripts run seed` — seed sample projects and admin user

## Architecture

```
artifacts/api-server/   # Express 5 API + serves built frontend
artifacts/web/          # React + Vite frontend (builds to api-server/public/)
lib/db/                 # Drizzle ORM schema: contacts, projects, admins tables
lib/api-spec/           # OpenAPI spec (source of truth for API contract)
lib/api-zod/            # Generated Zod validators
lib/api-client-react/   # Generated React Query hooks
scripts/                # Seed script
```

## Environment Variables

See `.env.example` for the full list. Required:
- `PORT` — server port
- `SESSION_SECRET` — cookie session signing key
- `DATABASE_URL` — PostgreSQL connection string

## Deployment

See `README.md` for full Linux deployment instructions, Nginx config, Docker Compose setup, and API reference.
