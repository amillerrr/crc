"use client";
import { useState, useEffect, useCallback } from 'react';
import { 
  headerConfig, 
  introLoaderConfig, 
  remToPx,
  LOGO_ASPECT_RATIO,
  FINAL_LOGO_WIDTH 
} from '@/config/sections.config';

/**
 * ============================================
 * USE LOGO ANIMATION HOOK
 * ============================================
 * 
 * Calculates precise logo animation values to ensure the IntroLoader
 * logo lands exactly where the Header logo will be positioned.
 * 
 * This solves the viewport-dependent positioning issue by calculating
 * pixel-perfect values based on actual viewport dimensions.
 * 
 * THE PROBLEM:
 * Using vh units for logoEndY creates inconsistent positioning because:
 * - Header logo position is fixed in pixels from the top
 * - vh varies with viewport height
 * - A 900px tall viewport and 1200px tall viewport need different Y values
 * 
 * THE SOLUTION:
 * Calculate the exact pixel offset needed to move from viewport center
 * to the header logo center position.
 * 
 * CALCULATION:
 * 1. Header logo center Y = headerPaddingTop + (logoHeight / 2)
 * 2. Viewport center Y = viewportHeight / 2
 * 3. endY = headerLogoCenterY - viewportCenterY (negative = move up)
 * 
 * USAGE:
 * const { endY, endScale, isReady } = useLogoAnimation(isMobile);
 * 
 * // In framer-motion animate prop:
 * animate={{ y: endY, scale: endScale }}
 */

interface LogoAnimationValues {
  /** Y translation to reach header position (in pixels, negative = up) */
  endY: number;
  /** Scale to match header logo size */
  endScale: number;
  /** Whether calculations are ready (client-side only) */
  isReady: boolean;
}

/**
 * Calculate initial fallback endY based on common viewport heights
 * These are used during SSR and initial render before client calculation
 */
function getInitialEndY(isMobile: boolean): number {
  // Estimate for common viewport heights
  // Mobile: ~700px viewport, header padding 12px, logo height ~57px
  // Desktop: ~900px viewport, header padding 8px, logo height ~57px
  const estimatedViewportCenter = isMobile ? 350 : 450;
  const headerPadding = isMobile ? 12 : 8;
  const logoHeight = FINAL_LOGO_WIDTH * LOGO_ASPECT_RATIO;
  const headerLogoCenter = headerPadding + (logoHeight / 2);
  return headerLogoCenter - estimatedViewportCenter;
}

export function useLogoAnimation(isMobile: boolean): LogoAnimationValues {
  const introConfig = isMobile ? introLoaderConfig.mobile : introLoaderConfig.desktop;
  
  const [values, setValues] = useState<LogoAnimationValues>({
    endY: getInitialEndY(isMobile),
    endScale: introConfig.logoEndScale,
    isReady: false,
  });

  const calculatePositions = useCallback(() => {
    if (typeof window === 'undefined') return;

    const viewportHeight = window.innerHeight;
    const hConfig = isMobile ? headerConfig.mobile : headerConfig.desktop;
    const iConfig = isMobile ? introLoaderConfig.mobile : introLoaderConfig.desktop;
    
    // Header padding in pixels (convert from rem)
    const headerPaddingPx = remToPx(hConfig.paddingY);
    
    // Final logo dimensions after scaling
    const finalLogoHeight = FINAL_LOGO_WIDTH * LOGO_ASPECT_RATIO;
    
    // Header logo center position from top of viewport
    // Header layout: paddingY + logo + paddingY (flexbox centered)
    // So logo center = paddingY + (logoHeight / 2)
    const headerLogoCenterY = headerPaddingPx + (finalLogoHeight / 2);
    
    // IntroLoader logo starts in a centered flex container
    // Its natural position (y=0) is at viewport vertical center
    const viewportCenterY = viewportHeight / 2;
    
    // Calculate Y translation needed to move from center to header position
    // Negative value = move up
    const endY = headerLogoCenterY - viewportCenterY;
    
    setValues({
      endY,
      endScale: iConfig.logoEndScale,
      isReady: true,
    });
  }, [isMobile]);

  useEffect(() => {
    // Initial calculation
    calculatePositions();
    
    // Recalculate on resize for responsiveness
    // Using a small debounce to avoid excessive recalculations
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculatePositions, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculatePositions]);

  return values;
}

export default useLogoAnimation;
