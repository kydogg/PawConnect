# PawConnect AI Development Guide

> **AI Assistant**: This is your ONLY instruction file. Read this completely before any task.
> Also reference `PRODUCT_SPEC.md` for detailed screen specifications and the SQL migrations in `supabase/migrations/` (`0001_initial_schema.sql`, `0002_storage_buckets.sql`) for data structure.

---

## Project Overview

**PawConnect** is a premium iOS pet care marketplace app competing with Rover.

**Primary Differentiator**: Real-time Live Activities showing care progress on the owner's Lock Screen while a sitter cares for their pet.

**Target**: iOS 26+ with Liquid Glass design language

---

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend** | SwiftUI (iOS 26+) | Liquid Glass design, @Observable |
| **Backend** | Supabase | PostgreSQL + Auth + Realtime + Storage |
| **Auth** | Supabase Auth | Sign in with Apple + Email/Password |
| **Database** | PostgreSQL | Via Supabase |
| **Real-time** | Supabase Realtime | Postgres changes subscription |
| **Storage** | Supabase Storage | Pet photos, profile images |
| **Maps** | MapKit | Walk tracking, sitter locations |
| **Live Activities** | ActivityKit | Enhanced iOS 26 Lock screen + CarPlay |
| **Design System** | Liquid Glass | Apple's translucent material system |
| **Build** | Xcode 26 | Required for iOS 26 SDK |

---

## FIRST TASK: Project Analysis & Git Setup

**Before building ANY new features**, verify Git setup and analyze the project structure.

### Step 0: Verify Git Branching

```bash
# Check current branch
git branch --show-current

# Check all branches
git branch -a

# Check status
git status
```

**Required branches must exist:**
- `main` (production)
- `develop` (integration)

If missing, create them:
```bash
# If only main exists:
git checkout main
git checkout -b develop
git push -u origin develop
```

**⚠️ STOP if currently on `main` or `develop`:**
```bash
# Create feature branch for any work
git checkout develop
git pull origin develop
git checkout -b feature/[task-name]
```

### Step 1: Examine Current Structure

```bash
# Run this to see what exists
find . -name "*.swift" -type f | head -50
ls -la
```

### Step 2: Identify Issues

Look for these common problems:
- [ ] Files in wrong locations (Views in Models folder, etc.)
- [ ] Duplicate or unused files
- [ ] Non-MVVM patterns (business logic in Views)
- [ ] Missing folder structure
- [ ] Unnecessary boilerplate
- [ ] Old iOS patterns (ObservableObject instead of @Observable)

### Step 3: Report Before Restructuring

Before making changes, report:
```
CURRENT STRUCTURE ANALYSIS:
- Root files: [list]
- Folder organization: [describe]
- Issues found: [list specific problems]
- Recommended changes: [list]

Proceed with restructuring? [wait for confirmation]
```

### Step 4: Target Structure

The project MUST follow this structure:

```
PawConnect/
├── PawConnectApp.swift              # App entry point only
├── RootView.swift                   # Auth routing logic only
│
├── Core/
│   ├── Design/
│   │   ├── AppColors.swift          # Brand colors
│   │   ├── Extensions/
│   │   │   └── Color+Hex.swift
│   │   └── Components/
│   │       ├── PawCard.swift        # Content card (NOT glass)
│   │       └── PawTextField.swift   # Styled text input
│   │
│   ├── Services/
│   │   ├── SupabaseClient.swift     # Supabase singleton
│   │   ├── AuthService.swift        # Auth logic
│   │   └── StorageService.swift     # File uploads
│   │
│   └── Utilities/
│       ├── AppError.swift           # Error types
│       └── Constants.swift          # App constants
│
├── Features/
│   ├── Auth/
│   │   ├── Views/
│   │   │   ├── WelcomeView.swift
│   │   │   ├── SignUpView.swift
│   │   │   ├── SignInView.swift
│   │   │   └── ForgotPasswordView.swift
│   │   └── ViewModels/
│   │       ├── SignUpViewModel.swift
│   │       └── SignInViewModel.swift
│   │
│   ├── Onboarding/
│   │   ├── Views/
│   │   │   ├── RoleSelectionView.swift
│   │   │   ├── Owner/
│   │   │   │   ├── LocationView.swift
│   │   │   │   ├── AddPetView.swift
│   │   │   │   └── PetCareDetailsView.swift
│   │   │   └── Sitter/
│   │   │       ├── ServiceAreaView.swift
│   │   │       ├── ServicesView.swift
│   │   │       ├── AvailabilityView.swift
│   │   │       ├── RatesView.swift
│   │   │       └── BioPhotoView.swift
│   │   └── ViewModels/
│   │
│   ├── Pets/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   └── Components/
│   │
│   ├── Search/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   └── Components/
│   │
│   ├── Booking/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   └── Components/
│   │
│   ├── LiveActivity/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   └── Widget/
│   │       ├── CareActivityAttributes.swift
│   │       └── CareActivityView.swift
│   │
│   ├── Messages/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   └── Components/
│   │
│   └── Profile/
│       ├── Views/
│       └── ViewModels/
│
├── Models/
│   ├── User.swift
│   ├── Pet.swift
│   ├── Sitter.swift
│   ├── Booking.swift
│   ├── CareSession.swift
│   ├── Message.swift
│   └── Review.swift
│
└── Resources/
    ├── Assets.xcassets
    └── Info.plist
```

