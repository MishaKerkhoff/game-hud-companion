import { ITEMS } from './sample-items';

export interface CraftRecipe {
  itemId: string;
  materials: { itemId: string; count: number }[];
}

export interface CraftingBench {
  id: string;
  name: string;
  icon: string; // lucide icon name
  level: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  recipes: CraftRecipe[];
}

export const CRAFTING_BENCHES: CraftingBench[] = [
  {
    id: 'weapons',
    name: 'Weapons',
    icon: 'Crosshair',
    level: 2,
    rarity: 'rare',
    recipes: [
      {
        itemId: 'assault_rifle',
        materials: [
          { itemId: 'scrap_metal', count: 12 },
          { itemId: 'weapon_parts', count: 6 },
        ],
      },
      {
        itemId: 'shotgun',
        materials: [
          { itemId: 'scrap_metal', count: 8 },
          { itemId: 'weapon_parts', count: 3 },
        ],
      },
      {
        itemId: 'grenade',
        materials: [
          { itemId: 'scrap_metal', count: 4 },
          { itemId: 'chemicals', count: 3 },
        ],
      },
      {
        itemId: 'scope',
        materials: [
          { itemId: 'scrap_metal', count: 5 },
          { itemId: 'weapon_parts', count: 8 },
        ],
      },
    ],
  },
  {
    id: 'armor',
    name: 'Armor',
    icon: 'Shield',
    level: 1,
    rarity: 'uncommon',
    recipes: [
      {
        itemId: 'shield_item',
        materials: [
          { itemId: 'scrap_metal', count: 8 },
          { itemId: 'cloth', count: 4 },
        ],
      },
      {
        itemId: 'backpack_item',
        materials: [
          { itemId: 'cloth', count: 10 },
          { itemId: 'scrap_metal', count: 3 },
        ],
      },
    ],
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: 'Heart',
    level: 3,
    rarity: 'epic',
    recipes: [
      {
        itemId: 'medkit',
        materials: [
          { itemId: 'cloth', count: 3 },
          { itemId: 'chemicals', count: 2 },
        ],
      },
      {
        itemId: 'bandage',
        materials: [
          { itemId: 'cloth', count: 2 },
        ],
      },
      {
        itemId: 'energy_drink',
        materials: [
          { itemId: 'chemicals', count: 3 },
        ],
      },
    ],
  },
  {
    id: 'ammo',
    name: 'Ammo',
    icon: 'Minus',
    level: 1,
    rarity: 'common',
    recipes: [
      {
        itemId: 'ammo_rifle',
        materials: [
          { itemId: 'scrap_metal', count: 2 },
          { itemId: 'chemicals', count: 1 },
        ],
      },
      {
        itemId: 'ammo_shotgun',
        materials: [
          { itemId: 'scrap_metal', count: 3 },
          { itemId: 'chemicals', count: 1 },
        ],
      },
    ],
  },
];

// Mock "have" counts for materials (simulating player inventory)
export const MOCK_MATERIAL_COUNTS: Record<string, number> = {
  scrap_metal: 15,
  weapon_parts: 4,
  cloth: 7,
  chemicals: 5,
};
