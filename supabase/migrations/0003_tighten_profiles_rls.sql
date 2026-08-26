-- =============================================================
-- 0003: Tighten profiles RLS to own-row access (ADR-0001)
--
-- 0001 already ships the signup trigger (on_auth_user_created →
-- handle_new_user), RLS enables on every table, and owner policies
-- for pets/medications/feeding. What it left open: profiles were
-- world-readable (SELECT USING (true)), exposing email, phone,
-- address, and lat/long to any client with the anon key. Under
-- ADR-0001 RLS is the authorization boundary, so profiles become
-- own-row only.
--
-- Phase 3 sitter discovery adds its own deliberately scoped read
-- path (sitter_profiles is already public-readable and carries the
-- public-facing bio).
--
-- Re-runnable: each CREATE is preceded by DROP IF EXISTS.
-- =============================================================

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Recreate the update policy with WITH CHECK so an update can't
-- re-own the row (0001's version had USING only).
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
