#!/bin/bash
# Build desktop apps via Tauri
set -e

for app in learn agent; do
  echo "Building ${app} desktop..."
  cd "$(dirname "$0")/../apps/${app}"
  bun run build
  cd "../${app}-desktop"
  bun tauri build
  echo "${app} desktop built!"
done
