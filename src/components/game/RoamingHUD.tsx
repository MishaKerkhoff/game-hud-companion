import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameState } from '@/types/game';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Clock, Settings, Heart, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, Swords, Flame, Shield, Backpack, LogOut, Play,
} from 'lucide-react';

interface RoamingHUDProps {
  state: GameState;
  setActiveSlot: (slot: number) => void;
  toggleContainer: () => void;
  toggleBag: () => void;
  isOverlayOpen: boolean;
  onJoystickMove?: (x: number, z: number) => void;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function RoamingHUD({
  state, setActiveSlot, toggleContainer, toggleBag, isOverlayOpen, onJoystickMove,
}: RoamingHUDProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
        return;
      }
      if (isSettingsOpen) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) setActiveSlot(num - 1);
      if (e.key === 'e' || e.key === 'E') toggleContainer();
      if (e.key === 'b' || e.key === 'B') toggleBag();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setActiveSlot, toggleContainer, toggleBag, isSettingsOpen]);

  const healthPercent = (state.health / state.maxHealth) * 100;
  const shieldPercent = (state.shield / state.maxShield) * 100;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top-Left: Map Name + Timer */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 pointer-events-auto flex flex-col gap-1">
        <div className="hud-panel px-3 py-1">
          <span className="font-game text-xs text-muted-foreground game-outline">{state.mapName}</span>
        </div>
        <div className="hud-panel px-3 py-1.5 flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <span className="font-game text-base text-primary game-outline">
            {formatTime(state.gameTime)}
          </span>
        </div>
      </div>

      {/* Top-Center: Health + Shield bars */}
      <div className="absolute top-3 md:top-4 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-1.5">
        <div className="hud-panel px-2 py-1.5 flex items-center gap-2 w-28 md:w-36">
          <Heart size={14} className="text-destructive fill-destructive shrink-0" />
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'hsl(var(--health-bg))' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${healthPercent}%`,
                background: 'linear-gradient(90deg, hsl(0 70% 40%), hsl(0 80% 55%))',
                boxShadow: '0 0 8px hsl(0 80% 55% / 0.5)',
              }}
            />
          </div>
        </div>
        <div className="hud-panel px-2 py-1.5 flex items-center gap-2 w-28 md:w-36">
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'hsl(210 30% 15%)' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${shieldPercent}%`,
                background: 'linear-gradient(90deg, hsl(210 70% 40%), hsl(210 80% 60%))',
                boxShadow: '0 0 8px hsl(210 80% 55% / 0.5)',
              }}
            />
          </div>
          <Shield size={14} className="text-secondary fill-secondary/30 shrink-0" />
        </div>
      </div>

      {/* Top-Right: Settings */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 pointer-events-auto">
        <button onClick={() => setIsSettingsOpen(true)} className="hud-panel p-2 hover:border-primary transition-colors">
          <Settings size={20} className="text-foreground" />
        </button>
      </div>

      {/* Settings Popup */}
      {isSettingsOpen && (
        <div className="absolute inset-0 z-[100] pointer-events-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsSettingsOpen(false)} />
          <div className="hud-panel p-6 flex flex-col items-center gap-4 z-10 min-w-[220px]">
            <h2 className="font-game text-xl text-foreground game-outline">Settings</h2>
            <button
              onClick={() => navigate('/')}
              className="hud-panel w-full px-4 py-2.5 flex items-center justify-center gap-2 hover:border-destructive transition-colors"
              style={{ background: 'hsl(0 60% 20% / 0.5)' }}
            >
              <LogOut size={18} className="text-destructive" />
              <span className="font-game text-sm text-destructive game-outline">Leave Match</span>
            </button>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="hud-panel w-full px-4 py-2.5 flex items-center justify-center gap-2 hover:border-primary transition-colors"
            >
              <Play size={18} className="text-primary" />
              <span className="font-game text-sm text-primary game-outline">Resume</span>
            </button>
          </div>
        </div>
      )}

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

      {/* Right-side buttons - vertically centered, hidden when overlay open */}
      {!isOverlayOpen && (
        <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-4 pointer-events-auto flex flex-col gap-1.5 z-[55]">
          <button onClick={toggleBag} className="hud-panel p-2 hover:border-primary transition-colors">
            <Backpack size={20} className="text-primary" />
          </button>
          <button onClick={toggleContainer} className="hud-panel px-3 py-1.5 font-bold text-sm text-primary hover:border-primary transition-colors">Loot [E]</button>
        </div>
      )}

      {/* Mobile: Virtual Joystick */}
      {isMobile && (
        <div className="absolute bottom-24 left-5 pointer-events-auto">
          <div className="hud-panel w-28 h-28 flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full bg-muted/50 border-2 border-muted-foreground/30" />
            <button className="absolute top-1 left-1/2 -translate-x-1/2 p-1"
              onPointerDown={() => onJoystickMove?.(0, -1)} onPointerUp={() => onJoystickMove?.(0, 0)} onPointerLeave={() => onJoystickMove?.(0, 0)}>
              <ChevronUp size={20} className="text-foreground" />
            </button>
            <button className="absolute bottom-1 left-1/2 -translate-x-1/2 p-1"
              onPointerDown={() => onJoystickMove?.(0, 1)} onPointerUp={() => onJoystickMove?.(0, 0)} onPointerLeave={() => onJoystickMove?.(0, 0)}>
              <ChevronDown size={20} className="text-foreground" />
            </button>
            <button className="absolute left-1 top-1/2 -translate-y-1/2 p-1"
              onPointerDown={() => onJoystickMove?.(-1, 0)} onPointerUp={() => onJoystickMove?.(0, 0)} onPointerLeave={() => onJoystickMove?.(0, 0)}>
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1"
              onPointerDown={() => onJoystickMove?.(1, 0)} onPointerUp={() => onJoystickMove?.(0, 0)} onPointerLeave={() => onJoystickMove?.(0, 0)}>
              <ChevronRight size={20} className="text-foreground" />
            </button>
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
