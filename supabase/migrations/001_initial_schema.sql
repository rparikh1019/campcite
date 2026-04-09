-- CampCite Database Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    plan VARCHAR(20) DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'growth', 'pro')),
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    payment_failed_at TIMESTAMP WITH TIME ZONE,
    payment_failure_count INTEGER DEFAULT 0
);

-- Campgrounds table
CREATE TABLE campgrounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Required NAP fields
    name VARCHAR(255) NOT NULL,
    street_address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    phone VARCHAR(50) NOT NULL,

    -- Optional core fields
    website VARCHAR(500),
    email VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,

    -- Flexible attributes (JSONB)
    attributes JSONB DEFAULT '{}',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- MVP: 1 user = 1 campground
    UNIQUE(user_id)
);

-- Campground media (photos, logos, videos)
CREATE TABLE campground_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campground_id UUID REFERENCES campgrounds(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('photo', 'logo', 'video')),
    url VARCHAR(1000) NOT NULL,
    caption VARCHAR(500),
    category VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Directory connections (OAuth tokens, session data)
CREATE TABLE directory_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    directory VARCHAR(50) NOT NULL,

    -- OAuth tokens
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,

    -- Session-based auth (for camping directories)
    session_data_encrypted TEXT,
    session_expires_at TIMESTAMP WITH TIME ZONE,

    -- External identifiers
    external_id VARCHAR(255),
    external_url VARCHAR(500),

    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('connected', 'disconnected', 'error', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id, directory)
);

-- Directory listings (tracking sync status per directory)
CREATE TABLE directory_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campground_id UUID REFERENCES campgrounds(id) ON DELETE CASCADE,
    directory VARCHAR(50) NOT NULL,
    external_id VARCHAR(255),
    external_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'synced', 'error', 'not_found', 'syncing')),
    last_synced_at TIMESTAMP WITH TIME ZONE,
    last_sync_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(campground_id, directory)
);

-- Sync jobs queue (pg-boss pattern)
CREATE TABLE sync_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campground_id UUID REFERENCES campgrounds(id) ON DELETE CASCADE,
    directory VARCHAR(50) NOT NULL,

    -- Job state
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'success', 'failed', 'cancelled')),
    priority INTEGER DEFAULT 0,

    -- Retry handling
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,

    -- Scheduling
    scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Results
    result JSONB,
    error TEXT,
    screenshots TEXT[],

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Directories reference table
CREATE TABLE directories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('api', 'browser')),
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('starter', 'growth', 'pro')),
    icon VARCHAR(10),
    is_active BOOLEAN DEFAULT true
);

-- Seed directories
INSERT INTO directories (id, name, type, tier, icon) VALUES
    ('google', 'Google Business', 'api', 'starter', '🔍'),
    ('facebook', 'Facebook', 'api', 'starter', '📘'),
    ('bing', 'Bing Places', 'api', 'starter', '🔎'),
    ('campendium', 'Campendium', 'browser', 'starter', '🏕️'),
    ('the_dyrt', 'The Dyrt', 'browser', 'starter', '⛺'),
    ('rv_life', 'RV LIFE', 'browser', 'starter', '🚐'),
    ('apple', 'Apple Maps', 'api', 'growth', '🍎'),
    ('good_sam', 'Good Sam', 'browser', 'growth', '👍'),
    ('allstays', 'Allstays', 'browser', 'growth', '📍'),
    ('hipcamp', 'Hipcamp', 'browser', 'growth', '🌲'),
    ('yelp', 'Yelp', 'browser', 'pro', '⭐'),
    ('tripadvisor', 'TripAdvisor', 'browser', 'pro', '🦉');

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campgrounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE campground_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can CRUD own campgrounds" ON campgrounds
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own media" ON campground_media
    FOR ALL USING (
        campground_id IN (SELECT id FROM campgrounds WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can CRUD own connections" ON directory_connections
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD own listings" ON directory_listings
    FOR ALL USING (
        campground_id IN (SELECT id FROM campgrounds WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can read own sync jobs" ON sync_jobs
    FOR SELECT USING (
        campground_id IN (SELECT id FROM campgrounds WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can create sync jobs" ON sync_jobs
    FOR INSERT WITH CHECK (
        campground_id IN (SELECT id FROM campgrounds WHERE user_id = auth.uid())
    );

-- Indexes
CREATE INDEX idx_campground_user ON campgrounds(user_id);
CREATE INDEX idx_media_campground ON campground_media(campground_id);
CREATE INDEX idx_connections_user ON directory_connections(user_id);
CREATE INDEX idx_listings_campground ON directory_listings(campground_id);
CREATE INDEX idx_pending_jobs ON sync_jobs(status, scheduled_for, priority DESC) WHERE status = 'pending';
CREATE INDEX idx_user_jobs ON sync_jobs(campground_id, created_at DESC);

-- Functions for job queue
CREATE OR REPLACE FUNCTION claim_next_job(worker_id TEXT)
RETURNS sync_jobs AS $$
DECLARE
    job sync_jobs;
BEGIN
    SELECT * INTO job
    FROM sync_jobs
    WHERE status = 'pending'
      AND scheduled_for <= NOW()
    ORDER BY priority DESC, scheduled_for ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED;

    IF job.id IS NOT NULL THEN
        UPDATE sync_jobs
        SET status = 'running',
            started_at = NOW(),
            attempts = attempts + 1
        WHERE id = job.id;
    END IF;

    RETURN job;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION complete_job(
    job_id UUID,
    job_result JSONB,
    job_screenshots TEXT[]
)
RETURNS void AS $$
BEGIN
    UPDATE sync_jobs
    SET status = 'success',
        completed_at = NOW(),
        result = job_result,
        screenshots = job_screenshots
    WHERE id = job_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fail_job(job_id UUID, error_msg TEXT)
RETURNS void AS $$
DECLARE
    job sync_jobs;
BEGIN
    SELECT * INTO job FROM sync_jobs WHERE id = job_id;

    IF job.attempts < job.max_attempts THEN
        -- Retry with exponential backoff
        UPDATE sync_jobs
        SET status = 'pending',
            scheduled_for = NOW() + (INTERVAL '1 minute' * POWER(2, attempts)),
            error = error_msg
        WHERE id = job_id;
    ELSE
        -- Max retries exceeded
        UPDATE sync_jobs
        SET status = 'failed',
            completed_at = NOW(),
            error = error_msg
        WHERE id = job_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create user record on auth signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Updated_at trigger for campgrounds
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER campgrounds_updated_at
    BEFORE UPDATE ON campgrounds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
