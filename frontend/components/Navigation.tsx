"use client";
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  // Optimized scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 150;
      const shouldShow = window.scrollY >= threshold;
      
      // Only update state if value changes to prevent re-renders
      setShowBackground(prev => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-carmel-text focus:text-white focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      {/* Main Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 py-3 sm:py-4 md:py-6 transition-colors duration-500 ease-out ${
          showBackground ? 'bg-carmel-bg/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-end items-center">
          
          {/* Hamburger Menu Button */}
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group z-50"
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

      {/* Full Screen Menu Overlay */}
      <div
        id="full-screen-menu"
        className={`fixed inset-0 bg-carmel-bg z-[45] flex flex-col items-center justify-center transition-all duration-700 ease-luxury ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* Menu Links */}
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
