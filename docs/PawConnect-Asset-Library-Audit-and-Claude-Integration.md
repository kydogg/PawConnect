# PawConnect Asset Library — Audit & Claude Integration Supplement

**Companion to:** `PawConnect-Asset-Library.md`
**Purpose:** Close gaps in the canonical library and make it usable as input for Claude Code → Claude (SVG visualizer / artifact generator) workflows.
**Date:** April 30, 2026

---

## How to use this document

This is **additive**. The canonical library is `PawConnect-Asset-Library.md`. This supplement provides:
1. Audit findings (what's good, what's wrong, what's missing)
2. A tool-selection matrix (Midjourney vs Claude vs SF Symbol per asset class)
3. Dark-mode prompts for the 16 assets that need them
4. Claude SVG alternatives for icon-class assets (service, status, map, badges)
5. Workflow alignment with `scale-assets.sh`
6. Claude Code integration recipes
7. A patch list for the canonical library

Either keep this as a separate companion file, or merge sections into the canonical library when you next touch it. Both are valid.

---

## 1. Audit Summary

### ✅ What's working in `PawConnect-Asset-Library.md`

- **Scope discipline.** Limited to Epics 1–4 (25 screens, 37 assets). No premature work.
- **Brand fidelity.** Every prompt cites exact hex codes from `brand-design.html`. No drift.
- **Priority batching.** Four batches map to sprint blockers. Batch 1 covers everything needed before any UI starts.
- **SF Symbol honesty.** 22 of 37 assets have SF Symbol fallbacks identified. 14 are marked "Permanent acceptable" — meaning you can ship without custom art for those. Real cost savings.
- **Screen-to-asset cross-reference.** Every spec screen mapped to required assets. Catches orphans cheaply.

### ⚠️ What needs fixing

| Issue | Impact | Fix |
|---|---|---|
| Filename uses `Category-Name@3x.png` (e.g., `Brand-AppIcon@3x.png`) but `scale-assets.sh` expects `Name@3x.png` | Workflow break — script won't process files | See § 5 — pick one convention and stick with it |
| Many prompts say "transparent background" | Midjourney can't reliably produce transparent PNGs | Remove that phrase from prompts; plan for background removal in post (Preview.app or remove.bg) |
| "Dark Mode Variant: Yes" appears 16 times with no actual dark prompts | You can't generate the variants without re-deriving the prompts | See § 3 |
| `Dimensions` column says "Xcode derives @2x and @1x automatically" | Misleading — true *if* you use Xcode's auto-scaling, but `scale-assets.sh` is your actual pipeline and uses `sips` | Align doc to actual workflow (§ 5) |
| No mention of which assets are template-rendered vs original | Already correct in code (service icons say "Dark Mode: No — template rendering") but not consistently called out | Add a "Render As" column: Template / Original / App Icon |

### ❌ What's missing

| Gap | Why it matters |
|---|---|
| Dark mode prompts | 16 assets need them; without prompts, you'll improvise inconsistently |
| Tool-selection guidance (Midjourney vs Claude vs SF Symbol) | Some assets (icons, badges, map pins) are *easier and faster* to generate as SVG via Claude than as raster art via Midjourney |
| Claude SVG prompt templates | When you do want Claude to generate a visual, current library prompts are Midjourney-shaped (photographic adjectives, `--ar` flags) and won't translate |
| Workflow integration with `scale-assets.sh` | Workflow lives in your head and the audit doc; not surfaced here |
| Epic 5–10 placeholder | Deliberately deferred, but should be flagged so you know what's coming |
| Quality criteria per asset class | "How do I know this generation is good enough?" is not answered |

---

## 2. Tool-Selection Matrix

For each asset class, the cheapest path to a good result. Default to the fastest tool that produces acceptable quality.

| Asset Class | Best Tool | Why |
|---|---|---|
| **Hero illustrations** (Welcome, EmptyNoPets, EmptyNoSitters) | **Midjourney** | Warm, character-driven illustration with subtle texture. SVG can't easily replicate that warmth. |
| **App Icon master** | **Midjourney**, then hand-edit in Figma/Sketch | iOS HIG strict; Midjourney gets you 80%, finish manually |
| **Logo lockup** | **Midjourney** master, then **Claude SVG** for clean wordmark version | The icon is illustration; the wordmark version benefits from clean vector edges |
| **Service icons** (Walking, Sitting, Boarding, Drop-in, Daycare) | **Claude SVG** ⭐ | Geometric, single-color, template-rendered. SVG is faster, more consistent, and infinitely re-tintable. |
| **Status/feedback icons** (Success, Error, Warning) | **SF Symbols** ⭐ | Already system-tinted and dark-aware. Custom art adds zero value. |
| **Live Activity icons** (Medication, Feeding, Walk, Bathroom, Play) | **SF Symbols** ⭐ | Lock Screen rendering optimized; auto-adapts to wallpaper. Custom art is risky. |
| **Trust badges** (Verified, Background Check) | **SF Symbols** ⭐ or **Claude SVG** | `checkmark.seal.fill` is iconic and instantly recognizable. Custom art only if branding demands. |
| **Map pins** (Price, Selected) | **Claude SVG** ⭐ | Programmatic shape with dynamic price text overlay. Raster pin makes the price text rendering harder. |
| **Avatar placeholders** (Dog, Cat, Person, Other Pet) | **Claude SVG** | Simple silhouettes in a circular frame. Quick to iterate. |
| **Pet/Sitter hero placeholders** (PET-02, PROF-02 fallbacks) | **Claude SVG** | Gradient + centered icon — SVG is dramatically simpler |
| **Confetti / Celebration** | **Code animation** (Lottie or SwiftUI particle system) | Don't generate this as a static image at all |
| **Mail icon (AUTH-04b)** | **Midjourney** if you want the "paw seal" charm; otherwise **SF Symbol** `envelope.fill` | The custom version has personality; SF Symbol ships today |

⭐ = Recommendation likely shifts you away from current library default.

**Net effect of applying this matrix:** Of the 37 assets, **12–15 should now be Claude SVG**, **8–10 should be SF Symbols**, and **only ~12–15 actually need Midjourney**. Your Midjourney generation budget shrinks by ~60%.

---

## 3. Dark Mode Prompts

The pattern (established in the original Midjourney guide): swap warm cream/sand backgrounds for dark charcoal/espresso, keep accent colors identical. Brand identity stays consistent across modes — only the "paper" changes.

**Dark mode background colors:**
- `#1A1613` — Charcoal (replaces `#FFFBF5` cream)
- `#27221D` — Espresso (replaces `#FAE5D3` sand)

**Pattern for any prompt:**
> *Original prompt:* `... warm beige and cream tones (#FFFBF5, #FAE5D3) ...`
> *Dark variant:* `... warm charcoal and espresso tones (#1A1613, #27221D) ...`

Accent colors (`#EA580C`, `#DC2626`, `#FB923C`, `#F59E0B`, `#059669`) **do not change**. They're already vivid enough to read on dark.

### Per-asset dark prompts

These are ready to paste into Midjourney directly. Save outputs as `[Name]-dark@3x.png`.

#### ASSET-001 — App Icon (dark)
```
A modern app icon featuring a stylized paw print in warm sunset orange (#EA580C), minimalist geometric design, soft rounded corners, gradient from sunset orange to peachy terracotta (#DC2626), friendly and approachable, iOS app icon style, clean professional design on dark charcoal background (#1A1613), 1024x1024px --ar 1:1 --style raw --v 6
```

#### ASSET-002 — Logo Lockup (dark)
```
PawConnect logo design, warm sunset orange (#EA580C) paw print icon paired with cream sans-serif wordmark on dark charcoal background (#1A1613), friendly yet premium feel, horizontal lockup, peach (#FB923C) accents, modern tech startup aesthetic --ar 3:1 --style raw --v 6
```

#### ASSET-003 — Logo Icon Only (dark)
```
A single stylized paw print icon, warm sunset orange (#EA580C) gradient to peach (#FB923C), minimalist geometric design centered on dark charcoal background (#1A1613), modern flat style, clean edges readable at small sizes --ar 1:1 --style raw --v 6
```

#### ASSET-010 — Welcome Screen Hero (dark)
```
Heartwarming illustration of a happy pet owner, their dog, and a friendly pet sitter in a cozy nighttime neighborhood setting, warm sunset orange and terracotta color palette (#EA580C, #DC2626), soft peachy accents (#FB923C), modern flat illustration style, dark charcoal and espresso tones (#1A1613, #27221D) for sky and ground, welcoming atmosphere, diverse characters, community feeling --ar 16:9 --style raw --v 6
```

#### ASSET-013 — Welcome Hero Cat (dark)
```
Charming illustration of a smiling pet owner with their cat meeting a professional pet sitter, warm autumn color palette with sunset orange (#EA580C) and sage green accents (#059669), dark charcoal and espresso tones (#1A1613, #27221D) for cozy evening home environment, modern flat design, friendly and trustworthy vibe --ar 16:9 --style raw --v 6
```

#### ASSET-020 — No Pets Empty State (dark)
```
Cute illustration of an empty pet food bowl with a small paw print shadow, minimalist design, dark charcoal and espresso tones (#1A1613, #27221D), subtle sunset orange (#EA580C) accent, friendly and inviting, simple line art style, centered composition --ar 1:1 --style raw --v 6
```

#### ASSET-021 — No Sitters Empty State (dark)
```
Friendly illustration of a magnifying glass with a gentle question mark, sunset orange (#EA580C) and clay accents on dark charcoal background (#1A1613, #27221D), modern flat design, encouraging and helpful mood, simple clean composition --ar 4:3 --style raw --v 6
```

#### ASSET-022 — No Messages Empty State (dark)
```
Welcoming illustration of an empty chat bubble with a small heart inside, peachy (#FB923C) and sunset orange (#EA580C) accents on dark charcoal background (#1A1613, #27221D), friendly approachable style, modern flat design, encouraging users to start conversations, centered composition --ar 4:3 --style raw --v 6
```

#### ASSET-023 — No Bookings Empty State (dark)
```
Optimistic illustration of a calendar with a paw print marker, warm sunset orange and amber tones (#EA580C, #F59E0B) on dark charcoal background (#1A1613, #27221D), modern flat design, inviting atmosphere suggesting future bookings, clean simple composition --ar 4:3 --style raw --v 6
```

#### ASSET-024 — No Reviews Empty State (dark)
```
Gentle illustration of empty star outlines with a small paw print, amber (#F59E0B) accents on dark charcoal background (#1A1613, #27221D), modern minimalist design, encouraging and positive mood, clean centered composition --ar 4:3 --style raw --v 6
```

#### ASSET-025 — No Recommendations (dark)
```
Soft illustration of a magnifying glass with sparkles, sunset orange (#EA580C) and amber (#F59E0B) accents on dark charcoal background (#1A1613, #27221D), friendly modern flat design, inviting users to refine search, centered composition --ar 4:3 --style raw --v 6
```

#### ASSET-050 to ASSET-054 — Live Activity Icons (dark)
**Recommendation:** *Skip dark variants entirely. Use SF Symbols instead.* Live Activity icons render against the user's wallpaper, not your background. SF Symbols auto-adapt with `tint` modifier and `colorScheme` awareness. Generating raster dark variants is wasted effort for this category.

#### ASSET-060 — Dog Avatar Placeholder (dark)
```
Simple cute silhouette of a Shiba Inu head in profile, sunset orange (#EA580C) and peach (#FB923C) tones on dark charcoal circular background (#1A1613), warm friendly style, suitable as default pet avatar, clean rounded shapes --ar 1:1 --style raw --v 6
```

#### ASSET-061 — Cat Avatar Placeholder (dark)
```
Simple cute silhouette of a cat head in profile, sunset orange (#EA580C) and amber (#F59E0B) tones on dark charcoal circular background (#1A1613), warm friendly style, suitable as default pet avatar --ar 1:1 --style raw --v 6
```

#### ASSET-062 — Person Avatar Placeholder (dark)
```
Simple gentle silhouette of a friendly person, sunset orange (#EA580C) gradient on dark charcoal circular background (#1A1613), warm approachable style, suitable as default user avatar, modern minimalist design --ar 1:1 --style raw --v 6
```

#### ASSET-063 — Pet Hero Placeholder (dark)
```
Subtle gradient from sunset orange (#EA580C) to deep terracotta (#DC2626) on dark charcoal base (#1A1613), large centered paw print icon in cream (#FFFBF5) at 30% opacity, modern minimalist hero placeholder, clean composition --ar 16:9 --style raw --v 6
```

#### ASSET-064 — Sitter Hero Placeholder (dark)
```
Subtle gradient from sunset orange (#EA580C) to peach (#FB923C) on dark charcoal base (#1A1613), large centered person icon in cream (#FFFBF5) at 30% opacity, modern minimalist hero placeholder, professional warm feel --ar 16:9 --style raw --v 6
```

#### ASSET-065 — Other Pet Avatar (dark)
```
Friendly minimalist paw print icon in a soft circle, sage green (#059669) and sunset orange (#EA580C) on dark charcoal background (#1A1613), simple geometric shapes, approachable design, modern flat style, generic pet placeholder --ar 1:1 --style raw --v 6
```

---

## 4. Claude SVG Alternatives

For assets in the matrix marked "Claude SVG ⭐", here's how to generate them via Claude (using the visualizer / artifact tool when chatting, or via Claude Code).

### Why SVG for these?
- **Programmatic.** Can be re-tinted in code (`Image(...).renderingMode(.template).foregroundColor(...)`)
- **Resolution independent.** No `@1x/@2x/@3x` math.
- **Tiny file sizes.** Often <2KB.
- **Iterable.** Edit a node directly in source instead of re-prompting.
- **Dark-mode automatic.** If you use `currentColor` or CSS vars, the icon adapts to its container.

### Master prompt template

When you ask Claude (or Claude Code asks Claude) to generate an SVG asset, this is the shape that produces consistent, brand-aligned results:

```
Generate an SVG for PawConnect's [ASSET NAME] icon.

Specifications:
- viewBox: 0 0 [W] [H]
- Output: single <svg> element, no XML declaration, no comments inside
- Color strategy: use currentColor for the primary stroke/fill so it inherits parent color
- Stroke width: 2 (consistent with PawConnect icon family)
- Style: geometric, friendly, clean lines, minimal detail
- Composition: centered, padded ~10% from edges
- No background fill (transparent)
- Render mode target: SwiftUI .renderingMode(.template)

Reference brand colors (only if asset is multi-color, otherwise omit):
- Primary: #EA580C (sunset orange)
- Sage: #059669 (success/trust)
- Amber: #F59E0B (warnings/stars)
- Charcoal: #1F1B17 (default ink)

Subject: [DESCRIBE THE SUBJECT IN ONE SENTENCE]
```

### Per-asset Claude SVG prompts

#### Service Icons — ASSET-030 to ASSET-034 (32×32pt, `viewBox=0 0 32 32`)

**ASSET-030 Dog Walking:**
```
Generate an SVG icon for "Dog Walking". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2, round line caps and joins. Geometric, friendly. Show: a leash arcing from upper-left down to a dog silhouette in lower-right, simple shape, suggesting motion. No background. Render-mode: template. Output: just the <svg> element.
```

**ASSET-031 Drop-in Visit:**
```
Generate an SVG icon for "Drop-in Visit". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2, round line caps. Show: a doorway shape with a small paw print centered inside the threshold. Suggests "quick visit". No background. Render-mode: template. Output: just the <svg> element.
```

**ASSET-032 House Sitting:**
```
Generate an SVG icon for "House Sitting". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2. Show: a house silhouette with a pet head visible in the window. Crescent moon in upper corner suggests overnight care. No background. Render-mode: template. Output: just the <svg> element.
```

**ASSET-033 Boarding:**
```
Generate an SVG icon for "Pet Boarding". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2. Show: a cozy house with a pet bed silhouette inside, paw print on roof. Suggests overnight stay at sitter's home. No background. Render-mode: template. Output: just the <svg> element.
```

**ASSET-034 Daycare:**
```
Generate an SVG icon for "Doggy Daycare". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2. Show: a sun with rays in the upper area and a playful dog silhouette below. Energetic, daytime feel. No background. Render-mode: template. Output: just the <svg> element.
```

#### Map Pins — ASSET-070, ASSET-071

**ASSET-070 Map Pin (Price):**
```
Generate an SVG for a map price pin. viewBox 0 0 40 50. Two colors:
- Pin shape: fill #EA580C (sunset orange)
- Inner circle for text: fill #FFFFFF, sized to fit a 3-character price like "$75"

Shape: classic teardrop pin pointing down — circular head (radius ~16, center 20,18) tapering to a point at (20, 50). White inner circle (radius ~12) inside the head, ready for SwiftUI Text overlay. Subtle drop shadow not in SVG (apply as SwiftUI modifier).
Output: just the <svg> element. No comments.
```

**ASSET-071 Map Pin Selected:**
```
Same as ASSET-070 but viewBox 0 0 50 62 (25% larger). Add a subtle outer glow ring (stroke #EA580C, opacity 0.3, width 2) at radius ~22 around the pin head to indicate selection. Output: just the <svg> element.
```

#### Avatar Placeholders — ASSET-060, ASSET-061, ASSET-062, ASSET-065 (100×100pt, `viewBox=0 0 100 100`)

**ASSET-060 Dog Avatar:**
```
Generate an SVG of a dog head silhouette in profile, centered in a 100×100 circle. Two-tone: background fill #FB923C (peach), foreground silhouette fill #EA580C (sunset orange). Style: warm, friendly, simple geometric shapes, no detail beyond head outline + ear + eye dot. Output: just the <svg> element with viewBox 0 0 100 100.
```

**ASSET-061 Cat Avatar:**
```
Generate an SVG of a cat head silhouette facing forward, centered in a 100×100 circle. Two-tone: background fill #FCD34D (light amber), foreground silhouette fill #EA580C (sunset orange). Show: triangular ears, simple round face, two whisker hints. No detail. Output: just the <svg> element with viewBox 0 0 100 100.
```

**ASSET-062 Person Avatar:**
```
Generate an SVG of a friendly person silhouette (head + shoulders), centered in a 100×100 circle. Two-tone: background fill #FED7AA (light peach), foreground silhouette fill #EA580C (sunset orange). Geometric, warm, abstract — no facial features. Output: just the <svg> element with viewBox 0 0 100 100.
```

**ASSET-065 Other Pet Avatar:**
```
Generate an SVG of a generic paw print, centered in a 100×100 circle. Two-tone: background fill #6EE7B7 (light sage), foreground paw fill #059669 (sage). Standard 4-toe paw print, geometric. Output: just the <svg> element with viewBox 0 0 100 100.
```

#### Hero Placeholders — ASSET-063, ASSET-064 (390×200pt, `viewBox=0 0 390 200`)

**ASSET-063 Pet Hero Placeholder:**
```
Generate an SVG hero placeholder. viewBox 0 0 390 200. Background: linear gradient from #EA580C (top-left) to #DC2626 (bottom-right). Centered icon: large white paw print at 30% opacity, ~80px wide. Output: just the <svg> element.
```

**ASSET-064 Sitter Hero Placeholder:**
```
Generate an SVG hero placeholder. viewBox 0 0 390 200. Background: linear gradient from #EA580C (top-left) to #FB923C (bottom-right). Centered icon: large white person silhouette at 30% opacity, ~80px tall. Output: just the <svg> element.
```

### Status icons — also viable as Claude SVG

If you want a unified custom icon family rather than mixing custom + SF Symbols:

**ASSET-040 Success, ASSET-041 Error, ASSET-042 Warning** — easily generatable as SVG. But the SF Symbol recommendation in the canonical library is correct: `checkmark.circle.fill`, `exclamationmark.triangle.fill`, `exclamationmark.circle.fill`. **Don't waste effort here.** Ship SF Symbols.

---

## 5. Workflow Alignment

### Current state of confusion

- **`PawConnect-Asset-Library.md`** says: filename = `[Category]-[Description]@3x.png` (e.g., `Brand-AppIcon@3x.png`), Xcode auto-derives @2x/@1x
- **`scale-assets.sh`** (per your audit doc and memory) expects: filename = `[Name]@3x.png` (no category prefix), generates @2x/@1x via `sips`

These don't agree. Pick one.

### Recommendation: amend the library, keep the script

The script is working code in your project. The library is documentation. **Documentation should match working code, not the other way around.** Specifically:

**Filename convention:** `[Name]@3x.png`
- Examples: `LogoLockup@3x.png`, `WelcomeHero@3x.png`, `EmptyNoPets@3x.png`, `ServiceWalking@3x.png`
- Dark variants: `[Name]-dark@3x.png`
- The library's category structure stays — it's reflected in the *folder* (`Brand/LogoLockup@3x.png`), not the filename.

**Patch table for the canonical library:**

| Current filename in library | Replace with |
|---|---|
| `Brand-AppIcon@3x.png` | `AppIcon@3x.png` (in `Brand/`) |
| `Brand-LogoHorizontal@3x.png` | `LogoLockup@3x.png` (in `Brand/`) |
| `Brand-LogoIcon@3x.png` | `LogoIcon@3x.png` (in `Brand/`) |
| `Onboarding-WelcomeHero@3x.png` | `WelcomeHero@3x.png` (in `Onboarding/`) |
| `Onboarding-WelcomeHeroCat@3x.png` | `WelcomeHeroCat@3x.png` (in `Onboarding/`) |
| `Onboarding-Confetti@3x.png` | `Confetti@3x.png` (in `Onboarding/`) |
| `Onboarding-SuccessCheck@3x.png` | `SuccessCheckmark@3x.png` (in `Onboarding/`) |
| `Empty-NoPets@3x.png` | `EmptyNoPets@3x.png` (in `EmptyStates/`) |
| `Empty-NoSitters@3x.png` | `EmptyNoSitters@3x.png` (in `EmptyStates/`) |
| `Empty-NoMessages@3x.png` | `EmptyNoMessages@3x.png` (in `EmptyStates/`) |
| `Empty-NoBookings@3x.png` | `EmptyNoBookings@3x.png` (in `EmptyStates/`) |
| `Empty-NoReviews@3x.png` | `EmptyNoReviews@3x.png` (in `EmptyStates/`) |
| `Empty-NoRecommendations@3x.png` | `EmptyNoRecommendations@3x.png` (in `EmptyStates/`) |
| `Service-DogWalking@3x.png` | `ServiceWalking@3x.png` (in `Services/`) |
| `Service-DropIn@3x.png` | `ServiceDropIn@3x.png` (in `Services/`) |
| `Service-HouseSitting@3x.png` | `ServiceSitting@3x.png` (in `Services/`) |
| `Service-Boarding@3x.png` | `ServiceBoarding@3x.png` (in `Services/`) |
| `Service-Daycare@3x.png` | `ServiceDaycare@3x.png` (in `Services/`) |
| `Status-Success@3x.png` | `FeedbackSuccess@3x.png` (in `Feedback/`) |
| `Status-Error@3x.png` | `FeedbackError@3x.png` (in `Feedback/`) |
| `Status-Warning@3x.png` | `FeedbackWarning@3x.png` (in `Feedback/`) |
| `Status-Verified@3x.png` | `BadgeVerified@3x.png` (in `TrustBadges/`) |
| `Status-MailSent@3x.png` | `MailIcon@3x.png` (in `Status/`) |
| `Status-BackgroundCheck@3x.png` | `BadgeBackgroundCheck@3x.png` (in `TrustBadges/`) |
| `Activity-Medication@3x.png` | `ActivityMedication@3x.png` (in `LiveActivities/`) |
| `Activity-Feeding@3x.png` | `ActivityFeeding@3x.png` (in `LiveActivities/`) |
| `Activity-Walk@3x.png` | `ActivityWalk@3x.png` (in `LiveActivities/`) |
| `Activity-Bathroom@3x.png` | `ActivityBathroom@3x.png` (in `LiveActivities/`) |
| `Activity-Play@3x.png` | `ActivityPlay@3x.png` (in `LiveActivities/`) |
| `Placeholder-DogAvatar@3x.png` | `DogAvatar@3x.png` (in `Placeholders/`) |
| `Placeholder-CatAvatar@3x.png` | `CatAvatar@3x.png` (in `Placeholders/`) |
| `Placeholder-OtherPetAvatar@3x.png` | `OtherPetAvatar@3x.png` (in `Placeholders/`) |
| `Placeholder-PetHero@3x.png` | `PetHeroPlaceholder@3x.png` (in `Placeholders/`) |
| `Placeholder-SitterHero@3x.png` | `SitterHeroPlaceholder@3x.png` (in `Placeholders/`) |
| `Placeholder-PersonAvatar@3x.png` | `PersonAvatar@3x.png` (in `Placeholders/`) |
| `Map-PricePin@3x.png` | `PricePin@3x.png` (in `Location/`) |
| `Map-PricePinSelected@3x.png` | `PricePinSelected@3x.png` (in `Location/`) |

This matches the `AssetImage.swift` enum names referenced in your master checklist.

### "Authored at @3x" is technically wrong

The library says "All assets are authored at @3x resolution. Xcode derives @2x and @1x automatically from the asset catalog." That's not accurate — Xcode does *not* auto-derive scales from a single PNG. You need three files. Your `scale-assets.sh` is what generates them. Update the library text to:

> "All assets are authored at @3x dimensions. The `scale-assets.sh` script derives @2x and @1x via `sips` before import. Drag all three files into the Xcode imageset slots."

---

## 6. Claude Code Integration Recipes

How to actually wire this library into a daily flow when using Claude Code.

### Recipe A — "Generate a missing service icon"

When you're building AUTH-11 and realize you don't have `ServiceWalking` yet:

```
Read PawConnect-Asset-Library.md and PawConnect-Asset-Library-Audit.md.
ASSET-030 (Dog Walking) is in the Claude SVG matrix.
Use the Claude SVG prompt template from § 4 of the audit doc.
Produce the SVG, then save it to PawConnect/Assets.xcassets/Services/ServiceWalking.imageset/ServiceWalking.svg.
Update Contents.json so it's recognized as a single-vector image set.
Confirm AssetImage.swift has a `serviceWalking` case.
```

Claude Code reads both docs, picks up the SVG template, generates the SVG via the visualizer pattern, writes it to the right place, and updates the imageset metadata. One prompt, full result.

### Recipe B — "Generate dark variants in batch"

When you've finished light mode and want to backfill dark:

```
Read § 3 of PawConnect-Asset-Library-Audit.md.
For each asset in the dark prompts list (ASSET-001, 002, 003, 010, 013, 020-025, 060-065),
list the dark prompt I need to paste into Midjourney, in batch order.
Output format: a numbered list, each item showing the asset ID, target filename, and the prompt block.
```

Claude Code returns a paste-ready batch you can run through Midjourney sequentially, no thinking required.

### Recipe C — "What's blocking AUTH-09?"

When you sit down for a sprint and want to know what assets you're missing:

```
Read PawConnect-Master-Checklist.md, PawConnect-Asset-Library.md, and the audit supplement.
For Phase 1, AUTH-09 (Onboarding Success), list every required asset, its current status (have / missing), and which tool to generate it with.
```

Claude Code cross-references the screen → asset → tool chain and tells you exactly what to do next.

### Recipe D — "Convert an existing Midjourney asset to Claude SVG"

When you decide a service icon you generated in Midjourney should actually be SVG:

```
Read § 4 of PawConnect-Asset-Library-Audit.md. ASSET-030 (Dog Walking) was generated in Midjourney
but should be Claude SVG per the tool matrix.
Generate the SVG using the template prompt for ASSET-030.
Save to PawConnect/Assets.xcassets/Services/ServiceWalking.imageset/ as a single-vector image.
Delete the old @1x/@2x/@3x PNG files from that imageset.
Update Contents.json to single-vector mode.
```

### Workflow expectation

**Each time you start a phase per the master checklist:** ask Claude Code to enumerate the phase's asset prerequisites, classify each by tool (Midjourney/Claude/SF Symbol), and produce the prompts/files needed. Don't build screens before assets are landed.

---

## 7. Epic 5–10 Stub

The canonical library is correctly scoped to Epics 1–4. As you reach later phases, you'll need additions. Build them just-in-time per the master checklist. Anticipated additions:

| Epic | Phase | Assets to add |
|---|---|---|
| 5 — Booking | Master Phase 4 | `EmptyNoBookings` (already in library — check!), `CalendarBooking`, booking flow status icons (mostly SF Symbols) |
| 6 — Live Activities | Master Phase 5 | `ActivityMedication/Feeding/Walk/Bathroom/Play` (already in library — recommend SF Symbols) |
| 7 — Messaging | Master Phase 6 | `EmptyNoMessages` (already in library), `NewMessage` icon (Claude SVG candidate) |
| 8 — Reviews | Master Phase 6 | `ReviewStarsEmpty`, `ReviewStarsFilled` (Claude SVG — paired stars) |
| 9 — Payments (deferred) | Post-launch | Payment method icons (use Stripe-provided assets), `PayoutSuccess` |
| 10 — Settings | Master Phase 7 | None — uses SF Symbols + system list rendering |

When you start Phase 4, open this section and confirm what's missing. Add to the canonical library, don't create yet another file.

---

## 8. Quality Criteria

How to know an asset is "good enough" to ship.

### For Midjourney outputs (illustrations, hero art)
- ✅ Brand colors accurate to within ~5% perceptual difference (eyeball it against `brand-design.html`)
- ✅ Composition clean — no extra hands, weird limbs, AI artifacts
- ✅ Subject clearly readable at the target render size (zoom out in Preview to test)
- ✅ Background removable cleanly (subject has clear edge contrast)
- ✅ Light + dark variants feel like the *same* illustration, not two different ones
- ❌ Any text in the image — Midjourney still can't do text reliably; cut it

### For Claude SVG outputs
- ✅ Renders identically in light and dark when using `currentColor` and template render mode
- ✅ Stroke weights consistent with the rest of the icon family (2px at 32×32 viewBox)
- ✅ No raster effects (no `<image>` tags, no embedded base64)
- ✅ ViewBox proportional to target render size
- ✅ File size under 5KB (most should be under 2KB)

### For SF Symbol choices
- ✅ Symbol exists in iOS 26 (some are version-gated — verify with SF Symbols app)
- ✅ Tint color from brand palette
- ✅ Symbol weight matches surrounding UI (medium for body, bold for emphasis)

---

## 9. Patch List for the Canonical Library

Apply these surgical edits to `PawConnect-Asset-Library.md`. Use Claude Code with this list as input.

1. **§ "Filename Convention":** Replace the `[Category]-[Description]@[Resolution].png` pattern with `[Name]@[Resolution].png`. Update all 37 example filenames per § 5 patch table above.

2. **§ "Filename Convention" → final paragraph:** Replace "Xcode derives `@2x` and `@1x` automatically from the asset catalog" with: "Run `scale-assets.sh` to derive `@2x` and `@1x` from each `@3x` source via `sips`. Then drag all three files into the Xcode imageset."

3. **For every Midjourney prompt:** Remove the phrase `transparent background` (Midjourney can't reliably produce it). Where transparent output is required, add a Note: "Remove background in post (Preview.app: Markup → Background Remove, or remove.bg)."

4. **For every asset where "Dark Mode Variant: Yes":** Add a `**Midjourney Prompt (Dark)**:` block immediately after the light prompt, using the prompts in § 3 of this supplement.

5. **For each asset listed in § 2 Tool Matrix as "Claude SVG ⭐":** Add a `**Claude SVG Alternative**:` block after the Midjourney prompt, with the SVG generation prompt from § 4. Note that Claude SVG is the *recommended* path for those assets.

6. **Add a new top-level section** between "Brand Color Reference" and "Filename Convention" titled **"Tool Selection"** containing the matrix from § 2 of this supplement.

7. **Add a `Render As` column** to every asset table. Values: `Original`, `Template`, or `App Icon`. Service icons, status icons, live activity icons, trust badges, and map pins are all `Template`. Hero illustrations and avatars are `Original`. The app icon is `App Icon`.

8. **Update Summary Statistics:** Recompute totals after applying tool matrix. Expected: Midjourney generations drop from ~148 to ~50–70.

---

*End of supplement. Save alongside `PawConnect-Asset-Library.md` in the `docs/` folder.*
