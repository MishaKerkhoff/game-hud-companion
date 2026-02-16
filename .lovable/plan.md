
# Fix: Dynamic Columns with Consistent gap-1 Spacing

## Problem
The current fixed `grid-cols-8` doesn't dynamically adjust column count when the stash widens or narrows. The previous `auto-fill` attempt worked dynamically but the user felt spacing didn't match the backpack.

## Solution
Use `auto-fill` with `minmax(3rem, 1fr)` again, but this time combined with `gap-1` in the Tailwind class. The `1fr` max ensures each cell stretches equally to fill the row (identical behavior to the backpack's `grid-cols-4` where cells expand proportionally). The `3rem` min ensures columns break responsively. The `gap-1` stays consistent regardless of column count.

This is effectively the same proportional-stretch behavior as the backpack, just with a dynamic column count.

## Changes

### `src/pages/Stash.tsx` (line 178)
Change:
```tsx
className="grid grid-cols-8 gap-1"
```
To:
```tsx
className="grid gap-1"
style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(3rem, 1fr))' }}
```

One line changed, no new dependencies.
