import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TRADERS, Trader } from '@/data/sample-traders';
import { InventorySlotUI } from '@/components/game/InventorySlotUI';
import { ItemDetailPopup } from '@/components/game/ItemDetailPopup';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InventorySlot } from '@/types/game';

const rarityColor: Record<string, string> = {
  common: 'var(--rarity-common)',
  uncommon: 'var(--rarity-uncommon)',
  rare: 'var(--rarity-rare)',
  epic: 'var(--rarity-epic)',
  legendary: 'var(--rarity-legendary)',
};

export default function Shop() {
  const [selectedSlot, setSelectedSlot] = useState<InventorySlot | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', loop: true });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleItemClick = (slot: InventorySlot) => {
    setSelectedSlot(slot);
  };

  const closePopup = () => {
    setSelectedSlot(null);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start h-full gap-4 select-none">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h2 className="font-game text-xl md:text-2xl text-primary game-outline uppercase tracking-wide">
            Shop
          </h2>
          <span className="font-game text-xs text-muted-foreground game-outline">
            {TRADERS.length} Traders
          </span>
        </div>

        {/* Carousel area */}
        <div className="relative w-full flex items-start flex-1 min-h-0">
          {/* Prev arrow */}
          <button onClick={scrollPrev} className="raider-nav-arrow shrink-0 mt-16">
            <ChevronLeft size={28} />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden flex-1 mx-2 h-full" ref={emblaRef}>
            <div className="flex h-full">
              {TRADERS.map((trader, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <div key={trader.id} className="flex-[0_0_55%] min-w-0 px-2 h-full">
                    <TraderCard
                      trader={trader}
                      isActive={isActive}
                      onItemClick={handleItemClick}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next arrow */}
          <button onClick={scrollNext} className="raider-nav-arrow shrink-0 mt-16">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 pb-2">
          {TRADERS.map((_, idx) => (
            <button
              key={idx}
              className={cn('dot-indicator', idx === selectedIndex && 'dot-active')}
              onClick={() => emblaApi?.scrollTo(idx)}
            />
          ))}
        </div>
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

function TraderCard({
  trader,
  isActive,
  onItemClick,
}: {
  trader: Trader;
  isActive: boolean;
  onItemClick: (slot: InventorySlot) => void;
}) {
  const TraderIcon = icons[trader.icon as keyof typeof icons];
  const rc = rarityColor[trader.rarity];

  return (
    <div
      className={cn(
        'raider-card flex flex-col h-full transition-all duration-200',
        isActive && 'scale-[1.02]',
      )}
    >
      {/* Rarity accent bar */}
      <div
        className="h-2 rounded-t-[12px] -mx-[1px] -mt-[1px] shrink-0"
        style={{ background: `hsl(${rc})` }}
      />

      {/* Trader portrait */}
      <div className="flex flex-col items-center gap-2 p-4 pb-3 shrink-0">
        <div
          className="raider-avatar w-16 h-16"
          style={{
            borderColor: `hsl(${rc})`,
            boxShadow: `0 0 20px hsl(${rc} / 0.3)`,
          }}
        >
          {TraderIcon && <TraderIcon size={32} style={{ color: `hsl(${rc})` }} />}
        </div>
        <div className="text-center">
          <h3 className="font-game text-base text-foreground game-outline leading-tight">
            {trader.name}
          </h3>
          <span className="font-game text-[9px] text-secondary game-outline uppercase tracking-wider">
            {trader.role}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-border/50 mx-3 shrink-0" />

      {/* Scrollable item grid — show 4 rows (12 items) then scroll */}
      <ScrollArea className="flex-1 min-h-0 max-h-[15.5rem] p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {trader.inventory.map((slot, i) => (
            <InventorySlotUI
              key={i}
              slot={slot}
              size="md"
              fullWidth
              onItemClick={() => onItemClick(slot)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
