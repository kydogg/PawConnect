# PawConnect

A premium iOS pet-care marketplace connecting pet Owners with Sitters, differentiated by Live Activities showing care progress on the Owner's Lock Screen.

## Language

**Owner**:
A user who has pets and books care for them.
_Avoid_: customer, client, pet parent

**Sitter**:
A user who offers pet-care services (walking, sitting, boarding, drop-ins, daycare).
_Avoid_: provider, caregiver, walker

**Profile**:
The per-user record backing an account (role, location, onboarding state); exactly one per authenticated user, created automatically at signup. Readable only by its own user.
_Avoid_: user record, users row, account

**Role**:
A user's marketplace identity: Owner, Sitter, or Both. Chosen once at role selection and persisted server-side; routing derives from it.
_Avoid_: account type, user type

**Onboarding Complete**:
A user has finished every onboarding flow currently available for their Role ("complete-per-available-flows"): while sitter onboarding is unshipped, a Both user is complete after the owner flow alone. Revisit when sitter onboarding ships.
_Avoid_: profile complete, setup done

**Care Details**:
A pet's structured medications and feeding schedule, recorded during onboarding. The source data that auto-generates Live Activity care checklists.
_Avoid_: pet info, health details
