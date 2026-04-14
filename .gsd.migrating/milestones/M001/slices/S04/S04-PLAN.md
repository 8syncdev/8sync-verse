# S04: Desktop + Mobile Pipeline — Tauri + Capacitor auto-build

**Goal:** Pipeline xuất desktop (Tauri) và mobile (Capacitor) từ Next.js export
**Demo:** Tauri .exe/.dmg build từ learn app, Capacitor ios/android sync từ learn app

## Must-Haves

- Not provided.

## Proof Level

- This slice proves: Not provided.

## Integration Closure

Not provided.

## Verification

- Not provided.

## Tasks

- [ ] **T01: Tauri setup cho learn-desktop** `est:30min`
  Init Tauri 2 trong apps/desktop/learn, config tauri.conf.json, point frontendDist to learn app export output
  - Files: `apps/desktop/learn/src-tauri/tauri.conf.json`, `apps/desktop/learn/src-tauri/Cargo.toml`, `apps/desktop/learn/package.json`
  - Verify: bun tauri build thành công, .exe/.dmg output

- [ ] **T02: Capacitor setup cho learn-mobile** `est:25min`
  Init Capacitor trong apps/mobile/learn, config capacitor.config.ts, webDir to learn export
  - Files: `apps/mobile/learn/capacitor.config.ts`, `apps/mobile/learn/package.json`
  - Verify: npx cap sync thành công

- [ ] **T03: Build scripts auto-pipeline** `est:10min`
  Update scripts/build-desktop.sh + build-mobile.sh cho new folder structure
  - Files: `scripts/build-desktop.sh`, `scripts/build-mobile.sh`
  - Verify: Scripts run without error

## Files Likely Touched

- apps/desktop/learn/src-tauri/tauri.conf.json
- apps/desktop/learn/src-tauri/Cargo.toml
- apps/desktop/learn/package.json
- apps/mobile/learn/capacitor.config.ts
- apps/mobile/learn/package.json
- scripts/build-desktop.sh
- scripts/build-mobile.sh
