#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
skill_name="agentic-app-framework"
source_dir="$repo_root/skill/$skill_name"
target_dir="$HOME/.codex/skills/$skill_name"

if [ ! -d "$source_dir" ]; then
  echo "Missing skill source directory: $source_dir" >&2
  exit 1
fi

mkdir -p "$(dirname "$target_dir")"
rm -rf "$target_dir"
cp -R "$source_dir" "$target_dir"

echo "Installed $skill_name to $target_dir"
