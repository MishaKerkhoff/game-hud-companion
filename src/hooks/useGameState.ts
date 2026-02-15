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
    thirst: 60,
    energy: 80,
    activeHotbarSlot: 0,
    hotbar: initialHotbar,
    backpack: [...initialBackpack],
    backpackCapacity: 23,
    equipment: { ...initialEquipment },
    containerLoot: [...initialContainerLoot],
    containerName: 'Supply Crate',
    isContainerOpen: false,
    gameTime: 847, // seconds (14:07)
    weather: 'Night',
    stormCountdown: 120,
  });

  // Game timer
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        gameTime: prev.gameTime + 1,
        stormCountdown: Math.max(0, prev.stormCountdown - 1),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const setActiveSlot = useCallback((slot: number) => {
    setState(prev => ({ ...prev, activeHotbarSlot: slot }));
  }, []);

  const toggleContainer = useCallback(() => {
    setState(prev => ({ ...prev, isContainerOpen: !prev.isContainerOpen }));
  }, []);

  const adjustHealth = useCallback((delta: number) => {
    setState(prev => ({
      ...prev,
      health: Math.max(0, Math.min(prev.maxHealth, prev.health + delta)),
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
      if (emptyIdx === -1) return prev; // backpack full

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

  // Equip item from backpack
  const equipItem = useCallback((bpIndex: number) => {
    setState(prev => {
      const bp = [...prev.backpack];
      const equip = { ...prev.equipment };
      const slot = bp[bpIndex];
      if (!slot.item || !slot.item.equipSlot) return prev;

      const equipSlot = slot.item.equipSlot;
      const current = equip[equipSlot];

      // Swap
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

  const totalWeight = useCallback(() => {
    let w = 0;
    state.backpack.forEach(s => { if (s.item) w += s.item.weight * s.count; });
    Object.values(state.equipment).forEach(s => { if (s.item) w += s.item.weight * s.count; });
    return Math.round(w * 10) / 10;
  }, [state.backpack, state.equipment]);

  return {
    state,
    setActiveSlot,
    toggleContainer,
    adjustHealth,
    pickUpItem,
    dropItem,
    equipItem,
    unequipItem,
    totalWeight,
  };
}
