#!/bin/bash
# Build mobile apps via Capacitor
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

for app in learn; do
  echo "=== Building ${app} mobile ==="

  # 1. Export the Next.js app as static files
  echo "  [1/2] Exporting web/${app}..."
  cd "${REPO_ROOT}/apps/web/${app}"
  bun run build

  # 2. Sync Capacitor with the new web output
  echo "  [2/2] Syncing mobile/${app} with Capacitor..."
  cd "${REPO_ROOT}/apps/mobile/${app}"
  node_modules/.bin/cap sync

  echo "=== ${app} mobile synced! Run xcodebuild/gradle manually. ==="
done
