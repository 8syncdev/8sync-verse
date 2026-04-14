#!/bin/bash
# Build mobile apps via Capacitor
set -e

for app in learn agent; do
  echo "Building ${app} mobile..."
  cd "$(dirname "$0")/../apps/${app}"
  bun run build
  cd "../${app}-mobile"
  npx cap sync
  echo "${app} mobile synced! Run xcodebuild/gradle manually."
done
