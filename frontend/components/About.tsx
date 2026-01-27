"use client";
import Reveal from './Reveal';
import { aboutConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

/**
 * ============================================
 * ABOUT SECTION
 * ============================================
 * 
 * Features the founder's story and company philosophy.
 * Configuration is pulled from @/config/sections.config.ts
 */

export default function About() {
  const { isMobile } = useBreakpoint(aboutConfig.breakpoint);
  
  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(aboutConfig, isMobile);

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
  };

  // Determine justify based on viewport (replaces md:justify-center)
  const justifyClass = isMobile ? 'justify-start' : 'justify-center';

  return (
    <section
      id="about"
      className={`snap-section w-full bg-carmel-bg flex flex-col ${justifyClass} items-center overflow-hidden`}
      style={sectionStyle}
      aria-labelledby="about-heading"
    >
      <div 
        className={`max-w-4xl mx-auto w-full text-center flex flex-col ${justifyClass} h-full`}
        style={contentStyle}
      >
        
        {/* Divider */}
        <Reveal width="100%">
          <div className="w-12 h-px bg-carmel-text/20 mx-auto mb-6 md:mb-10" aria-hidden="true" />
        </Reveal>
        
        {/* Main Quote */}
        <Reveal type="fade" delay={0.1} width="100%">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-5xl text-carmel-text leading-tight mb-6 md:mb-10">
            <span id="about-heading">
              We create experiences that people feel long after they leave.
            </span>
          </blockquote>
        </Reveal>
        
        {/* Paragraphs */}
        <Reveal type="fade" delay={0.3} width="100%">
          <div className="text-carmel-text/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed space-y-4 md:space-y-6">
            <p>
              Carmel Rose Collective was founded by Los Angeles native Bree Chenelia to bring together what she does best: design forward experiences executed with precision, calm, and an uncompromising eye for detail.
            </p>
            <p className="hidden sm:block">
              With more than a decade in events and experiential marketing, Bree built her career from the ground up—earning a reputation as the go-to partner for high stakes projects.
            </p>
          </div>
        </Reveal>

        {/* Footer info */}
        <Reveal type="fade" delay={0.5} width="100%">
          <footer className="mt-8 md:mt-12">
            <p className="font-serif text-lg md:text-xl text-carmel-text">Bree Chenelia</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-carmel-muted mt-2">Founder</p>
          </footer>
        </Reveal>

      </div>
    </section>
  );
}
