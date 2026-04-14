#!/usr/bin/env bash
# Sync learn web export to Capacitor iOS/Android platforms
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_DIR="$REPO_ROOT/apps/web/learn"
MOBILE_DIR="$REPO_ROOT/apps/mobile/learn"

echo "==> Building learn web export..."
cd "$WEB_DIR"
bun run build

echo "==> Syncing to Capacitor platforms..."
cd "$MOBILE_DIR"
./node_modules/.bin/cap sync

echo "==> Done. iOS and Android platforms are up to date."
