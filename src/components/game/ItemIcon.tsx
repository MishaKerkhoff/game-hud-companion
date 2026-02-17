import { icons } from 'lucide-react';
import { GameItem } from '@/types/game';

interface ItemIconProps {
  item: GameItem;
  size?: number;
}

const rarityColor: Record<string, string> = {
  common: 'hsl(40 18% 82%)',
  uncommon: 'hsl(120 82% 53%)',
  rare: 'hsl(207 27% 47%)',
  epic: 'hsl(330 61% 52%)',
  legendary: 'hsl(30 100% 64%)',
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
