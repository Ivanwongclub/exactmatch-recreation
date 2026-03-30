-- CMS Phase 1: Services page dynamic content
-- Run in Supabase SQL editor.

create extension if not exists "pgcrypto";

-- Role registry for admin/editor/viewer checks
create table if not exists public.cms_user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null check (role in ('super_admin', 'editor', 'viewer')),
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table if not exists public.cms_page_settings (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null unique,
  hero_title text not null,
  hero_subtitle text not null,
  intro_paragraph_1 text not null,
  intro_paragraph_2 text not null,
  cta_title text not null,
  cta_body text not null,
  cta_button_label text not null,
  cta_button_href text not null,
  seo_title text not null,
  seo_description text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_service_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('family_council', 'investment')),
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.cms_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cms_page_settings_updated_at on public.cms_page_settings;
create trigger trg_cms_page_settings_updated_at
before update on public.cms_page_settings
for each row execute function public.cms_set_updated_at();

drop trigger if exists trg_cms_service_items_updated_at on public.cms_service_items;
create trigger trg_cms_service_items_updated_at
before update on public.cms_service_items
for each row execute function public.cms_set_updated_at();

alter table public.cms_user_roles enable row level security;
alter table public.cms_page_settings enable row level security;
alter table public.cms_service_items enable row level security;

-- Public can read published page settings and service items.
drop policy if exists "public_read_cms_page_settings" on public.cms_page_settings;
create policy "public_read_cms_page_settings"
on public.cms_page_settings
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "public_read_cms_service_items" on public.cms_service_items;
create policy "public_read_cms_service_items"
on public.cms_service_items
for select
to anon, authenticated
using (is_published = true);

-- Admin/editor can manage CMS content.
drop policy if exists "editor_manage_page_settings" on public.cms_page_settings;
create policy "editor_manage_page_settings"
on public.cms_page_settings
for all
to authenticated
using (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('super_admin', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('super_admin', 'editor')
  )
);

drop policy if exists "editor_manage_service_items" on public.cms_service_items;
create policy "editor_manage_service_items"
on public.cms_service_items
for all
to authenticated
using (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('super_admin', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('super_admin', 'editor')
  )
);

-- Seed services page settings (idempotent).
insert into public.cms_page_settings (
  page_slug,
  hero_title,
  hero_subtitle,
  intro_paragraph_1,
  intro_paragraph_2,
  cta_title,
  cta_body,
  cta_button_label,
  cta_button_href,
  seo_title,
  seo_description,
  is_published
)
values (
  'services',
  'Our Services',
  'Fortify, Grow, Succeed',
  'At King Armour, we offer a comprehensive suite of services designed to address the unique needs of distinguished families. Our holistic approach integrates financial expertise with family dynamics, ensuring that every solution strengthens both your portfolio and your legacy.',
  'Our services are structured around two core pillars: Family Council Services and Investment Services. Together, they form a complete framework for multi-generational wealth preservation and growth.',
  'Begin a Confidential Conversation',
  'Every family''s needs are unique. Contact us to discuss how our services can be tailored to your family''s objectives.',
  'CONTACT US',
  '/contact',
  'Our Services',
  'Comprehensive family office services — from wealth planning and governance to alternative investments and trust administration. Fortify, grow, succeed.',
  true
)
on conflict (page_slug) do nothing;

insert into public.cms_service_items (title, description, category, display_order, is_published)
values
  ('Charity & Philanthropy', 'Strategic philanthropic planning to create meaningful impact while aligning with the family''s values and legacy objectives.', 'family_council', 10, true),
  ('Wealth Planning', 'Comprehensive wealth structuring designed to preserve and grow assets across generations with discipline and foresight.', 'family_council', 20, true),
  ('Education', 'Preparing the next generation with financial literacy, leadership development, and a deep understanding of family governance.', 'family_council', 30, true),
  ('Family Governance', 'Establishing frameworks for family decision-making, conflict resolution, and succession planning that endure beyond any single generation.', 'family_council', 40, true),
  ('Wealth Management', 'Tailored investment strategies aligned with your family''s risk tolerance, time horizon, and long-term objectives.', 'investment', 10, true),
  ('Tax Planning', 'Sophisticated tax optimisation strategies across multiple jurisdictions, designed to protect and maximise generational wealth.', 'investment', 20, true),
  ('Alternative Investments', 'Curated access to private equity, real estate, and hedge fund opportunities vetted through rigorous due diligence.', 'investment', 30, true),
  ('Trust & Corporate Services', 'Expert structuring and administration of trusts and family holding companies, ensuring compliance and operational continuity.', 'investment', 40, true)
on conflict do nothing;
