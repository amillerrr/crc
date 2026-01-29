/**
 * ============================================
 * SECTION CONFIGURATION
 * ============================================
 * 
 * Centralized configuration for all page sections.
 * Each section has separate mobile and desktop settings
 * for independent control over each viewport.
 * 
 * ============================================
 * HOW TO CHANGE SECTION HEIGHT
 * ============================================
 * 
 * Each section has two height-related properties:
 * 
 * 1. `height` - The explicit height of the section
 *    - 'auto' → Section grows/shrinks to fit content (RECOMMENDED for most cases)
 *    - '100dvh' → Exactly viewport height (use for hero sections)
 *    - '80vh' → 80% of viewport height
 *    - '500px' → Fixed pixel value (not recommended for responsive design)
 * 
 * 2. `minHeight` - The minimum height (section can grow beyond this)
 *    - 'auto' → No minimum, shrinks to content
 *    - '100dvh' → At least full viewport height
 *    - '50vh' → At least 50% of viewport
 *    - '600px' → At least 600 pixels
 * 
 * COMMON PATTERNS:
 * 
 * A) "Full viewport section" (hero-style):
 *    height: 'auto', minHeight: '100dvh'
 * 
 * B) "Content-driven section" (fits content):
 *    height: 'auto', minHeight: 'auto'
 * 
 * C) "Fixed viewport section" (exactly viewport):
 *    height: '100dvh', minHeight: '100dvh'
 * 
 * D) "Minimum height with growth" (at least X):
 *    height: 'auto', minHeight: '600px'
 * 
 * ============================================
 * IMPORTANT: FIXED HEADER CONSIDERATION
 * ============================================
 * 
 * The Header component uses `position: fixed`, meaning it overlays page content.
 * 
 * - The FIRST section (Services) must have paddingTop = header height
 *   to push content below the fixed header
 * 
 * - Subsequent sections don't need this padding because the user
 *   scrolls past the first section
 * 
 * - If minHeight is '100dvh', the padding is INSIDE that height
 *   (content area = 100dvh - paddingTop - paddingBottom)
 * 
 * ============================================
 * USAGE IN COMPONENTS
 * ============================================
 * 
 * import { servicesConfig, getResponsiveConfig } from '@/config/sections.config';
 * import { useBreakpoint } from '@/hooks/useBreakpoint';
 * 
 * const { isMobile } = useBreakpoint(servicesConfig.breakpoint);
 * const viewportConfig = getResponsiveConfig(servicesConfig, isMobile);
 * 
 * const sectionStyle = {
 *   paddingTop: viewportConfig.spacing.paddingTop,
 *   paddingBottom: viewportConfig.spacing.paddingBottom,
 *   minHeight: viewportConfig.dimensions.minHeight,
 *   height: viewportConfig.dimensions.height,
 * };
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface SectionSpacing {
  paddingTop: string;
  paddingBottom: string;
  paddingX: string;
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
  /** Breakpoint at which to switch from mobile to desktop (in pixels) */
  breakpoint: number;
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

/**
 * Header heights for calculating offsets
 * These values represent the total height of the header area including padding
 * 
 * IMPORTANT: These must match the actual rendered header height
 * Mobile:  logo (scaled) + padding = ~72px total
 * Desktop: logo + padding = ~80px total
 */
export const HEADER_HEIGHTS = {
  mobile: '4.5rem',   // ~72px
  desktop: '5rem',    // ~80px
} as const;

// ============================================
// LOGO CONSTANTS (shared between components)
// ============================================

/**
 * Logo aspect ratio from SVG viewBox
 * Used by useLogoAnimation hook to calculate exact positions
 * From CRC-Logo.svg: viewBox="0 0 268.57281 77.246119"
 */
export const LOGO_ASPECT_RATIO = 77.246119 / 268.57281; // ≈ 0.2876

/**
 * Final logo width in pixels (must match headerConfig logo width)
 * Used by useLogoAnimation hook
 */
export const FINAL_LOGO_WIDTH = 200;

// ============================================
// SHARED LAYOUT CONFIGURATION
// ============================================

export interface LayoutConfig {
  mobile: {
    paddingX: string;
  };
  desktop: {
    paddingX: string;
  };
  breakpoint: number;
}

export const layoutConfig: LayoutConfig = {
  mobile: {
    paddingX: '1.5rem',    // 24px
  },
  desktop: {
    paddingX: '3rem',      // 48px
  },
  breakpoint: DEFAULT_BREAKPOINT,
};

// ============================================
// FORM VALIDATION LIMITS
// ============================================

/**
 * Form validation limits - must match backend limits in main.go
 */
export const FORM_LIMITS = {
  name: {
    maxLength: 200,
  },
  email: {
    maxLength: 254,
  },
  message: {
    maxLength: 5000,
  },
} as const;

