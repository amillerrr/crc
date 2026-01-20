"use client";
import { useState, useEffect } from 'react';
import { useScroll } from '@/context/ScrollContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { lenis } = useScroll(); // ACCESS LENIS CONTEXT

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 450;
      const shouldShow = window.scrollY >= threshold;
      setShowBackground(prev => prev !== shouldShow ? shouldShow : prev);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODERN SCROLL LOCKING
  // Instead of manipulating DOM styles, we just pause the scroll engine.
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full py-4 z-[300] transition-colors duration-500 ease-out ${
          isOpen ? 'bg-[#F9F8F4]' : (showBackground ? 'bg-[#F9F8F4]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent')
        }`}
      >
        <div className="px-6 md:px-12 lg:px-16 flex justify-end items-center">
          <button
            className="relative w-12 h-12 flex flex-col justify-center items-center gap-[6px] group"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : 'group-hover:w-8'}`} />
            <span className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
            <span className={`block w-7 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : 'group-hover:w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-[#F9F8F4] z-[290] flex flex-col items-center justify-center transition-all duration-700 ease-luxury ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
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
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
