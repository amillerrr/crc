"use client";
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Standard window scroll is correct for html-based snap
      const scrollY = window.scrollY;
      const lockPoint = window.innerHeight * 0.5; // Slow down fade
      const rawProgress = Math.min(scrollY / lockPoint, 1);
      setScrollProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="snap-section relative h-screen w-full bg-carmel-bg flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(180, 160, 140, 0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 -right-24 w-[400px] h-[400px] rounded-full animate-float-slower" style={{ background: 'radial-gradient(circle, rgba(200, 180, 160, 0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Logo Logic */}
      <div 
        className="relative z-10 text-center will-change-transform"
        style={{ 
          transform: `translateY(${scrollProgress * 100}px) scale(${1 - scrollProgress * 0.3})`,
          opacity: 1 - scrollProgress * 1.5
        }}
      >
        <div className="hero-fade-in-logo">
          <img src="/CRC-Logo.svg" alt="Carmel Rose Collective" className="w-[280px] sm:w-[400px] md:w-[600px] h-auto" />
        </div>
        
        <div className="mt-12 hero-fade-in-delay-1">
          <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-carmel-text/40">
            Experiential Marketing &amp; Brand Activation
          </p>
        </div>
      </div>
    </section>
  );
}
