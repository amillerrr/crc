"use client";
import { useEffect } from 'react';
import { sectionConfigs, HEADER_HEIGHTS } from '@/config/sections.config';

/**
 * ============================================
 * CSS VARIABLES PROVIDER
 * ============================================
 * 
 * This component injects CSS custom properties from the TypeScript config
 * into the document root, ensuring that globals.css variables are always
 * in sync with sections.config.ts
 * 
 * This solves the "dual source of truth" problem where CSS variables
 * and TypeScript config can get out of sync.
 */

export default function CSSVariablesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    
    // Inject header heights
    root.style.setProperty('--header-height-mobile', HEADER_HEIGHTS.mobile);
    root.style.setProperty('--header-height-desktop', HEADER_HEIGHTS.desktop);
    
    // Inject section-specific variables
    Object.entries(sectionConfigs).forEach(([name, config]) => {
      // Mobile variables
      root.style.setProperty(`--section-${name}-pt-mobile`, config.mobile.spacing.paddingTop);
      root.style.setProperty(`--section-${name}-pb-mobile`, config.mobile.spacing.paddingBottom);
      if (config.mobile.spacing.paddingX) {
        root.style.setProperty(`--section-${name}-px-mobile`, config.mobile.spacing.paddingX);
      }
      root.style.setProperty(`--section-${name}-height-mobile`, config.mobile.dimensions.height);
      root.style.setProperty(`--section-${name}-min-height-mobile`, config.mobile.dimensions.minHeight);
      
      // Desktop variables
      root.style.setProperty(`--section-${name}-pt-desktop`, config.desktop.spacing.paddingTop);
      root.style.setProperty(`--section-${name}-pb-desktop`, config.desktop.spacing.paddingBottom);
      if (config.desktop.spacing.paddingX) {
        root.style.setProperty(`--section-${name}-px-desktop`, config.desktop.spacing.paddingX);
      }
      root.style.setProperty(`--section-${name}-height-desktop`, config.desktop.dimensions.height);
      root.style.setProperty(`--section-${name}-min-height-desktop`, config.desktop.dimensions.minHeight);
      if (config.desktop.dimensions.maxWidth) {
        root.style.setProperty(`--section-${name}-max-width`, config.desktop.dimensions.maxWidth);
      }
    });
  }, []);

  return <>{children}</>;
}
