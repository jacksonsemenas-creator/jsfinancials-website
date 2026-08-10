-- ============================================================================
-- Seed Script for Mentorship Portal
-- Run AFTER migration. Run via Supabase SQL Editor.
--
-- IMPORTANT: Replace the UUIDs below with real auth.users IDs.
-- 1. Create your admin user in Supabase Auth first (or use existing)
-- 2. Create a test client user in Supabase Auth
-- 3. Copy their UUIDs into the variables below
-- ============================================================================

-- Replace these with real user IDs from auth.users
-- Admin: jsfinancialsaustralia@gmail.com
-- Test client: create a test user first

-- For now, use the admin user ID (jsfinancialsaustralia@gmail.com)
-- Run this after confirming the user ID:

-- INSERT admin profile
-- insert into public.profiles (id, full_name, role, track, current_period)
-- values ('<ADMIN_USER_UUID>', 'Jackson Semenas', 'admin', null, 1);

-- INSERT test client profile
-- insert into public.profiles (id, full_name, role, track, current_period)
-- values ('<CLIENT_USER_UUID>', 'Test Client', 'client', 'beginner', 1);

-- Sample content items
insert into public.content_items (type, title, description, period, sort_order)
values
  ('period_doc', 'Period 1: Foundations of Quantitative Trading', 'Core concepts, market structure, and the quantitative mindset.', 1, 1),
  ('period_doc', 'Period 2: Statistical Foundations', 'Probability, distributions, hypothesis testing, and time series basics.', 2, 2);

insert into public.content_items (type, title, description, topic_slug, sort_order)
values
  ('topic_doc', 'Autocorrelation in Financial Time Series', 'How serial correlation affects strategy design and what to do about it.', 'autocorrelation', 1),
  ('topic_doc', 'Cointegration and Pairs Trading', 'Statistical foundations of mean-reversion strategies using cointegrated pairs.', 'cointegration', 2),
  ('topic_doc', 'Data Cleaning for Quantitative Research', 'Handling missing data, outliers, survivorship bias, and lookahead contamination.', 'data-cleaning', 3);

insert into public.content_items (type, title, description, sort_order)
values
  ('applicability_module', 'Module 1: Your First Backtest', 'Build a simple moving average crossover backtest in Python. Focus on process, not results.', 1);

insert into public.content_items (type, title, description, video_url, sort_order)
values
  ('video', 'Introduction to the Mentorship', 'What to expect, how sessions work, and how to get the most out of the next 6 months.', 'https://www.youtube.com/watch?v=placeholder1', 1),
  ('video', 'Market Microstructure Overview', 'How orders flow through exchanges, the role of market makers, and why it matters for your models.', 'https://www.youtube.com/watch?v=placeholder2', 2);

-- Sample announcement
insert into public.announcements (title, body)
values (
  'Welcome to the Mentorship Portal',
  'This is your central hub for all mentorship materials. Period documents, topic references, video walkthroughs, and submissions are all managed from here. Reach out if you have any questions.'
);

-- Grant test client access to period 1 content
-- Uncomment after inserting client profile:
-- insert into public.client_access (client_id, content_id)
-- select '<CLIENT_USER_UUID>', id from public.content_items where period = 1;
