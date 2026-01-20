"use client";
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScroll } from '@/context/ScrollContext';

export default function SmoothScroll() {
  const { setLenis } = useScroll();
  const isScrollingRef = useRef(false);

  useEffect(() => {
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

    lenis.on('scroll', (e: { velocity: number; scroll: number }) => {
      // 1. If we are already animating to a section, ignore new inputs
      if (isScrollingRef.current) return;

      const vh = window.innerHeight;
      const scroll = e.scroll;
      
      const currentSection = Math.floor(scroll / vh);
      const progress = (scroll % vh) / vh;
      const velocity = e.velocity;

      let target = null;

      // 2. Logic: Snap immediately if threshold is crossed
      // MOVING DOWN: If we are > 10% into the next section
      if (velocity > 0.1 && progress > 0.10) { 
         target = (currentSection + 1) * vh;
      } 
      // MOVING UP: If we are < 90% (meaning we moved 10% up into previous)
      else if (velocity < -0.1 && progress < 0.90) { 
         target = currentSection * vh; 
      }
      
      // 3. Trigger Action
      if (target !== null) {
         isScrollingRef.current = true;
         
         lenis.scrollTo(target, {
            duration: 1.0, // Faster duration for "instant" feel (was 1.5)
            easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart
            lock: true, // User cannot fight the scroll
            onComplete: () => {
              isScrollingRef.current = false;
            }
         });
      }
    });

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
