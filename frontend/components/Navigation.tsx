"use client";
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-carmel-text focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <nav 
        className={`fixed w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'bg-carmel-bg/95 backdrop-blur-sm shadow-sm' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="/" className="font-serif text-lg md:text-xl tracking-normal font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-2 rounded">
          Carmel Rose
        </a>

        <div className="hidden md:flex gap-8 uppercase tracking-widest text-xs text-carmel-text">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="hover:opacity-60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-2 rounded px-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span 
            className={`block w-6 h-0.5 bg-carmel-text transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
            }`} 
          />
          <span 
            className={`block w-6 h-0.5 bg-carmel-text transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`} 
          />
          <span 
            className={`block w-6 h-0.5 bg-carmel-text transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
            }`} 
          />
        </button>

        <div
          id="mobile-menu"
          className={`fixed inset-0 bg-carmel-bg z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-serif text-4xl hover:italic transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text rounded px-2 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 75}ms` : '0ms' }}
                tabIndex={isOpen ? 0 : -1}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
