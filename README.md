# PawConnect

A premium iOS pet care marketplace app built with SwiftUI and Liquid Glass design for iOS 26+.

## Prerequisites

- **Xcode 26.0+** (required for iOS 26 SDK & Liquid Glass)
- **iOS 26.0+** deployment target
- macOS with Apple Developer account (for code signing)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/kydogg/PawConnect.git
   cd PawConnect
   ```

2. **Open in Xcode**
   ```bash
   open PawConnect.xcodeproj
   ```

3. **Resolve packages**  
   Xcode will automatically fetch SPM dependencies. If not, go to `File → Packages → Resolve Package Versions`.

4. **Configure signing**  
   Select the `PawConnect` target → Signing & Capabilities → set your Team and Bundle Identifier.

5. **Set up environment**  
   Copy `.env.example` to `.env` and fill in your Supabase credentials (URL and anon key). These values are used in `Core/Services/SupabaseClient.swift`.

6. **Build and run**  
   Select an iOS 26 simulator (iPhone 16 Pro recommended) and press `Cmd+R`.

## Adding SwiftLint (SPM Build Tool Plugin)

1. In Xcode: `File → Add Package Dependencies`
2. Enter: `https://github.com/SimplyDanny/SwiftLintPlugins`
3. Set dependency rule to **Up to Next Major Version** from `0.58.0`
4. Select the `PawConnect` target → Build Phases
5. Add a **Run Build Tool Plug-ins** phase (if not auto-added)
6. Add `SwiftLintBuildToolPlugin` to the phase

The `.swiftlint.yml` config in the project root will be picked up automatically.

## Adding SwiftFormat (SPM Build Tool Plugin)

1. In Xcode: `File → Add Package Dependencies`
2. Enter: `https://github.com/nicklockwood/SwiftFormat`
3. Set dependency rule to **Up to Next Major Version** from `0.55.0`
4. Select the `PawConnect` target → Build Phases
5. Add `SwiftFormatBuildToolPlugin` to the Run Build Tool Plug-ins phase

The `.swiftformat` config in the project root will be picked up automatically.

## Architecture

- **Pattern**: MVVM with `@Observable`
- **Structure**: Feature-based modules (`Features/Auth/`, `Features/Booking/`, etc.)
- **Backend**: Supabase (PostgreSQL + Auth + Realtime + Storage)
- **Design**: Apple Liquid Glass for navigation layer, custom components for content

## Git Workflow (GitFlow)

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready releases |
| `develop` | Integration branch |
| `feature/*` | Individual features → merge into `develop` |
| `bugfix/*` | Bug fixes → merge into `develop` |
| `hotfix/*` | Emergency fixes → merge into `main` and `develop` |

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(auth): add sign-in with Apple
fix(booking): resolve date picker crash
refactor(design): extract reusable card component
```

## Project Structure

```
PawConnect/
├── Core/
│   ├── Design/          # Colors, components, extensions
│   ├── Services/        # Supabase, Auth, Storage
│   └── Utilities/       # Constants, errors
├── Features/
│   ├── Auth/            # Sign in, sign up, welcome
│   ├── Booking/         # Service booking flow
│   ├── LiveActivity/    # Real-time care tracking
│   ├── Messages/        # In-app messaging
│   ├── Onboarding/      # Owner & sitter onboarding
│   ├── Pets/            # Pet management
│   ├── Profile/         # User profiles
│   └── Search/          # Sitter search & discovery
├── Models/              # Data models (Codable structs)
└── Resources/           # Assets, colors, images
```
