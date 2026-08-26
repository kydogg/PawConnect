-- =============================================================
-- 0003: Profile creation on signup + Row Level Security
-- Implements ADR-0001: no Edge Functions — the client talks to
-- Postgres directly, so RLS is the authorization boundary.
-- =============================================================

-- -------------------------------------------------------------
-- Trigger: create a profiles row for every new auth user.
-- full_name arrives via signup metadata (raw_user_meta_data).
-- SECURITY DEFINER so the insert bypasses RLS.
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -------------------------------------------------------------
-- Enable RLS on every table. Tables without policies are
-- deny-all until the phase that builds on them adds policies.
-- -------------------------------------------------------------
ALTER TABLE public.profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sitter_profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_medications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_feeding_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_pets         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_sessions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.walks                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_photos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recent_sitter_views  ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- profiles: a user reads and updates only their own row.
-- Inserts happen via the trigger; deletes cascade from auth.users.
-- (Public sitter discovery gets its own SELECT policy in Phase 3.)
-- -------------------------------------------------------------
CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- -------------------------------------------------------------
-- pets: full CRUD for the owning user only.
-- -------------------------------------------------------------
CREATE POLICY "pets_select_own" ON public.pets
    FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "pets_insert_own" ON public.pets
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "pets_update_own" ON public.pets
    FOR UPDATE USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "pets_delete_own" ON public.pets
    FOR DELETE USING (auth.uid() = owner_id);

-- -------------------------------------------------------------
-- pet_medications / pet_feeding_schedule: access follows pet
-- ownership.
-- -------------------------------------------------------------
CREATE POLICY "pet_medications_own_pet" ON public.pet_medications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_medications.pet_id
              AND pets.owner_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_medications.pet_id
              AND pets.owner_id = auth.uid()
        )
    );

CREATE POLICY "pet_feeding_schedule_own_pet" ON public.pet_feeding_schedule
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_feeding_schedule.pet_id
              AND pets.owner_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = pet_feeding_schedule.pet_id
              AND pets.owner_id = auth.uid()
        )
    );
