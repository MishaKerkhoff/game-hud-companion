import { GameState, EquipSlot } from '@/types/game';
import { InventorySlotUI } from './InventorySlotUI';
import { useIsMobile } from '@/hooks/use-mobile';

interface HotbarHUDProps {
  state: GameState;
  setActiveSlot: (slot: number) => void;
  swapHotbarSlots: (from: number, to: number) => void;
  moveBackpackToHotbar: (bpIndex: number, hotbarIndex: number) => void;
  moveContainerToHotbar: (containerIndex: number, hotbarIndex: number) => void;
  moveToEquipSlot: (bpIndex: number, equipSlot: EquipSlot) => void;
  moveContainerToEquipSlot: (containerIndex: number, equipSlot: EquipSlot) => void;
  unequipItem: (slot: EquipSlot) => void;
}

export function HotbarHUD({
  state, setActiveSlot, swapHotbarSlots, moveBackpackToHotbar, moveContainerToHotbar,
  moveToEquipSlot, moveContainerToEquipSlot, unequipItem,
}: HotbarHUDProps) {
  const isMobile = useIsMobile();

  const handleDragStart = (type: string, index: number | string) => {};

  const handleWeaponDrop = (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'backpack') {
      moveToEquipSlot(sourceIndex as number, 'weapon');
    } else if (sourceType === 'container') {
      moveContainerToEquipSlot(sourceIndex as number, 'weapon');
    }
  };

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
    <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto">
      <div className="hud-panel px-2 py-1.5 flex gap-1 md:gap-1">
        {/* Weapon slot (shared with equipment.weapon) */}
        <InventorySlotUI
          slot={state.equipment.weapon}
          index={0}
          isActive={state.activeHotbarSlot === 0}
          showNumber
          isWeaponSlot
          size={isMobile ? 'sm' : 'md'}
          onClick={() => setActiveSlot(0)}
          dragType="equip"
          dragIndex="weapon"
          onDragStart={handleDragStart}
          onDrop={handleWeaponDrop}
        />
        {/* 4 item slots */}
        {state.hotbar.map((slot, i) => (
          <InventorySlotUI
            key={i}
            slot={slot}
            index={i + 1}
            isActive={state.activeHotbarSlot === i + 1}
            showNumber
            size={isMobile ? 'sm' : 'md'}
            onClick={() => setActiveSlot(i + 1)}
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
