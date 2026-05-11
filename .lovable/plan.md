## Move logo down ~16px (logo only)

Shift the logo ~16px lower while keeping desktop nav text and mobile hamburger at their current Y positions.

### Change
In `src/components/layout/Header.tsx`, the logo `<Link>` wrapper currently relies on the row's `items-center`. Override its vertical alignment so only the logo shifts:

- Add `self-start mt-4` (16px top margin) to the logo `<Link>` wrapper.
- Nav `<nav>` and hamburger `<button>` keep current classes — still vertically centered in the bar, so they don't move.

### Files touched
- `src/components/layout/Header.tsx` — logo `<Link>` className only.

### QA
- Verify at 390, 1024, 1280, 1433, 1920.
- Confirm nav baseline and hamburger center are unchanged.
- Confirm logo sits ~16px lower than before; overflow below the bar increases by 16px (drop-shadow keeps it legible).
