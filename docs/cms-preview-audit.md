# CMS Frontend Preview Audit

Date: 2026-03-30
Repo: /Ivanwongclub/exactmatch-recreation

## Root Cause (Confirmed)

Frontend CMS queries were hard-filtered to `is_published = true`, and there was no preview-mode switch in hooks/routing. This prevented draft content from ever rendering in frontend pages.

## Fix Implemented

1. Added preview parsing utilities in `src/lib/cms/previewUtils.ts`:
- `hasCmsPreviewFlag(search)`
- `shouldUseCmsDraftPreview(search, canEdit)`

2. Added role-gated preview behavior in `src/hooks/useCmsBlocks.ts`:
- New `useCmsPreviewMode()` derives:
  - query param preview request (`?preview=1|true|yes|on`)
  - admin edit permission
  - effective preview enablement (requires both)
- `useCmsBlocksByPage` now fetches with `{ includeDraft: true }` only when preview is enabled.

3. Added role-gated preview behavior in `src/hooks/useCmsServicesPage.ts`:
- Uses `useCmsPreviewMode()` and passes `{ includeDraft: true }` for services data in preview mode.

4. Updated data services in `src/lib/cms/services.ts`:
- `fetchCmsBlocksByPage(pageSlug, options?)` now supports `includeDraft`.
- `fetchServicesPageCmsData(options?)` now supports `includeDraft` for service items.

## Security/Access Model

Preview mode is enabled only when both conditions are true:
1. URL includes preview flag (`?preview=1`, `true`, `yes`, or `on`)
2. Current user has CMS edit access (`canEdit === true`)

Without editor access, frontend remains published-only even if `?preview=1` is present.

## Verification

- `npm test` -> PASS (`8` files, `24` tests)
- `npm run build` -> PASS
- `npx eslint src/lib/cms/previewUtils.ts src/lib/cms/services.ts src/hooks/useCmsBlocks.ts src/hooks/useCmsServicesPage.ts src/test/cms-preview-utils.test.ts` -> PASS

## New Tests

- `src/test/cms-preview-utils.test.ts`:
  - preview query detection
  - role-gated preview enablement

## Intentionally Not Changed

- No DB migrations or RLS policy updates.
- No route additions.
- No CMS content schema changes.
- No page visual redesign.
