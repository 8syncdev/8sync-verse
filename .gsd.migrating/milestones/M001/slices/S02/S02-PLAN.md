# S02: Backend Encore — Auth + User + Role core APIs

**Goal:** Encore backend chạy local với auth, user, role APIs + Drizzle schemas
**Demo:** curl POST /auth/login trả về JWT token, GET /auth/health OK

## Must-Haves

- Not provided.

## Proof Level

- This slice proves: Not provided.

## Integration Closure

Not provided.

## Verification

- Not provided.

## Tasks

- [ ] **T01: Install Encore CLI + verify encore run** `est:15min`
  Cài encore CLI nếu chưa có, bun install trong apps/backend, encore run test health endpoints
  - Files: `apps/backend/package.json`, `apps/backend/encore.app`
  - Verify: encore run OK, curl /auth/health trả 200

- [ ] **T02: Drizzle schemas — users, roles, user_roles tables** `est:20min`
  Tạo Drizzle schema cho users, roles, user_roles tables. Ref: e-learning-encore schemas
  - Files: `apps/backend/src/user/db/users.schema.ts`, `apps/backend/src/user/db/users.db.ts`, `apps/backend/src/role/db/role.schema.ts`, `apps/backend/src/role/db/role.db.ts`
  - Verify: tsc --noEmit 0 errors

- [ ] **T03: Auth service — login, register, refresh, verify với JWT** `est:30min`
  Implement auth.service.ts với bcrypt hash, JWT sign/verify, refresh token rotation. Ref: e-learning-encore auth
  - Files: `apps/backend/src/auth/auth.service.ts`, `apps/backend/src/auth/auth.controller.ts`, `apps/backend/src/auth/auth.utils.ts`
  - Verify: curl POST /auth/register + /auth/login trả JWT, /auth/verify OK

- [ ] **T04: User + Role CRUD APIs** `est:25min`
  User CRUD (get, update, list) + Role CRUD + assign role to user
  - Files: `apps/backend/src/user/user.service.ts`, `apps/backend/src/user/user.controller.ts`, `apps/backend/src/role/role.service.ts`, `apps/backend/src/role/role.controller.ts`
  - Verify: API test: create user, assign role, verify role check

- [ ] **T05: Generate typed client cho FE** `est:10min`
  encore gen client output packages/core/src/api/client.ts, test import từ web app
  - Files: `packages/core/src/api/client.ts`
  - Verify: Import client trong web app, TypeScript resolve OK

## Files Likely Touched

- apps/backend/package.json
- apps/backend/encore.app
- apps/backend/src/user/db/users.schema.ts
- apps/backend/src/user/db/users.db.ts
- apps/backend/src/role/db/role.schema.ts
- apps/backend/src/role/db/role.db.ts
- apps/backend/src/auth/auth.service.ts
- apps/backend/src/auth/auth.controller.ts
- apps/backend/src/auth/auth.utils.ts
- apps/backend/src/user/user.service.ts
- apps/backend/src/user/user.controller.ts
- apps/backend/src/role/role.service.ts
- apps/backend/src/role/role.controller.ts
- packages/core/src/api/client.ts
