import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Swords, Package, ShoppingCart, Hammer, BarChart3, Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Play', icon: Swords, route: '/' },
  { label: 'Stash', icon: Package, route: '/stash' },
  { label: 'Shop', icon: ShoppingCart, route: '/shop' },
  { label: 'Craft', icon: Hammer, route: '/craft' },
  { label: 'Stats', icon: BarChart3, route: '/stats' },
] as const;

export default function MenuLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="flex w-screen h-screen overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(220 25% 18%), hsl(220 20% 8%))' }}
    >
      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Left Nav Rail */}
      <nav className="relative z-10 flex flex-col items-center gap-2 py-4 px-2 w-16 md:w-20 shrink-0">
        <div className="hud-panel flex flex-col items-center gap-1 py-3 px-1 w-full">
          {navItems.map(({ label, icon: Icon, route }) => {
            const active = location.pathname === route;
            return (
              <button
                key={label}
                onClick={() => navigate(route)}
                className={cn(
                  'flex flex-col items-center gap-0.5 w-full py-2 rounded-lg transition-all duration-200 group',
                  active
                    ? 'bg-primary/15 border border-primary/60'
                    : 'border border-transparent hover:bg-muted/40',
                )}
              >
                <Icon
                  size={22}
                  className={cn(
                    'transition-colors',
                    active ? 'text-primary' : 'text-secondary group-hover:text-primary',
                  )}
                />
                <span
                  className={cn(
                    'font-game text-[8px] md:text-[9px] game-outline leading-tight',
                    active ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content Area */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        {/* Settings top-right */}
        <div className="flex justify-end p-3">
          <button className="hud-panel p-2 hover:border-primary/60 transition-colors">
            <Settings size={20} className="text-secondary" />
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto px-2 md:px-4 pb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
