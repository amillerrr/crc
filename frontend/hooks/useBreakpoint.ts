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
  /** Current viewport width */
  width: number;
}

/**
 * Hook for responsive breakpoint detection
 * @param customMobileBreakpoint - Optional custom breakpoint for mobile (default: 768)
 */
export function useBreakpoint(customMobileBreakpoint?: number): BreakpointState {
  const mobileBreakpoint = customMobileBreakpoint ?? BREAKPOINTS.tablet;
  
  const getBreakpointState = useCallback((): BreakpointState => {
    // Default to mobile for SSR
    if (typeof window === 'undefined') {
      return {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isWide: false,
        currentBreakpoint: 'mobile',
        width: 0,
      };
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
    };
  }, [mobileBreakpoint]);

  const [state, setState] = useState<BreakpointState>(getBreakpointState);

  useEffect(() => {
    // Set initial state on mount
    setState(getBreakpointState());

    // Update on resize
    const handleResize = () => {
      setState(getBreakpointState());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getBreakpointState]);

  return state;
}

/**
 * ============================================
 * USE MEDIA QUERY HOOK
 * ============================================
 * 
 * More flexible hook for custom media queries.
 * 
 * USAGE:
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export default useBreakpoint;
