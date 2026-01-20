"use client";
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  // Higher threshold: Animation triggers when 50% of the section is visible
  // This ensures it happens exactly when the section "snaps" into place.
  threshold = 0.5, 
  rootMargin = '0px', 
  triggerOnce = true,
  delay = 100, // Reduced delay for immediate gratification upon snap
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    const startObserving = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasAnimated(true);
            if (triggerOnce && observer && element) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce && !hasAnimated) {
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
  }, [threshold, rootMargin, triggerOnce, delay, prefersReducedMotion, hasAnimated]);

  return { ref, isInView };
}
