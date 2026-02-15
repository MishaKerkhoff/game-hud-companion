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
}

const sizes = {
  sm: 'w-10 h-10 md:w-12 md:h-12',
  md: 'w-12 h-12 md:w-14 md:h-14',
  lg: 'w-14 h-14 md:w-16 md:h-16',
};

export function InventorySlotUI({
  slot, index, isActive, showNumber, size = 'md', onClick, label,
}: InventorySlotUIProps) {
  const rarity = slot.item?.rarity;

  return (
    <button
      onClick={onClick}
      className={cn(
        'slot-base relative flex items-center justify-center cursor-pointer select-none',
        sizes[size],
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
