import { useGameState } from '@/hooks/useGameState';
import { RoamingHUD } from '@/components/game/RoamingHUD';
import { ContainerHUD } from '@/components/game/ContainerHUD';
import { BagHUD } from '@/components/game/BagHUD';
import { HotbarHUD } from '@/components/game/HotbarHUD';

const Index = () => {
  const {
    state, setActiveSlot, toggleContainer, toggleBag, closeBag,
    adjustHealth, adjustShield, pickUpItem, dropItem, equipItem, unequipItem,
    swapBackpackSlots, swapHotbarSlots, moveToEquipSlot, moveToBackpackSlot,
    moveContainerToBackpackSlot, moveBackpackToContainerSlot,
    moveContainerToEquipSlot, moveEquipToContainerSlot,
    moveBackpackToHotbar, moveContainerToHotbar, moveHotbarToBackpack, moveHotbarToContainer,
    totalWeight,
  } = useGameState();

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(220 25% 14%), hsl(220 20% 6%))',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Roaming HUD (always visible) */}
      <RoamingHUD
        state={state}
        setActiveSlot={setActiveSlot}
        adjustHealth={adjustHealth}
        adjustShield={adjustShield}
        toggleContainer={toggleContainer}
        toggleBag={toggleBag}
      />

      {/* Bag only (no container) */}
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

      {/* Container + Bag (both open) */}
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

      {/* Hotbar always on top so drag-and-drop works across overlays */}
      <HotbarHUD
        state={state}
        setActiveSlot={setActiveSlot}
        swapHotbarSlots={swapHotbarSlots}
        moveBackpackToHotbar={moveBackpackToHotbar}
        moveContainerToHotbar={moveContainerToHotbar}
      />
    </div>
  );
};

export default Index;
