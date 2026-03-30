# CMS Phase 4 Runbook

## Goal
Add a reusable Media Library so editors can manage image/video/file URLs in one place and reuse them across page blocks.

## 1) Apply Schema
Run in Supabase SQL editor:

```sql
\i docs/cms-phase4-schema.sql
```

## 2) Admin Usage
1. Open `/admin/cms`
2. Go to `Media Library`
3. Fill:
   - `slug` (unique key, e.g. `hero-home`)
   - `kind` (`image` / `video` / `file`)
   - `url`
   - `alt_text` (for image accessibility)
   - `tags` (comma-separated)
4. Click `Save Media`
5. Click existing asset chip to load/edit

## 3) Data Contract
Table: `cms_media_assets`
- `slug`: stable reference key
- `url`: public URL/path
- `alt_text`: nullable string
- `kind`: constrained type
- `tags`: text array
- `updated_at`: auto-updated by trigger

## 4) Permission Model
- Read: allowed for all (`select using true`)
- Write: only `editor`/`super_admin` from `cms_user_roles`

## 5) Verification Checklist
- `npm test`
- `npm run build`
- Save a new media asset in `/admin/cms`
- Confirm asset appears in `Existing assets`
- Confirm viewer role cannot save media
