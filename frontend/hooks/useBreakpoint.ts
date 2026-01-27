"use client";
import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '@/config/sections.config';

/**
 * ============================================
 * USE BREAKPOINT HOOK
 * ============================================
 * 
 * Custom hook for detecting current viewport breakpoint.
 * Uses the centralized breakpoint values from config.
 * 
 * USAGE:
 * const { isMobile, isTablet, isDesktop, currentBreakpoint } = useBreakpoint();
 * 
 * // Or with custom breakpoint
 * const { isMobile } = useBreakpoint(640); // Custom mobile breakpoint
 * 
 * SSR HYDRATION:
 * This hook handles SSR by defaulting to mobile on the server.
 * The `isHydrated` flag indicates when client-side values are ready.
 * 
 * For critical layout that must match server/client exactly,
 * consider using CSS media queries instead of this JS-based approach.
 */

export type BreakpointName = 'mobile' | 'tablet' | 'desktop' | 'wide';

interface BreakpointState {
  /** True if viewport is below tablet breakpoint (768px by default) */
  isMobile: boolean;
  /** True if viewport is at or above tablet breakpoint */
  isTablet: boolean;
  /** True if viewport is at or above desktop breakpoint */
  isDesktop: boolean;
  /** True if viewport is at or above wide breakpoint */
  isWide: boolean;
  /** Current breakpoint name */
  currentBreakpoint: BreakpointName;
  /** Current viewport width (0 on server) */
  width: number;
  /** True when client-side hydration is complete */
  isHydrated: boolean;
}

// Default state for SSR - assumes mobile for safety
const DEFAULT_STATE: BreakpointState = {
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isWide: false,
  currentBreakpoint: 'mobile',
  width: 0,
  isHydrated: false,
};

/**
 * Hook for responsive breakpoint detection
 * @param customMobileBreakpoint - Optional custom breakpoint for mobile (default: 768)
 */
export function useBreakpoint(customMobileBreakpoint?: number): BreakpointState {
  const mobileBreakpoint = customMobileBreakpoint ?? BREAKPOINTS.tablet;
  
  const getBreakpointState = useCallback((isHydrated: boolean): BreakpointState => {
    // Server-side: return default state
    if (typeof window === 'undefined') {
      return DEFAULT_STATE;
    }

    const width = window.innerWidth;
    const isMobile = width < mobileBreakpoint;
    const isTablet = width >= BREAKPOINTS.tablet;
    const isDesktop = width >= BREAKPOINTS.desktop;
    const isWide = width >= BREAKPOINTS.wide;

    let currentBreakpoint: BreakpointName = 'mobile';
    if (isWide) currentBreakpoint = 'wide';
    else if (isDesktop) currentBreakpoint = 'desktop';
    else if (isTablet) currentBreakpoint = 'tablet';

    return {
      isMobile,
      isTablet,
      isDesktop,
      isWide,
      currentBreakpoint,
      width,
      isHydrated,
    };
  }, [mobileBreakpoint]);

  // Initialize with default state to avoid hydration mismatch
  const [state, setState] = useState<BreakpointState>(DEFAULT_STATE);

  useEffect(() => {
    // Set initial state on mount (client-side only)
    setState(getBreakpointState(true));

    // Update on resize with debouncing for performance
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setState(getBreakpointState(true));
      }, 100); // 100ms debounce
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [getBreakpointState]);

  return state;
}

/**
 * ============================================
 * USE MEDIA QUERY HOOK
 * ============================================
 * 
 * More flexible hook for custom media queries.
 * Uses matchMedia for efficient change detection.
 * 
 * USAGE:
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Create handler
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers support addEventListener
    mediaQuery.addEventListener('change', handler);
    
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * ============================================
 * USE PREFERS REDUCED MOTION HOOK
 * ============================================
 * 
 * Convenience hook for checking reduced motion preference.
 * Use this to disable or simplify animations for accessibility.
 * 
 * USAGE:
 * const prefersReducedMotion = usePrefersReducedMotion();
 * 
 * // In animation config:
 * const duration = prefersReducedMotion ? 0 : 0.5;
 */

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export default useBreakpoint;
