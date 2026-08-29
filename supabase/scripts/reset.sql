-- Destructive reset — DEV ONLY.
-- Wipes everything in public schema and the auth.users trigger created by
-- 0001_initial_schema.sql. Run this in the Supabase SQL editor before
-- re-running migrations from scratch.
--
-- This does NOT delete users in auth.users. To clear users, use
-- Authentication → Users in the Supabase dashboard.

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT CREATE ON SCHEMA public TO postgres, service_role;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
