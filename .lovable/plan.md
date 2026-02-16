

# Fix: Make Stash Items Fill Grid Cells

## Problem
The stash grid cells stretch dynamically (`1fr`), but the items inside have **fixed widths** (`w-12 md:w-14`). When many columns fit, cells shrink close to the fixed item size, making the 4px gap nearly invisible. When fewer columns fit, cells are much wider than the items, creating large empty space around each item. The gap is always 4px -- it just looks inconsistent because items don't fill their cells.

## Solution
Make the inventory slot buttons use `w-full` (fill their parent cell) instead of fixed widths when used in a grid context. This way items stretch proportionally with the grid, and the 4px gap between cells becomes the only visible spacing -- consistent at any column count.

We'll add an optional `fullWidth` prop to `InventorySlotUI` so the stash can opt into `w-full` behavior without affecting other uses (hotbar, equipment, backpack) that rely on fixed widths.

## Changes

### 1. `src/components/game/InventorySlotUI.tsx`
- Add an optional `fullWidth?: boolean` prop
- When `fullWidth` is true, apply `w-full` instead of the fixed width class
- Height remains the same (fixed height is fine since rows don't stretch)

### 2. `src/pages/Stash.tsx`
- Pass `fullWidth` to each `InventorySlotUI` rendered in the stash grid

No new dependencies. Two files changed.
