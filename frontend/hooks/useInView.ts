"use client";
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number; 
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2, 
  // TRIGGER ZONE:
  // -40% margin means the animation triggers when the element's top 
  // crosses the line 40% up from the bottom of the screen.
  // This creates a "Stage Center" reveal effect.
  rootMargin = '0px 0px -40% 0px', 
  triggerOnce = true,
  // MOUNT DELAY:
  // Waits 600ms before checking intersection to prevent "on-load" flashes
  // caused by initial layout shifts or loading states.
  delay = 600, 
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    const startObserving = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce && observer && element) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(element);
    };

    timeoutId = setTimeout(startObserving, delay);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isInView };
}
