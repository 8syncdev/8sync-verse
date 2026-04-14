#!/bin/bash
# Update all reference repos (pull latest)
set -e

cd "$(dirname "$0")/../ref"

repos=(
  "nextjs15-e-learning"
  "e-learning-encore"
  "cmp_new_generation"
  "8syncdev-ai-agent-rc"
  "IELTS-AI-Startup"
  "content-post-agency"
)

for repo in "${repos[@]}"; do
  if [ -d "$repo" ]; then
    echo "Updating $repo..."
    cd "$repo" && git pull --ff-only 2>/dev/null || echo "  (skipped - detached HEAD)" && cd ..
  fi
done

echo "All refs updated."
