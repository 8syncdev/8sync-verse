# 8 Sync Verse — Spec v1.0

> **Vision**: Nền tảng "verse" (vũ trụ) kết nối học tập, AI agent, và công cụ productivity — xuất đa nền tảng (web, desktop, mobile) từ một codebase duy nhất.

---

## 1. Tổng quan Kiến trúc

### 1.1 Monorepo Structure (Turborepo)

**Quyết định: Turborepo > Nx**

| Tiêu chí | Turborepo | Nx |
|-----------|-----------|-----|
| Setup complexity | Minimal, 1 file `turbo.json` | Heavy, nx.json + project.json per app |
| Next.js native | Vercel ecosystem, first-class | Plugin-based, thêm abstraction |
| Cache | Remote cache built-in (Vercel) | Nx Cloud (thêm vendor lock) |
| Learning curve | Low — npm scripts thuần | High — generators, executors, plugins |
| Bundle size overhead | Zero | Nx daemon + deps |
| Bun compatibility | Full (chạy trực tiếp) | Partial (cần workaround) |
| Community trend 2025 | Đang tăng mạnh, Vercel push | Ổn định nhưng phức tạp hơn |

**Lý do chọn Turborepo:**
- 100% TypeScript ecosystem, zero config overhead
- Vercel native = deploy web instant
- Bun first-class support
- Đơn giản = ít bug, dễ onboard team mới
- Remote caching miễn phí qua Vercel

### 1.2 Cấu trúc Thư mục

```
8sync-verse/
├── apps/
│   ├── main/                    # 8syncdev.com — landing, hub
│   ├── learn/                   # learn-it.8syncdev.com
│   ├── agent/                   # agent.8syncdev.com
│   ├── admin/                   # admin.8syncdev.com
│   ├── learn-desktop/           # Tauri wrapper cho learn
│   ├── agent-desktop/           # Tauri wrapper cho agent
│   ├── learn-mobile/            # Capacitor wrapper cho learn
│   └── agent-mobile/            # Capacitor wrapper cho agent
│
├── packages/
│   ├── ui/                      # Shared UI components + theme system
│   │   ├── src/
│   │   │   ├── primitives/      # Button, Input, Card... (headless)
│   │   │   ├── composites/      # Navbar, Sidebar, DataTable...
│   │   │   ├── layouts/         # PageLayout, DashboardLayout...
│   │   │   ├── theme/           # CSS vars, tokens, tailwind preset
│   │   │   └── index.ts
│   │   ├── tailwind.preset.ts   # Shared tailwind config
│   │   └── package.json
│   │
│   ├── core/                    # Shared business logic
│   │   ├── src/
│   │   │   ├── auth/            # Auth client, token management
│   │   │   ├── api/             # API client, type-safe fetcher
│   │   │   ├── hooks/           # useAuth, useChat, useTokenUsage...
│   │   │   ├── types/           # Shared TypeScript types
│   │   │   ├── constants/       # Config, routes, permissions
│   │   │   └── utils/           # Helpers, formatters
│   │   └── package.json
│   │
│   ├── ai/                      # AI/LLM integration layer
│   │   ├── src/
│   │   │   ├── chat/            # Chat engine, streaming
│   │   │   ├── agents/          # Agent definitions, tools
│   │   │   ├── providers/       # Mistral, OpenAI, Claude adapters
│   │   │   └── token-tracker/   # Usage tracking, rate limiting
│   │   └── package.json
│   │
│   ├── db/                      # Database schema + migrations
│   │   ├── src/
│   │   │   ├── schema/          # Drizzle schemas
│   │   │   ├── migrations/      # SQL migrations
│   │   │   └── seed/            # Seed data
│   │   └── package.json
│   │
│   └── config/                  # Shared configs
│       ├── tsconfig/            # Base tsconfig presets
│       ├── eslint/              # (hoặc biome config)
│       └── tailwind/            # Tailwind base
│
├── ref/                         # Reference repos (read-only, gitignored)
│   ├── nextjs15-e-learning/
│   ├── e-learning-encore/
│   ├── cmp_new_generation/
│   ├── 8syncdev-ai-agent-rc/
│   ├── IELTS-AI-Startup/
│   └── content-post-agency/
│
├── specs/                       # Architecture specs
├── scripts/                     # Build, deploy, sync scripts
├── turbo.json
├── package.json
├── bun.lockb
├── CLAUDE.md
└── README.md
```

---

## 2. Tech Stack Chi Tiết

### 2.1 Runtime & Package Manager
- **Bun** — 100% runtime, package manager, test runner, bundler
- Lý do: 4x faster than Node, native TS, built-in SQLite

### 2.2 Frontend Framework
- **Next.js 15+** (hoặc 16 nếu stable) với App Router
- Turbopack dev mode
- Server Components mặc định, `"use client"` chỉ khi cần
- Server Actions cho mutations
- Streaming SSR cho performance

