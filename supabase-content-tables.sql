-- Daily reports
create table daily_reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  report_date date not null unique,
  file_path text not null,
  created_at timestamptz not null default now()
);

create index idx_daily_reports_date on daily_reports(report_date desc);

alter table daily_reports enable row level security;

create policy "Authenticated users can read reports"
  on daily_reports for select
  using (auth.role() = 'authenticated');

create policy "Service role full access on daily_reports"
  on daily_reports for all
  using (auth.role() = 'service_role');

-- Course materials
create table course_materials (
  id uuid primary key default gen_random_uuid(),
  course text not null check (course in ('macro_course', 'prediction_markets')),
  title text not null,
  module_number int,
  description text,
  file_path text not null,
  created_at timestamptz not null default now()
);

create index idx_course_materials_course on course_materials(course, module_number);

alter table course_materials enable row level security;

create policy "Authenticated users can read course materials"
  on course_materials for select
  using (auth.role() = 'authenticated');

create policy "Service role full access on course_materials"
  on course_materials for all
  using (auth.role() = 'service_role');

-- Research resources
create table research_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  resource_type text not null default 'pdf' check (resource_type in ('pdf', 'video')),
  file_path text,
  video_url text,
  created_at timestamptz not null default now()
);

alter table research_resources enable row level security;

create policy "Authenticated users can read research"
  on research_resources for select
  using (auth.role() = 'authenticated');

create policy "Service role full access on research_resources"
  on research_resources for all
  using (auth.role() = 'service_role');

-- Storage bucket for member content
insert into storage.buckets (id, name, public)
values ('member-content', 'member-content', false)
on conflict (id) do nothing;

-- Storage policies: authenticated users can read, service role can upload
create policy "Authenticated users can read member content"
  on storage.objects for select
  using (bucket_id = 'member-content' and auth.role() = 'authenticated');

create policy "Service role can manage member content"
  on storage.objects for all
  using (bucket_id = 'member-content' and auth.role() = 'service_role');
