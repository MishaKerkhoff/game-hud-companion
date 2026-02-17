import { useState, useRef } from 'react';
import { TRADERS, Trader } from '@/data/sample-traders';
import { InventorySlotUI } from '@/components/game/InventorySlotUI';
import { ItemDetailPopup, ItemSource } from '@/components/game/ItemDetailPopup';
import { ItemIcon } from '@/components/game/ItemIcon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { InventorySlot, GameItem } from '@/types/game';
import { icons } from 'lucide-react';

export default function Shop() {
  const [selectedSlot, setSelectedSlot] = useState<InventorySlot | null>(null);

  const handleItemClick = (slot: InventorySlot) => {
    setSelectedSlot(slot);
  };

  const closePopup = () => {
    setSelectedSlot(null);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-game text-sm text-foreground game-outline uppercase">
            Shop <span className="text-muted-foreground">({TRADERS.length} Traders)</span>
          </span>
        </div>

        {/* Trader rows */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-3 pr-2">
            {TRADERS.map((trader) => (
              <TraderRow
                key={trader.id}
                trader={trader}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Item detail popup */}
      {selectedSlot && selectedSlot.item && (
        <ItemDetailPopup
          slot={selectedSlot}
          source={{ type: 'stash', index: 0 }}
          onClose={closePopup}
          onSell={() => closePopup()}
        />
      )}
    </>
  );
}

function TraderRow({ trader, onItemClick }: { trader: Trader; onItemClick: (slot: InventorySlot) => void }) {
  const TraderIcon = icons[trader.icon as keyof typeof icons];

  return (
    <div className="hud-panel p-3">
      <div className="flex items-start gap-3">
        {/* Trader portrait */}
        <div className="flex flex-col items-center shrink-0 w-20">
          <div className={`raider-avatar w-14 h-14 border-[3px] rarity-${trader.rarity}`}>
            {TraderIcon && <TraderIcon size={28} className="text-foreground" strokeWidth={2.5} />}
          </div>
          <span className="font-game text-[10px] text-foreground game-outline mt-1.5 leading-tight text-center">
            {trader.name}
          </span>
          <span className={`text-[8px] font-game uppercase rarity-badge-${trader.rarity} px-1.5 py-0.5 rounded mt-0.5`}>
            {trader.role}
          </span>
        </div>

        {/* Horizontal scrolling items */}
        <div className="flex-1 min-w-0">
          <ScrollArea className="w-full">
            <div className="flex gap-1 pb-2">
              {trader.inventory.map((slot, i) => (
                <div key={i} className="shrink-0">
                  <InventorySlotUI
                    slot={slot}
                    size="md"
                    onItemClick={() => onItemClick(slot)}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
