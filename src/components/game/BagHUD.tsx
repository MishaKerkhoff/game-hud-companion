import { GameState, EquipSlot, InventorySlot } from '@/types/game';
import { InventorySlotUI } from './InventorySlotUI';
import { useIsMobile } from '@/hooks/use-mobile';
import { Weight } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BagHUDProps {
  state: GameState;
  closeBag: () => void;
  equipItem: (bpIndex: number) => void;
  unequipItem: (slot: EquipSlot) => void;
  swapBackpackSlots: (from: number, to: number) => void;
  moveToEquipSlot: (bpIndex: number, equipSlot: EquipSlot) => void;
  moveToBackpackSlot: (equipSlot: EquipSlot, bpIndex: number) => void;
  moveHotbarToBackpack: (hotbarIndex: number, bpIndex: number) => void;
  totalWeight: () => number;
}

const EQUIP_SLOTS: { key: EquipSlot; label: string }[] = [
  { key: 'weapon', label: 'WPN' },
  { key: 'bag', label: 'BAG' },
  { key: 'shield', label: 'SLD' },
];

export function BagHUD({
  state, closeBag, equipItem, unequipItem, swapBackpackSlots,
  moveToEquipSlot, moveToBackpackSlot, moveHotbarToBackpack, totalWeight,
}: BagHUDProps) {
  const weight = totalWeight();
  const maxWeight = 49;
  const [dragSource, setDragSource] = useState<{ type: string; index: number | string } | null>(null);

  const handleBagDragStart = (type: string, index: number | string) => {
    setDragSource({ type, index });
  };

  const handleBackpackDrop = (bpIndex: number) => (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'backpack') {
      swapBackpackSlots(sourceIndex as number, bpIndex);
    } else if (sourceType === 'equip') {
      moveToBackpackSlot(sourceIndex as EquipSlot, bpIndex);
    } else if (sourceType === 'hotbar') {
      moveHotbarToBackpack(sourceIndex as number, bpIndex);
    }
    setDragSource(null);
  };

  const handleEquipDrop = (equipSlot: EquipSlot) => (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'backpack') {
      moveToEquipSlot(sourceIndex as number, equipSlot);
    }
    setDragSource(null);
  };

  // Click outside handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeBag();
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-end p-4 md:p-8 pointer-events-auto"
      onClick={handleBackdropClick}
    >
      <div className="hud-panel w-[280px] md:w-[320px] p-3 md:p-4 flex flex-col gap-3">
        {/* Equipment Row: Weapon, Bag, Shield */}
        <div className="flex justify-center gap-2">
          {EQUIP_SLOTS.map(({ key, label }) => (
            <InventorySlotUI
              key={key}
              slot={state.equipment[key]}
              label={label}
              size="lg"
              onClick={() => unequipItem(key)}
              dragType="equip"
              dragIndex={key}
              onDragStart={handleBagDragStart}
              onDrop={handleEquipDrop(key)}
            />
          ))}
        </div>

        {/* Backpack Grid: 3 rows x 4 cols */}
        <div className="grid grid-cols-4 gap-1">
          {state.backpack.map((slot, i) => (
            <InventorySlotUI
              key={i}
              slot={slot}
              size="md"
              onClick={() => {
                if (slot.item?.equipSlot) equipItem(i);
              }}
              dragType="backpack"
              dragIndex={i}
              onDragStart={handleBagDragStart}
              onDrop={handleBackpackDrop(i)}
            />
          ))}
        </div>

        {/* Weight Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground shrink-0">
            <Weight size={14} />
            <span>{weight}/{maxWeight}kg</span>
          </div>
          <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-muted">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (weight / maxWeight) * 100)}%`,
                background: weight / maxWeight > 0.8
                  ? 'hsl(var(--destructive))' : 'hsl(var(--accent))',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
