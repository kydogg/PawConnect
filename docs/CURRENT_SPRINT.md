# Current Sprint: Sprint 0 — Asset Generation

> **Sprint Goal**: Generate all Midjourney assets needed for Sprints 1–3,
> organize into folder structure, and prepare for Xcode import.

**Sprint Duration**: Week 0 (before any code)
**Last Updated**: February 2026

---

## Sprint Objectives

1. Generate Batch 1 assets (Brand + Welcome)
2. Generate Batch 2 assets (Empty States + Service Icons)
3. Generate Batch 3 assets (Profile Placeholders + Status Icons)
4. Organize all assets into folder structure with naming convention
5. Create @1x, @2x, @3x variants for all assets
6. Import into Xcode asset catalogs

---

## Asset Generation Checklist

### Batch 1 — Blocking Sprint 1 (Brand + Design System)
- [ ] App Icon (1024x1024)
- [ ] Logo Lockup

### Batch 2 — Blocking Sprint 2 (Auth Screens)
- [ ] Welcome Screen Hero (Dog variant)
- [ ] Welcome Screen Hero (Cat variant — optional)
- [ ] Password Reset Mail Icon (AUTH-04b)
- [ ] Onboarding Confetti Celebration (AUTH-09)
- [ ] Success Checkmark with Paw (AUTH-09)

### Batch 3 — Blocking Sprint 3–4 (Onboarding + Profiles)
- [ ] Dog Avatar Placeholder
- [ ] Cat Avatar Placeholder
- [ ] Pet Photo Hero Placeholder (PET-02)
- [ ] Sitter Profile Hero Placeholder (PROF-02)
- [ ] Service Icons: Dog Walking, House Sitting, Boarding, Drop-in, Daycare (AUTH-11)

### Batch 4 — Blocking Sprint 5+ (Search + Live Activities)
- [ ] No Pets Empty State (PET-01)
- [ ] No Sitters Found Empty State (SRCH-02)
- [ ] Location Pin with Price (SRCH-03)
- [ ] Verified Badge (PROF-02)
- [ ] Live Activity Icons: Medication, Feeding, Walk, Bathroom, Play

---

## Folder Structure

After generation, organize as:
```
Assets/
├── Brand/           (app icon, logo)
├── Onboarding/      (welcome hero, confetti, success)
├── EmptyStates/     (no pets, no sitters)
├── ServiceIcons/    (5 service type icons)
├── LiveActivities/  (5 care activity icons)
├── Placeholders/    (pet hero, sitter hero, avatars)
├── TrustBadges/     (verified, background check)
└── Location/        (map pin)
```

## Naming Convention
```
[Category]-[Description]@[Resolution].png

Examples:
Brand-AppIcon@1024.png
Onboarding-WelcomeHero-Dog@3x.png
EmptyState-NoPets@3x.png
Service-DogWalking@3x.png
```

---

## Definition of Done

- [ ] All Batch 1–3 assets generated
- [ ] All assets organized in folder structure
- [ ] @1x, @2x, @3x variants created
- [ ] Assets imported into Xcode project Assets.xcassets
- [ ] All assets render correctly in Xcode preview

---

## Next Sprint Preview

**Sprint 1: Project Setup & Design System**
- Xcode project creation
- SPM dependencies (Supabase)
- AppColors.swift, AppFont.swift, AppSpacing.swift
- PawButton, PawCard, PawTextField components
