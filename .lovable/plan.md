## Enlarge logo 1.5× (overflow bar) — keep nav & hamburger in place

### Approach (Option B)
Header bar height stays exactly the same on all breakpoints. The logo is enlarged to 1.5× and allowed to **overflow downward** past the bar's bottom edge, hanging into the page below. Desktop nav text and the mobile hamburger icon do not move — same Y position relative to the top edge as today.

### Size changes (logo only)

| Breakpoint | Current logo height | New (1.5×) |
|---|---|---|
| Mobile (`< lg`) — `logoMark` | `h-10` (40px) | `h-15` → use `h-[60px]` |
| `lg` — `logoFull` | `h-14` (56px) | `h-[84px]` |
| `xl` — `logoFull` | `h-20` (80px) | `h-[120px]` |

Bar height stays `h-20 lg:h-28` (80 / 112px). Hamburger button and nav links keep current classes — no movement.

### How the overflow works
- Logo `<Link>` wrapper becomes `relative` with `overflow-visible`; the parent header row already has `items-center`, so the enlarged logo grows symmetrically up & down from the bar's vertical center. The portion that exceeds the bar height hangs below the bar.
- Header element gets `overflow-visible` so the logo isn't clipped.
- Because the header is `fixed` with `bg-primary/95` (when scrolled) or `bg-transparent` (at top), the overflowed logo portion will appear **outside** the tinted bar, sitting on top of the hero / page content underneath.
- Add a small drop-shadow on the overflowing logo so it stays legible against light hero areas: `drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]`.
- Set logo `<Link>` `z-10` so it stays above hero content.

### Files touched
- `src/components/layout/Header.tsx` — only the two `<img>` className values, the logo `<Link>` wrapper classes, and add `overflow-visible` to the header `<div>` row.
- No CSS, no other components, no mobile drawer changes (drawer logo stays as-is).

### QA
- Verify at 390 (mobile), 1024 (lg), 1280, 1433 (current), 1920.
- Confirm nav text baseline and hamburger center are pixel-identical to before.
- Confirm logo doesn't overlap hero headline awkwardly — adjust drop-shadow strength if needed.
