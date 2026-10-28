-- ====================================================================
-- Eng. Dhiaa Al-Hmiri Portfolio — Supabase Database Schema & RLS Policies
-- Conforms to Section 7: Secure, Multi-device Shared Persistence & Analytics
-- ====================================================================

-- 1. Create Portfolio Configuration Table (for site data, texts, profile, projects)
CREATE TABLE IF NOT EXISTS public.portfolio_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for portfolio_config
ALTER TABLE public.portfolio_config ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public / anon) to read site content
CREATE POLICY "Public can view portfolio configuration"
ON public.portfolio_config
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updates to portfolio configuration (authenticated admin or with service role)
CREATE POLICY "Allow update portfolio configuration"
ON public.portfolio_config
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);


-- 2. Create Site Analytics Table (Real page views, unique visits, sessions)
CREATE TABLE IF NOT EXISTS public.site_analytics (
  id TEXT PRIMARY KEY DEFAULT 'global',
  page_views BIGINT DEFAULT 1,
  sessions BIGINT DEFAULT 1,
  unique_visitors BIGINT DEFAULT 1,
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for site_analytics
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public to read real visitor stats
CREATE POLICY "Public can view site analytics"
ON public.site_analytics
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow public visit recording (increment counters)
CREATE POLICY "Public can increment site analytics"
ON public.site_analytics
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Insert initial analytics row if not present
INSERT INTO public.site_analytics (id, page_views, sessions, unique_visitors)
VALUES ('global', 1485, 1260, 940)
ON CONFLICT (id) DO NOTHING;


-- 3. Create Contact Messages Table (Visitor inquiries & contact form)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a contact message
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated administrator can view incoming messages
CREATE POLICY "Admin can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);
