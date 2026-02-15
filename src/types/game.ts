export type ItemCategory = 'weapon' | 'armor' | 'consumable' | 'ammo' | 'material' | 'accessory';
export type EquipSlot = 'weapon1' | 'weapon2' | 'head' | 'body' | 'backpack' | 'accessory';

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
}

export interface InventorySlot {
  item: GameItem | null;
  count: number;
}

export interface GameState {
  health: number;
  maxHealth: number;
  thirst: number;
  energy: number;
  activeHotbarSlot: number;
  hotbar: InventorySlot[];
  backpack: InventorySlot[];
  backpackCapacity: number;
  equipment: Record<EquipSlot, InventorySlot>;
  containerLoot: InventorySlot[];
  containerName: string;
  isContainerOpen: boolean;
  gameTime: number; // seconds
  weather: string;
  stormCountdown: number;
}
