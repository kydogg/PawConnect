# Current Sprint: Foundation Setup

> **Sprint Goal**: Set up project infrastructure, design system, and first two auth screens.

**Sprint Duration**: Week 1
**Last Updated**: January 2026

---

## 🎯 Sprint Objectives

1. ✅ Project structure created
2. ⬜ Supabase project configured
3. ⬜ Design system foundation (AppColors + 3 components)
4. ⬜ Auth screens: Welcome + Sign Up
5. ⬜ Supabase Auth integration

---

## 📋 Task Breakdown

### Phase 1: Project Setup

- [ ] **Create Xcode project**
  - iOS App template
  - SwiftUI lifecycle
  - Bundle ID: `com.yourname.pawconnect`
  - Deployment target: iOS 17.0

- [ ] **Set up folder structure**
  - Create all folders per CLAUDE_INSTRUCTIONS.md
  - Empty files are okay initially

- [ ] **Add dependencies** (Swift Package Manager)
  - `https://github.com/supabase/supabase-swift` (latest)

- [ ] **Configure Supabase**
  - Create project at supabase.com
  - Get project URL and anon key
  - Create `SupabaseClient.swift`
  - Test connection

### Phase 2: Design System

- [ ] **AppColors.swift**
  - All color definitions
  - Color+Hex extension
  - Test in preview

- [ ] **PawButton.swift**
  - Primary, Secondary, Tertiary styles
  - Loading state support
  - Disabled state
  - Preview with all variants

- [ ] **PawCard.swift**
  - Basic card container
  - Shadow and corner radius
  - Preview

- [ ] **PawTextField.swift**
  - Label support
  - Error state
  - Secure text option
  - Preview with states

### Phase 3: Auth Foundation

- [ ] **AuthService.swift**
  - Supabase auth wrapper
  - Sign up, sign in, sign out methods
  - Auth state listener
  - Current user property

- [ ] **AppError.swift**
  - Error enum with cases
  - LocalizedError conformance

- [ ] **RootView.swift**
  - Auth state check
  - Route to Welcome or Home

### Phase 4: Auth Screens

- [ ] **WelcomeView.swift** (AUTH-01)
  - Logo section
  - Tagline
  - Get Started button → Sign Up
  - Sign In link → Sign In
  - Match spec exactly

- [ ] **SignUpView.swift** (AUTH-02)
  - Apple Sign In button
  - Email form (name, email, password)
  - Password requirements display
  - Form validation
  - Loading/error states
  - Navigation to next step

- [ ] **SignUpViewModel.swift**
  - Form state management
  - Validation logic
  - Auth service calls

---

## ✅ Completed

- [x] Product specification document
- [x] Development instructions document
- [x] Sprint planning

---

## 🚧 Blocked / Notes

- **Apple Sign In**: Requires Apple Developer account for testing. Can build UI now, test later.
- **Supabase Apple Auth**: Need to configure in Supabase dashboard after Apple Developer setup.

---

## 📊 Definition of Done

A task is complete when:
1. Code compiles without warnings
2. Previews work in Xcode
3. Matches PRODUCT_SPEC.md requirements
4. Includes all states (loading, error, empty)
5. Works in both light and dark mode

---

## 🔜 Next Sprint Preview

**Sprint 2: Complete Auth Flow**
- Sign In screen (AUTH-03)
- Forgot Password (AUTH-04)
- Role Selection (AUTH-05)
- Owner Onboarding flow (AUTH-06, 07, 08, 09)

---

## 📝 Session Notes

*Add notes here during development sessions*

### Session 1 - [Date]
- 

---

## 🐛 Known Issues

*Track bugs discovered during development*

1. 

---

## 💡 Ideas / Improvements

*Capture ideas that come up but aren't in scope*

1. 
