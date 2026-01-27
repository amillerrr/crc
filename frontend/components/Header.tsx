"use client";
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLenisScroll } from './LenisProvider';

interface HeaderProps {
  isVisible: boolean;
}

/* ============================================
   HEADER CONFIGURATION
   Adjust these values to match IntroLoader
   
   IMPORTANT: To match the intro animation, use this formula:
   Header logoWidth ≈ IntroLoader logo size × logoEndScale
   
   Example for mobile:
   IntroLoader: 280px × 0.35 scale = 98px → Header: ~100px
   ============================================ */
const CONFIG = {
  // ----- DESKTOP VALUES (>= 768px) -----
  desktop: {
    logoWidth: 200,              // Logo width in pixels
    paddingY: 'py-1 md:py-2',    // Vertical padding
  },

  // ----- MOBILE VALUES (< 768px) -----
  mobile: {
    logoWidth: 200,              // Logo width in pixels - adjust this!
    paddingY: 'py-3',            // Vertical padding
  },

  // ----- BREAKPOINT -----
  mobileBreakpoint: 768,         // Width in px below which mobile config is used
};

export default function Header({ isVisible }: HeaderProps) {
  const logoRef = useRef<HTMLDivElement>(null);
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
      <div className={`flex justify-center items-center ${config.paddingY}`}>
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
              style={{ width: config.logoWidth, height: 'auto' }}
            />
          </a>
        </div>
      </div>
    </header>
  );
}
