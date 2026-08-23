#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
skill_name="agentic-app-framework"
source_dir="$repo_root/skills/$skill_name"
target_dir="$HOME/.codex/skills/$skill_name"
force="false"
dry_run="false"

usage() {
  cat <<EOF
Usage: $0 [--target <skill-dir>] [--force] [--dry-run]

Options:
  --target   Override the local Codex skill install path
  --force    Overwrite an existing installed skill
  --dry-run  Print planned actions without copying files
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --target)
      target_dir="$2"
      shift 2
      ;;
    --force)
      force="true"
      shift
      ;;
    --dry-run)
      dry_run="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [ ! -d "$source_dir" ]; then
  echo "Missing skill source directory: $source_dir" >&2
  exit 1
fi

if [ -e "$target_dir" ] && [ "$force" != "true" ]; then
  echo "Refusing to overwrite existing installed skill without --force: $target_dir" >&2
  exit 1
fi

commit_ref="$(git -C "$repo_root" rev-parse --short HEAD 2>/dev/null || echo "unknown")"

echo "Agentic App Framework skill install"
echo "- source: $source_dir"
echo "- target: $target_dir"
echo "- repo commit: $commit_ref"
echo "- dry run: $dry_run"
echo "- force: $force"

if [ "$dry_run" = "true" ]; then
  if [ -e "$target_dir" ]; then
    echo "Would remove existing target: $target_dir"
  else
    echo "Would create target parent: $(dirname "$target_dir")"
  fi
  echo "Would copy skill files from source to target"
  exit 0
fi

mkdir -p "$(dirname "$target_dir")"
rm -rf "$target_dir"
cp -R "$source_dir" "$target_dir"

echo "Installed $skill_name to $target_dir"
