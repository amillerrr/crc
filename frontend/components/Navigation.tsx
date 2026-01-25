"use client";
import { useState, useEffect, useCallback } from 'react';
import { useLenis, useLenisScroll } from './LenisProvider';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { lenis } = useLenis();

  // Handle scroll for background visibility using Lenis
  const handleScroll = useCallback(({ scroll }: { scroll: number }) => {
    const threshold = 450;
    const shouldShow = scroll >= threshold;
    setShowBackground(prev => prev !== shouldShow ? shouldShow : prev);
  }, []);

  useLenisScroll(handleScroll);

  // Lenis-aware scroll locking for menu
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isOpen, lenis]);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  // Handle anchor link clicks with Lenis smooth scroll
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      lenis?.scrollTo(href, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }, 100);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full py-4 z-[910] transition-colors duration-500 ease-out ${
          isOpen ? 'bg-transparent' : (showBackground ? 'bg-carmel-bg/95 backdrop-blur-sm shadow-sm' : 'bg-transparent')
        }`}
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-end items-center">
          <button
            className="relative w-12 h-12 flex flex-col justify-center items-center gap-[6px] group"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {/* Hamburger Lines */}
            <span className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : 'group-hover:w-8'}`} />
            <span className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
            <span className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : 'group-hover:w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-carmel-bg z-[900] flex flex-col items-center justify-center transition-all duration-700 ease-luxury ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`font-serif text-3xl sm:text-4xl md:text-6xl tracking-tight transition-all duration-700 hover:text-carmel-muted link-underline ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${100 + i * 100}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

