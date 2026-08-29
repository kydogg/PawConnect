# PawConnect: Complete Product Specification
## Version 1.0 | January 2026

---

# Document Purpose

This specification defines every feature of PawConnect with enough detail that:

1. **A Designer** can create pixel-perfect Figma screens without asking questions
2. **A Frontend Developer** can implement complete UI without ambiguity
3. **A Backend Developer** can build APIs that perfectly serve the frontend
4. **QA** can write acceptance tests from the criteria

Each feature follows this structure:
- **User Story**: Who wants what and why
- **Screen Description**: What the user sees (text only, no mockups)
- **UI Elements**: Every component with exact specifications
- **User Interactions**: What happens when users tap/type/swipe
- **States**: Loading, empty, error, success variations
- **Data Requirements**: What information powers this screen
- **API Contract**: Request/response shapes for backend
- **Acceptance Criteria**: Checklist defining "done"

---

# Design System Reference

> **⭐ Source of truth for design tokens.** This section is the canonical definition of PawConnect's colors, type, spacing, radii, and shadows. Every other document (CLAUDE.md, the Asset Library, images.md) must reference these values rather than redefine them. If a token changes, change it **here first**, then propagate. The runtime implementation lives in `AppColors.swift`; this table is what that file must match.

All specifications reference these tokens. Designers and developers must use these exact values.

## Colors

| Token Name | Light Mode | Dark Mode | Usage |
|------------|-----------|-----------|-------|
| `primarySunset` | #EA580C | #FB923C | Primary buttons, links, active states |
| `primaryTerracotta` | #DC2626 | #F87171 | Pressed states, destructive actions |
| `secondarySage` | #059669 | #34D399 | Success states, trust indicators, checkmarks |
| `secondaryAmber` | #F59E0B | #FCD34D | Warnings, star ratings |
| `secondaryPeach` | #FB923C | #FED7AA | Secondary highlights |
| `backgroundPrimary` | #FFFBF5 | #1A1613 | Screen backgrounds |
| `backgroundElevated` | #FFFFFF | #27221D | Cards, sheets, modals |
| `textPrimary` | #1F1B17 | #FFFBF5 | Headlines, primary content |
| `textSecondary` | #5D4E37 | #F0D5C1 | Body text, descriptions |
| `textTertiary` | #B08968 | #B08968 | Placeholders, disabled text |
| `border` | #FAE5D3 | #3E342A | Input borders, dividers |

## Typography

> **Implementation note:** The point sizes below express **design intent** — the visual hierarchy the designer is targeting. **Do not hardcode these point sizes in SwiftUI.** Implement each token with the mapped semantic font so the app respects Dynamic Type (accessibility text sizing). The pt/line-height columns are for Figma and design review, not for `.font(.system(size:))`.

| Token Name | Design Intent | Weight | SwiftUI Font (use this) | Usage |
|------------|------|--------|-------------------------|-------|
| `displayLarge` | 34pt | Bold (700) | `.largeTitle.weight(.bold)` | Hero headlines, welcome screens |
| `headingH1` | 24pt | Bold (700) | `.title.weight(.bold)` | Screen titles |
| `headingH2` | 20pt | Semibold (600) | `.title2.weight(.semibold)` | Section headers |
| `headingH3` | 17pt | Semibold (600) | `.headline` | Card titles, emphasized text |
| `bodyLarge` | 17pt | Regular (400) | `.body` | Primary body text |
| `bodyRegular` | 15pt | Regular (400) | `.subheadline` | Secondary body text |
| `bodySmall` | 13pt | Regular (400) | `.footnote` | Captions, metadata |
| `buttonLarge` | 17pt | Semibold (600) | `.headline` | Primary button labels |
| `buttonSmall` | 15pt | Medium (500) | `.subheadline.weight(.medium)` | Secondary button labels |
| `caption` | 12pt | Regular (400) | `.caption` | Timestamps, labels, fine print |

## Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `xxs` | 2pt | Hairline gaps |
| `xs` | 4pt | Tight element spacing |
| `sm` | 8pt | Compact spacing |
| `md` | 16pt | Standard spacing between elements |
| `lg` | 24pt | Section padding, comfortable gaps |
| `xl` | 32pt | Large section spacing |
| `xxl` | 48pt | Screen section breaks |

## Corner Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `radiusSm` | 8pt | Input fields, small buttons |
| `radiusMd` | 12pt | Cards, primary buttons |
| `radiusLg` | 16pt | Bottom sheets, large cards |
| `radiusFull` | 9999pt | Circular avatars, pills |

## Shadows

| Token Name | Specification | Usage |
|------------|---------------|-------|
| `shadowCard` | 0 2pt 8pt rgba(0,0,0,0.08) | Cards, elevated surfaces |
| `shadowFloat` | 0 4pt 16pt rgba(0,0,0,0.12) | Floating elements, dropdowns |
| `shadowModal` | 0 8pt 24pt rgba(0,0,0,0.16) | Modals, bottom sheets |

## Standard Components

| Component | Height | Radius | Notes |
|-----------|--------|--------|-------|
| Primary Button | 56pt | 12pt | Gradient fill: primarySunset to secondaryPeach |
| Secondary Button | 56pt | 12pt | 2pt border primarySunset, transparent fill |
| Tertiary Button | 44pt | none | Text only, primarySunset color |
| Text Input | 48pt | 8pt | 1pt border, 16pt horizontal padding |
| Card | auto | 12pt | Elevated background, card shadow |
| Avatar Small | 40pt | 20pt (circular) | Profile thumbnails |
| Avatar Medium | 60pt | 30pt (circular) | List items |
| Avatar Large | 100pt | 50pt (circular) | Profile headers |

---

# EPIC 1: Authentication & Onboarding

## Epic Overview

**Goal**: Get users signed up, select their role, and complete initial profile setup in under 3 minutes.

**Success Metrics**:
- Sign-up completion rate > 80%
- Onboarding completion rate > 70%
- Time to first booking < 24 hours

---

## AUTH-01: Welcome Screen

### User Story
As a new user opening the app for the first time, I want to understand what PawConnect does and easily start creating an account, so that I can begin finding pet care or offering my services.

### Screen Description
A branded landing screen that establishes trust and provides clear paths to sign up or sign in. The screen features the PawConnect logo, a welcoming tagline, and two prominent call-to-action buttons.

### UI Elements

**Navigation Bar**: None (full-screen experience)

**Logo Section** (positioned in upper third of screen):
- Logo icon: 48x48pt square with 12pt radius, filled with primarySunset, containing a white paw print icon
- App name: "PawConnect" in displayLarge, textPrimary color, centered below logo with sm spacing
- Tagline: "Peace of mind, one paw at a time" in bodyLarge, textSecondary color, centered below app name with xs spacing

**Illustration Area** (positioned in middle third):
- Placeholder for custom illustration showing a happy pet owner, pet, and sitter
- Dimensions: Full width, 200pt height
- Fallback: Gradient background using primarySunset at 10% opacity

**Action Buttons** (positioned in lower third, lg padding from screen edges):
- Primary button: "Get Started" - full width, PrimaryButtonStyle
- Secondary button: "I already have an account" - full width, SecondaryButtonStyle, md spacing below primary

**Footer** (positioned xl from bottom safe area):
- Legal links: "Terms" and "Privacy" separated by " · " in caption, textTertiary, centered
- Both links are tappable with primarySunset color on press

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| "Get Started" button | Tap | Navigate to AUTH-02 Sign Up screen |
| "I already have an account" button | Tap | Navigate to AUTH-03 Sign In screen |
| "Terms" link | Tap | Open Terms of Service in in-app browser |
| "Privacy" link | Tap | Open Privacy Policy in in-app browser |

### States
This screen has only one state (default). No loading, error, or empty states apply.

### Data Requirements
None - this is a static screen.

### API Contract
None required.

### Acceptance Criteria
- [ ] Logo displays correctly in both light and dark mode
- [ ] Both buttons span full width with lg horizontal margins
- [ ] Tapping "Get Started" navigates to Sign Up
- [ ] Tapping "I already have an account" navigates to Sign In
- [ ] Legal links open correct URLs in in-app browser
- [ ] Screen adapts to all iPhone sizes (SE to Pro Max)
- [ ] Safe area insets are respected

---

## AUTH-02: Sign Up Screen

### User Story
As a new user, I want to create an account using my email or Apple ID, so that I can access PawConnect's features.

### Screen Description
A registration form offering Apple Sign In as the primary method with email registration as an alternative. The form collects name, email, and password with real-time validation feedback.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left icon, primarySunset color, 44pt tap target, left-aligned
- Title: None (title is in content area)

**Header Section** (xl below navigation):
- Title: "Create Account" in displayLarge, textPrimary
- Subtitle: "Join our community of pet lovers" in bodyLarge, textSecondary, sm below title

**Apple Sign In Section** (xl below header):
- Apple Sign In button: System SignInWithAppleButton, 56pt height, full width, radiusMd
- Style: .black in light mode, .white in dark mode

**Divider** (lg below Apple button):
- Horizontal line: 1pt height, border color, with "or" text centered
- "or" text: caption, textTertiary, md horizontal padding with backgroundPrimary fill

**Email Form Section** (lg below divider):

Field 1 - Full Name:
- Label: "Full Name" in bodySmall medium weight, textSecondary
- Input: PawTextField, placeholder "Your name"
- Keyboard: default with auto-capitalization words
- Content type: name

Field 2 - Email (md below Field 1):
- Label: "Email" in bodySmall medium weight, textSecondary
- Input: PawTextField, placeholder "you@example.com"
- Keyboard: emailAddress
- Content type: emailAddress
- Auto-capitalization: none

Field 3 - Password (md below Field 2):
- Label: "Password" in bodySmall medium weight, textSecondary
- Input: SecureField with visibility toggle, placeholder "At least 8 characters"
- Visibility toggle: eye icon (eye.slash when visible), textTertiary, right side of field
- Content type: newPassword

**Password Requirements** (sm below password field):
- Two inline indicators showing requirement status
- Format: checkmark/x icon + requirement text in caption
- "8+ characters": secondarySage checkmark when met, textTertiary x when not
- "1 number": secondarySage checkmark when met, textTertiary x when not

**Submit Button** (xl below requirements):
- "Create Account" - PrimaryButtonStyle, full width
- Disabled state: 60% opacity when form invalid

**Legal Footer** (md below button):
- Text: "By signing up, you agree to our Terms of Service and Privacy Policy"
- Style: caption, textTertiary, center-aligned
- "Terms of Service" and "Privacy Policy" are tappable links in primarySunset

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Navigate back to AUTH-01 Welcome |
| Apple Sign In | Tap | Trigger Apple authentication flow |
| Name field | Type | Update name value, no validation |
| Email field | Type | Validate email format on blur |
| Email field | Blur with invalid email | Show red border, display "Please enter a valid email" below field |
| Password field | Type | Update requirements indicators in real-time |
| Visibility toggle | Tap | Toggle between SecureField and TextField |
| Create Account button | Tap (valid form) | Submit registration, show loading state |
| Create Account button | Tap (invalid form) | Nothing (button disabled) |
| Terms/Privacy links | Tap | Open respective URL in in-app browser |

### States

**Default State**:
- Empty form fields
- Requirements show x icons in textTertiary
- Create Account button disabled (60% opacity)

**Filling State**:
- Fields contain user input
- Requirements update as password changes
- Button enables when: name ≥ 2 chars AND valid email AND password meets requirements

**Loading State** (after submit):
- Create Account button shows spinner, text hidden
- All form fields disabled
- Back button disabled

**Error State** (API returns error):
- PawAlert appears below header: error type, error message
- Alert style: backgroundElevated with 2pt left border in primaryTerracotta
- Form re-enabled for correction

**Apple Auth Loading**:
- After Apple sheet dismisses, show full-screen loading overlay
- Centered spinner with "Creating your account..." text below

### Data Requirements

