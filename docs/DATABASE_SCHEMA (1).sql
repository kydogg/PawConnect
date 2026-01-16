-- PawConnect Database Schema for Supabase
-- Version 1.0 | January 2026
--
-- Run this in Supabase SQL Editor to set up your database.
-- Make sure to enable Row Level Security (RLS) after creating tables.

-------------------------------------------------
-- EXTENSIONS
-------------------------------------------------

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location queries (optional, for advanced geo)
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-------------------------------------------------
-- CUSTOM TYPES (ENUMS)
-------------------------------------------------

-- User roles
CREATE TYPE user_role AS ENUM ('owner', 'sitter', 'both');

-- Pet species
CREATE TYPE pet_species AS ENUM ('dog', 'cat', 'other');

-- Pet sex
CREATE TYPE pet_sex AS ENUM ('male', 'female', 'unknown');

-- Service types
CREATE TYPE service_type AS ENUM ('walking', 'dropin', 'sitting', 'boarding', 'daycare');

-- Booking status
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'active', 'completed', 'cancelled', 'declined');

-- Medication frequency
CREATE TYPE medication_frequency AS ENUM ('once_daily', 'twice_daily', 'three_times_daily', 'weekly', 'as_needed');

-- Feeding time labels
CREATE TYPE feeding_label AS ENUM ('morning', 'midday', 'afternoon', 'evening', 'night');

-- Care checklist item types
CREATE TYPE checklist_item_type AS ENUM ('medication', 'feeding', 'walk', 'bathroom', 'custom');

-------------------------------------------------
-- TABLES
-------------------------------------------------

-- Users (extends Supabase auth.users)
-- This table stores additional profile data for authenticated users
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'owner',
    
    -- Location
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Onboarding
    has_completed_onboarding BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sitter profiles (additional data for users who are sitters)
CREATE TABLE public.sitter_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Bio & Display
    bio TEXT NOT NULL DEFAULT '',
    
    -- Service area
    service_radius_miles INTEGER NOT NULL DEFAULT 10,
    
    -- Services offered (stored as JSONB for flexibility)
    -- Format: { "walking": true, "sitting": false, ... }
    services_offered JSONB NOT NULL DEFAULT '{}',
    
    -- Rates (stored as JSONB)
    -- Format: { "walking": 25, "sitting": 75, ... }
    rates JSONB NOT NULL DEFAULT '{}',
    
    -- Availability (stored as JSONB)
    -- Format: { "monday": { "morning": true, "afternoon": false, "evening": true }, ... }
    availability JSONB NOT NULL DEFAULT '{}',
    
    -- Stats (denormalized for performance)
    rating_average DECIMAL(2, 1),
    rating_count INTEGER NOT NULL DEFAULT 0,
    response_time_minutes INTEGER,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id)
);

-- Pets
CREATE TABLE public.pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Basic info
    name TEXT NOT NULL,
    species pet_species NOT NULL,
    breed TEXT,
    age INTEGER NOT NULL, -- in years, 0 for < 1 year
    weight INTEGER, -- in pounds
    sex pet_sex NOT NULL DEFAULT 'unknown',
    avatar_url TEXT,
    
    -- Care details
    special_instructions TEXT,
    
    -- Vet info (stored as JSONB)
    -- Format: { "clinic_name": "...", "phone": "...", "doctor_name": "..." }
    vet_info JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pet medications
CREATE TABLE public.pet_medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency medication_frequency NOT NULL,
    times TEXT[] NOT NULL DEFAULT '{}', -- Array of times like ["08:00", "20:00"]
    instructions TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pet feeding schedule
CREATE TABLE public.pet_feeding_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    
    label feeding_label NOT NULL,
    time TEXT NOT NULL, -- "HH:MM" format
    amount TEXT NOT NULL,
    food_type TEXT NOT NULL,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Parties
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sitter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Service details
    service_type service_type NOT NULL,
    
    -- Dates and times
    start_date DATE NOT NULL,
    end_date DATE, -- NULL for single-day services
    start_time TEXT NOT NULL, -- "HH:MM"
    end_time TEXT, -- "HH:MM"
    
    -- Recurring (for day care)
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
    recurring_days TEXT[], -- ["monday", "wednesday", "friday"]
    
    -- Status
    status booking_status NOT NULL DEFAULT 'pending',
    
    -- Notes from owner
    notes TEXT,
    
    -- Pricing
    subtotal DECIMAL(10, 2) NOT NULL,
    service_fee DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    
    -- Decline reason (if declined)
    decline_reason TEXT,
    decline_message TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ
);

-- Booking pets (junction table - which pets are in a booking)
CREATE TABLE public.booking_pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(booking_id, pet_id)
);

