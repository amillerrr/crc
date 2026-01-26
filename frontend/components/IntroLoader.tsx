"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

/* ============================================
   INTRO ANIMATION CONFIGURATION
   Adjust these values to tweak the animation
   
   MATCHING HEADER SIZE FORMULA:
   logoEndScale = (Header logoWidth) ÷ (IntroLoader logo width at that breakpoint)
   
   Desktop: Header 170px ÷ IntroLoader 700px = 0.243 scale
   Mobile:  Header 100px ÷ IntroLoader 280px = 0.357 scale
   ============================================ */
const CONFIG = {
  // ----- TIMING (in milliseconds) -----
  timing: {
    logoEnterDuration: 800,      // How long logo takes to fade in
    logoHoldDuration: 1200,      // How long logo stays centered
    logoExitDuration: 1000,      // How long logo takes to move to header
    backgroundFadeDelay: 400,    // Delay before background starts fading
    backgroundFadeDuration: 800, // How long background takes to fade
  },

  // ----- DESKTOP VALUES (>= 768px) -----
  desktop: {
    // Initial logo position (negative = higher on screen)
    logoStartOffset: '-28vh',
    
    // Final animation values when logo moves to header
    logoEndY: '-20vh',           // Vertical position (from starting point)
    logoEndScale: 0.243,         // 170px header ÷ 700px logo = 0.243
    
    // Tagline position
    taglineTop: '62vh',
    
    // Decorative line position  
    lineTop: '68vh',
  },

  // ----- MOBILE VALUES (< 768px) -----
  mobile: {
    // Initial logo position (negative = higher on screen)
    logoStartOffset: '-20vh',
    
    // Final animation values when logo moves to header
    logoEndY: '-36.5vh',           // Vertical position (from starting point)
    logoEndScale: 0.5,         // 100px header ÷ 280px logo = 0.357
    
    // Tagline position
    taglineTop: '58vh',
    
    // Decorative line position
    lineTop: '64vh',
  },

  // ----- BREAKPOINT -----
  mobileBreakpoint: 768,         // Width in px below which mobile config is used
};

/* ============================================
   COMPONENT
   ============================================ */
export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<'logo-enter' | 'logo-hold' | 'logo-exit' | 'complete'>('logo-enter');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < CONFIG.mobileBreakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current config based on screen size
  const config = isMobile ? CONFIG.mobile : CONFIG.desktop;
  const { timing } = CONFIG;

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

          {/* Logo Container - NO FADE, just moves to position then gets removed */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative"
              style={{ marginTop: config.logoStartOffset }}
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
                  scale: config.logoEndScale,
                  y: config.logoEndY,
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
              <Image
                src="/CRC-Logo.svg"
                alt="Carmel Rose Collective"
                width={700}
                height={700}
                priority
                className="w-[280px] sm:w-[360px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
              />
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="fixed z-[1000] text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-center px-6 pointer-events-none left-0 right-0"
            style={{ top: config.taglineTop }}
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
            style={{ top: config.lineTop }}
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