// ============================================
// SECTION CONFIGURATIONS
// ============================================

/**
 * SERVICES SECTION
 * 
 * This is the FIRST section after the header, so it needs special handling:
 * - paddingTop must equal header height (content starts below fixed header)
 * - minHeight of 100dvh means the section fills the viewport
 * - The actual content area = 100dvh - paddingTop - paddingBottom
 * 
 * TO MAKE THIS SECTION SHORTER:
 * - Change minHeight from '100dvh' to 'auto' or a smaller value like '80vh'
 * - Reduce paddingBottom
 * 
 * TO MAKE THIS SECTION TALLER:
 * - Keep minHeight at '100dvh' or increase to '120vh'
 * - Increase paddingBottom
 */
export const servicesConfig: SectionConfig = {
  id: 'services',
  breakpoint: DEFAULT_BREAKPOINT,
  mobile: {
    spacing: {
      paddingTop: HEADER_HEIGHTS.mobile,  // ~72px - pushes content below fixed header
      paddingBottom: '3rem',              // 48px
      paddingX: '1.5rem',                 // 24px
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',  // Content-driven on mobile (scrollable)
    },
  },
  desktop: {
    spacing: {
      paddingTop: HEADER_HEIGHTS.desktop,  // 80px - pushes content below fixed header
      paddingBottom: '3rem',               // 48px - reduced from 8rem to prevent cutoff
      paddingX: '3rem',                    // 48px
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',  // Full viewport height (padding is INSIDE this)
    },
  },
};

/**
 * PORTFOLIO SECTION
 * 
 * Horizontal scrolling gallery - needs enough height for the carousel.
 * 
 * TO CHANGE HEIGHT:
 * - minHeight: '100dvh' = full viewport
 * - minHeight: '80vh' = 80% of viewport
 * - minHeight: 'auto' = fits content only
 */
