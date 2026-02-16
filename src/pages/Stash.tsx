import { useState } from 'react';
import { useStashState } from '@/hooks/useStashState';
import { InventorySlotUI } from '@/components/game/InventorySlotUI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { ArrowDownToLine } from 'lucide-react';
import { ItemCategory } from '@/types/game';

const MAX_WEIGHT = 30;

type FilterValue = ItemCategory | 'bag' | 'shield';

const CATEGORIES: { label: string; value: FilterValue }[] = [
  { label: 'Ammo', value: 'ammo' },
  { label: 'Consumables', value: 'consumable' },
  { label: 'Materials', value: 'material' },
  { label: 'Accessories', value: 'accessory' },
  { label: 'Weapons', value: 'weapon' },
  { label: 'Bags', value: 'bag' },
  { label: 'Shields', value: 'shield' },
];

export default function Stash() {
  const {
    stash, backpack, hotbar, equipment,
    stashCount, stashMax,
    totalWeight, handleDrop,
    storeAll, sortStash,
  } = useStashState();

  const [activeCategory, setActiveCategory] = useState<FilterValue | null>(null);

  const weight = totalWeight();
  const weightPct = Math.min((weight / MAX_WEIGHT) * 100, 100);

  const filteredStash = stash.filter(slot => {
    if (!slot.item) return false;
    if (!activeCategory) return true;
    if (activeCategory === 'bag' || activeCategory === 'shield') {
      return slot.item.equipSlot === activeCategory;
    }
    return slot.item.category === activeCategory;
  });

  const makeDrop = (targetType: string, targetIndex: number | string) =>
    (sourceType: string, sourceIndex: number | string) =>
      handleDrop(targetType, targetIndex, sourceType, sourceIndex);

  const noop = () => {};

  return (
    <div className="md:grid md:grid-cols-[1fr_280px] flex flex-col gap-3 items-center justify-center">
      {/* Stash Grid (center/left) */}
      <div className="min-w-0 min-h-0 h-full flex">
        <div className="hud-panel p-3 flex flex-col min-h-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-game text-sm text-foreground game-outline">
              Stash <span className="text-muted-foreground">({stashCount}/{stashMax})</span>
            </span>
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-1 mb-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`hud-panel px-2 py-1 text-[10px] font-game transition-colors flex items-center gap-1 ${
                activeCategory === null ? 'text-primary border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(activeCategory === cat.value ? null : cat.value)}
                className={`hud-panel px-2 py-1 text-[10px] font-game transition-colors flex items-center gap-1 ${
                  activeCategory === cat.value ? 'text-primary border-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1">
            <div
              className="grid grid-cols-6 gap-1"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                try {
                  const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                  const emptyIdx = stash.findIndex(s => !s.item);
                  if (emptyIdx !== -1) {
                    handleDrop('stash', emptyIdx, data.type, data.index);
                  }
                } catch {}
              }}
            >
            {filteredStash.map((slot) => {
              const realIndex = stash.indexOf(slot);
              return (
                <InventorySlotUI
                  key={realIndex}
                  slot={slot}
                  size="md"
                  dragType="stash"
                  dragIndex={realIndex}
                  onDragStart={noop}
                  onDrop={makeDrop('stash', realIndex)}
                />
              );
            })}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right panel: unified equipment + hotbar + backpack */}
      <div className="w-full md:w-auto shrink-0">
        <div className="hud-panel p-3 flex flex-col">
          {/* Equipment */}
          <span className="font-game text-[10px] text-muted-foreground game-outline mb-1 block">Equipment</span>
          <div className="flex gap-1 justify-center">
            {(['weapon', 'bag', 'shield'] as const).map(slot => (
              <InventorySlotUI
                key={slot}
                slot={equipment[slot]}
                size="md"
                isWeaponSlot={slot === 'weapon'}
                label={slot === 'weapon' ? 'WPN' : slot === 'bag' ? 'BAG' : 'SLD'}
                dragType="equip"
                dragIndex={slot}
                onDragStart={noop}
                onDrop={makeDrop('equip', slot)}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-3" />

          {/* Hotbar */}
          <span className="font-game text-[10px] text-muted-foreground game-outline mb-1 block">Hotbar</span>
          <div className="grid grid-cols-4 gap-1">
            {hotbar.map((slot, i) => (
              <InventorySlotUI
                key={i}
                slot={slot}
                index={i + 1}
                showNumber
                size="md"
                dragType="hotbar"
                dragIndex={i}
                onDragStart={noop}
                onDrop={makeDrop('hotbar', i)}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-3" />

          {/* Backpack */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-game text-[10px] text-foreground game-outline">Backpack</span>
            <button
              onClick={storeAll}
              className="hud-panel px-2 py-1 text-[10px] font-game text-secondary hover:text-primary transition-colors flex items-center gap-1"
            >
              <ArrowDownToLine size={12} /> Store All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {backpack.map((slot, i) => (
              <InventorySlotUI
                key={i}
                slot={slot}
                size="md"
                dragType="backpack"
                dragIndex={i}
                onDragStart={noop}
                onDrop={makeDrop('backpack', i)}
              />
            ))}
          </div>

          {/* Weight */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-game text-muted-foreground game-outline">Weight</span>
              <span className="text-[10px] font-game text-foreground game-outline">
                {weight}/{MAX_WEIGHT} kg
              </span>
            </div>
            <Progress value={weightPct} className="h-2 bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
