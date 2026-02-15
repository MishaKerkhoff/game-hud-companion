import { GameState } from '@/types/game';
import { InventorySlotUI } from './InventorySlotUI';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotbarHUDProps {
  state: GameState;
  setActiveSlot: (slot: number) => void;
  swapHotbarSlots: (from: number, to: number) => void;
  moveBackpackToHotbar: (bpIndex: number, hotbarIndex: number) => void;
  moveContainerToHotbar: (containerIndex: number, hotbarIndex: number) => void;
}

export function HotbarHUD({
  state, setActiveSlot, swapHotbarSlots, moveBackpackToHotbar, moveContainerToHotbar,
}: HotbarHUDProps) {
  const isMobile = useIsMobile();

  const handleDragStart = (type: string, index: number | string) => {};

  const handleHotbarDrop = (targetIndex: number) => (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'hotbar') {
      swapHotbarSlots(sourceIndex as number, targetIndex);
    } else if (sourceType === 'backpack') {
      moveBackpackToHotbar(sourceIndex as number, targetIndex);
    } else if (sourceType === 'container') {
      moveContainerToHotbar(sourceIndex as number, targetIndex);
    }
  };

  return (
    <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
      <div className="hud-panel px-2 py-2 flex gap-1 md:gap-1.5">
        {state.hotbar.map((slot, i) => (
          <InventorySlotUI
            key={i}
            slot={slot}
            index={i}
            isActive={state.activeHotbarSlot === i}
            showNumber
            isWeaponSlot={i === 0}
            size={isMobile ? 'sm' : 'md'}
            onClick={() => setActiveSlot(i)}
            dragType="hotbar"
            dragIndex={i}
            onDragStart={handleDragStart}
            onDrop={handleHotbarDrop(i)}
          />
        ))}
      </div>
    </div>
  );
}
