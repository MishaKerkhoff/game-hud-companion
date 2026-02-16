

# Item Detail Popup on Click

## Overview
Add a popup modal that appears when clicking any item in the inventory/stash. It shows the item's stats, description, and icon in a bold "Brawl Stars" vector UI style -- chunky panels, thick outlines, candy-saturated colors, all-caps headers, and numbers as the visual anchor.

## Changes

### 1. Extend `GameItem` type (`src/types/game.ts`)
Add optional fields to support the detail popup:
- `description?: string` -- flavor text
- `stats?: Record<string, string | number>` -- key-value stat pairs (e.g. DMG: 13, Fire Rate: 13.5)
- `sellValue?: number` -- currency value for a future sell button

### 2. Add descriptions and stats to items (`src/data/sample-items.ts`)
Populate each item with a short description and relevant stats. For example:
- Assault Rifle: description "High accuracy service weapon", stats: { DMG: 13, "Fire Rate": 13.5, "Mag Size": 30 }
- Med Kit: description "Restores health over time", stats: { "Heal Amount": 75, "Use Time": "5s" }
- Ammo items: stats for caliber and quantity per stack

### 3. Create `ItemDetailPopup` component (`src/components/game/ItemDetailPopup.tsx`)
A centered overlay modal triggered on item click. Layout inspired by the reference images:

```
+-----------------------------------------------+
|  [X]   ASSAULT RIFLE            (rarity badge) |
|                                                 |
|        [ Large Item Icon ]                      |
|        3.5 kg                                   |
|        "High accuracy service weapon..."        |
|                                                 |
|  +-------------------+  +-------------------+  |
|  | DMG               |  | FIRE RATE         |  |
|  |     13            |  |     13.5          |  |
|  +-------------------+  +-------------------+  |
|  +-------------------+  +-------------------+  |
|  | MAG SIZE          |  | WEIGHT            |  |
|  |     30            |  |     3.5 kg        |  |
|  +-------------------+  +-------------------+  |
|                                                 |
|  Category: Weapon    |  Stack: 1/1             |
+-------------------------------------------------+
```

Visual style:
- Dark semi-transparent backdrop, click outside to close
- Main panel uses `hud-panel` base with extra thick border (4px)
- Rarity-colored top accent bar matching the item's rarity
- Item name in `font-game` uppercase, large
- Stat blocks are individual rounded panels with colored labels (candy blue headers, large white values)
- Numbers are 2-3x the size of their labels
- Weight shown with icon
- Category and stack info at bottom
- Close button (X) in top-right, thick and chunky

### 4. Add popup state to `Stash` page (`src/pages/Stash.tsx`)
- Add `selectedSlot` state (`InventorySlot | null`)
- On item click (not drag), set `selectedSlot`
- Render `ItemDetailPopup` when `selectedSlot` is set
- Close on backdrop click or X button

### 5. Update `InventorySlotUI` (`src/components/game/InventorySlotUI.tsx`)
- Add an optional `onItemClick?: (slot: InventorySlot) => void` prop
- On click, if the item exists and `onItemClick` is provided, call it instead of the existing `onClick`
- Drag behavior remains unchanged (drag start requires hold + move)

### 6. Add popup styles to `src/index.css`
- `.stat-block` class: rounded panel with inset shadow, thick border, for individual stat cells
- Rarity accent color utilities for the popup header bar
- Large number typography utility

## Files Changed
1. `src/types/game.ts` -- add optional fields
2. `src/data/sample-items.ts` -- populate descriptions/stats
3. `src/components/game/ItemDetailPopup.tsx` -- new component
4. `src/components/game/InventorySlotUI.tsx` -- add onItemClick prop
5. `src/pages/Stash.tsx` -- wire up popup state
6. `src/index.css` -- stat block styles

