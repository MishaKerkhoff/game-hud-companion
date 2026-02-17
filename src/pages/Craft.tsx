import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CRAFTING_BENCHES, CraftingBench, CraftRecipe } from '@/data/sample-crafting';
import { ITEMS } from '@/data/sample-items';
import { InventorySlotUI } from '@/components/game/InventorySlotUI';
import { CraftingDetailPopup } from '@/components/game/CraftingDetailPopup';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InventorySlot } from '@/types/game';

const rarityColor: Record<string, string> = {
  common: 'var(--rarity-common)',
  uncommon: 'var(--rarity-uncommon)',
  rare: 'var(--rarity-rare)',
  epic: 'var(--rarity-epic)',
  legendary: 'var(--rarity-legendary)',
};

export default function Craft() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<CraftRecipe | null>(null);

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

  const activeBench = CRAFTING_BENCHES[selectedIndex];

  const recipeSlots: InventorySlot[] = activeBench.recipes.map((r) => {
    const item = ITEMS[r.itemId];
    return { item: item ?? null, count: 1 };
  });

  return (
    <>
      <div className="flex flex-col items-center justify-start h-full gap-4 select-none">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h2 className="font-game text-xl md:text-2xl text-primary game-outline uppercase tracking-wide">
            Craft
          </h2>
          <span className="font-game text-xs text-muted-foreground game-outline">
            {CRAFTING_BENCHES.length} Benches
          </span>
        </div>

        {/* Bench carousel */}
        <div className="relative w-full flex items-center px-1">
          <button onClick={scrollPrev} className="raider-nav-arrow shrink-0">
            <ChevronLeft size={22} />
          </button>

          <div className="overflow-hidden flex-1 mx-1" ref={emblaRef}>
            <div className="flex py-2">
              {CRAFTING_BENCHES.map((bench, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <div key={bench.id} className="min-w-0 px-1" style={{ flex: '0 0 90px' }}>
                    <div onClick={() => emblaApi?.scrollTo(idx)} className="cursor-pointer">
                      <BenchCard bench={bench} isActive={isActive} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={scrollNext} className="raider-nav-arrow shrink-0">
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {CRAFTING_BENCHES.map((_, idx) => (
            <button
              key={idx}
              className={cn('dot-indicator', idx === selectedIndex && 'dot-active')}
              onClick={() => emblaApi?.scrollTo(idx)}
            />
          ))}
        </div>

        {/* Blueprints section */}
        <div className="w-full flex-1 min-h-0 flex flex-col px-2">
          <h3 className="font-game text-xs text-secondary game-outline uppercase tracking-wider mb-2 text-center">
            Blueprints
          </h3>
          <ScrollArea className="flex-1 max-h-[22rem]">
            <div className="grid gap-1 px-1 pb-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(48px, 1fr))' }}>
              {recipeSlots.map((slot, i) => (
                <InventorySlotUI
                  key={`${activeBench.id}-${i}`}
                  slot={slot}
                  size="md"
                  fullWidth
                  onItemClick={() => setSelectedRecipe(activeBench.recipes[i])}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Crafting detail popup */}
      {selectedRecipe && (
        <CraftingDetailPopup
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onCraft={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}

function BenchCard({ bench, isActive }: { bench: CraftingBench; isActive: boolean }) {
  const BenchIcon = icons[bench.icon as keyof typeof icons];
  const rc = rarityColor[bench.rarity];

  return (
    <div
      className={cn(
        'bench-card flex flex-col items-center justify-center gap-0.5 aspect-square transition-all duration-300',
        isActive ? 'scale-105 opacity-100 bench-card-active' : 'scale-90 opacity-50',
      )}
      style={{ '--bench-color': `hsl(${rc})` } as React.CSSProperties}
    >
      <div
        className="w-8 h-8 rounded-lg border-2 flex items-center justify-center slot-base"
        style={{
          borderColor: isActive ? `hsl(${rc})` : undefined,
          boxShadow: isActive ? `0 0 8px hsl(${rc} / 0.4)` : undefined,
        }}
      >
        {BenchIcon && <BenchIcon size={16} style={{ color: `hsl(${rc})` }} />}
      </div>
      <span className="font-game text-[7px] text-foreground game-outline uppercase leading-tight">
        {bench.name}
      </span>
      <span
        className="font-game text-[6px] uppercase tracking-wider px-1 py-0.5 rounded"
        style={{
          background: `hsl(${rc} / 0.2)`,
          color: `hsl(${rc})`,
        }}
      >
        Lv.{bench.level}
      </span>
    </div>
  );
}