-- Care sessions (active care tracking for Live Activities)
CREATE TABLE public.care_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    sitter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Status
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed'
    
    -- Timestamps
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    -- Stats (updated in real-time)
    completed_items_count INTEGER NOT NULL DEFAULT 0,
    total_items_count INTEGER NOT NULL DEFAULT 0
);

-- Care session checklist items
CREATE TABLE public.care_checklist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.care_sessions(id) ON DELETE CASCADE,
    
    -- Item details
    item_type checklist_item_type NOT NULL,
    label TEXT NOT NULL,
    details TEXT, -- e.g., "1 tablet Heartgard"
    
    -- Completion
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    notes TEXT, -- Sitter's notes
    
    -- Order
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Walks (GPS tracked walks during care sessions)
CREATE TABLE public.walks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.care_sessions(id) ON DELETE CASCADE,
    
    -- Location data
    start_location JSONB, -- { "lat": ..., "lng": ... }
    end_location JSONB,
    route JSONB, -- Array of { "lat": ..., "lng": ..., "timestamp": ... }
    
    -- Stats
    distance_meters INTEGER,
    duration_seconds INTEGER,
    
    -- Timestamps
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ
);

-- Care photos (photos sent during care sessions)
CREATE TABLE public.care_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.care_sessions(id) ON DELETE CASCADE,
    
    photo_url TEXT NOT NULL,
    caption TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Conversations (messaging)
CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Participants (we store both for easy querying)
    participant_1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    participant_2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Last message preview (denormalized)
    last_message_text TEXT,
    last_message_at TIMESTAMPTZ,
    last_message_sender_id UUID REFERENCES public.profiles(id),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure unique conversation between two users
    UNIQUE(participant_1_id, participant_2_id)
);

-- Messages
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    text TEXT NOT NULL,
    
    -- Read status
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    
    -- Parties
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    tags TEXT[], -- ["great_communication", "followed_instructions", etc.]
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- One review per booking per direction
    UNIQUE(booking_id, reviewer_id)
);

-- Favorites (owners favorite sitters)
CREATE TABLE public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sitter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(owner_id, sitter_id)
);

-- Recently viewed sitters
CREATE TABLE public.recent_sitter_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    viewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sitter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-------------------------------------------------
-- INDEXES
-------------------------------------------------

-- Profiles
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_location ON public.profiles(latitude, longitude);

-- Sitter profiles
CREATE INDEX idx_sitter_profiles_rating ON public.sitter_profiles(rating_average DESC);

-- Pets
CREATE INDEX idx_pets_owner ON public.pets(owner_id);

-- Bookings
CREATE INDEX idx_bookings_owner ON public.bookings(owner_id);
CREATE INDEX idx_bookings_sitter ON public.bookings(sitter_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_dates ON public.bookings(start_date, end_date);

-- Care sessions
CREATE INDEX idx_care_sessions_booking ON public.care_sessions(booking_id);
CREATE INDEX idx_care_sessions_status ON public.care_sessions(status);

-- Messages
CREATE INDEX idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX idx_messages_created ON public.messages(created_at DESC);

-- Reviews
CREATE INDEX idx_reviews_reviewee ON public.reviews(reviewee_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);

-- Favorites
CREATE INDEX idx_favorites_owner ON public.favorites(owner_id);

-------------------------------------------------
-- FUNCTIONS
-------------------------------------------------

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update sitter rating when review is added
CREATE OR REPLACE FUNCTION update_sitter_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.sitter_profiles
    SET 
        rating_average = (
            SELECT AVG(rating)::DECIMAL(2,1)
            FROM public.reviews
            WHERE reviewee_id = NEW.reviewee_id
        ),
        rating_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE reviewee_id = NEW.reviewee_id
        ),
        updated_at = NOW()
    WHERE user_id = NEW.reviewee_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update conversation last message
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.conversations
    SET 
        last_message_text = NEW.text,
        last_message_at = NEW.created_at,
        last_message_sender_id = NEW.sender_id,
        updated_at = NOW()
    WHERE id = NEW.conversation_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update care session stats
CREATE OR REPLACE FUNCTION update_care_session_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.care_sessions
    SET 
        completed_items_count = (
            SELECT COUNT(*) 
            FROM public.care_checklist_items 
            WHERE session_id = NEW.session_id AND is_completed = TRUE
        ),
        total_items_count = (
            SELECT COUNT(*) 
            FROM public.care_checklist_items 
            WHERE session_id = NEW.session_id
        )
    WHERE id = NEW.session_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to create profile after signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-------------------------------------------------
-- TRIGGERS
-------------------------------------------------

-- Updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sitter_profiles_updated_at
    BEFORE UPDATE ON public.sitter_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at
    BEFORE UPDATE ON public.pets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Review rating update trigger
CREATE TRIGGER update_sitter_rating_on_review
    AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_sitter_rating();

