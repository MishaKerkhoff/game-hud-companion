import { useState, useEffect, useCallback } from 'react';
import { GameState, InventorySlot, EquipSlot } from '@/types/game';
import {
  initialHotbar, initialBackpack, initialEquipment,
  initialContainerLoot, emptySlot,
} from '@/data/sample-items';

export function useGameState() {
  const [state, setState] = useState<GameState>({
    health: 75,
    maxHealth: 100,
    shield: 50,
    maxShield: 100,
    thirst: 60,
    energy: 80,
    activeHotbarSlot: 0,
    hotbar: initialHotbar,
    backpack: [...initialBackpack],
    equipment: { ...initialEquipment },
    containerLoot: [...initialContainerLoot],
    containerName: 'Supply Crate',
    isContainerOpen: false,
    isBagOpen: false,
    gameTime: 847,
    mapName: 'Dusty Dunes',
  });

  // Game timer
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        gameTime: prev.gameTime + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const setActiveSlot = useCallback((slot: number) => {
    setState(prev => ({ ...prev, activeHotbarSlot: slot }));
  }, []);

  const toggleContainer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isContainerOpen: !prev.isContainerOpen,
      isBagOpen: !prev.isContainerOpen ? true : prev.isBagOpen,
    }));
  }, []);

  const toggleBag = useCallback(() => {
    setState(prev => ({
      ...prev,
      isBagOpen: !prev.isBagOpen,
      // Close container when bag closes
      isContainerOpen: !prev.isBagOpen ? prev.isContainerOpen : false,
    }));
  }, []);

  const closeBag = useCallback(() => {
    setState(prev => ({ ...prev, isBagOpen: false, isContainerOpen: false }));
  }, []);

  const adjustHealth = useCallback((delta: number) => {
    setState(prev => ({
      ...prev,
      health: Math.max(0, Math.min(prev.maxHealth, prev.health + delta)),
    }));
  }, []);

  const adjustShield = useCallback((delta: number) => {
    setState(prev => ({
      ...prev,
      shield: Math.max(0, Math.min(prev.maxShield, prev.shield + delta)),
    }));
  }, []);

  // Move item from container loot to backpack
  const pickUpItem = useCallback((lootIndex: number) => {
    setState(prev => {
      const loot = [...prev.containerLoot];
      const bp = [...prev.backpack];
      const slot = loot[lootIndex];
      if (!slot.item) return prev;

      const emptyIdx = bp.findIndex(s => !s.item);
      if (emptyIdx === -1) return prev;

      bp[emptyIdx] = { ...slot };
      loot[lootIndex] = emptySlot();
      return { ...prev, containerLoot: loot, backpack: bp };
    });
  }, []);

  // Move item from backpack to container loot
  const dropItem = useCallback((bpIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const loot = [...prev.containerLoot];
      const slot = bp[bpIndex];
      if (!slot.item) return prev;

      const emptyIdx = loot.findIndex(s => !s.item);
      if (emptyIdx === -1) return prev;

      loot[emptyIdx] = { ...slot };
      bp[bpIndex] = emptySlot();
      return { ...prev, backpack: bp, containerLoot: loot };
    });
  }, []);

  // Swap two slots within backpack
  const swapBackpackSlots = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const temp = bp[fromIndex];
      bp[fromIndex] = bp[toIndex];
      bp[toIndex] = temp;
      return { ...prev, backpack: bp };
    });
  }, []);

  // Swap two hotbar slots
  const swapHotbarSlots = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const hb = [...prev.hotbar];
      const temp = hb[fromIndex];
      hb[fromIndex] = hb[toIndex];
      hb[toIndex] = temp;
      return { ...prev, hotbar: hb };
    });
  }, []);

  // Equip item from backpack to equipment slot
  const equipItem = useCallback((bpIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const equip = { ...prev.equipment };
      const slot = bp[bpIndex];
      if (!slot.item || !slot.item.equipSlot) return prev;

      const equipSlot = slot.item.equipSlot;
      const current = equip[equipSlot];

      equip[equipSlot] = { ...slot };
      bp[bpIndex] = current.item ? { ...current } : emptySlot();
      return { ...prev, backpack: bp, equipment: equip };
    });
  }, []);

  // Unequip to backpack
  const unequipItem = useCallback((equipSlotKey: EquipSlot) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const equip = { ...prev.equipment };
      const slot = equip[equipSlotKey];
      if (!slot.item) return prev;

      const emptyIdx = bp.findIndex(s => !s.item);
      if (emptyIdx === -1) return prev;

      bp[emptyIdx] = { ...slot };
      equip[equipSlotKey] = emptySlot();
      return { ...prev, backpack: bp, equipment: equip };
    });
  }, []);

  // Move from backpack to specific equipment slot via drag
  const moveToEquipSlot = useCallback((bpIndex: number, equipSlot: EquipSlot) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const equip = { ...prev.equipment };
      const slot = bp[bpIndex];
      if (!slot.item) return prev;

      const current = equip[equipSlot];
      equip[equipSlot] = { ...slot };
      bp[bpIndex] = current.item ? { ...current } : emptySlot();
      return { ...prev, backpack: bp, equipment: equip };
    });
  }, []);

  // Move from equipment to specific backpack slot via drag
  const moveToBackpackSlot = useCallback((equipSlot: EquipSlot, bpIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const equip = { ...prev.equipment };
      const equipSlotData = equip[equipSlot];
      if (!equipSlotData.item) return prev;

      const bpSlotData = bp[bpIndex];
      bp[bpIndex] = { ...equipSlotData };
      equip[equipSlot] = bpSlotData.item ? { ...bpSlotData } : emptySlot();
      return { ...prev, backpack: bp, equipment: equip };
    });
  }, []);

  // Move from container to specific backpack slot via drag
  const moveContainerToBackpackSlot = useCallback((containerIndex: number, bpIndex: number) => {
    setState(prev => {
      const loot = [...prev.containerLoot];
      const bp = [...prev.backpack];
      const lootSlot = loot[containerIndex];
      if (!lootSlot.item) return prev;

      const bpSlot = bp[bpIndex];
      bp[bpIndex] = { ...lootSlot };
      loot[containerIndex] = bpSlot.item ? { ...bpSlot } : emptySlot();
      return { ...prev, containerLoot: loot, backpack: bp };
    });
  }, []);

  // Move from backpack to specific container slot via drag
  const moveBackpackToContainerSlot = useCallback((bpIndex: number, containerIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const loot = [...prev.containerLoot];
      const bpSlot = bp[bpIndex];
      if (!bpSlot.item) return prev;

      const lootSlot = loot[containerIndex];
      loot[containerIndex] = { ...bpSlot };
      bp[bpIndex] = lootSlot.item ? { ...lootSlot } : emptySlot();
      return { ...prev, backpack: bp, containerLoot: loot };
    });
  }, []);

  // Move from container to equipment slot via drag
  const moveContainerToEquipSlot = useCallback((containerIndex: number, equipSlot: EquipSlot) => {
    setState(prev => {
      const loot = [...prev.containerLoot];
      const equip = { ...prev.equipment };
      const lootSlot = loot[containerIndex];
      if (!lootSlot.item) return prev;

      const current = equip[equipSlot];
      equip[equipSlot] = { ...lootSlot };
      loot[containerIndex] = current.item ? { ...current } : emptySlot();
      return { ...prev, containerLoot: loot, equipment: equip };
    });
  }, []);

  // Move from equipment to container slot via drag
  const moveEquipToContainerSlot = useCallback((equipSlot: EquipSlot, containerIndex: number) => {
    setState(prev => {
      const loot = [...prev.containerLoot];
      const equip = { ...prev.equipment };
      const equipSlotData = equip[equipSlot];
      if (!equipSlotData.item) return prev;

      const lootSlot = loot[containerIndex];
      loot[containerIndex] = { ...equipSlotData };
      equip[equipSlot] = lootSlot.item ? { ...lootSlot } : emptySlot();
      return { ...prev, containerLoot: loot, equipment: equip };
    });
  }, []);

  // Move from backpack to hotbar slot
  const moveBackpackToHotbar = useCallback((bpIndex: number, hotbarIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const hb = [...prev.hotbar];
      const bpSlot = bp[bpIndex];
      if (!bpSlot.item) return prev;
      const hbSlot = hb[hotbarIndex];
      hb[hotbarIndex] = { ...bpSlot };
      bp[bpIndex] = hbSlot.item ? { ...hbSlot } : emptySlot();
      return { ...prev, backpack: bp, hotbar: hb };
    });
  }, []);

  // Move from container to hotbar slot
  const moveContainerToHotbar = useCallback((containerIndex: number, hotbarIndex: number) => {
    setState(prev => {
      const loot = [...prev.containerLoot];
      const hb = [...prev.hotbar];
      const lootSlot = loot[containerIndex];
      if (!lootSlot.item) return prev;
      const hbSlot = hb[hotbarIndex];
      hb[hotbarIndex] = { ...lootSlot };
      loot[containerIndex] = hbSlot.item ? { ...hbSlot } : emptySlot();
      return { ...prev, containerLoot: loot, hotbar: hb };
    });
  }, []);

  // Move from hotbar to backpack slot
  const moveHotbarToBackpack = useCallback((hotbarIndex: number, bpIndex: number) => {
    setState(prev => {
      const hb = [...prev.hotbar];
      const bp = [...prev.backpack];
      const hbSlot = hb[hotbarIndex];
      if (!hbSlot.item) return prev;
      const bpSlot = bp[bpIndex];
      bp[bpIndex] = { ...hbSlot };
      hb[hotbarIndex] = bpSlot.item ? { ...bpSlot } : emptySlot();
      return { ...prev, hotbar: hb, backpack: bp };
    });
  }, []);

  // Move from hotbar to container slot
  const moveHotbarToContainer = useCallback((hotbarIndex: number, containerIndex: number) => {
    setState(prev => {
      const hb = [...prev.hotbar];
      const loot = [...prev.containerLoot];
      const hbSlot = hb[hotbarIndex];
      if (!hbSlot.item) return prev;
      const lootSlot = loot[containerIndex];
      loot[containerIndex] = { ...hbSlot };
      hb[hotbarIndex] = lootSlot.item ? { ...lootSlot } : emptySlot();
      return { ...prev, hotbar: hb, containerLoot: loot };
    });
  }, []);

  const totalWeight = useCallback(() => {
    let w = 0;
    state.backpack.forEach(s => { if (s.item) w += s.item.weight * s.count; });
    state.hotbar.forEach(s => { if (s.item) w += s.item.weight * s.count; });
    Object.values(state.equipment).forEach(s => { if (s.item) w += s.item.weight * s.count; });
    return Math.round(w * 10) / 10;
  }, [state.backpack, state.hotbar, state.equipment]);

  return {
    state,
    setActiveSlot,
    toggleContainer,
    toggleBag,
    closeBag,
    adjustHealth,
    adjustShield,
    pickUpItem,
    dropItem,
    equipItem,
    unequipItem,
    swapBackpackSlots,
    swapHotbarSlots,
    moveToEquipSlot,
    moveToBackpackSlot,
    moveContainerToBackpackSlot,
    moveBackpackToContainerSlot,
    moveContainerToEquipSlot,
    moveEquipToContainerSlot,
    moveBackpackToHotbar,
    moveContainerToHotbar,
    moveHotbarToBackpack,
    moveHotbarToContainer,
    totalWeight,
  };
}
