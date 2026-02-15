import { icons } from 'lucide-react';
import { GameItem } from '@/types/game';

interface ItemIconProps {
  item: GameItem;
  size?: number;
}

const rarityColor: Record<string, string> = {
  common: 'hsl(0 0% 70%)',
  uncommon: 'hsl(120 60% 50%)',
  rare: 'hsl(210 80% 55%)',
  epic: 'hsl(280 70% 60%)',
  legendary: 'hsl(45 100% 55%)',
};

export function ItemIcon({ item, size = 24 }: ItemIconProps) {
  const LucideIcon = icons[item.icon as keyof typeof icons];
  if (!LucideIcon) return null;

  return (
    <LucideIcon
      size={size}
      color={rarityColor[item.rarity] || 'white'}
      strokeWidth={2.5}
    />
  );
}
