"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Detect screen size for responsive logo scaling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const heroHeight = heroRef.current.offsetHeight;
    const scrollY = window.scrollY;
    
    // Progress: 0 at top, 1 when logo should be in final header position
    const lockPoint = heroHeight * 0.45;
    const progress = Math.min(scrollY / lockPoint, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Easing function for smoother animation
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);

  // --- POSITIONING LOGIC ---
  const startTop = 40; 
  
  // ADJUSTED: Moved down to 8.5% (was 5%) to accommodate the larger logo size
  // and center it vertically within the header space.
  const endTop = 7; 
  const logoTop = startTop - (easedProgress * (startTop - endTop));
  
  const startScale = 1;
  
  // Scales kept large as requested:
  // Mobile: 0.48
  // Desktop: 0.36 
  const endScale = isMobile ? 0.48 : 0.36;
  const logoScale = startScale - (easedProgress * (startScale - endScale));
  
  // Fade out hero content on scroll
  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section ref={heroRef} className="relative min-h-svh w-full bg-carmel-bg flex flex-col overflow-hidden">
      {/* Logo Container */}
      <div 
        className="fixed left-1/2 z-50 pointer-events-none hero-logo"
        style={{
          top: `${logoTop}%`,
          transform: `translateX(-50%) translateY(-50%) scale(${logoScale})`,
        }}
      >
        {/* Inner Anchor handles Fade In */}
        <a 
          href="/" 
          className="block pointer-events-auto hover:opacity-70 transition-opacity duration-200 hero-fade-in-logo"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CRC-Logo.svg"
            alt="Carmel Rose Collective"
            className="w-[280px] sm:w-[320px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
          />
        </a>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-4xl text-center">
          
          {/* Spacer */}
          <div className="h-[80px] sm:h-[100px] md:h-[160px] lg:h-[180px]" />

          {/* Tagline */}
          <p 
            className="mt-8 md:mt-16 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-balance hero-fade-in-delay-1"
            style={scrollProgress > 0 ? { opacity: contentOpacity } : undefined}
          >
            Experiential Marketing &amp; Brand Activation
          </p>

          {/* CTA */}
          <div 
            className="mt-8 md:mt-12 hero-fade-in-delay-2"
            style={scrollProgress > 0 ? { opacity: contentOpacity } : undefined}
          >
            <a 
              href="#portfolio"
              className="group inline-block text-[10px] tracking-[0.15em] uppercase text-carmel-text/40 hover:text-carmel-text/70 transition-colors duration-500"
            >
              <span className="pb-1.5 border-b border-carmel-text/15 group-hover:border-carmel-text/40 transition-colors duration-500">
                View Our Work
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