### Step 5: Restructuring Rules

When reorganizing:

1. **Move files, don't copy** - Avoid duplicates
2. **Update imports** - Fix any broken references
3. **Remove empty files** - Delete placeholder/stub files with no content
4. **Remove unused code** - Delete commented-out code blocks
5. **Consolidate duplicates** - If two files do similar things, merge them
6. **Fix naming** - Use consistent naming (FeatureView.swift, FeatureViewModel.swift)

### What to DELETE

- [ ] Empty Swift files (just import statements)
- [ ] Commented-out code blocks
- [ ] Duplicate model definitions
- [ ] Unused asset files
- [ ] Test/example files not needed for production
- [ ] Old iOS patterns (ObservableObject classes if @Observable exists)

### What to KEEP

- [ ] All working View files
- [ ] All ViewModel files with logic
- [ ] Model definitions (consolidate if duplicated)
- [ ] Asset catalogs
- [ ] Info.plist and entitlements
- [ ] Package.swift / SPM dependencies

---

## Git Branching Strategy (GitFlow)

**All development MUST follow proper branching practices. No exceptions.**

### Branch Structure

```
main (production)
  │
  └── develop (integration)
        │
        ├── feature/AUTH-01-welcome-screen
        ├── feature/AUTH-02-sign-up
        ├── feature/PET-01-my-pets-list
        └── ...
```

### Branch Types

| Branch | Purpose | Merges Into | Protected |
|--------|---------|-------------|-----------|
| `main` | Production-ready code only | — | ✅ Yes |
| `develop` | Integration branch, latest approved features | `main` (via PR) | ✅ Yes |
| `feature/*` | Individual features/user stories | `develop` (via PR) | ❌ No |
| `bugfix/*` | Bug fixes | `develop` (via PR) | ❌ No |
| `hotfix/*` | Emergency production fixes | `main` AND `develop` | ❌ No |

### Branch Naming Convention

```bash
# Features - use ticket/spec ID
feature/AUTH-01-welcome-screen
feature/AUTH-02-sign-up
feature/PET-01-my-pets-list
feature/BOOK-03-select-dates

# Bugs
bugfix/fix-login-crash
bugfix/AUTH-02-email-validation

# Hotfixes (production emergencies only)
hotfix/critical-auth-fix
```

### Workflow: Starting a New Feature

```bash
# 1. Always start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/AUTH-01-welcome-screen

# 3. Make commits (small, atomic, descriptive)
git add .
git commit -m "feat(auth): add WelcomeView with logo and CTAs"

# 4. Push feature branch
git push -u origin feature/AUTH-01-welcome-screen

# 5. When complete: Create Pull Request → develop
# 6. After PR approval: Merge and delete feature branch
```

### Commit Message Convention (Conventional Commits)

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     New feature
fix:      Bug fix
refactor: Code refactoring (no feature change)
style:    Formatting, missing semicolons (no code change)
docs:     Documentation only
test:     Adding tests
chore:    Maintenance, dependencies

