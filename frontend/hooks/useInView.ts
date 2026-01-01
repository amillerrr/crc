"use client";
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number; // Wait time before observation begins
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2, 
  // STAGE CENTER TRIGGER: 
  // -50% margin means the element must cross the CENTER line of the screen before triggering.
  rootMargin = '0px 0px -50% 0px', 
  triggerOnce = true,
  // MOUNT SAFETY:
  // Wait 600ms after load/mount before checking. This ensures no "on-load" flashes.
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

    // Strict delay to prevent load-time false positives
    timeoutId = setTimeout(startObserving, delay);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isInView };
}
