#!/usr/bin/env bash
set -euo pipefail

source_dir="/Users/sws/Development/hobby/agentic-app-framework"
target_dir=""
force="false"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --source)
      source_dir="$2"
      shift 2
      ;;
    --target)
      target_dir="$2"
      shift 2
      ;;
    --force)
      force="true"
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      echo "Usage: $0 --target <repo-path> [--source <framework-repo-path>] [--force]" >&2
      exit 1
      ;;
  esac
done

if [ -z "$target_dir" ]; then
  echo "Missing required --target <repo-path>" >&2
  exit 1
fi

if [ ! -d "$source_dir" ]; then
  echo "Framework source directory does not exist: $source_dir" >&2
  exit 1
fi

if [ ! -d "$target_dir" ]; then
  echo "Target directory does not exist: $target_dir" >&2
  exit 1
fi

required_source_paths=(
  "$source_dir/AGENTS.md"
  "$source_dir/docs"
  "$source_dir/scripts/init-project.sh"
)

for path in "${required_source_paths[@]}"; do
  if [ ! -e "$path" ]; then
    echo "Missing required framework path: $path" >&2
    exit 1
  fi
done

mkdir -p "$target_dir/scripts"

copy_path() {
  local src="$1"
  local dest="$2"

  if [ -e "$dest" ] && [ "$force" != "true" ]; then
    echo "Refusing to overwrite existing path without --force: $dest" >&2
    exit 1
  fi

  rm -rf "$dest"
  cp -R "$src" "$dest"
}

copy_path "$source_dir/AGENTS.md" "$target_dir/AGENTS.md"
copy_path "$source_dir/docs" "$target_dir/docs"
find "$target_dir/docs" -name ".DS_Store" -delete
copy_path "$source_dir/scripts/init-project.sh" "$target_dir/scripts/init-project.sh"

chmod +x "$target_dir/scripts/init-project.sh"

echo "Bootstrapped agentic app framework into: $target_dir"
echo "Next steps:"
echo "1. Run scripts/init-project.sh if this repo should use template placeholders."
echo "2. Replace remaining placeholders manually."
echo "3. Review docs/README.md and docs/implementation-status.md before implementation work."