-- Conversation last message trigger
CREATE TRIGGER update_conversation_on_message
    AFTER INSERT ON public.messages
    FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- Care session stats trigger
CREATE TRIGGER update_care_session_on_checklist_change
    AFTER INSERT OR UPDATE ON public.care_checklist_items
    FOR EACH ROW EXECUTE FUNCTION update_care_session_stats();

-- Auto-create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sitter_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_feeding_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.walks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.care_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recent_sitter_views ENABLE ROW LEVEL SECURITY;

-------------------------------------------------
-- RLS POLICIES
-------------------------------------------------

-- Profiles: Users can read all profiles, update only their own
CREATE POLICY "Profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Sitter profiles: Public read, owner update
CREATE POLICY "Sitter profiles are viewable by everyone" 
    ON public.sitter_profiles FOR SELECT 
    USING (true);

CREATE POLICY "Sitters can update own sitter profile" 
    ON public.sitter_profiles FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Sitters can insert own sitter profile" 
    ON public.sitter_profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Pets: Owner can CRUD, sitters can read (via booking)
CREATE POLICY "Users can read own pets" 
    ON public.pets FOR SELECT 
    USING (auth.uid() = owner_id);

CREATE POLICY "Sitters can read pets in their bookings" 
    ON public.pets FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.booking_pets bp
            JOIN public.bookings b ON bp.booking_id = b.id
            WHERE bp.pet_id = pets.id AND b.sitter_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own pets" 
    ON public.pets FOR INSERT 
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own pets" 
    ON public.pets FOR UPDATE 
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own pets" 
    ON public.pets FOR DELETE 
    USING (auth.uid() = owner_id);

-- Pet medications: Same as pets
CREATE POLICY "Users can manage own pet medications" 
    ON public.pet_medications FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.pets 
            WHERE pets.id = pet_medications.pet_id AND pets.owner_id = auth.uid()
        )
    );

CREATE POLICY "Sitters can read pet medications in their bookings" 
    ON public.pet_medications FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.booking_pets bp
            JOIN public.bookings b ON bp.booking_id = b.id
            WHERE bp.pet_id = pet_medications.pet_id AND b.sitter_id = auth.uid()
        )
    );

-- Pet feeding schedule: Same as medications
CREATE POLICY "Users can manage own pet feeding schedule" 
    ON public.pet_feeding_schedule FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.pets 
            WHERE pets.id = pet_feeding_schedule.pet_id AND pets.owner_id = auth.uid()
        )
    );

CREATE POLICY "Sitters can read pet feeding in their bookings" 
    ON public.pet_feeding_schedule FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.booking_pets bp
            JOIN public.bookings b ON bp.booking_id = b.id
            WHERE bp.pet_id = pet_feeding_schedule.pet_id AND b.sitter_id = auth.uid()
        )
    );

-- Bookings: Owner and sitter can read/update their bookings
CREATE POLICY "Users can read own bookings" 
    ON public.bookings FOR SELECT 
    USING (auth.uid() = owner_id OR auth.uid() = sitter_id);

CREATE POLICY "Owners can create bookings" 
    ON public.bookings FOR INSERT 
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Participants can update bookings" 
    ON public.bookings FOR UPDATE 
    USING (auth.uid() = owner_id OR auth.uid() = sitter_id);

-- Booking pets: Same as bookings
CREATE POLICY "Users can manage booking pets" 
    ON public.booking_pets FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.bookings 
            WHERE bookings.id = booking_pets.booking_id 
            AND (bookings.owner_id = auth.uid() OR bookings.sitter_id = auth.uid())
        )
    );

-- Care sessions: Sitter manages, owner can read
CREATE POLICY "Sitters can manage their care sessions" 
    ON public.care_sessions FOR ALL 
    USING (auth.uid() = sitter_id);

CREATE POLICY "Owners can read their care sessions" 
    ON public.care_sessions FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.bookings 
            WHERE bookings.id = care_sessions.booking_id AND bookings.owner_id = auth.uid()
        )
    );

-- Care checklist items: Sitter manages, owner can read
CREATE POLICY "Sitters can manage checklist items" 
    ON public.care_checklist_items FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.care_sessions 
            WHERE care_sessions.id = care_checklist_items.session_id 
            AND care_sessions.sitter_id = auth.uid()
        )
    );

CREATE POLICY "Owners can read checklist items" 
    ON public.care_checklist_items FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.care_sessions cs
            JOIN public.bookings b ON b.id = cs.booking_id
            WHERE cs.id = care_checklist_items.session_id AND b.owner_id = auth.uid()
        )
    );

-- Walks: Same as checklist items
CREATE POLICY "Sitters can manage walks" 
    ON public.walks FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.care_sessions 
            WHERE care_sessions.id = walks.session_id AND care_sessions.sitter_id = auth.uid()
        )
    );

