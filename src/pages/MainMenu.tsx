import { useNavigate } from 'react-router-dom';
import { Swords } from 'lucide-react';

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1
          className="font-game text-5xl md:text-7xl game-outline"
          style={{
            color: 'hsl(var(--primary))',
            textShadow: '0 0 30px hsl(var(--primary) / 0.4), 0 4px 0 hsl(220 20% 8%)',
          }}
        >
          RAIDER
        </h1>
        <p className="font-game text-sm md:text-base text-muted-foreground game-outline tracking-[0.3em] mt-1">
          SURVIVE · LOOT · CONQUER
        </p>
      </div>

      {/* Play Button */}
      <button
        onClick={() => navigate('/game')}
        className="hud-panel px-8 py-4 flex items-center justify-center gap-3 hover:border-primary transition-all duration-200 group active:scale-[0.97]"
        style={{
          borderColor: 'hsl(var(--primary) / 0.6)',
          boxShadow: '0 0 20px hsl(var(--primary) / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.05)',
        }}
      >
        <Swords size={28} className="text-primary group-hover:scale-110 transition-transform" />
        <span className="font-game text-2xl text-primary game-outline">PLAY</span>
      </button>

      {/* Version */}
      <span className="mt-8 text-xs text-muted-foreground/50 font-game">v0.1 — ALPHA</span>
    </div>
  );
}
