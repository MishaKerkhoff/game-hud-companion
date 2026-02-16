

# Fix: Prevent Stash from stretching beyond Right Rail height

## Problem
The grid's middle row uses `1fr`, which expands to fill all remaining vertical space. When the window is tall, the center cell (Stash) grows larger than the right rail's natural content height.

## Solution
Change the middle row from `1fr` to `auto` so it sizes to the taller of its two cells (center and right rail), rather than stretching to fill the viewport. Then wrap the entire grid in a vertically-centered flex container so the content stays visually centered when there's extra space.

## Changes

### `src/components/game/MenuLayout.tsx`
- Change `grid-rows-[auto_1fr_auto]` to `grid-rows-[auto_auto_auto]` on the content grid.
- Add `my-auto` to the grid container so the whole block stays vertically centered when the viewport is taller than the content.
- The center cell keeps `overflow-hidden` and `min-h-0` so the stash still scrolls internally if needed.

This is a one-line class change. No other files need modification.

