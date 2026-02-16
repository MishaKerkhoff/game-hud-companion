

# In-Raid Settings Popup with Leave Match Option

## Overview
Wire the existing Settings button (top-right of the Roaming HUD) to open a styled popup/dialog that lets the player leave the match and return to the main menu. The popup will use the same `hud-panel` styling to stay consistent with the game's visual language.

## Changes

### 1. `src/components/game/RoamingHUD.tsx`
- Add local state (`isSettingsOpen`) to control the popup visibility
- Wire the existing Settings button's `onClick` to toggle this state
- Render a settings overlay when open, containing:
  - A dark semi-transparent backdrop
  - A centered `hud-panel` styled modal with:
    - "Settings" title
    - "Leave Match" button (styled with destructive/red accent, using `LogOut` icon)
    - "Resume" button to close the popup
  - ESC key listener to close the popup
- "Leave Match" navigates to `/` (main menu) using `useNavigate`

### 2. `src/pages/Index.tsx`
- Pass a pause signal: when the settings popup is open, movement should also pause
- Add `isSettingsOpen` state here and pass it down, OR keep it self-contained in `RoamingHUD` and just use navigation to leave

### Technical Notes
- Keep the popup self-contained inside `RoamingHUD` for simplicity -- it only needs local state and `useNavigate`
- The popup uses the same `hud-panel` class, `font-game`, and `game-outline` text styling
- Movement continues to be paused via the existing `isPaused` logic when bag/container are open; the settings popup adds pointer-events blocking but doesn't need to freeze the 3D scene (player can see the world behind a dark overlay)

