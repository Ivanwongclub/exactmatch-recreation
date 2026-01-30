

# Aurora Borealis Animation for Footer

## Overview
Add a subtle, elegant aurora borealis (northern lights) animation effect to the footer background. The animation will feature flowing, wave-like gradients that gently shift across the dark purple background, creating a premium and sophisticated visual effect.

## Visual Concept
- Soft, flowing gradients with purple and gold tones that match the brand colors
- Slow, continuous movement mimicking the natural flow of northern lights
- Subtle opacity to ensure text remains readable
- Multiple layers for depth and organic movement

## Implementation

### 1. Add Aurora Keyframes to Tailwind Config
Add new keyframe animations for the aurora effect in `tailwind.config.ts`:
- `aurora-1`: First wave layer moving horizontally
- `aurora-2`: Second wave layer with offset timing
- `aurora-3`: Third wave layer for added depth

### 2. Create Aurora CSS Classes
Add aurora-specific styles in `src/index.css`:
- `.aurora-bg`: Container class with relative positioning
- Multiple pseudo-elements or child divs for layered aurora waves
- Gradient backgrounds using brand colors (purple tones + gold accent)
- Blur filters for soft, ethereal glow effect

### 3. Update Footer Component
Modify `src/components/layout/Footer.tsx`:
- Add aurora animation container as background layer
- Ensure content remains above the animation layer with proper z-index
- Add `overflow-hidden` to contain the animated elements

---

## Technical Details

### Files to Modify

**1. tailwind.config.ts**
Add keyframes for aurora movement:
```javascript
keyframes: {
  "aurora-shift-1": {
    "0%, 100%": { transform: "translateX(-25%) translateY(0%)" },
    "50%": { transform: "translateX(25%) translateY(-10%)" }
  },
  "aurora-shift-2": {
    "0%, 100%": { transform: "translateX(25%) translateY(-5%)" },
    "50%": { transform: "translateX(-25%) translateY(5%)" }
  },
  "aurora-shift-3": {
    "0%, 100%": { transform: "translateX(0%) translateY(5%)" },
    "50%": { transform: "translateX(-15%) translateY(-5%)" }
  }
}
```

**2. src/index.css**
Add aurora utility classes with gradient overlays:
```css
.aurora-bg {
  position: relative;
  overflow: hidden;
}

.aurora-bg::before,
.aurora-bg::after {
  content: '';
  position: absolute;
  inset: -50%;
  opacity: 0.15;
  filter: blur(80px);
  pointer-events: none;
}
```

**3. src/components/layout/Footer.tsx**
- Add `aurora-bg` class to footer element
- Add multiple `<div>` elements as aurora wave layers
- Use absolute positioning with animated gradients
- Ensure main content has `relative z-10` for proper stacking

### Color Palette for Aurora
- Primary wave: Purple gradients matching `--ka-purple-medium` (270 30% 30%)
- Secondary wave: Deeper purple with gold hints
- Accent highlights: Subtle gold glow from `--ka-gold` (42 47% 60%)

### Animation Timing
- Duration: 15-25 seconds per cycle (slow, organic movement)
- Easing: ease-in-out for smooth transitions
- Infinite loop with no visible seams

