# PawConnect Asset Library
## Complete Visual Asset Catalog for Epics 1-4
### Version 1.1 | April 2026

---

## Document Purpose

This document catalogs every visual asset required for PawConnect Epics 1-4 (AUTH-01 through SRCH-03). Each asset includes exact specifications, generation prompts (Midjourney for raster art, Claude SVG for vector icons) with brand hex codes, Xcode asset catalog paths, and screen usage references.

**Scope**: 25 screens across 4 epics (Authentication & Onboarding, Pet Profiles, User Profiles, Search & Discovery).

**Out of Scope**: Epics 5-10 (Booking, Live Activities in-app views, Messaging, Reviews, Payments, Settings). Video call icons, paw print background patterns, and payment icons are excluded from MVP.

**Companion document**: `PawConnect-Asset-Library-Audit-and-Claude-Integration.md` — full rationale for tool selection, Claude Code integration recipes, and quality criteria.

---

## Brand Color Reference

All generation prompts reference these exact hex codes for consistency:

| Color Name | Hex Code | Role |
|------------|----------|------|
| Sunset Orange | `#EA580C` | Primary brand color |
| Terracotta | `#DC2626` | Pressed states, destructive |
| Peach | `#FB923C` | Secondary highlights |
| Amber | `#F59E0B` | Warnings, star ratings |
| Sage Green | `#059669` | Success, trust indicators |
| Cream | `#FFFBF5` | Background primary (light) |
| Sand | `#FAE5D3` | Borders, subtle fills (light) |
| Charcoal | `#1A1613` | Background primary (dark) |
| Espresso | `#27221D` | Borders, subtle fills (dark) |
| Ink | `#1F1B17` | Text primary |

**Dark mode pattern**: replace `#FFFBF5` cream with `#1A1613` charcoal, replace `#FAE5D3` sand with `#27221D` espresso. Accent colors are unchanged across modes.

---

## Tool Selection

For each asset class, the cheapest path to a good result. Default to the fastest tool that produces acceptable quality.

| Asset Class | Best Tool | Why |
|---|---|---|
| **Hero illustrations** (Welcome, EmptyNoPets, EmptyNoSitters) | **Midjourney** | Warm, character-driven illustration with subtle texture. SVG can't easily replicate that warmth. |
| **App Icon master** | **Midjourney**, finish in Figma/Sketch | iOS HIG strict; Midjourney gets you 80%, finish manually |
| **Logo lockup** | **Midjourney** master, then **Claude SVG** for clean wordmark version | Icon is illustration; wordmark benefits from clean vector edges |
| **Service icons** (Walking, Sitting, Boarding, Drop-in, Daycare) | **Claude SVG** ⭐ | Geometric, single-color, template-rendered. Faster, more consistent, infinitely re-tintable. |
| **Status/feedback icons** (Success, Error, Warning) | **SF Symbols** ⭐ | Already system-tinted and dark-aware. Custom art adds zero value. |
| **Live Activity icons** (Medication, Feeding, Walk, Bathroom, Play) | **SF Symbols** ⭐ | Lock Screen rendering optimized; auto-adapts to wallpaper. Custom art is risky. |
| **Trust badges** (Verified, Background Check) | **SF Symbols** ⭐ or **Claude SVG** | `checkmark.seal.fill` is iconic and instantly recognizable. Custom art only if branding demands. |
| **Map pins** (Price, Selected) | **Claude SVG** ⭐ | Programmatic shape with dynamic price text overlay. Raster pin makes the price text rendering harder. |
| **Avatar placeholders** (Dog, Cat, Person, Other Pet) | **Claude SVG** | Simple silhouettes in a circular frame. Quick to iterate. |
| **Pet/Sitter hero placeholders** (PET-02, PROF-02 fallbacks) | **Claude SVG** | Gradient + centered icon — SVG is dramatically simpler. |
| **Confetti / Celebration** | **Code animation** (Lottie or SwiftUI particle system) | Don't generate this as a static image at all. |
| **Mail icon (AUTH-04b)** | **Midjourney** for the "paw seal" charm; otherwise **SF Symbol** `envelope.fill` | Custom version has personality; SF Symbol ships today. |

⭐ = Recommendation likely shifts you away from a pure-Midjourney default.

**Net effect**: Of 37 assets, ~12 should be Claude SVG, ~10 should be SF Symbols, and only ~12-15 truly need Midjourney. Midjourney generation budget shrinks by ~60% versus a "generate everything" approach.

---

## Filename Convention

```
[Name]@[Resolution].png
```

Examples:
- `AppIcon@3x.png` (in `Brand/`)
- `EmptyNoPets@3x.png` (in `EmptyStates/`)
- `ServiceWalking@3x.png` (in `Services/`)
- Dark variant: `[Name]-dark@3x.png` (e.g., `WelcomeHero-dark@3x.png`)

The category structure lives in the **folder**, not the filename. This matches `AssetImage.swift` enum names.

All raster assets are authored at `@3x` dimensions. Run `scripts/scale-assets.sh` to derive `@2x` and `@1x` from each `@3x` source via `sips`. Then drag all three files into the Xcode imageset slots.

SVG assets do not require scaling — they live as a single `.svg` file inside the imageset configured for single-vector rendering.

---

## 1. Brand Assets (ASSET-001 to ASSET-003)

