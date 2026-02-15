import { GameState, EquipSlot } from '@/types/game';
import { InventorySlotUI } from './InventorySlotUI';
import { Weight } from 'lucide-react';
import { useState } from 'react';

interface ContainerHUDProps {
  state: GameState;
  closeBag: () => void;
  pickUpItem: (index: number) => void;
  dropItem: (index: number) => void;
  equipItem: (bpIndex: number) => void;
  unequipItem: (slot: EquipSlot) => void;
  swapBackpackSlots: (from: number, to: number) => void;
  moveToEquipSlot: (bpIndex: number, equipSlot: EquipSlot) => void;
  moveToBackpackSlot: (equipSlot: EquipSlot, bpIndex: number) => void;
  moveContainerToBackpackSlot: (containerIndex: number, bpIndex: number) => void;
  moveBackpackToContainerSlot: (bpIndex: number, containerIndex: number) => void;
  moveContainerToEquipSlot: (containerIndex: number, equipSlot: EquipSlot) => void;
  moveEquipToContainerSlot: (equipSlot: EquipSlot, containerIndex: number) => void;
  moveHotbarToBackpack: (hotbarIndex: number, bpIndex: number) => void;
  moveHotbarToContainer: (hotbarIndex: number, containerIndex: number) => void;
  totalWeight: () => number;
}

const EQUIP_SLOTS: { key: EquipSlot; label: string }[] = [
  { key: 'weapon', label: 'WPN' },
  { key: 'bag', label: 'BAG' },
  { key: 'shield', label: 'SLD' },
];

export function ContainerHUD({
  state, closeBag, pickUpItem, dropItem, equipItem, unequipItem,
  swapBackpackSlots, moveToEquipSlot, moveToBackpackSlot,
  moveContainerToBackpackSlot, moveBackpackToContainerSlot,
  moveContainerToEquipSlot, moveEquipToContainerSlot,
  moveHotbarToBackpack, moveHotbarToContainer,
  totalWeight,
}: ContainerHUDProps) {
  const weight = totalWeight();
  const maxWeight = 49;

  const handleBackpackDrop = (bpIndex: number) => (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'backpack') {
      swapBackpackSlots(sourceIndex as number, bpIndex);
    } else if (sourceType === 'equip') {
      moveToBackpackSlot(sourceIndex as EquipSlot, bpIndex);
    } else if (sourceType === 'container') {
      moveContainerToBackpackSlot(sourceIndex as number, bpIndex);
    } else if (sourceType === 'hotbar') {
      moveHotbarToBackpack(sourceIndex as number, bpIndex);
    }
  };

  const handleEquipDrop = (equipSlot: EquipSlot) => (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'backpack') {
      moveToEquipSlot(sourceIndex as number, equipSlot);
    } else if (sourceType === 'container') {
      moveContainerToEquipSlot(sourceIndex as number, equipSlot);
    }
  };

  const handleContainerDrop = (containerIndex: number) => (sourceType: string, sourceIndex: number | string) => {
    if (sourceType === 'backpack') {
      moveBackpackToContainerSlot(sourceIndex as number, containerIndex);
    } else if (sourceType === 'equip') {
      moveEquipToContainerSlot(sourceIndex as EquipSlot, containerIndex);
    } else if (sourceType === 'hotbar') {
      moveHotbarToContainer(sourceIndex as number, containerIndex);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeBag();
  };

  const handleDragStart = (type: string, index: number | string) => {};

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center gap-3 pointer-events-auto"
      onClick={handleBackdropClick}
    >
      {/* Bag Panel */}
      <div className="hud-panel w-[280px] md:w-[320px] p-3 md:p-4 flex flex-col gap-3" onClick={e => e.stopPropagation()}>
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
              onDragStart={handleDragStart}
              onDrop={handleEquipDrop(key)}
            />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-1">
          {state.backpack.map((slot, i) => (
            <InventorySlotUI
              key={i}
              slot={slot}
              size="md"
              onClick={() => {
                if (slot.item?.equipSlot) equipItem(i);
                else if (slot.item) dropItem(i);
              }}
              dragType="backpack"
              dragIndex={i}
              onDragStart={handleDragStart}
              onDrop={handleBackpackDrop(i)}
            />
          ))}
        </div>

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

      {/* Container Panel */}
      <div className="hud-panel w-[240px] md:w-[280px] p-3 md:p-4 flex flex-col gap-3" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-game text-sm text-primary game-outline">{state.containerName}</h3>
          <span className="text-xs font-bold text-muted-foreground">
            {state.containerLoot.filter(s => s.item).length}/{state.containerLoot.length}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {state.containerLoot.map((slot, i) => (
            <InventorySlotUI
              key={i}
              slot={slot}
              size="md"
              onClick={() => pickUpItem(i)}
              dragType="container"
              dragIndex={i}
              onDragStart={handleDragStart}
              onDrop={handleContainerDrop(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