CREATE POLICY "Owners can read walks" 
    ON public.walks FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.care_sessions cs
            JOIN public.bookings b ON b.id = cs.booking_id
            WHERE cs.id = walks.session_id AND b.owner_id = auth.uid()
        )
    );

-- Care photos: Same pattern
CREATE POLICY "Sitters can add care photos" 
    ON public.care_photos FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.care_sessions 
            WHERE care_sessions.id = care_photos.session_id AND care_sessions.sitter_id = auth.uid()
        )
    );

CREATE POLICY "Session participants can read care photos" 
    ON public.care_photos FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.care_sessions cs
            JOIN public.bookings b ON b.id = cs.booking_id
            WHERE cs.id = care_photos.session_id 
            AND (b.owner_id = auth.uid() OR b.sitter_id = auth.uid())
        )
    );

-- Conversations: Participants only
CREATE POLICY "Users can read their conversations" 
    ON public.conversations FOR SELECT 
    USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Users can create conversations they're part of" 
    ON public.conversations FOR INSERT 
    WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Participants can update their conversations" 
    ON public.conversations FOR UPDATE 
    USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

-- Messages: Conversation participants only
CREATE POLICY "Users can read messages in their conversations" 
    ON public.messages FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations 
            WHERE conversations.id = messages.conversation_id 
            AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
        )
    );

CREATE POLICY "Users can send messages in their conversations" 
    ON public.messages FOR INSERT 
    WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.conversations 
            WHERE conversations.id = messages.conversation_id 
            AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
        )
    );

CREATE POLICY "Recipients can mark messages as read" 
    ON public.messages FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations 
            WHERE conversations.id = messages.conversation_id 
            AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
        )
    );

-- Reviews: Public read, authenticated create
CREATE POLICY "Reviews are viewable by everyone" 
    ON public.reviews FOR SELECT 
    USING (true);

CREATE POLICY "Users can create reviews for their bookings" 
    ON public.reviews FOR INSERT 
    WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM public.bookings 
            WHERE bookings.id = reviews.booking_id 
            AND (bookings.owner_id = auth.uid() OR bookings.sitter_id = auth.uid())
            AND bookings.status = 'completed'
        )
    );

-- Favorites: User manages their own
CREATE POLICY "Users can manage their favorites" 
    ON public.favorites FOR ALL 
    USING (auth.uid() = owner_id);

-- Recent views: User manages their own
CREATE POLICY "Users can manage their recent views" 
    ON public.recent_sitter_views FOR ALL 
    USING (auth.uid() = viewer_id);

-------------------------------------------------
-- STORAGE BUCKETS
-------------------------------------------------

-- Run these in Supabase dashboard or via API:
-- 
-- 1. Create bucket: avatars (public)
-- 2. Create bucket: pet-photos (public)
-- 3. Create bucket: care-photos (public)
--
-- Storage policies (set in Supabase dashboard):
-- - avatars: Anyone can read, authenticated users can upload to their own folder
-- - pet-photos: Anyone can read, pet owners can upload
-- - care-photos: Session participants can read/write

-------------------------------------------------
-- REALTIME SETUP
-------------------------------------------------

-- Enable realtime for tables that need live updates
-- Run in Supabase dashboard: 
-- Database > Replication > Add tables:
-- - care_sessions
-- - care_checklist_items
-- - walks
-- - messages
-- - bookings (for status changes)

-------------------------------------------------
-- SAMPLE DATA (for development)
-------------------------------------------------

-- Uncomment and modify to insert test data after running migrations

/*
-- Test user (create via Supabase Auth first, then update profile)
UPDATE public.profiles 
SET 
    full_name = 'Test Owner',
    role = 'owner',
    city = 'San Francisco',
    state = 'CA',
    latitude = 37.7749,
    longitude = -122.4194,
    has_completed_onboarding = true
WHERE email = 'test@example.com';

-- Test pet
INSERT INTO public.pets (owner_id, name, species, breed, age, weight, sex)
SELECT id, 'Buddy', 'dog', 'Golden Retriever', 3, 65, 'male'
FROM public.profiles WHERE email = 'test@example.com';
*/

-------------------------------------------------
-- NOTES
-------------------------------------------------

/*
After running this schema:

1. Go to Supabase Dashboard > Authentication > Providers
   - Enable Email provider
   - Enable Apple provider (requires Apple Developer account)

2. Go to Storage and create buckets:
   - avatars (public)
   - pet-photos (public)
   - care-photos (public)

3. Go to Database > Replication
   - Enable realtime for: care_sessions, care_checklist_items, walks, messages, bookings

4. Copy your project URL and anon key to your iOS app config

5. Test the schema by creating a user through your app!
*/
