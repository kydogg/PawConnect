# PawConnect Design System

A warm, neighborhood-scale design system for **PawConnect** — a hyperlocal iOS
pet-care marketplace (SwiftUI, iOS 26 "Liquid Glass"). PawConnect competes with
Rover/Wag/Care.com by leaning into native iOS features — its signature is a
**Live Activity** that shows real-time care progress on the owner's Lock Screen —
and a **transparency-first, warmth-over-efficiency** posture.

> **Positioning in one line:** *the pet-care app a thoughtful friend would build
> for their neighborhood* — premium, warm, calm, and trustworthy through
> substance rather than badge-soup.

This folder gives a design agent everything needed to design on-brand PawConnect
screens and assets: color & type tokens, foundations, real brand assets, an icon
approach, and a high-fidelity interactive UI kit.

---

## Sources (provenance)

Built from materials the team provided. You may not have access — they're
recorded here so you can go deeper if you do.

| Source | What it gave us |
|--------|-----------------|
| **GitHub: [github.com/kydogg/PawConnect](https://github.com/kydogg/PawConnect)** | The SwiftUI codebase — the **source of truth** for the design layer. We lifted exact values from `Core/Design/AppColors.swift`, `PawButton/PawCard/PawTextField/PawLogo.swift`, `Constants.swift`, and the implemented Auth screens (`WelcomeView`, `SignInView`, `SplashView`). Two real brand images (`App_Icon.png`, a Shiba avatar) came from `Resources/Assets.xcassets/`. **Explore this repo further to build higher-fidelity screens.** |
| `uploads/PRODUCT_SPEC.md` | 3,185-line structural spec — every screen's components, states, data, and acceptance criteria. The § *Design System Reference* is the canonical token table. |
| `uploads/DESIGN_INTENT.md` | The *emotional posture* of 35 screens — what each should feel like, with explicit anti-patterns. **Co-canonical with the spec.** |
| `uploads/brand-design.html` | The visual reference / master design kit (colors, type, components, dark mode). |
| `uploads/PawConnect-Asset-Library.md` | Catalog of every visual asset (37 items) with generation prompts, the exact Claude-SVG service-icon specs, and an SF-Symbols-first tool-selection matrix. |

When building a screen, **read both the spec entry and the intent entry** — the
spec is structural truth, the intent is taste calibration.

---

## Index — what's in this folder

| Path | What it is |
|------|-----------|
| `README.md` | This file — context, content & visual foundations, iconography, index |
| `SKILL.md` | Agent-Skill entry point (works in Claude Code) |
| `colors_and_type.css` | All tokens: colors (light+dark), spacing, radii, shadows, type scale + semantic classes |
| `assets/` | Real brand imagery — Shiba pet avatars, app-icon master |
| `preview/` | Design-system spec cards (rendered in the Design System tab) |
| `ui_kits/ios-app/` | **Interactive iOS UI kit** — click-through prototype + JSX components. See its own `README.md` |
| `reference/` | (if present) supporting notes |
| `PawConnect/` | Imported Swift source kept for reference (design layer + Auth views) |

There were **no slide decks** in the source material, so no `slides/` are
included.

---

## CONTENT FUNDAMENTALS — how PawConnect writes

The voice is a **warm, plain-spoken neighbor** — never a marketplace, never a
SaaS funnel. Copy does emotional work quietly; it never shouts trust or urgency.

- **Person & address.** Second person, conversational. "Find pet care you
  trust," not "Premium pet care marketplace." Questions over labels: the Add-Pet
  screen asks *"What's their name?"* — not *"Pet Name (required)."*
- **The pet is family, never "it."** Copy uses *they*, or the pet's actual name
  once known: *"[Pet name] is all set up. Welcome to the neighborhood."*
- **Casing.** Sentence case nearly everywhere — titles, buttons, labels.
  ("Find a sitter," "Create my account," "Today's care.") Locations render
  lowercase as a soft touch ("bernal heights, sf").
- **Buttons are forward-looking, not commanding.** "Get Started," "Create my
  account," "Continue" — not "Submit" / "Save & Continue."
- **Errors are helpful, not scolding.** "We didn't recognize that combination.
  Try again, or reset your password." — never "Invalid credentials."
- **No pressure, ever.** No "Only 2 spots left," no "50,000+ owners," no
  "Sitters respond fastest within 1 hour," no countdowns. The anti-patterns in
  DESIGN_INTENT.md are load-bearing — read them.
- **Trust through substance.** One meaningful verification mark, not a stack of
  badges. A clear photo, a few specific reviews, and a transparent rate.
- **Emoji.** Used *sparingly* and only where genuinely warm — pet-type toggles
  ("🐕 Dogs · 🐈 Cats · 🐾 Other") and the occasional 🧡 in a sitter's message.
  Never in headings, CTAs, or system copy. SF Symbols and the custom icon set
  carry iconography, not emoji.
- **Pacing.** Slow down at emotional moments (handing over your pet, the session
  completing). Most apps optimize speed-to-conversion; PawConnect can breathe.

*Example microcopy:* "Peace of mind, one paw at a time" (tagline) · "Sign in to
continue caring for your pets" · "Biscuit is on a walk · with Maya · 12 min in" ·
"What stood out about Maya?" (review prompt).

---

## VISUAL FOUNDATIONS

**Overall feeling:** warm sunset light on a cream page. Earthy, premium, soft —
distinctly *not* the cool greens/teals/purples of competitors (Rover #00BD70,
Wag #00D4AA, Care.com #662D91).

- **Color.** Primary is **Sunset `#EA580C`**; pressed/destructive is
  **Terracotta `#DC2626`**. **Sage `#059669`** carries trust/success/"available,"
  **Amber `#F59E0B`** is ratings/warnings, **Peach `#FB923C`** is soft accents.
  Neutrals are a **warm cream→charcoal ramp** (`#FFFBF5` … `#1F1B17`) — never
  cool grays. **Dark mode** swaps the cream page for warm charcoal
  (`--bg-primary #1A1613`, `--bg-elevated #27221D`) and inverts text, neutrals
  and borders — but the **warm brand & accent hues stay constant** across modes
  (sunset stays `#EA580C`, sage `#059669`, etc.), so the palette reads identically
  light and dark. Use tokens; if you must invent a hue, derive it in
  oklch from the existing warm palette.
- **Type.** Apple system font (**SF Pro Display/Text**) via the native stack.
  Bold display (34) for hero moments, semibold for section headers, regular for
  body. Respect Dynamic Type — the pt sizes are design intent, not hard pixels.
- **Backgrounds.** Flat **cream** (`#FFFBF5`), not white. Heroes use a soft
  diagonal **sunset→peach 10% wash** or a full **sunset→terracotta gradient**
  (sitter profile, Live session). The **asset library does the heavy lifting** —
  warm, hand-drawn illustrations (see the Shiba assets) carry brand warmth;
  UI chrome recedes so they breathe. No bluish-purple gradients, ever.
- **Imagery vibe.** Warm, sunlit, slightly hand-drawn. Residential, walkable,
  neighborhood-scale — *not* aerial logistics maps or satellite views. The map
  view is **paper-like**, warm beige with soft roads, not Google-Maps gray.
- **Corners.** Friendly and rounded: inputs/small `8`, cards & primary buttons
  `12`, sheets/large cards `16`, hero containers `24`, avatars & pills full.
- **Cards.** White (`#FFFBF5`-on-cream → elevated `#FFFFFF`), `12` radius, a
  single **warm low shadow** `0 2px 8px rgba(31,27,23,0.08)`, `16` padding. No
  borders by default; no colored left-accent stripes. Elevation ladder:
  card → float (`0 4 16 / .12`) → modal (`0 8 24 / .16`).
- **Transparency & blur.** Reserved for genuinely floating iOS surfaces — the
  **Liquid Glass** tab bar, nav pills, and the **Lock Screen Live Activity**
  (`blur(24px) saturate(160%)` over a warm-dark scrim). Content cards stay solid.
- **Buttons.** Primary = **solid Sunset fill** (not a gradient — the shipping
  `PrimaryButtonStyle` uses a solid fill), 56pt tall, `12` radius, white label.
  Secondary = 1.5pt Sunset border on transparent. Tertiary = Sunset text only.
- **States.** *Press:* scale to `0.98` with a 0.1s ease (buttons) — gentle, never
  a hard color flash; text buttons shift Sunset→Terracotta. *Disabled:* 0.6
  opacity. *Hover* isn't a primary concern (touch-first), but mirror press.
- **Motion.** Soft and unhurried. Splash logo uses a **spring** (response 0.6,
  damping 0.7); content fades/slides in with short eases and small delays.
  Emotional screens (onboarding success, session complete) land like "sunlight
  after rain" — a contented exhale, never confetti-cannon energy. No bounce-heavy
  or snappy product-y motion.
- **Borders & dividers.** Hairline **Sand `#FAE5D3`** (`#3E342A` in dark).
  Inputs get a 1px inset border that turns Sunset on focus (+ soft glow).
- **Availability / status language.** Sage filled circle = available; hairline
  ring = not. Status chips are tasteful tinted pills (Active=Sunset,
  Confirmed=Sage, Pending=Amber, Completed=Clay), never loud alert banners.

---

## ICONOGRAPHY

**The rule:** if Apple ships an SF Symbol for it, use the SF Symbol — there is no
point customizing what already exists. Custom artwork is reserved for the few
places where a bespoke glyph carries real brand meaning:

| Use custom artwork | Use SF Symbols (everything else) |
|---|---|
| **Brand marks** — the PawConnect logo lockup (its paw is `pawprint.fill`) | **Nav chrome** — back, close, share, menu, ellipsis |
| **Hero illustrations** — Welcome hero, etc. (Midjourney) | **Status indicators** — success, error, warning |
| **Empty states** — illustrated, encouraging | **Standard actions** — add, edit, delete, filter, sort, settings |
| **Service-type icons** — Walking, Drop-in, Sitting, Boarding, Daycare | **Live Activity care icons** — meds, feeding, walk, play, bathroom |

So in the icon layer there is exactly **one** custom set — the **five
service-type icons** (ASSET-030…034: single-color `currentColor`, stroke 2,
round caps, template-tinted for light/dark). Everything else is an SF Symbol.

### SF Symbol map (production)

Use these named symbols in SwiftUI. They're system-tinted, dark-aware, and
Dynamic-Type aware.

| Role | SF Symbol |
|------|-----------|
| Back / forward / expand | `chevron.left` · `chevron.right` · `chevron.down` |
| Close · menu · more · share | `xmark` · `line.3.horizontal` · `ellipsis` · `square.and.arrow.up` |
| Add · edit · delete | `plus` · `pencil` · `trash` |
| Filter · sort · settings | `slider.horizontal.3` · `arrow.up.arrow.down` · `gearshape` |
| Search · map · list | `magnifyingglass` · `map` · `list.bullet` |
| Location · password toggle · camera | `location.fill` · `eye` / `eye.slash` · `camera.fill` |
| Tabs (search/bookings/messages/profile) | `magnifyingglass` · `calendar` · `message.fill` · `person.crop.circle` |
| Rating · favorite · verified · success | `star.fill` · `heart` / `heart.fill` · `checkmark.seal.fill` · `checkmark.circle.fill` |
| Alerts (warning · error) | `exclamationmark.triangle.fill` · `exclamationmark.circle.fill` |
| Live Activity care | `pills.fill` · `fork.knife` · `figure.walk` · `tennisball.fill` · `tree.fill` |
| Brand paw mark | `pawprint.fill` |

**Emoji** is *not* an icon system here — only the pet-type toggles use it
(🐕/🐈/🐾). No unicode-glyph icons standing in for real symbols.

### ⚠️ Web substitution (flagged)

SF Symbols are Apple-proprietary and **can't load on the web**. So in the HTML UI
kit, `ui_kits/ios-app/icons.jsx` is split into two clearly-labelled sections:
**Section A** renders rounded-outline *stand-ins* for each SF Symbol — every one
tagged with its real symbol name (and a `.sfSymbol` property for dev handoff) —
and **Section B** holds the five genuinely-custom service icons. When you build
production SwiftUI, use the named SF Symbols, never the stand-in SVGs. When you
build web mocks, use this set (or a close CDN set like Lucide). This is the one
place the system intentionally diverges from the native app — and it diverges
*only because the web can't render the real symbols*, not as a design choice.

---

## How to use this system

- **Designing a web mock / prototype** → pull tokens from `colors_and_type.css`,
  components from `ui_kits/ios-app/`, real imagery from `assets/`. Read the spec
  + intent entry for the screen first.
- **Designing production SwiftUI** → use the real `AppColors`/`PawButton`/etc.
  from the codebase and real SF Symbols; this folder is your reference for
  values, posture, and copy.
- Always honor the anti-patterns in `DESIGN_INTENT.md`. Warmth over efficiency.

---

## Known caveats / substitutions

- **SF Symbols → custom outline set** on web (see Iconography). Production should
  use real SF Symbols.
- **SF Pro** is Apple's system font; it renders natively on Apple devices via
  the font stack and falls back to the platform UI font elsewhere. No webfont
  files are bundled (and none should be — SF Pro is not web-licensable).
- **Sitter (person) photos** are user-supplied; mocks use the spec's peach
  placeholder. **Pet imagery** uses the two real Shiba assets.
- The codebase only implements the **Auth** screens today; all other screens in
  the UI kit are built from the spec + intent and are the design's best
  interpretation, not a code recreation.
