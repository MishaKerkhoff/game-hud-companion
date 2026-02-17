

## Add Inventory / Quests Tabs to Trader Cards

### Overview
Each trader card in the shop carousel will get two tabs above the item grid: **Inventory** (default, shows current item grid) and **Quests** (shows a list of quests for that trader). This uses the existing Radix Tabs component styled to match the bold vector aesthetic.

### Changes

**1. Create quest data (`src/data/sample-quests.ts`)**
- Define a `TraderQuest` interface with fields: `id`, `title`, `description`, `reward` (text), `progress` (current/max), `completed` (boolean)
- Add a `TRADER_QUESTS` map keyed by trader ID, each containing 2-4 sample quests
- Example quests: "Deliver 5 Medkits" for Patch, "Scrap 100 Metal" for Scrapper, etc.

**2. Update `src/pages/Shop.tsx`**
- Import `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from the existing tabs component
- Inside `TraderCard`, insert a `Tabs` component between the divider and the inventory grid
- Tab triggers styled with `font-game`, uppercase, bold vector look (thick borders, flat colors)
- "Inventory" tab content: the existing `ScrollArea` with the item grid (unchanged)
- "Quests" tab content: a `ScrollArea` with quest cards showing title, description, a progress bar, and reward info

**3. Quest card styling**
- Each quest rendered as a small panel with thick outline (`border-2 border-border`), matching the card/slot aesthetic
- Quest title in uppercase `font-game`
- Progress shown as a chunky `Progress` bar (existing Radix component) with "3/5" style label
- Reward line with a small icon and yellow/orange highlight text
- Completed quests get a green checkmark overlay and muted styling

### Technical Details

```
TraderCard layout (updated):
+---------------------------+
| Rarity accent bar         |
| Portrait + Name + Role    |
| ─────────────────────────  |
| [Inventory] [Quests]  <-- tabs |
| ─────────────────────────  |
| Tab content (scrollable)  |
|  - Inventory: item grid   |
|  - Quests: quest list     |
+---------------------------+
```

- Default tab value: `"inventory"`
- Tabs component wraps both the tab triggers and content, placed after the divider
- The `max-h-[15.5rem]` scroll constraint applies to both tab contents equally
- Tab triggers use game-styled classes: `font-game text-[10px] uppercase tracking-wider` with active state using rarity color accent

