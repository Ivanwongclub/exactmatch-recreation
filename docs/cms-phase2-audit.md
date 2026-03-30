# CMS Phase 2 Integration Audit

**Date:** 2026-03-30

## PASS/FAIL Matrix

| Area | Check | Status | Notes |
|------|-------|--------|-------|
| **Global CMS — Header** | `global/header_nav` drives Header menu + dropdowns | ✅ PASS | `Header.tsx:51` uses `resolveCmsBlock(cmsBlocks, "header_nav", fallbackNavItems)` |
| **Global CMS — Footer nav** | `global/footer_nav` drives Footer links | ✅ PASS | `Footer.tsx:29` |
| **Global CMS — Footer email** | `global/footer_email` drives Footer email | ✅ PASS | `Footer.tsx:30` |
| **Global CMS — Footer tagline** | `global/footer_tagline` drives Footer tagline | ✅ PASS | `Footer.tsx:31-35` |
| **Our Mission — hero** | `our-mission/hero` wired with fallback | ✅ PASS | `OurMission.tsx:51-57` |
| **Our Mission — intro** | `our-mission/intro` wired with fallback | ✅ PASS | `OurMission.tsx:58-65` |
| **Our Mission — philosophy** | `our-mission/philosophy` wired with fallback | ✅ PASS | `OurMission.tsx:66-72` |
| **Our Mission — principles** | `our-mission/principles` wired with fallback | ✅ PASS | `OurMission.tsx:73` |
| **History — hero** | `history/hero` wired with fallback | ✅ PASS | `History.tsx:27-33` |
| **History — legacy** | `history/legacy` wired with fallback | ✅ PASS | `History.tsx:34-40` |
| **History — milestones** | `history/milestones` wired with fallback | ✅ PASS | `History.tsx:41` |
| **History — global_connections** | `history/global_connections` wired with fallback | ✅ PASS | `History.tsx:42-45` |
| **Kings Network — hero** | `kings-network/hero` wired with fallback | ✅ PASS | `KingsNetwork.tsx:100-106` |
| **Kings Network — intro** | `kings-network/intro` wired with fallback | ✅ PASS | `KingsNetwork.tsx:107-111` |
| **Kings Network — highlights** | `kings-network/highlights` wired with fallback | ✅ PASS | `KingsNetwork.tsx:112` |
| **Kings Network — events** | `kings-network/events` wired with fallback | ✅ PASS | `KingsNetwork.tsx:113` |
| **Kings Network — program** | `kings-network/program` wired with fallback | ✅ PASS | `KingsNetwork.tsx:114-118` |
| **Kings Network — cta** | `kings-network/cta` wired with fallback | ✅ PASS | `KingsNetwork.tsx:119-124` |
| **Contact — hero** | `contact/hero` wired with fallback | ✅ PASS | `Contact.tsx:102-108` |
| **Contact — form_copy** | `contact/form_copy` wired with fallback | ✅ PASS | `Contact.tsx:109-112` |
| **Contact — form_error_copy** | `contact/form_error_copy` wired with fallback | ✅ PASS | `Contact.tsx:113-117` |
| **Contact — contact_channels** | `contact/contact_channels` wired with fallback | ✅ PASS | `Contact.tsx:122` |
| **Contact — presence_locations** | `contact/presence_locations` wired with fallback | ✅ PASS | `Contact.tsx:123` |
| **Contact — confidentiality** | `contact/confidentiality` wired with fallback | ✅ PASS | `Contact.tsx:118-121` |
| **Admin route** | `/admin/cms` exists | ✅ PASS | `App.tsx:45` |
| **Admin — load blocks** | Loads existing blocks via `useCmsAllBlocks()` | ✅ PASS | `CmsAdmin.tsx:34` — groups by page_slug |
| **Admin — edit/save** | JSON edit + upsert via `useUpsertCmsBlock()` | ✅ PASS | `CmsAdmin.tsx:71-91` — validates JSON before save |
| **Admin — invalid JSON** | Shows toast error on parse failure | ✅ PASS | `CmsAdmin.tsx:76-78` |
| **Admin — missing Supabase env** | Shows warning banner + disables save | ✅ PASS | `CmsAdmin.tsx:109-117, 230` |
| **Admin — SEO** | noindex set | ✅ PASS | `CmsAdmin.tsx:96` (fixed from `noIndex` → `noindex`) |
| **Data layer — fetch by page** | `fetchCmsBlocksByPage` filters `is_published=true` | ✅ PASS | `services.ts:52` |
| **Data layer — fetch all (admin)** | `fetchAllCmsBlocks` returns all (no `is_published` filter) | ✅ PASS | `services.ts:63-79` — correct for admin |
| **Data layer — upsert** | `upsertCmsBlock` uses `onConflict: "page_slug,block_key"` | ✅ PASS | `services.ts:97` |
| **Data layer — no Supabase** | All fetchers return `null` when `hasSupabaseEnv=false` | ✅ PASS | `services.ts:11,44,65` |
| **Fallback behavior** | `resolveCmsBlock` returns fallback on null/empty/missing | ✅ PASS | `blockUtils.ts:3-17` |
| **Schema — table** | `cms_content_blocks` with `(page_slug, block_key)` unique | ✅ PASS | `cms-phase2-schema.sql:6-15` |
| **Schema — RLS** | Published read + editor manage policies | ✅ PASS | `cms-phase2-schema.sql:34-57` |
| **Schema — updated_at trigger** | `set_updated_at()` trigger exists | ✅ PASS | `cms-phase2-schema.sql:17-30` |
| **Docs — runbook block keys** | All block keys in runbook match implementation | ✅ PASS | Verified all 22 block keys match |
| **Docs — schema matches impl** | Schema SQL matches service layer table/column usage | ✅ PASS | |

## Fixes Applied

| Severity | File | Fix |
|----------|------|-----|
| P0 (build break) | `src/pages/CmsAdmin.tsx:96` | `noIndex` → `noindex` (prop name mismatch with `SEOHeadProps`) |

## Schema Mismatches

None found.

## Runtime Risks

1. **Low risk**: `fetchAllCmsBlocks` (admin) doesn't filter by `is_published`, which is correct — but relies on RLS editor policy for write access. If RLS is misconfigured, unpublished blocks could leak to anon users via a direct Supabase query (not via the app).
2. **Low risk**: Seed data in `cms-phase2-schema.sql` uses `ON CONFLICT DO NOTHING` — safe for re-runs but won't update stale seed data.

## Assumptions

- Supabase project has `cms_content_blocks` table created per `cms-phase2-schema.sql`
- `cms_user_roles` table exists with `editor`/`super_admin` roles (referenced by RLS policies)
- Without Supabase env vars, all pages render fallback content gracefully

## Intentionally Not Changed

- Page content/design
- Services page (Phase 1 CMS — separate tables)
- Route structure
- SEOHead component logic
- Deployment configs
