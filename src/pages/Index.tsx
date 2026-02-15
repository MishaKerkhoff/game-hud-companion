import { useGameState } from '@/hooks/useGameState';
import { RoamingHUD } from '@/components/game/RoamingHUD';
import { ContainerHUD } from '@/components/game/ContainerHUD';

const Index = () => {
  const {
    state, setActiveSlot, toggleContainer, adjustHealth,
    pickUpItem, dropItem, equipItem, unequipItem, totalWeight,
  } = useGameState();

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(220 25% 14%), hsl(220 20% 6%))',
      }}
    >
      {/* Subtle grid pattern for game background */}
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
        toggleContainer={toggleContainer}
      />

      {/* Container HUD (overlay) */}
      {state.isContainerOpen && (
        <ContainerHUD
          state={state}
          toggleContainer={toggleContainer}
          pickUpItem={pickUpItem}
          dropItem={dropItem}
          equipItem={equipItem}
          unequipItem={unequipItem}
          setActiveSlot={setActiveSlot}
          totalWeight={totalWeight}
        />
      )}
    </div>
  );
};

export default Index;