export const portfolioConfig: SectionConfig = {
  id: 'portfolio',
  breakpoint: DEFAULT_BREAKPOINT,
  mobile: {
    spacing: {
      paddingTop: '4rem',
      paddingBottom: '4rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
    },
  },
  desktop: {
    spacing: {
      paddingTop: '6rem',
      paddingBottom: '3rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

/**
 * ABOUT SECTION
 * 
 * Quote and founder info - centered content.
 * 
 * TO CHANGE HEIGHT:
 * - Currently set to 100dvh on desktop for dramatic full-screen effect
 * - Change to 'auto' if you want it to just fit the content
 */
export const aboutConfig: SectionConfig = {
  id: 'about',
  breakpoint: DEFAULT_BREAKPOINT,
  mobile: {
    spacing: {
      paddingTop: '4rem',
      paddingBottom: '4rem',
      paddingX: '1.5rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
    },
  },
  desktop: {
    spacing: {
      paddingTop: '6rem',
      paddingBottom: '6rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

/**
 * CONTACT SECTION
 * 
 * Contact form - centered in viewport.
 * 
 * TO CHANGE HEIGHT:
 * - 100dvh gives a nice full-page form experience
 * - 'auto' would make it more compact
 */
export const contactConfig: SectionConfig = {
  id: 'contact',
  breakpoint: DEFAULT_BREAKPOINT,
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
      paddingTop: '6rem',
      paddingBottom: '6rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: '100dvh',
    },
  },
};

/**
 * FOOTER SECTION
 * 
 * Footer doesn't need minHeight - it should just fit content.
 */
export const footerConfig: SectionConfig = {
  id: 'footer',
  breakpoint: DEFAULT_BREAKPOINT,
  mobile: {
    spacing: {
      paddingTop: '3rem',
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
      paddingTop: '5rem',
      paddingBottom: '3rem',
      paddingX: '3rem',
    },
    dimensions: {
      height: 'auto',
      minHeight: 'auto',
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

export type SectionName = keyof typeof sectionConfigs;

// ============================================
// NAVIGATION CONFIGURATION
// ============================================

export interface NavigationViewportConfig {
  paddingY: string;
  paddingX: string;
}

export interface NavigationConfig {
  mobile: NavigationViewportConfig;
  desktop: NavigationViewportConfig;
  breakpoint: number;
  scrollThreshold: number;
}

export const navigationConfig: NavigationConfig = {
  mobile: {
    paddingY: '0.5rem',
    paddingX: '1.5rem',
  },
  desktop: {
    paddingY: '0.75rem',
    paddingX: '3rem',
  },
  breakpoint: DEFAULT_BREAKPOINT,
  scrollThreshold: 100,
};

// ============================================
// HEADER CONFIGURATION
// ============================================

export interface LogoConfig {
  width: string;
  height?: string;
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

/**
 * Header Configuration
 * 
 * LOGO SIZE:
 * Both mobile and desktop use 200px final logo width.
 * The IntroLoader scales from larger sizes down to this.
 * 
 * Mobile:  280px × 0.714 ≈ 200px
 * Desktop: 500px × 0.40  = 200px
 */
export const headerConfig: HeaderConfig = {
  mobile: {
    logo: {
      width: '200px',
    },
    paddingY: '0.75rem',  // 12px
  },
  desktop: {
    logo: {
      width: '200px',
    },
    paddingY: '0.5rem',   // 8px
  },
  breakpoint: DEFAULT_BREAKPOINT,
};

// ============================================
// INTRO LOADER CONFIGURATION
// ============================================

export interface IntroTimingConfig {
  /** Duration of logo fade-in animation (ms) */
  logoEnterDuration: number;
  /** Duration logo stays centered before moving (ms) */
  logoHoldDuration: number;
  /** Duration of logo moving to header position (ms) */
  logoExitDuration: number;
  /** Delay before background starts fading (ms) - THIS IS WHEN HEADER APPEARS */
  backgroundFadeDelay: number;
  /** Duration of background fade-out (ms) */
  backgroundFadeDuration: number;
  /** When crossfade starts during exit (0-1, fraction of logoExitDuration) */
  logoCrossfadeStart: number;
  /** Duration of crossfade (0-1, fraction of logoExitDuration) */
  logoCrossfadeDuration: number;
}

export interface IntroViewportConfig {
  /** Scale factor to reach final logo size (calculated: initialSize × scale = 200px) */
  logoEndScale: number;
  /** Initial logo size before scaling */
  logoSize: string;
  /** Initial Y offset from center (negative = higher, positive = lower) */
  logoStartY: string;
  /** Position of tagline from top */
  taglineTop: string;
  /** Position of decorative line from top */
  lineTop: string;
}

export interface IntroLoaderConfig {
  timing: IntroTimingConfig;
  mobile: IntroViewportConfig;
  desktop: IntroViewportConfig;
  breakpoint: number;
}

/**
 * IntroLoader Configuration
 * 
 * LOGO ANIMATION:
 * The logo starts centered in the viewport and animates to the header position.
 * 
 * - logoEndScale: Scale factor applied to reach 200px final width
 *   - Mobile:  280px × 0.714 ≈ 200px
 *   - Desktop: 500px × 0.40  = 200px
 * 
 * - logoStartY: Initial vertical offset from center
 *   - '0px' = perfectly centered
 *   - '-5vh' = 5% of viewport height above center
 *   - Use negative values to move the logo UP
 * 
 * - logoEndY: CALCULATED DYNAMICALLY by useLogoAnimation hook
 *   This ensures pixel-perfect positioning across all viewport sizes.
 *   The hook calculates: headerLogoCenterY - viewportCenterY
 * 
 * TIMING & HEADER VISIBILITY:
 * The Header appears when the IntroLoader background STARTS fading.
 * This creates a "curtain rising" effect where the Header is revealed
 * naturally as the IntroLoader background becomes transparent.
 * 
 * Timeline (absolute time from page load):
 * - 0ms: logo-enter starts
 * - 800ms: logo-hold starts (tagline appears)
 * - 2000ms: logo-exit starts (logo moves to header, crossfade begins at 2200ms)
 * - 2400ms: backgroundFadeDelay reached → onComplete → Header appears (instant)
 * - 2400-3200ms: Background fades, revealing Header behind it
 * - 3200ms: IntroLoader unmounts, Header fully visible
 * 
 * Total intro duration ≈ 3.2 seconds
 */
export const introLoaderConfig: IntroLoaderConfig = {
  timing: {
    logoEnterDuration: 800,
    logoHoldDuration: 1200,
    logoExitDuration: 1000,
    backgroundFadeDelay: 400,       // When Header appears (relative to exit start)
    backgroundFadeDuration: 800,    // How long background takes to fade out
    logoCrossfadeStart: 0.5,        // Start crossfade 50% into exit animation
    logoCrossfadeDuration: 0.4,     // Crossfade takes 40% of exit duration
  },
  mobile: {
    logoEndScale: 0.714,          // 280px × 0.714 ≈ 200px
    logoSize: '280px',
    logoStartY: '0px',            // Centered on mobile
    taglineTop: '58vh',
    lineTop: '64vh',
  },
  desktop: {
    logoEndScale: 0.40,           // 500px × 0.40 = 200px
    logoSize: '500px',
    logoStartY: '-5vh',           // Move up 5vh on desktop for better spacing with tagline
    taglineTop: '62vh',
    lineTop: '68vh',
  },
  breakpoint: DEFAULT_BREAKPOINT,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get responsive config based on current viewport
 * 
 * @example
 * const { isMobile } = useBreakpoint(servicesConfig.breakpoint);
 * const config = getResponsiveConfig(servicesConfig, isMobile);
 */
export function getResponsiveConfig<T extends { mobile: unknown; desktop: unknown }>(
  config: T,
  isMobile: boolean
): T['mobile'] | T['desktop'] {
  return isMobile ? config.mobile : config.desktop;
}

/**
 * Parse rem value to pixels (assumes 16px base font size)
 * 
 * @example
 * remToPx('0.75rem') // returns 12
 * remToPx('1.5rem')  // returns 24
 */
export function remToPx(rem: string): number {
  const value = parseFloat(rem);
  return value * 16;
}

/**
 * Generates CSS variable declarations from section configs.
 * Useful for debugging or generating static CSS.
 * 
 * @example
 * console.log(generateCSSVariables());
 */
export function generateCSSVariables(): string {
  const lines: string[] = [];
  
  // Header heights
  lines.push(`--header-height-mobile: ${HEADER_HEIGHTS.mobile};`);
  lines.push(`--header-height-desktop: ${HEADER_HEIGHTS.desktop};`);
  lines.push('');
  
  // Logo constants
  lines.push(`--logo-aspect-ratio: ${LOGO_ASPECT_RATIO};`);
  lines.push(`--final-logo-width: ${FINAL_LOGO_WIDTH}px;`);
  lines.push('');
  
  // Layout
  lines.push(`--layout-px-mobile: ${layoutConfig.mobile.paddingX};`);
  lines.push(`--layout-px-desktop: ${layoutConfig.desktop.paddingX};`);
  lines.push('');
  
  // Navigation
  lines.push(`--nav-py-mobile: ${navigationConfig.mobile.paddingY};`);
  lines.push(`--nav-py-desktop: ${navigationConfig.desktop.paddingY};`);
  lines.push(`--nav-px-mobile: ${navigationConfig.mobile.paddingX};`);
  lines.push(`--nav-px-desktop: ${navigationConfig.desktop.paddingX};`);
  lines.push(`--nav-scroll-threshold: ${navigationConfig.scrollThreshold}px;`);
  lines.push('');
  
  // Header
  lines.push(`--header-logo-width-mobile: ${headerConfig.mobile.logo.width};`);
  lines.push(`--header-logo-width-desktop: ${headerConfig.desktop.logo.width};`);
  lines.push(`--header-py-mobile: ${headerConfig.mobile.paddingY};`);
  lines.push(`--header-py-desktop: ${headerConfig.desktop.paddingY};`);
  lines.push('');
  
  // IntroLoader
  lines.push(`--intro-logo-size-mobile: ${introLoaderConfig.mobile.logoSize};`);
  lines.push(`--intro-logo-size-desktop: ${introLoaderConfig.desktop.logoSize};`);
  lines.push(`--intro-logo-scale-mobile: ${introLoaderConfig.mobile.logoEndScale};`);
  lines.push(`--intro-logo-scale-desktop: ${introLoaderConfig.desktop.logoEndScale};`);
  lines.push(`--intro-logo-start-y-mobile: ${introLoaderConfig.mobile.logoStartY};`);
  lines.push(`--intro-logo-start-y-desktop: ${introLoaderConfig.desktop.logoStartY};`);
  lines.push('');
  
  // Sections
  Object.entries(sectionConfigs).forEach(([name, config]) => {
    // Mobile variables
    lines.push(`--section-${name}-pt-mobile: ${config.mobile.spacing.paddingTop};`);
    lines.push(`--section-${name}-pb-mobile: ${config.mobile.spacing.paddingBottom};`);
    lines.push(`--section-${name}-px-mobile: ${config.mobile.spacing.paddingX};`);
    lines.push(`--section-${name}-height-mobile: ${config.mobile.dimensions.height};`);
    lines.push(`--section-${name}-min-height-mobile: ${config.mobile.dimensions.minHeight};`);
    
    // Desktop variables
    lines.push(`--section-${name}-pt-desktop: ${config.desktop.spacing.paddingTop};`);
    lines.push(`--section-${name}-pb-desktop: ${config.desktop.spacing.paddingBottom};`);
    lines.push(`--section-${name}-px-desktop: ${config.desktop.spacing.paddingX};`);
    lines.push(`--section-${name}-height-desktop: ${config.desktop.dimensions.height};`);
    lines.push(`--section-${name}-min-height-desktop: ${config.desktop.dimensions.minHeight};`);
    
    // Optional maxWidth
    if (config.desktop.dimensions.maxWidth) {
      lines.push(`--section-${name}-max-width: ${config.desktop.dimensions.maxWidth};`);
    }
    
    lines.push('');
  });
  
  return lines.join('\n');
}
