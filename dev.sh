#!/bin/bash
# 8 Sync Verse — Dev Runner
# Usage:
#   ./dev.sh              # FE (all web) + BE (encore)
#   ./dev.sh web          # All web apps only
#   ./dev.sh be           # Backend only (encore)
#   ./dev.sh main         # Only 8syncdev.com
#   ./dev.sh learn|agent|admin

set -e
cd "$(dirname "$0")"

APP="${1:-all}"

echo ""
echo "  8 Sync Verse — Dev Server"
echo ""

if ! command -v bun &> /dev/null; then
  echo "  [ERROR] Bun not found. Install: https://bun.sh"; exit 1
fi
[ ! -d "node_modules" ] && bun install

case "$APP" in
  all)
    echo "  [BE]  Encore   -> http://localhost:4000  (dashboard: localhost:9400)"
    echo "  [FE]  main     -> http://localhost:3000"
    echo "  [FE]  learn    -> http://localhost:3001"
    echo "  [FE]  agent    -> http://localhost:3002"
    echo "  [FE]  admin    -> http://localhost:3003"
    echo ""
    (cd apps/backend && encore run) &
    bunx turbo dev --filter='./apps/web/*'
    ;;
  web)
    echo "  main  -> :3000 | learn -> :3001 | agent -> :3002 | admin -> :3003"
    echo ""
    bunx turbo dev --filter='./apps/web/*'
    ;;
  be)
    echo "  Encore -> http://localhost:4000  (dashboard: localhost:9400)"
    echo ""
    cd apps/backend && encore run
    ;;
  main|learn|agent|admin)
    echo "  $APP -> http://localhost:300$(echo $APP | sed 's/main/0/;s/learn/1/;s/agent/2/;s/admin/3/')"
    echo ""
    bunx turbo dev --filter="@8sync/$APP"
    ;;
  *)
    echo "  Usage: ./dev.sh [all|web|be|main|learn|agent|admin]"; exit 1
    ;;
esac