# Examples
feat(auth): add SignUpView with form validation
fix(pets): resolve crash when deleting pet with active booking
refactor(booking): extract date picker into reusable component
style(core): format AppColors with consistent spacing
docs(readme): update setup instructions for Supabase
chore(deps): update supabase-swift to 2.1.0
```

### Rules

1. **Never commit directly to `main` or `develop`**
2. **One feature = One branch** — Do not combine multiple features
3. **Keep branches short-lived** — Merge within 1-3 days, not weeks
4. **Pull from develop frequently** — Avoid merge conflicts
5. **Delete branches after merge** — Keep repo clean
6. **Write descriptive commit messages** — Future you will thank you

### Atomic Commits (CRITICAL)

**Commit early. Commit often. Every logical change gets its own commit.**

| After This... | Commit With... |
|---------------|----------------|
| Creating a new file | `git commit -m "feat(scope): add [FileName]"` |
| Adding a new function/method | `git commit -m "feat(scope): add [functionName] to [FileName]"` |
| Fixing a bug | `git commit -m "fix(scope): resolve [issue]"` |
| Refactoring code | `git commit -m "refactor(scope): [what changed]"` |
| Updating UI/styling | `git commit -m "style(scope): [what changed]"` |
| Moving/renaming files | `git commit -m "refactor(scope): move [file] to [location]"` |
| Deleting files | `git commit -m "chore(scope): remove unused [file]"` |

**Commit Frequency Guidelines:**

```
✅ GOOD - Atomic commits (one logical change each):
- "feat(auth): add SignUpView skeleton"
- "feat(auth): add form fields to SignUpView"  
- "feat(auth): add validation logic to SignUpViewModel"
- "feat(auth): add submit button with loading state"
- "style(auth): apply Liquid Glass to SignUpView buttons"

❌ BAD - Monolithic commit (too many changes):
- "feat(auth): add complete sign up feature with view, viewmodel, validation, and styling"
```

**AI Assistant Commit Protocol:**

After EVERY file creation or modification:
```bash
git add [specific-file-or-files]
git commit -m "[type]([scope]): [concise description]"
```

Do NOT batch multiple unrelated changes. Each commit should:
- Be reversible independently
- Have a single, clear purpose
- Be understandable from the message alone

**Example Session Flow:**

```bash
# Created AppColors.swift
git add Core/Design/AppColors.swift
git commit -m "feat(design): add AppColors with brand palette"

# Created Color+Hex extension
git add Core/Design/Extensions/Color+Hex.swift
git commit -m "feat(design): add Color hex initializer extension"

# Created PawCard component
git add Core/Design/Components/PawCard.swift
git commit -m "feat(design): add PawCard content container component"

# Created PawTextField component
git add Core/Design/Components/PawTextField.swift
git commit -m "feat(design): add PawTextField with label and error support"

# Fixed typo in AppColors
git add Core/Design/AppColors.swift
git commit -m "fix(design): correct hex value for secondarySage"
```

This creates a clear, traceable history where each change can be reviewed, reverted, or cherry-picked independently.

### Before Starting ANY Feature

```bash
# Verify you're on develop and up to date
git checkout develop
git pull origin develop
git status  # Should show "nothing to commit, working tree clean"

# Then create your feature branch
git checkout -b feature/[SPEC-ID]-[brief-description]
```

### AI Assistant Git Instructions

**Claude MUST commit after every file change. No exceptions.**

When Claude Code creates or modifies files:

1. **Check current branch first**: `git branch --show-current`
2. **If on `main` or `develop`**: Stop and create a feature branch first
3. **After EVERY file creation**: Immediately commit that file
4. **After EVERY file modification**: Immediately commit that change
5. **After EVERY file deletion**: Immediately commit the removal
6. **Never batch unrelated changes**: One logical change per commit
7. **Never force push**: Always use regular `git push`

```bash
# Claude should run this before making changes:
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "develop" ]]; then
    echo "⚠️  ERROR: Cannot work directly on $CURRENT_BRANCH"
    echo "Create a feature branch first: git checkout -b feature/[name]"
    exit 1
fi
```

**Commit Immediately Pattern:**

```bash
# Step 1: Make change (create/edit file)
# Step 2: Commit IMMEDIATELY
git add [file]
git commit -m "[type]([scope]): [description]"
# Step 3: Then proceed to next change
```

**Never do this:**
```bash
# ❌ BAD: Making multiple changes then one big commit
# ... create 5 files ...
git add .
git commit -m "add stuff"  # NO!
```

**Always do this:**
```bash
# ✅ GOOD: Commit after each logical change
# Create file 1
git add file1.swift
git commit -m "feat(auth): add AuthService skeleton"