**Form Data**:
- name: string, min 2 characters
- email: string, valid email format
- password: string, min 8 characters, at least 1 number

### API Contract

**Email Sign Up**:
```
Endpoint: auth:signUpWithEmail (Supabase)

Request:
{
  name: string,
  email: string,
  password: string
}

Success Response:
{
  userId: string,
  token: string,
  isNewUser: true
}

Error Responses:
- EMAIL_EXISTS: "An account with this email already exists"
- INVALID_EMAIL: "Please enter a valid email address"
- WEAK_PASSWORD: "Password does not meet requirements"
- RATE_LIMITED: "Too many attempts. Please try again later."
```

**Apple Sign Up**:
```
Endpoint: auth:signUpWithApple (Supabase)

Request:
{
  appleUserId: string,
  email: string | null,
  fullName: string | null,
  identityToken: string
}

Success Response:
{
  userId: string,
  token: string,
  isNewUser: boolean
}

Error Responses:
- INVALID_TOKEN: "Authentication failed. Please try again."
- APPLE_ERROR: "Could not connect to Apple. Please try again."
```

### Acceptance Criteria
- [ ] Apple Sign In button matches Apple HIG requirements
- [ ] Email validation shows error on blur, not while typing
- [ ] Password requirements update in real-time as user types
- [ ] Form cannot be submitted until all validations pass
- [ ] Loading state disables all inputs and shows spinner
- [ ] API errors display in alert banner with clear message
- [ ] Successful email signup navigates to AUTH-05 Role Selection
- [ ] Successful Apple signup (new user) navigates to AUTH-05 Role Selection
- [ ] Successful Apple signup (existing user) navigates to Home
- [ ] Token is stored securely in Keychain after successful auth
- [ ] Back button returns to Welcome screen

---

## AUTH-03: Sign In Screen

### User Story
As a returning user, I want to sign in with my existing credentials, so that I can access my account and bookings.

### Screen Description
A streamlined login form with Apple Sign In and email/password options. Includes forgot password link for account recovery.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left icon, primarySunset color, left-aligned

**Header Section** (xl below navigation):
- Title: "Welcome Back" in displayLarge, textPrimary
- Subtitle: "Sign in to continue caring for your pets" in bodyLarge, textSecondary

**Apple Sign In Section** (xl below header):
- Apple Sign In button: Same specification as AUTH-02

**Divider** (lg below Apple button):
- Same specification as AUTH-02

**Email Form Section** (lg below divider):

Field 1 - Email:
- Input: PawTextField, placeholder "Email"
- No label (cleaner returning user experience)
- Keyboard: emailAddress
- Auto-capitalization: none

Field 2 - Password (md below Field 1):
- Input: SecureField with visibility toggle, placeholder "Password"
- No label

**Forgot Password Link** (sm below password, right-aligned):
- Text: "Forgot password?" in buttonSmall, primarySunset
- Tap target: 44pt minimum height

**Submit Button** (xl below forgot password):
- "Sign In" - PrimaryButtonStyle, full width

**Sign Up Link** (centered, xl from bottom safe area):
- Text: "Don't have an account? " in bodyRegular, textSecondary
- "Sign Up" in bodyRegular semibold, primarySunset, tappable

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Navigate back to AUTH-01 Welcome |
| Apple Sign In | Tap | Trigger Apple authentication flow |
| Email field | Type | Update email value |
| Password field | Type | Update password value |
| Forgot password | Tap | Navigate to AUTH-04 Forgot Password |
| Sign In button | Tap (both fields filled) | Submit login, show loading |
| Sign Up link | Tap | Navigate to AUTH-02 Sign Up |

### States

**Default State**:
- Empty fields
- Sign In button disabled

**Valid State**:
- Both fields have content (any content)
- Sign In button enabled

**Loading State**:
- Button shows spinner
- Fields disabled

**Error States**:

Invalid Credentials:
- PawAlert: "Invalid email or password. Please try again."
- Fields cleared, refocused on email

Account Locked:
- PawAlert: "Too many failed attempts. Please try again in 15 minutes or reset your password."
- "reset your password" is tappable link

Network Error:
- PawAlert: "Connection error. Please check your internet and try again."
- Retry button in alert

### Data Requirements

**Form Data**:
- email: string
- password: string

### API Contract

```
Endpoint: auth:signIn (Supabase)

Request:
{
  email: string,
  password: string
}

Success Response:
{
  userId: string,
  token: string,
  user: {
    name: string,
    email: string,
    role: "owner" | "sitter" | "both",
    hasCompletedOnboarding: boolean
  }
}

Error Responses:
- INVALID_CREDENTIALS: "Invalid email or password"
- ACCOUNT_LOCKED: "Account locked due to too many failed attempts"
- EMAIL_NOT_VERIFIED: "Please verify your email before signing in"
```

### Acceptance Criteria
- [ ] Form submits when both fields have any content
- [ ] Invalid credentials error clears password field only
- [ ] Account locked error shows time remaining and reset link
- [ ] Successful login stores token in Keychain
- [ ] Successful login navigates based on user.hasCompletedOnboarding:
  - [ ] If false: Navigate to AUTH-05 Role Selection
  - [ ] If true: Navigate to Home (Owner or Sitter based on role)
- [ ] "Sign Up" link navigates to AUTH-02
- [ ] "Forgot password" navigates to AUTH-04

---

## AUTH-04: Forgot Password Screen

### User Story
As a user who forgot my password, I want to request a password reset link, so that I can regain access to my account.

### Screen Description
A simple form to request a password reset email. After submission, shows a confirmation screen with instructions.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left icon, primarySunset color

**Content Section** (xl below navigation):
- Title: "Reset Password" in displayLarge, textPrimary
- Subtitle: "Enter your email and we'll send you a link to reset your password" in bodyLarge, textSecondary, center-aligned

**Form Section** (xl below subtitle):

Email Field:
- Label: "Email" in bodySmall medium weight, textSecondary
- Input: PawTextField, placeholder "you@example.com"
- Keyboard: emailAddress

**Submit Button** (xl below field):
- "Send Reset Link" - PrimaryButtonStyle, full width

**Sign In Link** (centered, xl from bottom safe area):
- Text: "Remember your password? " in bodyRegular, textSecondary
- "Sign In" in bodyRegular semibold, primarySunset

### Success State (AUTH-04b)

After successful submission, replace form content with:

**Icon**: Mail icon (envelope), 80pt, primarySunset, centered

**Title** (lg below icon): "Check Your Email" in displayLarge, textPrimary, centered

**Message** (md below title): "We've sent a password reset link to [email]. Didn't receive it? Check your spam folder or try again." in bodyLarge, textSecondary, center-aligned
- [email] is replaced with the submitted email

**Buttons** (xl below message):
- Primary: "Open Email App" - PrimaryButtonStyle, opens system email
- Secondary: "Resend Email" - SecondaryButtonStyle, md below primary
- Resend disabled for 60 seconds after send, shows countdown

**Close Button**: X icon in navigation bar, navigates to AUTH-03 Sign In

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Navigate to AUTH-03 Sign In |
| Email field | Type | Update value, validate format on blur |
| Send Reset Link | Tap (valid email) | Submit request, show loading |
| Open Email App | Tap | Open system default email app |
| Resend Email | Tap (enabled) | Resend request, restart 60s timer |
| Close (X) button | Tap | Navigate to AUTH-03 Sign In |

### States

**Default**: Empty field, button disabled
**Valid**: Valid email format, button enabled
**Loading**: Spinner in button
**Success**: Show AUTH-04b confirmation screen
**Error**: Alert with message (rare - backend always returns success for security)

### API Contract

```
Endpoint: auth:requestPasswordReset (Supabase)

Request:
{
  email: string
}

Response (always success for security):
{
  success: true,
  message: "If an account exists with this email, a reset link has been sent."
}

Backend Logic:
- If email exists: Send reset email with token valid for 1 hour
- If email doesn't exist: Do nothing (don't reveal account existence)
- Rate limit: 3 requests per email per hour
```

### Acceptance Criteria
- [ ] Form validates email format before enabling button
- [ ] Submit always shows success (security requirement)
- [ ] Success screen shows submitted email address
- [ ] "Open Email App" opens system email client
- [ ] Resend button disabled for 60 seconds with visible countdown
- [ ] Close button returns to Sign In screen

---

## AUTH-05: Role Selection Screen

### User Story
As a new user, I want to specify whether I'm a pet owner, sitter, or both, so that the app shows me relevant features and completes the appropriate onboarding.

### Screen Description
A selection screen with three large tappable cards representing user roles. Only one can be selected at a time. Selection determines which onboarding flow follows.

### UI Elements

