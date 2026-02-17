import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Crosshair, Shield, HeartPulse, Bomb, Ghost,
  ChevronLeft, ChevronRight, Heart, Swords, Gauge } from
'lucide-react';
import { cn } from '@/lib/utils';
import { sampleRaiders } from '@/data/sample-raiders';
import type { Raider } from '@/types/raider';
import RaiderDetail from '@/components/game/RaiderDetail';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  crosshair: Crosshair, shield: Shield, 'heart-pulse': HeartPulse, bomb: Bomb, ghost: Ghost
};

const rarityColor: Record<string, string> = {
  common: 'var(--rarity-common)',
  uncommon: 'var(--rarity-uncommon)',
  rare: 'var(--rarity-rare)',
  epic: 'var(--rarity-epic)',
  legendary: 'var(--rarity-legendary)'
};

export default function RaiderPage() {
  const [raiders, setRaiders] = useState(sampleRaiders);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detailRaider, setDetailRaider] = useState<Raider | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', loop: true });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {emblaApi.off('select', onSelect);};
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleSelect = (id: string) => {
    setRaiders((prev) => prev.map((r) => ({ ...r, selected: r.id === id })));
  };

  const selectedCount = raiders.filter((r) => r.selected).length;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 select-none">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="font-game text-xl md:text-2xl text-primary game-outline uppercase tracking-wide">
          Raiders
        </h2>
        <span className="font-game text-xs text-muted-foreground game-outline">
          {selectedCount}/{raiders.length}
        </span>
      </div>

      {/* Carousel area */}
      <div className="relative w-full flex items-center">
        {/* Prev arrow */}
        <button
          onClick={scrollPrev}
          className="raider-nav-arrow shrink-0">

          <ChevronLeft size={28} />
        </button>

        {/* Embla viewport */}
        <div className="overflow-hidden flex-1 mx-2" ref={emblaRef}>
          <div className="flex py-6">
            {raiders.map((raider, idx) => {
              const Icon = iconMap[raider.icon] || Crosshair;
              const isActive = idx === selectedIndex;
              const rc = rarityColor[raider.rarity];

              return (
                <div
                  key={raider.id}
                  className="min-w-0 px-2 cursor-pointer"
                  style={{ flex: '0 0 280px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    emblaApi?.scrollTo(idx);
                  }}>

                  <div
                    className={cn(
                      'raider-card cursor-pointer transition-all duration-300',
                      isActive ? 'scale-[1.08] opacity-100' : 'scale-[0.85] opacity-60',
                      raider.selected && 'raider-card-selected'
                    )}
                    onClick={() => setDetailRaider(raider)}>

                    {/* Rarity accent bar */}
                    <div
                      className="h-2 rounded-t-[12px]"
                      style={{ background: `hsl(${rc})` }} />


                    <div className="flex flex-col items-center gap-3 p-5 pt-4">
                      {/* Avatar */}
                      <div
                        className="raider-avatar"
                        style={{
                          borderColor: `hsl(${rc})`,
                          boxShadow: `0 0 20px hsl(${rc} / 0.3)`
                        }}>

                        <Icon size={40} style={{ color: `hsl(${rc})` }} />
                      </div>

                      {/* Name & Role */}
                      <div className="text-center">
                        <h3 className="font-game text-lg text-foreground game-outline leading-tight">
                          {raider.name}
                        </h3>
                        <span className="font-game text-[9px] text-secondary game-outline uppercase tracking-wider">
                          {raider.role}
                        </span>
                      </div>

                      {/* Level + XP bar */}
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="font-game text-[10px] text-muted-foreground game-outline">
                            Lv. {raider.level}
                          </span>
                          <span className="font-game text-[10px] text-muted-foreground game-outline">
                            {raider.xp}/{raider.xpMax}
                          </span>
                        </div>
                        <div className="xp-bar">
                          <div
                            className="xp-bar-fill"
                            style={{
                              width: `${raider.xp / raider.xpMax * 100}%`,
                              background: `hsl(${rc})`
                            }} />

                        </div>
                      </div>

                      {/* Mini stats */}
                      <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="stat-block text-center">
                          <span className="stat-label"><Heart size={10} className="inline mr-0.5" />HP</span>
                          <span className="stat-value text-[8px]">{raider.stats.health}</span>
                        </div>
                        <div className="stat-block text-center">
                          <span className="stat-label"><Swords size={10} className="inline mr-0.5" />ATK</span>
                          <span className="stat-value text-[8px]">{raider.stats.attack}</span>
                        </div>
                        <div className="stat-block text-center">
                          <span className="stat-label"><Gauge size={10} className="inline mr-0.5" />SPD</span>
                          <span className="stat-value text-[8px]">{raider.stats.speed}</span>
                        </div>
                      </div>

                      {/* Select button */}
                      <button
                         className={cn(
                          'popup-btn w-full',
                          raider.selected ? 'popup-btn-sell' : 'popup-btn-cancel'
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(raider.id);
                        }}>

                        {raider.selected ? 'SELECTED' : 'SELECT'}
                      </button>
                    </div>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={scrollNext}
          className="raider-nav-arrow shrink-0">

          <ChevronRight size={28} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {raiders.map((_, idx) =>
        <button
          key={idx}
          className={cn(
            'dot-indicator',
            idx === selectedIndex && 'dot-active'
          )}
          onClick={() => emblaApi?.scrollTo(idx)} />

        )}
      </div>

      {/* Detail overlay */}
      {detailRaider &&
      <RaiderDetail
        raider={detailRaider}
        onClose={() => setDetailRaider(null)} />

      }
    </div>);

}