import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type RailSlot = 'header' | 'right' | 'footer';

interface MenuRailContextValue {
  headerContent: ReactNode;
  rightContent: ReactNode;
  footerContent: ReactNode;
  setSlot: (slot: RailSlot, content: ReactNode) => void;
}

const MenuRailContext = createContext<MenuRailContextValue | null>(null);

export function MenuRailProvider({ children }: { children: ReactNode }) {
  const [headerContent, setHeader] = useState<ReactNode>(null);
  const [rightContent, setRight] = useState<ReactNode>(null);
  const [footerContent, setFooter] = useState<ReactNode>(null);

  const setSlot = (slot: RailSlot, content: ReactNode) => {
    if (slot === 'header') setHeader(content);
    else if (slot === 'right') setRight(content);
    else if (slot === 'footer') setFooter(content);
  };

  return (
    <MenuRailContext.Provider value={{ headerContent, rightContent, footerContent, setSlot }}>
      {children}
    </MenuRailContext.Provider>
  );
}

export function useMenuRails() {
  const ctx = useContext(MenuRailContext);
  if (!ctx) throw new Error('useMenuRails must be used within MenuRailProvider');
  return ctx;
}

/** Mount content into a rail slot; clears on unmount. */
export function MenuRailSlot({ slot, children }: { slot: RailSlot; children: ReactNode }) {
  const { setSlot } = useMenuRails();

  useEffect(() => {
    setSlot(slot, children);
    return () => setSlot(slot, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, slot]);

  return null;
}
