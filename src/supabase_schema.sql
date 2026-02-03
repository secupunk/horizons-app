-- This file is provided as a reference to ensure the Supabase table structure matches the code expectations.
-- Run this SQL in your Supabase SQL Editor if the table does not exist.

-- Create table
CREATE TABLE IF NOT EXISTS public_routes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    distance_km NUMERIC,
    activity_type TEXT CHECK (activity_type IN ('running', 'walking', 'cycling')),
    terrain_type TEXT,
    coordinates JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    view_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    image_url TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_public_routes_city ON public_routes(city);
CREATE INDEX IF NOT EXISTS idx_public_routes_slug ON public_routes(slug);
CREATE INDEX IF NOT EXISTS idx_public_routes_is_public ON public_routes(is_public);

-- RPC function for atomic view count increment (Optional but recommended)
CREATE OR REPLACE FUNCTION increment_view_count(row_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public_routes
  SET view_count = view_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;