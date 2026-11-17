-- Selftech DigiCommunity backend schema.
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).

create extension if not exists pgcrypto;

-- ------------------------------------------------------------------- tables

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  topic text not null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'read', 'archived'))
);

create table if not exists public.involvement_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  name text not null,
  organization text,
  email text not null,
  phone text,
  message text not null,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'read', 'archived'))
);

create sequence if not exists public.registration_ref_seq;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reference text not null unique,
  name text not null,
  email text not null,
  phone text not null,
  location text not null,
  program text not null,
  format text not null,
  experience text not null,
  motivation text,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'read', 'archived'))
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  date date not null,
  time text,
  kind text not null check (kind in ('Workshop', 'Webinar', 'Community event')),
  format text not null check (format in ('In person', 'Online', 'Hybrid')),
  location text not null,
  summary text not null,
  published boolean not null default true
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  summary text not null,
  topic text not null,
  type text not null check (type in ('Guide', 'Article', 'Checklist')),
  read_time text,
  href text not null,
  published boolean not null default true
);

create table if not exists public.impact_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  note text,
  sort_order integer not null default 0
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  quote text not null,
  author text,
  program text,
  published boolean not null default true
);

-- Staff allowlist. Add the auth user IDs of every staff member:
--   insert into public.staff (user_id)
--   select id from auth.users where email in ('first@example.com', 'second@example.com');
create table if not exists public.staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------- RLS

alter table public.contact_messages enable row level security;
alter table public.involvement_requests enable row level security;
alter table public.registrations enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.events enable row level security;
alter table public.resources enable row level security;
alter table public.impact_stats enable row level security;
alter table public.stories enable row level security;
alter table public.staff enable row level security;

-- True only for signed-in users on the staff allowlist.
create or replace function public.is_staff() returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.staff where user_id = auth.uid());
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to anon, authenticated;

drop policy if exists "staff can read own membership" on public.staff;
create policy "staff can read own membership"
  on public.staff for select to authenticated
  using (user_id = auth.uid());

-- Public submissions (no public reads of personal data).
drop policy if exists "public can send contact messages" on public.contact_messages;
create policy "public can send contact messages"
  on public.contact_messages for insert to anon, authenticated
  with check (consent = true);

drop policy if exists "public can send involvement requests" on public.involvement_requests;
create policy "public can send involvement requests"
  on public.involvement_requests for insert to anon, authenticated
  with check (consent = true);

drop policy if exists "public can subscribe" on public.newsletter_subscribers;
create policy "public can subscribe"
  on public.newsletter_subscribers for insert to anon, authenticated
  with check (true);

-- Staff: any signed-in user has full access (create staff accounts in
-- Dashboard -> Authentication -> Users; disable public sign-ups).
drop policy if exists "staff manage contact messages" on public.contact_messages;
create policy "staff manage contact messages"
  on public.contact_messages for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff manage involvement requests" on public.involvement_requests;
create policy "staff manage involvement requests"
  on public.involvement_requests for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff manage registrations" on public.registrations;
create policy "staff manage registrations"
  on public.registrations for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff manage subscribers" on public.newsletter_subscribers;
create policy "staff manage subscribers"
  on public.newsletter_subscribers for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- Public content: published rows are readable by everyone, staff manage all.
drop policy if exists "public read published events" on public.events;
create policy "public read published events"
  on public.events for select to anon, authenticated
  using (published = true);

drop policy if exists "staff manage events" on public.events;
create policy "staff manage events"
  on public.events for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public read published resources" on public.resources;
create policy "public read published resources"
  on public.resources for select to anon, authenticated
  using (published = true);

drop policy if exists "staff manage resources" on public.resources;
create policy "staff manage resources"
  on public.resources for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public read published stories" on public.stories;
create policy "public read published stories"
  on public.stories for select to anon, authenticated
  using (published = true);

drop policy if exists "staff manage stories" on public.stories;
create policy "staff manage stories"
  on public.stories for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "public read impact" on public.impact_stats;
create policy "public read impact"
  on public.impact_stats for select to anon, authenticated
  using (true);

drop policy if exists "staff manage impact" on public.impact_stats;
create policy "staff manage impact"
  on public.impact_stats for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- ---------------------------------------------------- registration function

create or replace function public.submit_registration(
  p_name text,
  p_email text,
  p_phone text,
  p_location text,
  p_program text,
  p_format text,
  p_experience text,
  p_motivation text,
  p_consent boolean
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reference text;
begin
  if p_consent is not true then
    raise exception 'Consent is required';
  end if;
  if length(trim(p_name)) < 2 or position('@' in p_email) < 2 then
    raise exception 'Invalid registration details';
  end if;

  insert into public.registrations
    (reference, name, email, phone, location, program, format, experience, motivation, consent)
  values (
    'SDC-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.registration_ref_seq')::text, 4, '0'),
    trim(p_name), trim(p_email), trim(p_phone), trim(p_location),
    trim(p_program), trim(p_format), trim(p_experience),
    nullif(trim(p_motivation), ''), p_consent
  )
  returning reference into v_reference;

  return v_reference;
end;
$$;

revoke all on function public.submit_registration(text, text, text, text, text, text, text, text, boolean) from public;
grant execute on function public.submit_registration(text, text, text, text, text, text, text, text, boolean) to anon, authenticated;
