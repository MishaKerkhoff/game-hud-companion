import { useState } from 'react';
import { InventorySlot } from '@/types/game';
import { ItemIcon } from './ItemIcon';
import { ITEMS } from '@/data/sample-items';
import { X, Weight, ArrowRightLeft, Coins, Recycle, AlertTriangle, Check } from 'lucide-react';

export type ItemSource = {
  type: 'stash' | 'backpack' | 'hotbar' | 'equip';
  index: number | string;
};

interface ItemDetailPopupProps {
  slot: InventorySlot;
  source: ItemSource;
  onClose: () => void;
  onEquip?: () => void;
  onSell?: () => void;
  onRecycle?: () => void;
}

const rarityLabel: Record<string, string> = {
  common: 'COMMON',
  uncommon: 'UNCOMMON',
  rare: 'RARE',
  epic: 'EPIC',
  legendary: 'LEGENDARY',
};

type ConfirmMode = null | 'sell' | 'scrap';

export function ItemDetailPopup({ slot, source, onClose, onEquip, onSell, onRecycle }: ItemDetailPopupProps) {
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);
  const item = slot.item;
  if (!item) return null;

  const stats = item.stats ? Object.entries(item.stats) : [];
  const isEquipped = source.type === 'equip' || source.type === 'hotbar' || source.type === 'backpack';
  const equipLabel = isEquipped ? 'UNEQUIP' : 'EQUIP';
  const scrapResults = item.scrapResult?.map(r => ({
    item: ITEMS[r.itemId],
    count: r.count * slot.count,
  })).filter(r => r.item) ?? [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div
        className="relative w-[340px] max-w-[90vw] popup-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-2 rounded-t-xl rarity-bar-${item.rarity}`} />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30 hover:text-red-400 transition-colors z-10"
        >
          <X size={18} strokeWidth={3} />
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
          <div className="flex items-center justify-between text-[10px] font-game text-muted-foreground game-outline mb-4">
            <span className="uppercase">{item.category}</span>
            <span>{slot.count}/{item.maxStack}</span>
          </div>

          {/* Confirmation overlays */}
          {confirmMode === 'sell' && (
            <SellConfirm
              itemName={item.name}
              count={slot.count}
              sellValue={(item.sellValue ?? 0) * slot.count}
              onConfirm={() => { onSell?.(); onClose(); }}
              onCancel={() => setConfirmMode(null)}
            />
          )}

          {confirmMode === 'scrap' && (
            <ScrapConfirm
              itemName={item.name}
              count={slot.count}
              results={scrapResults}
              onConfirm={() => { onRecycle?.(); onClose(); }}
              onCancel={() => setConfirmMode(null)}
            />
          )}

          {/* Action buttons (hidden during confirm) */}
          {!confirmMode && (
            <div className="flex gap-1.5">
              {onEquip && (
                <button
                  onClick={() => { onEquip(); onClose(); }}
                  className="popup-btn popup-btn-equip flex-1"
                >
                  <ArrowRightLeft size={16} strokeWidth={3} />
                  <span>{equipLabel}</span>
                </button>
              )}
              {onSell && item.sellValue && (
                <button
                  onClick={() => setConfirmMode('sell')}
                  className="popup-btn popup-btn-sell flex-1"
                >
                  <Coins size={16} strokeWidth={3} />
                  <span>{(item.sellValue ?? 0) * slot.count} ¢</span>
                </button>
              )}
              {onRecycle && (
                <button
                  onClick={() => setConfirmMode('scrap')}
                  className="popup-btn popup-btn-recycle flex-1"
                >
                  <Recycle size={16} strokeWidth={3} />
                  <span>SCRAP</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sell Confirmation ── */
function SellConfirm({
  itemName, count, sellValue, onConfirm, onCancel,
}: {
  itemName: string; count: number; sellValue: number;
  onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="confirm-box confirm-box-sell">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} strokeWidth={3} className="text-primary" />
        <span className="font-game text-xs text-foreground game-outline uppercase">Sell Item?</span>
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">
        Sell <span className="text-foreground font-bold">{count}x {itemName}</span> for{' '}
        <span className="text-primary font-bold">{sellValue} ¢</span>?
      </p>
      <div className="flex gap-1.5">
        <button onClick={onCancel} className="popup-btn popup-btn-cancel flex-1">
          <X size={14} strokeWidth={3} />
          <span>CANCEL</span>
        </button>
        <button onClick={onConfirm} className="popup-btn popup-btn-sell flex-1">
          <Check size={14} strokeWidth={3} />
          <span>SELL</span>
        </button>
      </div>
    </div>
  );
}

/* ── Scrap Confirmation ── */
function ScrapConfirm({
  itemName, count, results, onConfirm, onCancel,
}: {
  itemName: string; count: number;
  results: { item: typeof ITEMS[string]; count: number }[];
  onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="confirm-box confirm-box-scrap">
      <div className="flex items-center gap-2 mb-2">
        <Recycle size={18} strokeWidth={3} className="text-accent" />
        <span className="font-game text-xs text-foreground game-outline uppercase">Scrap Item?</span>
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">
        Break down <span className="text-foreground font-bold">{count}x {itemName}</span> into:
      </p>

      {/* Scrap results */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {results.map((r) => (
          <div key={r.item.id} className="scrap-result-item">
            <ItemIcon item={r.item} size={16} />
            <span className="font-game text-xs text-foreground game-outline">{r.count}x</span>
            <span className="text-[10px] text-muted-foreground font-bold">{r.item.name}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5">
        <button onClick={onCancel} className="popup-btn popup-btn-cancel flex-1">
          <X size={14} strokeWidth={3} />
          <span>CANCEL</span>
        </button>
        <button onClick={onConfirm} className="popup-btn popup-btn-recycle flex-1">
          <Check size={14} strokeWidth={3} />
          <span>SCRAP</span>
        </button>
      </div>
    </div>
  );
}
