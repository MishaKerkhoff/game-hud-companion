

# Navigation Rail + Stash Page

## Overview
Restructure the out-of-raid UI to use a persistent left-hand navigation rail with icons for Play, Stash, Shop, Craft, Raider Stats. Move Settings to the top-right corner. Build a Stash page where the player's bag and hotbar appear on the right, and a large stash grid occupies the center area.

## Changes

### 1. New: `src/components/game/MenuLayout.tsx`
A wrapper layout component used by all non-raid pages:
- **Left rail**: Vertical strip (~64px wide) with icon buttons for each menu section (Play, Stash, Shop, Craft, Raider Stats). Uses the same `hud-panel` styling. The active route is highlighted with `border-primary`. Each button navigates to its route using `useNavigate`.
- **Top-right**: Settings gear icon button (matching raid placement), opens a small settings popup or navigates to a future settings page.
- **Content area**: Takes up the remaining space to the right of the rail. Renders child content via `{children}` or an `<Outlet>`.
- Background uses the same radial gradient as the current MainMenu.

### 2. New: `src/hooks/useStashState.ts`
Manages the persistent stash inventory (separate from raid state):
- `stash`: An array of `InventorySlot[]` (e.g., 50-100 slots, displayed in a grid similar to the "Warehouse" in the reference image).
- `backpack` / `hotbar` / `equipment`: The player's loadout that persists between raids (reuses same types from `types/game.ts`).
- Functions: `moveStashToBackpack`, `moveBackpackToStash`, `moveStashToHotbar`, `swapStashSlots`, `sortStash`, `storeAll` (move all backpack items into stash).
- Initialized with sample items for demonstration.
- `totalWeight()` calculator (same pattern as `useGameState`).

### 3. New: `src/pages/Stash.tsx`
The stash management screen, rendered inside `MenuLayout`:
- **Layout**: Flex row filling the content area.
  - **Center/Left area**: The stash grid inside a `hud-panel`. Header shows "Stash (count/max)" with a "Sort" button. Grid uses 5-6 columns of `InventorySlotUI` components. Scrollable if items exceed visible area.
  - **Right area**: A column containing:
    - Equipment slots row (WPN, BAG, SLD) -- same layout as `BagHUD`
    - Backpack label with count + "Store All" and "Sort" buttons
    - Backpack 3x4 grid
    - Weight bar
  - **Bottom**: Hotbar (reusing the same 5-slot layout with weapon + 4 items)
- Full drag-and-drop support between stash, backpack, equipment, and hotbar using the existing `InventorySlotUI` drag system.

### 4. Modified: `src/pages/MainMenu.tsx`
- Remove the self-contained full-screen layout (background, grid, title, nav buttons).
- Replace with a simpler "Play" landing content rendered inside `MenuLayout`. Shows the game title "RAIDER" prominently in the center with just the "PLAY" call-to-action button underneath. The navigation is now handled by the rail, so individual menu buttons are removed from this page.

### 5. Modified: `src/App.tsx`
Update routing structure:
- Wrap non-raid routes in `MenuLayout`:
  - `/` -- MainMenu (Play landing)
  - `/stash` -- Stash page
  - `/shop` -- Placeholder page
  - `/craft` -- Placeholder page
  - `/stats` -- Placeholder page
- `/game` -- Index (raid scene, no rail)
- `*` -- NotFound

### 6. New: `src/pages/PlaceholderPage.tsx`
A simple reusable placeholder for Shop, Craft, and Raider Stats pages. Shows the page title centered with a "Coming Soon" message, using `hud-panel` styling.

## Technical Notes

- The left rail uses `react-router-dom`'s `useLocation` to highlight the active route.
- The stash state is independent from the raid `useGameState` -- in a future iteration these could be connected (load from stash into raid, extract from raid into stash).
- The stash grid uses the same `InventorySlotUI` component with a new `dragType` of `"stash"` to enable cross-panel drag-and-drop.
- The rail collapses to icon-only on smaller screens; labels are hidden on mobile.
- Settings button position (top-right) mirrors the in-raid settings button location for consistency.
- The `MenuLayout` background matches the current MainMenu gradient so it feels like one cohesive hub area.

