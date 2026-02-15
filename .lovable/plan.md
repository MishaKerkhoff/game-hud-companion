

# 3D Top-Down Character with Movement (Brawl Stars Style)

## Overview
Add a 3D scene behind the existing HUD with a movable character viewed from a tilted orthographic camera, matching the Brawl Stars top-down perspective.

## New Dependencies
- `three` (3D engine)
- `@react-three/fiber@^8.18` (React 18 compatible)
- `@react-three/drei@^9.122.0`

## New Files

### 1. `src/hooks/useCharacterMovement.ts`
- Tracks WASD/Arrow key input and converts to a movement vector
- Accepts an optional joystick vector (for mobile)
- Updates character position each frame using `useFrame`
- Disables movement when `isBagOpen` or `isContainerOpen` is true
- Returns position (`[x, 0, z]`) and rotation (facing direction)
- Movement speed ~5 units/sec

### 2. `src/components/game/Character.tsx`
- A `<group>` containing:
  - Cylinder body (bright blue `MeshToonMaterial`)
  - Sphere head (skin tone) sitting on top
  - Small sphere eyes (black)
- Rotates to face movement direction
- Subtle idle bobbing animation when stationary
- Walking bob when moving
- Casts shadow onto the ground

### 3. `src/components/game/Ground.tsx`
- Large flat plane with a green grass-colored material
- Grid lines overlay for visual depth
- Receives shadows
- Some scattered decorative elements (small dark circles as rocks) to give a sense of motion

### 4. `src/components/game/GameScene.tsx`
- `<Canvas>` wrapper component
- `<OrthographicCamera>` with zoom ~50, positioned above and tilted ~55 degrees (Brawl Stars angle)
- Camera smoothly follows character using `lerp` in `useFrame`
- Ambient light + directional light with shadow mapping
- Renders `<Ground>` and `<Character>`
- Accepts `isPaused` prop to freeze movement when menus are open

## Modified Files

### 5. `src/pages/Index.tsx`
- Replace the static gradient background `div` with `<GameScene>` as the background layer
- Pass `isPaused={state.isBagOpen || state.isContainerOpen}` to the scene
- Keep all HUD layers exactly as they are, rendered on top

### 6. `src/components/game/RoamingHUD.tsx`
- Wire the mobile virtual joystick buttons to emit movement direction vectors
- Add `onJoystickMove` callback prop
- On pointer-down for each direction button, set the vector; on pointer-up, clear it

## Technical Notes
- The 3D canvas is rendered as a full-screen background layer with `position: absolute; inset: 0`
- All existing HUD HTML overlays sit on top unchanged
- Camera uses orthographic projection for that flat, Brawl Stars feel
- Character is built purely from Three.js primitives (no model files needed)
- `MeshToonMaterial` gives the cel-shaded cartoon look matching the project's visual style

