import { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { GameScene } from '@/components/game/GameScene';
import { RoamingHUD } from '@/components/game/RoamingHUD';
import { ContainerHUD } from '@/components/game/ContainerHUD';
import { BagHUD } from '@/components/game/BagHUD';
import { HotbarHUD } from '@/components/game/HotbarHUD';

const Index = () => {
  const {
    state, setActiveSlot, toggleContainer, toggleBag, closeBag,
    pickUpItem, dropItem, equipItem, unequipItem,
    swapBackpackSlots, swapHotbarSlots, moveToEquipSlot, moveToBackpackSlot,
    moveContainerToBackpackSlot, moveBackpackToContainerSlot,
    moveContainerToEquipSlot, moveEquipToContainerSlot,
    moveBackpackToHotbar, moveContainerToHotbar, moveHotbarToBackpack, moveHotbarToContainer,
    totalWeight,
  } = useGameState();

  const [joystickVector, setJoystickVector] = useState<{ x: number; z: number }>({ x: 0, z: 0 });

  const handleJoystickMove = useCallback((x: number, z: number) => {
    setJoystickVector({ x, z });
  }, []);

  const isPaused = state.isBagOpen || state.isContainerOpen;

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {/* 3D Scene background */}
      <GameScene isPaused={isPaused} joystickVector={joystickVector} />

      {/* HUD overlays */}
      <RoamingHUD
        state={state}
        setActiveSlot={setActiveSlot}
        toggleContainer={toggleContainer}
        toggleBag={toggleBag}
        isOverlayOpen={state.isBagOpen || state.isContainerOpen}
        onJoystickMove={handleJoystickMove}
      />

      {state.isBagOpen && !state.isContainerOpen && (
        <BagHUD
          state={state}
          closeBag={closeBag}
          equipItem={equipItem}
          unequipItem={unequipItem}
          swapBackpackSlots={swapBackpackSlots}
          moveToEquipSlot={moveToEquipSlot}
          moveToBackpackSlot={moveToBackpackSlot}
          moveHotbarToBackpack={moveHotbarToBackpack}
          totalWeight={totalWeight}
        />
      )}

      {state.isContainerOpen && (
        <ContainerHUD
          state={state}
          closeBag={closeBag}
          pickUpItem={pickUpItem}
          dropItem={dropItem}
          equipItem={equipItem}
          unequipItem={unequipItem}
          swapBackpackSlots={swapBackpackSlots}
          moveToEquipSlot={moveToEquipSlot}
          moveToBackpackSlot={moveToBackpackSlot}
          moveContainerToBackpackSlot={moveContainerToBackpackSlot}
          moveBackpackToContainerSlot={moveBackpackToContainerSlot}
          moveContainerToEquipSlot={moveContainerToEquipSlot}
          moveEquipToContainerSlot={moveEquipToContainerSlot}
          moveHotbarToBackpack={moveHotbarToBackpack}
          moveHotbarToContainer={moveHotbarToContainer}
          totalWeight={totalWeight}
        />
      )}

      <HotbarHUD
        state={state}
        setActiveSlot={setActiveSlot}
        swapHotbarSlots={swapHotbarSlots}
        moveBackpackToHotbar={moveBackpackToHotbar}
        moveContainerToHotbar={moveContainerToHotbar}
        moveToEquipSlot={moveToEquipSlot}
        moveContainerToEquipSlot={moveContainerToEquipSlot}
        unequipItem={unequipItem}
      />
    </div>
  );
};

export default Index;
