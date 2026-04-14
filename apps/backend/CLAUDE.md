# 8 Sync Verse Backend — Encore.ts

> **Framework**: Encore.dev (TypeScript) | **ORM**: Drizzle | **DB**: PostgreSQL

## Run

```bash
# From project root
bun run dev:be          # encore run

# Or directly
cd apps/backend
encore run              # Start dev server (auto dashboard at localhost:9400)
encore test             # Run tests
```

## Architecture

Each folder in `src/` is an **Encore service** (microservice):

```
src/
├── auth/          # Login, register, JWT, refresh tokens
├── user/          # User CRUD, profile
├── role/          # RBAC roles & permissions
├── course/        # Course management
├── lesson/        # Lesson content
├── enrollment/    # User-course enrollment
├── chat/          # AI agent chat, token usage tracking
└── utils/         # Shared DTOs, pagination
```

## Service Pattern

```
svc/
├── encore.service.ts     # Service declaration
├── svc.controller.ts     # API endpoints (encore api())
├── svc.service.ts        # Business logic
├── svc.dto.ts            # Request/response types
├── db/
│   ├── svc.db.ts         # Drizzle DB instance
│   └── svc.schema.ts     # Drizzle table schema
└── index.ts              # Re-exports
```

## Rules

1. **NO biome** — Encore uses tsc for lint (`tsc --noEmit`)
2. **Encore API pattern** — `api({ expose, method, path }, handler)`
3. **Drizzle ORM** — type-safe, no raw SQL
4. **Each service = own DB** — Encore manages per-service databases
5. **TypeScript strict** — no `any`
