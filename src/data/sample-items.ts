import { GameItem, InventorySlot, EquipSlot } from '@/types/game';

export const ITEMS: Record<string, GameItem> = {
  assault_rifle: {
    id: 'assault_rifle', name: 'Assault Rifle', icon: 'Crosshair',
    category: 'weapon', stackable: false, maxStack: 1, weight: 3.5,
    equipSlot: 'weapon', rarity: 'rare',
    description: 'High accuracy service weapon with reliable stopping power.',
    stats: { DMG: 13, 'Fire Rate': 13.5, 'Mag Size': 30, Range: 85 },
    sellValue: 320,
  },
  shotgun: {
    id: 'shotgun', name: 'Shotgun', icon: 'Target',
    category: 'weapon', stackable: false, maxStack: 1, weight: 4.0,
    equipSlot: 'weapon', rarity: 'uncommon',
    description: 'Devastating at close range. Pump action.',
    stats: { DMG: 42, 'Fire Rate': 3.8, 'Mag Size': 8, Range: 25 },
    sellValue: 240,
  },
  shield_item: {
    id: 'shield_item', name: 'Tactical Shield', icon: 'Shield',
    category: 'armor', stackable: false, maxStack: 1, weight: 3.0,
    equipSlot: 'shield', rarity: 'rare',
    description: 'Ballistic-rated frontal protection.',
    stats: { 'Shield HP': 75, 'Move Penalty': '-10%' },
    sellValue: 280,
  },
  backpack_item: {
    id: 'backpack_item', name: 'Military Pack', icon: 'Backpack',
    category: 'armor', stackable: false, maxStack: 1, weight: 0.5,
    equipSlot: 'bag', rarity: 'epic',
    description: 'Extra storage for extended operations.',
    stats: { 'Extra Slots': 4, 'Weight Limit': '+15 kg' },
    sellValue: 450,
  },
  medkit: {
    id: 'medkit', name: 'Med Kit', icon: 'Heart',
    category: 'consumable', stackable: true, maxStack: 5, weight: 0.5,
    rarity: 'common',
    description: 'Restores health over time.',
    stats: { 'Heal Amount': 75, 'Use Time': '5s' },
    sellValue: 60,
  },
  bandage: {
    id: 'bandage', name: 'Bandage', icon: 'Cross',
    category: 'consumable', stackable: true, maxStack: 10, weight: 0.2,
    rarity: 'common',
    description: 'Quick patch for minor wounds.',
    stats: { 'Heal Amount': 15, 'Use Time': '2s' },
    sellValue: 15,
  },
  energy_drink: {
    id: 'energy_drink', name: 'Energy Drink', icon: 'Zap',
    category: 'consumable', stackable: true, maxStack: 5, weight: 0.3,
    rarity: 'uncommon',
    description: 'Boosts movement speed temporarily.',
    stats: { 'Speed Boost': '+20%', Duration: '30s' },
    sellValue: 45,
  },
  ammo_rifle: {
    id: 'ammo_rifle', name: 'Rifle Ammo', icon: 'Minus',
    category: 'ammo', stackable: true, maxStack: 60, weight: 0.1,
    rarity: 'common',
    description: '5.56mm standard rounds.',
    stats: { Caliber: '5.56mm' },
    sellValue: 5,
  },
  ammo_shotgun: {
    id: 'ammo_shotgun', name: 'Shotgun Shells', icon: 'Circle',
    category: 'ammo', stackable: true, maxStack: 30, weight: 0.15,
    rarity: 'common',
    description: '12 gauge buckshot shells.',
    stats: { Caliber: '12ga' },
    sellValue: 8,
  },
  scope: {
    id: 'scope', name: '4x Scope', icon: 'Eye',
    category: 'accessory', stackable: false, maxStack: 1, weight: 0.3,
    rarity: 'epic',
    description: 'Long range magnification optic.',
    stats: { Zoom: '4x', 'ADS Speed': '-15%' },
    sellValue: 380,
  },
  grenade: {
    id: 'grenade', name: 'Frag Grenade', icon: 'Bomb',
    category: 'material', stackable: true, maxStack: 4, weight: 0.6,
    rarity: 'rare',
    description: 'Explosive fragmentation device.',
    stats: { DMG: 100, Radius: '8m', 'Fuse Time': '3s' },
    sellValue: 120,
  },
};

export const emptySlot = (): InventorySlot => ({ item: null, count: 0 });

export const createSlot = (itemId: string, count: number = 1): InventorySlot => ({
  item: ITEMS[itemId],
  count,
});

// 4 item slots (weapon displayed from equipment.weapon)
export const initialHotbar: InventorySlot[] = [
  createSlot('medkit', 3),
  createSlot('bandage', 5),
  createSlot('grenade', 2),
  emptySlot(),
];

export const initialBackpack: InventorySlot[] = [
  createSlot('ammo_rifle', 30),
  createSlot('ammo_shotgun', 15),
  createSlot('energy_drink', 2),
  createSlot('bandage', 3),
  emptySlot(),
  emptySlot(),
  emptySlot(),
  emptySlot(),
  emptySlot(),
  emptySlot(),
  emptySlot(),
  emptySlot(),
];

export const initialEquipment: Record<EquipSlot, InventorySlot> = {
  weapon: createSlot('assault_rifle'),
  bag: createSlot('backpack_item'),
  shield: createSlot('shield_item'),
};

export const initialContainerLoot: InventorySlot[] = [
  createSlot('medkit', 2),
  createSlot('ammo_rifle', 45),
  createSlot('scope'),
  createSlot('energy_drink', 3),
  createSlot('grenade', 1),
  createSlot('bandage', 8),
];
