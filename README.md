# 🌌 8 Sync Verse

> Multi-platform learning & AI agent ecosystem — Web, Desktop, Mobile from one codebase.

## 🚀 Chạy nhanh

```powershell
# PowerShell (Windows)
.\dev.ps1              # ALL: BE (Encore) + FE (4 web apps)
.\dev.ps1 web          # Chỉ FE (4 web apps)
.\dev.ps1 be           # Chỉ BE (Encore)
.\dev.ps1 main         # Chỉ 8syncdev.com
.\dev.ps1 learn        # Chỉ learn-it
```

```bash
# Bash (macOS/Linux)
./dev.sh               # ALL: BE + FE
./dev.sh be            # Chỉ BE
./dev.sh main          # Chỉ 8syncdev.com
```

## 📦 Cài đặt

```bash
# 1. Cài Bun: https://bun.sh
# 2. Cài Encore CLI: https://encore.dev/docs/install
# 3. Clone & install
bun install
```

## 🏗 Kiến trúc

### Frontend (Next.js 16)

| App | Port | Domain |
|-----|------|--------|
| `apps/web/main` | 3000 | 8syncdev.com |
| `apps/web/learn` | 3001 | learn-it.8syncdev.com |
| `apps/web/agent` | 3002 | agent.8syncdev.com |
| `apps/web/admin` | 3003 | admin.8syncdev.com |

### Backend (Encore.ts)

| | |
|--|--|
| API | `http://localhost:4000` |
| Dashboard | `http://localhost:9400` |
| Services | auth, user, role, course, lesson, enrollment, chat |

```bash
# Test BE
curl http://localhost:4000/auth/health
# → {"success":true,"result":{"service":"auth","timestamp":"..."}}
```

### Native Apps

| App | Desktop (Tauri) | Mobile (Capacitor) |
|-----|-----------------|-------------------|
| Learn IT | `apps/desktop/learn` | `apps/mobile/learn` |
| Agent | `apps/desktop/agent` | `apps/mobile/agent` |

## 🎨 Shared Packages

| Package | Mô tả |
|---------|-------|
| `packages/ui` | Verse theme, Galaxy canvas 3D, animations, components |
| `packages/core` | Auth client, hooks, types (TODO) |
| `packages/ai` | LLM integration (TODO) |
| `packages/config` | Shared tsconfig |

## 🔍 Lint & Format

```bash
# Web apps + packages → Biome
bunx biome check apps/web/ packages/
bunx biome check --write apps/web/ packages/   # auto-fix

# Backend → tsc (NO biome)
cd apps/backend && tsc --noEmit
```

## 🌐 Deploy Vercel

```powershell
.\deploy.ps1              # Preview all
.\deploy.ps1 main --prod  # Production
```

## 🛠 Tech Stack (ALL LATEST)

| Tech | Version | Role |
|------|---------|------|
| **Bun** | 1.3+ | Runtime, pkg manager |
| **Next.js** | 16.2.3 | FE (App Router, Turbopack) |
| **Encore.ts** | 1.56.5 | BE (microservices, auto-infra) |
| **React** | 19.2.5 | UI |
| **Tailwind CSS** | 4.2.2 | Styling |
| **Framer Motion** | 12.38.0 | Animations |
| **Drizzle ORM** | 0.45.2 | DB (in Encore) |
| **Zod** | 4.3.6 | Validation |
| **TypeScript** | 6.0.2 | Type safety |
| **Biome** | 2.4.11 | Lint + format (web) |
| **Turborepo** | 2.9.6 | Monorepo build |

## 📁 Structure

```
8sync-verse/
├── apps/
│   ├── web/           # Next.js apps (FE)
│   │   ├── main/      # :3000
│   │   ├── learn/     # :3001
│   │   ├── agent/     # :3002
│   │   └── admin/     # :3003
│   ├── backend/       # Encore.ts (BE :4000)
│   ├── desktop/       # Tauri wrappers
│   └── mobile/        # Capacitor wrappers
├── packages/
│   ├── ui/            # Verse design system
│   ├── core/          # Shared logic
│   ├── ai/            # LLM layer
│   └── config/        # Shared configs
├── ref/               # Reference repos (gitignored)
├── specs/             # Architecture specs
├── dev.ps1            # ⚡ Dev runner (Windows)
├── dev.sh             # ⚡ Dev runner (macOS/Linux)
├── deploy.ps1         # 🚀 Vercel deploy
├── biome.json         # Biome config (web only)
├── turbo.json
├── CLAUDE.md
└── README.md
```
