---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T01: Add 15+ shadcn components vào packages/ui

bunx shadcn add input textarea dialog tabs avatar dropdown-menu select switch checkbox radio-group progress skeleton alert toast — rồi move vào packages/ui/src/primitives/, fix imports

## Inputs

- `shadcn registry`

## Expected Output

- `packages/ui/src/primitives/input.tsx`
- `packages/ui/src/primitives/dialog.tsx`
- `packages/ui/src/primitives/tabs.tsx`
- `...15+ files`

## Verification

biome check packages/ui/ — 0 errors, tất cả components export từ @8sync/ui
