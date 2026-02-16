

# Stash Page Adjustments

## Overview
Four changes: add Bag and Shield category filters, remove empty stash slots from display, make the stash panel match the right panel height, and vertically center the left nav rail.

## Changes

### 1. `src/pages/Stash.tsx`

**Add Bag and Shield filter categories**
- Update the `CATEGORIES` array to include `{ label: 'Bags', value: 'bag' }` and `{ label: 'Shields', value: 'shield' }`. These will filter by `equipSlot` rather than `category`, so the filtering logic needs a small tweak -- or we can add corresponding item categories. Since the current type system uses `equipSlot` for bag/shield, we will filter by checking `slot.item?.equipSlot === 'bag'` or `'shield'` for those two filters, while the rest filter by `category`.

**Remove empty slots from stash grid**
- Change `filteredStash` to always exclude empty slots: filter out any slot where `item` is `null`, then apply the category filter on top. This means the stash only shows occupied slots -- no empty grid squares.

**Match stash panel height to right panel**
- Change the outer flex container to use `h-full` with both columns, and ensure the stash `hud-panel` div uses `h-full` to stretch to match the right panel. Both panels will be children of a flex row that fills the available height equally.

### 2. `src/components/game/MenuLayout.tsx`

**Vertically center the left nav rail**
- Change the nav element from `py-4` top-aligned to `justify-center` so the `hud-panel` button group sits in the vertical center of the screen.

### Technical Details

- The filter type will be a union: `ItemCategory | 'bag' | 'shield' | null`. For "Bag" and "Shield" filters, we check `slot.item?.equipSlot` instead of `slot.item?.category`.
- The stash grid will only render slots with items, making it a compact list rather than a fixed grid with empties.
- The stash panel gets `h-full` to match the loadout panel height, keeping a uniform look.
- The nav rail gets `justify-center` added to vertically center the button group within the viewport height.

