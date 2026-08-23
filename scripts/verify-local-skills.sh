#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
source_root="$repo_root/skills"
runtime_root="${CODEX_HOME:-$HOME/.codex}/skills"
failures="0"

usage() {
  cat <<'EOF'
Usage: verify-local-skills.sh [--target-root <skills-dir>]

Verify that each installed local skill matches the version-controlled source.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --target-root)
      runtime_root="$2"
      shift 2
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

for source_dir in "$source_root"/*; do
  [ -d "$source_dir" ] && [ -f "$source_dir/SKILL.md" ] || continue
  skill_name="$(basename "$source_dir")"
  target_dir="$runtime_root/$skill_name"

  if [ ! -d "$target_dir" ]; then
    echo "Missing installed skill: $target_dir" >&2
    failures="1"
    continue
  fi

  if diff -qr --exclude '.DS_Store' "$source_dir" "$target_dir" >/dev/null; then
    echo "Verified $skill_name"
  else
    echo "Installed skill differs from source: $skill_name" >&2
    failures="1"
  fi
done

exit "$failures"
