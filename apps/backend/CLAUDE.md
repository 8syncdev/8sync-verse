# apps/backend — Agent Instructions

> **Encore.ts microservices** | Port 4000 (API) · 9400 (Encore dashboard)

## Purpose

The entire backend — auth, users, roles, courses, lessons, enrollments, and AI chat. Built with Encore.ts framework (TypeScript on Go runtime). Each `src/<service>/` directory is an independent Encore service.

## Commands

```bash
bun dev          # encore run — starts all services
bun lint         # tsc --noEmit (Biome excluded for backend)
bun test         # encore test
bun run gen:client   # regenerate API client → packages/core/src/api/client.ts
```

## Structure

```
src/
├── auth/          # JWT login, register, token refresh
├── user/          # User CRUD + profile
├── role/          # RBAC — assign/check roles
├── course/        # Course management
├── lesson/        # Lesson content + ordering
├── enrollment/    # Student ↔ course relationships
├── chat/          # AI agent conversations + token tracking
├── db/            # Drizzle ORM schema + migrations
└── utils/         # Shared DTOs, validators, helpers
```

## Key Rules

- **NO Biome** — backend is excluded from `biome.json` `files.includes`; use **tsc** only
- **Encore APIs** — export via `encore.dev/api`; never use raw express/fetch handlers
- **Drizzle ORM** — all DB access goes through Drizzle; raw SQL only in migrations
- **Zod** for request validation in every endpoint
- **bcrypt** for password hashing — never store plaintext
- **jsonwebtoken** for JWT — use `auth/` service for all token logic
- **No `any`** — TypeScript strict
- **Bun only** — no npm/yarn/pnpm

## After Schema Changes

```bash
# Re-generate the client for frontend packages
bun run gen:client
```

## Lint

```bash
bun lint        # tsc --noEmit
```
