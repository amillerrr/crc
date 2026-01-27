"use client";
import { useRef } from 'react';
import Image from 'next/image';
import { useLenisScroll } from './LenisProvider';
import { headerConfig } from '@/config/sections.config';
import { useBreakpoint, getResponsiveConfig } from '@/hooks/useBreakpoint';

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
 * The header logo size should match the final position of the IntroLoader logo.
 * Formula: Header logoWidth ≈ IntroLoader logo size × logoEndScale
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

  // Header always renders but is invisible until intro completes
  // This ensures the logo is in place when IntroLoader fades out
  return (
    <header 
      className="fixed top-0 left-0 w-full z-[920] bg-carmel-bg"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Logo centered in header area */}
      <div className={`flex justify-center items-center ${viewportConfig.paddingY}`}>
        <div ref={logoRef}>
          <a 
            href="/" 
            className="block pointer-events-auto hover:opacity-70 transition-opacity duration-300"
            aria-label="Carmel Rose Collective - Home"
          >
            <Image
              src="/CRC-Logo-Header.svg"
              alt="Carmel Rose Collective"
              width={180}
              height={180}
              priority
              style={{ width: viewportConfig.logo.width, height: 'auto' }}
            />
          </a>
        </div>
      </div>
    </header>
  );
}
