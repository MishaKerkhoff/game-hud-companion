

# Fix: Match Stash Item Spacing to Backpack

## Problem
The Backpack uses `grid-cols-4 gap-1` which divides space equally among 4 columns, making items stretch to fill each cell. The Stash grid uses `auto-fill` with `minmax(3rem, 1fr)`, which crams as many columns as possible and doesn't produce the same even, spacious look.

## Solution
Switch the Stash grid from inline `gridTemplateColumns` with `auto-fill` to a Tailwind fixed-column grid with the same `gap-1` as the Backpack. Since the Stash panel is much wider, we'll use more columns (e.g., `grid-cols-8`) so there are roughly 8 items per row, each stretching equally to fill the available width -- exactly matching how the Backpack distributes its 4 columns.

## Changes

### `src/pages/Stash.tsx` (stash grid, ~line 176-179)
- Remove the inline `style={{ gridTemplateColumns: ... }}`
- Change `className="grid gap-1"` to `className="grid grid-cols-8 gap-1"`

This gives items the same proportional stretch behavior as the Backpack's `grid-cols-4 gap-1`.

One line changed, no new dependencies.

