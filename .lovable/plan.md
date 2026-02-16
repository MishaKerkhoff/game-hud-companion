

# Restructure MenuLayout with Header, Right, and Footer Rails

## Overview
Restructure the content area of `MenuLayout` to have dedicated rail containers (Header, Right, Footer) alongside the center page content -- mirroring the pattern of the existing Left Nav Rail. Each page can optionally render content into these rails, but the rail containers themselves live in `MenuLayout`.

## Architecture

The content area (everything to the right of the left nav rail) will become a CSS Grid with named areas:

```text
+------------------+----------+
|     HEADER       | HEADER   |
+------------------+----------+
|     CENTER       |  RIGHT   |
|    (Outlet)      |  RAIL    |
+------------------+----------+
|     FOOTER       | FOOTER   |
+------------------+----------+
```

To allow each page to inject content into these rails, we will use a React Context that pages can populate.

## Changes

### 1. New file: `src/contexts/MenuRailContext.tsx`
- Create a React Context with a provider that holds `ReactNode` state for `headerContent`, `rightContent`, and `footerContent`.
- Expose setter functions so child pages can register their rail content.
- Export a `useMenuRails` hook for pages to consume.
- Export a `MenuRailSlot` component that sets rail content on mount and clears it on unmount.

### 2. Update: `src/components/game/MenuLayout.tsx`
- Wrap the content area with the `MenuRailProvider`.
- Replace the current flat flex layout with a grid structure:
  - **Header Rail**: A horizontal strip at the top. Contains the Settings button (moved from absolute positioning). Pages can inject additional header content here via context.
  - **Right Rail**: A vertical strip on the right side. Empty by default; pages inject content via context.
  - **Footer Rail**: A horizontal strip at the bottom. Empty by default; pages inject content via context.
  - **Center**: The `Outlet` area where page content renders.
- Remove the absolute-positioned Settings button and place it in the Header Rail div, aligned to the right.

### 3. Update: `src/pages/Stash.tsx`
- Extract the loadout panel (Equipment, Hotbar, Backpack + Weight) into the Right Rail using the `MenuRailSlot` component.
- The Stash page's own JSX will only contain the Stash grid.
- Remove the ResizeObserver height-sync logic (no longer needed since the stash grid and loadout panel are in separate grid cells -- the stash grid will fill the center area naturally).
- The stash grid will take the full center area height and scroll internally.

## Technical Details

### MenuRailContext API
```typescript
// Pages use this to inject content into rails
<MenuRailSlot slot="right">
  <div className="hud-panel p-3 flex flex-col">
    {/* Equipment, Hotbar, Backpack */}
  </div>
</MenuRailSlot>
```

### MenuLayout Grid Structure
```typescript
<div className="relative z-10 flex-1 grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_auto] min-w-0 h-full">
  {/* Header Rail - spans full width */}
  <div className="col-span-2 flex items-center justify-end px-3 py-2">
    <SettingsButton />
    {headerContent}
  </div>

  {/* Center - page content */}
  <div className="overflow-auto px-2 md:px-4 flex items-center justify-center min-h-0">
    <Outlet />
  </div>

  {/* Right Rail */}
  <div className="flex flex-col items-center justify-center px-2 shrink-0">
    {rightContent}
  </div>

  {/* Footer Rail - spans full width */}
  <div className="col-span-2 px-3 py-2">
    {footerContent}
  </div>
</div>
```

### Files to create
- `src/contexts/MenuRailContext.tsx`

### Files to modify
- `src/components/game/MenuLayout.tsx`
- `src/pages/Stash.tsx`

