-- CMS Phase 7: Storage bucket + policies for media upload pipeline
-- Run in Supabase SQL editor as an admin role

insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

create policy if not exists "CMS media bucket public read"
on storage.objects
for select
using (bucket_id = 'cms-media');

create policy if not exists "CMS media bucket editor upload"
on storage.objects
for insert
with check (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('editor', 'super_admin')
  )
);

create policy if not exists "CMS media bucket editor update"
on storage.objects
for update
using (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('editor', 'super_admin')
  )
)
with check (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.cms_user_roles r
    where r.user_id = auth.uid()
      and r.role in ('editor', 'super_admin')
  )
);
