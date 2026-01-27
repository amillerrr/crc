"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { introLoaderConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface IntroLoaderProps {
  onComplete: () => void;
}

/**
 * ============================================
 * INTRO LOADER COMPONENT
 * ============================================
 * 
 * Handles the initial page load animation:
 * 1. Logo fades in at center
 * 2. Logo holds with tagline visible
 * 3. Logo animates to header position, crossfading to header variant
 * 4. Background fades out revealing main content
 * 
 * Configuration is centralized in @/config/sections.config.ts
 * 
 * LOGO SIZE CALCULATIONS (SIMPLIFIED):
 * To ensure precise animation landing, we use only 2 breakpoints:
 * - Mobile (<768px):  280px × 0.714 = 200px (matches header)
 * - Desktop (≥768px): 500px × 0.40  = 200px (matches header)
 * 
 * This eliminates scale mismatches at intermediate breakpoints (sm, lg, xl).
 */

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<'logo-enter' | 'logo-hold' | 'logo-exit' | 'complete'>('logo-enter');
  const { isMobile } = useBreakpoint(introLoaderConfig.breakpoint);

  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(introLoaderConfig, isMobile);
  const { timing } = introLoaderConfig;

  // Animation timeline
  useEffect(() => {
    const timeline = [
      { phase: 'logo-hold' as const, delay: timing.logoEnterDuration },
      { phase: 'logo-exit' as const, delay: timing.logoEnterDuration + timing.logoHoldDuration },
      { phase: 'complete' as const, delay: timing.logoEnterDuration + timing.logoHoldDuration + timing.logoExitDuration + 200 },
    ];
    
    const timers = timeline.map(({ phase, delay }) => 
      setTimeout(() => setPhase(phase), delay)
    );
    
    return () => timers.forEach(clearTimeout);
  }, [timing]);

  useEffect(() => {
    if (phase === 'complete') {
      onComplete();
    }
  }, [phase, onComplete]);

  // Calculate crossfade timing (in seconds for framer-motion)
  const crossfadeDelay = (timing.logoExitDuration * timing.logoCrossfadeStart) / 1000;
  const crossfadeDuration = (timing.logoExitDuration * timing.logoCrossfadeDuration) / 1000;

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <>
          {/* Background layer - fades out during exit */}
          <motion.div
            className="fixed inset-0 z-[999] bg-carmel-bg overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'logo-exit' ? 0 : 1 }}
            transition={{ 
              duration: timing.backgroundFadeDuration / 1000, 
              delay: phase === 'logo-exit' ? timing.backgroundFadeDelay / 1000 : 0,
              ease: [0.25, 1, 0.5, 1] 
            }}
          >
            {/* Atmospheric background elements */}
            <motion.div 
              className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(180, 160, 140, 0.08) 0%, transparent 70%)' }}
              animate={{ 
                x: [0, 30, 0], 
                y: [0, -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-1/4 -right-24 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200, 180, 160, 0.06) 0%, transparent 70%)' }}
              animate={{ 
                x: [0, -20, 0], 
                y: [0, 30, 0],
                scale: [1, 0.95, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(160, 140, 120, 0.05) 0%, transparent 70%)' }}
              animate={{ 
                x: [0, 25, 0], 
                y: [0, -15, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </motion.div>

          {/* Logo Container - contains both logos for crossfade */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative"
              style={{ marginTop: viewportConfig.logoStartOffset }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === 'logo-enter' ? { 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                } : phase === 'logo-hold' ? { 
                  opacity: 1, 
                  scale: 1,
                  y: 0,
                } : { 
                  opacity: 1, 
                  scale: viewportConfig.logoEndScale,
                  y: viewportConfig.logoEndY,
                }
              }
              transition={
                phase === 'logo-exit' 
                  ? { 
                      duration: timing.logoExitDuration / 1000, 
                      ease: [0.25, 1, 0.5, 1],
                    }
                  : { 
                      duration: timing.logoEnterDuration / 1000, 
                      ease: [0.25, 1, 0.5, 1] 
                    }
              }
            >
              {/* Thin logo (CRC-Logo.svg) - fades out during exit */}
              <motion.div
                className="relative"
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: phase === 'logo-exit' ? 0 : 1 
                }}
                transition={
                  phase === 'logo-exit' 
                    ? { 
                        duration: crossfadeDuration, 
                        delay: crossfadeDelay,
                        ease: [0.25, 1, 0.5, 1] 
                      }
                    : { duration: 0 }
                }
              >
                {/* 
                  SIMPLIFIED Logo responsive sizes (2 breakpoints only):
                  - Mobile (<768px):  280px - scales to 200px with 0.714
                  - Desktop (≥768px): 500px - scales to 200px with 0.40
                  
                  This ensures the animation lands precisely on the 200px header logo.
                  Previous 5-breakpoint system caused scale mismatches at sm, lg, xl.
                */}
                <Image
                  src="/CRC-Logo.svg"
                  alt="Carmel Rose Collective"
                  width={500}
                  height={500}
                  priority
                  className="w-[280px] md:w-[500px] h-auto"
                />
              </motion.div>

              {/* Bold logo (CRC-Logo-Header.svg) - fades in during exit */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: phase === 'logo-exit' ? 1 : 0 
                }}
                transition={
                  phase === 'logo-exit' 
                    ? { 
                        duration: crossfadeDuration, 
                        delay: crossfadeDelay,
                        ease: [0.25, 1, 0.5, 1] 
                      }
                    : { duration: 0 }
                }
              >
                <Image
                  src="/CRC-Logo-Header.svg"
                  alt="Carmel Rose Collective"
                  width={500}
                  height={500}
                  priority
                  className="w-[280px] md:w-[500px] h-auto"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="fixed z-[1000] text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-center px-6 pointer-events-none left-0 right-0"
            style={{ top: viewportConfig.taglineTop }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === 'logo-enter' ? { opacity: 0, y: 20 } :
              phase === 'logo-hold' ? { opacity: 1, y: 0 } :
              { opacity: 0, y: -10 }
            }
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            Experiential Marketing &amp; Brand Activation
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="fixed z-[1000] w-12 h-px bg-carmel-text/15 pointer-events-none left-1/2 -translate-x-1/2"
            style={{ top: viewportConfig.lineTop }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === 'logo-enter' ? { scaleX: 0, opacity: 0 } :
              phase === 'logo-hold' ? { scaleX: 1, opacity: 1 } :
              { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: phase === 'logo-hold' ? 0.3 : 0 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
