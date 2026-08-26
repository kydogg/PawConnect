# No Edge Functions for CRUD — direct SDK calls guarded by RLS

The Master Checklist prescribed 13 Supabase Edge Functions for Phase 1 (`signUpWithEmail`, `signIn`, `users:updateRole`, `pets:create`, …), but the shipped auth code already calls the Supabase SDK directly, and none of these operations need server-side authority. We decided the app talks straight to Supabase Auth/Postgres/Storage via supabase-swift, with Row Level Security policies as the guard and a Postgres trigger creating the Profile row on signup (`public.profiles`, shipped in migration 0001) — zero Edge Functions in Phase 1.

## Considered options

- **Edge Functions for every endpoint** (the original checklist): adds a deploy surface, latency, and duplicated validation for CRUD writes the row-owner is already allowed to make.
- **Direct SDK + RLS** (chosen): less code, one source of authorization truth (Postgres policies), matches the code already merged in PR #1.

## Consequences

- RLS policies are now load-bearing security; every new table needs policies before the client touches it.
- Edge Functions are reserved for genuinely server-authoritative flows in later phases — the booking state machine (Phase 4) and Live Activity APNs pushes (Phase 5).
- The Phase 1 backend section of `PawConnect-Master-Checklist.md` was rewritten to match this decision.
