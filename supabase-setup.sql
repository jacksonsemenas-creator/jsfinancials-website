-- Entitlements table
create type entitlement_product as enum (
  'daily_report',
  'macro_course',
  'discord',
  'bootcamp'
);

create type entitlement_status as enum (
  'active',
  'past_due',
  'canceled'
);

create table entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product entitlement_product not null,
  status entitlement_status not null default 'active',
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create index idx_entitlements_user on entitlements(user_id);

alter table entitlements enable row level security;

create policy "Users can read own entitlements"
  on entitlements for select
  using (auth.uid() = user_id);

create policy "Service role full access"
  on entitlements for all
  using (auth.role() = 'service_role');

-- Admins table
create table admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admins enable row level security;

create policy "Service role full access on admins"
  on admins for all
  using (auth.role() = 'service_role');
