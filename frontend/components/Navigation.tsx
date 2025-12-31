"use client";
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 150;
      const shouldShow = window.scrollY >= threshold;
      setShowBackground(prev => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // "No-Jump" Scroll Locking with Scrollbar Compensation
  useEffect(() => {
    const nav = document.getElementById('main-nav');
    const logo = document.querySelector('.hero-logo') as HTMLElement;
    const body = document.body;
    const doc = document.documentElement;

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - doc.clientWidth;
      body.style.overflow = 'hidden';
      doc.style.overflow = 'hidden';

      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
        if (nav) nav.style.paddingRight = `${scrollbarWidth}px`;
        if (logo) logo.style.left = `calc(50% - ${scrollbarWidth / 2}px)`;
      }
    } else {
      const timeout = setTimeout(() => {
        body.style.overflow = '';
        doc.style.overflow = '';
        body.style.paddingRight = '';
        if (nav) nav.style.paddingRight = '';
        if (logo) logo.style.left = '';
      }, 0);
      return () => clearTimeout(timeout);
    }

    return () => {
      body.style.overflow = '';
      doc.style.overflow = '';
      body.style.paddingRight = '';
      if (nav) nav.style.paddingRight = '';
      if (logo) logo.style.left = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[310] focus:bg-carmel-text focus:text-white focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      {/* Main Navigation Bar */}
      <nav 
        id="main-nav"
        className={`fixed top-0 left-0 w-full py-3 sm:py-4 md:py-6 transition-colors duration-500 ease-out ${
          // Z-INDEX: Higher when open to ensure button is clickable
          isOpen ? 'z-[300]' : 'z-[200]'
        } ${
          // BACKGROUND LOGIC (AWARD WINNING FIX):
          // 1. If Open: Solid Opaque Cream (#F9F8F4). This prevents the "flash" of content underneath.
          // 2. If Scrolled: Translucent Cream (95%).
          // 3. Top of Page: Transparent.
          isOpen 
            ? 'bg-[#F9F8F4]' 
            : (showBackground ? 'bg-[#F9F8F4]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent')
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-end items-center">
          
          <button
            className="relative w-12 h-12 flex flex-col justify-center items-center gap-[6px] group"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="full-screen-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span 
              className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${
                isOpen ? 'rotate-45 translate-y-[7px]' : 'group-hover:w-8'
              }`} 
            />
            <span 
              className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out ${
                isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
              }`} 
            />
            <span 
              className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${
                isOpen ? '-rotate-45 -translate-y-[7px]' : 'group-hover:w-5'
              }`} 
            />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        id="full-screen-menu"
        className={`fixed inset-0 bg-[#F9F8F4] z-[290] flex flex-col items-center justify-center transition-all duration-700 ease-luxury ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-serif text-3xl sm:text-4xl md:text-6xl tracking-tight transition-all duration-700 hover:text-carmel-muted link-underline ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${100 + i * 100}ms` : '0ms' }}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <a 
          href="mailto:hello@carmelrose.com" 
          className={`absolute bottom-12 text-xs md:text-sm tracking-[0.2em] uppercase text-carmel-text/40 hover:text-carmel-text transition-all duration-700 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
          tabIndex={isOpen ? 0 : -1}
        >
          hello@carmelrose.com
        </a>
      </div>
    </>
  );
}
