# S01: Design System — shadcn components + Verse theme polish

**Goal:** 20+ shadcn components hoạt động chuẩn với Verse dark theme, PixelNetwork canvas optimized, demo page
**Demo:** Storybook-like demo page hiển thị tất cả components với Verse theme

## Must-Haves

- Not provided.

## Proof Level

- This slice proves: Not provided.

## Integration Closure

Not provided.

## Verification

- Not provided.

## Tasks

- [ ] **T01: Add 15+ shadcn components vào packages/ui** `est:30min`
  bunx shadcn add input textarea dialog tabs avatar dropdown-menu select switch checkbox radio-group progress skeleton alert toast — rồi move vào packages/ui/src/primitives/, fix imports
  - Files: `packages/ui/src/primitives/*.tsx`, `packages/ui/src/index.ts`, `apps/web/main/components.json`
  - Verify: biome check packages/ui/ — 0 errors, tất cả components export từ @8sync/ui

- [ ] **T02: Polish PixelNetwork canvas — performance + visual tuning** `est:20min`
  Optimize render loop, add DPR scaling, throttle on mobile, tune node glow + pulse timing cho chuẩn brand
  - Files: `packages/ui/src/canvas/pixel-network.tsx`
  - Verify: Chrome DevTools Performance tab — 60fps desktop, no jank

- [ ] **T03: Create /design demo page hiển thị tất cả components** `est:25min`
  Tạo apps/web/main/src/app/design/page.tsx — hiển thị tất cả Button variants, Card, Input, Dialog, Tabs, Badge, etc. Giống storybook nhưng là page thật
  - Files: `apps/web/main/src/app/design/page.tsx`
  - Verify: localhost:3000/design renders tất cả components đẹp chuẩn

- [ ] **T04: Sync globals.css + @source directive cho tất cả apps** `est:10min`
  Đảm bảo learn/agent/admin đều có globals.css + @source chuẩn, install shadcn deps, verify build
  - Files: `apps/web/*/src/app/globals.css`
  - Verify: turbo build — all 4 apps thành công

## Files Likely Touched

- packages/ui/src/primitives/*.tsx
- packages/ui/src/index.ts
- apps/web/main/components.json
- packages/ui/src/canvas/pixel-network.tsx
- apps/web/main/src/app/design/page.tsx
- apps/web/*/src/app/globals.css
