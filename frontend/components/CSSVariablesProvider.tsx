"use client";
import { useEffect } from 'react';
import { 
  sectionConfigs, 
  HEADER_HEIGHTS, 
  layoutConfig,
  navigationConfig,
  headerConfig,
  introLoaderConfig 
} from '@/config/sections.config';

/**
 * ============================================
 * CSS VARIABLES PROVIDER
 * ============================================
 * 
 * This component injects CSS custom properties from the TypeScript config
 * into the document root, ensuring that CSS variables are available for:
 * 
 * 1. Browser DevTools debugging - easily inspect computed values
 * 2. CSS-based responsive fallbacks - if JS fails to load
 * 3. Third-party component integration - pass values to external libraries
 * 4. CSS animations/transitions - use config values in keyframes
 * 
 * NOTE: Most components use inline styles via getResponsiveConfig() directly.
 * These CSS variables are supplementary and not required for core functionality.
 * 
 * USAGE IN CSS:
 * .my-element {
 *   padding-top: var(--section-services-pt-desktop);
 * }
 */

export default function CSSVariablesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    
    // ========================================
    // HEADER HEIGHTS
    // ========================================
    root.style.setProperty('--header-height-mobile', HEADER_HEIGHTS.mobile);
    root.style.setProperty('--header-height-desktop', HEADER_HEIGHTS.desktop);
    
    // ========================================
    // LAYOUT VARIABLES
    // ========================================
    root.style.setProperty('--layout-px-mobile', layoutConfig.mobile.paddingX);
    root.style.setProperty('--layout-px-desktop', layoutConfig.desktop.paddingX);
    
    // ========================================
    // NAVIGATION VARIABLES
    // ========================================
    root.style.setProperty('--nav-py-mobile', navigationConfig.mobile.paddingY);
    root.style.setProperty('--nav-py-desktop', navigationConfig.desktop.paddingY);
    root.style.setProperty('--nav-px-mobile', navigationConfig.mobile.paddingX);
    root.style.setProperty('--nav-px-desktop', navigationConfig.desktop.paddingX);
    root.style.setProperty('--nav-scroll-threshold', `${navigationConfig.scrollThreshold}px`);
    
    // ========================================
    // HEADER VARIABLES
    // ========================================
    root.style.setProperty('--header-logo-width-mobile', headerConfig.mobile.logo.width);
    root.style.setProperty('--header-logo-width-desktop', headerConfig.desktop.logo.width);
    root.style.setProperty('--header-py-mobile', headerConfig.mobile.paddingY);
    root.style.setProperty('--header-py-desktop', headerConfig.desktop.paddingY);
    
    // ========================================
    // INTRO LOADER VARIABLES
    // ========================================
    root.style.setProperty('--intro-logo-size-mobile', introLoaderConfig.mobile.logoSize);
    root.style.setProperty('--intro-logo-size-desktop', introLoaderConfig.desktop.logoSize);
    root.style.setProperty('--intro-logo-scale-mobile', String(introLoaderConfig.mobile.logoEndScale));
    root.style.setProperty('--intro-logo-scale-desktop', String(introLoaderConfig.desktop.logoEndScale));
    
    // ========================================
    // SECTION-SPECIFIC VARIABLES
    // ========================================
    Object.entries(sectionConfigs).forEach(([name, config]) => {
      // Mobile variables
      root.style.setProperty(`--section-${name}-pt-mobile`, config.mobile.spacing.paddingTop);
      root.style.setProperty(`--section-${name}-pb-mobile`, config.mobile.spacing.paddingBottom);
      root.style.setProperty(`--section-${name}-px-mobile`, config.mobile.spacing.paddingX);
      root.style.setProperty(`--section-${name}-height-mobile`, config.mobile.dimensions.height);
      root.style.setProperty(`--section-${name}-min-height-mobile`, config.mobile.dimensions.minHeight);
      
      // Desktop variables
      root.style.setProperty(`--section-${name}-pt-desktop`, config.desktop.spacing.paddingTop);
      root.style.setProperty(`--section-${name}-pb-desktop`, config.desktop.spacing.paddingBottom);
      root.style.setProperty(`--section-${name}-px-desktop`, config.desktop.spacing.paddingX);
      root.style.setProperty(`--section-${name}-height-desktop`, config.desktop.dimensions.height);
      root.style.setProperty(`--section-${name}-min-height-desktop`, config.desktop.dimensions.minHeight);
      
      // Optional maxWidth (only some sections have this)
      if (config.desktop.dimensions.maxWidth) {
        root.style.setProperty(`--section-${name}-max-width`, config.desktop.dimensions.maxWidth);
      }
    });

    // Log for debugging (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('[CSSVariablesProvider] CSS variables injected from config');
    }
  }, []);

  return <>{children}</>;
}
