# S05: Documentation + CI — CLAUDE.md, README.md, lint scripts

**Goal:** Documentation đầy đủ cho agent track + CI-ready
**Demo:** Mỗi app/package có CLAUDE.md + README.md, bun lint chạy 0 errors

## Must-Haves

- Not provided.

## Proof Level

- This slice proves: Not provided.

## Integration Closure

Not provided.

## Verification

- Not provided.

## Tasks

- [ ] **T01: CLAUDE.md cho mỗi app + package** `est:20min`
  Viết CLAUDE.md cho: apps/web/main, learn, agent, admin, backend + packages/ui, core, ai
  - Files: `apps/web/main/CLAUDE.md`, `apps/web/learn/CLAUDE.md`, `apps/web/agent/CLAUDE.md`, `apps/web/admin/CLAUDE.md`, `apps/backend/CLAUDE.md`, `packages/ui/CLAUDE.md`
  - Verify: File exists + có nội dung hữu ích

- [ ] **T02: README.md cho mỗi package + root update** `est:15min`
  packages/ui/README.md, packages/core/README.md, root README update với full architecture
  - Files: `packages/ui/README.md`, `README.md`
  - Verify: README readable, commands work

- [ ] **T03: Final lint + build verify all** `est:10min`
  biome check 0 errors, tsc 0 errors backend, turbo build all apps, encore build
  - Verify: All commands pass

## Files Likely Touched

- apps/web/main/CLAUDE.md
- apps/web/learn/CLAUDE.md
- apps/web/agent/CLAUDE.md
- apps/web/admin/CLAUDE.md
- apps/backend/CLAUDE.md
- packages/ui/CLAUDE.md
- packages/ui/README.md
- README.md