# Create file 2  
git add file2.swift
git commit -m "feat(auth): add SignUpView"

# Modify file 1
git add file1.swift
git commit -m "feat(auth): implement signUp method in AuthService"
```

---

## Architecture Pattern: MVVM with @Observable

### View (SwiftUI)

```swift
// Features/Auth/Views/SignInView.swift
import SwiftUI

struct SignInView: View {
    @State private var viewModel = SignInViewModel()
    
    var body: some View {
        // UI ONLY - no business logic
        content
            .task { await viewModel.checkAuthState() }
    }
    
    @ViewBuilder
    private var content: some View {
        if viewModel.isLoading {
            ProgressView()
        } else if let error = viewModel.error {
            errorView(error)
        } else {
            mainContent
        }
    }
    
    private var mainContent: some View {
        // Form UI here
    }
}

#Preview {
    SignInView()
}
```

### ViewModel (@Observable - iOS 17+)

```swift
// Features/Auth/ViewModels/SignInViewModel.swift
import Foundation

@Observable
class SignInViewModel {
    // MARK: - State
    var email = ""
    var password = ""
    var isLoading = false
    var error: AppError?
    
    // MARK: - Computed
    var isValid: Bool {
        !email.isEmpty && !password.isEmpty && password.count >= 8
    }
    
    var emailError: String? {
        guard !email.isEmpty else { return nil }
        return email.contains("@") ? nil : "Invalid email"
    }
    
    // MARK: - Actions
    func signIn() async {
        isLoading = true
        error = nil
        
        do {
            try await AuthService.shared.signIn(email: email, password: password)
        } catch let appError as AppError {
            self.error = appError
        } catch {
            self.error = .network(underlying: error)
        }
        
        isLoading = false
    }
}
```

### Service (Singleton)

```swift
// Core/Services/AuthService.swift
import Foundation
import Supabase

@Observable
class AuthService {
    static let shared = AuthService()
    
    var currentUser: User?
    var isAuthenticated: Bool { currentUser != nil }
    
    private init() { }
    
    func signIn(email: String, password: String) async throws {
        let response = try await SupabaseClient.shared.client.auth.signIn(
            email: email,
            password: password
        )
        // Handle response
    }
    
    func signOut() async throws {
        try await SupabaseClient.shared.client.auth.signOut()
        currentUser = nil
    }
}
```

### Model (Codable struct)

```swift
// Models/User.swift
import Foundation

struct User: Codable, Identifiable {
    let id: UUID
    let email: String
    var fullName: String
    var avatarUrl: String?
    var role: UserRole
    var hasCompletedOnboarding: Bool
    
    enum UserRole: String, Codable {
        case owner, sitter, both
    }
}
```

---

## iOS 26 Liquid Glass

### What You Get Automatically

When compiled with Xcode 26, these adopt Liquid Glass with NO code:

| Component | Automatic Behavior |
|-----------|-------------------|
| `NavigationStack` | Floating glass toolbar |
| `TabView` | Glass tab bar that minimizes on scroll |
| `.toolbar { }` | Grouped glass toolbar items |
| `.sheet()` | Inset glass background, morphing |
| `NavigationSplitView` | Floating glass sidebar |

### Glass Button Styles

```swift
// Primary action - opaque glass
Button("Book Now") { }
    .buttonStyle(.glassProminent)
    .tint(AppColors.primarySunset)

// Secondary action - translucent glass
Button("Cancel") { }
    .buttonStyle(.glass)
```

### Multiple Glass Elements - Use Container

```swift
// REQUIRED for multiple glass elements
GlassEffectContainer {
    HStack(spacing: 16) {
        Button("Edit", systemImage: "pencil") { }
            .buttonStyle(.glass)
        
        Button("Delete", systemImage: "trash") { }
            .buttonStyle(.glass)
    }
}
```

### Morphing Transitions

```swift
struct ExpandableActions: View {
    @State private var isExpanded = false
    @Namespace private var namespace
    
