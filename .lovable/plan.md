

# Constrain Stash Panel Height to Match Loadout Panel

## Problem
The stash grid has many items that stretch the left panel taller than the right loadout panel. CSS Grid rows expand to fit the tallest cell, so the stash content drives the height. The stash panel should instead match the right panel's height and scroll internally.

## Solution
Use a React ref to measure the right (loadout) panel's rendered height, then apply that as a fixed height constraint on the left (stash) panel. This way the loadout panel defines the height, and the stash panel scrolls its content within that same height.

## Changes

### `src/pages/Stash.tsx`
- Add a `useRef` and `useEffect` to measure the right panel's height after render.
- Store the measured height in state.
- Apply that height as an inline `style={{ height }}` on the left stash panel wrapper.
- Add a `ResizeObserver` so it stays in sync if the right panel ever changes size (e.g., window resize).
- The `ScrollArea` inside the stash panel will then properly scroll within the constrained height.

### Technical Details
- `useRef<HTMLDivElement>` on the right panel div.
- `useEffect` with a `ResizeObserver` watching the right panel, updating a `panelHeight` state variable.
- Left panel wrapper gets `style={{ height: panelHeight ? panelHeight + 'px' : 'auto' }}` plus `overflow-hidden` so the `ScrollArea` handles scrolling.
- No changes to other files needed.

