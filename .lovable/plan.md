

# Fix: Lock Stash Height to Right Rail Height

## Problem
With `grid-rows-[auto_auto_auto]`, the middle row sizes to the tallest cell. If the Stash content is naturally taller than the Right Rail panel, it pushes the row height up. We need the row height to be determined **solely** by the Right Rail.

## Solution
Use a `position: relative` / `position: absolute` pattern on the center cell so its content doesn't participate in the grid's intrinsic sizing. The Right Rail alone determines the row height, and the Stash panel fills that height via absolute positioning and scrolls internally.

## Changes

### `src/components/game/MenuLayout.tsx` (line 30-32, the Center cell)
Change from:
```
<div className="overflow-hidden px-2 md:px-4 flex items-center justify-center min-h-0">
  <Outlet />
</div>
```
To:
```
<div className="relative px-2 md:px-4 min-h-0">
  <div className="absolute inset-0 px-2 md:px-4 flex items-center justify-center overflow-hidden">
    <Outlet />
  </div>
</div>
```

The outer div is the grid cell -- it has no intrinsic content height (empty), so it contributes 0 to the `auto` row calculation. The inner absolute div fills the cell (which stretches to match the Right Rail via default `align-self: stretch`) and clips/scrolls the Stash content within.

### `src/pages/Stash.tsx`
No changes needed. The existing `h-full w-full flex overflow-hidden` wrapper and internal `ScrollArea` will work correctly once the parent constrains the height.

## Technical Detail
- Grid `auto` tracks size to intrinsic content. An empty relative container has 0 intrinsic height.
- Grid items default to `align-self: stretch`, so the empty center cell still stretches to match the Right Rail's row height.
- The absolutely-positioned inner div then fills that stretched cell, giving the Stash exactly the Right Rail's height.

One file changed, no new dependencies.
