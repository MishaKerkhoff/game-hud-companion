import { InventorySlot } from '@/types/game';
import { ItemIcon } from './ItemIcon';
import { cn } from '@/lib/utils';

interface InventorySlotUIProps {
  slot: InventorySlot;
  index?: number;
  isActive?: boolean;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  label?: string;
  isWeaponSlot?: boolean;
  dragType?: string;
  dragIndex?: number | string;
  onDragStart?: (type: string, index: number | string) => void;
  onDrop?: (type: string, index: number | string) => void;
}

const sizes = {
  sm: 'h-10 md:h-12',
  md: 'h-12 md:h-14',
  lg: 'h-14 md:h-16',
};

const widths = {
  sm: 'w-10 md:w-12',
  md: 'w-12 md:w-14',
  lg: 'w-14 md:w-16',
};

const weaponWidths = {
  sm: 'w-20 md:w-24',
  md: 'w-24 md:w-28',
  lg: 'w-14 md:w-16',
};

export function InventorySlotUI({
  slot, index, isActive, showNumber, size = 'md', onClick, label,
  isWeaponSlot, dragType, dragIndex, onDragStart, onDrop,
}: InventorySlotUIProps) {
  const rarity = slot.item?.rarity;

  const handleDragStart = (e: React.DragEvent) => {
    if (!slot.item || !dragType || dragIndex === undefined || !onDragStart) return;
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: dragType, index: dragIndex }));
    onDragStart(dragType, dragIndex);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!onDrop || dragIndex === undefined) return;
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    onDrop(data.type, data.index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <button
      onClick={onClick}
      draggable={!!slot.item && !!dragType}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        'slot-base relative flex items-center justify-center cursor-pointer select-none',
        sizes[size],
        isWeaponSlot ? weaponWidths[size] : widths[size],
        isActive && 'slot-active',
        rarity && `rarity-${rarity}`,
      )}
      title={slot.item?.name || (label ?? 'Empty')}
    >
      {slot.item && (
        <>
          <ItemIcon item={slot.item} size={size === 'sm' ? 18 : size === 'lg' ? 28 : 22} />
          {slot.count > 1 && (
            <span className="absolute bottom-0.5 right-1 text-[10px] font-black text-foreground game-outline">
              {slot.count}
            </span>
          )}
        </>
      )}
      {showNumber && index !== undefined && (
        <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-muted text-[9px] font-black flex items-center justify-center text-muted-foreground">
          {index + 1}
        </span>
      )}
      {label && !slot.item && (
        <span className="text-[8px] text-muted-foreground font-bold uppercase leading-tight text-center">
          {label}
        </span>
      )}
    </button>
  );
}