### 2.3 Styling & Design System
- **Tailwind CSS 4** — utility-first
- **Custom theme preset** share qua `packages/ui/tailwind.preset.ts`
- **Radix UI** — headless accessible primitives
- **CVA (class-variance-authority)** — component variants
- **Framer Motion** — animations
- Full custom CSS — không dùng template, phong cách riêng 8 Sync Dev

### 2.4 Backend (Next.js API Routes + Server Actions)
- **Quyết định: Drop Encore, dùng Next.js thuần cho backend**
- Lý do:
  - Monorepo đơn giản hơn (1 deploy unit)
  - Server Actions = zero API boilerplate
  - Route Handlers cho webhook/external API
  - Middleware cho auth/rate-limit
  - Vercel Edge Functions cho performance
  - Nếu cần microservice sau: tách module ra Hono worker

### 2.5 Database
- **PostgreSQL** (Neon/Supabase) — primary DB
- **Drizzle ORM** — type-safe, lightweight, zero overhead
- **Redis (Upstash)** — caching, rate limiting, sessions

### 2.6 Auth
- **Better Auth** hoặc **Lucia Auth** — self-hosted, full control
- JWT + refresh token rotation
- Role-based access (admin, instructor, student, agent-user)
- OAuth: Google, GitHub, Discord

### 2.7 AI Layer
- **Vercel AI SDK** — streaming, tool-calling, multi-provider
- **Mastra** (từ ref content-post-agency) — agent orchestration
- Providers: Mistral (primary, cost-effective), OpenAI, Claude (fallback)
- Token usage tracking per user

### 2.8 Desktop App
- **Tauri 2** — Rust-based, lightweight (~5MB vs Electron 150MB+)
- Pattern từ ref `content-post-agency/src-tauri/`
- Wrapper apps: `apps/learn-desktop/`, `apps/agent-desktop/`
- Auto-build: Next.js `export` → Tauri bundle

### 2.9 Mobile App
- **Capacitor** — WebView wrapper cho Next.js
- iOS first, Android follow
- Native plugins: Camera, Push Notifications, Biometrics
- Auto-build pipeline: Next.js `export` → Capacitor build
- Separate apps: learn-mobile, agent-mobile

### 2.10 Code Quality
- **Biome** — linter + formatter (faster than ESLint + Prettier)
- **TypeScript strict mode** — no `any`
- **Playwright** — E2E testing

---

## 3. Design System — "8 Sync Verse" Theme

### 3.1 Philosophy
- **Dark-first** — Deep space aesthetic, neon accents
- **Glass morphism** — Frosted glass cards, blur effects
- **Micro-animations** — Subtle, purposeful motion
- **Typography-driven** — Strong hierarchy, readable code blocks
- **Responsive-first** — Mobile → Desktop

### 3.2 Color Tokens

```css
:root {
  /* Base */
  --verse-bg: #0a0a0f;
  --verse-surface: #12121a;
  --verse-surface-hover: #1a1a2e;
  --verse-border: rgba(255, 255, 255, 0.06);
  --verse-border-hover: rgba(255, 255, 255, 0.12);

  /* Text */
  --verse-text: #e4e4e7;
  --verse-text-muted: #71717a;
  --verse-text-heading: #fafafa;

  /* Brand — Cyan/Electric Blue */
  --verse-primary: #06b6d4;
  --verse-primary-hover: #22d3ee;
  --verse-primary-glow: rgba(6, 182, 212, 0.15);

  /* Accent — Violet/Purple */
  --verse-accent: #8b5cf6;
  --verse-accent-hover: #a78bfa;
  --verse-accent-glow: rgba(139, 92, 246, 0.15);

  /* Success/Warning/Error */
  --verse-success: #10b981;
  --verse-warning: #f59e0b;
  --verse-error: #ef4444;

  /* Glass */
  --verse-glass: rgba(18, 18, 26, 0.8);
  --verse-glass-border: rgba(255, 255, 255, 0.08);
  --verse-glass-blur: 12px;
}
```

