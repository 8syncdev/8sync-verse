# 8 Sync Verse — Agent Instructions

> **Monorepo**: Turborepo + Bun | **FE**: Next.js 16 | **BE**: Encore.ts | **100% TypeScript**

## Architecture

```
apps/
├── web/                   # Next.js apps (FE + SSR)
│   ├── main/              # 8syncdev.com (:3000)
│   ├── learn/             # learn-it.8syncdev.com (:3001)
│   ├── agent/             # agent.8syncdev.com (:3002)
│   └── admin/             # admin.8syncdev.com (:3003)
├── backend/               # Encore.ts microservices (BE :4000, dashboard :9400)
│   └── src/
│       ├── auth/          # JWT auth, login, register
│       ├── user/          # User CRUD
│       ├── role/          # RBAC
│       ├── course/        # Course management
│       ├── lesson/        # Lesson content
│       ├── enrollment/    # Enrollments
│       ├── chat/          # AI agent chat, token usage
│       └── utils/         # Shared DTOs
├── desktop/               # Tauri wrappers
│   ├── learn/
│   └── agent/
└── mobile/                # Capacitor wrappers
    ├── learn/
    └── agent/

packages/
├── ui/                    # Verse design system + canvas 3D
├── core/                  # Shared hooks, types, API client
├── ai/                    # LLM layer
├── db/                    # (unused — Encore manages DB)
└── config/                # Shared tsconfig
```

## Commands

```bash
.\dev.ps1              # ALL (BE + FE)
.\dev.ps1 web          # All web apps only
.\dev.ps1 be           # Encore backend only
.\dev.ps1 main         # Only 8syncdev.com
bun build              # Build all web apps
bun run dev:be         # Encore backend
```

## Lint Rules

| Target | Tool | Command |
|--------|------|---------|
| `apps/web/*` | **Biome** | `biome check src/` |
| `packages/*` | **Biome** | `biome check` |
| `apps/backend/` | **tsc** (NO biome) | `tsc --noEmit` |

## Code Rules

1. **Server Components default** — `"use client"` only for interactivity
2. **Biome** for web/packages — NOT ESLint
3. **tsc** for Encore backend — Biome excluded via `files.includes`
4. **No `any`** — TypeScript strict
5. **Verse theme** — All UI uses `@8sync/ui` tokens
6. **Bun only** — No npm/yarn/pnpm
7. **ALL deps must be latest** — check npm before adding
