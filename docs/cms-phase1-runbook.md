# CMS Phase 1 Runbook

## Goal
Enable dynamic content for `/services` using Supabase CMS tables, with safe fallback to existing hardcoded content.

## 1) Environment Variables
Set these in local/dev and deployment:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL` (already used for SEO)

## 2) Database Setup
Run:

- [`docs/cms-phase1-schema.sql`](/Users/adaptive/Documents/GitHub/exactmatch-recreation/docs/cms-phase1-schema.sql)

This creates:
- `cms_user_roles`
- `cms_page_settings`
- `cms_service_items`
- RLS policies + updated_at triggers
- Seed data for `/services`

## 3) Access Model
- Public: read published CMS rows
- Editor/super_admin: manage CMS content

Assign an editor:
```sql
insert into public.cms_user_roles (user_id, role)
values ('<auth_user_uuid>', 'editor');
```

## 4) Frontend Wiring (Phase 1)
- Supabase client: `src/lib/supabase.ts`
- CMS types: `src/lib/cms/types.ts`
- CMS fetch service: `src/lib/cms/services.ts`
- CMS hook: `src/hooks/useCmsServicesPage.ts`
- Dynamic page wired: `src/pages/Services.tsx`

## 5) Verification
1. Start app with env vars set.
2. Change `cms_page_settings` for `page_slug = 'services'`.
3. Refresh `/services` and verify content updates.
4. Temporarily unset env vars and confirm fallback content still renders.
