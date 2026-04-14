#!/bin/bash
# Build desktop apps via Tauri
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

for app in learn agent; do
  echo "=== Building ${app} desktop ==="

  # 1. Export the Next.js app as static files
  echo "  [1/2] Exporting web/${app}..."
  cd "${REPO_ROOT}/apps/web/${app}"
  bun run build

  # 2. Build the Tauri binary (frontendDist points to the out/ directory)
  echo "  [2/2] Building desktop/${app} with Tauri..."
  cd "${REPO_ROOT}/apps/desktop/${app}"
  bun run build

  echo "=== ${app} desktop done ==="
done