    var body: some View {
        GlassEffectContainer(spacing: 20) {
            VStack(spacing: 12) {
                if isExpanded {
                    Button("Photo", systemImage: "camera") { }
                        .buttonStyle(.glass)
                        .glassEffectID("photo", in: namespace)
                    
                    Button("Walk", systemImage: "figure.walk") { }
                        .buttonStyle(.glass)
                        .glassEffectID("walk", in: namespace)
                }
                
                Button {
                    withAnimation(.bouncy) { isExpanded.toggle() }
                } label: {
                    Image(systemName: isExpanded ? "xmark" : "plus")
                        .frame(width: 56, height: 56)
                }
                .buttonStyle(.glassProminent)
                .buttonBorderShape(.circle)
                .tint(AppColors.primarySunset)
                .glassEffectID("toggle", in: namespace)
            }
        }
    }
}
```

### Tab View with Accessories

```swift
TabView(selection: $selectedTab) {
    Tab("Home", systemImage: "house", value: 0) {
        HomeView()
    }
    
    Tab("Search", systemImage: "magnifyingglass", value: 1, role: .search) {
        SearchView()
    }
}
.tabBarMinimizeBehavior(.onScrollDown)
.tabViewBottomAccessory {
    if hasActiveCare {
        ActiveCareBar()
    }
}
```

### Glass vs Non-Glass Rule

| Use Glass | Don't Use Glass |
|-----------|-----------------|
| Navigation bars | Pet cards in lists |
| Tab bars | Booking cards |
| Floating action buttons | Message bubbles |
| Sheets/modals | Form sections |
| Bottom accessories | Content backgrounds |

**Rule**: Glass is for navigation layer only. Content stays content.

---

## Design System

> **Token source of truth:** `PRODUCT_SPEC.md` § Design System Reference is the canonical definition of every color, type, spacing, radius, and shadow token (including light **and** dark values). The values shown here must match that table. If they ever diverge, PRODUCT_SPEC wins — update it there, then sync `AppColors.swift`.

### Colors (AppColors.swift)

**Dark mode is required.** The flat `Color(hex:)` constants below only encode the *light* value, which cannot adapt to dark mode. Implement each color as an **asset-catalog Color Set** (with Any/Dark appearances from the PRODUCT_SPEC table) and reference it by name — e.g. `static let primarySunset = Color("PrimarySunset", bundle: .main)`. Keep `Color(hex:)` only for one-off, mode-independent values. The snippet below documents the light-mode hex values for reference; it is not the final implementation.

```swift
import SwiftUI

enum AppColors {
    // Primary - for glass tinting
    static let primarySunset = Color(hex: "#EA580C")        // dark: #FB923C
    static let primaryTerracotta = Color(hex: "#DC2626")    // dark: #F87171
    
    // Secondary
    static let secondarySage = Color(hex: "#059669")        // dark: #34D399
    static let secondaryAmber = Color(hex: "#F59E0B")       // dark: #FCD34D
    static let secondaryPeach = Color(hex: "#FB923C")       // dark: #FED7AA
    
    // Backgrounds (non-glass content)
    static let backgroundPrimary = Color(hex: "#FFFBF5")    // dark: #1A1613
    static let backgroundElevated = Color(hex: "#FFFFFF")   // dark: #27221D
    
    // Text
    static let textPrimary = Color(hex: "#1F1B17")          // dark: #FFFBF5
    static let textSecondary = Color(hex: "#5D4E37")        // dark: #F0D5C1
    static let textTertiary = Color(hex: "#B08968")         // dark: #B08968 (unchanged)
    
    // Border / divider
    static let border = Color(hex: "#FAE5D3")               // dark: #3E342A
    
    // Semantic
    static let success = secondarySage
    static let warning = secondaryAmber
    static let error = primaryTerracotta
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
```

### Typography (Use Apple Defaults)

```swift
.font(.largeTitle)      // 34pt - Hero headlines
.font(.title)           // 28pt - Screen titles
.font(.title2)          // 22pt - Section headers
.font(.headline)        // 17pt semibold - Card titles
.font(.body)            // 17pt - Body text
.font(.subheadline)     // 15pt - Secondary text
.font(.footnote)        // 13pt - Small text
.font(.caption)         // 12pt - Labels, timestamps
```

### Custom Components (Only 2 Needed)

**PawCard** - For content containers (NOT glass):

```swift
struct PawCard<Content: View>: View {
    @ViewBuilder let content: () -> Content
    
