"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';
import { useScroll } from '@/context/ScrollContext';

export default function SmoothScroll() {
  const { setLenis } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      // We explicitly don't nullify setLenis on unmount to prevent context thrashing,
      // but in a stricter setup you might setLenis(null!) if needed.
    };
  }, [setLenis]);

  return null;
}