### 3.3 Tailwind Preset (`packages/ui/tailwind.preset.ts`)

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        verse: {
          bg: "var(--verse-bg)",
          surface: "var(--verse-surface)",
          "surface-hover": "var(--verse-surface-hover)",
          border: "var(--verse-border)",
          primary: "var(--verse-primary)",
          "primary-hover": "var(--verse-primary-hover)",
          accent: "var(--verse-accent)",
          "accent-hover": "var(--verse-accent-hover)",
          success: "var(--verse-success)",
          warning: "var(--verse-warning)",
          error: "var(--verse-error)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        heading: ["var(--font-heading)", "var(--font-geist-sans)", "sans-serif"],
      },
      backdropBlur: {
        glass: "var(--verse-glass-blur)",
      },
      boxShadow: {
        glow: "0 0 20px var(--verse-primary-glow)",
        "glow-accent": "0 0 20px var(--verse-accent-glow)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
    },
  },
} satisfies Partial<Config>;
```

---

## 4. Domains & Apps

### 4.1 `8syncdev.com` (apps/main)
- Landing page — showcase all products
- Blog / News
- Pricing
- Auth gateway (SSO cho tất cả sub-domains)
- Shared account management

### 4.2 `learn-it.8syncdev.com` (apps/learn)
- Course catalog & enrollment
- Lesson viewer (video, markdown, code editor)
- Exercises & submissions
- Progress tracking
- Code playground (Monaco Editor)
- AI tutor assistant

### 4.3 `agent.8syncdev.com` (apps/agent)
- Multi-model chat (Mistral, GPT, Claude)
- Custom AI agents with tools
- Token usage dashboard
- Agent marketplace
- Workflow builder (visual)
- **ĐÂY LÀ KILLER FEATURE** — xem Section 5

### 4.4 `admin.8syncdev.com` (apps/admin)
- User management & roles
- Content management (courses, lessons)
- Analytics dashboard
- Token usage monitoring
- System health

---

## 5. Killer Feature — "Verse Flow" (Xu hướng mới)

### 5.1 Concept: AI-Augmented Learning Feed

**Vấn đề hiện tại:**
- TikTok tạo xu hướng "short video" — addictive nhưng passive consumption
- Duolingo gamify learning — nhưng shallow, chỉ language
- ChatGPT/Claude — powerful nhưng blank canvas, user phải biết hỏi gì

**8 Sync Verse tạo xu hướng mới: "Adaptive Knowledge Feed"**

> Mỗi người có một feed kiến thức cá nhân hóa — không phải video giải trí, mà là **micro-learning bites** được AI curate dựa trên:
> - Skill level hiện tại
> - Mục tiêu career
> - Gaps trong kiến thức
> - Learning style preference
> - Real-time industry trends

### 5.2 Cách hoạt động

```
[User mở app] → [AI phân tích profile] → [Generate personalized feed]

Feed item types:
├── 🧠 Concept Card     — 30s đọc, swipe to learn
├── 💻 Code Challenge   — Inline editor, solve in 2 min
├── 🤖 AI Conversation  — Guided dialog về topic
├── 📊 Quiz Snap        — Quick assessment
├── 🔗 Deep Dive Link   — Khi user muốn go deeper
└── 🎯 Daily Mission    — Streak-based motivation
```

### 5.3 Tại sao đây là xu hướng vĩnh viễn

1. **AI cá nhân hóa** — Mỗi người feed khác nhau, không ai giống ai
2. **Addictive nhưng productive** — Swipe pattern của TikTok + learning value
3. **Applicable cho MỌI ngành** — Không chỉ IT: business, design, data, marketing...
4. **Network effect** — User tạo content → AI refine → feed tốt hơn → thêm user
5. **Enterprise B2B** — Công ty training nhân viên qua feed
6. **Lifetime value** — Học không bao giờ dừng, user stay forever

### 5.4 Khác biệt với thế giới

| Platform | Model | Limitation |
|----------|-------|------------|
| TikTok | Passive video consumption | Entertainment, not learning |
| Duolingo | Gamified but rigid curriculum | Only language |
| Coursera/Udemy | Long-form courses | Completion rate <10% |
| ChatGPT | Blank canvas | User phải biết hỏi gì |
| **8 Sync Verse** | **AI-curated adaptive feed** | **First mover** |

---

## 6. Backend Architecture

### 6.1 Next.js API Structure

```
apps/main/src/
├── app/
│   ├── api/
│   │   ├── auth/        # Auth endpoints
│   │   ├── users/       # User management
│   │   ├── webhook/     # External webhooks
│   │   └── health/      # Health check
│   ├── actions/
│   │   ├── auth.ts      # Server actions: login, register, refresh
│   │   ├── user.ts      # Profile update, preferences
│   │   └── billing.ts   # Subscription, token purchase
│   └── middleware.ts     # Auth, rate-limit, CORS
```

### 6.2 Core Backend Modules (packages/core)

```typescript
// Auth flow
signUp() → createUser() → hashPassword() → generateTokens() → setSession()
signIn() → verifyPassword() → generateTokens() → setSession()
refresh() → verifyRefreshToken() → rotateTokens() → setSession()

// Role system
enum Role { ADMIN, INSTRUCTOR, STUDENT, AGENT_USER }
checkPermission(user, resource, action) → boolean

// Token usage tracking
trackUsage(userId, model, inputTokens, outputTokens) → void
getUsage(userId, period) → UsageReport
checkQuota(userId) → { allowed: boolean, remaining: number }
```

### 6.3 Database Schema (Drizzle)

```typescript
// Core tables
users, sessions, accounts (OAuth)
roles, permissions, user_roles

