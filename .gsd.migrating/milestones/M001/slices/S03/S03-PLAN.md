# S03: Multi-App Polish — learn, agent, admin skeleton + shared layout

**Goal:** 4 web apps có layout riêng, routing skeleton, dùng chung @8sync/ui
**Demo:** 4 web apps chạy đồng thời, mỗi app có layout riêng dùng chung @8sync/ui

## Must-Haves

- Not provided.

## Proof Level

- This slice proves: Not provided.

## Integration Closure

Not provided.

## Verification

- Not provided.

## Tasks

- [ ] **T01: Shared layouts — DashboardLayout, MarketingLayout** `est:25min`
  Tạo packages/ui/src/layouts/dashboard-layout.tsx (sidebar+header+content) và marketing-layout.tsx (navbar+content+footer)
  - Files: `packages/ui/src/layouts/dashboard-layout.tsx`, `packages/ui/src/layouts/marketing-layout.tsx`
  - Verify: Import từ @8sync/ui, render đúng

- [ ] **T02: Learn app — 3 pages skeleton (home, courses, course detail)** `est:20min`
  apps/web/learn với marketing layout, home page, /courses list, /courses/[slug] detail
  - Files: `apps/web/learn/src/app/page.tsx`, `apps/web/learn/src/app/courses/page.tsx`, `apps/web/learn/src/app/courses/[slug]/page.tsx`
  - Verify: localhost:3001 navigate 3 pages OK

- [ ] **T03: Agent app — 3 pages skeleton (home, chat, agents)** `est:20min`
  apps/web/agent với chat layout, home, /chat, /agents marketplace
  - Files: `apps/web/agent/src/app/page.tsx`, `apps/web/agent/src/app/chat/page.tsx`, `apps/web/agent/src/app/agents/page.tsx`
  - Verify: localhost:3002 navigate 3 pages OK

- [ ] **T04: Admin app — dashboard layout + 3 pages** `est:20min`
  apps/web/admin với dashboard layout, overview, users, settings
  - Files: `apps/web/admin/src/app/page.tsx`, `apps/web/admin/src/app/users/page.tsx`, `apps/web/admin/src/app/settings/page.tsx`
  - Verify: localhost:3003 navigate OK

## Files Likely Touched

- packages/ui/src/layouts/dashboard-layout.tsx
- packages/ui/src/layouts/marketing-layout.tsx
- apps/web/learn/src/app/page.tsx
- apps/web/learn/src/app/courses/page.tsx
- apps/web/learn/src/app/courses/[slug]/page.tsx
- apps/web/agent/src/app/page.tsx
- apps/web/agent/src/app/chat/page.tsx
- apps/web/agent/src/app/agents/page.tsx
- apps/web/admin/src/app/page.tsx
- apps/web/admin/src/app/users/page.tsx
- apps/web/admin/src/app/settings/page.tsx
