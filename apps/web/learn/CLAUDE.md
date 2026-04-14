# apps/web/learn — Agent Instructions

> **learn-it.8syncdev.com** | Next.js 16 | Port 3001

## Purpose

E-learning platform — courses, lessons, quizzes, and IELTS/language learning flows. The primary student-facing app.

## Commands

```bash
bun dev          # dev server on :3001 (turbopack)
bun build        # production build
bun lint         # biome check src/
bun format       # biome format --write src/
```

## Structure

```
src/
├── app/           # Next.js App Router: course routes, lesson player, dashboard
└── components/    # Feature components (course card, lesson player, quiz, etc.)
```

## Key Rules

- **Server Components by default** — `"use client"` only for interactive UI
- **`@8sync/core`** for API calls — use the generated Encore client from `@8sync/core/api`
- **`@8sync/ui`** for all design tokens and primitives
- **Biome** for lint — NOT ESLint
- **No `any`** — TypeScript strict

## Data Flow

```
Browser → @8sync/core API client → apps/backend (Encore)
```

Backend services consumed: `course`, `lesson`, `enrollment`, `auth`

## Lint

```bash
biome check src/
```