    var body: some View {
        content()
            .padding()
            .background(AppColors.backgroundElevated)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(color: .black.opacity(0.08), radius: 8, y: 2)
    }
}
```

**PawTextField** - Styled input:

```swift
struct PawTextField: View {
    let label: String
    @Binding var text: String
    var placeholder: String = ""
    var error: String?
    var isSecure: Bool = false
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(AppColors.textSecondary)
            
            Group {
                if isSecure {
                    SecureField(placeholder, text: $text)
                } else {
                    TextField(placeholder, text: $text)
                }
            }
            .textFieldStyle(.roundedBorder)
            .tint(AppColors.primarySunset)
            
            if let error {
                Text(error)
                    .font(.caption)
                    .foregroundStyle(AppColors.error)
            }
        }
    }
}
```

---

## Supabase Integration

### Client Setup

```swift
// Core/Services/SupabaseClient.swift
import Supabase

class SupabaseClient {
    static let shared = SupabaseClient()
    
    let client: Supabase.SupabaseClient
    
    private init() {
        client = SupabaseClient(
            supabaseURL: URL(string: "YOUR_SUPABASE_URL")!,
            supabaseKey: "YOUR_ANON_KEY"
        )
    }
}
```

### Auth Patterns

```swift
// Sign up
try await client.auth.signUp(email: email, password: password)

// Sign in
try await client.auth.signIn(email: email, password: password)

// Sign in with Apple
try await client.auth.signInWithApple()

// Sign out
try await client.auth.signOut()

// Listen to auth changes
for await state in client.auth.authStateChanges {
    switch state.event {
    case .signedIn: // handle
    case .signedOut: // handle
    default: break
    }
}
```

### Database Queries

```swift
// Fetch
let pets: [Pet] = try await client
    .from("pets")
    .select()
    .eq("owner_id", value: userId)
    .execute()
    .value

// Insert
try await client.from("pets").insert(newPet).execute()

// Update
try await client
    .from("pets")
    .update(["name": "New Name"])
    .eq("id", value: petId)
    .execute()

// Delete
try await client.from("pets").delete().eq("id", value: petId).execute()
```

### Real-time Subscriptions

```swift
let channel = client.channel("care-sessions")

channel.onPostgresChange(
    event: .update,
    schema: "public",
    table: "care_sessions",
    filter: "id=eq.\(sessionId)"
) { payload in
    // Handle update - trigger Live Activity refresh
}

await channel.subscribe()
```

---

## Error Handling

```swift
// Core/Utilities/AppError.swift
enum AppError: LocalizedError {
    case network(underlying: Error)
    case auth(message: String)
    case validation(field: String, message: String)
    case notFound
    case unknown
    
    var errorDescription: String? {
        switch self {
        case .network:
            return "Connection error. Please check your internet."
        case .auth(let message):
            return message
        case .validation(_, let message):
            return message
        case .notFound:
            return "Not found."
        case .unknown:
            return "Something went wrong. Please try again."
        }
    }
}
```

---

## Code Quality Rules

### File Length Limits
- **Views**: Under 150 lines (extract subviews)
- **ViewModels**: Under 200 lines (extract services)
- **Services**: Under 300 lines (split by domain)

### Required Elements

Every View must have:
- [ ] `#Preview` block
- [ ] Loading state handling
- [ ] Error state handling
- [ ] Empty state handling (if applicable)

Every ViewModel must have:
- [ ] `@Observable` class
- [ ] `isLoading` property
- [ ] `error: AppError?` property
- [ ] Async functions using `async/await`

### Naming Conventions

```swift
// Files
FeatureView.swift
FeatureViewModel.swift
FeatureService.swift

// Types
struct FeatureView: View
@Observable class FeatureViewModel
class FeatureService

// Properties
var isLoading: Bool          // 'is' prefix for booleans
var hasCompleted: Bool       // 'has' prefix for booleans
var canSubmit: Bool          // 'can' prefix for booleans
var itemCount: Int           // noun for values

// Functions
func fetchItems() async      // verb for actions
func loadData() async
func submitForm() async
```

---

## Building & Running

### Xcode Build

```bash
# Build for simulator
xcodebuild -scheme PawConnect -destination 'platform=iOS Simulator,name=iPhone 16 Pro' build

# Clean build folder
xcodebuild clean -scheme PawConnect
```

