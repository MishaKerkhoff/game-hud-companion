import { useState, useCallback } from 'react';
import { InventorySlot, EquipSlot } from '@/types/game';
import {
  ITEMS, emptySlot, createSlot, initialHotbar, initialBackpack, initialEquipment,
} from '@/data/sample-items';

const STASH_SIZE = 48; // 6 columns x 8 rows

function createInitialStash(): InventorySlot[] {
  const stash: InventorySlot[] = [
    createSlot('shotgun'),
    createSlot('medkit', 5),
    createSlot('ammo_rifle', 60),
    createSlot('ammo_shotgun', 30),
    createSlot('energy_drink', 4),
    createSlot('bandage', 10),
    createSlot('grenade', 3),
    createSlot('scope'),
    createSlot('assault_rifle'),
    createSlot('medkit', 3),
    createSlot('ammo_rifle', 45),
    createSlot('ammo_shotgun', 20),
    createSlot('energy_drink', 5),
    createSlot('bandage', 8),
    createSlot('grenade', 4),
    createSlot('scope'),
    createSlot('shotgun'),
    createSlot('shield_item'),
    createSlot('backpack_item'),
    createSlot('medkit', 2),
    createSlot('ammo_rifle', 30),
    createSlot('ammo_shotgun', 15),
    createSlot('energy_drink', 3),
    createSlot('bandage', 6),
    createSlot('grenade', 2),
    createSlot('medkit', 4),
    createSlot('ammo_rifle', 55),
    createSlot('ammo_shotgun', 25),
    createSlot('energy_drink', 1),
    createSlot('bandage', 7),
    createSlot('shotgun'),
    createSlot('assault_rifle'),
    createSlot('scope'),
    createSlot('grenade', 1),
    createSlot('shield_item'),
    createSlot('backpack_item'),
    createSlot('medkit', 5),
    createSlot('ammo_rifle', 40),
    createSlot('ammo_shotgun', 10),
    createSlot('energy_drink', 2),
    createSlot('bandage', 4),
    createSlot('grenade', 3),
    createSlot('assault_rifle'),
    createSlot('shotgun'),
    createSlot('scope'),
    createSlot('shield_item'),
    createSlot('backpack_item'),
  ];
  while (stash.length < STASH_SIZE) stash.push(emptySlot());
  return stash;
}

