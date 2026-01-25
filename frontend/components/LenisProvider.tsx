"use client";
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisScrollData {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function useLenisScroll(callback: (data: LenisScrollData) => void) {
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on('scroll', callback);
    return () => lenis.off('scroll', callback);
  }, [lenis, callback]);
}

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,                                            // Elegant, unhurried feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing for luxury
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}

