# Replace text wordmark with King Armour shield logo

## Goals
- Use the uploaded full lockup (gold shield + "KING ARMOUR" + "FAMILY OFFICE" + "A Member of Sunwah Kingsway Capital Holdings Ltd (SEHK: 188)") across header, footer, favicon, and OG image.
- Remove the white background so the gold mark sits cleanly on the dark purple header/footer.
- Adjust the menu bar so the taller, denser logo doesn't crowd the nav.

## Asset prep
1. Save uploaded `user-uploads://3.png` to `src/assets/king-armour-logo-full.png` (full lockup, transparent BG via `imagegen--edit_image` background-removal pass).
2. Generate a second "compact" variant `src/assets/king-armour-logo-mark.png` — shield only, transparent — for favicon and small surfaces.
3. Copy mark to `public/favicon.png` (32×32 / 192×192 derivations) and update `index.html`:
   - Replace `<link rel="icon">` to `/favicon.png`
   - Update `og:image` and `twitter:image` to `/king-armour-og.png` (full lockup on brand-purple background, 1200×630, generated from full logo).
4. Delete `public/favicon.ico` so it doesn't override the new PNG.

## Header changes (`src/components/layout/Header.tsx` + `src/index.css`)
- Replace the `.ka-wordmark` JSX (KING / ARMOUR spans) with an `<img>` of the full lockup, `alt="King Armour Family Office"`, sized responsively.
- Heights:
  - Mobile (`< lg`): use **mark-only** image, height ≈ 40px (keeps mobile bar compact; full lockup is too tall/wide for phones).
  - Desktop (`lg+`): use **full lockup**, height ≈ 56px.
- Header bar height grows from `h-20 lg:h-24` → `h-20 lg:h-28` to accommodate the 3-line lockup with breathing room.
- Remove `.ka-wordmark`, `.ka-wordmark-kicker`, `.ka-wordmark-main` CSS rules (no longer used).
- When header is transparent (top of hero), keep logo as-is. When scrolled (`bg-primary/95`), the transparent gold logo still reads cleanly — verify contrast in QA.

## Nav bar UX adjustments
With a taller, wider logo the existing 5-item nav at `gap-8` will feel tight on 1280–1440 widths.
- Reduce nav `gap-8` → `gap-6 xl:gap-8`.
- Reduce nav font size from `text-sm` → `text-[13px] xl:text-sm`, keep `tracking-wider`.
- Increase mobile-menu breakpoint trigger threshold visually unchanged (`lg:` still 1024px), but at 1024–1200 the logo+nav may collide. Mitigation: at `lg` use a slightly smaller logo height (48px) and bump full size at `xl`.
- Add `min-w-0` and `shrink-0` on logo wrapper so the nav can wrap gracefully.
- Mobile sheet: show mark-only logo at the top of the drawer header for brand consistency.

## Footer (`src/components/layout/Footer.tsx`)
- Replace any text wordmark in footer with the **full lockup** image, max-height ~80px, centered or left-aligned matching current footer column layout.

## SEO / social
- Generate `public/king-armour-og.png` (1200×630, full lockup centered on `#1a1625` with subtle gold vignette) for `og:image`/`twitter:image`.

## Memory updates
- Update `mem://design/brand-identity/wordmark` → "Brand mark is the gold shield lockup PNG; text wordmark deprecated."
- Update Core memory line: remove "Text-based wordmark branding ('KING ARMOUR'), never use logo.png for UI." Replace with: "Brand mark = `king-armour-logo-full.png` (lockup) on desktop, `king-armour-logo-mark.png` (shield) on mobile/favicon."
- Update `mem://design/assets/image-strategy` to reflect new logo-as-primary-brand-mark policy.

## QA checklist
- Logo crisp at 1×/2× (PNG is 1920² so retina is fine).
- Transparent edges have no white halo after background removal — re-run edit if halos appear.
- Header doesn't overlap hero text on mobile/desktop.
- Nav items don't wrap or collide at 1024, 1280, 1440, 1920.
- Favicon renders gold on browser tab (not invisible on white tab strip — shield itself has dark outlines so should read OK; otherwise add subtle dark drop-shadow filter to favicon variant).
- Lighthouse SEO: `og:image` resolves and is 1200×630.

## Files touched
- `src/assets/king-armour-logo-full.png` (new)
- `src/assets/king-armour-logo-mark.png` (new)
- `public/favicon.png` (new), delete `public/favicon.ico`
- `public/king-armour-og.png` (new)
- `index.html` (favicon + OG meta)
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/index.css` (remove wordmark utilities)
- Memory files listed above
