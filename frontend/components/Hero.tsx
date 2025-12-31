"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const scrollY = window.scrollY;
    // Lock point: 40vh (approximate match to CSS var --hero-logo-start-top)
    const lockPoint = window.innerHeight * 0.40;
    
    // Calculate progress 0 to 1
    const rawProgress = Math.min(scrollY / lockPoint, 1);
    
    // Apply easing for smoother feel
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    setScrollProgress(easeOutCubic(rawProgress));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Calculate opacity for content fading out
  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-svh w-full bg-carmel-bg flex flex-col overflow-hidden"
      style={{
        // We pass the eased progress to CSS to drive the calculation
        // @ts-expect-error -- custom properties are valid
        '--scroll-progress': scrollProgress,
      }}
    >
      
      {/* ===== ATMOSPHERIC FLOATING ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(180, 160, 140, 0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/4 -right-24 w-[400px] h-[400px] rounded-full animate-float-slower"
          style={{ background: 'radial-gradient(circle, rgba(200, 180, 160, 0.06) 0%, transparent 70%)', animationDelay: '-5s' }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full animate-float-slowest"
          style={{ background: 'radial-gradient(circle, rgba(160, 140, 120, 0.05) 0%, transparent 70%)', animationDelay: '-10s' }}
        />
        <div 
          className="absolute -bottom-48 right-1/3 w-[600px] h-[600px] rounded-full animate-pulse-soft"
          style={{ background: 'radial-gradient(circle, rgba(190, 170, 150, 0.04) 0%, transparent 60%)' }}
        />
      </div>

      {/* Logo Container 
          UPDATED: Raised to z-[250]
          This places it ABOVE the scrolling header (z-200) but BELOW the menu overlay (z-290).
      */}
      <div 
        className="fixed left-1/2 z-[250] pointer-events-none hero-logo will-change-transform"
        style={{
          top: `calc(var(--hero-logo-start-top) - (var(--scroll-progress) * (var(--hero-logo-start-top) - var(--hero-logo-end-top))))`,
          transform: `translateX(-50%) translateY(-50%) scale(calc(var(--hero-logo-start-scale) - (var(--scroll-progress) * (var(--hero-logo-start-scale) - var(--hero-logo-end-scale)))))`,
          transformOrigin: 'center center',
        }}
      >
        {/* Logo animation wrapper */}
        <div className="hero-fade-in-logo">
          <a 
            href="/" 
            className="block pointer-events-auto hover:opacity-70 transition-opacity duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/CRC-Logo.svg"
              alt="Carmel Rose Collective"
              className="w-[260px] sm:w-[320px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
            />
          </a>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 relative z-10">
        <div className="w-full max-w-4xl text-center">
          
          {/* Spacer to push content below the initial logo position */}
          <div className="h-[110px] sm:h-[100px] md:h-[160px] lg:h-[180px]" />

          {/* Tagline */}
          <div className="hero-fade-in-delay-1">
            <p 
              className="mt-8 md:mt-16 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-balance"
              style={{ opacity: contentOpacity }}
            >
              Experiential Marketing &amp; Brand Activation
            </p>
          </div>

          {/* CTA */}
          <div className="hero-fade-in-delay-2">
            <div 
              className="mt-8 md:mt-12"
              style={{ opacity: contentOpacity }}
            >
              <a 
                href="#portfolio"
                className="group inline-block text-[10px] tracking-[0.15em] uppercase text-carmel-text/40 hover:text-carmel-text/60 transition-colors duration-500"
              >
                <span className="pb-1.5 border-b border-carmel-text/15 group-hover:border-carmel-text/30 transition-colors duration-500">
                  View Our Work
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
