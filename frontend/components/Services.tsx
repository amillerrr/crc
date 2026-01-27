"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { servicesConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

/**
 * ============================================
 * SERVICES SECTION
 * ============================================
 * 
 * Showcases the company's core services.
 * 
 * IMPORTANT: This is the first section below the fixed header.
 * - paddingTop is set to header height (from config)
 * - This pushes content below the overlaying fixed header
 * 
 * HEIGHT CONTROL:
 * - minHeight is controlled via servicesConfig in sections.config.ts
 * - The hero area (h-[25vh] md:h-[30vh]) is INSIDE the section
 * - To make section shorter: reduce minHeight in config AND/OR hero height here
 */

const subCategories = [
  { 
    id: 'brand-activation',
    title: "Brand Activation", 
    description: "We transform brand narratives into tangible, multi-sensory experiences. By merging strategy with soul, we create moments that forge lasting emotional connections."
  },
  { 
    id: 'event-production',
    title: "Event Production", 
    description: "From initial concept to flawless execution, we craft occasions that transcend the expected. Our technical precision ensures every detail contributes to a seamless narrative."
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const { isMobile } = useBreakpoint(servicesConfig.breakpoint);
  
  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(servicesConfig, isMobile);

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

  return (
    <section
      id="services"
      className="snap-section bg-carmel-bg relative overflow-hidden"
      style={sectionStyle}
      aria-labelledby="services-heading"
    >
      {/* 
        Hero-like opening area 
        ADJUST THESE VALUES to control how much vertical space the title takes:
        - h-[25vh] = 25% viewport height on mobile
        - md:h-[30vh] = 30% viewport height on desktop
        
        MAKE SECTION SHORTER: Reduce these values (e.g., h-[20vh] md:h-[25vh])
        MAKE SECTION TALLER: Increase these values (e.g., h-[35vh] md:h-[40vh])
      */}
      <div className="h-[25vh] md:h-[30vh] flex items-end justify-center pb-6 md:pb-8">
        <Reveal>
          <div className="text-center">
            <span className="block text-[10px] tracking-[0.2em] uppercase text-carmel-muted mb-3">
              Our Expertise
            </span>
            <h2 
              id="services-heading"
              className="font-serif text-[length:var(--text-fluid-h1)] text-carmel-text tracking-tight leading-tight"
            >
              Experiential Marketing
            </h2>
          </div>
        </Reveal>
      </div>
      
      {/* Main Content */}
      <div 
        className="max-w-7xl mx-auto relative z-10 w-full"
        style={contentStyle}
      >
        {/* Tagline */}
        <div className="text-center mb-8 md:mb-12">
          <div className="max-w-2xl mx-auto">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-carmel-text/60 leading-relaxed">
                We engineer strategic campaigns that ignite conversation and drive meaningful engagement.
              </p>
            </Reveal>
          </div>
          
          <Reveal delay={0.3}>
            <div className="mt-6 w-12 h-px bg-carmel-text/15 mx-auto" aria-hidden="true" />
          </Reveal>
        </div>

        {/* Services Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative"
          role="list"
          aria-label="Our services"
        >
          {/* Vertical Divider (Desktop) */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-carmel-text/10 -translate-x-1/2 origin-top"
            aria-hidden="true"
          />

          {subCategories.map((service, index) => (
            <Reveal
              key={service.id}
              type={index === 0 ? "slide-right" : "slide-left"}
              delay={0.4 + (index * 0.2)}
              width="100%"
            >
              <article
                className="flex flex-col items-center text-center py-6"
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                role="listitem"
              >
                <h3 className="font-serif text-2xl md:text-3xl text-carmel-text mb-3 relative inline-block w-fit cursor-default">
                  {service.title}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-carmel-text w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeService === index ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                </h3>
                <p className="text-sm md:text-base text-carmel-text/70 leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA Link */}
        <Reveal delay={0.8}>
          <div className="text-center mt-8 md:mt-10">
            <a 
              href="#portfolio"
              className="group inline-block text-[10px] tracking-[0.15em] uppercase text-carmel-text/40 hover:text-carmel-text/60 transition-colors duration-500"
            >
              <span className="pb-1.5 border-b border-carmel-text/15 group-hover:border-carmel-text/30 transition-colors duration-500">
                View Our Work
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
