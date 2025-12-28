"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0); 
  const heroRef = useRef<HTMLElement>(null);

  // Detect screen size for responsive logo scaling and positioning
  useEffect(() => {
    const handleResize = () => {
      // 768px matches Tailwind's 'md' breakpoint
      setIsMobile(window.innerWidth < 768);
      setWindowHeight(window.innerHeight);
    };
    
    // Initial call
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;
    const heroHeight = heroRef.current.offsetHeight;
    const scrollY = window.scrollY;
    
    // Lock point: 40% of hero height
    const lockPoint = heroHeight * 0.40;
    const progress = Math.min(scrollY / lockPoint, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);

  // --- POSITIONING LOGIC ---
  const startTopPx = windowHeight * 0.40;
  
  // CALCULATED END POSITIONS (To align perfectly with Navigation):
  // Mobile Nav: py-3 (12px) + half icon height (20px) = 32px center
  // Desktop Nav: md:py-6 (24px) + half icon height (20px) = 44px center
  const endTopPx = isMobile ? 32 : 44; 

  // Interpolate
  const currentTopPx = startTopPx - (easedProgress * (startTopPx - endTopPx));
  
  const startScale = 1;
  const endScale = isMobile ? 0.42 : 0.36;
  const logoScale = startScale - (easedProgress * (startScale - endScale));
  
  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section ref={heroRef} className="relative min-h-svh w-full bg-carmel-bg flex flex-col overflow-hidden">
      
      {/* ===== ATMOSPHERIC FLOATING ELEMENTS ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb - top left */}
        <div 
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(180, 160, 140, 0.08) 0%, transparent 70%)',
          }}
        />
        
        {/* Medium gradient orb - right side */}
        <div 
          className="absolute top-1/4 -right-24 w-[400px] h-[400px] rounded-full animate-float-slower"
          style={{
            background: 'radial-gradient(circle, rgba(200, 180, 160, 0.06) 0%, transparent 70%)',
            animationDelay: '-5s',
          }}
        />
        
        {/* Small accent orb - bottom left */}
        <div 
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full animate-float-slowest"
          style={{
            background: 'radial-gradient(circle, rgba(160, 140, 120, 0.05) 0%, transparent 70%)',
            animationDelay: '-10s',
          }}
        />
        
        {/* Subtle bottom gradient orb */}
        <div 
          className="absolute -bottom-48 right-1/3 w-[600px] h-[600px] rounded-full animate-pulse-soft"
          style={{
            background: 'radial-gradient(circle, rgba(190, 170, 150, 0.04) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Logo Container */}
      <div 
        className="fixed left-1/2 z-50 pointer-events-none hero-logo will-change-transform"
        style={{
          top: `${currentTopPx}px`,
          transform: `translateX(-50%) translateY(-50%) scale(${logoScale})`,
          transformOrigin: 'center center',
        }}
      >
        <a 
          href="/" 
          className="block pointer-events-auto hover:opacity-70 transition-opacity duration-200 hero-fade-in-logo"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CRC-Logo.svg"
            alt="Carmel Rose Collective"
            className="w-[260px] sm:w-[320px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
          />
        </a>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 relative z-10">
        <div className="w-full max-w-4xl text-center">
          
          {/* Spacer */}
          <div className="h-[110px] sm:h-[100px] md:h-[160px] lg:h-[180px]" />

          {/* Tagline */}
          <p 
            className="mt-8 md:mt-16 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-balance hero-fade-in-delay-1"
            style={scrollProgress > 0 ? { opacity: contentOpacity } : undefined}
          >
            Experiential Marketing &amp; Brand Activation
          </p>

          {/* CTA - Elegant and refined */}
          <div 
            className="mt-8 md:mt-12 hero-fade-in-delay-2"
            style={scrollProgress > 0 ? { opacity: contentOpacity } : undefined}
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
    </section>
  );
}
