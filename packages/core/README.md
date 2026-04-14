# @8sync/core — Shared Logic

Shared auth client, hooks, types, constants, and utilities consumed by all 8 Sync Verse web apps.

## Install / Usage

Workspace dependency — no publish needed.

```json
{ "dependencies": { "@8sync/core": "workspace:*" } }
```

```ts
// Auth utilities & hooks
import { useAuth, getSession } from "@8sync/core";

// Auto-generated API client (do NOT edit manually)
import { Client } from "@8sync/core/api";
```

## Commands

```bash
# Lint (from repo root)
bunx biome check packages/core/

# Auto-fix
bunx biome check --write packages/core/
```

## Directory Layout

```
packages/core/
├── src/
│   ├── api/
│   │   └── client.ts   # ⚠️  AUTO-GENERATED — do not edit
│   ├── auth/           # Session helpers, auth utilities
│   ├── constants/      # Shared app-wide constants
│   ├── hooks/          # Shared React hooks
│   ├── types/          # Shared TypeScript types & interfaces
│   ├── utils/          # Pure utility functions
│   └── index.ts        # Public barrel export
├── package.json
├── CLAUDE.md
└── README.md
```

## ⚠️ Auto-generated File

`src/api/client.ts` is generated from the Encore backend schema. **Never edit it manually.**

To regenerate after backend changes:

```bash
cd apps/backend
encore gen client --target=ts --output=../../packages/core/src/api/client.ts .
```

## Exports

| Path | Contents |
|------|----------|
| `@8sync/core` | Auth helpers, hooks, types, constants, utils |
| `@8sync/core/api` | Auto-generated Encore API client |

## Key Rules

- Keep this package framework-agnostic where possible — React hooks are the only React dependency.
- Do **not** import from `@8sync/ui` here (avoid circular deps).
- All public exports must flow through `src/index.ts` (except `@8sync/core/api`).
