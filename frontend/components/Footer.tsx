"use client";
import Reveal from './Reveal';
import { footerConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isMobile } = useBreakpoint(footerConfig.breakpoint);
  
  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(footerConfig, isMobile);

  // Generate inline styles from config
  const sectionStyle: React.CSSProperties = {
    paddingTop: viewportConfig.spacing.paddingTop,
    paddingBottom: viewportConfig.spacing.paddingBottom,
    minHeight: viewportConfig.dimensions.minHeight,
    height: viewportConfig.dimensions.height,
  };

  const contentStyle: React.CSSProperties = {
    paddingLeft: viewportConfig.spacing.paddingX,
    paddingRight: viewportConfig.spacing.paddingX,
    maxWidth: viewportConfig.dimensions.maxWidth || '1400px',
  };
  
  return (
    <footer 
      className="snap-section bg-carmel-text text-white"
      style={sectionStyle}
    >
      <div 
        className="w-full mx-auto"
        style={contentStyle}
      >
        
        {/* Main Footer Content - Grid Layout */}
        <Reveal width="100%">
          <div className="grid grid-cols-1 md:grid-cols-12 items-start md:items-end border-b border-white/10 pb-6 md:pb-8 gap-6 md:gap-0">
            
            {/* Brand Column */}
            <div className="md:col-span-4 lg:col-span-3 mb-6 md:mb-0">
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-2 tracking-tight">
                Carmel Rose
              </h3>
              <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">
                Collective
              </p>
            </div>
            
            {/* Navigation Column */}
            <nav className="hidden md:flex md:col-span-4 lg:col-span-5 justify-center gap-8 lg:gap-12">
              {['Services', 'Portfolio', 'About', 'Contact'].map((link) => (
                <a 
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[10px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>
            
            {/* Contact Column */}
            <div className="md:col-span-4 lg:col-span-4 md:text-right">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                Los Angeles, California
              </p>
              <a 
                href="mailto:bree@carmelrose.com" 
                className="text-sm md:text-base lg:text-lg hover:text-white/70 transition-colors duration-300"
              >
                bree@carmelrose.com
              </a>
            </div>
          </div>
        </Reveal>
        
        {/* Bottom Row - Copyright & Social */}
        <Reveal width="100%" delay={0.15}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pt-6 md:pt-8">
            
            {/* Copyright */}
            <p className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-white/30 order-2 md:order-1">
              © {currentYear} Carmel Rose Collective. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-6 md:gap-8 order-1 md:order-2">
              <a 
                href="#" 
                className="text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
