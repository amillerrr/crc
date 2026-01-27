"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis, useLenisScroll } from './LenisProvider';
import { DEFAULT_BREAKPOINT, getResponsiveConfig, servicesConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface NavigationProps {
  isVisible: boolean;
}

export default function Navigation({ isVisible }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { lenis } = useLenis();
  const { isMobile } = useBreakpoint(DEFAULT_BREAKPOINT);
  
  // Get paddingX from config for consistent spacing
  const viewportConfig = getResponsiveConfig(servicesConfig, isMobile);

  // Handle scroll for background visibility
  const handleScroll = useCallback(({ scroll }: { scroll: number }) => {
    const threshold = 100;
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
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  // Handle anchor link clicks with Lenis smooth scroll
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

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
      <motion.nav
        className={`fixed top-0 left-0 w-full py-2 md:py-3 z-[910] transition-colors duration-500 ease-out ${
          isOpen ? 'bg-transparent' : (showBackground ? 'bg-carmel-bg/95 backdrop-blur-sm shadow-sm' : 'bg-transparent')
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : -20 
        }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <div 
          className="flex justify-end items-center"
          style={{ 
            paddingLeft: viewportConfig.spacing.paddingX,
            paddingRight: viewportConfig.spacing.paddingX
          }}
        >
          <button
            className="relative w-10 h-10 flex flex-col justify-center items-center gap-[5px] group"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-6 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-[6px]' : 'group-hover:w-7'}`} />
            <span className={`block w-6 h-px bg-carmel-text transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-px bg-carmel-text transition-all duration-300 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-[6px]' : 'group-hover:w-4'}`} />
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-carmel-bg z-[900] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex flex-col items-center gap-8 md:gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-serif text-3xl sm:text-4xl md:text-6xl tracking-tight hover:text-carmel-muted transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.08,
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
