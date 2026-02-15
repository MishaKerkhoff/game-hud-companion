

# Game HUD Prototype — Brawl Stars Style × Duckov Functionality

## Overview
A fully interactive, responsive game HUD prototype with two switchable views: **Roaming HUD** and **Container/Loot HUD**. The visual style draws from Brawl Stars' bold, cartoonish, colorful UI (thick outlines, vibrant colors, rounded shapes, strong shadows), while the layout and functionality mirrors Duckov's survival game HUDs.

---

## View 1: Roaming HUD

The default gameplay view overlaying a dark game-like background.

**Top-Left — Status Info:**
- Game clock/timer (bold digital style)
- Weather indicator (e.g., "Night / Sunny")
- Storm countdown timer with icon

**Top-Right:**
- Controls/settings button

**Center:**
- Crosshair/reticle

**Bottom-Center — Hotbar:**
- 8 numbered inventory slots (keys 1-8)
- Active slot highlighted with a glow effect
- Clicking a slot selects it as active
- Slots can display item icons and stack counts

**Bottom-Left — Player Stats:**
- Health bar (animated, Brawl Stars style with bold colors)
- Thirst/energy icon indicators with circular progress

**Bottom-Left (Mobile) — Virtual Joystick:**
- D-pad style movement control (visible on mobile only)

**Bottom-Right (Mobile) — Action Buttons:**
- Attack and special ability buttons (visible on mobile only)

---

## View 2: Container/Loot HUD

Opens as an overlay when the player "interacts with a container" (toggled via a button).

**Top-Center — Category Tabs:**
- Icon tabs for filtering (all, weapons, armor, consumables, etc.)
- Weight indicator (e.g., "6.3/49kg")

**Left Panel — Player Equipment & Backpack:**
- Equipment slots grid (weapon 1, weapon 2, body, head, backpack, accessories)
- Backpack inventory grid (e.g., 5×5 slots with capacity like "1/23")
- Weight bar at bottom

**Right Panel — Container Loot:**
- Title showing container name and item count (e.g., "Loot (10/10)")
- Item grid showing available loot with icons and stack counts

**Interactions:**
- Click an item in loot panel to pick it up (moves to backpack)
- Click an item in backpack to drop it (moves to loot or removes)
- Click equipment slots to equip/unequip items
- Drag-and-drop support for moving items between panels

**Bottom — Quick Bar:**
- Same hotbar slots from the roaming view, persistent at bottom

---

## Visual Style (Brawl Stars Inspired)

- **Bold, thick dark outlines** on all UI elements
- **Vibrant color palette**: bright greens, reds, blues, yellows on dark backgrounds
- **Rounded, chunky shapes** with subtle 3D/shadow effects
- **Glowing highlights** on active/selected elements
- **Chunky, bold fonts** (using a gaming-style font weight)
- **Semi-transparent dark panels** with colored borders
- **Animated health/progress bars** with color gradients

---

## Responsive Behavior

- **Desktop**: Mouse/keyboard interactions, keyboard shortcuts for hotbar (1-8)
- **Mobile**: Touch-friendly larger slots, virtual joystick and action buttons appear, swipe gestures for inventory
- Panels resize and reflow appropriately for smaller screens

---

## Demo Features

- Toggle between Roaming and Container views with a button
- Pre-populated sample items (weapons, ammo, med kits, armor)
- Health bar can be adjusted via buttons to demo animations
- Timer counts down in real-time
- All built with React components and Tailwind CSS, no backend needed

