# @8sync/ui — Verse Design System

Shared UI library for all 8 Sync Verse web apps. Provides the **Verse theme**, **Galaxy 3D canvas**, animations, layout primitives, and composite components built on Radix UI + Tailwind CSS 4.

## Install / Usage

This package is a workspace dependency — no publish needed.

```json
// In any app's package.json
{ "dependencies": { "@8sync/ui": "workspace:*" } }
```

```ts
import { Button, GalaxyCanvas, VerseTheme } from "@8sync/ui";
import { cn } from "@8sync/ui";
```

## Commands

```bash
# Lint (from repo root)
bunx biome check packages/ui/

# Auto-fix
bunx biome check --write packages/ui/
```

## Directory Layout

```
packages/ui/
├── src/
│   ├── animations/     # Framer Motion variants & helpers
│   ├── canvas/         # Three.js Galaxy 3D background
│   ├── composites/     # Multi-part components (cards, modals, etc.)
│   ├── layouts/        # Page layout shells
│   ├── primitives/     # Base components (Button, Input, Badge…)
│   ├── theme/          # Verse color tokens, CSS variables
│   ├── utils.ts        # cn() and other utility helpers
│   └── index.ts        # Public barrel export
├── package.json
├── CLAUDE.md
└── README.md
```

## Key Rules

- **No business logic** — this package renders UI only; data fetching belongs in the app layer.
- All components must be importable from the root `@8sync/ui` barrel (`src/index.ts`).
- Use `cn()` (from `utils.ts`) for conditional class merging — do **not** import `clsx` or `twMerge` directly.
- Three.js / canvas code lives exclusively in `src/canvas/` and must be client-only (`"use client"`).
- Tailwind classes are applied via the apps' `tailwind.config.ts` — this package does **not** run its own Tailwind build.

## Dependencies

| Library | Role |
|---------|------|
| Radix UI | Accessible component primitives |
| Framer Motion | Animations |
| Three.js | Galaxy 3D canvas |
| class-variance-authority | Variant prop helpers |
| Tailwind CSS 4 | Utility-class styling |
