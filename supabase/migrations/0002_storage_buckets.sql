-- PawConnect Storage Buckets + Policies
-- Run AFTER 0001_initial_schema.sql, since care-photos policies reference care_sessions/bookings.
--
-- Folder conventions enforced by these policies:
--   user-avatars/<user_uid>/<filename>
--   pet-avatars/<user_uid>/<pet_id>/<filename>
--   care-photos/<session_id>/<filename>

-------------------------------------------------
-- BUCKETS
-------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES
    ('pet-avatars',  'pet-avatars',  true),
    ('user-avatars', 'user-avatars', true),
    ('care-photos',  'care-photos',  true)
ON CONFLICT (id) DO NOTHING;

-------------------------------------------------
-- pet-avatars
-------------------------------------------------

CREATE POLICY "pet-avatars: public read"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'pet-avatars');

CREATE POLICY "pet-avatars: owner can insert"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'pet-avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "pet-avatars: owner can update"
    ON storage.objects FOR UPDATE TO authenticated
    USING (
        bucket_id = 'pet-avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "pet-avatars: owner can delete"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'pet-avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-------------------------------------------------
-- user-avatars
-------------------------------------------------

CREATE POLICY "user-avatars: public read"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'user-avatars');

CREATE POLICY "user-avatars: user can insert own"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'user-avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "user-avatars: user can update own"
    ON storage.objects FOR UPDATE TO authenticated
    USING (
        bucket_id = 'user-avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "user-avatars: user can delete own"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'user-avatars'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-------------------------------------------------
-- care-photos
-- Read: either booking participant. Write: sitter on that session.
-------------------------------------------------

CREATE POLICY "care-photos: session participants can read"
    ON storage.objects FOR SELECT TO authenticated
    USING (
        bucket_id = 'care-photos'
        AND EXISTS (
            SELECT 1
            FROM public.care_sessions cs
            JOIN public.bookings b ON b.id = cs.booking_id
            WHERE cs.id::text = (storage.foldername(name))[1]
              AND (b.owner_id = auth.uid() OR b.sitter_id = auth.uid())
        )
    );

CREATE POLICY "care-photos: sitter can insert"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'care-photos'
        AND EXISTS (
            SELECT 1
            FROM public.care_sessions cs
            WHERE cs.id::text = (storage.foldername(name))[1]
              AND cs.sitter_id = auth.uid()
        )
    );

CREATE POLICY "care-photos: sitter can update own"
    ON storage.objects FOR UPDATE TO authenticated
    USING (
        bucket_id = 'care-photos'
        AND EXISTS (
            SELECT 1
            FROM public.care_sessions cs
            WHERE cs.id::text = (storage.foldername(name))[1]
              AND cs.sitter_id = auth.uid()
        )
    );

CREATE POLICY "care-photos: sitter can delete own"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'care-photos'
        AND EXISTS (
            SELECT 1
            FROM public.care_sessions cs
            WHERE cs.id::text = (storage.foldername(name))[1]
              AND cs.sitter_id = auth.uid()
        )
    );
