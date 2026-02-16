

# Fix: Right Rail Content Hugs Top

## Problem
The right rail container (Equipment/Hotbar/Backpack panel) is vertically centered within its grid cell due to `justify-center`. The user wants it aligned to the top of its container instead.

## Change

### `src/components/game/MenuLayout.tsx` (line 37)
Change `justify-center` to `justify-start` on the right rail div:

**Before:** `flex flex-col items-center justify-center px-2 shrink-0`
**After:** `flex flex-col items-center justify-start px-2 shrink-0`

One line changed, one file.

