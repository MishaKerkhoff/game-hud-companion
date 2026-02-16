import { GameItem, InventorySlot, EquipSlot } from '@/types/game';

export const ITEMS: Record<string, GameItem> = {
  assault_rifle: {
    id: 'assault_rifle', name: 'Assault Rifle', icon: 'Crosshair',
    category: 'weapon', stackable: false, maxStack: 1, weight: 3.5,
    equipSlot: 'weapon', rarity: 'rare',
    description: 'High accuracy service weapon with reliable stopping power.',
    stats: { DMG: 13, 'Fire Rate': 13.5, 'Mag Size': 30, Range: 85 },
    sellValue: 320,
    scrapResult: [{ itemId: 'scrap_metal', count: 5 }, { itemId: 'weapon_parts', count: 2 }],
  },
  shotgun: {
    id: 'shotgun', name: 'Shotgun', icon: 'Target',
    category: 'weapon', stackable: false, maxStack: 1, weight: 4.0,
    equipSlot: 'weapon', rarity: 'uncommon',
    description: 'Devastating at close range. Pump action.',
    stats: { DMG: 42, 'Fire Rate': 3.8, 'Mag Size': 8, Range: 25 },
    sellValue: 240,
    scrapResult: [{ itemId: 'scrap_metal', count: 4 }, { itemId: 'weapon_parts', count: 1 }],
  },
  shield_item: {
    id: 'shield_item', name: 'Tactical Shield', icon: 'Shield',
    category: 'armor', stackable: false, maxStack: 1, weight: 3.0,
    equipSlot: 'shield', rarity: 'rare',
    description: 'Ballistic-rated frontal protection.',
    stats: { 'Shield HP': 75, 'Move Penalty': '-10%' },
    sellValue: 280,
    scrapResult: [{ itemId: 'scrap_metal', count: 3 }, { itemId: 'cloth', count: 2 }],
  },
  backpack_item: {
    id: 'backpack_item', name: 'Military Pack', icon: 'Backpack',
    category: 'armor', stackable: false, maxStack: 1, weight: 0.5,
    equipSlot: 'bag', rarity: 'epic',
    description: 'Extra storage for extended operations.',
    stats: { 'Extra Slots': 4, 'Weight Limit': '+15 kg' },
    sellValue: 450,
    scrapResult: [{ itemId: 'cloth', count: 4 }, { itemId: 'scrap_metal', count: 1 }],
  },
  medkit: {
    id: 'medkit', name: 'Med Kit', icon: 'Heart',
    category: 'consumable', stackable: true, maxStack: 5, weight: 0.5,
    rarity: 'common',
    description: 'Restores health over time.',
    stats: { 'Heal Amount': 75, 'Use Time': '5s' },
    sellValue: 60,
    scrapResult: [{ itemId: 'cloth', count: 1 }],
  },
  bandage: {
    id: 'bandage', name: 'Bandage', icon: 'Cross',
    category: 'consumable', stackable: true, maxStack: 10, weight: 0.2,
    rarity: 'common',
    description: 'Quick patch for minor wounds.',
    stats: { 'Heal Amount': 15, 'Use Time': '2s' },
    sellValue: 15,
    scrapResult: [{ itemId: 'cloth', count: 1 }],
  },
  energy_drink: {
    id: 'energy_drink', name: 'Energy Drink', icon: 'Zap',
    category: 'consumable', stackable: true, maxStack: 5, weight: 0.3,
    rarity: 'uncommon',
    description: 'Boosts movement speed temporarily.',
    stats: { 'Speed Boost': '+20%', Duration: '30s' },
    sellValue: 45,
    scrapResult: [{ itemId: 'chemicals', count: 1 }],
  },
  ammo_rifle: {
    id: 'ammo_rifle', name: 'Rifle Ammo', icon: 'Minus',
    category: 'ammo', stackable: true, maxStack: 60, weight: 0.1,
    rarity: 'common',
    description: '5.56mm standard rounds.',
    stats: { Caliber: '5.56mm' },
    sellValue: 5,
    scrapResult: [{ itemId: 'scrap_metal', count: 1 }],
  },
  ammo_shotgun: {
    id: 'ammo_shotgun', name: 'Shotgun Shells', icon: 'Circle',
    category: 'ammo', stackable: true, maxStack: 30, weight: 0.15,
    rarity: 'common',
    description: '12 gauge buckshot shells.',
    stats: { Caliber: '12ga' },
    sellValue: 8,
    scrapResult: [{ itemId: 'scrap_metal', count: 1 }],
  },
  scope: {
    id: 'scope', name: '4x Scope', icon: 'Eye',
    category: 'accessory', stackable: false, maxStack: 1, weight: 0.3,
    rarity: 'epic',
    description: 'Long range magnification optic.',
    stats: { Zoom: '4x', 'ADS Speed': '-15%' },
    sellValue: 380,
    scrapResult: [{ itemId: 'scrap_metal', count: 2 }, { itemId: 'weapon_parts', count: 3 }],
  },
  grenade: {
    id: 'grenade', name: 'Frag Grenade', icon: 'Bomb',
    category: 'material', stackable: true, maxStack: 4, weight: 0.6,
    rarity: 'rare',
    description: 'Explosive fragmentation device.',
    stats: { DMG: 100, Radius: '8m', 'Fuse Time': '3s' },
    sellValue: 120,
    scrapResult: [{ itemId: 'scrap_metal', count: 2 }, { itemId: 'chemicals', count: 1 }],
  },
  // Scrap materials (not normally in inventory, produced by scrapping)
  scrap_metal: {
    id: 'scrap_metal', name: 'Scrap Metal', icon: 'Wrench',
    category: 'material', stackable: true, maxStack: 99, weight: 0.2,
    rarity: 'common',
    description: 'Raw metal salvage.',
    sellValue: 5,
  },
  weapon_parts: {
    id: 'weapon_parts', name: 'Weapon Parts', icon: 'Cog',
    category: 'material', stackable: true, maxStack: 99, weight: 0.15,
    rarity: 'uncommon',
    description: 'Mechanical weapon components.',
    sellValue: 15,
  },
  cloth: {
    id: 'cloth', name: 'Cloth', icon: 'Shirt',
    category: 'material', stackable: true, maxStack: 99, weight: 0.1,
    rarity: 'common',
    description: 'Fabric scraps.',
    sellValue: 3,
  },
  chemicals: {
    id: 'chemicals', name: 'Chemicals', icon: 'FlaskConical',
    category: 'material', stackable: true, maxStack: 99, weight: 0.15,
    rarity: 'uncommon',
    description: 'Volatile chemical compounds.',
    sellValue: 10,
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
