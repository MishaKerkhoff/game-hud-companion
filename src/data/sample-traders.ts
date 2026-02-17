import { InventorySlot } from '@/types/game';
import { createSlot } from './sample-items';

export interface Trader {
  id: string;
  name: string;
  role: string;
  icon: string; // Lucide icon name
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  inventory: InventorySlot[];
}

export const TRADERS: Trader[] = [
  {
    id: 'gunrunner',
    name: 'GUNRUNNER',
    role: 'ARMS DEALER',
    icon: 'Crosshair',
    rarity: 'rare',
    description: 'Heavy firepower at a premium.',
    inventory: [
      createSlot('assault_rifle'),
      createSlot('shotgun'),
      createSlot('scope'),
      createSlot('ammo_rifle', 60),
      createSlot('ammo_shotgun', 30),
      createSlot('ammo_rifle', 60),
      createSlot('ammo_shotgun', 30),
      createSlot('grenade', 4),
    ],
  },
  {
    id: 'patch',
    name: 'PATCH',
    role: 'FIELD MEDIC',
    icon: 'Heart',
    rarity: 'uncommon',
    description: 'Keeps you patched up and moving.',
    inventory: [
      createSlot('medkit', 5),
      createSlot('bandage', 10),
      createSlot('energy_drink', 5),
      createSlot('medkit', 5),
      createSlot('bandage', 10),
      createSlot('energy_drink', 3),
    ],
  },
  {
    id: 'scrapper',
    name: 'SCRAPPER',
    role: 'JUNK TRADER',
    icon: 'Wrench',
    rarity: 'common',
    description: 'One man\'s trash is another man\'s treasure.',
    inventory: [
      createSlot('scrap_metal', 40),
      createSlot('weapon_parts', 20),
      createSlot('cloth', 50),
      createSlot('chemicals', 15),
      createSlot('scrap_metal', 30),
      createSlot('weapon_parts', 10),
      createSlot('cloth', 30),
    ],
  },
  {
    id: 'fortress',
    name: 'FORTRESS',
    role: 'ARMOR SPECIALIST',
    icon: 'Shield',
    rarity: 'epic',
    description: 'Protection for every situation.',
    inventory: [
      createSlot('shield_item'),
      createSlot('backpack_item'),
      createSlot('shield_item'),
      createSlot('backpack_item'),
    ],
  },
  {
    id: 'shadow',
    name: 'SHADOW',
    role: 'BLACK MARKET',
    icon: 'Eye',
    rarity: 'legendary',
    description: 'Rare finds. No questions asked.',
    inventory: [
      createSlot('scope'),
      createSlot('assault_rifle'),
      createSlot('grenade', 4),
      createSlot('scope'),
      createSlot('energy_drink', 5),
      createSlot('shotgun'),
      createSlot('shield_item'),
      createSlot('medkit', 3),
      createSlot('ammo_rifle', 60),
      createSlot('backpack_item'),
      createSlot('chemicals', 10),
      createSlot('weapon_parts', 15),
      createSlot('ammo_shotgun', 30),
      createSlot('bandage', 10),
      createSlot('scrap_metal', 20),
    ],
  },
];