**Navigation Bar**: None (no back button - can't go back from here)

**Header Section** (xxl below safe area):
- Title: "How will you use PawConnect?" in displayLarge, textPrimary, center-aligned
- Subtitle: "You can change this anytime in settings" in bodyRegular, textSecondary, center-aligned, sm below title

**Role Cards Section** (xl below header):

Three role cards, each with md spacing between:

**Card 1 - Pet Owner**:
- Icon: Heart icon, 24pt
- Title: "Pet Owner" in headingH3, textPrimary
- Description: "Find trusted sitters for your furry family" in bodySmall, textSecondary
- Selection indicator: Circle on right side (empty when unselected, checkmark when selected)

**Card 2 - Pet Sitter**:
- Icon: Hand raised icon, 24pt
- Title: "Pet Sitter" in headingH3, textPrimary
- Description: "Earn money caring for pets you love" in bodySmall, textSecondary
- Selection indicator: Same as above

**Card 3 - Both**:
- Icon: Arrow left-right icon, 24pt
- Title: "Both" in headingH3, textPrimary
- Description: "Care for pets and find sitters too" in bodySmall, textSecondary
- Selection indicator: Same as above

**Card Specifications**:
- Container: PawCard with md padding
- Layout: Horizontal - icon left, text center, indicator right
- Icon container: 40pt circle, secondaryPeach background (unselected) or primarySunset (selected)
- Icon color: textSecondary (unselected) or white (selected)
- Selection indicator: 24pt circle, border color when empty, primarySunset fill with white checkmark when selected
- Selected card: 2pt primarySunset border, icon container filled primarySunset

**Continue Button** (xl from bottom safe area):
- "Continue" - PrimaryButtonStyle, full width
- Disabled (60% opacity) until a role is selected

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Role card | Tap | Select this role, deselect others |
| Continue button | Tap (role selected) | Save role, navigate to appropriate onboarding |

### Navigation Logic

| Selected Role | Next Screen |
|---------------|-------------|
| Pet Owner | AUTH-06 Owner Onboarding: Location |
| Pet Sitter | AUTH-10 Sitter Onboarding: Service Area |
| Both | AUTH-06 Owner Onboarding: Location (then sitter after) |

### States

**Default**: No selection, Continue disabled
**Selected**: One card highlighted, Continue enabled
**Loading**: After Continue tap, show spinner in button

### API Contract

```
Endpoint: users:updateRole (Supabase)

Request:
{
  role: "owner" | "sitter" | "both"
}

Response:
{
  success: true,
  user: User
}
```

### Acceptance Criteria
- [ ] Only one role can be selected at a time
- [ ] Visual feedback on selection is immediate
- [ ] Continue button only enables when a role is selected
- [ ] Role is saved to user profile on Continue
- [ ] Correct onboarding flow starts based on selection
- [ ] "Both" users complete owner onboarding first, then sitter onboarding

---

## AUTH-06: Owner Onboarding - Location

### User Story
As a new pet owner, I want to set my location, so that I can find sitters near me.

### Screen Description
First step of owner onboarding. Captures user's location via GPS or manual address entry. Features a progress indicator showing step 1 of 3.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left icon, primarySunset (returns to role selection)
- Skip button: "Skip" in buttonSmall, primarySunset, right side

**Progress Indicator** (md below navigation):
- Three segments, horizontal, full width with lg horizontal padding
- Each segment: Capsule shape, 4pt height
- Segment 1: primarySunset (active)
- Segments 2-3: border color (inactive)
- Step label: "Step 1 of 3" in caption, textTertiary, centered below segments

**Header Section** (xl below progress):
- Title: "Where are you located?" in headingH1, textPrimary
- Subtitle: "We'll use this to find pet sitters near you" in bodyRegular, textSecondary, sm below

**Location Button** (xl below header):
- Style: SecondaryButtonStyle, full width
- Icon: location.fill SF Symbol, left of text
- Text: "Use Current Location"

**Divider** (lg below location button):
- Same as AUTH-02 divider with "or"

**Address Form** (lg below divider):

Field 1 - Street Address:
- Label: "Street Address" in bodySmall medium, textSecondary
- Input: PawTextField, placeholder "123 Main Street"
- Keyboard: default

Field 2 - City (md below):
- Label: "City"
- Input: PawTextField, placeholder "San Francisco"

Field 3 - ZIP Code (md below):
- Label: "ZIP Code"
- Input: PawTextField, placeholder "94102"
- Keyboard: numberPad

**Next Button** (xl from bottom safe area):
- "Next" - PrimaryButtonStyle, full width
- Disabled until location obtained (GPS) or all address fields filled

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Return to AUTH-05 Role Selection |
| Skip button | Tap | Skip to AUTH-07 without location (can add later) |
| Use Current Location | Tap | Request location permission |
| Address fields | Fill all | Enable Next button |
| Next button | Tap | Geocode address if manual, save location, proceed |

### Location Permission Flow

1. User taps "Use Current Location"
2. If permission not yet requested: System permission dialog appears
3. If permission granted: 
   - Show loading spinner in location button
   - Get coordinates
   - Reverse geocode to address
   - Auto-fill address fields
   - Enable Next button
4. If permission denied:
   - Show inline message: "Location access denied. Please enter your address manually."
   - User must fill form manually

### States

**Default**: Empty form, Next disabled, location button enabled
**Location Loading**: Spinner in location button, button disabled
**Location Success**: Address fields auto-filled, Next enabled
**Location Denied**: Message shown, form must be filled manually
**Form Valid**: All fields filled, Next enabled
**Saving**: Spinner in Next button

### Data Requirements

**Location Data**:
- address: string (street address)
- city: string
- zipCode: string
- latitude: number (from GPS or geocoding)
- longitude: number (from GPS or geocoding)

### API Contract

```
Endpoint: users:updateLocation (Supabase)

Request:
{
  address: string,
  city: string,
  zipCode: string,
  latitude: number,
  longitude: number
}

Response:
{
  success: true,
  formattedAddress: string
}
```

**Geocoding**: Use Apple MapKit geocoding to convert address to coordinates if entered manually.

### Acceptance Criteria
- [ ] Progress indicator shows step 1 of 3 highlighted
- [ ] Location permission request follows Apple guidelines
- [ ] GPS location auto-fills address fields via reverse geocoding
- [ ] Manual address entry validates all fields are non-empty
- [ ] Manual address is geocoded to coordinates before saving
- [ ] Skip button allows proceeding without location
- [ ] Next button saves location and navigates to AUTH-07
- [ ] Back button returns to role selection

---

## AUTH-07: Owner Onboarding - Add Pet

### User Story
As a new pet owner, I want to add my first pet's basic information, so that sitters know who they'll be caring for.

### Screen Description
Second step of owner onboarding. Collects pet basics: photo, name, species, breed, age, and weight. Simple form with species selection as visual toggle.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Skip button: "Skip" in buttonSmall, primarySunset

**Progress Indicator**:
- Segments 1-2: primarySunset (active)
- Segment 3: border (inactive)
- Label: "Step 2 of 3"

**Header** (xl below progress):
- Title: "Tell us about your pet" in headingH1, textPrimary

**Photo Picker** (xl below header, centered):
- Container: 100pt circle, dashed 2pt border in border color
- Content: Camera icon (camera.fill), 32pt, textTertiary
- Label below: "Add a photo" in caption, textSecondary, sm below circle
- When photo added: Show image in circle, label changes to "Change photo"

**Form Section** (xl below photo):

Field 1 - Pet's Name:
- Label: "Pet's Name" in bodySmall medium, textSecondary
- Input: PawTextField, placeholder "Buddy"
- Required field

Field 2 - Pet Type (md below):
- Label: "What type of pet?"
- Three toggle buttons in horizontal stack, sm spacing:
  - Button 1: Dog icon (dog emoji or SF symbol) + "Dog"
  - Button 2: Cat icon + "Cat"
  - Button 3: Paw icon + "Other"
- Button style: 
  - Unselected: backgroundElevated fill, textSecondary text, radiusSm
  - Selected: primarySunset fill, white text
- Only one can be selected

Field 3 - Breed (md below):
- Label: "Breed (optional)"
- Input: Picker/dropdown that opens breed selection sheet
- Placeholder: "Select breed"
- List filtered by pet type (dog breeds, cat breeds, or free text for other)

Field 4 - Age (md below):
- Label: "Age"
- Input: Picker with options: "Puppy/Kitten (< 1 year)", "1 year", "2 years", ... "15+ years"
- Required field

Field 5 - Weight (md below):
- Label: "Weight (optional)"
- Input: Picker with ranges: "Under 10 lbs", "10-25 lbs", "25-50 lbs", "50-75 lbs", "75-100 lbs", "Over 100 lbs"

**Next Button** (xl from bottom):
- "Next" - PrimaryButtonStyle, full width
- Disabled until: name filled AND pet type selected AND age selected

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Photo circle | Tap | Open photo picker (camera or library choice) |
| Pet type button | Tap | Select type, deselect others, update breed list |
| Breed field | Tap | Open breed selection sheet |
| Next button | Tap | Save pet, navigate to AUTH-08 |
| Skip button | Tap | Skip to home without adding pet |

### Breed Selection Sheet

- Searchable list
- For dogs: AKC recognized breeds + "Mixed breed" + "Other"
- For cats: Common breeds + "Domestic Shorthair/Longhair" + "Mixed" + "Other"
- For other: Free text input field

### States

**Default**: Empty form, Next disabled
**Photo Selected**: Show image thumbnail in circle
**Form Valid**: Required fields filled, Next enabled
**Saving**: Spinner in Next button

### Data Requirements

**Pet Data**:
- avatarUrl: string | null (uploaded image URL)
- name: string (required)
- species: "dog" | "cat" | "other" (required)
- breed: string | null
- age: number (required, in years, 0 for under 1)
- weight: number | null (in lbs, use midpoint of range)

### API Contract

```
Endpoint: pets:create (Supabase)

Request:
{
  name: string,
  species: "dog" | "cat" | "other",
  breed: string | null,
  age: number,
  weight: number | null,
  avatarUrl: string | null
}

Response:
{
  petId: string,
  pet: Pet
}

Image Upload (separate):
Endpoint: storage:uploadImage (Supabase)
Request: File data
Response: { url: string }
```

### Acceptance Criteria
- [ ] Photo picker offers camera and library options
- [ ] Only one pet type can be selected
- [ ] Breed list filters based on selected pet type
- [ ] Form requires name, type, and age to proceed
- [ ] Skip allows proceeding without adding a pet
- [ ] Pet data saves correctly to database
- [ ] Navigation proceeds to AUTH-08 Pet Details

---

## AUTH-08: Owner Onboarding - Pet Care Details

### User Story
As a new pet owner, I want to add my pet's medication and feeding schedules, so that sitters know exactly how to care for them and this information powers the Live Activities checklist.

### Screen Description
Final step of owner onboarding. Collects detailed care information: medications, feeding schedule, and special instructions. This data is critical as it auto-generates the care checklist for Live Activities.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Skip button: "Skip"

**Progress Indicator**:
- All 3 segments: primarySunset
- Label: "Step 3 of 3"

**Header** (xl below progress):
- Title: "[Pet Name]'s Care Details" in headingH1 (dynamically insert pet name)
- Subtitle: "Help sitters take the best care of [Pet Name]" in bodyRegular, textSecondary

**Section 1 - Medications** (xl below header):

Section card (PawCard):
- Header row: Pill emoji + "Medications" in headingH3
- Question: "Does [Pet Name] take any medications?" in bodyRegular
- Radio options (vertical, md spacing):
  - "No medications" - radio button + label
  - "Yes, add medications" - radio button + label

If "Yes" selected, expand to show:
- Medication entry form (can add multiple)
- Each medication has:
  - Name field: PawTextField, placeholder "Medication name"
  - Dosage field: PawTextField, placeholder "e.g., 1 tablet, 10mg"
  - Frequency picker: "Once daily", "Twice daily", "Three times daily", "Weekly", "As needed"
  - Time picker(s): Based on frequency (e.g., twice daily shows two time pickers)
  - Instructions field: PawTextField, placeholder "e.g., Give with food"
  - Delete button: Trash icon, primaryTerracotta, only if multiple medications
- "Add another medication" button: TertiaryButtonStyle, plus icon + text

**Section 2 - Feeding Schedule** (lg below medications):

Section card (PawCard):
- Header row: Food emoji + "Feeding Schedule" in headingH3
- Feeding entries (at least one required):
  - Each entry has:
    - Label picker: "Morning", "Midday", "Afternoon", "Evening", "Night"
    - Time picker: Hour:Minute AM/PM
    - Amount field: PawTextField, placeholder "e.g., 1 cup"
    - Food type field: PawTextField, placeholder "e.g., Dry kibble"
    - Delete button: Trash icon (only if multiple entries)
- "Add feeding time" button: TertiaryButtonStyle

**Section 3 - Special Instructions** (lg below feeding):

Section card (PawCard):
- Header row: Note emoji + "Special Instructions" in headingH3
- Prompt: "Anything else sitters should know?" in bodyRegular, textSecondary
- Text input: Multi-line TextEditor, 100pt minimum height, placeholder "e.g., Buddy is shy at first but warms up quickly. He loves belly rubs!"

**Complete Button** (xl from bottom):
- "Complete Setup" - PrimaryButtonStyle, full width
- Enabled when at least one feeding entry exists

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Medication radio | Tap "Yes" | Expand medication form |
| Medication radio | Tap "No" | Collapse medication form |
| Add medication | Tap | Add new blank medication entry |
| Delete medication | Tap | Remove medication entry (confirm if only one) |
| Add feeding time | Tap | Add new blank feeding entry |
| Delete feeding | Tap | Remove feeding entry (min 1 required) |
| Complete Setup | Tap | Save all data, navigate to success screen |

### States

**Default**: No medications selected, one empty feeding entry
**Medications Expanded**: Shows medication form with at least one entry
**Valid**: At least one feeding entry with all fields filled
**Saving**: Spinner in Complete button

### Data Requirements

**Care Details**:
```
medications: Array<{
  name: string,
  dosage: string,
  frequency: "once_daily" | "twice_daily" | "three_times_daily" | "weekly" | "as_needed",
  times: string[],  // ["08:00", "20:00"] in 24hr format
  instructions: string | null
}>

feedingSchedule: Array<{
  label: "morning" | "midday" | "afternoon" | "evening" | "night",
  time: string,  // "08:00" in 24hr format
  amount: string,
  foodType: string
}>

specialInstructions: string | null
```

### API Contract

```
Endpoint: pets:updateCareDetails (Supabase)

Request:
{
  petId: string,
  medications: Medication[],
  feedingSchedule: FeedingEntry[],
  specialInstructions: string | null
}

Response:
{
  success: true,
  pet: Pet
}
```

### Acceptance Criteria
- [ ] Pet name displays dynamically in header and prompts
- [ ] Medication section expands/collapses based on radio selection
- [ ] Can add multiple medications with all required fields
- [ ] Time pickers appear based on frequency selection
- [ ] At least one feeding entry is required
- [ ] Can add multiple feeding entries
- [ ] Special instructions is optional
- [ ] Complete Setup saves all data and navigates to AUTH-09
- [ ] Skip allows completing without care details (can add later)
- [ ] Data structure matches what Live Activities needs for checklist generation

---

## AUTH-09: Onboarding Success

### User Story
As a user who just completed onboarding, I want to see confirmation that my setup is complete, so that I feel confident starting to use the app.

### Screen Description
A celebratory confirmation screen showing the user's pet card and providing clear next steps. Auto-advances to home after a few seconds or on button tap.

### UI Elements

**Navigation Bar**: None

**Celebration Section** (centered, xxl from top):
- Icon: Party popper emoji or confetti icon, 80pt
- Animation: Subtle bounce or confetti particle effect on appear

**Title** (lg below icon):
- "You're all set!" in displayLarge, textPrimary, centered

**Subtitle** (sm below title):
- "[Pet Name] is ready to be matched with amazing pet sitters" in bodyLarge, textSecondary, centered

**Pet Card** (xl below subtitle):
- PawCard, centered, auto-width based on content
- Contains:
  - Pet avatar: 80pt circle
  - Pet name: headingH2, centered below avatar
  - Breed: bodyRegular, textSecondary, centered

**Action Buttons** (xl from bottom):
- Primary: "Find a Sitter" - PrimaryButtonStyle, full width
- Secondary: "Add Another Pet" - SecondaryButtonStyle, md below primary

### Animations

**On Appear**:
1. Background fades in (0.2s)
2. Icon scales from 0.5 to 1.0 with bounce (0.4s, 0.1s delay)
3. Title and subtitle fade in (0.3s, 0.3s delay)
4. Pet card slides up from bottom (0.3s, 0.4s delay)
5. Buttons fade in (0.3s, 0.5s delay)

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Find a Sitter | Tap | Navigate to Search home screen |
| Add Another Pet | Tap | Navigate to AUTH-07 to add another pet |
| Auto-advance | 8 seconds no interaction | Navigate to Home |

### States

This screen has one primary state. If user has role "both", after completing owner onboarding, tapping "Find a Sitter" should show a brief message that sitter onboarding will happen next, then navigate to AUTH-10.

### API Contract

```
Endpoint: users:completeOnboarding (Supabase)

Request:
{
  onboardingType: "owner"
}

Response:
{
  success: true,
  user: User  // hasCompletedOnboarding: true
}
```

### Acceptance Criteria
- [ ] Celebration animation plays on screen appear
- [ ] Pet name and photo display correctly from just-added pet
- [ ] "Find a Sitter" navigates to Search screen
- [ ] "Add Another Pet" returns to pet creation flow
- [ ] If user role is "both", proceed to sitter onboarding after
- [ ] User's hasCompletedOnboarding flag is set to true

---

## AUTH-10: Sitter Onboarding - Service Area

### User Story
As a new pet sitter, I want to set my location and how far I'm willing to travel, so that I only receive booking requests I can fulfill.

### Screen Description
First step of sitter onboarding. Captures sitter's base location and service radius. Features a map preview showing coverage area.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Skip button: "Skip" in buttonSmall, primarySunset

**Progress Indicator** (md below navigation):
- Five segments, horizontal, full width with lg horizontal padding
- Segment 1: primarySunset (active)
- Segments 2-5: border color (inactive)
- Step label: "Step 1 of 5" in caption, textTertiary

**Header Section** (xl below progress):
- Title: "Where are you located?" in headingH1, textPrimary
- Subtitle: "Set your base location and how far you'll travel" in bodyRegular, textSecondary

**Location Input** (xl below header):
- Same as AUTH-06 (Use Current Location button + manual address fields)

**Service Radius Section** (xl below location, only visible after location set):
- Label: "Service Radius" in headingH3
- Subtitle: "How far are you willing to travel?" in bodySmall, textSecondary
- Slider: Horizontal, primarySunset track, 5 stops
- Stops: 5 mi, 10 mi, 15 mi, 25 mi, 50 mi
- Current value display: "[X] miles" in headingH2, primarySunset, centered above slider

**Map Preview** (lg below slider):
- MapKit map, 200pt height, radiusMd
- Centered on sitter's location
- Circle overlay showing service radius
- Circle style: primarySunset at 20% opacity fill, primarySunset stroke

**Next Button** (xl from bottom safe area):
- "Next" - PrimaryButtonStyle, full width
- Disabled until location set

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Return to AUTH-05 Role Selection |
| Skip button | Tap | Skip to AUTH-11 (can set later) |
| Location fields | Complete | Show radius section and map |
| Radius slider | Drag | Update value display and map circle |
| Next button | Tap | Save location and radius, proceed to AUTH-11 |

### States

**Default**: Location empty, radius section hidden, Next disabled
**Location Set**: Radius section visible with 10mi default, map shows area
**Valid**: Location + radius set, Next enabled

### Data Requirements

```
ServiceArea {
  location: {
    address: string,
    city: string,
    state: string,
    zipCode: string,
    latitude: number,
    longitude: number
  },
  radiusMiles: 5 | 10 | 15 | 25 | 50
}
```

### API Contract

```
Endpoint: sitters:updateServiceArea (Supabase)

Request:
{
  location: Location,
  radiusMiles: number
}

Response:
{
  success: true
}
```

### Acceptance Criteria
- [ ] Progress shows step 1 of 5
- [ ] Location input works same as owner onboarding
- [ ] Radius slider has exactly 5 stops (5, 10, 15, 25, 50)
- [ ] Map preview updates in real-time as radius changes
- [ ] Circle accurately represents selected radius
- [ ] Default radius is 10 miles
- [ ] Next saves data and proceeds to AUTH-11

---

## AUTH-11: Sitter Onboarding - Services

### User Story
As a new pet sitter, I want to select which services I offer, so that pet owners can find me for the right type of care.

### Screen Description
Service selection screen with checkboxes for each service type. At least one service must be selected to proceed.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Skip button: "Skip" in buttonSmall, primarySunset

**Progress Indicator**:
- Segments 1-2: primarySunset
- Segments 3-5: border
- Label: "Step 2 of 5"

**Header Section** (xl below progress):
- Title: "What services do you offer?" in headingH1
- Subtitle: "Select all that apply" in bodyRegular, textSecondary

**Services List** (xl below header):
Container: PawCard

Each service is a tappable row:

**Service Row Specification**:
- Height: 64pt
- Layout: Checkbox left, icon + text center, nothing right
- Checkbox: 24pt square, radiusSm, border color when unchecked, primarySunset fill with white checkmark when checked
- Icon: Service-specific emoji/icon, 32pt, md from checkbox
- Service name: headingH3, textPrimary, xs from icon
- Description: bodySmall, textSecondary, below name
- Divider: 1pt border color between rows

**Services**:
1. 🚶 Dog Walking - "30-60 minute walks in the neighborhood"
2. 🏠 Drop-in Visits - "Quick check-ins at the pet's home"
3. 🌙 House Sitting - "Overnight stays at the pet's home"
4. 🛏️ Boarding - "Pets stay overnight at your home"
5. ☀️ Doggy Day Care - "Daytime care at your home"

**Selection Counter** (md below card):
- Text: "X service(s) selected" in bodySmall, textSecondary
- Shows 0 when none selected

**Next Button** (xl from bottom):
- "Next" - PrimaryButtonStyle
- Disabled until at least 1 service selected

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Service row | Tap | Toggle checkbox, update counter |
| Next button | Tap | Save services, proceed to AUTH-12 |

### States

**Default**: No services selected, counter shows 0, Next disabled
**Valid**: 1+ services selected, counter updated, Next enabled

### Data Requirements

```
Services {
  walking: boolean,
  dropin: boolean,
  sitting: boolean,
  boarding: boolean,
  daycare: boolean
}
```

### API Contract

```
Endpoint: sitters:updateServices (Supabase)

Request:
{
  services: string[]  // ["walking", "sitting", etc.]
}

Response:
{
  success: true
}
```

### Acceptance Criteria
- [ ] Progress shows step 2 of 5
- [ ] All 5 service types displayed with icons and descriptions
- [ ] Checkbox toggles on row tap (entire row is tap target)
- [ ] Counter updates in real-time
- [ ] At least 1 service required to proceed
- [ ] Selected services saved on Next

---

## AUTH-12: Sitter Onboarding - Availability

### User Story
As a new pet sitter, I want to set my weekly availability, so that pet owners know when I'm free to care for their pets.

### Screen Description
A weekly availability grid where sitters can toggle their availability by day and time period.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Skip button: "Skip"

**Progress Indicator**:
- Segments 1-3: primarySunset
- Segments 4-5: border
- Label: "Step 3 of 5"

**Header Section** (xl below progress):
- Title: "When are you available?" in headingH1
- Subtitle: "Tap to toggle your availability" in bodyRegular, textSecondary

**Availability Grid** (xl below header):
Container: PawCard

**Grid Structure**:
- Header row: Empty cell + 7 day columns (M, T, W, T, F, S, S)
- Row 1: "Morning" label + 7 toggle cells (6am-12pm)
- Row 2: "Afternoon" label + 7 toggle cells (12pm-5pm)
- Row 3: "Evening" label + 7 toggle cells (5pm-10pm)

**Column Headers**:
- Single letter day abbreviations: M, T, W, T, F, S, S
- Style: caption, textTertiary, centered
- Width: Equal distribution after label column

**Row Labels**:
- "Morning", "Afternoon", "Evening"
- Style: bodySmall, textSecondary
- Time hint below: "(6am-12pm)" in caption, textTertiary
- Width: 80pt fixed

**Toggle Cells**:
- Size: 40pt x 40pt
- Unavailable state: border color background, no icon
- Available state: secondarySage background, white checkmark icon
- Tap toggles state
- Spacing: xs between cells

**Quick Actions** (lg below grid):
- "Select All" button: TertiaryButtonStyle
- "Clear All" button: TertiaryButtonStyle, primaryTerracotta color
- Horizontal layout with spacer between

**Next Button** (xl from bottom):
- "Next" - PrimaryButtonStyle
- Always enabled (empty availability is allowed, means "contact me")

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Toggle cell | Tap | Toggle available/unavailable |
| Select All | Tap | Set all cells to available |
| Clear All | Tap | Set all cells to unavailable |
| Next button | Tap | Save availability, proceed to AUTH-13 |

### States

**Default**: All cells unavailable
**Editing**: Mix of available/unavailable based on user taps
**All Selected**: All cells show available state
**All Cleared**: All cells show unavailable state

### Data Requirements

```
Availability {
  monday: { morning: boolean, afternoon: boolean, evening: boolean },
  tuesday: { morning: boolean, afternoon: boolean, evening: boolean },
  wednesday: { morning: boolean, afternoon: boolean, evening: boolean },
  thursday: { morning: boolean, afternoon: boolean, evening: boolean },
  friday: { morning: boolean, afternoon: boolean, evening: boolean },
  saturday: { morning: boolean, afternoon: boolean, evening: boolean },
  sunday: { morning: boolean, afternoon: boolean, evening: boolean }
}
```

### API Contract

```
Endpoint: sitters:updateAvailability (Supabase)

Request:
{
  availability: Availability
}

Response:
{
  success: true
}
```

### Acceptance Criteria
- [ ] Progress shows step 3 of 5
- [ ] Grid displays 7 columns x 3 rows of toggle cells
- [ ] Day headers show single letter abbreviations
- [ ] Time period labels show time ranges
- [ ] Cells toggle on tap with immediate visual feedback
- [ ] Select All sets all 21 cells to available
- [ ] Clear All sets all 21 cells to unavailable
- [ ] Can proceed even with no availability set

---

## AUTH-13: Sitter Onboarding - Rates

### User Story
As a new pet sitter, I want to set my prices for each service, so that pet owners know my rates upfront.

### Screen Description
Price input screen for each service the sitter selected in AUTH-11. Shows suggested price ranges based on market data.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Skip button: "Skip"

**Progress Indicator**:
- Segments 1-4: primarySunset
- Segment 5: border
- Label: "Step 4 of 5"

**Header Section** (xl below progress):
- Title: "Set your rates" in headingH1
- Subtitle: "You can adjust these anytime" in bodyRegular, textSecondary

**Rates List** (xl below header):
Only shows services selected in AUTH-11.

**Rate Card** (for each selected service):
- Container: PawCard, md margin bottom
- Service icon + name: headingH3, horizontal layout
- Suggested range: "Sitters in your area charge $X-$Y" in bodySmall, textTertiary
- Price input row:
  - "$" prefix: headingH2, textTertiary
  - Input field: headingH2 size, textPrimary, 80pt width, right-aligned, number keyboard
  - Unit suffix: bodyRegular, textSecondary (e.g., "/walk", "/night")

**Service Units**:
- Walking: /walk
- Drop-in: /visit
- House Sitting: /night
- Boarding: /night
- Day Care: /day

**Market Suggestions** (example ranges):
- Walking: $15-35
- Drop-in: $20-40
- House Sitting: $50-100
- Boarding: $40-80
- Day Care: $30-60

**Next Button** (xl from bottom):
- "Next" - PrimaryButtonStyle
- Disabled until all selected services have a price > 0

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Price input | Type | Update value, validate > 0 |
| Price input | Blur | Format to whole number |
| Next button | Tap | Save rates, proceed to AUTH-14 |

### Validation

- All prices must be > 0
- All prices must be whole numbers
- Maximum: $500 per unit

### States

**Default**: All price inputs empty, Next disabled
**Partial**: Some prices filled, Next disabled
**Valid**: All prices filled with values > 0, Next enabled
**Error**: Price = 0 or empty shows red border with "Required" text

### Data Requirements

```
Rates {
  walking: number | null,      // price in dollars
  dropin: number | null,
  sitting: number | null,
  boarding: number | null,
  daycare: number | null
}
```

### API Contract

```
Endpoint: sitters:updateRates (Supabase)

Request:
{
  rates: {
    [serviceType: string]: number
  }
}

Response:
{
  success: true
}
```

### Acceptance Criteria
- [ ] Progress shows step 4 of 5
- [ ] Only services selected in AUTH-11 appear
- [ ] Each service shows suggested price range
- [ ] Price inputs only accept numbers
- [ ] $ prefix and unit suffix display correctly
- [ ] All prices required before proceeding
- [ ] Prices save correctly on Next

---

## AUTH-14: Sitter Onboarding - Bio & Photo

### User Story
As a new pet sitter, I want to add my photo and bio, so that pet owners can learn about me and feel comfortable booking.

### Screen Description
Final onboarding step collecting the sitter's profile photo (required) and bio text with character limit.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- No skip button (photo is required)

**Progress Indicator**:
- All 5 segments: primarySunset
- Label: "Step 5 of 5"

**Header Section** (xl below progress):
- Title: "Complete your profile" in headingH1
- Subtitle: "Help pet owners get to know you" in bodyRegular, textSecondary

**Photo Section** (xl below header, centered):
- Photo container: 120pt circle, dashed 2pt border (border color), or image if uploaded
- Overlay when empty: camera.fill icon, 40pt, textTertiary
- Overlay when filled: "Change" button appears on tap
- Label below: "Add a profile photo" or "Tap to change" in caption, textSecondary
- Required badge: Red asterisk next to label

**Bio Section** (xl below photo):
- Label: "About you" in headingH3
- Required badge: Red asterisk
- Prompt: "Tell pet owners why they should trust you with their pets" in bodySmall, textSecondary
- Text editor: Multi-line, 150pt minimum height, PawCard style border
- Placeholder: "I've loved animals my whole life..."
- Character counter: "[X]/500" in caption, right-aligned below editor
  - Color: textTertiary normally, primaryTerracotta when over 450, secondarySage when 50-500
- Minimum: 50 characters
- Maximum: 500 characters

**Validation Messages**:
- Under photo (if missing on submit): "Profile photo is required" in caption, primaryTerracotta
- Under bio (if < 50 chars): "Please write at least 50 characters" in caption, primaryTerracotta

**Complete Button** (xl from bottom):
- "Complete Setup" - PrimaryButtonStyle
- Disabled until: photo uploaded AND bio >= 50 characters

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Photo circle | Tap | Open photo picker (camera/library) |
| Bio editor | Type | Update text, update character counter |
| Complete Setup | Tap | Validate, save, navigate to AUTH-09 Success |

### States

**Default**: No photo, empty bio, Complete disabled
**Photo Only**: Photo uploaded, bio empty, Complete disabled
**Bio Only**: No photo, bio filled, Complete disabled
**Valid**: Photo + bio (50+ chars), Complete enabled
**Saving**: Spinner in button, form disabled

### Data Requirements

```
SitterProfile {
  avatarUrl: string,
  bio: string  // 50-500 characters
}
```

### API Contract

```
Endpoint: sitters:updateProfile (Supabase)

Request:
{
  avatarUrl: string,
  bio: string
}

Response:
{
  success: true
}

Endpoint: storage:uploadImage (Supabase)

Request: File data (multipart)

Response:
{
  url: string
}
```

### Acceptance Criteria
- [ ] Progress shows step 5 of 5
- [ ] Photo is required (cannot skip)
- [ ] Photo picker offers camera and library options
- [ ] Bio minimum 50 characters enforced
- [ ] Bio maximum 500 characters enforced
- [ ] Character counter updates in real-time
- [ ] Character counter color changes near limits
- [ ] Validation messages appear on submit attempt if invalid
- [ ] Complete Setup saves and navigates to success screen
- [ ] Sitter profile is now visible in search results

---

## Epic 1 Summary

| Screen ID | Screen Name | Priority | Backend Endpoints |
|-----------|-------------|----------|-------------------|
| AUTH-01 | Welcome | MUST | None |
| AUTH-02 | Sign Up | MUST | auth:signUpWithEmail, auth:signUpWithApple |
| AUTH-03 | Sign In | MUST | auth:signIn |
| AUTH-04 | Forgot Password | MUST | auth:requestPasswordReset |
| AUTH-05 | Role Selection | MUST | users:updateRole |
| AUTH-06 | Owner: Location | MUST | users:updateLocation |
| AUTH-07 | Owner: Add Pet | MUST | pets:create, storage:uploadImage |
| AUTH-08 | Owner: Pet Details | MUST | pets:updateCareDetails |
| AUTH-09 | Onboarding Success | MUST | users:completeOnboarding |
| AUTH-10 | Sitter: Service Area | MUST | users:updateLocation, sitters:updateServiceArea |
| AUTH-11 | Sitter: Services | MUST | sitters:updateServices |
| AUTH-12 | Sitter: Availability | MUST | sitters:updateAvailability |
| AUTH-13 | Sitter: Rates | MUST | sitters:updateRates |
| AUTH-14 | Sitter: Bio & Photo | MUST | sitters:updateProfile, storage:uploadImage |

**Total Screens**: 14
**Total API Endpoints**: 13
**Estimated Dev Time**: 2-3 weeks

---

# EPIC 2: Pet Profiles

## Epic Overview

**Goal**: Enable owners to manage complete pet profiles that power the care experience, including medications and feeding schedules that auto-generate Live Activity checklists.

**Success Metrics**:
- 90% of owners add at least one pet
- 60% of pets have medication or feeding schedules
- Pet profile completion rate (all fields) > 50%

---

## PET-01: My Pets List

### User Story
As a pet owner, I want to see all my pets in one place, so that I can manage their profiles and care information.

### Screen Description
A list view showing all pets belonging to the current user. Each pet displays as a card with summary information. Includes empty state for users with no pets and an easy way to add new pets.

### UI Elements

**Navigation Bar**:
- Title: "My Pets" in headingH1, left-aligned
- Add button: plus.circle.fill icon, primarySunset, 44pt tap target, right side

**Pet List** (lg below navigation):
- Vertical list with md spacing between cards
- Each pet displayed as PetListCard component

**PetListCard Component**:
- Container: PawCard, full width, tappable
- Layout: Horizontal
- Left section:
  - Pet avatar: 60pt, radiusMd, placeholder gradient if no image
- Center section (md spacing from avatar):
  - Pet name: headingH3, textPrimary
  - Breed: bodySmall, textSecondary (or species if no breed)
  - Stats: bodySmall, textTertiary, format "[age] · [weight]" (e.g., "3 years · 65 lbs")
  - Care badges row (xs spacing, sm below stats):
    - Medication badge: pill emoji + count (e.g., "💊 2 medications") or "💊 No meds"
    - Feeding badge: food emoji + frequency (e.g., "🍽 Fed 2x daily")
    - Style: caption, textTertiary
- Right section:
  - Chevron: chevron.right icon, textTertiary

**Add Pet Card** (md below last pet card):
- Container: Dashed border (2pt, border color), radiusMd, full width
- Content: plus icon + "Add Pet" text, centered, primarySunset
- Height: 80pt

**Empty State** (when no pets):
- Illustration: Sad empty pet bowl (placeholder or custom)
- Title: "No pets yet" in headingH2, textPrimary, centered
- Subtitle: "Add your furry family members to get started" in bodyRegular, textSecondary, centered
- Button: "Add Your First Pet" - PrimaryButtonStyle, centered below subtitle

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Pet card | Tap | Navigate to PET-02 Pet Detail |
| Add button (nav) | Tap | Navigate to PET-03 Add Pet |
| Add Pet card | Tap | Navigate to PET-03 Add Pet |
| Empty state button | Tap | Navigate to PET-03 Add Pet |
| List | Pull down | Refresh pet list |

### States

**Loading**: Show 2-3 skeleton cards (pulsing gray rectangles matching card layout)
**Empty**: Show empty state with illustration and CTA
**Loaded**: Show pet cards
**Error**: PawAlert at top with error message and retry button

### Data Requirements

**Pet List Item**:
```
{
  id: string,
  name: string,
  species: "dog" | "cat" | "other",
  breed: string | null,
  age: number,
  weight: number | null,
  avatarUrl: string | null,
  medicationCount: number,
  feedingTimesPerDay: number
}
```

### API Contract

```
Endpoint: pets:listByOwner (Supabase)

Request: None (uses authenticated user context)

Response:
{
  pets: Pet[]
}

Real-time: Yes - subscribe to updates when pets are added/modified
```

### Acceptance Criteria
- [ ] List shows all pets for authenticated user
- [ ] Pet cards display all summary information correctly
- [ ] Empty state shows when user has no pets
- [ ] Tapping pet card navigates to detail view
- [ ] Add buttons navigate to add pet flow
- [ ] Pull to refresh updates the list
- [ ] List updates in real-time when pets added/modified elsewhere
- [ ] Loading skeletons show while fetching

---

## PET-02: Pet Detail View

### User Story
As a pet owner, I want to view all details about my pet including their care requirements, so that I can review and share this information with sitters.

### Screen Description
A comprehensive view of a single pet's profile including photo, basic info, medications, feeding schedule, special instructions, and vet information. Scrollable content with clear section organization.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Title: Pet name in headingH2
- Edit button: "Edit" in buttonSmall, primarySunset

**Hero Section** (top of scroll view):
- Pet photo: Full width, 250pt height, radiusMd on bottom corners only
- Gradient overlay: Bottom 50% fades from transparent to backgroundPrimary (for text readability)
- If no photo: Gradient placeholder with large paw icon centered

**Info Section** (overlapping hero by 30pt using negative margin):
- Pet name: displayLarge, textPrimary, centered
- Breed: bodyLarge, textSecondary, centered (or species name if no breed)
- Stats row: Three stat chips in horizontal stack, centered, md below breed
  - Chip 1: Age (e.g., "3 years")
  - Chip 2: Weight (e.g., "65 lbs")  
  - Chip 3: Sex (e.g., "Male")
  - Chip style: backgroundElevated, radiusFull, sm horizontal padding, caption text

**Divider** (lg below stats):
- Full width line, 1pt, border color

**Medications Section** (lg below divider):
- Header: "💊 Medications" in headingH2
- Content: PawCard containing medication list
- If no medications: Single line "No medications" in bodyRegular, textTertiary

**Medication Item** (within card):
- Name: headingH3, textPrimary
- Dosage + Frequency: bodyRegular, textSecondary (e.g., "1 tablet · Twice daily")
- Times: bodySmall, textTertiary (e.g., "8:00 AM, 8:00 PM")
- Instructions: bodySmall, textTertiary, italic (e.g., "Give with food")
- Divider between items if multiple

**Feeding Section** (lg below medications):
- Header: "🍽 Feeding Schedule" in headingH2
- Content: PawCard containing feeding list

**Feeding Item** (within card):
- Row layout: Label + Time on left, Amount + Type on right
- Label: bodyRegular semibold (e.g., "Morning")
- Time: bodyRegular, textSecondary (e.g., "7:00 AM")
- Amount: bodyRegular, textSecondary (e.g., "1 cup dry kibble")
- Divider between items if multiple

**Special Instructions Section** (lg below feeding):
- Header: "📝 Special Instructions" in headingH2
- Content: PawCard containing text
- Text: bodyRegular, textPrimary, multi-line
- If empty: "No special instructions" in bodyRegular, textTertiary

**Vet Information Section** (lg below instructions):
- Header: "🏥 Vet Information" in headingH2
- Content: PawCard containing vet details
- If no vet info: "No vet information added" with "Add" link

**Vet Item** (within card):
- Clinic name: headingH3, textPrimary
- Phone: bodyRegular, primarySunset (tappable)
- Doctor name: bodySmall, textSecondary

**Delete Section** (xxl below vet, centered):
- Button: "Delete Pet" in buttonSmall, primaryTerracotta, no background
- Note: Destructive action, requires confirmation

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Navigate back to PET-01 |
| Edit button | Tap | Navigate to PET-04 Edit Pet |
| Vet phone | Tap | Open phone dialer with number |
| Delete Pet | Tap | Show confirmation alert |
| Delete confirmed | Tap "Delete" in alert | Delete pet, navigate to PET-01 |

### Delete Confirmation Alert

- Title: "Delete [Pet Name]?"
- Message: "This will permanently remove [Pet Name] and all their care information. This cannot be undone."
- Buttons:
  - "Cancel" - Default style
  - "Delete" - Destructive style (red)

### States

**Loading**: Skeleton layout matching content structure
**Loaded**: Full content displayed
**Error**: Error message with retry option

### Data Requirements

```
Pet {
  id: string,
  ownerId: string,
  name: string,
  species: "dog" | "cat" | "other",
  breed: string | null,
  age: number,
  weight: number | null,
  sex: "male" | "female" | "unknown",
  avatarUrl: string | null,
  medications: Medication[],
  feedingSchedule: FeedingEntry[],
  specialInstructions: string | null,
  vetInfo: VetInfo | null,
  createdAt: timestamp,
  updatedAt: timestamp
}

Medication {
  id: string,
  name: string,
  dosage: string,
  frequency: string,
  times: string[],
  instructions: string | null
}

FeedingEntry {
  id: string,
  label: string,
  time: string,
  amount: string,
  foodType: string
}

VetInfo {
  clinicName: string,
  phone: string,
  doctorName: string | null
}
```

### API Contract

```
Endpoint: pets:getById (Supabase)

Request:
{
  petId: string
}

Response:
{
  pet: Pet
}

Endpoint: pets:delete (Supabase)

Request:
{
  petId: string
}

Response:
{
  success: true
}
```

### Acceptance Criteria
- [ ] All pet information displays correctly
- [ ] Hero photo shows with gradient overlay
- [ ] Empty sections show appropriate placeholder text
- [ ] Vet phone number is tappable and opens dialer
- [ ] Edit button navigates to edit screen
- [ ] Delete requires confirmation before executing
- [ ] After delete, navigates back to pet list
- [ ] Back button returns to pet list

---

## PET-03: Add Pet Flow

### User Story
As a pet owner, I want to add a new pet to my account, so that I can book care for them.

### Screen Description
A multi-step form to add a new pet. Combines basic info (name, species, breed, age) and care details (medications, feeding) into a streamlined flow. Can be accessed from onboarding or main app.

### Flow Structure
Step 1: Basic Info (name, photo, species, breed, age, weight)
Step 2: Care Details (medications, feeding schedule, special instructions)

This reuses the same form patterns as AUTH-07 and AUTH-08 but with different navigation context.

### UI Differences from Onboarding
- Navigation: Has Cancel button (not Skip) that confirms discard if form is dirty
- No progress indicator (simpler flow)
- Title: "Add Pet" instead of onboarding title
- Completion: Returns to PET-01 list instead of success celebration

### Navigation Flow

Entry points:
- PET-01 Add button → PET-03 Step 1
- PET-01 Add Pet card → PET-03 Step 1
- AUTH-09 "Add Another Pet" → PET-03 Step 1

Exit points:
- Cancel → Confirm if dirty → PET-01
- Save → PET-01 (new pet in list)

### Acceptance Criteria
- [ ] Form matches AUTH-07 and AUTH-08 specifications
- [ ] Cancel prompts confirmation if form has data
- [ ] Save validates required fields (name, species, age, at least one feeding)
- [ ] Successful save adds pet and returns to list
- [ ] New pet appears in list immediately (real-time update)

---

## PET-04: Edit Pet

### User Story
As a pet owner, I want to edit my pet's information, so that I can keep their profile accurate and up-to-date.

### Screen Description
Edit form for existing pet, pre-populated with current data. Same form fields as Add Pet but with existing values filled in and a different header.

### UI Elements

**Navigation Bar**:
- Cancel button: "Cancel" in buttonSmall, primarySunset, left side
- Title: "Edit [Pet Name]" in headingH2
- Save button: "Save" in buttonSmall, primarySunset, right side (disabled until changes made)

Rest of form matches PET-03 / AUTH-07+08 but with:
- All fields pre-populated with current values
- Photo shows current image (if exists) with "Change" overlay option
- Save button enabled only when changes detected

### Dirty State Detection

Track original values vs current form values. Form is "dirty" if any value differs from original. This affects:
- Save button: Only enabled when dirty
- Cancel behavior: Shows confirmation only when dirty

### Cancel Confirmation Alert

- Title: "Discard Changes?"
- Message: "You have unsaved changes. Are you sure you want to discard them?"
- Buttons:
  - "Keep Editing" - Default
  - "Discard" - Destructive

### API Contract

```
Endpoint: pets:update (Supabase)

Request:
{
  petId: string,
  updates: {
    name?: string,
    species?: "dog" | "cat" | "other",
    breed?: string | null,
    age?: number,
    weight?: number | null,
    sex?: "male" | "female" | "unknown",
    avatarUrl?: string | null,
    medications?: Medication[],
    feedingSchedule?: FeedingEntry[],
    specialInstructions?: string | null,
    vetInfo?: VetInfo | null
  }
}

Response:
{
  success: true,
  pet: Pet
}
```

### Acceptance Criteria
- [ ] Form pre-populates with all current pet data
- [ ] Save button disabled until changes made
- [ ] Save only sends changed fields to API
- [ ] Cancel with changes shows confirmation
- [ ] Cancel without changes exits immediately
- [ ] After save, returns to PET-02 with updated data
- [ ] Photo can be changed via camera/library picker

---

## Epic 2 Summary

| Screen ID | Screen Name | Priority | Backend Endpoints |
|-----------|-------------|----------|-------------------|
| PET-01 | My Pets List | MUST | pets:listByOwner |
| PET-02 | Pet Detail View | MUST | pets:getById, pets:delete |
| PET-03 | Add Pet Flow | MUST | pets:create, storage:uploadImage |
| PET-04 | Edit Pet | MUST | pets:update, storage:uploadImage |

**Total Screens**: 4
**Total API Endpoints**: 5
**Estimated Dev Time**: 1-1.5 weeks

---

# EPIC 3: User Profiles

## Epic Overview

**Goal**: Enable users to view and manage their profiles, and enable owners to view sitter profiles when booking.

**Success Metrics**:
- Profile completion rate > 80%
- Sitter profile views to booking conversion > 15%

---

## PROF-01: My Profile (Owner View)

### User Story
As a pet owner, I want to view my profile and access app settings, so that I can manage my account and preferences.

### Screen Description
A profile hub showing user's basic info with navigation to all profile-related sections including pets, bookings, messages, payment methods, and settings.

### UI Elements

**Header Section** (xxl below safe area):
- Avatar: 100pt circle, 3pt border in primarySunset, centered
- Edit overlay: Camera icon, 28pt circle, backgroundElevated, bottom-right of avatar
- Name: headingH1, textPrimary, centered, lg below avatar
- Location: bodyRegular, textSecondary, centered, lowercase (e.g., "san francisco, ca")

**Primary Menu Section** (xl below header):
- Container: PawCard
- Menu items (each is tappable row):
  - Row 1: Paw icon + "My Pets" + chevron.right
  - Row 2: Calendar icon + "My Bookings" + chevron.right
  - Row 3: Message icon + "Messages" + badge if unread + chevron.right
  - Row 4: Credit card icon + "Payment Methods" + chevron.right
- Dividers between rows

**Secondary Menu Section** (md below primary):
- Container: PawCard
- Menu items:
  - Row 1: Gear icon + "Settings" + chevron.right
  - Row 2: Question mark icon + "Help & Support" + chevron.right
  - Row 3: Document icon + "Terms & Privacy" + chevron.right
- Dividers between rows

**Menu Row Specification**:
- Height: 48pt
- Icon: 24pt, textSecondary, md from left edge
- Label: bodyRegular, textPrimary, md from icon
- Chevron: chevron.right, textTertiary, md from right edge
- Badge (if applicable): Red circle, 8pt, with white number inside

**Logout Button** (xl below secondary menu):
- Style: SecondaryButtonStyle, full width
- Text: "Log Out"
- Color: primaryTerracotta for text and border

**Version Footer** (md from bottom safe area):
- Text: "Version 1.0.0" in caption, textTertiary, centered

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Avatar / edit overlay | Tap | Navigate to PROF-03 Edit Profile |
| My Pets row | Tap | Navigate to PET-01 |
| My Bookings row | Tap | Navigate to BOOK-12 |
| Messages row | Tap | Navigate to MSG-01 |
| Payment Methods row | Tap | Navigate to PAY-01 |
| Settings row | Tap | Navigate to SET-01 |
| Help & Support row | Tap | Navigate to SET-07 |
| Terms & Privacy row | Tap | Navigate to legal screen |
| Log Out button | Tap | Show confirmation, then log out |

### Logout Confirmation

- Title: "Log Out?"
- Message: "Are you sure you want to log out of PawConnect?"
- Buttons:
  - "Cancel" - Default
  - "Log Out" - Destructive

### States

**Loaded**: All content displayed
**Logging Out**: Button shows spinner, other interactions disabled

### Data Requirements

```
UserProfile {
  id: string,
  name: string,
  email: string,
  avatarUrl: string | null,
  location: {
    city: string,
    state: string
  } | null,
  unreadMessageCount: number
}
```

### API Contract

```
Endpoint: users:getProfile (Supabase)

Request: None (uses auth context)

Response:
{
  user: UserProfile
}

Endpoint: auth:logout (Supabase)

Request: None

Response:
{
  success: true
}

Side effects: Clear stored token from Keychain
```

### Acceptance Criteria
- [ ] Avatar displays with edit overlay
- [ ] Name and location display correctly
- [ ] Unread message badge shows count when > 0
- [ ] All menu items navigate to correct screens
- [ ] Logout requires confirmation
- [ ] After logout, navigate to AUTH-01 Welcome
- [ ] Token is cleared from Keychain on logout

---

## PROF-02: Sitter Profile (Public View)

### User Story
As a pet owner, I want to view a sitter's full profile, so that I can decide if they're the right fit for my pet.

### Screen Description
A comprehensive public-facing profile for sitters showing their photo, bio, services, rates, availability, and reviews. This is the primary decision-making screen before booking.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Favorite button: heart (outline) or heart.fill (if favorited), primarySunset

**Hero Section**:
- Photo: Full width, 280pt height
- Gradient overlay: Bottom 40% fades to backgroundPrimary
- If no photo: Gradient placeholder with person icon

**Identity Section** (overlapping hero):
- Name: displayLarge, textPrimary
- Rating row: Star icon (filled, secondaryAmber) + rating number + "(X reviews)" + " · " + distance
  - Example: "⭐ 4.9 (127 reviews) · 0.5 mi"
  - Style: bodyRegular, rating in textPrimary, rest in textSecondary

**Price Chips** (md below rating):
- Horizontal scroll if needed
- Each chip shows a key rate:
  - Format: "$XX" in headingH3 + "/unit" in caption
  - Examples: "$25/walk", "$35/visit", "$75/night"
  - Style: backgroundElevated, radiusMd, md padding
  - Show up to 3 most relevant services

**Divider** (lg below chips)

**About Section** (lg below divider):
- Header: "About" in headingH2
- Content: PawCard containing bio text
- Bio: bodyRegular, textPrimary
- If bio > 150 characters: Truncate with "...See more" link
- "See more" in primarySunset, tappable to expand

**Services Section** (lg below about):
- Header: "Services" in headingH2
- Content: PawCard containing service list
- Each service row:
  - Checkmark icon (checkmark.circle.fill), secondarySage
  - Service name: bodyRegular, textPrimary
  - Price: bodyRegular, textSecondary, right-aligned
  - Example: "✓ Dog Walking                    $25/walk"

**Availability Section** (lg below services):
- Header: "Availability" in headingH2
- Content: PawCard containing:
  - Week view: 7 circles for Mon-Sun
    - Letter label above: "M T W T F S S" in caption
    - Circle: 28pt, secondarySage fill if available, border color stroke if not
  - Response time: "Usually responds in X hour(s)" in bodySmall, textSecondary, md below week view

**Reviews Section** (lg below availability):
- Header: "Reviews" in headingH2
- Content: PawCard containing:
  - Top review preview (if exists):
    - Stars: 5 star icons (filled secondaryAmber for rating, border for empty)
    - Quote: bodyRegular, textPrimary, max 3 lines with ellipsis
    - Attribution: "- [Name] · [Date]" in caption, textTertiary
  - "See all X reviews" link: primarySunset, tappable
  - If no reviews: "No reviews yet" in bodyRegular, textTertiary

**Sticky Footer** (pinned to bottom):
- Background: backgroundElevated with shadowModal
- Safe area padding
- Two buttons, vertical stack, sm spacing:
  - "Contact [Name]" - SecondaryButtonStyle, full width
  - "Book Now · From $XX" - PrimaryButtonStyle, full width
  - $XX = lowest service price

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Navigate back to search results |
| Favorite button | Tap | Toggle favorite status, update icon |
| See more (bio) | Tap | Expand bio to full text |
| See all reviews | Tap | Navigate to REV-05 All Reviews |
| Contact button | Tap | Navigate to MSG-02 Chat with this sitter |
| Book Now button | Tap | Navigate to BOOK-02 Start Booking |

### States

**Loading**: Skeleton matching layout structure
**Loaded**: Full content
**Favoriting**: Heart icon pulses briefly on toggle
**Bio Expanded**: Full bio text visible, "See more" hidden

### Data Requirements

```
SitterProfile {
  id: string,
  name: string,
  avatarUrl: string | null,
  bio: string,
  rating: number | null,
  reviewCount: number,
  distanceMiles: number,
  responseTimeMinutes: number,
  services: Service[],
  availability: {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
  },
  topReview: Review | null,
  isFavorited: boolean
}

Service {
  type: "walking" | "dropin" | "sitting" | "boarding" | "daycare",
  displayName: string,
  price: number,
  unit: "walk" | "visit" | "night" | "hour"
}

Review {
  id: string,
  rating: number,
  text: string,
  authorName: string,
  createdAt: timestamp
}
```

### API Contract

```
Endpoint: sitters:getProfile (Supabase)

Request:
{
  sitterId: string,
  viewerLocation: { lat: number, lng: number } | null
}

Response:
{
  sitter: SitterProfile
}

Endpoint: favorites:toggle (Supabase)

Request:
{
  sitterId: string
}

Response:
{
  isFavorited: boolean
}
```

### Acceptance Criteria
- [ ] All sitter information displays correctly
- [ ] Rating shows star icon with correct decimal (e.g., 4.9)
- [ ] Distance calculates from viewer's location
- [ ] Price chips show most relevant services
- [ ] Bio truncates at 150 chars with expand option
- [ ] Availability week view accurately reflects sitter's schedule
- [ ] Favorite toggle works and persists
- [ ] Contact button opens chat (existing or new)
- [ ] Book Now shows lowest price and navigates to booking

---

## PROF-03: Edit Profile (Owner)

### User Story
As a pet owner, I want to edit my personal information, so that my profile is accurate.

### Screen Description
Edit form for owner's profile including photo, name, email, phone, and location.

### UI Elements

**Navigation Bar**:
- Cancel button: "Cancel", primarySunset, left
- Title: "Edit Profile" in headingH2
- Save button: "Save", primarySunset, right (disabled until changes)

**Photo Section** (xl below navigation, centered):
- Avatar: 100pt circle, current photo or placeholder
- Change button: "Change Photo" in buttonSmall, primarySunset, below avatar

**Form Section** (xl below photo):

Field 1 - Full Name:
- Label + PawTextField
- Pre-populated with current name

Field 2 - Email:
- Label + PawTextField, email keyboard
- Pre-populated with current email
- Note below: "Changing email requires verification" in caption, textTertiary

Field 3 - Phone:
- Label + PawTextField, phone keyboard
- Pre-populated with current phone
- Format: Auto-format as (XXX) XXX-XXXX

Field 4 - Location (md below phone):
- Label: "Location"
- Display card showing current address
- "Change" link: primarySunset, opens location picker
- Shows: Street, City, State ZIP

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Cancel | Tap | Confirm if dirty, then navigate back |
| Save | Tap | Submit changes, navigate back |
| Change Photo | Tap | Open photo picker |
| Change (location) | Tap | Open location sheet (same as AUTH-06) |

### States

**Clean**: Save disabled, no confirmation on cancel
**Dirty**: Save enabled, confirm before cancel
**Saving**: Spinner in save button, form disabled

### API Contract

```
Endpoint: users:updateProfile (Supabase)

Request:
{
  name?: string,
  email?: string,
  phone?: string,
  avatarUrl?: string,
  location?: Location
}

Response:
{
  success: true,
  user: User,
  emailVerificationRequired: boolean
}
```

### Acceptance Criteria
- [ ] Form pre-populates with all current data
- [ ] Photo can be changed via picker
- [ ] Save only sends changed fields
- [ ] Email change triggers verification requirement
- [ ] Location change uses same picker as onboarding
- [ ] Dirty detection works correctly

---

## PROF-04: Edit Profile (Sitter)

### User Story
As a pet sitter, I want to edit my public profile, so that pet owners see accurate information about my services.

### Screen Description
Comprehensive edit form for sitter's public profile including all fields from onboarding (AUTH-10 through AUTH-14) in a single scrollable form.

### UI Elements

Same navigation pattern as PROF-03 but with these form sections:

**Section 1 - Photo & Bio**:
- Profile photo (required)
- Bio text editor (min 50, max 500 chars)
- Character counter

**Section 2 - Services**:
- Service checkboxes (same as AUTH-11)
- Price input for each selected service

**Section 3 - Availability**:
- Week grid (same as AUTH-12)

**Section 4 - Service Area**:
- Location display with change option
- Radius slider: 5mi - 50mi

### API Contract

```
Endpoint: sitters:updateProfile (Supabase)

Request:
{
  bio?: string,
  avatarUrl?: string,
  services?: Service[],
  availability?: Availability,
  location?: Location,
  serviceRadiusMiles?: number
}

Response:
{
  success: true,
  sitter: SitterProfile
}
```

### Acceptance Criteria
- [ ] All sitter profile fields are editable
- [ ] Services require prices when enabled
- [ ] Availability grid updates in real-time
- [ ] Bio enforces character limits
- [ ] Changes reflect immediately on public profile after save

---

## Epic 3 Summary

| Screen ID | Screen Name | Priority | Backend Endpoints |
|-----------|-------------|----------|-------------------|
| PROF-01 | My Profile (Owner) | MUST | users:getProfile, auth:logout |
| PROF-02 | Sitter Profile | MUST | sitters:getProfile, favorites:toggle |
| PROF-03 | Edit Profile (Owner) | MUST | users:updateProfile |
| PROF-04 | Edit Profile (Sitter) | MUST | sitters:updateProfile |

**Total Screens**: 4
**Total API Endpoints**: 5
**Estimated Dev Time**: 1.5 weeks

---

# EPIC 4: Search & Discovery

## Epic Overview

**Goal**: Enable pet owners to find and filter sitters based on location, services, availability, price, and ratings.

**Success Metrics**:
- Search to profile view rate > 60%
- Profile view to booking rate > 15%
- Average filters used per search > 1.5

---

## SRCH-01: Search Home

### User Story
As a pet owner, I want to search for sitters near me with specific criteria, so that I can find the right match for my pet.

### Screen Description
The primary search interface with location input, date selection, pet type filters, and service type selection. Also shows recent and recommended sitters for quick access.

### UI Elements

**Navigation Bar**:
- Title: "Find a Sitter" in headingH1, left-aligned

**Search Form Section** (lg below navigation):

Location Input:
- Container: PawCard style, tappable
- Icon: location.fill, primarySunset, left side
- Text: Current location or "Select location" in bodyRegular
- Chevron: chevron.down, textTertiary, right side
- Tap opens location picker sheet

Date Input (md below location):
- Container: PawCard style, tappable
- Icon: calendar, primarySunset
- Text: Selected dates or "Select dates" in bodyRegular
- Format when selected: "Jan 15 - Jan 17" or "Jan 15" for single day
- Tap opens date picker sheet

Pet Type Toggle (md below dates):
- Label: "Pet type" in bodySmall, textSecondary, above
- Three toggle buttons, horizontal:
  - "🐕 Dogs"
  - "🐈 Cats"
  - "🐾 Other"
- Style: Multi-select allowed
- Selected: primarySunset fill, white text
- Unselected: backgroundElevated fill, textSecondary

Service Type (md below pet type):
- Label: "Service type" in bodySmall, textSecondary
- Radio list in PawCard:
  - "Dog Walking"
  - "Drop-in Visits"
  - "House Sitting"
  - "Boarding"
  - "Doggy Day Care"
- Single selection required
- Selected: Radio filled with primarySunset

**Search Button** (lg below service type):
- "Search" - PrimaryButtonStyle, full width

**Divider** (xl below button)

**Recent Sitters Section** (lg below divider):
- Header: "Recent Sitters" in headingH3
- Content: Horizontal scroll of avatar circles
- Each item:
  - Avatar: 60pt circle
  - Name: caption, textPrimary, centered below
  - Max 5 recent + "View All" at end
- "View All": Circle with "..." or arrow icon

**Recommendations Section** (lg below recent):
- Header: "Recommended for [Pet Name]" in headingH3
- Subheader: "Based on your preferences" in caption, textTertiary
- Content: Vertical list of SitterPreviewCard (max 3)
- If multiple pets: Use first pet's name

### Location Picker Sheet

- Handle bar at top for dismissal
- "Use Current Location" button with location icon
- Recent locations list (last 3)
- Search field: "Search address"
- Address autocomplete results

### Date Picker Sheet

- Handle bar at top
- Calendar view (current and next month visible)
- Can select single date or range
- Quick options: "Today", "Tomorrow", "This Weekend"
- "Done" button at bottom

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Location input | Tap | Open location picker sheet |
| Date input | Tap | Open date picker sheet |
| Pet type toggle | Tap | Toggle selection (multi-select) |
| Service type radio | Tap | Select option (single) |
| Search button | Tap | Navigate to SRCH-02 with filters |
| Recent sitter avatar | Tap | Navigate to PROF-02 |
| "View All" recent | Tap | Navigate to favorites/recent list |
| Recommendation card | Tap | Navigate to PROF-02 |

### States

**Default**: 
- Location: User's saved location or "Select location"
- Dates: "Select dates"
- Pet types: Based on user's pets (auto-select)
- Service: None selected
- Search button: Enabled once location and service selected

**Loading Recommendations**: Skeleton cards (2-3)
**No Recent**: Section hidden
**No Recommendations**: Section shows "Complete your profile to get personalized recommendations"

### Data Requirements

```
SearchFilters {
  location: {
    latitude: number,
    longitude: number,
    displayName: string
  },
  startDate: string | null,  // ISO date
  endDate: string | null,
  petTypes: ("dog" | "cat" | "other")[],
  serviceType: "walking" | "dropin" | "sitting" | "boarding" | "daycare"
}

RecentSitter {
  id: string,
  name: string,
  avatarUrl: string | null
}

SitterRecommendation {
  id: string,
  name: string,
  avatarUrl: string | null,
  rating: number | null,
  reviewCount: number,
  distance: number,
  price: number,
  priceUnit: string,
  specialty: string
}
```

### API Contract

```
Endpoint: search:getRecentSitters (Supabase)

Request: None (uses auth context)

Response:
{
  sitters: RecentSitter[]
}

Endpoint: search:getRecommendations (Supabase)

Request:
{
  petTypes: string[],
  limit: number
}

Response:
{
  sitters: SitterRecommendation[]
}
```

### Acceptance Criteria
- [ ] Location defaults to user's saved location if available
- [ ] Pet types auto-select based on user's pets
- [ ] Location picker supports GPS and manual entry
- [ ] Date picker supports single date and ranges
- [ ] Service type is required before search
- [ ] Recent sitters show last 5 viewed
- [ ] Recommendations personalized to user's pets
- [ ] Search button navigates to results with all filters

---

## SRCH-02: Search Results (List View)

### User Story
As a pet owner, I want to see a list of available sitters matching my criteria, so that I can compare options and find the best fit.

### Screen Description
A filterable, sortable list of sitters matching the search criteria. Shows key information at a glance with options to filter further or switch to map view.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left, primarySunset
- Title: Service type (e.g., "House Sitting") in headingH2
- Subtitle: Dates + location (e.g., "Jan 15-17 · San Francisco") in caption, textSecondary
- Map button: map icon, primarySunset, right side (toggles to SRCH-03)

**Filter Bar** (pinned below navigation):
- Background: backgroundElevated, 1pt bottom border
- Left side: "Filters" button with sliders icon, shows badge with filter count if > 0
- Right side: "Sort: [Option]" dropdown
- Sort options: "Distance", "Price: Low to High", "Price: High to Low", "Rating"

**Results Count** (md below filter bar):
- Text: "X sitters available" in bodySmall, textSecondary

**Results List** (md below count):
- Vertical list, md spacing between cards
- Each result: SitterPreviewCard component

**SitterPreviewCard Component**:
- Container: PawCard, full width, tappable
- Layout:
  - Left: Avatar (60pt, radiusMd)
  - Center (md from avatar):
    - Name: headingH3, textPrimary
    - Rating + Specialty: bodySmall, star icon + "4.9" + " · " + specialty
    - Distance: bodySmall, textTertiary (e.g., "0.5 mi away")
  - Right:
    - Price: headingH3, primarySunset
    - Unit: caption, textSecondary (e.g., "/night")

**Empty State** (when no results):
- Illustration: Magnifying glass with sad face
- Title: "No sitters found" in headingH2
- Subtitle: "Try adjusting your filters or search in a different area" in bodyRegular, textSecondary
- Button: "Adjust Filters" - SecondaryButtonStyle

**Loading State**:
- 3-5 skeleton cards matching SitterPreviewCard layout

### Filter Sheet (triggered by "Filters" button)

Handle bar at top

**Price Range**:
- Label: "Price Range" in headingH3
- Dual-handle slider: $0 - $200 range
- Display: "$X - $Y" showing selected range

**Rating**:
- Label: "Minimum Rating" in headingH3
- Options: "Any", "4.0+", "4.5+", "4.8+"
- Style: Horizontal segmented control

**Pet Size** (for dog walking/boarding):
- Label: "Pet Size" in headingH3
- Checkboxes: "Small (< 25 lbs)", "Medium (25-50 lbs)", "Large (50+ lbs)"

**Additional Filters**:
- "Background Check Verified" toggle
- "Responds within 1 hour" toggle

**Footer**:
- "Reset" button: TertiaryButtonStyle, left
- "Show X Results" button: PrimaryButtonStyle, right

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Back button | Tap | Return to SRCH-01 |
| Map button | Tap | Navigate to SRCH-03 Map View |
| Filters button | Tap | Open filter sheet |
| Sort dropdown | Tap | Open sort options menu |
| Sort option | Tap | Re-sort list, update dropdown label |
| Sitter card | Tap | Navigate to PROF-02 |
| Filter: Apply | Tap | Close sheet, reload results |
| Filter: Reset | Tap | Clear all filters to defaults |

### States

**Loading**: Skeleton cards
**Loaded**: Results list
**Empty**: Empty state illustration
**Filtering**: Sheet open, results blur behind
**Error**: Alert with retry option

### Data Requirements

```
SearchResults {
  total: number,
  sitters: SitterPreview[]
}

SitterPreview {
  id: string,
  name: string,
  avatarUrl: string | null,
  rating: number | null,
  reviewCount: number,
  specialty: string,
  distanceMiles: number,
  price: number,
  priceUnit: string,
  isVerified: boolean,
  responseTimeMinutes: number
}

ActiveFilters {
  priceMin: number | null,
  priceMax: number | null,
  minRating: number | null,
  petSizes: string[],
  verifiedOnly: boolean,
  fastResponseOnly: boolean,
  sortBy: "distance" | "price_asc" | "price_desc" | "rating"
}
```

### API Contract

```
Endpoint: search:findSitters (Supabase)

Request:
{
  location: { lat: number, lng: number },
  startDate: string | null,
  endDate: string | null,
  petTypes: string[],
  serviceType: string,
  filters: {
    priceMin?: number,
    priceMax?: number,
    minRating?: number,
    petSizes?: string[],
    verifiedOnly?: boolean,
    fastResponseOnly?: boolean
  },
  sortBy: string,
  limit: number,
  offset: number
}

Response:
{
  total: number,
  sitters: SitterPreview[],
  hasMore: boolean
}
```

### Acceptance Criteria
- [ ] Results reflect all search criteria from SRCH-01
- [ ] Filter badge shows count of active filters
- [ ] Sort changes update list immediately
- [ ] Price filter uses dual-handle slider
- [ ] Empty state shows when no results match
- [ ] Infinite scroll loads more results
- [ ] Map toggle navigates to SRCH-03
- [ ] Tapping card opens sitter profile

---

## SRCH-03: Search Results (Map View)

### User Story
As a pet owner, I want to see sitters on a map, so that I can find someone conveniently located.

### Screen Description
Map-based view of search results with sitter locations shown as pins. Tapping a pin shows a preview card. Can switch back to list view.

### UI Elements

**Navigation Bar**:
- Back button: chevron.left
- Title: Same as SRCH-02
- List button: list.bullet icon (toggles to SRCH-02)

**Map** (full screen behind other elements):
- MapKit map centered on search location
- Pins for each sitter location
- Pin style: 
  - Circle with price inside (e.g., "$75")
  - Color: primarySunset
  - Selected pin: Larger, elevated shadow

**Filter Bar** (floating at top below navigation):
- Same as SRCH-02 but with transparent background with blur

**Sitter Preview Card** (floating at bottom when pin selected):
- SitterPreviewCard (same component as list view)
- Appears with slide-up animation when pin tapped
- "View Profile" button below card
- Dismiss: Tap elsewhere on map or swipe down

### User Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| Map | Pan/zoom | Update visible area |
| Pin | Tap | Select pin, show preview card |
| Preview card | Tap | Navigate to PROF-02 |
| Map background | Tap (with card open) | Dismiss preview card |
| List button | Tap | Navigate to SRCH-02 |

### States

**Loading**: Map loads, then pins appear
**Browsing**: No pin selected, no preview
**Selected**: Pin highlighted, preview card visible
**Empty Area**: If user pans to area with no sitters, show toast "No sitters in this area"

### API Contract

Uses same endpoint as SRCH-02 but requests results for visible map region.

```
Additional request params:
{
  boundingBox: {
    northLat: number,
    southLat: number,
    eastLng: number,
    westLng: number
  }
}
```

### Acceptance Criteria
- [ ] Map shows pins for all sitters in results
- [ ] Pins display price inside
- [ ] Tapping pin shows preview card
- [ ] Selected pin visually distinguished
- [ ] Preview card matches list card design
- [ ] List toggle returns to list view with same filters
- [ ] Map can be panned/zoomed
- [ ] Results update when map region changes significantly

---

## Epic 4 Summary

| Screen ID | Screen Name | Priority | Backend Endpoints |
|-----------|-------------|----------|-------------------|
| SRCH-01 | Search Home | MUST | search:getRecentSitters, search:getRecommendations |
| SRCH-02 | Results List | MUST | search:findSitters |
| SRCH-03 | Results Map | SHOULD | search:findSitters (with bounding box) |

**Total Screens**: 3
**Total API Endpoints**: 3
**Estimated Dev Time**: 1.5 weeks

---

*Document continues with Epic 5: Booking System, Epic 6: Live Activities, Epic 7: Messaging, Epic 8: Reviews, Epic 9: Payments, Epic 10: Settings...*

*These epics follow the same detailed specification format. Continue?*
| 1 | 0.5 weeks |

**TOTALS**: 55 screens | 51+ API endpoints | 16-22 weeks

## MVP Recommendation

For initial launch, prioritize:
1. ✅ Epic 1: Auth & Onboarding (required)
2. ✅ Epic 2: Pet Profiles (required)
3. ✅ Epic 3: User Profiles (required)
4. ✅ Epic 4: Search & Discovery (required)
5. ✅ Epic 5: Booking System (required)
6. ✅ Epic 6: Live Activities (DIFFERENTIATOR - required)
7. ✅ Epic 7: Messaging (required)
8. ✅ Epic 8: Reviews (required)
9. ⏸️ Epic 9: Payments (defer - use Venmo/cash initially)
10. ⏸️ Epic 10: Settings (minimal version)

**MVP Screens**: ~50
**MVP Dev Time**: 14-18 weeks (part-time)

---

## How to Use This Document

### For Figma Design
1. Create a page per Epic
2. Use the Design System Reference section to set up styles
3. Create screens based on UI Elements specifications
4. Use States section to create component variants

### For Frontend Development
1. Create components matching Standard Components table
2. Implement screens following UI Elements exactly
3. Use User Interactions table for gesture handlers
4. Implement all States for each screen

### For Backend Development
1. Create Supabase schema matching Data Requirements
2. Implement endpoints matching API Contract sections
3. Set up real-time subscriptions where noted
4. Implement APNs for Live Activities

### For QA Testing
1. Use Acceptance Criteria as test cases
2. Verify all States are handled
3. Test all User Interactions
4. Validate API error handling

---

*End of PawConnect Product Specification v1.0*
