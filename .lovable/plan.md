

# Sync Stash Panel Height with Right Rail

## Problem
Now that the stash grid (center) and loadout panel (right rail) are in separate grid cells, the stash panel needs to be constrained to the same height as the right rail so it scrolls internally rather than stretching.

## Solution
The CSS Grid row (`1fr`) already sizes the middle row to fit. The fix is simple: ensure the stash panel's wrapper fills the grid cell height exactly (not more, not less) and its internal ScrollArea handles overflow.

## Changes

### `src/pages/Stash.tsx`
- Change the stash wrapper div from `h-full w-full flex` to `h-full w-full flex overflow-hidden` so it constrains to the grid cell height rather than growing with content.

### `src/components/game/MenuLayout.tsx`
- Update the Center grid cell from `overflow-auto` to `overflow-hidden` so it does not allow the center area to scroll at the layout level -- scrolling is handled inside the stash panel's own ScrollArea.
- This ensures the grid cell height is strictly determined by the right rail content, and the center cell clips to that same height.

## Technical Detail
The grid row is `1fr`, which means it takes the remaining space after `auto` header and footer rows. The right rail content (equipment + hotbar + backpack) defines its natural height. With `overflow-hidden` on the center cell, the stash panel is forced to fit within that same row height and scroll internally via its ScrollArea component.

