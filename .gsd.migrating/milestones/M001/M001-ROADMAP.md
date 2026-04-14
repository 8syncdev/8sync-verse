# M001: Foundation — Core Design System + Backend + Multi-App Skeleton

## Vision
Hoàn thiện nền tảng: design system chuẩn brand (Pixel Network + Cyan/Violet), backend Encore chạy được (auth, user, role, chat), 4 web apps share theme, pipeline build desktop+mobile, tất cả chạy 1 lệnh.

## Slice Overview
| ID | Slice | Risk | Depends | Done | After this |
|----|-------|------|---------|------|------------|
| S01 | Design System — shadcn components + Verse theme polish | low | — | ⬜ | Storybook-like demo page hiển thị tất cả components với Verse theme |
| S02 | Backend Encore — Auth + User + Role core APIs | medium | — | ⬜ | curl POST /auth/login trả về JWT token, GET /auth/health OK |
| S03 | Multi-App Polish — learn, agent, admin skeleton + shared layout | low | S01 | ⬜ | 4 web apps chạy đồng thời, mỗi app có layout riêng dùng chung @8sync/ui |
| S04 | Desktop + Mobile Pipeline — Tauri + Capacitor auto-build | high | S03 | ⬜ | Tauri .exe/.dmg build từ learn app, Capacitor ios/android sync từ learn app |
| S05 | Documentation + CI — CLAUDE.md, README.md, lint scripts | low | S01, S02, S03 | ⬜ | Mỗi app/package có CLAUDE.md + README.md, bun lint chạy 0 errors |
