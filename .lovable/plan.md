

# Cassette Futurism UI Color Overhaul

## Overview
Retheme the entire game UI from the current blue/gold dark palette to a **Cassette Futurism** aesthetic inspired by the provided palettes. The core look is retro CRT terminals with warm amber text on near-black backgrounds, accented by beige "housing" elements, phosphor green for positive states, and blueprint blue for navigation.

## Color Mapping

The new palette (from the "Game UI: Cassette Futurism" reference):

| Role | Current | New Color | Hex |
|------|---------|-----------|-----|
| **Background** | Dark navy `220 20% 10%` | Terminal Black | `#181812` |
| **Foreground (text)** | Warm white | Beige Housing | `#D8D2C2` |
| **Primary (headings, glow, active)** | Gold | Phosphor Amber | `#FFB347` |
| **Secondary (nav, labels)** | Bright blue | Blueprint Blue | `#5A7D9A` |
| **Accent (positive/ready)** | Green | Retro Phosphor Green | `#4DE94C` |
| **Destructive (danger)** | Red | Critical Alert Red | `#FF3333` |
| **Muted (disabled/locked)** | Dark gray | Unpowered Grey | `#55524B` |
| **Card/Panel bg** | Dark navy | Slightly lighter Terminal | ~`#1E1E16` |
| **Border** | Navy border | Warm dark border | ~`#3A3830` |
| **Hover/Focus** | -- | Overdriven Amber | `#FFD8A8` |
| **Ring/glow** | Gold | Phosphor Amber | `#FFB347` |

### Game-specific tokens

| Token | New Value | Source |
|-------|-----------|--------|
| `--health` | Retro Phosphor Green `#4DE94C` | Affirm/Ready |
| `--thirst` | Blueprint Blue `#5A7D9A` | Secondary |
| `--energy` | Phosphor Amber `#FFB347` | Primary |
| `--storm` | Deep Violet Shadow `#2E2245` | Environment palette |
| `--hud-panel` | Terminal Black variant `#1A1A12` | Base layer |
| `--hud-border` | Warm border `#3A3830` | Derived |
| `--hud-glow` | Phosphor Amber | Primary |
| `--slot-bg` | Dark terminal `#22221A` | Derived |
| `--slot-border` | Warm gray `#3A3830` | Derived |
| `--slot-active` | Phosphor Amber | Primary |

### Rarity colors (adjusted to fit the retro feel)

| Rarity | New Color |
|--------|-----------|
| Common | Beige Housing `#D8D2C2` (muted) |
| Uncommon | Retro Phosphor Green `#4DE94C` |
| Rare | Blueprint Blue `#5A7D9A` |
| Epic | Acid Magenta `#D63384` |
| Legendary | Phosphor Amber `#FFB347` |

## Files to Change

### 1. `src/index.css` -- CSS Variable Overhaul
- Update all `:root` CSS custom properties to new HSL values derived from the hex palette above
- Update game-specific tokens (`--health`, `--thirst`, `--energy`, `--storm`, `--hud-*`, `--slot-*`, `--rarity-*`)
- Update the background gradient in `.hud-panel` and shadows to use warmer tones instead of blue-tinted ones
- Update `.stat-label` secondary color reference
- Update confirmation box backgrounds to use warm-tinted versions instead of blue-tinted

### 2. `src/components/game/MenuLayout.tsx`
- Change the radial gradient background from navy (`hsl(220 25% 18%), hsl(220 20% 8%)`) to warm terminal blacks
- Update the grid overlay line color to use the new foreground/beige tone

### 3. `src/components/game/RoamingHUD.tsx`
- Update health bar gradient from red hues to use `--destructive` variable (Critical Alert Red)
- Update shield bar gradient from blue hues to use Blueprint Blue
- Update mobile action button inline colors

### 4. `src/components/game/ItemIcon.tsx`
- Update the `rarityColor` map to match new rarity hex values

### 5. `src/components/game/ItemDetailPopup.tsx`
- No structural changes needed; colors flow from CSS variables automatically

### 6. `src/pages/MainMenu.tsx`
- Update inline `textShadow` color from navy to Terminal Black tones

### 7. `tailwind.config.ts`
- No changes needed; it already references CSS variables

### 8. `src/components/game/RaiderDetail.tsx`
- The `rarityColor` map references CSS variables, which will update automatically
- No file changes needed

### 9. `src/pages/Raider.tsx` and `src/pages/Shop.tsx`
- Same as above -- `rarityColor` maps reference CSS variables, will update automatically

## What Won't Change
- Component structure, layout, typography (Bungee + Nunito fonts stay)
- Game logic, routing, state management
- The bold "Brawl Stars" hierarchy with thick outlines and blocky panels remains -- just recolored

## Expected Result
The UI will shift from a cool blue/gold sci-fi look to a warm, retro-terminal Cassette Futurism aesthetic: amber text glowing on dark screens, beige-toned panels reminiscent of old computer housings, phosphor green for health/positive states, and blueprint blue for secondary navigation elements.

