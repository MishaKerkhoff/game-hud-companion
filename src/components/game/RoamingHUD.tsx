import { useEffect } from 'react';
import { GameState, InventorySlot } from '@/types/game';
import { InventorySlotUI } from './InventorySlotUI';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Clock, Cloud, Zap, Settings, Heart, Droplets, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, Swords, Flame, AlertTriangle,
} from 'lucide-react';

interface RoamingHUDProps {
  state: GameState;
  setActiveSlot: (slot: number) => void;
  adjustHealth: (delta: number) => void;
  toggleContainer: () => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function RoamingHUD({ state, setActiveSlot, adjustHealth, toggleContainer }: RoamingHUDProps) {
  const isMobile = useIsMobile();

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 8) setActiveSlot(num - 1);
      if (e.key === 'e' || e.key === 'E') toggleContainer();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setActiveSlot, toggleContainer]);

  const healthPercent = (state.health / state.maxHealth) * 100;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top-Left: Status */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5 pointer-events-auto flex flex-col gap-2">
        <div className="hud-panel px-3 py-2 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          <span className="font-game text-lg text-primary game-outline">
            {formatTime(state.gameTime)}
          </span>
        </div>
        <div className="hud-panel px-3 py-1.5 flex items-center gap-2">
          <Cloud size={16} className="text-secondary" />
          <span className="font-bold text-sm text-foreground">{state.weather}</span>
        </div>
        <div className="hud-panel px-3 py-1.5 flex items-center gap-2">
          <AlertTriangle size={16} style={{ color: 'hsl(var(--storm))' }} />
          <span className="font-bold text-sm" style={{ color: 'hsl(var(--storm))' }}>
            Storm: {formatTime(state.stormCountdown)}
          </span>
        </div>
      </div>

      {/* Top-Right: Settings */}
      <div className="absolute top-3 right-3 md:top-5 md:right-5 pointer-events-auto">
        <button className="hud-panel p-2.5 hover:border-primary transition-colors">
          <Settings size={22} className="text-foreground" />
        </button>
      </div>

      {/* Center: Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-foreground/70 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-foreground/70 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-foreground/70 rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-foreground/70 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-destructive" />
        </div>
      </div>

      {/* Bottom-Left: Player stats */}
      <div className="absolute bottom-20 md:bottom-24 left-3 md:left-5 pointer-events-auto flex flex-col gap-2">
        {/* Health bar */}
        <div className="hud-panel px-3 py-2 w-44 md:w-56">
          <div className="flex items-center gap-2 mb-1">
            <Heart size={16} className="text-destructive fill-destructive" />
            <span className="font-black text-sm text-foreground">{state.health}/{state.maxHealth}</span>
          </div>
          <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: 'hsl(var(--health-bg))' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${healthPercent}%`,
                background: healthPercent > 50
                  ? 'linear-gradient(90deg, hsl(120 70% 40%), hsl(120 70% 55%))'
                  : healthPercent > 25
                  ? 'linear-gradient(90deg, hsl(40 90% 45%), hsl(45 100% 55%))'
                  : 'linear-gradient(90deg, hsl(0 70% 40%), hsl(0 80% 55%))',
                boxShadow: `0 0 8px ${healthPercent > 50 ? 'hsl(120 70% 45% / 0.5)' : healthPercent > 25 ? 'hsl(45 100% 55% / 0.5)' : 'hsl(0 80% 55% / 0.5)'}`,
              }}
            />
          </div>
        </div>

        {/* Thirst & Energy */}
        <div className="flex gap-2">
          <div className="hud-panel p-2 flex items-center gap-1.5">
            <Droplets size={16} style={{ color: 'hsl(var(--thirst))' }} />
            <span className="font-black text-xs text-foreground">{state.thirst}%</span>
          </div>
          <div className="hud-panel p-2 flex items-center gap-1.5">
            <Zap size={16} style={{ color: 'hsl(var(--energy))' }} />
            <span className="font-black text-xs text-foreground">{state.energy}%</span>
          </div>
        </div>

        {/* Demo: health buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => adjustHealth(-10)}
            className="hud-panel px-2 py-1 text-xs font-bold text-destructive hover:border-destructive transition-colors"
          >
            -10 HP
          </button>
          <button
            onClick={() => adjustHealth(10)}
            className="hud-panel px-2 py-1 text-xs font-bold text-accent hover:border-accent transition-colors"
          >
            +10 HP
          </button>
        </div>
      </div>

      {/* Bottom-Center: Hotbar */}
      <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="hud-panel px-2 py-2 flex gap-1 md:gap-1.5">
          {state.hotbar.map((slot, i) => (
            <InventorySlotUI
              key={i}
              slot={slot}
              index={i}
              isActive={state.activeHotbarSlot === i}
              showNumber
              size={isMobile ? 'sm' : 'md'}
              onClick={() => setActiveSlot(i)}
            />
          ))}
        </div>
      </div>

      {/* Container toggle (demo) */}
      <div className="absolute bottom-3 md:bottom-5 right-3 md:right-5 pointer-events-auto">
        <button
          onClick={toggleContainer}
          className="hud-panel px-3 py-2 font-bold text-sm text-primary hover:border-primary transition-colors"
        >
          Open Loot [E]
        </button>
      </div>

      {/* Mobile: Virtual Joystick */}
      {isMobile && (
        <div className="absolute bottom-24 left-5 pointer-events-auto">
          <div className="hud-panel w-28 h-28 flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full bg-muted/50 border-2 border-muted-foreground/30" />
            <button className="absolute top-1 left-1/2 -translate-x-1/2 p-1"><ChevronUp size={20} className="text-foreground" /></button>
            <button className="absolute bottom-1 left-1/2 -translate-x-1/2 p-1"><ChevronDown size={20} className="text-foreground" /></button>
            <button className="absolute left-1 top-1/2 -translate-y-1/2 p-1"><ChevronLeft size={20} className="text-foreground" /></button>
            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1"><ChevronRight size={20} className="text-foreground" /></button>
          </div>
        </div>
      )}

      {/* Mobile: Action Buttons */}
      {isMobile && (
        <div className="absolute bottom-24 right-5 pointer-events-auto flex flex-col gap-2">
          <button className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(var(--destructive))', border: '3px solid hsl(0 60% 40%)', boxShadow: '0 4px 12px hsl(0 80% 55% / 0.4)' }}>
            <Swords size={24} className="text-foreground" />
          </button>
          <button className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(var(--energy))', border: '3px solid hsl(45 80% 40%)', boxShadow: '0 4px 12px hsl(45 100% 55% / 0.4)' }}>
            <Flame size={20} style={{ color: 'hsl(var(--background))' }} />
          </button>
        </div>
      )}
    </div>
  );
}
