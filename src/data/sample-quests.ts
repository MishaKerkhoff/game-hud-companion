export interface TraderQuest {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

export const TRADER_QUESTS: Record<string, TraderQuest[]> = {
  gunrunner: [
    { id: 'gr1', title: 'ARMS RACE', description: 'Purchase 10 weapons from Gunrunner.', reward: '500 Credits', progress: 6, maxProgress: 10, completed: false },
    { id: 'gr2', title: 'LEAD STORM', description: 'Use 200 rounds of rifle ammo in raids.', reward: 'Gold Scope', progress: 200, maxProgress: 200, completed: true },
    { id: 'gr3', title: 'BIG BOOM', description: 'Kill 5 enemies with grenades.', reward: '3 Grenades', progress: 2, maxProgress: 5, completed: false },
  ],
  patch: [
    { id: 'pa1', title: 'FIELD MEDIC', description: 'Deliver 5 Medkits to Patch.', reward: '300 Credits', progress: 3, maxProgress: 5, completed: false },
    { id: 'pa2', title: 'STAY HYDRATED', description: 'Use 10 Energy Drinks in raids.', reward: 'Gold Medkit', progress: 10, maxProgress: 10, completed: true },
    { id: 'pa3', title: 'PATCH UP', description: 'Heal 500 HP using bandages.', reward: '5 Medkits', progress: 320, maxProgress: 500, completed: false },
  ],
  scrapper: [
    { id: 'sc1', title: 'SCRAP HEAP', description: 'Scrap 100 Metal worth of items.', reward: '400 Credits', progress: 45, maxProgress: 100, completed: false },
    { id: 'sc2', title: 'JUNKYARD DOG', description: 'Sell 20 items to Scrapper.', reward: 'Rare Weapon Parts', progress: 20, maxProgress: 20, completed: true },
    { id: 'sc3', title: 'CHEMICAL WARFARE', description: 'Collect 30 Chemicals from raids.', reward: '50 Scrap Metal', progress: 12, maxProgress: 30, completed: false },
    { id: 'sc4', title: 'RAG COLLECTOR', description: 'Turn in 80 Cloth.', reward: '200 Credits', progress: 55, maxProgress: 80, completed: false },
  ],
  fortress: [
    { id: 'fo1', title: 'IRON WALL', description: 'Absorb 1000 damage with shields.', reward: 'Epic Shield', progress: 670, maxProgress: 1000, completed: false },
    { id: 'fo2', title: 'PACK RAT', description: 'Extract with a full backpack 3 times.', reward: '500 Credits', progress: 1, maxProgress: 3, completed: false },
  ],
  shadow: [
    { id: 'sh1', title: 'NO QUESTIONS', description: 'Purchase 15 items from Shadow.', reward: '800 Credits', progress: 9, maxProgress: 15, completed: false },
    { id: 'sh2', title: 'DARK DEAL', description: 'Complete 5 raids without dying.', reward: 'Legendary Scope', progress: 5, maxProgress: 5, completed: true },
    { id: 'sh3', title: 'BLACK MARKET', description: 'Sell items worth 2000 total value.', reward: 'Rare Backpack', progress: 1450, maxProgress: 2000, completed: false },
  ],
};
