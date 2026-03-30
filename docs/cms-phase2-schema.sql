-- CMS Phase 2: Generic content blocks for dynamic pages and navigation
-- Run after docs/cms-phase1-schema.sql

create extension if not exists pgcrypto;

create table if not exists public.cms_content_blocks (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  block_key text not null,
  content_json jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_slug, block_key)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cms_content_blocks_updated_at on public.cms_content_blocks;
create trigger trg_cms_content_blocks_updated_at
before update on public.cms_content_blocks
for each row execute function public.set_updated_at();

alter table public.cms_content_blocks enable row level security;

create policy if not exists "CMS blocks published read"
on public.cms_content_blocks
for select
using (is_published = true);

create policy if not exists "CMS blocks editors manage"
on public.cms_content_blocks
for all
using (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('editor', 'super_admin')
  )
)
with check (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('editor', 'super_admin')
  )
);

insert into public.cms_content_blocks (page_slug, block_key, content_json)
values
  (
    'global',
    'header_nav',
    '[
      {"label":"ABOUT US","href":"/","dropdown":[
        {"label":"Home","href":"/"},
        {"label":"Our Mission","href":"/our-mission"},
        {"label":"History","href":"/history"},
        {"label":"Executive Team","href":"/executive-team"},
        {"label":"Board of Directors","href":"/board-of-directors"}
      ]},
      {"label":"SERVICES","href":"/services"},
      {"label":"KINGS NETWORK","href":"/kings-network","dropdown":[
        {"label":"Overview","href":"/kings-network"},
        {"label":"Members-Only Events","href":"/members-only-events"},
        {"label":"Summer Program","href":"/summer-program"},
        {"label":"Event","href":"/event"}
      ]},
      {"label":"EXPERTISE","href":"/legacy-and-business-expertise"},
      {"label":"CONTACT","href":"/contact"}
    ]'::jsonb
  ),
  (
    'global',
    'footer_nav',
    '[
      {"label":"ABOUT US","path":"/"},
      {"label":"OUR MISSION","path":"/our-mission"},
      {"label":"HISTORY","path":"/history"},
      {"label":"OUR SERVICES","path":"/services"},
      {"label":"KINGS NETWORK","path":"/kings-network"},
      {"label":"EXECUTIVE TEAM","path":"/executive-team"},
      {"label":"BOARD OF DIRECTORS","path":"/board-of-directors"},
      {"label":"EXPERTISE","path":"/legacy-and-business-expertise"},
      {"label":"EVENTS","path":"/members-only-events"},
      {"label":"SUMMER PROGRAM","path":"/summer-program"},
      {"label":"CONTACT US","path":"/contact"},
      {"label":"PRIVACY POLICY","path":"/privacy"}
    ]'::jsonb
  ),
  (
    'global',
    'footer_email',
    '"info@king-armour.com"'::jsonb
  ),
  (
    'global',
    'footer_tagline',
    '"Fortify Your Growth, Armour Your Assets, Unite Generations"'::jsonb
  )
on conflict (page_slug, block_key) do nothing;
