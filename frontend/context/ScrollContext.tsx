"use client";
import { createContext, useContext, useState } from 'react';
import type Lenis from 'lenis';

interface ScrollContextType {
  lenis: Lenis | null;
  setLenis: (lenis: Lenis) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  setLenis: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  return (
    <ScrollContext.Provider value={{ lenis, setLenis }}>
      {children}
    </ScrollContext.Provider>
  );
}
