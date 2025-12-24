"use client";
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav background after scrolling past hero
      const threshold = window.innerHeight * 0.45;
      setShowBackground(window.scrollY >= threshold);
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }
    return () => { 
      document.body.style.overflow = ''; 
      document.body.classList.remove('mobile-menu-open');
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
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-carmel-text focus:text-white focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      <nav 
        className={`fixed w-full z-40 py-3 sm:py-4 md:py-6 transition-colors duration-300 ease-out ${
          showBackground ? 'bg-carmel-bg/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 sm:px-6 md:px-12 lg:px-16 flex justify-end items-center">
          
          {/* Hamburger Menu Button - Now visible on ALL screen sizes */}
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="full-screen-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-6 h-px bg-carmel-text transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : 'group-hover:w-8'}`} />
            <span className={`block w-6 h-px bg-carmel-text transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-carmel-text transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : 'group-hover:w-4'}`} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay - Now active for ALL screen sizes */}
      <div
        id="full-screen-menu"
        className={`fixed inset-0 bg-carmel-bg z-[60] flex flex-col items-center justify-center transition-all duration-700 ease-luxury ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Close button inside overlay (Optional, but good for UX) */}
        <button
          className="absolute top-6 right-6 md:top-10 md:right-16 w-12 h-12 flex items-center justify-center cursor-pointer group"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <div className="relative w-8 h-8">
            <span className="absolute top-1/2 left-0 w-8 h-px bg-carmel-text rotate-45 transition-transform duration-300 group-hover:rotate-[135deg]" />
            <span className="absolute top-1/2 left-0 w-8 h-px bg-carmel-text -rotate-45 transition-transform duration-300 group-hover:-rotate-[135deg]" />
          </div>
        </button>

        {/* Menu Links */}
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-serif text-3xl sm:text-4xl md:text-6xl tracking-tight transition-all duration-700 hover:text-carmel-muted ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${100 + i * 100}ms` : '0ms' }}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Contact email at bottom */}
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
