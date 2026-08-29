---
name: pawconnect-design
description: Use this skill to generate well-branded interfaces and assets for PawConnect, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Voice & feeling:** warm, neighborhood-scale, premium; warmth over efficiency; trust through substance, not badges. Sentence case, second person, the pet is "they"/their name. No urgency or pressure copy. See README § Content Fundamentals.
- **Tokens:** `colors_and_type.css` — colors (light + dark), spacing (8pt grid), radii, shadows, full type scale + semantic classes (`.pc-display`, `.pc-h1`, `.pc-body`…). Primary = Sunset `#EA580C`; warm cream→charcoal neutrals; Sage for trust.
- **Components & screens:** `ui_kits/ios-app/` — an interactive iOS click-through prototype with reusable JSX (`PawButton`, `PawCard`, `PawTextField`, `SitterCard`, `TabBar`, the Lock-Screen Live Activity, etc.). Read its `README.md`.
- **Spec cards:** `preview/` — small HTML specimens of each token/component group.
- **Assets:** `assets/` — real warm Shiba pet imagery + app-icon master.
- **Icons:** **SF Symbols for everything Apple ships** — nav chrome (back, close, share, menu), status (success/error/warning), and standard actions (add, edit, delete, filter, sort, settings), plus Live Activity care icons and the `pawprint.fill` mark. **Custom artwork is reserved for brand marks, hero illustrations, empty states, and the five service-type icons only.** On web, `ui_kits/ios-app/icons.jsx` § A renders SF Symbol stand-ins (each tagged with its symbol name); § B holds the custom service icons. See README § Iconography for the full map.

## Deeper context (provided docs, may need re-attaching)

- GitHub `kydogg/PawConnect` — SwiftUI source of truth for the design layer.
- `PRODUCT_SPEC.md` (structure) + `DESIGN_INTENT.md` (emotional posture, anti-patterns) are **co-canonical** — read both for any screen.

Always honor the anti-patterns in the design intent. The differentiator is the **Live Activity** (glanceable Lock-Screen care progress) — treat that surface as sacred: reassurance, never anxiety or ads.
