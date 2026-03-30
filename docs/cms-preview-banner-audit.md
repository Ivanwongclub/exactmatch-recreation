# CMS Preview Banner Audit

Date: 2026-03-30
Repo: /Ivanwongclub/exactmatch-recreation

## Scope

Add a clear frontend indicator for CMS preview mode so editors can confirm they are viewing draft-inclusive content.

## Changes

1. Added `src/lib/cms/previewBanner.ts`
- `getCmsPreviewBannerState(previewRequested, previewEnabled)` returns visibility, level, and message.

2. Updated `src/components/layout/Layout.tsx`
- Integrates `useCmsPreviewMode()`.
- Renders status banner below header:
  - Success banner when preview is active for editor.
  - Warning banner when `?preview=1` is requested but editor access is missing.

3. Added tests: `src/test/cms-preview-banner.test.ts`
- Covers hidden state, active success state, and access warning state.

## Verification

- `npm test` -> PASS (`9` files, `27` tests)
- `npm run build` -> PASS
- `npx eslint` on preview-related files -> PASS

## Intentionally Not Changed

- No DB/RLS changes
- No routing changes
- No CMS content schema updates
- No page visual redesign beyond preview status banner
