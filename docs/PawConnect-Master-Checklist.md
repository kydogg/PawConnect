# PawConnect — Master Build Checklist

**Goal:** Every discrete task between today and a launched MVP, in the order you should tackle them.

**Scope:** MVP per your spec — Epics 1–8 + 10. Epic 9 (Payments via Stripe) is deferred; use Venmo/cash for the hyperlocal beta. Add Stripe before public launch.

**How to use this:**
- Each `[ ]` is a single sitting (30 min to ~3 hours). If something's bigger, decompose it.
- Phase numbers map to your sprint plan. Don't skip phases — Phase 0 unblocks everything.
- Cross-references like `AUTH-01` point to sections in `PRODUCT_SPEC.md`. Don't re-read the spec for every task — read it once per screen.
- Asset references like `Batch 2` point to sections in `PawConnect-Unified-Asset-Library.md`.
- Strikethrough or check off. Move done items to a separate `DONE.md` weekly so this list stays scannable.

**Estimated total:** 16–22 weeks part-time at 10–15 hr/week.

---

## Phase 0 — Foundation (1–2 weeks)

Nothing ships without this. Do it once, do it right.

### Project & Tooling
- [ ] Create new Xcode project: SwiftUI App, iOS 26 minimum deployment, organization identifier set
- [ ] Configure bundle identifier and team for code signing
- [ ] Initialize Git repo, push to GitHub (private)
- [ ] Set up GitFlow: `main`, `develop`, feature branches; protect `main`
- [ ] Add `.gitignore` (Xcode template + add `.DS_Store`, `.env`, `xcuserdata/`)
- [ ] Create `README.md` with setup instructions for future-you
- [ ] Set up Swift Package Manager dependencies file
- [ ] Add SwiftLint as SPM dependency + `.swiftlint.yml` config
- [ ] Add SwiftFormat (or use Xcode's built-in)

### Backend Infrastructure
- read me 
  - [ ] If Supabase Realtime: enable Realtime on Supabase tables that drive Live Activity state

### Capabilities & Entitlements
- [ ] Enable Sign In with Apple capability
- [ ] Enable Push Notifications capability
- [ ] Enable Background Modes: Location updates, Remote notifications
- [ ] Enable Maps capability
- [ ] Generate APNs auth key in Apple Developer portal, save to 1Password
- [ ] Configure App Groups (needed for Live Activity ↔ main app data sharing)

### Design System (in Xcode)
- [ ] Create `Assets.xcassets` color sets for every token in `PRODUCT_SPEC.md` Design System Reference (with light + dark variants):
  - [ ] `primarySunset`, `primaryTerracotta`
  - [ ] `secondarySage`, `secondaryAmber`, `secondaryPeach`
  - [ ] `backgroundPrimary`, `backgroundElevated`
  - [ ] `textPrimary`, `textSecondary`, `textTertiary`
  - [ ] `border`
- [ ] `AppColor.swift` — typed accessors for all color sets
- [ ] `AppFont.swift` — typography extension matching all 10 typography tokens
- [ ] `AppSpacing.swift` — spacing constants (xxs through xxl)
- [ ] `AppRadius.swift` — corner radius constants
- [ ] `AppShadow.swift` — three shadow ViewModifiers (card/float/modal)
- [ ] Verify all tokens render correctly in light + dark on a test view

### Asset Pipeline Setup (do once)

This sets up the Midjourney-to-Xcode workflow. Reference: `PawConnect-Unified-Asset-Library.md` for every prompt, dimension, and Xcode path.

- [ ] Confirm staging folder structure exists at `/Users/kylebaker/Developer/Mobile/SwiftUI/PawConnect/PawConnect/Asset-Staging/`
  - [ ] Subfolders match library categories: `Brand/`, `Onboarding/`, `EmptyStates/`, `Placeholders/`, `ServiceIcons/`, `TrustBadges/`, `LiveActivities/`, `Location/`, `Messaging/`, `Booking/`, `Feedback/`, `Backgrounds/`
- [ ] Verify `scale-assets.sh` is executable and runs without errors on a test PNG
- [ ] Create folder structure inside `Assets.xcassets/` matching staging categories (empty image sets, ready to receive)
- [ ] Document the workflow somewhere visible (README or top of asset library):
  1. Paste prompt into Midjourney → download
  2. Save raw download as `[Name]@3x.png` in matching staging subfolder
  3. (Dark variant) Save second generation as `[Name]-dark@3x.png`
  4. Run `./scale-assets.sh PawConnect/Asset-Staging/`
  5. Drag all three resulting files into the Xcode imageset
  6. Set "Render As" to Template for icons, Original for illustrations
- [ ] Create `AssetImage.swift` enum (skeleton — fill in as assets land):
  - [ ] File path: `PawConnect/Core/Utilities/AssetImage.swift`
  - [ ] Empty case stubs for all 37 catalog assets (36 imagesets + AppIcon), organized by category
  - [ ] Reference: full enum in `PawConnect-Unified-Asset-Library.md` § "SwiftUI Asset Enum"

### Asset Batch 1: Brand Foundation (blocks Phase 1)
- [ ] Generate `LogoLockup` (light + dark) — needed for AUTH-01
- [ ] Generate `AppIcon` master at 1024×1024 — needed before TestFlight
- [ ] Run scaling script, import to Xcode
- [ ] Verify in light + dark on a blank SwiftUI view

### Asset Batch 2: Onboarding Hero & Success (blocks Phase 1)
- [ ] Generate `WelcomeHero` (light + dark) — AUTH-01
- [ ] Generate `WelcomeHeroCat` (light + dark) — AUTH-01 alt
- [ ] Generate `Confetti` — AUTH-09
- [ ] Generate `SuccessCheckmark` — AUTH-09
- [ ] Generate `MailIcon` — AUTH-04b
- [ ] Run scaling script, import all to Xcode
- [ ] Update `AssetImage.swift` with these 5 entries

### Reusable Components (build once, use everywhere)
- [ ] `PawButton.swift` — primary, secondary, tertiary styles + loading state
- [ ] `PawTextField.swift` — with label, error state, secure variant, visibility toggle
- [ ] `PawCard.swift` — backgroundElevated + radius + shadow modifier
- [ ] `PawAlert.swift` — banner alert (success/warning/error/info variants)
- [ ] `PawAvatar.swift` — small/medium/large with placeholder fallback
- [ ] `PawProgressIndicator.swift` — segmented progress for onboarding flows
- [ ] `PawEmptyState.swift` — illustration + title + subtitle + CTA
- [ ] `PawLoadingSkeleton.swift` — shimmer placeholder for lists
- [ ] Build a **ComponentGallery** view (debug-only) that renders every component in every state — your visual regression check

### Architecture Plumbing
- [ ] `AppError.swift` — typed error enum (network, auth, validation, server)
- [ ] `AuthManager.swift` — observable auth state, token persistence in Keychain
- [ ] `KeychainHelper.swift` — wrapper around `KeychainAccess` or hand-rolled
- [ ] `RootView.swift` — switches between auth flow and main app based on auth state
- [ ] Set up `NavigationStack` patterns and a typed `Route` enum per major flow
- [ ] `ImageUploadService.swift` — handles Supabase Storage upload + URL return
- [ ] `LocationService.swift` — wraps `CLLocationManager`, handles permissions
- [ ] Create base `ViewModel` protocol if you want consistency (optional)
- [ ] First end-to-end smoke test: launch app → see RootView → tap a button → log to console

---

## Phase 1 — Auth & Onboarding (Epic 1, 2–3 weeks)

Spec: AUTH-01 through AUTH-14. 14 screens, 13 backend endpoints.

**Asset Prerequisites:** Batches 1 + 2 (done in Phase 0). Verify in `AssetImage.swift` before starting screens.

### Backend (Supabase Auth, direct SDK + RLS — see `docs/adr/0001`)

No Edge Functions in this phase: the app calls Supabase Auth/Postgres/Storage directly via supabase-swift, guarded by Row Level Security. Edge Functions are reserved for server-authoritative flows in later phases (booking state machine, Live Activity pushes).

- [ ] Configure Supabase Auth providers: email, Apple
- [ ] Set up Apple Sign In service ID + return URLs in Apple Developer
- [ ] Migration: Postgres trigger creates `users` row on auth signup
- [ ] Migration: RLS policies for `users` and `pets` (row-owner read/write; deny cross-user access)
- [ ] Storage bucket policies for profile + pet photo uploads
- [ ] Auth flows (sign up, sign in, password reset) call the SDK directly — no server middleman

### Frontend Screens
- [ ] AUTH-01 Welcome — static, simplest first
- [ ] AUTH-02 Sign Up (email + Apple) + ViewModel + form validation
- [ ] AUTH-03 Sign In + ViewModel
- [ ] AUTH-04 Forgot Password + AUTH-04b success state
- [ ] AUTH-05 Role Selection (single-select cards)
- [ ] AUTH-06 Owner: Location (GPS + manual fallback)
- [ ] AUTH-07 Owner: Add Pet (photo picker, breed sheet, age picker)
- [ ] AUTH-08 Owner: Pet Care Details (medications + feeding builder)
- [ ] AUTH-09 Onboarding Success (with celebration animation)
- [ ] AUTH-10 Sitter: Service Area (map preview with radius circle)
- [ ] AUTH-11 Sitter: Services (multi-select with prices)
- [ ] AUTH-12 Sitter: Availability (week grid)
- [ ] AUTH-13 Sitter: Rates (per service inputs)
- [ ] AUTH-14 Sitter: Bio & Photo

### Cross-Cutting
- [ ] Apple Sign In end-to-end test: new user + returning user paths
- [ ] Email verification flow tested (real email)
- [ ] Password reset flow tested (real email, real link click)
- [ ] Token refresh works after Supabase session expires
- [ ] Logout clears Keychain and routes to AUTH-01
- [ ] Onboarding can be resumed if interrupted (test by force-quitting mid-flow)
- [ ] All form validations match spec acceptance criteria

---

## Phase 2 — Pet & User Profiles (Epics 2+3, 2–3 weeks)

Spec: PET-01 to PET-04, PROF-01 to PROF-04. 8 screens.

**Asset Prerequisites — generate before frontend work:**
- [ ] Batch 3 — Empty States: `EmptyNoPets` (light + dark) for PET-01
- [ ] Batch 4 — Placeholders: `DogAvatar`, `CatAvatar`, `OtherPetAvatar`, `PetHeroPlaceholder`, `SitterHeroPlaceholder`
- [ ] Run scaling script, import to Xcode, update `AssetImage.swift`

### Backend
- [ ] `pets:listByOwner` (with real-time subscription via Supabase Realtime)
- [ ] `pets:getById`, `pets:update`, `pets:delete`
- [ ] `users:getProfile`, `users:updateProfile`
- [ ] `sitters:getProfile` (with computed rating + review count + distance)
- [ ] `favorites:toggle`
- [ ] `auth:logout`

### Frontend Screens
- [ ] PET-01 My Pets List (with empty state + skeleton + real-time updates)
- [ ] PET-02 Pet Detail (hero photo + medications + feeding + vet info)
- [ ] PET-03 Add Pet flow (reuses AUTH-07/08 components)
- [ ] PET-04 Edit Pet (with dirty-state detection + cancel confirmation)
- [ ] PROF-01 My Profile (Owner) — menu hub
- [ ] PROF-02 Sitter Profile (public view, sticky footer with Contact/Book)
- [ ] PROF-03 Edit Profile (Owner)
- [ ] PROF-04 Edit Profile (Sitter) — comprehensive form
- [ ] Photo upload integration tested across all profile screens
- [ ] Delete confirmations work (pet, account)

---

## Phase 3 — Search & Discovery (Epic 4, 1.5 weeks)

Spec: SRCH-01 to SRCH-03. 3 screens.

**Asset Prerequisites — generate before frontend work:**
- [ ] Batch 3 — Empty States: `EmptyNoSitters` (light + dark) for SRCH-02
- Service icons: SF Symbols via `ServiceIcon` / `Image(service:)` — no generation, import, or `AssetImage` entry needed.
- [ ] Batch 6 — Trust Badges: `BadgeVerified`, `RatingStars`, `BadgeBackgroundCheck`
- [ ] Batch 8 — Location: `PricePin`, `ServiceRadius` for SRCH-03 map view
- [ ] Run scaling script, import to Xcode, update `AssetImage.swift`

### Backend
- [ ] PostGIS extension enabled on Supabase
- [ ] Migration: add geographic indexes on sitter location
- [ ] `search:findSitters` with location radius + filters + sort + pagination
- [ ] `search:getRecentSitters`
- [ ] `search:getRecommendations`
- [ ] Bounding-box variant for map view

### Frontend Screens
- [ ] SRCH-01 Search Home (location picker sheet + date picker sheet)
- [ ] SRCH-02 Results List (filter sheet + sort + infinite scroll)
- [ ] SRCH-03 Results Map (MapKit + custom price pins + preview card)
- [ ] List ↔ Map toggle preserves filters
- [ ] Empty state and "no results in this area" toast both work

---

## Phase 4 — Booking System (Epic 5, 2–3 weeks)

Spec: BOOK-01 through BOOK-11. 11 screens.

**Asset Prerequisites — generate before frontend work:**
- [ ] Batch 3 — Empty States: `EmptyNoBookings` (light + dark) for owner + sitter booking lists
- [ ] Batch 9 — Booking: `CalendarBooking` for booking flow header
- [ ] Batch 9 — Feedback: `FeedbackSuccess`, `FeedbackWarning`, `FeedbackError` (Template) for booking confirmations and cancellations
- [ ] Run scaling script, import to Xcode, update `AssetImage.swift`

### Backend
- [ ] `bookings:create` (validates availability, locks pricing)
- [ ] `bookings:listByOwner`, `:listBySitter`
- [ ] `bookings:getById` (with full pet + sitter + owner context)
- [ ] `bookings:updateStatus` (pending → accepted/declined → completed/cancelled)
- [ ] `bookings:cancel` (with cancellation policy logic)
- [ ] State machine logic enforced server-side
- [ ] Push notification triggers on status change

### Frontend Screens
- [ ] All 11 BOOK-* screens per spec
- [ ] Booking flow end-to-end: search → profile → book → request → accept → complete
- [ ] Status timeline view works for both owner and sitter perspectives
- [ ] Cancellation flow with proper warnings

---

## Phase 5 — Live Activities ⭐ (Epic 6, 4–5 weeks)

**This is your differentiator. Budget extra time for the ActivityKit learning curve.**

Spec: LIVE-01 through LIVE-10.

**Asset Prerequisites — generate before frontend work:**
- [ ] Batch 7 — Live Activity Icons (all Template render mode): `ActivityMedication`, `ActivityFeeding`, `ActivityWalk`, `ActivityBathroom`, `ActivityPlay`
- [ ] Run scaling script, import to Xcode (also import to widget extension target — see Setup below), update `AssetImage.swift`

### Setup
- [ ] Add Widget Extension target to project
- [ ] Configure shared App Group between main app and widget
- [ ] Add ActivityKit framework to widget target
- [ ] Add Live Activity assets to widget extension's asset catalog (assets must be available to both targets)
- [ ] Define `CareSessionAttributes` (static) and `ContentState` (dynamic) struct
- [ ] APNs key uploaded, push token registration working in main app
- [ ] APNs push payload format documented and tested via curl

### Backend (real-time channel — Convex or Supabase Realtime per Phase 0 decision)
- [ ] Schema: `careSessions`, `careItems`, `walks`, `carePhotos`
- [ ] `careSessions:start` mutation (kicks off Live Activity push)
- [ ] `careSessions:completeItem` mutation
- [ ] `careSessions:startWalk`, `:updateWalkRoute`, `:endWalk`
- [ ] `careSessions:complete`
- [ ] `careSessions:getOwnerView` (real-time subscription)
- [ ] APNs server function — sends Live Activity update on each state change
- [ ] Test push payload reaches device and updates Live Activity

### Widget UI
- [ ] Lock Screen layout (matches spec design)
- [ ] Dynamic Island compact layout (leading + trailing)
- [ ] Dynamic Island expanded layout (full state)
- [ ] Dynamic Island minimal layout
- [ ] All variants render in both light and dark
- [ ] Widget tappable area opens correct deep link in main app

### Sitter Screens
- [ ] LIVE-01 Start Session (pre-flight checklist generation from pet data)
- [ ] LIVE-02 Care Dashboard (live checklist, tap to complete)
- [ ] LIVE-03 Item Detail (notes + completion confirmation)
- [ ] LIVE-04 Walk Tracking (MapKit + GPS recording + duration timer)
- [ ] LIVE-05 Walk Summary
- [ ] LIVE-06 End Session
- [ ] LIVE-07 Session Complete

### Owner Screens
- [ ] LIVE-08 Live Activity (the lock screen / Dynamic Island view itself)
- [ ] LIVE-09 Live Detail (full session view in app)
- [ ] LIVE-10 Session Summary (post-session record + export)

### Validation
- [ ] End-to-end: sitter starts session → owner's lock screen lights up
- [ ] Owner sees real-time updates as sitter checks off items
- [ ] Walk route streams to owner's map
- [ ] Session completion triggers push notification + summary screen
- [ ] Live Activity expires correctly after session ends
- [ ] Test on physical device (Live Activities don't fully work in simulator)

---

## Phase 6 — Messaging + Reviews (Epics 7+8, 1.5 weeks)

**Asset Prerequisites — generate before frontend work:**
- [ ] Batch 3 — Empty States: `EmptyNoMessages` (light + dark) for MSG-01
- [ ] Batch 9 — Messaging: `NewMessage` icon for new conversation entry
- [ ] Batch 9 — Feedback: `ReviewStarsEmpty`, `ReviewStarsFilled` (Template) for REV-01
- [ ] Run scaling script, import to Xcode, update `AssetImage.swift`

### Backend
- [ ] `messages:listConversations`
- [ ] `messages:getConversation` with real-time subscription
- [ ] `messages:send`, `:markRead`
- [ ] `messages:getOrCreateConversation`
- [ ] `reviews:create` (only after completed booking)
- [ ] `reviews:listForSitter`
- [ ] Push notification on new message

### Frontend Screens
- [ ] MSG-01 Conversations List (with unread badges)
- [ ] MSG-02 Chat View (real-time updates, send box, photo picker)
- [ ] MSG-03 New Message entry flow
- [ ] REV-01 Leave Review (star rating + text + tags)
- [ ] REV-02 Reviews List (on sitter profile)
- [ ] Review prompt triggers after booking completion
- [ ] Review submission updates sitter's average rating

---

## Phase 7 — Settings + Polish (Epic 10 + cross-cutting, 1–2 weeks)

**Asset Prerequisites — optional, low-priority:**
- [ ] Batch 10 — Backgrounds: `GradientWarm` (or build as SwiftUI `LinearGradient` and skip the asset entirely — recommended)
- [ ] Final pass: regenerate any assets that look weak after seeing them in context

### Settings
- [ ] SET-01 Settings screen (notifications, appearance, units, logout, delete account)
- [ ] SET-02 Help Center (static FAQ content for now)
- [ ] `users:updateSettings` endpoint
- [ ] Delete account flow with multi-step confirmation

### Polish Pass (do this for every major screen)
- [ ] Empty states have illustrations and clear CTAs
- [ ] Loading states use skeleton or spinner consistently
- [ ] Error states have retry buttons
- [ ] All forms show inline validation errors
- [ ] All destructive actions show confirmation
- [ ] All long lists support pull-to-refresh
- [ ] Haptic feedback on key interactions (button presses, completions)
- [ ] Animations feel intentional, not janky

### Accessibility Audit
- [ ] VoiceOver labels on every interactive element
- [ ] Dynamic Type tested at largest size — no text clipping
- [ ] Color contrast verified WCAG AA on every color pair
- [ ] Focus order makes sense on every screen
- [ ] No information conveyed by color alone

### Quality Pass
- [ ] Unit tests on critical ViewModels (auth, booking, care session)
- [ ] Snapshot tests on key screens (catches visual regressions cheaply)
- [ ] Memory profiling — Instruments leaks tool, run a full booking flow
- [ ] Performance profiling — no view takes >500ms to load
- [ ] Network failure handling tested by toggling airplane mode mid-flow

---

## Phase 8 — Beta Prep (1–2 weeks)

### Observability
- [ ] Sentry SDK added (or Firebase Crashlytics)
- [ ] Sentry release tagging set up via build script
- [ ] Test crash captured in dashboard
- [ ] Analytics SDK added — PostHog or Mixpanel (PostHog is cheaper at scale)
- [ ] Event taxonomy documented: signup, booking_created, session_started, etc.
- [ ] Funnel for sign-up → first booking instrumented

### App Store Connect
- [ ] App record created in App Store Connect
- [ ] Bundle ID matches Xcode project
- [ ] App icon uploaded (1024×1024 master)
- [ ] Privacy policy hosted (Notion/Carrd page is fine for now)
- [ ] Terms of Service hosted
- [ ] App Privacy ("nutrition labels") completed accurately
- [ ] Support URL and Marketing URL set
- [ ] Age rating questionnaire completed
- [ ] Categories set: Lifestyle (primary), Productivity (secondary)

### Marketing Assets
- [ ] Screenshots: 6.7" iPhone (Pro Max) — 5 screens minimum
- [ ] Screenshots: 6.5" iPhone — same 5 screens
- [ ] App preview video (optional but converts well)
- [ ] App description copy (short + long)
- [ ] Keywords for ASO research (use AppFigures or free Sensor Tower trial)
- [ ] Promotional text written

### TestFlight
- [ ] First TestFlight build uploaded
- [ ] Internal testing group: just you, on multiple devices
- [ ] Test plan: complete every flow on a real device
- [ ] External testing group created
- [ ] Beta tester recruitment plan: target neighborhood — list 20–30 candidates
- [ ] Beta invitation email/text template drafted
- [ ] Feedback collection method (in-app shake-to-report? Email? Discord?)

### Beta Iteration
- [ ] Onboard first 5 beta sitters in target neighborhood
- [ ] Onboard first 10 beta owners in target neighborhood
- [ ] Daily check-in: review crashes, read feedback
- [ ] Weekly: triage feedback into bug/feature/won't-fix
- [ ] Fix all P0 bugs before public launch
- [ ] Fix all P1 bugs before public launch
- [ ] Document P2/P3 in post-launch backlog

---

## Phase 9 — Launch

- [ ] Final regression test on all MVP flows
- [ ] Submit to App Store review
- [ ] If rejected: address feedback, resubmit (allow 1–2 weeks buffer)
- [ ] App approved — release manually (don't auto-release)
- [ ] Hyperlocal launch announcement: neighborhood Facebook group, Nextdoor, local subreddits
- [ ] Personal outreach to known dog owners in target area
- [ ] Sitter recruitment push: dog parks, vet clinics, neighborhood flyers
- [ ] Set up `support@pawconnect.app` (or chosen domain)
- [ ] Set up monitoring alerts (Sentry email, analytics dashboard bookmark)
- [ ] First-week war room: refresh dashboards multiple times daily

---

## Phase 10 — Post-Launch (ongoing)

### Operations
- [ ] Daily: bug triage from Sentry + user reports
- [ ] Weekly: review analytics — sign-up rate, activation rate, booking conversion
- [ ] Weekly: feature request review, update backlog
- [ ] Monthly: cohort retention analysis
- [ ] Monthly: hyperlocal expansion decision (next neighborhood?)

### Deferred Work to Pull In
- [ ] Epic 9 — Stripe Payments (do this once you have transaction volume to justify the integration cost)
  - [ ] Stripe Connect account setup
  - [ ] PAY-01 Add Payment Method
  - [ ] PAY-02 Payout setup for sitters
  - [ ] Move from Venmo/cash to in-app payments
- [ ] Background check integration (Checkr API) — required before scaling beyond hyperlocal
- [ ] Verified badge system (after background checks live)
- [ ] Sitter-side reviews of owners (REV-08)
- [ ] Photos in chat (MSG-08)
- [ ] Search filters: pet size, response time, verified-only

### Strategic
- [ ] Vapor backend migration evaluation (only if Supabase becomes a real bottleneck — don't migrate prematurely)
- [ ] iPad layout adaptation (low priority unless usage data warrants it)
- [ ] Apple Watch companion (cool but not MVP — measure demand first)
- [ ] Android via React Native (future market expansion)

---

## Operating Rules (read these once a week)

1. **One screen at a time.** Don't start AUTH-03 before AUTH-02 is done, tested, and merged.
2. **Commit at every checkpoint.** A finished screen, a fixed bug, a passing test — that's a commit.
3. **Push every day you code.** Your laptop dying isn't allowed to delete a week.
4. **Don't ship past Phase 0.** If a component is missing, build it; don't inline-style.
5. **The spec is the source of truth.** When in doubt, re-read the screen's section, not your memory of it.
6. **Cut, don't postpone.** If a feature isn't on this list, it's not in MVP. Add to "Deferred."
7. **Generate assets just-in-time, not all at once.** Each phase's prerequisites tell you what to make. Resist the urge to generate Phase 5's icons during Phase 1.
8. **Test on real hardware before claiming done** — especially Live Activities, location, push.
9. **Ship the ugly version first.** Polish is Phase 7. Resist polishing in Phase 1.

---

*Last updated: April 30, 2026. This list is a living document — update it as scope shifts, but resist scope creep.*
