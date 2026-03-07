#!/usr/bin/env bash
set -euo pipefail

source_dir="/Users/sws/Development/hobby/agentic-app-framework"
target_dir=""
force="false"
dry_run="false"

usage() {
  cat <<EOF
Usage: $0 --target <repo-path> [--source <framework-repo-path>] [--force] [--dry-run]

Options:
  --target   Repository path to receive the framework
  --source   Framework repository path to copy from
  --force    Overwrite existing framework paths in the target repo
  --dry-run  Print planned actions without copying files
EOF
}

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

if [ -z "$target_dir" ]; then
  echo "Missing required --target <repo-path>" >&2
  usage >&2
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

copy_pairs=(
  "$source_dir/AGENTS.md:$target_dir/AGENTS.md"
  "$source_dir/docs:$target_dir/docs"
  "$source_dir/scripts/init-project.sh:$target_dir/scripts/init-project.sh"
)

echo "Agentic App Framework bootstrap"
echo "- source: $source_dir"
echo "- target: $target_dir"
echo "- dry run: $dry_run"
echo "- force: $force"
echo "- copy plan:"

for pair in "${copy_pairs[@]}"; do
  src="${pair%%:*}"
  dest="${pair#*:}"
  echo "  - $src -> $dest"
done

copy_path() {
  local src="$1"
  local dest="$2"

  if [ -e "$dest" ] && [ "$force" != "true" ]; then
    echo "Refusing to overwrite existing path without --force: $dest" >&2
    exit 1
  fi

  if [ "$dry_run" = "true" ]; then
    if [ -e "$dest" ]; then
      echo "Would replace: $dest"
    else
      echo "Would create: $dest"
    fi
    return 0
  fi

  mkdir -p "$(dirname "$dest")"
  rm -rf "$dest"
  cp -R "$src" "$dest"
}

for pair in "${copy_pairs[@]}"; do
  src="${pair%%:*}"
  dest="${pair#*:}"
  copy_path "$src" "$dest"
done

if [ "$dry_run" = "true" ]; then
  echo "Dry run complete."
  exit 0
fi

find "$target_dir/docs" -name ".DS_Store" -delete
chmod +x "$target_dir/scripts/init-project.sh"

echo "Bootstrapped agentic app framework into: $target_dir"
echo "Next steps:"
echo "1. Run scripts/init-project.sh if this repo should use template placeholders."
echo "2. Replace remaining placeholders manually."
echo "3. Review docs/README.md and docs/implementation-status.md before implementation work."
