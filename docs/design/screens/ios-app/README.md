# PawConnect — iOS App UI Kit

A high-fidelity, click-through recreation of the PawConnect iOS app (SwiftUI,
iOS 26 "Liquid Glass"). Built from the real codebase design layer
(`AppColors.swift`, `PawButton/PawCard/PawTextField/PawLogo.swift`,
`Constants.swift`, `WelcomeView/SignInView.swift`) plus `PRODUCT_SPEC.md` and
`DESIGN_INTENT.md` for the screens that aren't implemented in code yet.

> Open `index.html` to use the prototype. A left rail jumps to any screen; the
> phone itself is interactive (tap buttons, sitters, the tab bar, the Live
> Activity). A **light/dark toggle** sits at the top of the rail — every screen
> is theme-aware (surfaces invert, accents stay constant). A link in the header
> opens **`explorations.html`** — a side-by-side canvas of design variants.

## What's covered

| Flow | Screen | Source of truth |
|------|--------|-----------------|
| Onboarding | Welcome (AUTH-01) | `WelcomeView.swift` — exact layout |
| Onboarding | Sign In (AUTH-03) | `SignInView.swift` — exact layout |
| Discover | Search Home (SRCH-01) | spec + intent |
| Discover | Search Results · List (SRCH-02) | spec + intent |
| Discover | Search Results · Map (SRCH-03) | spec + intent (paper-map style) |
| Discover | Sitter Profile (PROF-02) | spec + intent — the trust-decision screen |
| Booking | Booking Request (BOOK-01) | reached from "Book Now" — a request, **not** a charge |
| **Live Activity** | **Lock Screen (LIVE-08)** | the differentiator — glanceable care |
| Live Activity | Care Session / Live Detail (LIVE-09) | spec + intent |
| Account | Bookings (BOOK-02), Messages (MSG-01), My Profile (PROF-01) | spec + intent |

## Explorations (`explorations.html`)

A `design_canvas` of options for review:
- **Live Activity — walking state:** static **icon** vs a **route preview** (the
  walked path on a minimal neighbourhood map), in **light and dark**, same Lock
  Screen surface.
- **Search Home (SRCH-01) ×3:** vertical form · horizontal pill bar · hero entry block.
- **Results List (SRCH-02) ×2:** sticky filter bar · single filter button + sheet.

## Files

- `index.html` — prototype shell: iOS device frame + navigation + tab bar + dark toggle
- `explorations.html` — design-variant canvas (`design-canvas.jsx` + `explorations.jsx`)
- `icons.jsx` — icon set (SF Symbol stand-ins + the 5 custom Service icons)
- `primitives.jsx` — `PawButton`, `TextButton`, `PawCard`, `PawTextField`,
  `Avatar`, `StarRating`, `Pill`, `NavBar`, `ProgressSegments`, `OrDivider`…
  (tokens reference CSS vars, so components flip with `[data-theme]`)
- `shared.jsx` — mock data + `SitterCard`, `SitterAvatar`, `TabBar`
- `screens-a.jsx` — Welcome, Sign In, Search Home, Search Results
- `screens-b.jsx` — Sitter Profile, Live Detail, Lock Screen, Map, Booking Request
- `screens-c.jsx` — Bookings, Messages, Account
- `ios-frame.jsx` / `design-canvas.jsx` — starter components

## Component fidelity notes

- **Primary button** is a *solid* sunset fill (`#EA580C`), 56pt tall, 12pt
  radius, 0.6 opacity when disabled, scales to 0.98 on press — matching
  `PrimaryButtonStyle` in `PawButton.swift`. (The brand-design.html mentions a
  gradient; the shipping code uses a solid fill, so the kit follows the code.)
- **Secondary button** is a 1.5pt sunset border on a transparent fill.
- **Cards** use the warm low shadow `0 2px 8px rgba(31,27,23,0.08)`, 12pt radius.
- **Icons** substitute Apple SF Symbols (not web-available) with a matching
  rounded-outline set; the five Service icons follow the exact Claude-SVG specs
  in the Asset Library. See root `README.md` § Iconography.

## Known substitutions

- **Sitter (person) photos** use the spec's `PersonAvatar` placeholder
  (peach field + initials) because real sitter photos are user-supplied.
- **Pet imagery** uses the two real warm Shiba assets shipped in the repo.
- **SF Pro** renders natively on Apple devices via the system font stack;
  elsewhere it falls back to the platform UI font.
