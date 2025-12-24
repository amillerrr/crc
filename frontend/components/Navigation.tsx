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
          {/* Desktop navigation - right aligned, logo is centered separately */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-[10px] tracking-[0.15em] uppercase text-carmel-text/45 hover:text-carmel-text transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <span className="block w-5 h-px bg-carmel-text" />
            <span className="block w-5 h-px bg-carmel-text" />
            <span className="block w-5 h-px bg-carmel-text" />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay - separate from nav for proper z-index layering */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-carmel-bg z-[60] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Close button inside overlay */}
        <button
          className="absolute top-4 right-6 w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <span className="absolute w-5 h-px bg-carmel-text rotate-45" />
          <span className="absolute w-5 h-px bg-carmel-text -rotate-45" />
        </button>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-serif text-2xl sm:text-3xl tracking-tight transition-all duration-500 hover:opacity-60 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${80 + i * 50}ms` : '0ms' }}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Contact email in mobile menu */}
        <a 
          href="mailto:hello@carmelrose.com" 
          className={`absolute bottom-8 sm:bottom-12 text-[10px] tracking-[0.15em] uppercase text-carmel-text/35 transition-all duration-500 hover:text-carmel-text/60 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? '350ms' : '0ms' }}
          tabIndex={isOpen ? 0 : -1}
        >
          hello@carmelrose.com
        </a>
      </div>
    </>
  );
}
