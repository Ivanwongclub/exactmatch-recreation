# CMS Phase 7 Runbook

## Goal
Deliver two production operations upgrades:
1. Schema-aware media URL insertion into JSON block content
2. Media upload pipeline via Supabase Storage (bucket `cms-media`)

## 1) Apply Storage Policies
Run:

```sql
\i docs/cms-phase7-storage.sql
```

## 2) JSON Path Insert (CMS Admin)
In `/admin/cms` -> `Edit Block`:
1. Pick a media slug
2. Optional: set JSON path (examples)
   - `hero.imageUrl`
   - `cards.0.image`
   - `sections.2.background.image`
3. Click `Insert URL`

Behavior:
- If JSON path is empty: append URL as plain text (legacy behavior)
- If JSON path exists: parse JSON and replace value at path

## 3) Upload Pipeline (CMS Admin)
In `/admin/cms` -> `Media Library`:
1. Set `Slug`
2. Set `Storage Bucket` (default `cms-media`)
3. Choose a file and click `Upload`
4. URL auto-fills
5. Click `Save Media` to persist metadata in `cms_media_assets`

## 4) Verification Checklist
- `npm test`
- `npm run build`
- Insert URL at path `hero.imageUrl` into a JSON block
- Upload an image and confirm URL auto-populates
- Save media asset and verify it appears in existing assets
- Confirm viewer role cannot upload/save media

## 5) Notes
- Upload currently stores public URLs for immediate rendering.
- Future hardening can add signed URL mode for private assets.
