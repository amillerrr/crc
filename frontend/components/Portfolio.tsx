"use client";
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  animate,
  MotionValue
} from 'framer-motion';

const baseProjects = [
  { id: 1, client: "L'Oréal Paris", title: "Women of Worth", category: "Gala Production", image: "/portfolio/loreal-gala.webp" },
  { id: 2, client: "SportsCenter", title: "Top 10 Anniversary", category: "Brand Activation", image: "/portfolio/sc-booth.webp" },
  { id: 3, client: "Giorgio Armani", title: "Beauty Launch", category: "Product Reveal", image: "/portfolio/armani-launch.webp" },
  { id: 4, client: "Fabelfruit", title: "Immersive Garden", category: "Set Design", image: "/portfolio/whimsical-set.webp" },
  { id: 5, client: "Private Client", title: "Gala Evening", category: "Event Production", image: "/portfolio/lumina-dinner.webp" },
  { id: 6, client: "Celsius", title: "Live Fit Tour", category: "Concert Stage", image: "/portfolio/celsius-concert.webp" },
  { id: 7, client: "Tatcha", title: "Forest Immersion", category: "Brand Environment", image: "/portfolio/tatcha-forest.webp" },
];

const projects = [...baseProjects, ...baseProjects, ...baseProjects];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ width: 0, center: 0 });
  const x = useMotionValue(0);
  
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        setLayout({
          width: window.innerWidth,
          center: window.innerWidth / 2,
        });
        if (x.get() === 0) {
           x.set(window.innerWidth < 768 ? -200 : -500);
        }
      }
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [x]);

  const handleScroll = (direction: 'left' | 'right') => {
    const currentX = x.get();
    const moveAmount = window.innerWidth < 768 ? 250 : 300; 
    const newX = direction === 'left' ? currentX + moveAmount : currentX - moveAmount;
    
    animate(x, newX, {
      type: "spring",
      stiffness: 250, // Slightly softer spring for elegance
      damping: 40
    });
  };

  return (
    <section 
      id="portfolio" 
      className="snap-section bg-carmel-bg overflow-hidden flex flex-col pt-32 pb-12 relative"
      ref={containerRef}
    >
      {/* Header */}
      <div className="shrink-0 px-6 md:px-12 lg:px-16 mb-4 md:mb-8 text-center md:text-left z-10 relative pointer-events-none">
        <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-carmel-muted mb-2">
          Selected Works
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-carmel-text leading-none">
          The Gallery
        </h2>
      </div>

      {/* Navigation Arrows - Minimalist & Elegant */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-2 md:px-8">
        <button 
          onClick={() => handleScroll('left')}
          // Removed background/border for a cleaner "floating" look. Increased icon size.
          className="pointer-events-auto w-16 h-16 flex items-center justify-center text-carmel-text/30 hover:text-carmel-text transition-colors duration-500 group"
          aria-label="Scroll Left"
        >
          {/* Ultra-thin elegant chevron */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="group-hover:-translate-x-1 transition-transform duration-500 ease-out">
            <path d="M15 19l-7-7 7-7" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </button>

        <button 
          onClick={() => handleScroll('right')}
          className="pointer-events-auto w-16 h-16 flex items-center justify-center text-carmel-text/30 hover:text-carmel-text transition-colors duration-500 group"
          aria-label="Scroll Right"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="group-hover:translate-x-1 transition-transform duration-500 ease-out">
            <path d="M9 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
        </button>
      </div>

      {/* Draggable Track */}
      <div className="flex-1 flex items-center w-full relative min-h-0 cursor-grab active:cursor-grabbing z-10">
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
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-carmel-bg to-transparent pointer-events-none z-10" />
    </section>
  );
}

function CarouselItem({ 
  project, 
  index, 
  parentX, 
  layout 
}: { 
  project: typeof baseProjects[0], 
  index: number, 
  parentX: MotionValue<number>, 
  layout: { width: number, center: number }
}) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  
  const cardWidth = isMobile ? layout.width * 0.75 : 280; 
  const gap = isMobile ? 20 : 40;
  const itemSize = cardWidth + gap;
  
  const initialOffset = layout.width * 0.5; 
  const itemCenter = initialOffset + (index * itemSize) + (cardWidth / 2);

  // --- PHYSICS ---
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

  // --- TRANSPARENCY FADE (New Logic) ---
  const opacity = useTransform(parentX, (currentX) => {
    const positionOnScreen = itemCenter + currentX;
    const distanceFromCenter = Math.abs(positionOnScreen - layout.center);
    
    // Tighter zones for opacity to ensure ends are transparent
    const fadeStart = isMobile ? layout.width * 0.3 : 300; 
    const fadeEnd = isMobile ? layout.width * 0.8 : 900;
    
    // Center is fully visible (1)
    if (distanceFromCenter <= fadeStart) return 1;
    // Edges are fully transparent (0) - previously was 0.2
    if (distanceFromCenter >= fadeEnd) return 0;
    
    return 1 - ((distanceFromCenter - fadeStart) / (fadeEnd - fadeStart));
  });

  // Removed Grayscale Logic entirely
  
  return (
    <motion.div
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
            alt={project.client}
            fill
            className="object-cover"
            sizes={isMobile ? "80vw" : "280px"}
            draggable={false}
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
    </motion.div>
  );
}
