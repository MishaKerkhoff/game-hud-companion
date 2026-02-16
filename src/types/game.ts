export type ItemCategory = 'weapon' | 'armor' | 'consumable' | 'ammo' | 'material' | 'accessory';
export type EquipSlot = 'weapon' | 'bag' | 'shield';

export interface GameItem {
  id: string;
  name: string;
  icon: string; // lucide icon name
  category: ItemCategory;
  stackable: boolean;
  maxStack: number;
  weight: number;
  equipSlot?: EquipSlot;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description?: string;
  stats?: Record<string, string | number>;
  sellValue?: number;
  scrapResult?: { itemId: string; count: number }[];
}

export interface InventorySlot {
  item: GameItem | null;
  count: number;
}

export interface GameState {
  health: number;
  maxHealth: number;
  shield: number;
  maxShield: number;
  thirst: number;
  energy: number;
  activeHotbarSlot: number;
  hotbar: InventorySlot[]; // 4 item slots (weapon is shared from equipment.weapon)
  backpack: InventorySlot[]; // 12 slots (3x4)
  equipment: Record<EquipSlot, InventorySlot>;
  containerLoot: InventorySlot[];
  containerName: string;
  isContainerOpen: boolean;
  isBagOpen: boolean;
  gameTime: number; // seconds
  mapName: string;
}
