import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Gift, CheckCircle } from 'lucide-react';
import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TRADERS, Trader } from '@/data/sample-traders';
import { TRADER_QUESTS, TraderQuest } from '@/data/sample-quests';
import { InventorySlotUI } from '@/components/game/InventorySlotUI';
import { ItemDetailPopup } from '@/components/game/ItemDetailPopup';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
        <div className="relative w-full flex items-start flex-1 min-h-0 hud-panel p-2">
          {/* Prev arrow */}
          <button onClick={scrollPrev} className="raider-nav-arrow shrink-0 mt-16">
            <ChevronLeft size={28} />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden flex-1 mx-2 h-full" ref={emblaRef}>
            <div className="flex h-full py-2">
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
        className="h-2 rounded-t-[12px] shrink-0"
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

      {/* Folder-style tabs */}
      <Tabs defaultValue="inventory" className="flex flex-col flex-1 min-h-0">
        <div className="flex mx-3 mt-2 shrink-0">
          <TabsList className="h-auto bg-transparent p-0 w-full">
            <TabsTrigger
              value="inventory"
              className="flex-1 font-game text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-t-lg rounded-b-none border-2 border-b-0 border-border bg-card/30 text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-primary/50 data-[state=active]:shadow-none"
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger
              value="quests"
              className="flex-1 font-game text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-t-lg rounded-b-none border-2 border-b-0 border-border bg-card/30 text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-primary/50 data-[state=active]:shadow-none"
            >
              Quests
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="h-[2px] bg-border/50 mx-3 shrink-0" />

        <TabsContent value="inventory" className="flex-1 min-h-0 mt-0 overflow-hidden">
          <ScrollArea className="h-full max-h-[15.5rem] p-3">
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
        </TabsContent>

        <TabsContent value="quests" className="flex-1 min-h-0 mt-0 overflow-hidden">
          <ScrollArea className="h-full max-h-[15.5rem] p-3">
            <div className="flex flex-col gap-2">
              {(TRADER_QUESTS[trader.id] ?? []).map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
              {!(TRADER_QUESTS[trader.id]?.length) && (
                <p className="font-game text-[10px] text-muted-foreground text-center py-4 uppercase">
                  No quests available
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function QuestCard({ quest }: { quest: TraderQuest }) {
  const pct = Math.round((quest.progress / quest.maxProgress) * 100);

  return (
    <div
      className={cn(
        'border-2 border-border rounded-lg p-2.5 bg-card/50',
        quest.completed && 'opacity-60',
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-game text-[10px] text-foreground uppercase tracking-wide leading-tight">
          {quest.title}
        </h4>
        {quest.completed && <CheckCircle size={14} className="text-green-400 shrink-0" />}
      </div>
      <p className="text-[9px] text-muted-foreground leading-snug mb-2">
        {quest.description}
      </p>
      <div className="flex items-center gap-2 mb-1.5">
        <Progress value={pct} className="h-2 flex-1 bg-border" />
        <span className="font-game text-[9px] text-foreground shrink-0">
          {quest.progress}/{quest.maxProgress}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Gift size={10} className="text-yellow-400" />
        <span className="font-game text-[9px] text-yellow-400 uppercase">
          {quest.reward}
        </span>
      </div>
    </div>
  );
}
