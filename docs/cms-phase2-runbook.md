# CMS Phase 2 Runbook

## Goal
Enable dynamic content updates for:
- Global navigation (`Header`, `Footer`)
- `Our Mission`
- `History`
- `Kings Network`
- `Contact`
- `/admin/cms` editor UI

## 1) Apply DB Schema
Run:

```sql
-- in Supabase SQL editor
\i docs/cms-phase2-schema.sql
```

Or copy/paste `docs/cms-phase2-schema.sql` into Supabase SQL editor and execute.

## 2) Required Environment Variables
Set in `.env` (or hosting env vars):

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SITE_URL=https://ka.adaptive-app.com
```

## 3) Access CMS Admin
Open:

`/admin/cms`

Use `page_slug + block_key` to edit JSON blocks.

## 4) Block Keys Used by Frontend

### `global`
- `header_nav`
- `footer_nav`
- `footer_email`
- `footer_tagline`

### `our-mission`
- `hero`
- `intro`
- `philosophy`
- `principles`

### `history`
- `hero`
- `legacy`
- `milestones`
- `global_connections`

### `kings-network`
- `hero`
- `intro`
- `highlights`
- `events`
- `program`
- `cta`

### `contact`
- `hero`
- `form_copy`
- `form_error_copy`
- `contact_channels`
- `presence_locations`
- `confidentiality`

## 5) Validation Checklist
1. Open `/admin/cms`, load existing block chips.
2. Edit one block (example: `global/header_nav`) and save.
3. Refresh frontend page and confirm content changed.
4. Toggle `is_published=false` and confirm fallback content appears.
5. Confirm anonymous users can still read published content.
6. Confirm non-editor cannot write (RLS enforced).

## 6) Notes
- Frontend always has hardcoded fallback content.
- If Supabase is unreachable, pages continue to render fallback content.
- `Services` page still uses Phase 1 tables (`cms_page_settings`, `cms_service_items`).
