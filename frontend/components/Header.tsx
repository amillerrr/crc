"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLenisScroll } from './LenisProvider';
import { headerConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface HeaderProps {
  isVisible: boolean;
}

/**
 * ============================================
 * HEADER COMPONENT
 * ============================================
 * 
 * Fixed header with logo that appears after intro animation completes.
 * 
 * Configuration is centralized in @/config/sections.config.ts
 * 
 * MATCHING INTRO ANIMATION:
 * The header logo size must match the final position of the IntroLoader logo.
 * Formula: Header logoWidth = IntroLoader logo size × logoEndScale
 * 
 * Mobile:  280px × 0.714 ≈ 200px
 * Desktop: 500px × 0.40  = 200px
 * 
 * TRANSITION TIMING:
 * The header uses framer-motion for a smooth fade-in that synchronizes
 * with the IntroLoader's crossfade animation. The 500ms duration and
 * custom easing ensure the header appears seamlessly as the intro logo
 * fades out.
 */

export default function Header({ isVisible }: HeaderProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint(headerConfig.breakpoint);

  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(headerConfig, isMobile);

  // Optional: Subtle parallax effect on scroll for the logo
  useLenisScroll(({ scroll }) => {
    if (logoRef.current && scroll < 200) {
      const scale = 1 - (scroll * 0.0002);
      logoRef.current.style.transform = `scale(${Math.max(0.95, scale)})`;
    }
  });

  // Generate styles from config
  const headerStyle: React.CSSProperties = {
    paddingTop: viewportConfig.paddingY,
    paddingBottom: viewportConfig.paddingY,
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-[920] bg-carmel-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 1, 0.5, 1]  // Match the intro's easing
      }}
    >
      <div 
        className="flex justify-center items-center"
        style={headerStyle}
      >
        <div ref={logoRef} className="transition-transform duration-100 ease-out">
          <a 
            href="/" 
            className="block pointer-events-auto hover:opacity-70 transition-opacity duration-300"
            aria-label="Carmel Rose Collective - Home"
          >
            <Image
              src="/CRC-Logo-Header.svg"
              alt="Carmel Rose Collective"
              width={200}
              height={200}
              priority
              style={{ 
                width: viewportConfig.logo.width, 
                height: 'auto' 
              }}
            />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
