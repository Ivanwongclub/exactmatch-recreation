# CMS Phase 3 Runbook

## Goal
Promote CMS admin to production operations with:
- role-aware admin access (`viewer` / `editor` / `super_admin`)
- email sign-in flow in `/admin/cms`
- immutable revision snapshots for every block write
- UI-based rollback (load revision -> save)

## 1) Apply DB Schema
Run in Supabase SQL editor:

```sql
-- run after phase 2 schema
\i docs/cms-phase3-schema.sql
```

## 2) Access Setup
Grant role to admin users in `cms_user_roles`:

```sql
insert into public.cms_user_roles (user_id, role)
values ('<auth-user-uuid>', 'editor')
on conflict (user_id) do update set role = excluded.role;
```

## 3) Admin Login Flow
1. Open `/admin/cms`
2. Enter allowed editor email and click `Send Sign-in Link`
3. Open email magic link
4. Return to `/admin/cms`, click `Refresh Access`
5. Confirm role changes from `viewer` to `editor` or `super_admin`

## 4) Revision Flow
1. Edit block JSON and save
2. Open `Revision History`
3. Confirm newest row appears
4. Click `Load Revision`
5. Save block to rollback

## 5) Validation Checklist
- Build passes: `npm run build`
- Unit tests pass: `npm test`
- Admin blocks are read-only for viewer role
- Admin save enabled for editor/super_admin role
- `cms_content_revisions` receives new row on each insert/update to `cms_content_blocks`

## 6) Operational Notes
- Revision table keeps full snapshots (not deltas)
- Reads are limited to editor/super_admin via RLS
- Inserts into revision table should happen via DB trigger only
