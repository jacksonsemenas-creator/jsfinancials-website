-- ============================================================================
-- Daily Reports API: add columns for automated ingestion and publish flow
-- Run via Supabase SQL Editor
-- ============================================================================

-- Add new columns to daily_reports
alter table public.daily_reports
  add column if not exists day_number int,
  add column if not exists edition text not null default 'daily' check (edition in ('daily', 'weekend', 'holiday')),
  add column if not exists status text not null default 'published' check (status in ('draft', 'published')),
  add column if not exists email_blurb text,
  add column if not exists published_at timestamptz;

-- Set all existing reports to published (they were manually uploaded and visible)
update public.daily_reports set status = 'published', published_at = created_at where status = 'published' and published_at is null;

-- Index on status for the member query
create index if not exists idx_daily_reports_status on public.daily_reports(status);
