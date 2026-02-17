export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Skill {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  unlocked: boolean;
  level: number; // required raider level to unlock
}

export interface Raider {
  id: string;
  name: string;
  role: string;
  icon: string; // Lucide icon name
  rarity: Rarity;
  level: number;
  xp: number;
  xpMax: number;
  description: string;
  stats: {
    health: number;
    attack: string;
    super: string;
    speed: number;
    defense: number;
  };
  skills: Skill[];
  selected: boolean;
}
