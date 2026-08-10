-- ============================================================================
-- Mentorship Portal Schema
-- Run via Supabase SQL Editor (Dashboard > SQL Editor > New query > paste > Run)
-- ============================================================================

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 1: CREATE ALL TABLES
-- ═══════════════════════════════════════════════════════════════════════════

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'client' check (role in ('client', 'admin')),
  track text,
  current_period int not null default 1,
  created_at timestamptz not null default now()
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('period_doc', 'topic_doc', 'applicability_module', 'video', 'resource')),
  title text not null,
  description text,
  period int,
  topic_slug text,
  storage_path text,
  video_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.client_access (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  content_id uuid not null references public.content_items(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique (client_id, content_id)
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  related_content_id uuid references public.content_items(id),
  storage_path text,
  status text not null default 'submitted' check (status in ('submitted', 'in_review', 'reviewed', 'revision_requested')),
  created_at timestamptz not null default now()
);

create table public.submission_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.progress_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  content_id uuid not null references public.content_items(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (client_id, content_id)
);

create table public.session_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  session_date date not null,
  covered text,
  assigned text,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  created_at timestamptz not null default now()
);

create table public.model_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  stage text not null default 'idea' check (stage in ('idea', 'design', 'validation', 'backtest', 'live_plan')),
  notes text,
  updated_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 2: HELPER FUNCTION (after all tables exist)
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 3: ENABLE RLS ON ALL TABLES
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.profiles enable row level security;
alter table public.content_items enable row level security;
alter table public.client_access enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_reviews enable row level security;
alter table public.progress_items enable row level security;
alter table public.session_logs enable row level security;
alter table public.announcements enable row level security;
alter table public.model_projects enable row level security;

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 4: RLS POLICIES (all tables and references exist now)
-- ═══════════════════════════════════════════════════════════════════════════

-- profiles
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users update own profile (not role)"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admin full access profiles"
  on public.profiles for all
  using (public.is_admin());

create policy "Service role full access profiles"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- content_items
create policy "Clients read unlocked content"
  on public.content_items for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.client_access
      where client_access.client_id = auth.uid()
        and client_access.content_id = content_items.id
    )
  );

create policy "Admin full access content_items"
  on public.content_items for all
  using (public.is_admin());

create policy "Service role full access content_items"
  on public.content_items for all
  using (auth.role() = 'service_role');

-- client_access
create policy "Clients read own access"
  on public.client_access for select
  using (auth.uid() = client_id);

create policy "Admin full access client_access"
  on public.client_access for all
  using (public.is_admin());

create policy "Service role full access client_access"
  on public.client_access for all
  using (auth.role() = 'service_role');

-- submissions
create policy "Clients read own submissions"
  on public.submissions for select
  using (auth.uid() = client_id);

create policy "Clients insert own submissions"
  on public.submissions for insert
  with check (auth.uid() = client_id);

create policy "Admin full access submissions"
  on public.submissions for all
  using (public.is_admin());

create policy "Service role full access submissions"
  on public.submissions for all
  using (auth.role() = 'service_role');

-- submission_reviews
create policy "Clients read reviews on own submissions"
  on public.submission_reviews for select
  using (
    exists (
      select 1 from public.submissions
      where submissions.id = submission_reviews.submission_id
        and submissions.client_id = auth.uid()
    )
  );

create policy "Clients reply on own submissions"
  on public.submission_reviews for insert
  with check (
    auth.uid() = author_id
    and exists (
      select 1 from public.submissions
      where submissions.id = submission_reviews.submission_id
        and submissions.client_id = auth.uid()
    )
  );

create policy "Admin full access submission_reviews"
  on public.submission_reviews for all
  using (public.is_admin());

create policy "Service role full access submission_reviews"
  on public.submission_reviews for all
  using (auth.role() = 'service_role');

-- progress_items
create policy "Clients manage own progress"
  on public.progress_items for all
  using (auth.uid() = client_id)
  with check (auth.uid() = client_id);

create policy "Admin full access progress_items"
  on public.progress_items for all
  using (public.is_admin());

create policy "Service role full access progress_items"
  on public.progress_items for all
  using (auth.role() = 'service_role');

-- session_logs
create policy "Clients read own session_logs"
  on public.session_logs for select
  using (auth.uid() = client_id);

create policy "Admin full access session_logs"
  on public.session_logs for all
  using (public.is_admin());

create policy "Service role full access session_logs"
  on public.session_logs for all
  using (auth.role() = 'service_role');

-- announcements
create policy "All authenticated read announcements"
  on public.announcements for select
  using (auth.role() = 'authenticated');

create policy "Admin manage announcements"
  on public.announcements for all
  using (public.is_admin());

create policy "Service role full access announcements"
  on public.announcements for all
  using (auth.role() = 'service_role');

-- model_projects
create policy "Clients read own model_projects"
  on public.model_projects for select
  using (auth.uid() = client_id);

create policy "Clients update own model_project notes"
  on public.model_projects for update
  using (auth.uid() = client_id)
  with check (auth.uid() = client_id);

create policy "Admin full access model_projects"
  on public.model_projects for all
  using (public.is_admin());

create policy "Service role full access model_projects"
  on public.model_projects for all
  using (auth.role() = 'service_role');

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 5: STORAGE BUCKETS + POLICIES
-- ═══════════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public, file_size_limit)
values ('content', 'content', false, 52428800)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submissions',
  'submissions',
  false,
  26214400,
  array[
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/zip',
    'application/x-zip-compressed',
    'application/octet-stream',
    'application/x-python-code',
    'text/x-python',
    'application/x-ipynb+json'
  ]
)
on conflict (id) do nothing;

create policy "Admin manage content bucket"
  on storage.objects for all
  using (bucket_id = 'content' and (auth.role() = 'service_role' or public.is_admin()));

create policy "Clients upload to own submissions folder"
  on storage.objects for insert
  with check (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Clients read own submissions files"
  on storage.objects for select
  using (
    bucket_id = 'submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admin full access submissions bucket"
  on storage.objects for all
  using (bucket_id = 'submissions' and (auth.role() = 'service_role' or public.is_admin()));

-- ═══════════════════════════════════════════════════════════════════════════
-- PART 6: INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

create index idx_content_items_type on public.content_items(type);
create index idx_content_items_period on public.content_items(period) where period is not null;
create index idx_client_access_client on public.client_access(client_id);
create index idx_client_access_content on public.client_access(content_id);
create index idx_submissions_client on public.submissions(client_id);
create index idx_submissions_status on public.submissions(status);
create index idx_progress_items_client on public.progress_items(client_id);
create index idx_session_logs_client on public.session_logs(client_id);
create index idx_model_projects_client on public.model_projects(client_id);
