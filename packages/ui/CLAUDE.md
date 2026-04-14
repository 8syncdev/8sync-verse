# packages/ui — Agent Instructions

> **@8sync/ui** | Verse design system — shared across all web apps

## Purpose

The single source of truth for UI: design tokens (Verse theme), primitive components, composite components, canvas/3D utilities, layout helpers, and animations. All `apps/web/*` must import from here — never duplicate UI code.

## Structure

```
src/
├── theme/         # CSS variables, color palette, typography, spacing (Verse theme)
├── primitives/    # Atomic components: Button, Input, Badge, Card, etc.
├── composites/    # Composed UI: NavBar, Modal, DataTable, etc.
├── layouts/       # Page layout wrappers (Shell, Sidebar, etc.)
├── canvas/        # Three.js / R3F canvas utilities for 3D scenes
├── animations/    # Framer Motion presets and variants
├── utils.ts       # cn() and other class utilities
└── index.ts       # Public barrel export
```

## Key Rules

- **Export everything from `index.ts`** — consumers do `import { X } from "@8sync/ui"`
- **No business logic** — pure UI only; no API calls, no auth checks
- **Verse theme tokens** — always use CSS variables from `theme/`; no hardcoded colors
- **Biome** for lint — NOT ESLint
- **No `any`** — TypeScript strict
- **Peer deps** — React and React-DOM are peer deps, not direct deps

## Adding a New Component

1. Add file under the appropriate directory (`primitives/` or `composites/`)
2. Export from that directory's `index.ts` (if exists) or directly from `src/index.ts`
3. Follow existing naming conventions (PascalCase component, kebab-case file)

## Lint

```bash
biome check      # from packages/ui/
biome check --write  # auto-fix
```
