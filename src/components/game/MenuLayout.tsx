import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Swords, Package, ShoppingCart, Hammer, User, Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuRailProvider, useMenuRails } from '@/contexts/MenuRailContext';

const navItems = [
  { label: 'Play', icon: Swords, route: '/' },
  { label: 'Stash', icon: Package, route: '/stash' },
  { label: 'Shop', icon: ShoppingCart, route: '/shop' },
  { label: 'Craft', icon: Hammer, route: '/craft' },
  { label: 'Raider', icon: User, route: '/stats' },
] as const;

function GridContent() {
  const { headerContent, rightContent, footerContent } = useMenuRails();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="w-screen h-screen overflow-hidden select-none grid grid-rows-[auto_auto_1fr] grid-cols-[auto_1fr_auto]"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, hsl(216 33% 97%), hsl(216 20% 92%))' }}
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

      {/* Row 1: Header - spans all 3 columns */}
      <div className="relative z-10 col-span-3 flex items-start justify-end px-3 py-2">
        {headerContent}
        <button className="hud-panel p-2 hover:border-primary/60 transition-colors ml-auto">
          <Settings size={20} className="text-secondary" />
        </button>
      </div>

      {/* Row 2, Col 1: Left Nav Rail */}
      <nav className="relative z-10 flex flex-col items-center justify-center gap-2 px-2 w-16 md:w-20 shrink-0">
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
                    'font-game text-[8px] md:text-[9px] leading-tight',
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

      {/* Row 2, Col 2: Center Content */}
      <div className="relative z-20 px-2 md:px-4 min-h-0 overflow-hidden">
        <Outlet />
      </div>

      {/* Row 2, Col 3: Right Rail */}
      <div className="relative z-10 flex flex-col items-center justify-start px-2 shrink-0">
        {rightContent}
      </div>

      {/* Row 3: Footer - spans all 3 columns, pinned to bottom */}
      <div className="relative z-10 col-span-3 px-3 py-2 flex items-end self-end">
        {footerContent}
      </div>
    </div>
  );
}

export default function MenuLayout() {
  return (
    <MenuRailProvider>
      <GridContent />
    </MenuRailProvider>
  );
}
