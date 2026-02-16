import { InventorySlot } from '@/types/game';
import { ItemIcon } from './ItemIcon';
import { X, Weight } from 'lucide-react';

interface ItemDetailPopupProps {
  slot: InventorySlot;
  onClose: () => void;
}

const rarityLabel: Record<string, string> = {
  common: 'COMMON',
  uncommon: 'UNCOMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
};

export function ItemDetailPopup({ slot, onClose }: ItemDetailPopupProps) {
  const item = slot.item;
  if (!item) return null;

  const stats = item.stats ? Object.entries(item.stats) : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Panel */}
      <div
        className="relative w-[340px] max-w-[90vw] popup-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Rarity accent bar */}
        <div
          className={`h-2 rounded-t-xl rarity-bar-${item.rarity}`}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-muted border-[3px] border-border flex items-center justify-center hover:border-destructive transition-colors z-10"
        >
          <X size={16} strokeWidth={3} className="text-foreground" />
        </button>

        <div className="p-5 pt-4">
          {/* Header */}
          <div className="mb-1">
            <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-game uppercase tracking-wider rarity-badge-${item.rarity}`}>
              {rarityLabel[item.rarity]}
            </span>
          </div>
          <h2 className="font-game text-lg text-foreground game-outline uppercase leading-tight mb-3">
            {item.name}
          </h2>

          {/* Icon + description */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-xl border-[3px] flex items-center justify-center slot-base rarity-${item.rarity}`}>
              <ItemIcon item={item} size={36} />
            </div>
            <div className="flex-1 min-w-0">
              {item.description && (
                <p className="text-xs text-muted-foreground leading-snug mb-1.5">
                  {item.description}
                </p>
              )}
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold">
                <Weight size={12} />
                <span>{item.weight} kg</span>
              </div>
            </div>
          </div>

          {/* Stat blocks */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {stats.map(([key, value]) => (
                <div key={key} className="stat-block">
                  <span className="stat-label">{key}</span>
                  <span className="stat-value">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer info */}
          <div className="flex items-center justify-between text-[10px] font-game text-muted-foreground game-outline">
            <span className="uppercase">{item.category}</span>
            <span>
              {slot.count}/{item.maxStack}
            </span>
          </div>

          {/* Sell value */}
          {item.sellValue && (
            <div className="mt-3 pt-3 border-t-[2px] border-border flex items-center justify-between">
              <span className="text-[10px] font-game text-muted-foreground game-outline uppercase">Sell Value</span>
              <span className="font-game text-sm text-primary game-outline">{item.sellValue} ¢</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
