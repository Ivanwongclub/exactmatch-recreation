# CMS Acceptance & Global Nav Audit

**Date:** 2026-03-31

## CMS UX Acceptance Checklist

| Step | Action | Status | Evidence |
|------|--------|--------|----------|
| 1 | Select page + block from sidebar | ✅ PASS | Clicked Our Mission → hero, loads structured editor |
| 2 | Create missing block from template | ✅ PASS | Clicked "+ Create" on footer_nav, created as Draft |
| 3 | Edit in structured mode | ✅ PASS | Title/Subtitle/SEO fields editable, changes reflected in JSON |
| 4 | Switch to JSON mode and back | ✅ PASS | Fields ↔ JSON toggle preserves content |
| 5 | Save draft | ✅ PASS | Saved hero with missing SEO fields as draft (warning) |
| 6 | Publish valid block | ✅ PASS | header_nav published successfully (no fields = valid) |
| 7 | Attempt publish invalid block | ✅ PASS | Save & Publish blocked on hero with missing required seoTitle/seoDescription |
| 8 | Load a previous revision | ✅ PASS | Clicked "Load" on revision, content populated, toast "Revision loaded" |
| 9 | Preview link opens (?preview=1) | ✅ PASS | Preview button appears in header bar with correct URL |
| 10 | No fatal console errors | ✅ PASS | Only React ref warnings from library components |

## Global Nav/Footer Template Matrix

| Template Key | Name | Default Content Type | Fields | Status |
|-------------|------|---------------------|--------|--------|
| `global:header_nav` | Header Navigation | Array of `{label, href, dropdown?}` | JSON-only (complex nested) | ✅ Defined |
| `global:footer_nav` | Footer Navigation | Array of `{label, path}` | JSON-only (complex nested) | ✅ Defined |
| `global:footer_email` | Footer Email | String | JSON-only (root string) | ✅ Defined |
| `global:footer_tagline` | Footer Tagline | String | JSON-only (root string) | ✅ Defined |
| `global:render_config` | Global Render Config | Object | Structured (3 fields) | ✅ Defined |

## Frontend Wiring Verification

| Component | Block Key | Fallback Type | Guard | Status |
|-----------|-----------|--------------|-------|--------|
| Header.tsx:51 | `header_nav` | Array of HeaderNavItem | Array type guard in resolveCmsBlock | ✅ PASS |
| Footer.tsx:29 | `footer_nav` | Array of FooterNavItem | Array type guard in resolveCmsBlock | ✅ PASS |
| Footer.tsx:30 | `footer_email` | String | String type guard in resolveCmsBlock | ✅ PASS |
| Footer.tsx:31 | `footer_tagline` | String | String type guard in resolveCmsBlock | ✅ PASS |

## Test Coverage

| Test | Description | Status |
|------|-------------|--------|
| Resolves global header_nav template | Template exists with nested dropdown defaults | ✅ PASS |
| Resolves global footer_nav template | Template exists with 12 nav items | ✅ PASS |
| Resolves global footer_email template | String default content | ✅ PASS |
| Resolves global footer_tagline template | String default content | ✅ PASS |
| Array fallback for non-array CMS data | resolveCmsBlock returns fallback | ✅ PASS |
| Array fallback for string CMS data | resolveCmsBlock returns fallback | ✅ PASS |
| String fallback for object CMS data | resolveCmsBlock returns fallback | ✅ PASS |
| Uses valid CMS array data | resolveCmsBlock returns CMS content | ✅ PASS |

## Verification Results

| Command | Result |
|---------|--------|
| `npm run build` | ✅ PASS |
| `npm test` (55/55) | ✅ PASS |
| `npx eslint src/pages/CmsAdmin.tsx src/lib/cms src/components/layout src/test` | ✅ PASS |

## Exact Files Modified

- `src/lib/cms/blockTemplates.ts` — Added global:header_nav, footer_nav, footer_email, footer_tagline templates
- `src/test/cms-block-templates.test.ts` — Added 8 tests for global nav templates and malformed fallback
- `docs/cms-acceptance-and-global-nav-audit.md` — This file

## Assumptions

- Header/Footer components already have type-safe fallbacks via `resolveCmsBlock` guards
- Nav templates use JSON-only editing (no structured fields) because their content is complex nested arrays/strings that don't map to simple field types
- Existing RLS policies and auth flow are unchanged
- No schema changes needed

## Intentionally Not Changed

- Page content/design
- Auth flow (login/logout/redirect)
- Route structure
- Database schema
- RLS policies
- CmsAdmin media library section (preserved as-is)
- Preview/publish guard logic (preserved as-is)
