

# Raider Page: Character Select Carousel + Detail View

## Overview
Replace the current "Raider Stats" placeholder with a full Raider selection page. The main view shows a horizontal carousel of Raider cards that players swipe through. Clicking a card opens a detailed Raider stats/skills page. The nav rail label changes from "Stats" to "Raider".

## Data Model

### New type: `Raider` (`src/types/raider.ts`)
```text
Raider {
  id: string
  name: string
  role: string               // e.g. "DAMAGE DEALER", "TANK", "SUPPORT"
  icon: string               // Lucide icon name for avatar
  rarity: common | uncommon | rare | epic | legendary
  level: number              // 1-11
  xp: number
  xpMax: number
  description: string        // Flavor text
  stats: {
    health: number
    attack: string            // e.g. "5 x 510"
    super: string             // e.g. "SUPER SHELL"
    speed: number
    defense: number
  }
  skills: Skill[]             // Skill tree nodes
  selected: boolean
}

Skill {
  id: string
  name: string
  icon: string
  description: string
  unlocked: boolean
  level: number               // required raider level
}
```

### Sample data: `src/data/sample-raiders.ts`
4-5 pre-built raiders with different roles, stats, and skill trees (e.g. "RECON", "BREACHER", "MEDIC", "HEAVY", "GHOST").

## Page Structure

### Carousel View (`src/pages/Raider.tsx`)
The default view when navigating to `/stats`. Uses the MenuLayout grid (center content + optional right rail).

```text
Center Content:
+----------------------------------------------+
|  RAIDERS  3/5                                 |
|                                               |
|  [< ]  +------------------+  [> ]             |
|         |  ============== |                   |
|         |  [ ICON AVATAR ]|                   |
|         |     RECON       |                   |
|         |  DMG DEALER     |                   |
|         |  Lv. 7  126/140 |                   |
|         |  [HP] [ATK] [SPD]|                  |
|         |  [=SELECT=]     |                   |
|         +------------------+                  |
|                                               |
|        o  o  (o)  o  o    (dot indicators)    |
+----------------------------------------------+
```

Each card:
- Rarity-colored top accent bar
- Large centered Lucide icon as the raider avatar (inside a colored circle)
- Name in large all-caps font-game
- Role subtitle (e.g. "DAMAGE DEALER")
- Level badge with XP progress bar
- 3 mini stat blocks (Health, Attack, Speed) in a row
- "SELECT" button (yellow, chunky) on the currently viewed card
- Selected card has a glowing border

### Raider Detail View (`src/components/game/RaiderDetail.tsx`)
Opens when clicking on a raider card (not the SELECT button). Rendered as a full overlay popup similar to `ItemDetailPopup`.

```text
+-----------------------------------------------+
|  [<Back]    RECON                  (rarity)    |
|                                                |
|  [ Large Avatar Icon ]                         |
|  DAMAGE DEALER                                 |
|  "Silent and deadly operative..."              |
|                                                |
|  POWER ========== Lv 7 / MAX 11               |
|                                                |
|  +--------+ +--------+ +--------+ +--------+  |
|  | HEALTH | | ATTACK | | SUPER  | | SPEED  |  |
|  | 6630   | | 5x510  | | SHELL  | |  820   |  |
|  +--------+ +--------+ +--------+ +--------+  |
|                                                |
|  SKILLS                                        |
|  [Skill1 unlocked] [Skill2 unlocked] [Locked]  |
|  [Locked]          [Locked]          [Locked]   |
+-------------------------------------------------+
```

## Visual Style (Brawl Stars aesthetic)
- Raider cards: `popup-panel` style with 4px borders, rarity-colored accent bars
- Avatar: Large Lucide icon inside a colored circular container with thick border
- Stat blocks: Reuse existing `.stat-block` / `.stat-label` / `.stat-value` classes
- SELECT button: Yellow chunky `.popup-btn .popup-btn-sell` style
- Carousel navigation: Chunky arrow buttons with thick borders
- Dot indicators: Filled circle for active, outlined for inactive
- Skill nodes: Rounded panels, green border if unlocked, grey/locked with lock icon if not
- Level/XP bar: Thick rounded progress bar with rarity-colored fill

## Changes

### 1. `src/types/raider.ts` (new)
Define `Raider` and `Skill` interfaces.

### 2. `src/data/sample-raiders.ts` (new)
5 sample raiders with varied stats and 3-6 skills each.

### 3. `src/pages/Raider.tsx` (new)
Main page with horizontal carousel using Embla (already installed as `embla-carousel-react`). Features:
- Carousel of raider cards with prev/next arrows
- Dot indicators
- Click card to open detail overlay
- SELECT button to mark active raider
- Uses `MenuRailSlot` for right rail (optional raider summary or empty)

### 4. `src/components/game/RaiderDetail.tsx` (new)
Full-screen overlay popup showing detailed stats and skill tree grid. Back button returns to carousel.

### 5. `src/components/game/MenuLayout.tsx` (edit)
Change nav item label from "Stats" to "Raider" and icon from `BarChart3` to `User` (or `Swords`).

### 6. `src/App.tsx` (edit)
- Import `Raider` page instead of `PlaceholderPage` for `/stats` route
- Update route element

### 7. `src/index.css` (edit)
Add raider-specific utility classes:
- `.raider-card` -- card panel styling
- `.raider-avatar` -- circular icon container
- `.skill-node` / `.skill-locked` -- skill tree node styles
- `.xp-bar` -- thick XP progress bar
- `.dot-indicator` / `.dot-active` -- carousel dots

## Files Changed
1. `src/types/raider.ts` -- new types
2. `src/data/sample-raiders.ts` -- sample data
3. `src/pages/Raider.tsx` -- main carousel page
4. `src/components/game/RaiderDetail.tsx` -- detail overlay
5. `src/components/game/MenuLayout.tsx` -- rename nav item
6. `src/App.tsx` -- update route
7. `src/index.css` -- new utility classes

