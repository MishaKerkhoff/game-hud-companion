import { useGameState } from '@/hooks/useGameState';
import { RoamingHUD } from '@/components/game/RoamingHUD';
import { ContainerHUD } from '@/components/game/ContainerHUD';
import { BagHUD } from '@/components/game/BagHUD';

const Index = () => {
  const {
    state, setActiveSlot, toggleContainer, toggleBag, closeBag,
    adjustHealth, adjustShield, pickUpItem, dropItem, equipItem, unequipItem,
    swapBackpackSlots, swapHotbarSlots, moveToEquipSlot, moveToBackpackSlot,
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
        swapHotbarSlots={swapHotbarSlots}
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
          totalWeight={totalWeight}
        />
      )}
    </div>
  );
};

export default Index;
