

# Fix: Stash div stretching with window height

## Problem
The grid container on line 20 has `h-full`, which forces it to fill the entire viewport height. When the grid is taller than its content, CSS Grid distributes the extra space among the `auto` rows, causing the Stash panel to stretch. The `my-auto` centering also can't work because `h-full` already makes the container 100% tall.

## Solution
Remove `h-full` from the grid container's className. This lets the grid size to its natural content height (determined by the Right Rail), and `my-auto` will then properly center the block vertically within the flex parent.

## Changes

### `src/components/game/MenuLayout.tsx` (line 20)
- Change: `"relative z-10 flex-1 grid grid-rows-[auto_auto_auto] grid-cols-[1fr_auto] min-w-0 h-full my-auto"`
- To: `"relative z-10 flex-1 grid grid-rows-[auto_auto_auto] grid-cols-[1fr_auto] min-w-0 my-auto"`

One class removed (`h-full`), no other files affected.

