# apps/web/admin — Agent Instructions

> **admin.8syncdev.com** | Next.js 16 | Port 3003

## Purpose

Internal admin dashboard — manage users, roles, courses, enrollments, and monitor platform usage. Access restricted to admin role.

## Commands

```bash
bun dev          # dev server on :3003 (turbopack)
bun build        # production build
bun lint         # biome check src/
bun format       # biome format --write src/
```

## Structure

```
src/
├── app/           # App Router: /users, /courses, /roles, /enrollments, /chat-logs
└── components/    # Admin-specific tables, forms, modals
```

## Key Rules

- **Auth guard** — all routes require `admin` role; redirect to login if unauthenticated
- **Server Components by default** — `"use client"` only for interactive tables/forms
- **`@8sync/core`** for API client (all backend services)
- **`@8sync/ui`** for design tokens
- **Biome** for lint — NOT ESLint
- **No `any`** — TypeScript strict

## Data Flow

```
Browser → @8sync/core API client → apps/backend (all services)
```

Backend services consumed: `auth`, `user`, `role`, `course`, `lesson`, `enrollment`, `chat`

## Lint

```bash
biome check src/
```
