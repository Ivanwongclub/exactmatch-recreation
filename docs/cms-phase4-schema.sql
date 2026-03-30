-- CMS Phase 4: Media library
-- Run after docs/cms-phase2-schema.sql

create extension if not exists pgcrypto;

create table if not exists public.cms_media_assets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  url text not null,
  alt_text text null,
  kind text not null default 'image' check (kind in ('image', 'video', 'file')),
  tags text[] null,
  updated_at timestamptz not null default now()
);

create or replace function public.cms_media_assets_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cms_media_assets_updated_at on public.cms_media_assets;
create trigger trg_cms_media_assets_updated_at
before update on public.cms_media_assets
for each row execute function public.cms_media_assets_set_updated_at();

alter table public.cms_media_assets enable row level security;

create policy if not exists "CMS media read published"
on public.cms_media_assets
for select
using (true);

create policy if not exists "CMS media manage editors"
on public.cms_media_assets
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

insert into public.cms_media_assets (slug, url, alt_text, kind, tags)
values
  ('hero-home', '/src/assets/hero-home.jpg', 'King Armour home hero image', 'image', '{hero,home}'),
  ('hero-services', '/src/assets/hero-services.jpg', 'King Armour services hero image', 'image', '{hero,services}'),
  ('hero-network', '/src/assets/hero-network.jpg', 'King Armour network hero image', 'image', '{hero,network}')
on conflict (slug) do nothing;
