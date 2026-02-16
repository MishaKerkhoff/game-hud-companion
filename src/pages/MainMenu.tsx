import { useNavigate } from 'react-router-dom';
import {
  Swords, Package, ShoppingCart, Hammer, BarChart3, Settings,
} from 'lucide-react';

const menuItems = [
  { label: 'Play', icon: Swords, route: '/game', accent: true },
  { label: 'Stash', icon: Package, route: null },
  { label: 'Shop', icon: ShoppingCart, route: null },
  { label: 'Craft', icon: Hammer, route: null },
  { label: 'Raider Stats', icon: BarChart3, route: null },
  { label: 'Settings', icon: Settings, route: null },
] as const;

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(220 25% 18%), hsl(220 20% 8%))' }}>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Title */}
      <div className="relative z-10 mb-10 text-center">
        <h1 className="font-game text-5xl md:text-7xl game-outline"
          style={{
            color: 'hsl(var(--primary))',
            textShadow: '0 0 30px hsl(var(--primary) / 0.4), 0 4px 0 hsl(220 20% 8%)',
          }}>
          RAIDER
        </h1>
        <p className="font-game text-sm md:text-base text-muted-foreground game-outline tracking-[0.3em] mt-1">
          SURVIVE · LOOT · CONQUER
        </p>
      </div>

      {/* Menu Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4 w-[320px] md:w-[400px]">
        {/* Play button - full width */}
        <button
          onClick={() => navigate('/game')}
          className="col-span-2 hud-panel px-6 py-4 flex items-center justify-center gap-3 hover:border-primary transition-all duration-200 group active:scale-[0.97]"
          style={{
            borderColor: 'hsl(var(--primary) / 0.6)',
            boxShadow: '0 0 20px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
          }}
        >
          <Swords size={28} className="text-primary group-hover:scale-110 transition-transform" />
          <span className="font-game text-2xl text-primary game-outline">PLAY</span>
        </button>

        {/* Other buttons - 2 per row */}
        {menuItems.slice(1).map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="hud-panel px-3 py-3 md:px-4 md:py-4 flex flex-col items-center gap-2 hover:border-primary/60 transition-all duration-200 group active:scale-[0.97]"
          >
            <Icon size={24} className="text-secondary group-hover:text-primary transition-colors" />
            <span className="font-game text-xs md:text-sm text-foreground game-outline">{label}</span>
          </button>
        ))}
      </div>

      {/* Bottom version tag */}
      <div className="absolute bottom-4 text-center">
        <span className="text-xs text-muted-foreground/50 font-game">v0.1 — ALPHA</span>
      </div>
    </div>
  );
}

