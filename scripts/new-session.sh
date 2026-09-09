#!/usr/bin/env bash
# Spin up an isolated Claude Code session for one issue.
#
# Creates (or reuses) a git worktree in a sibling directory with a
# feature/<issue#>-<slug> branch off origin/develop, then launches
# Claude Code inside it. Every implementation session gets its own
# checkout, so concurrent sessions can't move branches under each other.
#
# Usage:
#   scripts/new-session.sh <issue#> <slug> [extra claude args...]
#   scripts/new-session.sh 36 main-tab-shell
#   NO_LAUNCH=1 scripts/new-session.sh 36 main-tab-shell   # create worktree only
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "Usage: $(basename "$0") <issue#> <slug> [extra claude args...]" >&2
  exit 1
fi

ISSUE="$1"
SLUG="$2"
shift 2

REPO_ROOT="$(git rev-parse --show-toplevel)"
BRANCH="feature/${ISSUE}-${SLUG}"
WT_ROOT="${REPO_ROOT}.worktrees"
WT_DIR="${WT_ROOT}/${ISSUE}-${SLUG}"

mkdir -p "$WT_ROOT"

if [ -d "$WT_DIR" ]; then
  echo "Reusing existing worktree: $WT_DIR"
else
  git -C "$REPO_ROOT" fetch origin develop
  if git -C "$REPO_ROOT" show-ref --verify --quiet "refs/heads/${BRANCH}"; then
    git -C "$REPO_ROOT" worktree add "$WT_DIR" "$BRANCH"
  else
    git -C "$REPO_ROOT" worktree add -b "$BRANCH" "$WT_DIR" origin/develop
  fi
fi

echo "Worktree ready: $WT_DIR (${BRANCH})"

if [ "${NO_LAUNCH:-0}" = "1" ]; then
  echo "NO_LAUNCH set; not starting Claude Code. cd \"$WT_DIR\" to work there."
  exit 0
fi

cd "$WT_DIR"
exec claude "$@"
