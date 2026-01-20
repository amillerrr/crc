"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';
import { useScroll } from '@/context/ScrollContext';

export default function SmoothScroll() {
  const { setLenis } = useScroll();

  useEffect(() => {
    // Initialize Lenis for "Luxury" smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenis);

    // FIX: Removed the manual "velocity snapping" logic. 
    // This allows Lenis to handle the physics naturally without 
    // fighting the user's scroll intent.

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [setLenis]);

  return null;
}
