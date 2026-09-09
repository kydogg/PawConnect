#!/usr/bin/env bash
# Pre-merge conflict check across all active branches.
#
# Trial-merges (read-only, via git merge-tree) every local feature/bugfix/
# docs/hotfix branch that is ahead of the base branch:
#   1. each branch against the base (default: develop), and
#   2. every pair of active branches against each other,
# then reports the conflicting files. Run this before merging anything
# into develop or main; exit code 1 means at least one conflict.
#
# Usage:
#   scripts/check-merge-conflicts.sh [base-branch]   # default base: develop
set -euo pipefail

BASE="${1:-develop}"
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

git fetch origin --quiet || echo "warn: fetch failed; checking local refs only" >&2

branches=()
while IFS= read -r b; do
  [ "$b" = "$BASE" ] && continue
  if [ "$(git rev-list --count "${BASE}..${b}")" -gt 0 ]; then
    branches+=("$b")
  fi
done < <(git for-each-ref --format='%(refname:short)' refs/heads/ | grep -E '^(feature|bugfix|docs|hotfix)/' || true)

if [ "${#branches[@]}" -eq 0 ]; then
  echo "No active branches ahead of ${BASE}."
  exit 0
fi

echo "Active branches ahead of ${BASE}:"
printf '  %s\n' "${branches[@]}"
echo

status=0

trial_merge() {
  # Prints conflicting files (indented) and returns 1 if the pair conflicts.
  local a="$1" b="$2" out
  if out=$(git merge-tree --write-tree --name-only "$a" "$b" 2>/dev/null); then
    return 0
  fi
  echo "$out" | tail -n +2 | sed 's/^/            /'
  return 1
}

echo "== Each branch vs ${BASE} =="
for b in "${branches[@]}"; do
  if trial_merge "$BASE" "$b"; then
    echo "OK        ${BASE} <- ${b}"
  else
    echo "CONFLICT  ${BASE} <- ${b}  (files above)"
    status=1
  fi
done

echo
echo "== Pairwise between active branches =="
n=${#branches[@]}
i=0
while [ "$i" -lt "$n" ]; do
  j=$((i + 1))
  while [ "$j" -lt "$n" ]; do
    a="${branches[$i]}"
    b="${branches[$j]}"
    if trial_merge "$a" "$b"; then
      echo "OK        ${a} <-> ${b}"
    else
      echo "CONFLICT  ${a} <-> ${b}  (files above; these branches touch the same lines)"
      status=1
    fi
    j=$((j + 1))
  done
  i=$((i + 1))
done

echo
if [ "$status" -eq 0 ]; then
  echo "No conflicts detected. Safe to merge in any order."
else
  echo "Conflicts detected. Coordinate the listed branches before merging."
fi
exit "$status"
