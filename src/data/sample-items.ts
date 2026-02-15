import { GameItem, InventorySlot, EquipSlot } from '@/types/game';

export const ITEMS: Record<string, GameItem> = {
  assault_rifle: {
    id: 'assault_rifle', name: 'Assault Rifle', icon: 'Crosshair',
    category: 'weapon', stackable: false, maxStack: 1, weight: 3.5,
    equipSlot: 'weapon1', rarity: 'rare',
  },
  shotgun: {
    id: 'shotgun', name: 'Shotgun', icon: 'Target',
    category: 'weapon', stackable: false, maxStack: 1, weight: 4.0,
    equipSlot: 'weapon2', rarity: 'uncommon',
  },
  helmet: {
    id: 'helmet', name: 'Combat Helmet', icon: 'HardHat',
    category: 'armor', stackable: false, maxStack: 1, weight: 1.5,
    equipSlot: 'head', rarity: 'uncommon',
  },
  vest: {
    id: 'vest', name: 'Tactical Vest', icon: 'Shield',
    category: 'armor', stackable: false, maxStack: 1, weight: 3.0,
    equipSlot: 'body', rarity: 'rare',
  },
  backpack_item: {
    id: 'backpack_item', name: 'Military Pack', icon: 'Backpack',
    category: 'armor', stackable: false, maxStack: 1, weight: 0.5,
    equipSlot: 'backpack', rarity: 'epic',
  },
  medkit: {
    id: 'medkit', name: 'Med Kit', icon: 'Heart',
    category: 'consumable', stackable: true, maxStack: 5, weight: 0.5,
    rarity: 'common',
  },
  bandage: {
    id: 'bandage', name: 'Bandage', icon: 'Cross',
    category: 'consumable', stackable: true, maxStack: 10, weight: 0.2,
    rarity: 'common',
  },
  energy_drink: {
    id: 'energy_drink', name: 'Energy Drink', icon: 'Zap',
    category: 'consumable', stackable: true, maxStack: 5, weight: 0.3,
    rarity: 'uncommon',
  },
  ammo_rifle: {
    id: 'ammo_rifle', name: 'Rifle Ammo', icon: 'Minus',
    category: 'ammo', stackable: true, maxStack: 60, weight: 0.1,
    rarity: 'common',
  },
  ammo_shotgun: {
    id: 'ammo_shotgun', name: 'Shotgun Shells', icon: 'Circle',
    category: 'ammo', stackable: true, maxStack: 30, weight: 0.15,
    rarity: 'common',
  },
  scope: {
    id: 'scope', name: '4x Scope', icon: 'Eye',
    category: 'accessory', stackable: false, maxStack: 1, weight: 0.3,
    equipSlot: 'accessory', rarity: 'epic',
  },
  grenade: {
    id: 'grenade', name: 'Frag Grenade', icon: 'Bomb',
    category: 'material', stackable: true, maxStack: 4, weight: 0.6,
    rarity: 'rare',
  },
};

export const emptySlot = (): InventorySlot => ({ item: null, count: 0 });

export const createSlot = (itemId: string, count: number = 1): InventorySlot => ({
  item: ITEMS[itemId],
  count,
});

export const initialHotbar: InventorySlot[] = [
  createSlot('assault_rifle'),
  createSlot('shotgun'),
  createSlot('medkit', 3),
  createSlot('bandage', 5),
  createSlot('grenade', 2),
  emptySlot(),
  emptySlot(),
  emptySlot(),
];

export const initialBackpack: InventorySlot[] = [
  createSlot('ammo_rifle', 30),
  createSlot('ammo_shotgun', 15),
  createSlot('energy_drink', 2),
  createSlot('bandage', 3),
  emptySlot(),
  ...Array(18).fill(null).map(() => emptySlot()),
];

export const initialEquipment: Record<EquipSlot, InventorySlot> = {
  weapon1: createSlot('assault_rifle'),
  weapon2: createSlot('shotgun'),
  head: createSlot('helmet'),
  body: createSlot('vest'),
  backpack: createSlot('backpack_item'),
  accessory: emptySlot(),
};

export const initialContainerLoot: InventorySlot[] = [
  createSlot('medkit', 2),
  createSlot('ammo_rifle', 45),
  createSlot('scope'),
  createSlot('energy_drink', 3),
  createSlot('grenade', 1),
  createSlot('bandage', 8),
  createSlot('ammo_shotgun', 20),
  emptySlot(),
  emptySlot(),
  emptySlot(),
];
