

# Layout Restructure: 3-Column Grid with Height Cap

## Goal
Restructure the layout so the Left Nav Rail, Center Content, and Right Rail all live in the same grid row. The Right Rail's natural content height caps the row, preventing the center from stretching with the browser window. Footer stays pinned to the bottom.

## Current Structure
```text
Outer flex container:
  [Left Nav Rail (full height)]  [ContentArea grid (flex-1)]
                                    Row 1: Header/Settings
                                    Row 2: Center | Right Rail
                                    Row 3: Footer
```

## Proposed Structure
```text
Single grid (full screen):
  Row 1 (auto):   [ Header / Settings ................ ]   col-span-3
  Row 2 (auto):   [ Left Rail ][ Center ][ Right Rail ]   height = tallest child (right rail)
  Row 3 (1fr):    [ Footer (self-end) ................ ]   col-span-3, pinned to bottom
```

## Changes

### `src/components/game/MenuLayout.tsx`

1. **Move the Left Nav Rail inside the grid**: Remove it from the outer flex container and place it as a grid cell in Row 2, Column 1.

2. **Change grid definition**: The outer container becomes just a full-screen wrapper. The grid becomes `grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr_auto]`:
   - `auto` column 1 = Left Nav Rail (fixed width)
   - `1fr` column 2 = Center content (Outlet)
   - `auto` column 3 = Right Rail

3. **Row 2 is `auto`**: It sizes to its tallest child (the Right Rail panel), so the center content never exceeds that height. The center content uses `overflow-hidden` to scroll if needed.

4. **Row 3 is `1fr` with `self-end`**: The footer gets the remaining space but pins itself to the bottom.

5. **Remove absolute positioning** from center content since the `auto` row handles height capping.

### `src/pages/Stash.tsx`
- May need minor adjustment to remove `h-full` if present, since height is now controlled by the grid row.

## Technical Detail

```tsx
// Outer wrapper (replaces the flex container)
<div className="w-screen h-screen overflow-hidden select-none grid grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr_auto]"
     style={{ background: '...' }}>

  {/* Row 1: Header - spans all 3 columns */}
  <div className="col-span-3 flex items-start justify-end px-3 py-2">
    {headerContent}
    <Settings button />
  </div>

  {/* Row 2, Col 1: Left Nav Rail */}
  <nav className="flex flex-col items-center justify-center gap-2 px-2 w-16 md:w-20">
    {/* nav buttons */}
  </nav>

  {/* Row 2, Col 2: Center Content */}
  <div className="px-2 md:px-4 min-h-0 overflow-hidden">
    <Outlet />
  </div>

  {/* Row 2, Col 3: Right Rail */}
  <div className="flex flex-col items-center justify-start px-2">
    {rightContent}
  </div>

  {/* Row 3: Footer - spans all 3 columns, pinned to bottom */}
  <div className="col-span-3 px-3 py-2 flex items-end self-end">
    {footerContent}
  </div>
</div>
```

The MenuRailProvider wrapping and ContentArea component will be restructured so that all elements live within a single grid. The Left Nav Rail moves from being a flex sibling into being a grid cell. Two files changed, no new dependencies.
