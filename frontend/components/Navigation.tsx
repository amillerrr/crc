"use client";
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 100);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
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
      {/* Skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-carmel-text focus:text-white focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6 md:py-8'
        } ${
          hidden && !isOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled ? 'bg-carmel-bg/90 backdrop-blur-md' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/" 
            className="relative font-serif text-lg md:text-xl tracking-tight font-medium transition-opacity duration-300 hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-2"
          >
            <span className="relative">
              Carmel Rose
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="group relative text-[11px] tracking-[0.2em] uppercase text-carmel-text/70 hover:text-carmel-text transition-colors duration-300 py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-px bg-carmel-text scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span 
              className={`block w-6 h-px bg-carmel-text transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-px' : '-translate-y-1'
              }`} 
            />
            <span 
              className={`block w-6 h-px bg-carmel-text transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} 
            />
            <span 
              className={`block w-6 h-px bg-carmel-text transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-px' : 'translate-y-1'
              }`} 
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 bg-carmel-bg z-40 flex flex-col items-center justify-center transition-all duration-700 md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          {/* Decorative lines */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute left-[20%] top-0 bottom-0 w-px bg-carmel-text/[0.04]" />
            <div className="absolute right-[20%] top-0 bottom-0 w-px bg-carmel-text/[0.04]" />
          </div>
          
          <div className="relative flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group relative font-serif text-4xl transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${150 + i * 75}ms` : '0ms' }}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="relative inline-block">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-carmel-text scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                </span>
              </a>
            ))}
          </div>
          
          {/* Contact info in mobile menu */}
          <div 
            className={`absolute bottom-12 text-center transition-all duration-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
          >
            <a 
              href="mailto:hello@carmelrose.com" 
              className="text-[11px] tracking-[0.2em] uppercase text-carmel-text/40 hover:text-carmel-text transition-colors duration-300"
              tabIndex={isOpen ? 0 : -1}
            >
              hello@carmelrose.com
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
