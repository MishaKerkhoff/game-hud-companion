import { InventorySlot } from '@/types/game';
import { ItemIcon } from './ItemIcon';
import { ITEMS } from '@/data/sample-items';
import { CraftRecipe, MOCK_MATERIAL_COUNTS } from '@/data/sample-crafting';
import { X, Weight, Hammer } from 'lucide-react';

const rarityLabel: Record<string, string> = {
  common: 'COMMON',
  uncommon: 'UNCOMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
};

interface CraftingDetailPopupProps {
  recipe: CraftRecipe;
  onClose: () => void;
  onCraft?: () => void;
}

export function CraftingDetailPopup({ recipe, onClose, onCraft }: CraftingDetailPopupProps) {
  const item = ITEMS[recipe.itemId];
  if (!item) return null;

  const stats = item.stats ? Object.entries(item.stats) : [];

  const materials = recipe.materials.map((m) => {
    const matItem = ITEMS[m.itemId];
    const have = MOCK_MATERIAL_COUNTS[m.itemId] ?? 0;
    return { matItem, need: m.count, have, sufficient: have >= m.count };
  });

  const canCraft = materials.every((m) => m.sufficient);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative w-[340px] max-w-[90vw] popup-panel" onClick={(e) => e.stopPropagation()}>
        <div className={`h-2 rounded-t-xl rarity-bar-${item.rarity}`} />

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

          {/* Required Resources */}
          <div className="mb-4">
            <h3 className="font-game text-[10px] text-secondary game-outline uppercase tracking-wider mb-2">
              Required Resources
            </h3>
            <div className="flex flex-col gap-1.5">
              {materials.map((m) => (
                m.matItem && (
                  <div key={m.matItem.id} className="flex items-center gap-2 stat-block py-1.5 px-2">
                    <ItemIcon item={m.matItem} size={18} />
                    <span className="text-xs text-foreground font-bold flex-1">{m.matItem.name}</span>
                    <span className={`font-game text-xs ${m.sufficient ? 'text-accent' : 'text-destructive'}`}>
                      {m.have}/{m.need}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Craft button */}
          <button
            onClick={() => { onCraft?.(); onClose(); }}
            disabled={!canCraft}
            className={`popup-btn popup-btn-craft w-full ${!canCraft ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Hammer size={16} strokeWidth={3} />
            <span>CRAFT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