// Learning
courses, lessons, enrollments, progress, submissions

// AI Agent
conversations, messages, agents, agent_tools
token_usage, usage_quotas

// Billing
subscriptions, plans, payments
```

---

## 7. Build & Deploy Pipeline

### 7.1 Web Deploy
```
bun install → turbo build → Vercel deploy
- main → 8syncdev.com
- learn → learn-it.8syncdev.com
- agent → agent.8syncdev.com
- admin → admin.8syncdev.com
```

### 7.2 Desktop Build (Tauri)
```
turbo build --filter=learn → next export
cd apps/learn-desktop → bun tauri build
→ .dmg (macOS), .msi (Windows), .AppImage (Linux)

turbo build --filter=agent → next export
cd apps/agent-desktop → bun tauri build
```

### 7.3 Mobile Build (Capacitor)
```
turbo build --filter=learn → next export
cd apps/learn-mobile → npx cap sync → xcodebuild (iOS) / gradle (Android)

turbo build --filter=agent → next export
cd apps/agent-mobile → npx cap sync → xcodebuild (iOS) / gradle (Android)
```

### 7.4 Auto-sync Script
```bash
# scripts/build-all.sh
#!/bin/bash
turbo build
# Desktop
for app in learn agent; do
  cd apps/${app}-desktop && bun tauri build && cd ../..
done
# Mobile
for app in learn agent; do
  cd apps/${app}-mobile && npx cap sync && cd ../..
done
```

---

## 8. Phase Plan

### Phase 1: Foundation (Week 1-2) ← HIỆN TẠI
- [x] Setup monorepo structure
- [x] Clone ref repos
- [ ] Initialize Turborepo + Bun
- [ ] Create `packages/ui` with theme system
- [ ] Create `packages/config` (tsconfig, biome, tailwind preset)
- [ ] Setup `apps/main` — Next.js skeleton
- [ ] Demo home page với shared theme
- [ ] Setup `packages/db` — Drizzle + PostgreSQL schema
- [ ] Setup `packages/core` — Auth module
- [ ] Verify: Theme sharing works across apps
- [ ] Verify: Build pipeline works (web + desktop + mobile)
- [ ] Write CLAUDE.md + README.md per package

### Phase 2: Core Backend (Week 3-4)
- [ ] Auth system (signup, login, OAuth, sessions)
- [ ] Role & permission system
- [ ] Token usage tracking
- [ ] Admin dashboard skeleton

### Phase 3: Learning Platform (Week 5-8)
- [ ] Course/Lesson data model
- [ ] Content viewer (markdown, video, code)
- [ ] Exercise & submission system
- [ ] Progress tracking
- [ ] AI tutor integration

### Phase 4: Agent Platform (Week 5-8, parallel)
- [ ] Multi-model chat engine
- [ ] Agent builder
- [ ] Tool integration
- [ ] Workflow visual builder

### Phase 5: Verse Flow — Killer Feature (Week 9-12)
- [ ] Adaptive feed engine
- [ ] Content card components
- [ ] AI recommendation system
- [ ] Swipe/scroll interaction
- [ ] Streak & gamification

### Phase 6: Mobile & Desktop Polish (Week 13-16)
- [ ] Native features (push, biometrics, offline)
- [ ] App Store / Play Store submission
- [ ] Desktop distribution

---

## 9. Nguyên tắc Code

1. **100% TypeScript** — Không Python, không JS thuần
2. **100% Bun** — Runtime, package manager, test
3. **Server Components default** — `"use client"` chỉ khi interactive
4. **Server Actions for mutations** — Không tạo API route thừa
5. **Biome** — Lint + format, không dùng ESLint
6. **Drizzle** — Type-safe DB, không raw SQL
7. **Monorepo sharing** — Logic ở packages/, apps/ chỉ là composition
8. **No template** — Full custom UI, phong cách riêng 8 Sync Verse
9. **Mobile-first responsive** — Design cho phone trước
10. **Accessibility** — WCAG 2.1 AA minimum

---

## 10. Tài liệu tham khảo từ Ref Repos

| Ref Repo | Tận dụng gì |
|----------|-------------|
| `nextjs15-e-learning` | Course/Lesson data structure, component patterns, SEO config |
| `e-learning-encore` | Auth flow, role system, enrollment logic, Drizzle schemas |
| `8syncdev-ai-agent-rc` | Chat UI, AI SDK integration, streaming pattern |
| `IELTS-AI-Startup` | Next.js 16 patterns, Biome config, Tailwind theme, Playwright E2E |
| `content-post-agency` | Tauri integration, Hono server, Mastra agents, Drizzle + SQLite |
| `cmp_new_generation` | AI agent concepts (ref only, don't use Python) |
