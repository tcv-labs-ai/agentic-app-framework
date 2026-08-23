#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
source_root="$repo_root/skills"
runtime_root="${CODEX_HOME:-$HOME/.codex}/skills"
force="false"
dry_run="false"

usage() {
  cat <<'EOF'
Usage: install-local-skills.sh [--target-root <skills-dir>] [--force] [--dry-run]

Install every first-level skill directory that contains SKILL.md.

Options:
  --target-root <skills-dir>  Override the local Codex skills directory.
  --force                     Replace an existing installed skill.
  --dry-run                   Print the planned installation without writing files.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --target-root)
      runtime_root="$2"
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

if [ ! -d "$source_root" ]; then
  echo "Missing skill source directory: $source_root" >&2
  exit 1
fi

skill_dirs=()
for source_dir in "$source_root"/*; do
  if [ -d "$source_dir" ] && [ -f "$source_dir/SKILL.md" ]; then
    skill_dirs+=("$source_dir")
  fi
done

if [ "${#skill_dirs[@]}" -eq 0 ]; then
  echo "No skill directories found under: $source_root" >&2
  exit 1
fi

for source_dir in "${skill_dirs[@]}"; do
  skill_name="$(basename "$source_dir")"
  target_dir="$runtime_root/$skill_name"
  if [ -e "$target_dir" ] && [ "$force" != "true" ]; then
    echo "Refusing to overwrite existing installed skill without --force: $target_dir" >&2
    exit 1
  fi
done

commit_ref="$(git -C "$repo_root" rev-parse --short HEAD 2>/dev/null || echo "uncommitted")"
echo "Installing ${#skill_dirs[@]} source skill(s) from $commit_ref"

for source_dir in "${skill_dirs[@]}"; do
  skill_name="$(basename "$source_dir")"
  target_dir="$runtime_root/$skill_name"
  if [ "$dry_run" = "true" ]; then
    echo "Would install $source_dir -> $target_dir"
    continue
  fi

  mkdir -p "$runtime_root"
  if [ -e "$target_dir" ]; then
    rm -rf "$target_dir"
  fi
  cp -R "$source_dir" "$target_dir"
  echo "Installed $skill_name -> $target_dir"
done
