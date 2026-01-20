"use client";
import { useEffect, useState, useRef, useCallback } from 'react';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLogoLocked, setIsLogoLocked] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle scroll for smooth logo animation
  const handleScroll = useCallback(() => {
    // Get the scroll container (body with snap-container class)
    const scrollContainer = document.querySelector('.snap-container');
    const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    
    const lockPoint = window.innerHeight * 0.4;
    const rawProgress = Math.min(scrollY / lockPoint, 1);
    
    // Ease out cubic for smooth deceleration
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    setScrollProgress(easeOutCubic(rawProgress));
    
    // Lock logo when scrolled past hero
    setIsLogoLocked(scrollY > window.innerHeight * 0.5);
  }, []);

  // Setup scroll listener on the snap container
  useEffect(() => {
    const scrollContainer = document.querySelector('.snap-container');
    const target = scrollContainer || window;
    
    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Intersection Observer for detecting when Hero leaves viewport
  // This provides a fallback/enhancement for snap behavior
  useEffect(() => {
    if (!heroRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // When hero is less than 50% visible, lock the logo
        if (entry.intersectionRatio < 0.5) {
          setIsLogoLocked(true);
          setScrollProgress(1);
        } else if (entry.intersectionRatio > 0.8) {
          // When hero is mostly visible, unlock for animation
          setIsLogoLocked(false);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        root: document.querySelector('.snap-container'),
      }
    );

    observerRef.current.observe(heroRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const contentOpacity = Math.max(0, 1 - scrollProgress * 2.5);

  // Calculate logo position based on scroll progress
  const logoTop = isLogoLocked 
    ? 'var(--hero-logo-end-top)'
    : `calc(var(--hero-logo-start-top) - (${scrollProgress} * (var(--hero-logo-start-top) - var(--hero-logo-end-top))))`;
  
  const logoScale = isLogoLocked
    ? 'var(--hero-logo-end-scale)'
    : `calc(var(--hero-logo-start-scale) - (${scrollProgress} * (var(--hero-logo-start-scale) - var(--hero-logo-end-scale))))`;

  return (
    <section 
      ref={heroRef} 
      className="snap-section relative h-screen w-full bg-carmel-bg flex flex-col overflow-hidden"
      style={{
        // @ts-expect-error -- custom properties
        '--scroll-progress': scrollProgress,
        minHeight: '100dvh', // Falls back to 100vh in browsers without dvh support
      }}
    >
      
      {/* Atmosphere */}
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

      {/* Logo Container - Fixed position with smooth transitions */}
      <div 
        className={`fixed left-1/2 z-[250] pointer-events-none hero-logo will-change-transform ${isLogoLocked ? 'hero-logo-transitioning' : ''}`}
        style={{
          top: logoTop,
          transform: `translateX(-50%) translateY(-50%) scale(${logoScale})`,
          transformOrigin: 'center center',
          // Add smooth transition when locked
          transition: isLogoLocked 
            ? 'top 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'none',
        }}
      >
        <div className="hero-fade-in-logo">
          <a href="/" className="block pointer-events-auto hover:opacity-70 transition-opacity duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/CRC-Logo.svg"
              alt="Carmel Rose Collective"
              className="w-[260px] sm:w-[320px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
            />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 relative z-10">
        <div className="w-full max-w-4xl text-center">
          <div className="h-[110px] sm:h-[100px] md:h-[160px] lg:h-[180px]" />
          
          <div className="hero-fade-in-delay-1">
            <p 
              className="mt-8 md:mt-16 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-balance"
              style={{ opacity: contentOpacity }}
            >
              Experiential Marketing &amp; Brand Activation
            </p>
          </div>

          <div className="hero-fade-in-delay-2">
            <div className="mt-8 md:mt-12" style={{ opacity: contentOpacity }}>
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

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: contentOpacity }}
      >
        <span className="text-[9px] tracking-[0.2em] uppercase text-carmel-text/25">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-carmel-text/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
