# apps/web/agent — Agent Instructions

> **agent.8syncdev.com** | Next.js 16 | Port 3002

## Purpose

AI agent chat interface — users interact with LLM-powered tutors, get course recommendations, and track token usage.

## Commands

```bash
bun dev          # dev server on :3002 (turbopack)
bun build        # production build
bun lint         # biome check src/
bun format       # biome format --write src/
```

## Structure

```
src/
├── app/           # App Router pages (chat, history, settings)
└── components/    # Chat UI components
```

## Key Rules

- **Server Components by default** — chat stream UI requires `"use client"`
- **`@8sync/core`** for API client (chat, auth services)
- **`@8sync/ui`** for design system
- **Biome** for lint — NOT ESLint
- **No `any`** — TypeScript strict

## Data Flow

```
Browser → @8sync/core API client → apps/backend chat service → LLM provider
```

Backend services consumed: `chat`, `auth`, `user`

## Lint

```bash
biome check src/
```
