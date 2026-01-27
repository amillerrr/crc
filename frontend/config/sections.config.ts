/**
 * ============================================
 * SECTION CONFIGURATION
 * ============================================
 * 
 * Centralized configuration for all page sections.
 * Each section has separate mobile and desktop settings
 * for independent control over each viewport.
 * 
 * USAGE:
 * - Import specific section config: import { servicesConfig } from '@/config/sections.config'
 * - Import all configs: import { sectionConfigs } from '@/config/sections.config'
 * 
 * UNITS:
 * - height: 'auto' | '100vh' | '100dvh' | 'fit-content' | specific value like '80vh'
 * - minHeight: same as height
 * - padding: rem values as strings (e.g., '6rem')
 * - gap: rem values as strings
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface SectionSpacing {
  paddingTop: string;
  paddingBottom: string;
  paddingX?: string;
}

export interface SectionDimensions {
  height: string;
  minHeight: string;
  maxWidth?: string;
}

export interface SectionViewportConfig {
  spacing: SectionSpacing;
  dimensions: SectionDimensions;
}

export interface SectionConfig {
  id: string;
  mobile: SectionViewportConfig;
  desktop: SectionViewportConfig;
  // Breakpoint at which to switch from mobile to desktop
  breakpoint?: number;
}

// ============================================
// GLOBAL DEFAULTS
// ============================================

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export const DEFAULT_BREAKPOINT = BREAKPOINTS.tablet; // 768px

// ============================================
// SECTION CONFIGURATIONS
// ============================================

export const servicesConfig: SectionConfig = {
  id: 'services',
  mobile: {
    spacing: {
      paddingTop: '6rem',      // Extra top for header clearance
      paddingBottom: '5rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
    },
  },
  desktop: {
    spacing: {
      paddingTop: '0',
      paddingBottom: '8rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

export const portfolioConfig: SectionConfig = {
  id: 'portfolio',
  mobile: {
    spacing: {
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
    },
  },
  desktop: {
    spacing: {
      paddingTop: '8rem',
      paddingBottom: '3rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

export const aboutConfig: SectionConfig = {
  id: 'about',
  mobile: {
    spacing: {
      paddingTop: '5rem',
      paddingBottom: '5rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
    },
  },
  desktop: {
    spacing: {
      paddingTop: '0',
      paddingBottom: '0',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

export const contactConfig: SectionConfig = {
  id: 'contact',
  mobile: {
    spacing: {
      paddingTop: '4rem',
      paddingBottom: '2rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
    },
  },
  desktop: {
    spacing: {
      paddingTop: '0',
      paddingBottom: '0',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

export const footerConfig: SectionConfig = {
  id: 'footer',
  mobile: {
    spacing: {
      paddingTop: '3rem',
      paddingBottom: '2rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',  // Footer should only take needed space
    },
  },
  desktop: {
    spacing: {
      paddingTop: '5rem',
      paddingBottom: '3rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',  // Footer should only take needed space
      maxWidth: '1400px',
    },
  },
};

// ============================================
// COLLECTED CONFIGS
// ============================================

export const sectionConfigs = {
  services: servicesConfig,
  portfolio: portfolioConfig,
  about: aboutConfig,
  contact: contactConfig,
  footer: footerConfig,
} as const;

// ============================================
// HEADER & INTRO LOADER CONFIGURATIONS
// ============================================

export interface LogoConfig {
  width: number;
  height?: number;
}

export interface HeaderViewportConfig {
  logo: LogoConfig;
  paddingY: string;
}

export interface HeaderConfig {
  mobile: HeaderViewportConfig;
  desktop: HeaderViewportConfig;
  breakpoint: number;
}

export const headerConfig: HeaderConfig = {
  mobile: {
    logo: {
      width: 200,
    },
    paddingY: 'py-3',
  },
  desktop: {
    logo: {
      width: 200,
    },
    paddingY: 'py-1 md:py-2',
  },
  breakpoint: DEFAULT_BREAKPOINT,
};

// ============================================
// INTRO LOADER CONFIGURATION
// ============================================

export interface IntroTimingConfig {
  logoEnterDuration: number;      // ms - How long logo takes to fade in
  logoHoldDuration: number;       // ms - How long logo stays centered
  logoExitDuration: number;       // ms - How long logo takes to move to header
  backgroundFadeDelay: number;    // ms - Delay before background starts fading
  backgroundFadeDuration: number; // ms - How long background takes to fade
  logoCrossfadeStart: number;     // 0-1 - Start crossfade at this % into exit phase
  logoCrossfadeDuration: number;  // 0-1 - Crossfade duration as % of exit duration
}

export interface IntroViewportConfig {
  logoStartOffset: string;  // Initial logo position (negative = higher)
  logoEndY: string;         // Final Y position when moving to header
  logoEndScale: number;     // Final scale when logo reaches header
  taglineTop: string;       // Tagline position from top
  lineTop: string;          // Decorative line position from top
}

export interface IntroLoaderConfig {
  timing: IntroTimingConfig;
  mobile: IntroViewportConfig;
  desktop: IntroViewportConfig;
  breakpoint: number;
}

export const introLoaderConfig: IntroLoaderConfig = {
  timing: {
    logoEnterDuration: 800,
    logoHoldDuration: 1200,
    logoExitDuration: 1000,
    backgroundFadeDelay: 400,
    backgroundFadeDuration: 800,
    logoCrossfadeStart: 0.2,
    logoCrossfadeDuration: 0.6,
  },
  mobile: {
    logoStartOffset: '-20vh',
    logoEndY: '-35.5vh',
    logoEndScale: 0.71,
    taglineTop: '58vh',
    lineTop: '64vh',
  },
  desktop: {
    logoStartOffset: '-28vh',
    logoEndY: '-30.2vh',
    logoEndScale: 0.285,
    taglineTop: '62vh',
    lineTop: '68vh',
  },
  breakpoint: DEFAULT_BREAKPOINT,
};

// ============================================
// UTILITY: Generate CSS Variables
// ============================================

/**
 * Generates CSS variable declarations from section configs.
 * Useful for dynamically creating CSS custom properties.
 */
export function generateCSSVariables(): string {
  const lines: string[] = [];
  
  Object.entries(sectionConfigs).forEach(([name, config]) => {
    // Mobile variables
    lines.push(`--section-${name}-pt-mobile: ${config.mobile.spacing.paddingTop};`);
    lines.push(`--section-${name}-pb-mobile: ${config.mobile.spacing.paddingBottom};`);
    lines.push(`--section-${name}-height-mobile: ${config.mobile.dimensions.height};`);
    lines.push(`--section-${name}-min-height-mobile: ${config.mobile.dimensions.minHeight};`);
    
    // Desktop variables
    lines.push(`--section-${name}-pt-desktop: ${config.desktop.spacing.paddingTop};`);
    lines.push(`--section-${name}-pb-desktop: ${config.desktop.spacing.paddingBottom};`);
    lines.push(`--section-${name}-height-desktop: ${config.desktop.dimensions.height};`);
    lines.push(`--section-${name}-min-height-desktop: ${config.desktop.dimensions.minHeight};`);
    
    lines.push(''); // Empty line between sections
  });
  
  return lines.join('\n');
}
