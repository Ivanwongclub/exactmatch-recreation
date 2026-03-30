-- CMS Phase 3: Access control + revision history
-- Run after docs/cms-phase2-schema.sql

create extension if not exists pgcrypto;

create table if not exists public.cms_content_revisions (
  id uuid primary key default gen_random_uuid(),
  block_id uuid not null references public.cms_content_blocks(id) on delete cascade,
  page_slug text not null,
  block_key text not null,
  content_json jsonb not null,
  is_published boolean not null,
  changed_by uuid null,
  updated_at timestamptz not null default now()
);

create index if not exists idx_cms_content_revisions_lookup
  on public.cms_content_revisions(page_slug, block_key, updated_at desc);

create or replace function public.cms_capture_block_revision()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.cms_content_revisions (
    block_id,
    page_slug,
    block_key,
    content_json,
    is_published,
    changed_by,
    updated_at
  )
  values (
    new.id,
    new.page_slug,
    new.block_key,
    new.content_json,
    new.is_published,
    auth.uid(),
    now()
  );

  return new;
end;
$$;

drop trigger if exists trg_cms_capture_block_revision on public.cms_content_blocks;
create trigger trg_cms_capture_block_revision
after insert or update on public.cms_content_blocks
for each row execute function public.cms_capture_block_revision();

alter table public.cms_content_revisions enable row level security;

create policy if not exists "CMS revisions read for editors"
on public.cms_content_revisions
for select
using (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('editor', 'super_admin')
  )
);

create policy if not exists "CMS revisions write via trigger only"
on public.cms_content_revisions
for insert
with check (false);

insert into public.cms_content_revisions (
  block_id,
  page_slug,
  block_key,
  content_json,
  is_published,
  changed_by,
  updated_at
)
select
  b.id,
  b.page_slug,
  b.block_key,
  b.content_json,
  b.is_published,
  null,
  b.updated_at
from public.cms_content_blocks b
where not exists (
  select 1 from public.cms_content_revisions r where r.block_id = b.id
);
