

## Raider Detail Popup: Two-Column Layout with Tabbed Skill Trees

### Overview
Redesign the Raider Detail popup from a single-column stacked layout to a **two-column layout**. The left column shows the raider's stats, and the right column shows skills organized into **3 tabbed skill trees**: Offense, Defense, and Utility.

### Layout

```text
+-----------------------------------------------+
| Rarity accent bar                             |
| [<] RAIDER NAME               [rarity badge] |
|-----------------------------------------------|
|  LEFT COLUMN       |  RIGHT COLUMN            |
|                    |                           |
|  Avatar + Role     |  [Offense][Defense][Util] |
|  Description       |  ----------------------- |
|  Power / XP bar    |  Skill grid (scrollable) |
|  Stats grid        |                           |
|  (HP/ATK/SPD/DEF)  |                           |
+-----------------------------------------------+
```

### Changes

**1. Update Raider type and data (`src/types/raider.ts` + `src/data/sample-raiders.ts`)**
- Add a `category` field to the `Skill` interface: `'offense' | 'defense' | 'utility'`
- Tag each existing skill in `sample-raiders.ts` with one of these categories (e.g., damage-boosting skills as offense, damage-reduction as defense, movement/vision as utility)

**2. Redesign `src/components/game/RaiderDetail.tsx`**
- Widen the popup from `max-w-lg` to `max-w-3xl` to accommodate two columns
- Split the content area into a two-column grid (`grid grid-cols-2`)
- **Left column** (Stats): Avatar, role, description, power/XP bar, stats grid (Health, Attack, Speed, Defense), and the Super stat
- **Right column** (Skills): A `Tabs` component with 3 folder-style tab triggers (Offense / Defense / Utility), each tab filtering and displaying the raider's skills for that category in a grid
- Tab styling will match the folder-tab pattern used in the Shop (rounded-t, border-b-0, active state uses rarity color)
- Each tab's content area will be scrollable for raiders with many skills
- On smaller screens, the layout will stack to a single column (`grid-cols-1 md:grid-cols-2`)

### Technical Details

- Imports `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from existing `@/components/ui/tabs`
- Skills filtered by `skill.category` for each tab
- Default active tab: `"offense"`
- Tab triggers styled with `font-game text-[10px] uppercase`, folder-tab appearance (rounded-t-lg, border-b-0), active state border color from rarity
- The existing `SkillNode` component is reused as-is inside each tab content
- Responsive: on mobile the columns stack vertically so nothing is cramped