### ASSET-001: App Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-001 |
| **Filename** | `AppIcon@3x.png` |
| **Folder Path** | `Assets/Brand/` |
| **Render As** | App Icon |
| **Dimensions** | 1024x1024px (universal; Xcode generates all required sizes) |
| **Used In** | App Store, SpringBoard, Spotlight, Settings, AUTH-01 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/AppIcon.appiconset/` |
| **Dark Mode Variant** | Yes — provide a separate dark variant with lighter gradient |
| **SF Symbol Alternative** | None — custom asset required |

**Midjourney Prompt (Light)**:
```
A modern app icon featuring a stylized paw print in warm sunset orange (#EA580C), minimalist geometric design, soft rounded corners, gradient from sunset orange to peachy terracotta (#DC2626), friendly and approachable, iOS app icon style, clean professional design, white negative space, 1024x1024px --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
A modern app icon featuring a stylized paw print in warm sunset orange (#EA580C), minimalist geometric design, soft rounded corners, gradient from sunset orange to peachy terracotta (#DC2626), friendly and approachable, iOS app icon style, clean professional design on dark charcoal background (#1A1613), 1024x1024px --ar 1:1 --style raw --v 6
```

**Notes**: Must conform to Apple Human Interface Guidelines for app icons. No transparency. No rounded corners in source file (iOS applies mask automatically). Provide both light and dark variants for iOS 26 tinted icon support.

---

### ASSET-002: Logo Lockup (Horizontal)

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-002 |
| **Filename** | `LogoLockup@3x.png` |
| **Folder Path** | `Assets/Brand/` |
| **Render As** | Original |
| **Dimensions** | 900x300px @3x (300x100pt) |
| **Used In** | AUTH-01 (Welcome Screen logo section), Marketing materials |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Brand/LogoLockup.imageset/` |
| **Dark Mode Variant** | Yes — cream wordmark on charcoal background |
| **SF Symbol Alternative** | None — custom asset required |

**Midjourney Prompt (Light)**:
```
PawConnect logo design, warm sunset orange (#EA580C) paw print icon paired with clean sans-serif wordmark, friendly yet premium feel, horizontal lockup, earthy color palette with terracotta (#DC2626) and peach (#FB923C) accents on cream (#FFFBF5), modern tech startup aesthetic, neighborhood-friendly vibe --ar 3:1 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
PawConnect logo design, warm sunset orange (#EA580C) paw print icon paired with cream sans-serif wordmark on dark charcoal background (#1A1613), friendly yet premium feel, horizontal lockup, peach (#FB923C) accents, modern tech startup aesthetic --ar 3:1 --style raw --v 6
```

**Background note**: Midjourney cannot reliably produce transparent PNGs. After generation, remove the background in Preview.app (Markup → Background Remove) or via remove.bg before importing.

**Notes**: The paw icon portion should be reusable independently as the 48x48pt logo icon referenced in AUTH-01. Wordmark text must be legible at 100pt width.

---

### ASSET-003: Logo Icon Only (Paw Mark)

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-003 |
| **Filename** | `LogoIcon@3x.png` |
| **Folder Path** | `Assets/Brand/` |
| **Render As** | Original |
| **Dimensions** | 144x144px @3x (48x48pt) |
| **Used In** | AUTH-01 (logo section — 48x48pt icon with 12pt radius), Navigation headers |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Brand/LogoIcon.imageset/` |
| **Dark Mode Variant** | Yes — lighter variant for dark backgrounds |
| **SF Symbol Alternative** | `pawprint.fill` (temporary fallback only) |

**Midjourney Prompt (Light)**:
```
A single stylized paw print icon, warm sunset orange (#EA580C) gradient to peach (#FB923C), minimalist geometric design, centered on cream background (#FFFBF5), modern flat style, clean edges readable at small sizes, professional app icon element --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
A single stylized paw print icon, warm sunset orange (#EA580C) gradient to peach (#FB923C), minimalist geometric design centered on dark charcoal background (#1A1613), modern flat style, clean edges readable at small sizes --ar 1:1 --style raw --v 6
```

**Background note**: Remove background in post (Preview.app or remove.bg).

**Notes**: Must be legible at 48x48pt (the AUTH-01 spec calls for a 48x48pt square with 12pt radius, filled with primarySunset, containing a white paw print icon). Consider rendering the paw print in white on a sunset orange filled square as specified.

---

## 2. Onboarding & Welcome Assets (ASSET-010 to ASSET-013)

### ASSET-010: Welcome Screen Hero Illustration

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-010 |
| **Filename** | `WelcomeHero@3x.png` |
| **Folder Path** | `Assets/Onboarding/` |
| **Render As** | Original |
| **Dimensions** | 1170x600px @3x (390x200pt, full width at 200pt height per AUTH-01 spec) |
| **Used In** | AUTH-01 (Illustration Area — middle third of Welcome Screen) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Onboarding/WelcomeHero.imageset/` |
| **Dark Mode Variant** | Yes — darker background tones, same characters |
| **SF Symbol Alternative** | None — custom illustration required |

**Midjourney Prompt (Light)**:
```
Heartwarming illustration of a happy pet owner, their dog, and a friendly pet sitter in a cozy neighborhood setting, warm sunset orange and terracotta color palette (#EA580C, #DC2626), soft peachy accents (#FB923C), cream background (#FFFBF5), modern flat illustration style, welcoming atmosphere, diverse characters, simple background, community feeling, editorial illustration quality --ar 16:9 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Heartwarming illustration of a happy pet owner, their dog, and a friendly pet sitter in a cozy nighttime neighborhood setting, warm sunset orange and terracotta color palette (#EA580C, #DC2626), soft peachy accents (#FB923C), modern flat illustration style, dark charcoal and espresso tones (#1A1613, #27221D) for sky and ground, welcoming atmosphere, diverse characters, community feeling --ar 16:9 --style raw --v 6
```

**Notes**: AUTH-01 specifies a fallback of "gradient background using primarySunset at 10% opacity" if no illustration. This asset eliminates that fallback. Ensure main focal content is centered vertically so it reads well at the 200pt height crop.

---

### ASSET-011: Onboarding Success Confetti

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-011 |
| **Filename** | `Confetti@3x.png` |
| **Folder Path** | `Assets/Onboarding/` |
| **Render As** | Original |
| **Dimensions** | 240x240px @3x (80x80pt — matches AUTH-09 icon size) |
| **Used In** | AUTH-09 (Onboarding Success — celebration section, 80pt icon) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Onboarding/Confetti.imageset/` |
| **Dark Mode Variant** | No — confetti reads well on both backgrounds |
| **SF Symbol Alternative** | `party.popper` (iOS 17+, acceptable fallback) |

**Recommendation**: Per the Tool Selection matrix, prefer a **code-driven confetti animation** (SwiftUI particle system or a small Lottie file) over a static image. AUTH-09 specifies "subtle bounce or confetti particle effect on appear" — the animation is the asset. Ship `party.popper` SF Symbol as the static stand-in if needed.

**Midjourney Prompt (Light)** *(only if static asset is required)*:
```
Celebratory confetti burst with paw prints, bones, and hearts, warm color palette of sunset orange (#EA580C), terracotta (#DC2626), peach (#FB923C), and sage green (#059669), playful energetic style on cream background (#FFFBF5), festive but not overwhelming, centered composition readable at 80pt --ar 1:1 --style raw --v 6
```

**Background note**: Remove background in post if compositing over varied backdrops.

---

### ASSET-012: Success Checkmark with Paw

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-012 |
| **Filename** | `SuccessCheckmark@3x.png` |
| **Folder Path** | `Assets/Onboarding/` |
| **Render As** | Original |
| **Dimensions** | 240x240px @3x (80x80pt) |
| **Used In** | AUTH-09 (alternative celebration icon), General success states |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Onboarding/SuccessCheckmark.imageset/` |
| **Dark Mode Variant** | No — sage green reads well on both |
| **SF Symbol Alternative** | `checkmark.circle.fill` tinted `secondarySage` |

**Midjourney Prompt**:
```
Large checkmark integrated with a paw print design, vibrant sage green (#059669) with sunset orange (#EA580C) accents on cream background (#FFFBF5), modern friendly style, celebratory but professional, clean simple icon, centered composition --ar 1:1 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: Can substitute with SF Symbol `checkmark.circle.fill` if custom asset is not ready. This is a nice-to-have enhancement over the SF Symbol.

---

### ASSET-013: Welcome Screen Hero Alternative (Cat)

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-013 |
| **Filename** | `WelcomeHeroCat@3x.png` |
| **Folder Path** | `Assets/Onboarding/` |
| **Render As** | Original |
| **Dimensions** | 1170x600px @3x (390x200pt) |
| **Used In** | AUTH-01 (optional A/B variant for cat owners) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Onboarding/WelcomeHeroCat.imageset/` |
| **Dark Mode Variant** | Yes |
| **SF Symbol Alternative** | None |

**Midjourney Prompt (Light)**:
```
Charming illustration of a smiling pet owner with their cat meeting a professional pet sitter, warm autumn color palette with sunset orange (#EA580C) and sage green accents (#059669), cream background (#FFFBF5), modern flat design, cozy home environment, friendly and trustworthy vibe, diverse representation --ar 16:9 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Charming illustration of a smiling pet owner with their cat meeting a professional pet sitter, warm autumn color palette with sunset orange (#EA580C) and sage green accents (#059669), dark charcoal and espresso tones (#1A1613, #27221D) for cozy evening home environment, modern flat design, friendly and trustworthy vibe --ar 16:9 --style raw --v 6
```

**Notes**: This is a lower-priority variant. Ship with ASSET-010 first and add this for future personalization.

---

## 3. Empty State Assets (ASSET-020 to ASSET-025)

### ASSET-020: No Pets Empty State

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-020 |
| **Filename** | `EmptyNoPets@3x.png` |
| **Folder Path** | `Assets/EmptyStates/` |
| **Render As** | Original |
| **Dimensions** | 600x600px @3x (200x200pt) |
| **Used In** | PET-01 (My Pets List — empty state: "Sad empty pet bowl" illustration) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/EmptyStates/EmptyNoPets.imageset/` |
| **Dark Mode Variant** | Yes — adjust cream/sand tones for dark background |
| **SF Symbol Alternative** | None — custom illustration recommended for emotional impact |

**Midjourney Prompt (Light)**:
```
Cute illustration of an empty pet food bowl with a small paw print shadow, minimalist design, warm beige and cream tones (#FFFBF5, #FAE5D3), subtle sunset orange (#EA580C) accent, friendly and inviting, simple line art style, centered composition --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Cute illustration of an empty pet food bowl with a small paw print shadow, minimalist design, dark charcoal and espresso tones (#1A1613, #27221D), subtle sunset orange (#EA580C) accent, friendly and inviting, simple line art style, centered composition --ar 1:1 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: PET-01 empty state shows this illustration above "No pets yet" title and "Add your furry family members to get started" subtitle. Keep illustration simple and encouraging, not sad.

---

### ASSET-021: No Sitters Found Empty State

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-021 |
| **Filename** | `EmptyNoSitters@3x.png` |
| **Folder Path** | `Assets/EmptyStates/` |
| **Render As** | Original |
| **Dimensions** | 600x450px @3x (200x150pt) |
| **Used In** | SRCH-02 (Search Results List — empty state: "Magnifying glass with sad face") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/EmptyStates/EmptyNoSitters.imageset/` |
| **Dark Mode Variant** | Yes |
| **SF Symbol Alternative** | None — custom illustration for better UX |

**Midjourney Prompt (Light)**:
```
Friendly illustration of a magnifying glass with a gentle question mark, warm earthy tones with sunset orange (#EA580C) and clay neutrals (#FAE5D3), cream background (#FFFBF5), modern flat design, encouraging and helpful mood, simple clean composition --ar 4:3 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Friendly illustration of a magnifying glass with a gentle question mark, sunset orange (#EA580C) and clay accents on dark charcoal background (#1A1613, #27221D), modern flat design, encouraging and helpful mood, simple clean composition --ar 4:3 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: SRCH-02 empty state shows "No sitters found" title with "Try adjusting your filters or search in a different area" subtitle and "Adjust Filters" button below.

---

### ASSET-022: No Messages Empty State

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-022 |
| **Filename** | `EmptyNoMessages@3x.png` |
| **Folder Path** | `Assets/EmptyStates/` |
| **Render As** | Original |
| **Dimensions** | 600x450px @3x (200x150pt) |
| **Used In** | PROF-01 (Messages row leads to message list which needs empty state) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/EmptyStates/EmptyNoMessages.imageset/` |
| **Dark Mode Variant** | Yes |
| **SF Symbol Alternative** | `bubble.left.and.bubble.right` (temporary fallback) |

**Midjourney Prompt (Light)**:
```
Welcoming illustration of an empty chat bubble with a small heart inside, warm peachy (#FB923C) and cream (#FFFBF5) color palette, friendly approachable style, modern flat design, encouraging users to start conversations, centered composition --ar 4:3 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Welcoming illustration of an empty chat bubble with a small heart inside, peachy (#FB923C) and sunset orange (#EA580C) accents on dark charcoal background (#1A1613, #27221D), friendly approachable style, modern flat design, encouraging users to start conversations, centered composition --ar 4:3 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: While MSG-01 (Messages list) is formally in Epic 7, the navigation to it exists in PROF-01 (Epic 3). Prepare this empty state now so the transition is not broken.

---

### ASSET-023: No Bookings Empty State

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-023 |
| **Filename** | `EmptyNoBookings@3x.png` |
| **Folder Path** | `Assets/EmptyStates/` |
| **Render As** | Original |
| **Dimensions** | 600x450px @3x (200x150pt) |
| **Used In** | PROF-01 (My Bookings row leads to booking list which needs empty state) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/EmptyStates/EmptyNoBookings.imageset/` |
| **Dark Mode Variant** | Yes |
| **SF Symbol Alternative** | `calendar.badge.plus` (temporary fallback) |

**Midjourney Prompt (Light)**:
```
Optimistic illustration of a calendar with a paw print marker, warm sunset orange and amber tones (#EA580C, #F59E0B), cream background (#FFFBF5), modern flat design, inviting atmosphere, clean simple composition suggesting future bookings --ar 4:3 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Optimistic illustration of a calendar with a paw print marker, warm sunset orange and amber tones (#EA580C, #F59E0B) on dark charcoal background (#1A1613, #27221D), modern flat design, inviting atmosphere suggesting future bookings, clean simple composition --ar 4:3 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: Similar to No Messages, the navigation path exists in PROF-01. Prepare for continuity.

---

### ASSET-024: No Reviews Empty State

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-024 |
| **Filename** | `EmptyNoReviews@3x.png` |
| **Folder Path** | `Assets/EmptyStates/` |
| **Render As** | Original |
| **Dimensions** | 600x450px @3x (200x150pt) |
| **Used In** | PROF-02 (Sitter Profile — Reviews section shows "No reviews yet") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/EmptyStates/EmptyNoReviews.imageset/` |
| **Dark Mode Variant** | Yes |
| **SF Symbol Alternative** | `star.bubble` (temporary fallback) |

**Midjourney Prompt (Light)**:
```
Gentle illustration of empty star outlines with a small paw print, warm amber (#F59E0B) and cream (#FFFBF5) tones, sand accents (#FAE5D3), modern minimalist design, encouraging and positive mood, clean centered composition --ar 4:3 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Gentle illustration of empty star outlines with a small paw print, amber (#F59E0B) accents on dark charcoal background (#1A1613, #27221D), modern minimalist design, encouraging and positive mood, clean centered composition --ar 4:3 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: PROF-02 Reviews section states "No reviews yet" in bodyRegular, textTertiary when a sitter has no reviews. This illustration adds visual warmth.

---

### ASSET-025: No Search Recommendations

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-025 |
| **Filename** | `EmptyNoRecommendations@3x.png` |
| **Folder Path** | `Assets/EmptyStates/` |
| **Render As** | Original |
| **Dimensions** | 600x450px @3x (200x150pt) |
| **Used In** | SRCH-01 (Search Home — "Complete your profile to get personalized recommendations") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/EmptyStates/EmptyNoRecommendations.imageset/` |
| **Dark Mode Variant** | Yes |
| **SF Symbol Alternative** | `sparkle.magnifyingglass` (temporary fallback) |

**Midjourney Prompt (Light)**:
```
Friendly illustration of a compass or discover icon with paw print accents, warm sunset orange (#EA580C) and sage green (#059669), cream background (#FFFBF5), modern flat design, exploration and discovery theme, encouraging mood --ar 4:3 --style raw --v 6
```

**Midjourney Prompt (Dark)**:
```
Soft illustration of a magnifying glass with sparkles, sunset orange (#EA580C) and amber (#F59E0B) accents on dark charcoal background (#1A1613, #27221D), friendly modern flat design, inviting users to refine search, centered composition --ar 4:3 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: SRCH-01 specifies "Complete your profile to get personalized recommendations" when no recommendations are available.

---

## 4. Service Icons (ASSET-030 to ASSET-034)

These icons appear in AUTH-11 (Sitter Services selection), AUTH-13 (Rates), SRCH-01 (Service Type radio), SRCH-02 (Results), and PROF-02 (Sitter Profile Services section).

**Recommended path: Claude SVG ⭐**. These are geometric, single-color, template-rendered icons. Generate as SVG via Claude — they re-tint via SwiftUI's `.renderingMode(.template)` and adapt automatically to light/dark mode. Midjourney prompts are kept below as a fallback.

### ASSET-030: Dog Walking Service Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-030 |
| **Filename** | `ServiceWalking@3x.png` (raster) or `ServiceWalking.svg` (preferred) |
| **Folder Path** | `Assets/Services/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt — matches AUTH-11 row icon spec). SVG `viewBox=0 0 32 32`. |
| **Used In** | AUTH-11, AUTH-13, SRCH-01, SRCH-02, PROF-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Services/ServiceWalking.imageset/` |
| **Dark Mode Variant** | No — template rendering adapts automatically |
| **SF Symbol Alternative** | `figure.walk` (acceptable fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG icon for "Dog Walking". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2, round line caps and joins. Geometric, friendly. Show: a leash arcing from upper-left down to a dog silhouette in lower-right, simple shape, suggesting motion. No background. Render-mode: template. Output: just the <svg> element.
```

**Midjourney Prompt (fallback)**:
```
Simple icon of person walking a happy dog, sunset orange (#EA580C) silhouette style, clean modern lines, friendly energetic pose, minimalist design suitable for 32pt service card icon, high contrast, vector style --ar 1:1 --style raw --v 6
```

**Notes**: AUTH-11 spec lists emoji "walking person" + service name in 32pt icons. These custom icons replace emojis for a more polished look. Export as template image for tint color flexibility.

---

### ASSET-031: Drop-in Visit Service Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-031 |
| **Filename** | `ServiceDropIn.svg` (preferred) or `ServiceDropIn@3x.png` |
| **Folder Path** | `Assets/Services/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt). SVG `viewBox=0 0 32 32`. |
| **Used In** | AUTH-11, AUTH-13, SRCH-01, SRCH-02, PROF-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Services/ServiceDropIn.imageset/` |
| **Dark Mode Variant** | No — template rendering |
| **SF Symbol Alternative** | `hand.wave.fill` (acceptable fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG icon for "Drop-in Visit". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2, round line caps. Show: a doorway shape with a small paw print centered inside the threshold. Suggests "quick visit". No background. Render-mode: template. Output: just the <svg> element.
```

**Midjourney Prompt (fallback)**:
```
Door with friendly wave gesture and paw print, bright amber (#F59E0B) and sunset orange (#EA580C) tones, modern minimalist style, quick visit concept, approachable design, high contrast, vector style, suitable for small icon --ar 1:1 --style raw --v 6
```

---

### ASSET-032: House Sitting Service Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-032 |
| **Filename** | `ServiceSitting.svg` (preferred) or `ServiceSitting@3x.png` |
| **Folder Path** | `Assets/Services/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt). SVG `viewBox=0 0 32 32`. |
| **Used In** | AUTH-11, AUTH-13, SRCH-01, SRCH-02, PROF-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Services/ServiceSitting.imageset/` |
| **Dark Mode Variant** | No — template rendering |
| **SF Symbol Alternative** | `moon.stars.fill` (acceptable fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG icon for "House Sitting". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2. Show: a house silhouette with a pet head visible in the window. Crescent moon in upper corner suggests overnight care. No background. Render-mode: template. Output: just the <svg> element.
```

**Midjourney Prompt (fallback)**:
```
Cozy house icon with pet silhouette in window, warm terracotta (#DC2626) and peach (#FB923C) tones, modern friendly style, nighttime moon element, secure and comforting feeling, simple clean design, high contrast, vector style --ar 1:1 --style raw --v 6
```

---

### ASSET-033: Boarding Service Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-033 |
| **Filename** | `ServiceBoarding.svg` (preferred) or `ServiceBoarding@3x.png` |
| **Folder Path** | `Assets/Services/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt). SVG `viewBox=0 0 32 32`. |
| **Used In** | AUTH-11, AUTH-13, SRCH-01, SRCH-02, PROF-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Services/ServiceBoarding.imageset/` |
| **Dark Mode Variant** | No — template rendering |
| **SF Symbol Alternative** | `house.fill` (acceptable fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG icon for "Pet Boarding". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2. Show: a cozy house with a pet bed silhouette inside, paw print on roof. Suggests overnight stay at sitter's home. No background. Render-mode: template. Output: just the <svg> element.
```

**Midjourney Prompt (fallback)**:
```
Welcoming home with paw print and pet bed, warm sunset orange (#EA580C) and clay neutrals (#FAE5D3), modern flat illustration, cozy overnight care theme, friendly approachable style, high contrast, vector style, suitable for small icon --ar 1:1 --style raw --v 6
```

---

### ASSET-034: Doggy Daycare Service Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-034 |
| **Filename** | `ServiceDaycare.svg` (preferred) or `ServiceDaycare@3x.png` |
| **Folder Path** | `Assets/Services/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt). SVG `viewBox=0 0 32 32`. |
| **Used In** | AUTH-11, AUTH-13, SRCH-01, SRCH-02, PROF-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Services/ServiceDaycare.imageset/` |
| **Dark Mode Variant** | No — template rendering |
| **SF Symbol Alternative** | `sun.max.fill` (acceptable fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG icon for "Doggy Daycare". viewBox 0 0 32 32. Single color using currentColor. Stroke width 2. Show: a sun with rays in the upper area and a playful dog silhouette below. Energetic, daytime feel. No background. Render-mode: template. Output: just the <svg> element.
```

**Midjourney Prompt (fallback)**:
```
Playful dog in daylight with sun, vibrant amber (#F59E0B) and peachy tones (#FB923C), energetic friendly style, daytime care theme, modern flat design, high contrast, vector style, suitable for small icon --ar 1:1 --style raw --v 6
```

---

## 5. Status & Feedback Assets (ASSET-040 to ASSET-045)

**Recommended path: SF Symbols ⭐ for ASSET-040, 041, 042, 043, 045.** System-tinted, dark-aware, and instantly recognizable. Don't waste effort on custom art. Custom assets remain available as polish.

### ASSET-040: Success Checkmark Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-040 |
| **Filename** | `FeedbackSuccess@3x.png` |
| **Folder Path** | `Assets/Feedback/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt) |
| **Used In** | General success states across all screens, form submission confirmations |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Feedback/FeedbackSuccess.imageset/` |
| **Dark Mode Variant** | No — sage green reads well on both |
| **SF Symbol Alternative** | `checkmark.circle.fill` tinted `#059669` — **PREFERRED, ship as SF Symbol** |

**Midjourney Prompt** *(only if custom polish wanted)*:
```
Large checkmark icon, vibrant sage green (#059669), modern friendly style, positive confirmation theme, clean edges, high contrast, vector style --ar 1:1 --style raw --v 6
```

**Notes**: SF Symbol `checkmark.circle.fill` is the recommended implementation. Custom asset is a nice-to-have only.

---

### ASSET-041: Error Alert Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-041 |
| **Filename** | `FeedbackError@3x.png` |
| **Folder Path** | `Assets/Feedback/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt) |
| **Used In** | PawAlert error banners across AUTH-02, AUTH-03, AUTH-04, PET-01, SRCH-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Feedback/FeedbackError.imageset/` |
| **Dark Mode Variant** | No |
| **SF Symbol Alternative** | `exclamationmark.triangle.fill` tinted `#DC2626` — **PREFERRED, ship as SF Symbol** |

**Midjourney Prompt** *(only if custom polish wanted)*:
```
Exclamation mark in rounded triangle, terracotta red (#DC2626), modern friendly style, alert but not alarming, clear communication, high contrast, vector style --ar 1:1 --style raw --v 6
```

**Notes**: SF Symbol is preferred. Custom asset for potential future polish.

---

### ASSET-042: Warning Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-042 |
| **Filename** | `FeedbackWarning@3x.png` |
| **Folder Path** | `Assets/Feedback/` |
| **Render As** | Template |
| **Dimensions** | 96x96px @3x (32x32pt) |
| **Used In** | PawAlert warning states, rate limit warnings (AUTH-03 Account Locked) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Feedback/FeedbackWarning.imageset/` |
| **Dark Mode Variant** | No |
| **SF Symbol Alternative** | `exclamationmark.circle.fill` tinted `#F59E0B` — **PREFERRED, ship as SF Symbol** |

**Midjourney Prompt** *(only if custom polish wanted)*:
```
Alert symbol with amber background (#F59E0B), modern friendly design, caution theme without being scary, clean edges, high contrast, vector style --ar 1:1 --style raw --v 6
```

---

### ASSET-043: Verified Badge

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-043 |
| **Filename** | `BadgeVerified@3x.png` |
| **Folder Path** | `Assets/TrustBadges/` |
| **Render As** | Template |
| **Dimensions** | 72x72px @3x (24x24pt) |
| **Used In** | PROF-02 (Sitter Profile — trust indicator), SRCH-02 (verified filter results) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/TrustBadges/BadgeVerified.imageset/` |
| **Dark Mode Variant** | No |
| **SF Symbol Alternative** | `checkmark.seal.fill` tinted `#059669` — **PREFERRED, ship as SF Symbol** |

**Midjourney Prompt** *(only if custom polish wanted)*:
```
Trust badge with checkmark and shield, sage green (#059669) primary color with subtle shine, professional yet friendly, modern flat design, conveys security and verification, suitable for 24pt display --ar 1:1 --style raw --v 6
```

**Notes**: SRCH-02 filter sheet includes "Background Check Verified" toggle. PROF-02 sitter profile can display this badge. SF Symbol is preferred for implementation speed.

---

### ASSET-044: Mail / Envelope Icon (Forgot Password)

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-044 |
| **Filename** | `MailIcon@3x.png` |
| **Folder Path** | `Assets/Status/` |
| **Render As** | Original |
| **Dimensions** | 240x240px @3x (80x80pt — matches AUTH-04b spec) |
| **Used In** | AUTH-04b (Forgot Password Success — "Mail icon (envelope), 80pt, primarySunset, centered") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Status/MailIcon.imageset/` |
| **Dark Mode Variant** | No — sunset orange reads on both |
| **SF Symbol Alternative** | `envelope.fill` tinted `#EA580C` at 80pt (acceptable fallback) |

**Midjourney Prompt**:
```
Elegant envelope icon with a small paw print seal, warm sunset orange (#EA580C) primary color with cream (#FFFBF5) envelope body, modern friendly flat design, clear readable at 80pt size, professional yet approachable, simple clean composition, mail delivery theme --ar 1:1 --style raw --v 6
```

**Background note**: Remove background in post.

**Notes**: This is a **required** asset for AUTH-04b. The spec explicitly calls for "Mail icon (envelope), 80pt, primarySunset, centered" on the success confirmation screen after submitting a password reset request. The SF Symbol `envelope.fill` is an acceptable ship-blocker fallback, but the custom paw-print-sealed version is the design target.

---

### ASSET-045: Background Check Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-045 |
| **Filename** | `BadgeBackgroundCheck@3x.png` |
| **Folder Path** | `Assets/TrustBadges/` |
| **Render As** | Template |
| **Dimensions** | 72x72px @3x (24x24pt) |
| **Used In** | SRCH-02 (Filter sheet — "Background Check Verified" toggle), PROF-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/TrustBadges/BadgeBackgroundCheck.imageset/` |
| **Dark Mode Variant** | No |
| **SF Symbol Alternative** | `shield.checkered` or `person.badge.shield.checkmark.fill` — **PREFERRED, ship as SF Symbol** |

**Midjourney Prompt** *(only if custom polish wanted)*:
```
Clipboard with checkmark and magnifying glass, sage green (#059669) and sunset orange (#EA580C) accents, professional trustworthy style, modern flat design, safety and verification theme, high contrast --ar 1:1 --style raw --v 6
```

---

## 6. Live Activity Icons (ASSET-050 to ASSET-054)

**Recommended path: SF Symbols ⭐**. Lock Screen rendering is optimized for SF Symbols — they auto-adapt to wallpaper and dark mode. Skip raster dark variants entirely; the system handles it. Custom Midjourney prompts retained as a fallback only.

> **Note**: While the Live Activity feature is formally Epic 6, the care data that powers it is collected in AUTH-08 (Epic 1). These icons are included here because the data schema references them and they should be ready when the widget is built.

### ASSET-050: Medication Activity Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-050 |
| **Filename** | `ActivityMedication@3x.png` |
| **Folder Path** | `Assets/LiveActivities/` |
| **Render As** | Template |
| **Dimensions** | 60x60px @3x (20x20pt — Lock Screen widget icon size) |
| **Used In** | Live Activity widget (care checklist — medication item) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/LiveActivities/ActivityMedication.imageset/` |
| **Dark Mode Variant** | Skip — SF Symbol auto-adapts; no value in raster dark variant |
| **SF Symbol Alternative** | `pills.fill` tinted `#F59E0B` — **PREFERRED for Lock Screen legibility** |

**Midjourney Prompt** *(fallback only)*:
```
Pill bottle or capsule icon, vibrant amber (#F59E0B) for attention, modern friendly style, clear readable at very small sizes, health care theme, high contrast, vector style, simple bold shapes --ar 1:1 --style raw --v 6
```

**Notes**: Lock Screen icons must be bold and simple. SF Symbols are strongly recommended for this category due to their optimization for small sizes and automatic dark mode adaptation.

---

### ASSET-051: Feeding Activity Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-051 |
| **Filename** | `ActivityFeeding@3x.png` |
| **Folder Path** | `Assets/LiveActivities/` |
| **Render As** | Template |
| **Dimensions** | 60x60px @3x (20x20pt) |
| **Used In** | Live Activity widget (care checklist — feeding item) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/LiveActivities/ActivityFeeding.imageset/` |
| **Dark Mode Variant** | Skip — use SF Symbol |
| **SF Symbol Alternative** | `cup.and.saucer.fill` or `fork.knife` — **PREFERRED** |

**Midjourney Prompt** *(fallback only)*:
```
Pet food bowl with kibble, warm terracotta (#DC2626) and peachy (#FB923C) tones, modern friendly style, clear simple design for small notification icons, high contrast, vector style, bold readable shapes --ar 1:1 --style raw --v 6
```

---

### ASSET-052: Walk Activity Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-052 |
| **Filename** | `ActivityWalk@3x.png` |
| **Folder Path** | `Assets/LiveActivities/` |
| **Render As** | Template |
| **Dimensions** | 60x60px @3x (20x20pt) |
| **Used In** | Live Activity widget (care checklist — walk completed item) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/LiveActivities/ActivityWalk.imageset/` |
| **Dark Mode Variant** | Skip — use SF Symbol |
| **SF Symbol Alternative** | `figure.walk` tinted `#059669` — **PREFERRED** |

**Midjourney Prompt** *(fallback only)*:
```
Paw prints in walking path pattern, sage green (#059669) success color, modern cheerful style, activity completion theme, high contrast, vector style, simple bold design for small icons --ar 1:1 --style raw --v 6
```

---

### ASSET-053: Bathroom Break Activity Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-053 |
| **Filename** | `ActivityBathroom@3x.png` |
| **Folder Path** | `Assets/LiveActivities/` |
| **Render As** | Template |
| **Dimensions** | 60x60px @3x (20x20pt) |
| **Used In** | Live Activity widget (care checklist — bathroom break item) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/LiveActivities/ActivityBathroom.imageset/` |
| **Dark Mode Variant** | Skip — use SF Symbol |
| **SF Symbol Alternative** | `tree.fill` or `leaf.fill` — **PREFERRED** |

**Midjourney Prompt** *(fallback only)*:
```
Simple tree or fire hydrant with paw print, earthy clay tones (#FAE5D3), charcoal accents (#1F1B17), friendly discreet design, outdoor activity theme, high contrast, vector style, bold simple shapes for small icons --ar 1:1 --style raw --v 6
```

---

### ASSET-054: Play Time Activity Icon

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-054 |
| **Filename** | `ActivityPlay@3x.png` |
| **Folder Path** | `Assets/LiveActivities/` |
| **Render As** | Template |
| **Dimensions** | 60x60px @3x (20x20pt) |
| **Used In** | Live Activity widget (care checklist — play time item) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/LiveActivities/ActivityPlay.imageset/` |
| **Dark Mode Variant** | Skip — use SF Symbol |
| **SF Symbol Alternative** | `tennisball.fill` tinted `#EA580C` — **PREFERRED** |

**Midjourney Prompt** *(fallback only)*:
```
Bouncing ball with paw print, vibrant sunset orange (#EA580C) and peachy tones (#FB923C), energetic playful style, fun activity indicator, high contrast, vector style, bold simple design for small icons --ar 1:1 --style raw --v 6
```

---

## 7. Profile Placeholder Assets (ASSET-060 to ASSET-065)

**Recommended path: Claude SVG ⭐** for avatars (060-062, 065) and hero placeholders (063, 064). Simple silhouettes and gradient placeholders are dramatically simpler in SVG than raster, and easier to iterate.

### ASSET-060: Dog Avatar Placeholder

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-060 |
| **Filename** | `DogAvatar.svg` (preferred) or `DogAvatar@3x.png` |
| **Folder Path** | `Assets/Placeholders/` |
| **Render As** | Original |
| **Dimensions** | 300x300px @3x (100x100pt — Avatar Large per design system). SVG `viewBox=0 0 100 100`. |
| **Used In** | AUTH-07 (Add Pet — photo placeholder), PET-01 (pet card avatar when no photo), PET-02, AUTH-09 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Placeholders/DogAvatar.imageset/` |
| **Dark Mode Variant** | Yes (raster); SVG version adapts via `currentColor` |
| **SF Symbol Alternative** | `dog.fill` (iOS 17+, acceptable temporary fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG of a dog head silhouette in profile, centered in a 100×100 circle. Two-tone: background fill #FB923C (peach), foreground silhouette fill #EA580C (sunset orange). Style: warm, friendly, simple geometric shapes, no detail beyond head outline + ear + eye dot. Output: just the <svg> element with viewBox 0 0 100 100.
```

**Midjourney Prompt (Light, fallback)**:
```
Friendly minimalist dog face icon, warm sunset orange (#EA580C) and peachy tones (#FB923C), simple geometric shapes, approachable and cute, modern flat design, suitable as placeholder avatar, circular composition, cream background (#FFFBF5), centered --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark, fallback)**:
```
Simple cute silhouette of a Shiba Inu head in profile, sunset orange (#EA580C) and peach (#FB923C) tones on dark charcoal circular background (#1A1613), warm friendly style, suitable as default pet avatar, clean rounded shapes --ar 1:1 --style raw --v 6
```

**Notes**: Must render well at 40pt (Avatar Small), 60pt (Avatar Medium), and 100pt (Avatar Large). Design with concentric safe areas.

---

### ASSET-061: Cat Avatar Placeholder

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-061 |
| **Filename** | `CatAvatar.svg` (preferred) or `CatAvatar@3x.png` |
| **Folder Path** | `Assets/Placeholders/` |
| **Render As** | Original |
| **Dimensions** | 300x300px @3x (100x100pt). SVG `viewBox=0 0 100 100`. |
| **Used In** | AUTH-07 (Add Pet — when cat selected), PET-01, PET-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Placeholders/CatAvatar.imageset/` |
| **Dark Mode Variant** | Yes (raster); SVG adapts |
| **SF Symbol Alternative** | `cat.fill` (iOS 17+, acceptable temporary fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG of a cat head silhouette facing forward, centered in a 100×100 circle. Two-tone: background fill #FCD34D (light amber), foreground silhouette fill #EA580C (sunset orange). Show: triangular ears, simple round face, two whisker hints. No detail. Output: just the <svg> element with viewBox 0 0 100 100.
```

**Midjourney Prompt (Light, fallback)**:
```
Charming minimalist cat face icon, warm terracotta (#DC2626) and peach (#FB923C) tones, simple rounded shapes, friendly and inviting, modern flat illustration, works as placeholder avatar, circular frame, cream background (#FFFBF5) --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark, fallback)**:
```
Simple cute silhouette of a cat head in profile, sunset orange (#EA580C) and amber (#F59E0B) tones on dark charcoal circular background (#1A1613), warm friendly style, suitable as default pet avatar --ar 1:1 --style raw --v 6
```

---

### ASSET-062: Person Avatar Placeholder

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-062 |
| **Filename** | `PersonAvatar.svg` (preferred) or `PersonAvatar@3x.png` |
| **Folder Path** | `Assets/Placeholders/` |
| **Render As** | Original |
| **Dimensions** | 300x300px @3x (100x100pt). SVG `viewBox=0 0 100 100`. |
| **Used In** | PROF-01 (Owner profile — avatar when no photo), PROF-02 (Sitter profile fallback), SRCH-01 (Recent Sitters avatars), SRCH-02 (SitterPreviewCard avatar) |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Placeholders/PersonAvatar.imageset/` |
| **Dark Mode Variant** | Yes (raster); SVG adapts |
| **SF Symbol Alternative** | `person.crop.circle.fill` — **PREFERRED for initial implementation** |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG of a friendly person silhouette (head + shoulders), centered in a 100×100 circle. Two-tone: background fill #FED7AA (light peach), foreground silhouette fill #EA580C (sunset orange). Geometric, warm, abstract — no facial features. Output: just the <svg> element with viewBox 0 0 100 100.
```

**Midjourney Prompt (Light, fallback)**:
```
Gender-neutral person silhouette icon, warm sunset orange (#EA580C) on cream gradient (#FFFBF5 to #FAE5D3), modern flat design, friendly approachable figure, works as profile avatar placeholder, circular composition, professional yet warm --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark, fallback)**:
```
Simple gentle silhouette of a friendly person, sunset orange (#EA580C) gradient on dark charcoal circular background (#1A1613), warm approachable style, suitable as default user avatar, modern minimalist design --ar 1:1 --style raw --v 6
```

**Notes**: Must be gender-neutral and inclusive. Used across owner profiles, sitter profiles, and search result cards. Renders at 40pt, 60pt, and 100pt sizes.

---

### ASSET-063: Pet Photo Hero Placeholder

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-063 |
| **Filename** | `PetHeroPlaceholder.svg` (preferred) or `PetHeroPlaceholder@3x.png` |
| **Folder Path** | `Assets/Placeholders/` |
| **Render As** | Original |
| **Dimensions** | 1170x750px @3x (390x250pt — full width, 250pt height per PET-02 spec). SVG `viewBox=0 0 390 200`. |
| **Used In** | PET-02 (Pet Detail View — "If no photo: Gradient placeholder with large paw icon centered") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Placeholders/PetHeroPlaceholder.imageset/` |
| **Dark Mode Variant** | Yes — darker gradient (or single SVG with `currentColor`) |
| **SF Symbol Alternative** | `pawprint.fill` over gradient (code-based fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG hero placeholder. viewBox 0 0 390 200. Background: linear gradient from #EA580C (top-left) to #DC2626 (bottom-right). Centered icon: large white paw print at 30% opacity, ~80px wide. Output: just the <svg> element.
```

**Midjourney Prompt (Light, fallback)**:
```
Large friendly paw print centered on a warm gradient background from cream (#FFFBF5) to sand (#FAE5D3), modern minimalist design, soft rounded edges, subtle shadow, works as hero banner placeholder at full width, approachable and inviting --ar 16:9 --style raw --v 6
```

**Midjourney Prompt (Dark, fallback)**:
```
Subtle gradient from sunset orange (#EA580C) to deep terracotta (#DC2626) on dark charcoal base (#1A1613), large centered paw print icon in cream (#FFFBF5) at 30% opacity, modern minimalist hero placeholder, clean composition --ar 16:9 --style raw --v 6
```

**Notes**: PET-02 explicitly specifies "If no photo: Gradient placeholder with large paw icon centered" for the 250pt hero section. This is a **required** asset. The gradient overlay (bottom 50% fading from transparent to backgroundPrimary) is applied in code on top of this image.

---

### ASSET-064: Sitter Profile Hero Placeholder

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-064 |
| **Filename** | `SitterHeroPlaceholder.svg` (preferred) or `SitterHeroPlaceholder@3x.png` |
| **Folder Path** | `Assets/Placeholders/` |
| **Render As** | Original |
| **Dimensions** | 1170x840px @3x (390x280pt — full width, 280pt height per PROF-02 spec). SVG `viewBox=0 0 390 200`. |
| **Used In** | PROF-02 (Sitter Profile — "If no photo: Gradient placeholder with person icon") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Placeholders/SitterHeroPlaceholder.imageset/` |
| **Dark Mode Variant** | Yes — darker gradient |
| **SF Symbol Alternative** | `person.fill` over gradient (code-based fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG hero placeholder. viewBox 0 0 390 200. Background: linear gradient from #EA580C (top-left) to #FB923C (bottom-right). Centered icon: large white person silhouette at 30% opacity, ~80px tall. Output: just the <svg> element.
```

**Midjourney Prompt (Light, fallback)**:
```
Friendly person silhouette icon with a small paw print accent, warm sunset orange (#EA580C) on cream gradient (#FFFBF5 to #FAE5D3), modern flat design, gender-neutral approachable figure, works as profile hero banner placeholder at full width, professional yet warm --ar 16:9 --style raw --v 6
```

**Midjourney Prompt (Dark, fallback)**:
```
Subtle gradient from sunset orange (#EA580C) to peach (#FB923C) on dark charcoal base (#1A1613), large centered person icon in cream (#FFFBF5) at 30% opacity, modern minimalist hero placeholder, professional warm feel --ar 16:9 --style raw --v 6
```

**Notes**: PROF-02 explicitly specifies "If no photo: Gradient placeholder with person icon" for the 280pt sitter profile hero. This is a **required** asset. The gradient overlay (bottom 40% fading to backgroundPrimary) is applied in SwiftUI code.

---

### ASSET-065: Other Pet Avatar Placeholder

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-065 |
| **Filename** | `OtherPetAvatar.svg` (preferred) or `OtherPetAvatar@3x.png` |
| **Folder Path** | `Assets/Placeholders/` |
| **Render As** | Original |
| **Dimensions** | 300x300px @3x (100x100pt). SVG `viewBox=0 0 100 100`. |
| **Used In** | AUTH-07 (Add Pet — when "Other" pet type selected), PET-01, PET-02 |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Placeholders/OtherPetAvatar.imageset/` |
| **Dark Mode Variant** | Yes (raster); SVG adapts |
| **SF Symbol Alternative** | `pawprint.circle.fill` (acceptable fallback) |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG of a generic paw print, centered in a 100×100 circle. Two-tone: background fill #6EE7B7 (light sage), foreground paw fill #059669 (sage). Standard 4-toe paw print, geometric. Output: just the <svg> element with viewBox 0 0 100 100.
```

**Midjourney Prompt (Light, fallback)**:
```
Friendly minimalist paw print icon in a soft circle, warm sage green (#059669) and cream (#FFFBF5) tones, simple geometric shapes, approachable design, modern flat style, suitable as generic pet placeholder avatar, circular composition --ar 1:1 --style raw --v 6
```

**Midjourney Prompt (Dark, fallback)**:
```
Friendly minimalist paw print icon in a soft circle, sage green (#059669) and sunset orange (#EA580C) on dark charcoal background (#1A1613), simple geometric shapes, approachable design, modern flat style, generic pet placeholder --ar 1:1 --style raw --v 6
```

**Notes**: AUTH-07 has three pet type toggles: Dog, Cat, Other. This covers the "Other" case (rabbits, birds, reptiles, etc.). A generic paw works best here.

---

## 8. Map & Location Assets (ASSET-070 to ASSET-071)

**Recommended path: Claude SVG ⭐**. Map pins benefit from a programmatic shape with a SwiftUI Text overlay for the dynamic price string. A raster pin makes the price text rendering harder and less crisp.

### ASSET-070: Map Pin with Price

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-070 |
| **Filename** | `PricePin.svg` (preferred) or `PricePin@3x.png` |
| **Folder Path** | `Assets/Location/` |
| **Render As** | Template |
| **Dimensions** | 120x150px @3x (40x50pt — map annotation size). SVG `viewBox=0 0 40 50`. |
| **Used In** | SRCH-03 (Search Results Map — "Circle with price inside, e.g. '$75', Color: primarySunset") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Location/PricePin.imageset/` |
| **Dark Mode Variant** | No — pins should be consistently orange on any map style |
| **SF Symbol Alternative** | None — custom MapKit annotation required for price text |

**Claude SVG Prompt (preferred)**:
```
Generate an SVG for a map price pin. viewBox 0 0 40 50. Two colors:
- Pin shape: fill #EA580C (sunset orange)
- Inner circle for text: fill #FFFFFF, sized to fit a 3-character price like "$75"

Shape: classic teardrop pin pointing down — circular head (radius ~16, center 20,18) tapering to a point at (20, 50). White inner circle (radius ~12) inside the head, ready for SwiftUI Text overlay. Subtle drop shadow not in SVG (apply as SwiftUI modifier).
Output: just the <svg> element. No comments.
```

**Midjourney Prompt (fallback)**:
```
Map location pin icon in sunset orange (#EA580C), circular head with space for price text inside, modern clean design, visible at small map zoom levels, bold readable shape, pin drop shadow, friendly professional style, high contrast --ar 1:1 --style raw --v 6
```

**Notes**: SRCH-03 specifies pins as "Circle with price inside (e.g., '$75'), Color: primarySunset, Selected pin: Larger, elevated shadow." In practice, the price text is rendered dynamically via a SwiftUI-based MapKit annotation view. This asset serves as the pin background shape.

---

### ASSET-071: Map Pin Selected State

| Field | Value |
|-------|-------|
| **Asset ID** | ASSET-071 |
| **Filename** | `PricePinSelected.svg` (preferred) or `PricePinSelected@3x.png` |
| **Folder Path** | `Assets/Location/` |
| **Render As** | Template |
| **Dimensions** | 150x186px @3x (50x62pt — larger selected state). SVG `viewBox=0 0 50 62`. |
| **Used In** | SRCH-03 (Selected pin variant — "Larger, elevated shadow") |
| **Xcode Asset Catalog** | `Resources/Assets.xcassets/Location/PricePinSelected.imageset/` |
| **Dark Mode Variant** | No |
| **SF Symbol Alternative** | None |

**Claude SVG Prompt (preferred)**:
```
Same as ASSET-070 but viewBox 0 0 50 62 (25% larger). Add a subtle outer glow ring (stroke #EA580C, opacity 0.3, width 2) at radius ~22 around the pin head to indicate selection. Output: just the <svg> element.
```

**Midjourney Prompt (fallback)**:
```
Map location pin icon in sunset orange (#EA580C), slightly larger than standard pin, circular head with space for text, elevated with visible drop shadow, warm glow effect, selected active state, modern clean design, high contrast --ar 1:1 --style raw --v 6
```

**Notes**: This is the selected/active variant of ASSET-070, approximately 25% larger with more prominent shadow.

---

## Generation Priority Batches

Apply the Tool Selection matrix first — many "Batch" entries below should be SVG or SF Symbol, not Midjourney generations. Estimated times below assume the matrix has been applied (Midjourney only where listed as such).

### Batch 1: Sprint 1 Blockers (Auth & Welcome)
**Must generate before any UI development begins.**

| Priority | Asset ID | Asset Name | Tool | Blocking Screen(s) |
|----------|----------|------------|------|---------------------|
| 1 | ASSET-001 | App Icon | Midjourney + Figma | App Store, SpringBoard |
| 2 | ASSET-003 | Logo Icon (Paw Mark) | Midjourney | AUTH-01 |
| 3 | ASSET-010 | Welcome Screen Hero | Midjourney | AUTH-01 |
| 4 | ASSET-044 | Mail/Envelope Icon | Midjourney *or* SF `envelope.fill` | AUTH-04b |
| 5 | ASSET-060 | Dog Avatar Placeholder | **Claude SVG** | AUTH-07, AUTH-09 |
| 6 | ASSET-061 | Cat Avatar Placeholder | **Claude SVG** | AUTH-07 |
| 7 | ASSET-065 | Other Pet Avatar Placeholder | **Claude SVG** | AUTH-07 |
| 8 | ASSET-062 | Person Avatar Placeholder | **Claude SVG** *or* SF `person.crop.circle.fill` | AUTH-14 |

**Estimated time**: 3 Midjourney assets × ~4 generations = 12 generations (~45 min). Plus ~30 min Claude SVG iteration for 4 placeholders. **Total ~1.25 hours.**

### Batch 2: Sprint 2 Blockers (Onboarding Completion + Pet Profiles)
**Must generate before sitter onboarding and pet profile screens.**

| Priority | Asset ID | Asset Name | Tool | Blocking Screen(s) |
|----------|----------|------------|------|---------------------|
| 9 | ASSET-011 | Confetti/Celebration | SwiftUI/Lottie animation *or* SF `party.popper` | AUTH-09 |
| 10 | ASSET-030 | Dog Walking Service Icon | **Claude SVG** | AUTH-11 |
| 11 | ASSET-031 | Drop-in Visit Service Icon | **Claude SVG** | AUTH-11 |
| 12 | ASSET-032 | House Sitting Service Icon | **Claude SVG** | AUTH-11 |
| 13 | ASSET-033 | Boarding Service Icon | **Claude SVG** | AUTH-11 |
| 14 | ASSET-034 | Daycare Service Icon | **Claude SVG** | AUTH-11 |
| 15 | ASSET-020 | No Pets Empty State | Midjourney | PET-01 |
| 16 | ASSET-063 | Pet Photo Hero Placeholder | **Claude SVG** | PET-02 |

**Estimated time**: 1 Midjourney asset × ~4 generations = 4 generations (~15 min). Plus ~45 min Claude SVG iteration for 6 icons/placeholders. **Total ~1 hour.**

### Batch 3: Sprint 3 Blockers (Profiles + Search)
**Must generate before user profiles and search screens.**

| Priority | Asset ID | Asset Name | Tool | Blocking Screen(s) |
|----------|----------|------------|------|---------------------|
| 17 | ASSET-064 | Sitter Profile Hero Placeholder | **Claude SVG** | PROF-02 |
| 18 | ASSET-002 | Logo Lockup Horizontal | Midjourney | Marketing, PROF-01 |
| 19 | ASSET-021 | No Sitters Empty State | Midjourney | SRCH-02 |
| 20 | ASSET-070 | Map Pin with Price | **Claude SVG** | SRCH-03 |
| 21 | ASSET-071 | Map Pin Selected | **Claude SVG** | SRCH-03 |
| 22 | ASSET-043 | Verified Badge | SF `checkmark.seal.fill` | PROF-02, SRCH-02 |
| 23 | ASSET-025 | No Recommendations | Midjourney | SRCH-01 |

**Estimated time**: 3 Midjourney assets × ~4 generations = 12 generations (~45 min). Plus ~20 min Claude SVG. **Total ~1 hour.**

### Batch 4: Nice-to-Have (Polish & Completeness)
**Can ship with SF Symbol fallbacks; generate when time allows.**

| Priority | Asset ID | Asset Name | Recommended Path |
|----------|----------|------------|------------------|
| 24 | ASSET-012 | Success Checkmark + Paw | SF `checkmark.circle.fill` (permanent) |
| 25 | ASSET-013 | Welcome Hero (Cat variant) | Midjourney (defer) |
| 26 | ASSET-022 | No Messages Empty State | Midjourney (defer) |
| 27 | ASSET-023 | No Bookings Empty State | Midjourney (defer) |
| 28 | ASSET-024 | No Reviews Empty State | Midjourney (defer) |
| 29 | ASSET-040 | Success Icon | SF `checkmark.circle.fill` (permanent) |
| 30 | ASSET-041 | Error Icon | SF `exclamationmark.triangle.fill` (permanent) |
| 31 | ASSET-042 | Warning Icon | SF `exclamationmark.circle.fill` (permanent) |
| 32 | ASSET-045 | Background Check Icon | SF `person.badge.shield.checkmark.fill` (permanent) |
| 33 | ASSET-050 | Medication Activity Icon | SF `pills.fill` (permanent) |
| 34 | ASSET-051 | Feeding Activity Icon | SF `cup.and.saucer.fill` (permanent) |
| 35 | ASSET-052 | Walk Activity Icon | SF `figure.walk` (permanent) |
| 36 | ASSET-053 | Bathroom Activity Icon | SF `tree.fill` (permanent) |
| 37 | ASSET-054 | Play Activity Icon | SF `tennisball.fill` (permanent) |

**Estimated time**: 4 Midjourney assets × ~4 generations = 16 generations (~1 hour). Most of Batch 4 ships with SF Symbols at zero cost.

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| **Total Assets Cataloged** | 37 |
| **Recommended Path: Midjourney** | ~12 assets |
| **Recommended Path: Claude SVG** | ~12 assets |
| **Recommended Path: SF Symbols (permanent)** | ~10 assets |
| **Recommended Path: Code animation** | 1 (Confetti) |
| **Mixed / either tool** | ~2 assets |
| **Batch 1 (Sprint 1 Blockers)** | 8 assets |
| **Batch 2 (Sprint 2 Blockers)** | 8 assets |
| **Batch 3 (Sprint 3 Blockers)** | 7 assets |
| **Batch 4 (Nice-to-Have)** | 14 assets |
| **Assets with SF Symbol Fallback** | 22 assets (can ship without custom art) |
| **Assets with NO Fallback (must generate)** | 15 assets |
| **Assets Requiring Dark Mode Variants** | 17 assets (6 covered automatically by SVG `currentColor`) |
| **Total Estimated Midjourney Generations** | ~50–70 (down from ~148 pre-matrix) |
| **Total Estimated Generation Time** | ~3–4 hours (Midjourney Standard plan Fast mode) |
| **Recommended Midjourney Plan** | Basic ($10/month) — sufficient under tool matrix; previously Standard ($30) |

---

## SF Symbol Alternatives Reference

For rapid prototyping and as permanent fallbacks for status/activity icons, the following SF Symbols can replace custom assets:

| Asset ID | Asset Name | SF Symbol | Tint Color | Permanent or Temporary? |
|----------|------------|-----------|------------|------------------------|
| ASSET-003 | Logo Icon | `pawprint.fill` | `#EA580C` | Temporary — custom required |
| ASSET-011 | Confetti | `party.popper` | `#EA580C` | Temporary (prefer SwiftUI/Lottie animation) |
| ASSET-012 | Success Check + Paw | `checkmark.circle.fill` | `#059669` | Permanent acceptable |
| ASSET-022 | No Messages | `bubble.left.and.bubble.right` | `#EA580C` | Temporary |
| ASSET-023 | No Bookings | `calendar.badge.plus` | `#EA580C` | Temporary |
| ASSET-024 | No Reviews | `star.bubble` | `#F59E0B` | Temporary |
| ASSET-025 | No Recommendations | `sparkle.magnifyingglass` | `#EA580C` | Temporary |
| ASSET-030 | Dog Walking | `figure.walk` | `#EA580C` | Temporary (prefer Claude SVG) |
| ASSET-031 | Drop-in Visit | `hand.wave.fill` | `#EA580C` | Temporary (prefer Claude SVG) |
| ASSET-032 | House Sitting | `moon.stars.fill` | `#EA580C` | Temporary (prefer Claude SVG) |
| ASSET-033 | Boarding | `house.fill` | `#EA580C` | Temporary (prefer Claude SVG) |
| ASSET-034 | Daycare | `sun.max.fill` | `#EA580C` | Temporary (prefer Claude SVG) |
| ASSET-040 | Success | `checkmark.circle.fill` | `#059669` | **Permanent** |
| ASSET-041 | Error | `exclamationmark.triangle.fill` | `#DC2626` | **Permanent** |
| ASSET-042 | Warning | `exclamationmark.circle.fill` | `#F59E0B` | **Permanent** |
| ASSET-043 | Verified Badge | `checkmark.seal.fill` | `#059669` | **Permanent** |
| ASSET-044 | Mail Sent | `envelope.fill` | `#EA580C` | Temporary |
| ASSET-045 | Background Check | `person.badge.shield.checkmark.fill` | `#059669` | **Permanent** |
| ASSET-050 | Medication | `pills.fill` | `#F59E0B` | **Permanent** |
| ASSET-051 | Feeding | `cup.and.saucer.fill` | `#DC2626` | **Permanent** |
| ASSET-052 | Walk | `figure.walk` | `#059669` | **Permanent** |
| ASSET-053 | Bathroom | `tree.fill` | `#5D4E37` | **Permanent** |
| ASSET-054 | Play | `tennisball.fill` | `#EA580C` | **Permanent** |
| ASSET-060 | Dog Avatar | `dog.fill` | `#EA580C` | Temporary (prefer Claude SVG) |
| ASSET-061 | Cat Avatar | `cat.fill` | `#DC2626` | Temporary (prefer Claude SVG) |
| ASSET-062 | Person Avatar | `person.crop.circle.fill` | `#EA580C` | **Permanent** |
| ASSET-065 | Other Pet Avatar | `pawprint.circle.fill` | `#059669` | Temporary (prefer Claude SVG) |

**Total SF Symbol substitutes available**: 27 (covering all 37 assets for prototype builds).

---

## Screen-to-Asset Cross Reference

Every screen in Epics 1-4 mapped to required assets:

| Screen ID | Screen Name | Required Assets |
|-----------|-------------|----------------|
| AUTH-01 | Welcome | ASSET-003, ASSET-010 |
| AUTH-02 | Sign Up | None (uses system Apple Sign In button, text-only UI) |
| AUTH-03 | Sign In | None (text-only UI) |
| AUTH-04 | Forgot Password | None (text-only form) |
| AUTH-04b | Forgot Password Success | **ASSET-044** (mail icon, 80pt) |
| AUTH-05 | Role Selection | None (uses SF Symbol icons: heart, hand.raised, arrow.left.arrow.right) |
| AUTH-06 | Owner: Location | None (uses SF Symbol `location.fill`, MapKit) |
| AUTH-07 | Owner: Add Pet | ASSET-060, ASSET-061, ASSET-065 (avatar placeholders by pet type) |
| AUTH-08 | Owner: Pet Details | None (form-only, emoji section headers) |
| AUTH-09 | Onboarding Success | ASSET-011 or ASSET-012 (celebration icon), ASSET-060/061/065 (pet avatar) |
| AUTH-10 | Sitter: Service Area | None (uses SF Symbol `location.fill`, MapKit) |
| AUTH-11 | Sitter: Services | ASSET-030 through ASSET-034 (service icons) |
| AUTH-12 | Sitter: Availability | None (code-built toggle grid) |
| AUTH-13 | Sitter: Rates | ASSET-030 through ASSET-034 (service icons next to rate inputs) |
| AUTH-14 | Sitter: Bio & Photo | ASSET-062 (person placeholder) |
| PET-01 | My Pets List | ASSET-020 (empty state), ASSET-060/061/065 (pet avatars) |
| PET-02 | Pet Detail View | **ASSET-063** (pet hero placeholder), ASSET-060/061/065 (avatar) |
| PET-03 | Add Pet Flow | ASSET-060, ASSET-061, ASSET-065 (same as AUTH-07) |
| PET-04 | Edit Pet | ASSET-060, ASSET-061, ASSET-065 (same as AUTH-07) |
| PROF-01 | My Profile (Owner) | ASSET-062 (person avatar placeholder) |
| PROF-02 | Sitter Profile | **ASSET-064** (sitter hero placeholder), ASSET-062, ASSET-043, ASSET-024 |
| PROF-03 | Edit Profile (Owner) | ASSET-062 (person avatar placeholder) |
| PROF-04 | Edit Profile (Sitter) | ASSET-062 (person avatar placeholder) |
| SRCH-01 | Search Home | ASSET-062 (recent sitter avatars), ASSET-025 (no recommendations) |
| SRCH-02 | Search Results List | ASSET-021 (no sitters empty state), ASSET-062 (sitter avatars), ASSET-043 |
| SRCH-03 | Search Results Map | **ASSET-070**, **ASSET-071** (map pins), ASSET-062 (preview card avatar) |

---

## Asset Catalog Folder Structure

```
Resources/Assets.xcassets/
├── AppIcon.appiconset/
│   ├── AppIcon (ASSET-001 — all required sizes auto-generated)
│
├── Brand/
│   ├── LogoLockup.imageset/             (ASSET-002)
│   └── LogoIcon.imageset/               (ASSET-003)
│
├── Onboarding/
│   ├── WelcomeHero.imageset/            (ASSET-010)
│   ├── Confetti.imageset/               (ASSET-011)
│   ├── SuccessCheckmark.imageset/       (ASSET-012)
│   └── WelcomeHeroCat.imageset/         (ASSET-013)
│
├── EmptyStates/
│   ├── EmptyNoPets.imageset/            (ASSET-020)
│   ├── EmptyNoSitters.imageset/         (ASSET-021)
│   ├── EmptyNoMessages.imageset/        (ASSET-022)
│   ├── EmptyNoBookings.imageset/        (ASSET-023)
│   ├── EmptyNoReviews.imageset/         (ASSET-024)
│   └── EmptyNoRecommendations.imageset/ (ASSET-025)
│
├── Services/
│   ├── ServiceWalking.imageset/         (ASSET-030)
│   ├── ServiceDropIn.imageset/          (ASSET-031)
│   ├── ServiceSitting.imageset/         (ASSET-032)
│   ├── ServiceBoarding.imageset/        (ASSET-033)
│   └── ServiceDaycare.imageset/         (ASSET-034)
│
├── Feedback/
│   ├── FeedbackSuccess.imageset/        (ASSET-040)
│   ├── FeedbackError.imageset/          (ASSET-041)
│   └── FeedbackWarning.imageset/        (ASSET-042)
│
├── TrustBadges/
│   ├── BadgeVerified.imageset/          (ASSET-043)
│   └── BadgeBackgroundCheck.imageset/   (ASSET-045)
│
├── Status/
│   └── MailIcon.imageset/               (ASSET-044)
│
├── LiveActivities/
│   ├── ActivityMedication.imageset/     (ASSET-050)
│   ├── ActivityFeeding.imageset/        (ASSET-051)
│   ├── ActivityWalk.imageset/           (ASSET-052)
│   ├── ActivityBathroom.imageset/       (ASSET-053)
│   └── ActivityPlay.imageset/           (ASSET-054)
│
├── Placeholders/
│   ├── DogAvatar.imageset/              (ASSET-060)
│   ├── CatAvatar.imageset/              (ASSET-061)
│   ├── PersonAvatar.imageset/           (ASSET-062)
│   ├── PetHeroPlaceholder.imageset/     (ASSET-063)
│   ├── SitterHeroPlaceholder.imageset/  (ASSET-064)
│   └── OtherPetAvatar.imageset/         (ASSET-065)
│
└── Location/
    ├── PricePin.imageset/               (ASSET-070)
    └── PricePinSelected.imageset/       (ASSET-071)
```

Folder names match the `AssetImage.swift` enum cases. SVG-backed imagesets use single-vector rendering mode in `Contents.json`; raster imagesets contain `@1x`, `@2x`, `@3x` PNGs derived via `scripts/scale-assets.sh`.

---

## Excluded Assets (Out of Scope)

The following were deliberately excluded from this catalog:

| Excluded Item | Reason |
|---------------|--------|
| Video call icon | Not in Epics 1-4 scope |
| Paw print background pattern | No screen in Epics 1-4 references it (deferred per images.md) |
| Payment icons (credit card, wallet) | Epic 9 deferred from MVP |
| Pricing tag illustration | Epic 9 deferred from MVP |
| Secure payment icon | Epic 9 deferred from MVP |
| Rating stars (custom) | SF Symbol `star.fill` with amber tint is sufficient |
| Availability grid visual | Built in SwiftUI code per AUTH-12, not an image asset |
| Calendar booking illustration | Booking is Epic 5, out of scope for this catalog |
| Service radius map overlay | Rendered via MapKit circle overlay in code (AUTH-10) |
| Gradient background asset | Built in SwiftUI code (`LinearGradient`), not an image |
| New message notification icon | Epic 7 (Messaging), not yet specified |

Anticipated additions for Epics 5-10 (build just-in-time per the master checklist) are tracked in § 7 of `PawConnect-Asset-Library-Audit-and-Claude-Integration.md`.

---

*Document Version: 1.1*
*Covers: Epics 1-4 (AUTH-01 through SRCH-03, 25 screens)*
*Total Assets: 37*
*Last Updated: April 30, 2026*
