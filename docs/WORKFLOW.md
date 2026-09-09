# PawConnect — Development Workflow

The rinse-and-repeat loop that takes one GitHub issue from open to shipped, plus the inventory of every automated process in the repo. Follow this until the app is done.

**Sources of truth:** GitHub Issues (`kydogg/PawConnect`) for what to build · `PRODUCT_SPEC.md` for how each screen behaves · `supabase/migrations/` for data shape · `DONE.md` for what's finished · `PawConnect-Master-Checklist.md` for open work only.

---

## The Loop (repeat per issue)

```
pick issue → branch → build → test → review → PR → merge → close → repeat
```

### 1. Pick the issue
```bash
gh issue list --state open --label ready-for-agent
gh issue view <N> --comments        # read spec refs + any prior work in comments
```
Work in dependency order (an issue's "Blocked by" line). One issue = one branch = one PR.

### 2. Branch (always off fresh develop)
```bash
# Preferred — isolated worktree per session (parallel-session safe):
scripts/new-session.sh <N> <slug>           # worktree + feature/<N>-<slug> off origin/develop, opens Claude Code inside

# Or manually:
git checkout develop && git pull origin develop
git checkout -b feature/<N>-<slug>          # e.g. feature/4-auth-04-forgot-password
```
Prefixes: `feature/` (issue work) · `bugfix/` · `docs/`, `chore/` (no issue needed). Base is **always `develop`** — that's a rule, not part of the name. Multiple Claude sessions share the main checkout; a SessionStart hook (`.claude/settings.json`) warns sessions starting there to move into a worktree before editing.

### 3. Build with atomic commits
One logical change per commit, Conventional Commits format (`feat(auth): …`, `fix(backend): …`, `test(auth): …`). Commit after every file-level change; never batch unrelated edits. Read the screen's `PRODUCT_SPEC.md` section once before coding; use only design tokens (`AppColor`/`AppFont`/`AppSpacing`/`AppRadius`/`AppShadow`) and Paw components.

### 4. Verify locally
```bash
# Full build (device-free, no signing needed)
xcodebuild -project PawConnect.xcodeproj -scheme PawConnect \
  -destination 'generic/platform=iOS Simulator' build CODE_SIGNING_ALLOWED=NO

# Unit tests (PawConnectTests, shared scheme — headless)
xcodebuild test -project PawConnect.xcodeproj -scheme PawConnect \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro'
```
New logic gets tests in `PawConnectTests/` (Swift Testing, `@Test`/`#expect`). ViewModels take an injectable `AuthProviding`-style seam so tests never hit the network. Visual work: run in the simulator, check **light and dark** (`xcrun simctl ui <device> appearance dark`).

### 5. Review
Run `/code-review` (or the two-axis standards+spec review) on the diff since `develop`. Fix confirmed findings before the PR; log judgment calls on the issue for the hardening ticket.

### 6. PR → develop → merge → close
```bash
scripts/check-merge-conflicts.sh            # trial-merges every active branch vs develop + pairwise; exit 1 = conflicts
git push -u origin feature/<N>-<slug>
gh pr create --base develop --title "..." --body "Closes #<N> ..."
gh pr merge --merge
```
Comment the outcome on the issue. "Closes #N" auto-closes only when the work reaches `main`; close manually if all ACs are verified sooner.

### 7. Weekly hygiene
- Sweep finished checklist items into `DONE.md`
- Push a `develop` build to TestFlight (internal)
- Delete merged branches

### 8. Release (gated)
When a sprint's issues are done: hardening pass (issue #11-style) → PR `develop` → `main` → **wait for Kyle's explicit go** → merge, tag, submit. `main` only ever moves this way.

---

## Automation Inventory

### Build & test
| What | Command |
|------|---------|
| Headless build | `xcodebuild … -destination 'generic/platform=iOS Simulator' build CODE_SIGNING_ALLOWED=NO` |
| Unit tests (29 and growing) | `xcodebuild test -project PawConnect.xcodeproj -scheme PawConnect -destination 'platform=iOS Simulator,name=iPhone 17 Pro'` |
| Lint / format | SwiftLint + SwiftFormat run as SPM build plugins — automatic on every build |
| Simulator install/launch | `xcrun simctl install <udid> <path>.app && xcrun simctl launch <udid> DaedalusDigital.PawConnect` |
| Light/dark screenshots | `xcrun simctl ui <udid> appearance dark` + `xcrun simctl io <udid> screenshot out.png` |

### Backend (Supabase — direct SDK + RLS, ADR-0001)
| What | How |
|------|-----|
| Schema change | New numbered file in `supabase/migrations/` → `supabase db push` (CLI is logged in + linked to `jculjhfkganixztkswjp`; no DB password needed) |
| Verify auth/RLS live | `bash scripts/verify-auth-backend.sh` — 8 probes: signup session, profiles trigger, wrong-password copy, cross-user + anonymous RLS denial. Leaves throwaway `pawconnect.probe.*` accounts to delete in the dashboard |
| One-time backend setup | `./scripts/sprint1-backend-wizard.sh` (already completed; rerun stages are idempotent) |
| Auth config | Email provider with auto-confirm ON (signup returns an immediate session, per spec). Managed in the dashboard or Management API |
| SDK pin | supabase-swift **2.46.0**, opted into `emitLocalSessionAsInitialSession` with an `isExpired` guard in `AuthManager.apply`. On a future 3.x bump the flag becomes default and can be dropped (the guard stays) |

### Assets (owned by the asset-sprint issues, #22–#34)
Pipeline: generate → save to `PawConnect/Asset-Staging/<Category>/` as `[Name]@3x.png` (dark variant `[Name]-dark@3x.png`) → `./scripts/scale-assets.sh` → drag into the imageset → set Render As → add the `AssetImage.swift` case → verify in the debug **AssetGallery**. Service + Live Activity icons are SF Symbols (`ServiceIcon`, `CareActivityIcon`) — no imagesets. Reference: `PawConnect-Asset-Library.md`.

### Issue tracker & docs
- All tracker operations via `gh` per `docs/agents/issue-tracker.md`; triage labels per `docs/agents/triage-labels.md`
- Coding standards + structure: `docs/CLAUDE.md` · glossary: `CONTEXT.md` · decisions: `docs/adr/`
- Multiple Claude sessions may run in parallel (production / debugging / planning / asset-catalog). Before cross-cutting refactors, they message each other; work is divided by branch, never shared on one

### Quality gates already in place
- `PawConnectTests` hosted bundle + shared `PawConnect` scheme — `xcodebuild test` works from a clean checkout (CI-ready when CI is added)
- Two-axis code review (standards vs. spec) before each PR
- Live backend probe script for anything touching auth/RLS

---

## Known open hooks (don't re-derive)

- **Branch protection** on `main`/`develop` — not yet enabled (checklist item)
- **`feature/project-setup`** — the frozen pre-restructure mega-branch; fully re-homed and merged, kept only pending Kyle's deletion call. It's the sole branch the conflict checker flags — ignore it
- **Capabilities/entitlements** — none configured yet; blocks Sign in with Apple (#6), Push, Live Activities
- **CI** — no GitHub Actions yet; the headless build + test commands above are ready to drop into a workflow file when wanted
- **TestFlight** — needs the AppIcon master (Asset Batch 1, in flight on the asset sprints) before first upload
