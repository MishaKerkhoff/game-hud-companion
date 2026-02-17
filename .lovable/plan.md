

## Fix: Active Trader Card Clipping

### Problem
When a trader card is centered/active, it scales up slightly (`scale-[1.02]`), but the Embla carousel viewport has `overflow-hidden`, which clips the enlarged card at the edges.

### Solution
Add vertical padding to the carousel slides so the scaled card has room to grow without being clipped. This is the simplest fix that preserves the Embla scroll behavior (which relies on `overflow-hidden` horizontally).

### Changes

**`src/pages/Shop.tsx`**
- Add `py-2` (vertical padding) to the Embla viewport container (`<div className="flex h-full">`) so the scaled card has breathing room within the clipped area.
- This keeps horizontal overflow hidden (required for Embla) while preventing vertical clipping from the scale transform.