export function useStashState() {
  const [stash, setStash] = useState<InventorySlot[]>(createInitialStash);
  const [backpack, setBackpack] = useState<InventorySlot[]>(() => [...initialBackpack]);
  const [hotbar, setHotbar] = useState<InventorySlot[]>(() => [...initialHotbar]);
  const [equipment, setEquipment] = useState(() => ({ ...initialEquipment }));

  const stashCount = stash.filter(s => s.item).length;

  const totalWeight = useCallback(() => {
    let w = 0;
    backpack.forEach(s => { if (s.item) w += s.item.weight * s.count; });
    hotbar.forEach(s => { if (s.item) w += s.item.weight * s.count; });
    Object.values(equipment).forEach(s => { if (s.item) w += s.item.weight * s.count; });
    return Math.round(w * 10) / 10;
  }, [backpack, hotbar, equipment]);

  // Generic swap between any two slot arrays
  const moveSlot = (
    fromArr: InventorySlot[], fromIdx: number, setFrom: React.Dispatch<React.SetStateAction<InventorySlot[]>>,
    toArr: InventorySlot[], toIdx: number, setTo: React.Dispatch<React.SetStateAction<InventorySlot[]>>,
  ) => {
    const src = { ...fromArr[fromIdx] };
    const dst = { ...toArr[toIdx] };

    // Stack if same item and stackable
    if (src.item && dst.item && src.item.id === dst.item.id && src.item.stackable) {
      const space = dst.item.maxStack - dst.count;
      const transfer = Math.min(space, src.count);
      if (transfer > 0) {
        const newTo = [...toArr];
        newTo[toIdx] = { ...dst, count: dst.count + transfer };
        setTo(newTo);
        const newFrom = [...fromArr];
        newFrom[fromIdx] = src.count - transfer > 0
          ? { ...src, count: src.count - transfer }
          : emptySlot();
        setFrom(newFrom);
        return;
      }
    }

    // Swap
    if (setFrom === setTo) {
      const arr = [...fromArr];
      arr[fromIdx] = dst;
      arr[toIdx] = src;
      setFrom(arr);
    } else {
      const newFrom = [...fromArr];
      const newTo = [...toArr];
      newFrom[fromIdx] = dst;
      newTo[toIdx] = src;
      setFrom(newFrom);
      setTo(newTo);
    }
  };

  const handleDrop = (targetType: string, targetIndex: number | string, sourceType: string, sourceIndex: number | string) => {
    const getArr = (type: string): [InventorySlot[], React.Dispatch<React.SetStateAction<InventorySlot[]>>] | null => {
      if (type === 'stash') return [stash, setStash];
      if (type === 'backpack') return [backpack, setBackpack];
      if (type === 'hotbar') return [hotbar, setHotbar];
      return null;
    };

    // Equipment drops
    if (targetType === 'equip' && typeof targetIndex === 'string') {
      const slot = targetIndex as EquipSlot;
      const srcInfo = getArr(sourceType);
      if (!srcInfo) return;
      const [srcArr, setSrc] = srcInfo;
      const si = sourceIndex as number;
      const srcSlot = srcArr[si];
      if (!srcSlot.item || srcSlot.item.equipSlot !== slot) return;
      const prev = equipment[slot];
      setEquipment(e => ({ ...e, [slot]: srcSlot }));
      const newSrc = [...srcArr];
      newSrc[si] = prev;
      setSrc(newSrc);
      return;
    }

    if (sourceType === 'equip' && typeof sourceIndex === 'string') {
      const slot = sourceIndex as EquipSlot;
      const dstInfo = getArr(targetType);
      if (!dstInfo) return;
      const [dstArr, setDst] = dstInfo;
      const di = targetIndex as number;
      const prev = equipment[slot];
      if (!prev.item) return;
      const dstSlot = dstArr[di];
      setEquipment(e => ({ ...e, [slot]: dstSlot.item?.equipSlot === slot ? dstSlot : emptySlot() }));
      const newDst = [...dstArr];
      newDst[di] = prev;
      setDst(newDst);
      return;
    }

    const srcInfo = getArr(sourceType);
    const dstInfo = getArr(targetType);
    if (!srcInfo || !dstInfo) return;
    moveSlot(srcInfo[0], sourceIndex as number, srcInfo[1], dstInfo[0], targetIndex as number, dstInfo[1]);
  };

  const storeAll = () => {
    const newStash = [...stash];
    const newBp = [...backpack];
    for (let i = 0; i < newBp.length; i++) {
      if (!newBp[i].item) continue;
      const emptyIdx = newStash.findIndex(s => !s.item);
      if (emptyIdx === -1) break;
      newStash[emptyIdx] = newBp[i];
      newBp[i] = emptySlot();
    }
    setStash(newStash);
    setBackpack(newBp);
  };

  const sortInventory = (arr: InventorySlot[], setter: React.Dispatch<React.SetStateAction<InventorySlot[]>>) => {
    const items = arr.filter(s => s.item);
    items.sort((a, b) => a.item!.category.localeCompare(b.item!.category) || a.item!.name.localeCompare(b.item!.name));
    const sorted = [...items];
    while (sorted.length < arr.length) sorted.push(emptySlot());
    setter(sorted);
  };

  const removeItem = useCallback((type: string, index: number | string) => {
    if (type === 'stash') setStash(s => { const n = [...s]; n[index as number] = emptySlot(); return n; });
    else if (type === 'backpack') setBackpack(s => { const n = [...s]; n[index as number] = emptySlot(); return n; });
    else if (type === 'hotbar') setHotbar(s => { const n = [...s]; n[index as number] = emptySlot(); return n; });
    else if (type === 'equip') setEquipment(e => ({ ...e, [index as string]: emptySlot() }));
  }, []);

  const equipItem = useCallback((sourceType: string, sourceIndex: number) => {
    const getArr = (t: string) => {
      if (t === 'stash') return { arr: stash, set: setStash };
      if (t === 'backpack') return { arr: backpack, set: setBackpack };
      if (t === 'hotbar') return { arr: hotbar, set: setHotbar };
      return null;
    };
    const info = getArr(sourceType);
    if (!info) return;
    const srcSlot = info.arr[sourceIndex];
    if (!srcSlot.item) return;
    const equipSlotKey = srcSlot.item.equipSlot;
    if (equipSlotKey) {
      // Equippable item → swap with equipment slot
      const prev = equipment[equipSlotKey];
      setEquipment(e => ({ ...e, [equipSlotKey]: srcSlot }));
      const newArr = [...info.arr];
      newArr[sourceIndex] = prev;
      info.set(newArr);
    } else {
      // Non-equippable → move to first empty backpack slot
      const emptyIdx = backpack.findIndex(s => !s.item);
      if (emptyIdx === -1) return;
      const newBp = [...backpack];
      newBp[emptyIdx] = srcSlot;
      setBackpack(newBp);
      const newSrc = [...info.arr];
      newSrc[sourceIndex] = emptySlot();
      info.set(newSrc);
    }
  }, [stash, backpack, hotbar, equipment]);

  const unequipItem = useCallback((slot: string) => {
    const equipSlotKey = slot as EquipSlot;
    const eqSlot = equipment[equipSlotKey];
    if (!eqSlot.item) return;
    // Move to first empty stash slot
    const emptyIdx = stash.findIndex(s => !s.item);
    if (emptyIdx === -1) return;
    const newStash = [...stash];
    newStash[emptyIdx] = eqSlot;
    setStash(newStash);
    setEquipment(e => ({ ...e, [equipSlotKey]: emptySlot() }));
  }, [stash, equipment]);

  return {
    stash, backpack, hotbar, equipment,
    stashCount, stashMax: STASH_SIZE,
    totalWeight,
    handleDrop,
    storeAll,
    sortStash: () => sortInventory(stash, setStash),
    sortBackpack: () => sortInventory(backpack, setBackpack),
    removeItem, equipItem, unequipItem,
  };
}
