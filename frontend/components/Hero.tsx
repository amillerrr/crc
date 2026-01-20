"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  // We use refs to manipulate the DOM directly for high-performance animations
  // This avoids React state updates (re-renders) during the scroll loop
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestID: number;

    const animate = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Calculate progress (0 to 1) based on first 70% of viewport
      const lockPoint = vh * 0.70;
      const progress = Math.min(scrollY / lockPoint, 1);

      // --- LOGO ANIMATION VARIABLES ---
      // Matches your CSS variables: 40vh start -> 40px end
      const startTop = vh * 0.40;
      // Adjust end position based on screen width (mobile vs desktop)
      const isDesktop = window.innerWidth >= 768;
      const endTop = isDesktop ? 40 : 42; 
      
      // Scale: 1.0 -> 0.32 (desktop) or 0.60 (mobile)
      const startScale = 1;
      const endScale = isDesktop ? 0.32 : 0.60;

      // Calculate current values
      const currentTop = startTop - (progress * (startTop - endTop));
      const currentScale = startScale - (progress * (startScale - endScale));

      // Apply transforms directly to the DOM element
      if (logoRef.current) {
        logoRef.current.style.top = `${currentTop}px`;
        logoRef.current.style.transform = `translateX(-50%) translateY(-50%) scale(${currentScale})`;
      }

      // --- TEXT OPACITY ANIMATION ---
      if (textRef.current) {
        const opacity = Math.max(0, 1 - progress * 2.5);
        textRef.current.style.opacity = opacity.toString();
        // Optimization: Hide element when invisible to prevent paint overlap
        textRef.current.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
      }

      requestID = requestAnimationFrame(animate);
    };

    // Start the loop
    requestID = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestID);
  }, []);

  return (
    <section 
      // snap-start can remain as a hint, but strict enforcement is gone
      className="snap-start relative h-screen w-full bg-carmel-bg flex flex-col overflow-hidden"
    >
      
      {/* Atmosphere / Background Gradients */}
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

      {/* Logo Container - Optimized */}
      <div 
        ref={logoRef}
        className="fixed left-1/2 z-[920] pointer-events-none hero-logo will-change-transform"
        style={{
          // Initial State (Server Side Safe)
          top: '40vh',
          transform: 'translateX(-50%) translateY(-50%) scale(1)',
        }}
      >
        <div className="hero-fade-in-logo">
          <a href="/" className="block pointer-events-auto hover:opacity-70 transition-opacity duration-200">
            {/* FIX: Replaced <img> with Next.js <Image> for LCP optimization */}
            <Image
              src="/CRC-Logo.svg"
              alt="Carmel Rose Collective"
              width={700} // Matches your xl:w-[700px]
              height={700} // Assuming square ratio based on viewBox 0 0 375 375
              priority
              className="w-[260px] sm:w-[320px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto"
            />
          </a>
        </div>
      </div>

      {/* Content Container */}
      <div 
        ref={textRef}
        className="flex-1 flex items-center justify-center px-6 md:px-12 relative z-10 will-change-opacity"
      >
        <div className="w-full max-w-4xl text-center">
          {/* Spacer to push text below the logo's initial position */}
          <div className="h-[110px] sm:h-[100px] md:h-[160px] lg:h-[180px]" />
          
          <div className="hero-fade-in-delay-1">
            <p className="mt-8 md:mt-16 text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-carmel-text/35 text-balance">
              Experiential Marketing &amp; Brand Activation
            </p>
          </div>

          <div className="hero-fade-in-delay-2">
            <div className="mt-8 md:mt-12">
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
