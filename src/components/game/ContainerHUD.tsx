import { GameState, EquipSlot, InventorySlot } from '@/types/game';
import { InventorySlotUI } from './InventorySlotUI';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  X, Package, Sword, Shield, Apple, Boxes, Weight, Crosshair,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ContainerHUDProps {
  state: GameState;
  toggleContainer: () => void;
  pickUpItem: (index: number) => void;
  dropItem: (index: number) => void;
  equipItem: (bpIndex: number) => void;
  unequipItem: (slot: EquipSlot) => void;
  setActiveSlot: (slot: number) => void;
  totalWeight: () => number;
}

const EQUIP_SLOTS: { key: EquipSlot; label: string }[] = [
  { key: 'weapon1', label: 'WPN 1' },
  { key: 'weapon2', label: 'WPN 2' },
  { key: 'head', label: 'HEAD' },
  { key: 'body', label: 'BODY' },
  { key: 'backpack', label: 'PACK' },
  { key: 'accessory', label: 'ACC' },
];

type FilterCategory = 'all' | 'weapon' | 'armor' | 'consumable' | 'ammo' | 'material';

const FILTER_TABS: { key: FilterCategory; icon: typeof Package; label: string }[] = [
  { key: 'all', icon: Boxes, label: 'All' },
  { key: 'weapon', icon: Sword, label: 'Weapons' },
  { key: 'armor', icon: Shield, label: 'Armor' },
  { key: 'consumable', icon: Apple, label: 'Consumables' },
  { key: 'ammo', icon: Crosshair, label: 'Ammo' },
  { key: 'material', icon: Package, label: 'Materials' },
];

export function ContainerHUD({
  state, toggleContainer, pickUpItem, dropItem, equipItem, unequipItem,
  setActiveSlot, totalWeight,
}: ContainerHUDProps) {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<FilterCategory>('all');

  const weight = totalWeight();
  const maxWeight = 49;
  const usedSlots = state.backpack.filter(s => s.item).length;

  const filterSlots = (slots: InventorySlot[]) => {
    if (filter === 'all') return slots;
    return slots.map(s => {
      if (s.item && s.item.category !== filter) return { ...s, _hidden: true } as any;
      return s;
    });
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto">
      <div className="hud-panel w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-3 md:p-5 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border-2 whitespace-nowrap',
                  filter === tab.key
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-muted/30 border-transparent text-muted-foreground hover:border-muted-foreground/30'
                )}
              >
                <tab.icon size={14} />
                {!isMobile && tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
              <Weight size={14} />
              <span>{weight}/{maxWeight}kg</span>
            </div>
            <button onClick={toggleContainer} className="p-1.5 rounded-lg hover:bg-destructive/20 transition-colors">
              <X size={20} className="text-destructive" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className={cn('flex gap-3', isMobile ? 'flex-col' : 'flex-row')}>
          {/* Left: Equipment + Backpack */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Equipment */}
            <div>
              <h3 className="font-game text-sm text-primary mb-2 game-outline">Equipment</h3>
              <div className="grid grid-cols-3 gap-1.5">
                {EQUIP_SLOTS.map(({ key, label }) => (
                  <InventorySlotUI
                    key={key}
                    slot={state.equipment[key]}
                    label={label}
                    size="lg"
                    onClick={() => unequipItem(key)}
                  />
                ))}
              </div>
            </div>

            {/* Backpack */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-game text-sm text-primary game-outline">Backpack</h3>
                <span className="text-xs font-bold text-muted-foreground">{usedSlots}/{state.backpackCapacity}</span>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-6 gap-1">
                {state.backpack.map((slot, i) => {
                  const filtered = filter !== 'all' && slot.item && slot.item.category !== filter;
                  return (
                    <div key={i} className={cn(filtered && 'opacity-30')}>
                      <InventorySlotUI
                        slot={slot}
                        size="sm"
                        onClick={() => {
                          if (slot.item?.equipSlot) equipItem(i);
                          else dropItem(i);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              {/* Weight bar */}
              <div className="mt-2 w-full h-2 rounded-full overflow-hidden bg-muted">
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

          {/* Right: Container Loot */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-game text-sm text-primary game-outline">{state.containerName}</h3>
              <span className="text-xs font-bold text-muted-foreground">
                {state.containerLoot.filter(s => s.item).length}/{state.containerLoot.length}
              </span>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-5 gap-1">
              {state.containerLoot.map((slot, i) => {
                const filtered = filter !== 'all' && slot.item && slot.item.category !== filter;
                return (
                  <div key={i} className={cn(filtered && 'opacity-30')}>
                    <InventorySlotUI
                      slot={slot}
                      size="sm"
                      onClick={() => pickUpItem(i)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom: Hotbar */}
        <div className="flex justify-center pt-1 border-t border-border">
          <div className="flex gap-1 md:gap-1.5 pt-2">
            {state.hotbar.map((slot, i) => (
              <InventorySlotUI
                key={i}
                slot={slot}
                index={i}
                isActive={state.activeHotbarSlot === i}
                showNumber
                size={isMobile ? 'sm' : 'md'}
                onClick={() => setActiveSlot(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
