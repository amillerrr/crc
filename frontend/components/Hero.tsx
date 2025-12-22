"use client";
import { useEffect, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-carmel-bg">
      {/* Subtle grid lines - editorial touch */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-carmel-text/[0.04]" />
        <div className="absolute left-[40%] top-0 bottom-0 w-px bg-carmel-text/[0.04]" />
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-carmel-text/[0.04]" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-carmel-text/[0.04]" />
      </div>

      {/* Large background word - parallax */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-carmel-text/[0.03] pointer-events-none select-none whitespace-nowrap transition-all duration-[2s] ease-out ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px))` }}
        aria-hidden="true"
      >
        Experience
      </div>

      {/* Corner accents */}
      <div className={`absolute top-8 left-8 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <div className="w-20 h-px bg-carmel-text/20" />
        <div className="w-px h-20 bg-carmel-text/20" />
      </div>
      <div className={`absolute top-8 right-8 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <div className="w-20 h-px bg-carmel-text/20 ml-auto" />
        <div className="w-px h-20 bg-carmel-text/20 ml-auto" />
      </div>
      <div className={`absolute bottom-8 left-8 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <div className="w-px h-20 bg-carmel-text/20" />
        <div className="w-20 h-px bg-carmel-text/20" />
      </div>
      <div className={`absolute bottom-8 right-8 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
        <div className="w-px h-20 bg-carmel-text/20 ml-auto" />
        <div className="w-20 h-px bg-carmel-text/20 ml-auto" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Established line */}
        <div 
          className={`flex items-center gap-6 mb-10 transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <div className={`h-px bg-carmel-text/30 transition-all duration-1000 delay-300 ${loaded ? 'w-16' : 'w-0'}`} />
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-carmel-text/50">
            Est. 2025
          </span>
          <div className={`h-px bg-carmel-text/30 transition-all duration-1000 delay-300 ${loaded ? 'w-16' : 'w-0'}`} />
        </div>

        {/* Main logo */}
        <h1 
          className={`mb-8 transition-all duration-[1.2s] ease-out delay-150 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ 
            filter: loaded ? 'blur(0)' : 'blur(8px)',
            transition: 'opacity 1.2s ease-out 150ms, transform 1.2s ease-out 150ms, filter 1.2s ease-out 150ms'
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CRC-Logo.svg"
            alt="Carmel Rose Collective"
            className="w-[300px] h-auto sm:w-[380px] md:w-[500px] lg:w-[640px] xl:w-[780px] mx-auto"
          />
        </h1>

        {/* Tagline */}
        <p 
          className={`font-sans text-[13px] md:text-[14px] tracking-[0.2em] text-carmel-text/50 text-center mb-14 transition-all duration-1000 ease-out delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Crafting Unforgettable Brand Experiences
        </p>

        {/* CTA */}
        <div 
          className={`transition-all duration-1000 ease-out delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a 
            href="#services"
            className="group relative inline-flex items-center"
          >
            {/* Left line */}
            <span className="w-16 h-px bg-carmel-text/20 mr-6 transition-all duration-500 origin-right group-hover:scale-x-50 group-hover:bg-carmel-text/40" />
            
            {/* Button */}
            <span className="relative px-12 py-5 text-[10px] tracking-[0.3em] uppercase overflow-hidden border border-carmel-text/20 transition-all duration-500 group-hover:border-carmel-text/40">
              <span className="absolute inset-0 bg-carmel-text origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              <span className="relative z-10 transition-colors duration-500 delay-100 group-hover:text-carmel-bg">
                Discover Our Work
              </span>
            </span>
            
            {/* Right line */}
            <span className="w-16 h-px bg-carmel-text/20 ml-6 transition-all duration-500 origin-left group-hover:scale-x-50 group-hover:bg-carmel-text/40" />
          </a>
        </div>
      </div>

      {/* Bottom scroll indicator - properly positioned */}
      <div 
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 delay-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-carmel-text/35 mb-4">
          Scroll
        </span>
        <div className="relative w-px h-10 bg-carmel-text/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-carmel-text/40 animate-scroll-pulse" />
        </div>
      </div>

      {/* Side labels - editorial magazine style */}
      <div 
        className={`hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 items-center gap-4 transition-all duration-1000 delay-[1100ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-8 h-px bg-carmel-text/20" />
        <span 
          className="text-[9px] tracking-[0.3em] uppercase text-carmel-text/30 origin-center -rotate-90 whitespace-nowrap"
        >
          Experiential Marketing
        </span>
      </div>

      <div 
        className={`hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 items-center gap-4 transition-all duration-1000 delay-[1100ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span 
          className="text-[9px] tracking-[0.3em] uppercase text-carmel-text/30 origin-center rotate-90 whitespace-nowrap"
        >
          Brand Activation
        </span>
        <div className="w-8 h-px bg-carmel-text/20" />
      </div>
    </section>
  );
}