### Add SPM Dependencies

```bash
# In Xcode: File → Add Package Dependencies
# Or in Package.swift:
dependencies: [
    .package(url: "https://github.com/supabase/supabase-swift", from: "2.0.0")
]
```

### Common Issues

**"No such module 'Supabase'"**
- Add SPM package: `https://github.com/supabase/supabase-swift`

**"@Observable requires iOS 17"**
- Update deployment target to iOS 26.0

**Build errors after restructuring**
- Clean build folder: Cmd+Shift+K
- Delete derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData`

---

## Response Format

When generating code, structure your response as:

```
## Task: [What you're building]

### Git Status
- Current branch: `feature/[name]`
- Status: [clean/uncommitted changes]
- Action needed: [none/create branch/commit first]

### Analysis
[If restructuring: what you found, what needs to change]

### Implementation

#### File 1: `Path/To/File.swift` [new]
[code block]

```bash
git add Path/To/File.swift
git commit -m "feat(scope): add [FileName]"
```

#### File 2: `Path/To/AnotherFile.swift` [new]
[code block]

```bash
git add Path/To/AnotherFile.swift
git commit -m "feat(scope): add [AnotherFileName]"
```

#### File 3: `Path/To/Modified.swift` [modified]
[code block or diff]

```bash
git add Path/To/Modified.swift
git commit -m "feat(scope): [what changed]"
```

### Summary
- Files created: [count]
- Files modified: [count]
- Commits made: [count]

### Next Steps
- [ ] Push branch: `git push -u origin feature/[name]`
- [ ] Create PR to `develop` when feature complete
- [What to build next]
```

**Key Point**: Each file change is followed immediately by its commit command. Never batch commits at the end.

---

## Quick Reference

### Starting a Session

```
Read docs/CLAUDE.md completely. Then:
1. Check Git status: which branch am I on?
2. If on main/develop, create a feature branch first
3. Analyze current project structure
4. Report any issues found
5. Wait for confirmation before restructuring
6. Then proceed with [specific task]
```

### Building a New Feature

```
Read PRODUCT_SPEC.md section "[SCREEN-ID]".

Before writing code:
1. Verify I'm on a feature branch (not main/develop)
2. If not, create: git checkout -b feature/[SCREEN-ID]-[name]

Then build with COMMIT AFTER EACH FILE:

1. Create [Feature]View.swift 
   → git commit -m "feat([scope]): add [Feature]View skeleton"
   
2. Add UI elements to View
   → git commit -m "feat([scope]): add form fields to [Feature]View"
   
3. Create [Feature]ViewModel.swift
   → git commit -m "feat([scope]): add [Feature]ViewModel with state"
   
4. Add business logic
   → git commit -m "feat([scope]): implement [action] in ViewModel"
   
5. Add #Preview
   → git commit -m "feat([scope]): add previews for all states"

After completing all commits:
- Push branch: git push -u origin feature/[name]
- Create PR to develop
```

### Restructuring Only

```
Read docs/CLAUDE.md "FIRST TASK: Project Analysis & Git Setup".

1. Check Git branch (must NOT be main/develop)
2. If needed: git checkout -b feature/project-restructure
3. Analyze current structure and report findings
4. Wait for my confirmation before making changes

After confirmation, COMMIT EACH CHANGE:

- Move file → git commit -m "refactor(structure): move [file] to [location]"
- Delete file → git commit -m "chore(cleanup): remove unused [file]"
- Rename file → git commit -m "refactor(structure): rename [old] to [new]"
- Create folder → git commit -m "chore(structure): add [folder] directory"

Each structural change = one commit. This allows easy rollback if needed.
```

### After Completing Any Work

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat([scope]): [description]"

# Push branch
git push -u origin feature/[branch-name]

# Then: Create Pull Request on GitHub → develop
```

---

## Resources

- [Apple Liquid Glass Docs](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass)
- [SwiftUI Glass Effect](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:))
- [Supabase Swift SDK](https://github.com/supabase/supabase-swift)
- [WWDC 2025 Session 323: Build a SwiftUI app with the new design](https://developer.apple.com/videos/play/wwdc2025/323/)

---

**Document Version**: 2.0
**iOS Target**: 26.0+
**Last Updated**: January 2026
