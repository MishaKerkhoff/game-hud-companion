

# Crafting UI

## Overview
A new Crafting page replacing the current placeholder, featuring a carousel of crafting benches and a blueprint grid that shows craftable items for the selected bench. Clicking an item opens a detail popup showing material requirements and item stats.

## Layout Structure

```text
+------------------------------------------+
|              CRAFT (header)               |
+------------------------------------------+
|  [<]  [ Bench 1 ][ Bench 2 ][ Bench 3 ] [>] |
|        (small carousel with levels)       |
+------------------------------------------+
|            BLUEPRINTS                     |
|  +------+  +------+  +------+            |
|  | item |  | item |  | item |            |
|  +------+  +------+  +------+            |
|  +------+  +------+  +------+            |
|  | item |  | item |  | item |            |
|  +------+  +------+  +------+            |
|          (scrollable grid)                |
+------------------------------------------+
```

Clicking a blueprint item opens a popup (reusing the existing `ItemDetailPopup` pattern) showing:
- Item name, rarity, icon, description, stats
- "Required Resources" list with have/need counts
- A "CRAFT" button (disabled if materials insufficient)

## New Files

### 1. `src/data/sample-crafting.ts`
- Define a `CraftingBench` interface: `id`, `name`, `icon` (Lucide), `level`, `rarity`, `recipes[]`
- Define a `CraftRecipe` interface: `itemId` (references ITEMS), `materials[]` (each with `itemId` and `count`)
- Create 3-4 sample benches:
  - **Weapons Bench** (Lv.2) -- craft assault rifle, shotgun, grenade
  - **Armor Bench** (Lv.1) -- craft shield, backpack
  - **Medical Bench** (Lv.3) -- craft medkit, bandage, energy drink
  - **Parts Bench** (Lv.1) -- craft weapon parts, chemicals from raw scrap

### 2. `src/pages/Craft.tsx`
- Replace the `PlaceholderPage` usage in `App.tsx`
- Small Embla carousel at the top for bench selection (compact cards, not full-height like Raider/Shop)
  - Each bench card shows: icon, name, "Lv.X" badge, rarity accent
  - Active bench is slightly scaled up, inactive ones dimmed (same pattern as other carousels)
- Below the carousel: a "Blueprints" section header
- Scrollable grid (3 columns) of `InventorySlotUI` components for the selected bench's recipes
- Clicking a slot opens a `CraftingDetailPopup`

### 3. `src/components/game/CraftingDetailPopup.tsx`
- Similar structure to `ItemDetailPopup` (reuses popup-panel, stat-block, rarity-bar CSS classes)
- Shows the crafted item's info (name, rarity badge, icon, description, stats)
- "Required Resources" section: list of material items with icon, name, and "have/need" count
  - "have" count is currently static/sample data (always shows a mock value)
  - Sufficient materials shown in green, insufficient in red
- "CRAFT" action button at the bottom (styled like popup-btn with a new craft color, or reusing popup-btn-equip)

## Changes to Existing Files

### `src/App.tsx`
- Import the new `Craft` page component
- Replace `<PlaceholderPage title="Craft" />` with `<Craft />`

### `src/index.css`
- Add a `.popup-btn-craft` style (a blue/teal accent for the craft button)
- Add a `.bench-card` style for the compact bench carousel cards

## Design Decisions
- The bench carousel is compact (small horizontal cards, not tall portrait cards like Raider/Shop) to leave room for the blueprint grid below
- Reuses all existing UI patterns: slot-base, rarity colors, popup-panel, stat-block, game-outline, font-game
- The craft detail popup follows the same modal pattern as ItemDetailPopup (fixed overlay, backdrop click to close)
- Material "have" counts use sample data for now since there's no global inventory state connecting stash to crafting

