# packages/core — Agent Instructions

> **@8sync/core** | Shared logic — hooks, types, API client, utilities

## Purpose

Cross-app shared layer: the generated Encore API client, authentication helpers, React hooks, TypeScript types, constants, and utility functions. Every `apps/web/*` imports from here for anything non-UI.

## Structure

```
src/
├── api/
│   └── client.ts     # Auto-generated Encore client (DO NOT edit manually)
├── auth/             # Auth helpers: token storage, isAuthenticated, role checks
├── constants/        # App-wide constants (API URLs, route names, etc.)
├── hooks/            # Reusable React hooks (useAuth, useCourse, etc.)
├── types/            # Shared TypeScript interfaces and types
├── utils/            # Pure utility functions (formatDate, slugify, etc.)
└── index.ts          # Barrel export
```

## Key Rules

- **`src/api/client.ts` is generated** — run `bun run gen:client` in `apps/backend/` to regenerate; never edit manually
- **No UI** — no JSX, no React components; this package is logic-only
- **No API calls outside `api/`** — use the generated client; never use raw fetch in hooks
- **Biome** for lint — NOT ESLint
- **No `any`** — TypeScript strict
- **Bun only** — no npm/yarn/pnpm

## Regenerating the API Client

```bash
# From apps/backend/
bun run gen:client
# Writes to: packages/core/src/api/client.ts
```

## Lint

```bash
biome check      # from packages/core/
biome check --write  # auto-fix
```
