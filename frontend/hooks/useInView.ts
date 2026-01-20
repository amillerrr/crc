"use client";
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  // New: specify if animations should be more dramatic for snap behavior
  snapEnhanced?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2, 
  // TRIGGER ZONE:
  // -40% margin means the animation triggers when the element's top 
  // crosses the line 40% up from the bottom of the screen.
  // For snap containers, this works well as sections snap into view.
  rootMargin = '0px 0px -40% 0px', 
  triggerOnce = true,
  // MOUNT DELAY:
  // Reduced to 300ms for snappier feel with scroll-snap
  delay = 300,
  snapEnhanced = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Memoized check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion preferences
    if (prefersReducedMotion()) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    const startObserving = () => {
      // Find the scroll-snap container as the root
      const snapContainer = document.querySelector('.snap-container');
      
      observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting;
          
          if (isVisible) {
            setIsInView(true);
            setHasAnimated(true);
            
            if (triggerOnce && observer && element) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce && !hasAnimated) {
            // Only reset if we haven't completed the animation yet
            // This prevents flickering on scroll-snap
            setIsInView(false);
          }
        },
        { 
          threshold, 
          rootMargin,
          // Use snap container as root if it exists
          root: snapContainer || null,
        }
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

// Additional hook for staggered animations within a section
export function useStaggeredInView<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  options: UseInViewOptions = {}
) {
  const { ref, isInView } = useInView<T>(options);
  
  // Generate stagger delays for each item
  const getStaggerDelay = useCallback((index: number) => {
    const baseDelay = 100; // ms between each item
    return `${index * baseDelay}ms`;
  }, []);

  // Generate class names for each item
  const getItemClasses = useCallback((
    index: number, 
    hiddenClass = 'reveal-text-hidden',
    visibleClass = 'reveal-text-visible'
  ) => {
    return `${isInView ? visibleClass : hiddenClass}`;
  }, [isInView]);

  return {
    ref,
    isInView,
    getStaggerDelay,
    getItemClasses,
    itemCount,
  };
}
