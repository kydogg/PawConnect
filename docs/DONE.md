# PawConnect — Completed Work

Done items moved out of `PawConnect-Master-Checklist.md` to keep it scannable (per its own operating rules). Newest section notes at top of each entry where relevant.

**Moved:** September 2, 2026 (covers work through Sprint 1 issues #2, #3, #16 and the GitFlow restructure, PRs #12–#20).

---

## Phase 0 — Foundation

### Project & Tooling
- [x] Create new Xcode project: SwiftUI App, iOS 26 minimum deployment, organization identifier set
- [x] Configure bundle identifier and team for code signing
- [x] Initialize Git repo, push to GitHub (private)
- [x] Set up GitFlow: `main`, `develop`, feature branches — issue-numbered `feature/<issue#>-<slug>` off `develop`; `develop` feeds TestFlight; `main` moves only on gated release PRs (restructured 2026-08-29, PRs #12–#19)
- [x] Add `.gitignore` (Xcode template + add `.DS_Store`, `.env`, `xcuserdata/`)
- [x] Create `README.md` with setup instructions for future-you
- [x] Set up Swift Package Manager dependencies file
- [x] Add SwiftLint as SPM dependency + `.swiftlint.yml` config
- [x] Add SwiftFormat (or use Xcode's built-in)

### Backend Infrastructure
- [x] Supabase project created (`jculjhfkganixztkswjp`, us-east-2) — direct SDK + RLS per `docs/adr/0001`, no Edge Functions for CRUD
- [x] Migration `0001_initial_schema.sql` applied (tables, signup trigger, RLS)
- [x] Migration `0002_storage_buckets.sql` applied
- [x] Supabase CLI linked; migration history repaired; `supabase db push` workflow working (`0003` pushed 2026-09-02)

### Design System (in Xcode)
- [x] `Assets.xcassets` color sets for every token in `PRODUCT_SPEC.md` Design System Reference (light + dark variants): `primarySunset`, `primaryTerracotta`, `secondarySage`, `secondaryAmber`, `secondaryPeach`, `backgroundPrimary`, `backgroundElevated`, `textPrimary`, `textSecondary`, `textTertiary`, `border`
- [x] `AppColor.swift` — typed accessors for all color sets
- [x] `AppFont.swift` — typography extension matching all 10 typography tokens
- [x] `AppSpacing.swift` — spacing constants (xxs through xxl)
- [x] `AppRadius.swift` — corner radius constants
- [x] `AppShadow.swift` — three shadow ViewModifiers (card/float/modal)
- [x] Verify all tokens render correctly in light + dark on a test view (ComponentGallery + AUTH-01 simulator screenshots, 2026-08-25)

### Asset Pipeline Setup
- [x] Staging folder structure at `Asset-Staging/` with subfolders matching library categories (`Brand/`, `Onboarding/`, `EmptyStates/`, `Placeholders/`, `ServiceIcons/`, `TrustBadges/`, `LiveActivities/`, `Location/`, `Messaging/`, `Booking/`, `Feedback/`, `Backgrounds/`)
- [x] `scale-assets.sh` executable and verified on a test PNG
- [x] Folder structure inside `Assets.xcassets/` matching staging categories (note: `ServiceIcons`/`LiveActivities` later pivoted to SF Symbols via `ServiceIcon`/`CareActivityIcon` — no imagesets needed)
- [x] Midjourney-to-Xcode workflow documented (generate → `[Name]@3x.png` in staging → dark variant → `./scale-assets.sh` → drag into imageset → set Render As)
- [x] `AssetImage.swift` enum at `PawConnect/Core/Utilities/AssetImage.swift` — case stubs for catalog assets by category (service + Live Activity icons excluded — SF Symbols pivot); reference enum in `PawConnect-Unified-Asset-Library.md` § "SwiftUI Asset Enum"

### Asset Batch 2: Onboarding Hero & Success
- [x] `WelcomeHero` (light + dark) — AUTH-01
- [x] `WelcomeHeroCat` (light + dark) — AUTH-01 alt
- [x] `Confetti` — AUTH-09
- [x] `SuccessCheckmark` — AUTH-09
- [x] `MailIcon` — AUTH-04b
- [x] Scaled, imported to Xcode, `AssetImage.swift` updated with all 5 entries

### Reusable Components
- [x] `PawButton.swift` — primary, secondary, tertiary styles + loading state
- [x] `PawTextField.swift` — label (optional), error state, secure variant, visibility toggle
- [x] `PawCard.swift` — backgroundElevated + radius + shadow modifier
- [x] `PawAlert.swift` — banner alert (success/warning/error/info variants)
- [x] `PawAvatar.swift` — small/medium/large with placeholder fallback
- [x] `PawProgressIndicator.swift` — segmented progress for onboarding flows
- [x] `PawEmptyState.swift` — illustration + title + subtitle + CTA
- [x] `PawLoadingSkeleton.swift` — shimmer placeholder for lists
- [x] `PawAuthDivider.swift` + `PawLoadingOverlay.swift` — shared auth-screen chrome (added with the AUTH-01/02/03 refit)
- [x] **ComponentGallery** view (debug-only) rendering every component in every state

### Architecture Plumbing
- [x] `AppError.swift` — typed error enum (network, auth, validation, server)
- [x] `AuthManager.swift` — observable auth state, token persistence in Keychain (+ `AuthProviding` seam for tests; expired-session guard per supabase-swift emitLocalSessionAsInitialSession opt-in)
- [x] `KeychainHelper.swift`
- [x] `RootView.swift` — switches between auth flow and main app based on auth state
- [x] `NavigationStack` patterns and a typed `Route` enum per major flow
- [x] `ImageUploadService.swift` — Supabase Storage upload + URL return
- [x] `LocationService.swift` — wraps `CLLocationManager`, handles permissions
- [x] First end-to-end smoke test: launch app → see RootView → auth flows run against the live backend

---

## Phase 1 — Auth & Onboarding (partial — Sprint 1)

### Backend (direct SDK + RLS, `docs/adr/0001`)
- [x] Supabase Auth provider: email (auto-confirm enabled 2026-09-02 — signup returns an immediate session per spec)
- [x] Migration: Postgres trigger creates `profiles` row on auth signup (0001; live-verified 2026-09-02)
- [x] Migration: RLS policies for `profiles` and `pets` (row-owner read/write; cross-user access denied — 0001 + 0003, applied to hosted DB and probe-verified via `scripts/verify-auth-backend.sh`)
- [x] Storage bucket policies for profile + pet photo uploads (0002)
- [x] Auth flows (sign up, sign in) call the SDK directly — no server middleman (password reset lands with AUTH-04, issue #4)

### Frontend Screens
- [x] AUTH-01 Welcome — token-refit, verified light + dark in simulator (issue #2)
- [x] AUTH-02 Sign Up (email) + ViewModel + form validation — Apple button present but stubbed until issue #6 (issues #2/#3)
- [x] AUTH-03 Sign In + ViewModel — Apple button stubbed until issue #6 (issues #2/#3)

---

## Pulled forward from Phase 7 (Quality Pass)
- [x] Unit tests on auth ViewModels (issue #16): `PawConnectTests` hosted bundle, shared `PawConnect` scheme, `AuthProviding`/`AuthErrorMapping` testability seams, 29 Swift Testing tests in 7 suites, headless via `xcodebuild test` (booking/care-session tests remain on the Phase 7 list)
