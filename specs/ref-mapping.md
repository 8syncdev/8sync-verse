# Reference Repos — Mapping cho M001

> Tất cả repos nằm trong `ref/` — chỉ đọc, không code vào.

## Ref → Slice/Task Mapping

| Ref Repo | Dùng cho | Files quan trọng |
|----------|----------|-----------------|
| **nextjs15-e-learning** | S01 (canvas 3D), S03 (learn app layout/pages) | `components/shared/dev/canvas3d/` — galaxy bg, entrance<br>`components/animations/` — scroll animations, variants<br>`components/pages/home/` — home sections pattern<br>`app/(base)/courses/` — course pages routing<br>`app/(base)/blog/` — blog pages pattern<br>`constants/my-info.ts` — brand info |
| **e-learning-encore** | S02 (backend Encore, toàn bộ) | `src/dev/auth/` — auth flow, JWT utils, bcrypt<br>`src/dev/user/db/users.schema.ts` — user Drizzle schema<br>`src/dev/role/db/role.schema.ts` — role schema<br>`src/dev/role/role.service.ts` — RBAC service<br>`src/app/course/` — course module pattern<br>`src/app/enrollment/` — enrollment pattern<br>`src/utils/` — DTOs, pagination |
| **8syncdev-ai-agent-rc** | S03 (agent app chat UI) | `app/chat-ai/page.tsx` — chat page<br>`components/` — chat UI components<br>`server/` — AI SDK streaming pattern<br>`providers/` — security, breadcrumb |
| **IELTS-AI-Startup** | S01 (Biome config), S02 (Encore patterns), S03 (Next.js 16 patterns) | `frontend/web/biome.json` — Biome config ref<br>`frontend/web/src/` — Next.js 16 app structure<br>`CLAUDE.md` — agent instructions pattern<br>`backend/encore-module/` — Encore service pattern |
| **content-post-agency** | S04 (Tauri desktop app) | `src-tauri/tauri.conf.json` — Tauri config<br>`src-tauri/Cargo.toml` — Rust deps<br>`web/` — frontend for Tauri<br>`src/server/` — Hono server pattern<br>`src/mastra/` — AI agent orchestration |
| **cmp_new_generation** | Concept only — AI agent ideas | Chỉ tham khảo concept, KHÔNG dùng Python code |
| **christmas-tree-love-3d-2025** | S01 (3D visual effects ref) | `src/js/main.js` — Three.js setup, bloom, camera<br>`src/css/style.css` — neon glow CSS<br>`index.html` — particle/3D layout pattern |

## Cách sử dụng Ref

```bash
# Cập nhật tất cả ref repos
bun run ref:update

# Xem file cụ thể
cat ref/e-learning-encore/src/dev/auth/auths.service.ts
cat ref/content-post-agency/src-tauri/tauri.conf.json
```

## Quy tắc
1. **KHÔNG code trực tiếp vào ref/** — chỉ đọc tham khảo
2. **Copy pattern, KHÔNG copy code** — adapt cho Verse architecture
3. **Python code (cmp_new_generation)** — chỉ xem concept, rewrite bằng TypeScript
4. **Ref repos là gitignored** — không commit vào 8sync-verse repo
