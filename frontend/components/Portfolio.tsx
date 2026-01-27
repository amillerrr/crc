"use client";
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  animate,
  MotionValue
} from 'framer-motion';
import Reveal from './Reveal';
import { portfolioConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

/**
 * ============================================
 * PORTFOLIO SECTION
 * ============================================
 * 
 * Horizontal draggable gallery showcasing selected works.
 * Features perspective-based scaling for center focus effect.
 * 
 * Configuration is pulled from @/config/sections.config.ts
 */

const baseProjects = [
  { id: 1, client: "L'Oréal Paris", title: "Women of Worth", category: "Gala Production", image: "/portfolio/loreal-gala.webp" },
  { id: 2, client: "SportsCenter", title: "Top 10 Anniversary", category: "Brand Activation", image: "/portfolio/sc-booth.webp" },
  { id: 3, client: "Giorgio Armani", title: "Beauty Launch", category: "Product Reveal", image: "/portfolio/armani-launch.webp" },
  { id: 4, client: "Fabelfruit", title: "Immersive Garden", category: "Set Design", image: "/portfolio/whimsical-set.webp" },
  { id: 5, client: "Private Client", title: "Gala Evening", category: "Event Production", image: "/portfolio/lumina-dinner.webp" },
  { id: 6, client: "Celsius", title: "Live Fit Tour", category: "Concert Stage", image: "/portfolio/celsius-concert.webp" },
  { id: 7, client: "Tatcha", title: "Forest Immersion", category: "Brand Environment", image: "/portfolio/tatcha-forest.webp" },
];

// Triple the projects for infinite scroll effect
const projects = [...baseProjects, ...baseProjects, ...baseProjects];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ width: 0, center: 0 });
  const x = useMotionValue(0);
  
  // Use config breakpoint
  const { isMobile } = useBreakpoint(portfolioConfig.breakpoint);
  
  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(portfolioConfig, isMobile);
  
  const updateLayout = useCallback(() => {
    if (containerRef.current) {
      const width = window.innerWidth;
      setLayout({
        width,
        center: width / 2,
      });
      if (x.get() === 0) {
        x.set(isMobile ? -200 : -500);
      }
    }
  }, [x, isMobile]);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  const handleScroll = (direction: 'left' | 'right') => {
    const currentX = x.get();
    const moveAmount = isMobile ? 250 : 300; 
    const newX = direction === 'left' ? currentX + moveAmount : currentX - moveAmount;
    
    animate(x, newX, {
      type: "spring",
      stiffness: 250, 
      damping: 40
    });
  };

  // Generate inline styles from config
  const sectionStyle: React.CSSProperties = {
    paddingTop: viewportConfig.spacing.paddingTop,
    paddingBottom: viewportConfig.spacing.paddingBottom,
    minHeight: viewportConfig.dimensions.minHeight,
    height: viewportConfig.dimensions.height,
  };

  const headerStyle: React.CSSProperties = {
    paddingLeft: viewportConfig.spacing.paddingX,
    paddingRight: viewportConfig.spacing.paddingX,
  };

  return (
    <section
      id="portfolio"
      className="snap-section bg-carmel-bg overflow-hidden flex flex-col relative"
      style={sectionStyle}
      ref={containerRef}
      aria-labelledby="portfolio-heading"
    >
      {/* Header */}
      <div 
        className="shrink-0 mb-4 md:mb-8 text-center md:text-left z-10 relative pointer-events-none"
        style={headerStyle}
      >
        <Reveal width="100%">
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-carmel-muted mb-2">
            Selected Works
          </p>
        </Reveal>
        <Reveal width="100%" delay={0.1}>
          <h2 
            id="portfolio-heading"
            className="font-serif text-[length:var(--text-fluid-h2)] text-carmel-text leading-none"
          >
            The Gallery
          </h2>
        </Reveal>
      </div>

      {/* Navigation Arrows */}
      <div 
        className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-2 md:px-8"
        aria-hidden="true"
      >
        <button 
          onClick={() => handleScroll('left')}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center text-carmel-text/30 hover:text-carmel-text transition-colors duration-500 group"
          aria-label="Scroll gallery left"
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="group-hover:-translate-x-1 transition-transform duration-500 ease-out"
            aria-hidden="true"
          >
            <path d="M15 19l-7-7 7-7" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </button>

        <button 
          onClick={() => handleScroll('right')}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center text-carmel-text/30 hover:text-carmel-text transition-colors duration-500 group"
          aria-label="Scroll gallery right"
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="group-hover:translate-x-1 transition-transform duration-500 ease-out"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </button>
      </div>

      {/* Draggable Track */}
      <Reveal width="100%" delay={0.3} type="fade">
        <div 
          className="flex-1 flex items-start pt-8 md:pt-0 md:items-center w-full relative min-h-0 cursor-grab active:cursor-grabbing z-10"
          role="region"
          aria-label="Portfolio gallery - drag to scroll"
        >
          <motion.div 
            className="flex items-center w-max pl-[50vw]"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -3000, right: 500 }} 
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          >
            {projects.map((project, i) => (
              <CarouselItem 
                key={`${project.id}-${i}`} 
                project={project} 
                index={i} 
                parentX={x} 
                layout={layout}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>
      </Reveal>

      {/* Bottom Gradient Fade */}
      <div 
        className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-carmel-bg to-transparent pointer-events-none z-10" 
        aria-hidden="true"
      />
    </section>
  );
}

interface CarouselItemProps {
  project: typeof baseProjects[0];
  index: number;
  parentX: MotionValue<number>;
  layout: { width: number; center: number };
  isMobile: boolean;
}

function CarouselItem({ 
  project, 
  index, 
  parentX, 
  layout,
  isMobile
}: CarouselItemProps) {
  const cardWidth = isMobile ? layout.width * 0.75 : 280; 
  const gap = isMobile ? 20 : 40;
  const itemSize = cardWidth + gap;
  
  const initialOffset = layout.width * 0.5; 
  const itemCenter = initialOffset + (index * itemSize) + (cardWidth / 2);

  const scale = useTransform(parentX, (currentX) => {
    const positionOnScreen = itemCenter + currentX;
    const distanceFromCenter = Math.abs(positionOnScreen - layout.center);
    
    const maxDist = isMobile ? layout.width * 0.6 : 800;
    
    if (distanceFromCenter < maxDist) {
      const maxScale = isMobile ? 1.05 : 1.1;
      const minScale = isMobile ? 0.9 : 0.9;
      return maxScale - (distanceFromCenter / maxDist) * (maxScale - minScale);
    }
    return isMobile ? 0.9 : 0.9;
  });

  const opacity = useTransform(parentX, (currentX) => {
    const positionOnScreen = itemCenter + currentX;
    const distanceFromCenter = Math.abs(positionOnScreen - layout.center);
    
    const fadeStart = isMobile ? layout.width * 0.5 : 300; 
    const fadeEnd = isMobile ? layout.width * 1.2 : 900;
    
    if (distanceFromCenter <= fadeStart) return 1;
    if (distanceFromCenter >= fadeEnd) return 0;
    
    return 1 - ((distanceFromCenter - fadeStart) / (fadeEnd - fadeStart));
  });

  return (
    <motion.article
      style={{ 
        scale, 
        opacity,
        marginRight: `${gap}px`,
        width: `${cardWidth}px`
      }}
      className="relative shrink-0 aspect-[3/4] origin-center"
    >
      <div className="relative w-full h-full overflow-hidden shadow-xl bg-carmel-muted/10 group rounded-sm select-none pointer-events-none">
        <div className="w-full h-full relative">
          <Image
            src={project.image}
            alt={`${project.client} - ${project.title}`}
            fill
            className="object-cover"
            sizes={isMobile ? "80vw" : "280px"}
            draggable={false}
            priority={index === 0}
          />
        </div>
        
        {/* Overlay Text */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <p className="text-[9px] tracking-[0.2em] text-white/90 uppercase mb-1">
            {project.category}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-white leading-none">
            {project.client}
          </h3>
        </div>
      </div>
    </motion.article>
  );
}
