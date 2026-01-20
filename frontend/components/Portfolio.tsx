"use client";
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useAnimationFrame,
  MotionValue
} from 'framer-motion';

// --- DATA ---
const baseProjects = [
  { id: 1, client: "L'Oréal Paris", title: "Women of Worth", category: "Gala Production", image: "/portfolio/loreal-gala.webp" },
  { id: 2, client: "SportsCenter", title: "Top 10 Anniversary", category: "Brand Activation", image: "/portfolio/sc-booth.webp" },
  { id: 3, client: "Giorgio Armani", title: "Beauty Launch", category: "Product Reveal", image: "/portfolio/armani-launch.webp" },
  { id: 4, client: "Fabelfruit", title: "Immersive Garden", category: "Set Design", image: "/portfolio/whimsical-set.webp" },
  { id: 5, client: "Private Client", title: "Gala Evening", category: "Event Production", image: "/portfolio/lumina-dinner.webp" },
  { id: 6, client: "Celsius", title: "Live Fit Tour", category: "Concert Stage", image: "/portfolio/celsius-concert.webp" },
  { id: 7, client: "Tatcha", title: "Forest Immersion", category: "Brand Environment", image: "/portfolio/tatcha-forest.webp" },
];

const projects = [...baseProjects, ...baseProjects, ...baseProjects, ...baseProjects];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // SPEEDS
  const BASE_SPEED = 0.5; 
  const HOVER_SPEED = 0.1; 

  const [isHovered, setIsHovered] = useState(false);
  const [layout, setLayout] = useState({ width: 0, center: 0 });
  const x = useMotionValue(0);
  
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        setLayout({
          width: window.innerWidth,
          center: window.innerWidth / 2,
        });
      }
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useAnimationFrame((time, delta) => {
    // --- COMPACT DIMENSIONS ---
    const isMobile = window.innerWidth < 768;
    // Reduced desktop width to 250px to ensure it fits vertically on laptops
    const cardWidth = isMobile ? 180 : 250; 
    const gap = isMobile ? 16 : 32;
    const itemSize = cardWidth + gap;
    
    const singleSetWidth = itemSize * baseProjects.length;

    const moveBy = isHovered ? HOVER_SPEED : BASE_SPEED;
    let newX = x.get() - moveBy;

    if (newX <= -singleSetWidth) {
      newX = 0;
    }

    x.set(newX);
  });

  return (
    <section 
      id="work" 
      // Reduced to min-h-[70vh] so it doesn't force scroll on smaller screens
      className="snap-start min-h-[70vh] bg-carmel-bg overflow-hidden flex flex-col justify-center relative py-12"
      ref={containerRef}
    >
      {/* Header - Tighter Margins */}
      <div className="shrink-0 px-6 md:px-12 lg:px-16 mb-6 md:mb-8 text-center md:text-left z-10 relative">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-carmel-muted mb-2">
          Selected Works
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-carmel-text leading-none">
          The Gallery
        </h2>
      </div>

      {/* Carousel Track */}
      <div className="flex-1 flex items-center w-full relative min-h-0">
        <motion.div 
          className="flex items-center w-max pl-6 md:pl-16" 
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-carmel-bg to-transparent pointer-events-none" />
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
  
  const cardWidth = isMobile ? 180 : 250;
  const gap = isMobile ? 16 : 32;
  const itemSize = cardWidth + gap;
  
  const paddingOffset = isMobile ? 24 : 64;
  const itemCenter = (index * itemSize) + (cardWidth / 2) + paddingOffset;

  // --- REFINED PHYSICS (WIDER ZONES) --- //
  
  // 1. Scale Logic
  const scale = useTransform(parentX, (x) => {
    const positionOnScreen = itemCenter + x;
    const distanceFromCenter = Math.abs(positionOnScreen - layout.center);
    
    // Scale zone: 600px
    const maxDist = 600;
    if (distanceFromCenter < maxDist) {
      return 1.15 - (distanceFromCenter / maxDist) * (1.15 - 0.9);
    }
    return 0.9;
  });

  // 2. Opacity Logic
  const opacity = useTransform(parentX, (x) => {
    const positionOnScreen = itemCenter + x;
    const distanceFromCenter = Math.abs(positionOnScreen - layout.center);
    
    // Full opacity zone increased to 500px (was 450)
    const fadeStart = 500; 
    const fadeEnd = 1000;
    
    if (distanceFromCenter <= fadeStart) return 1;
    if (distanceFromCenter >= fadeEnd) return 0.3;
    
    const progress = (distanceFromCenter - fadeStart) / (fadeEnd - fadeStart);
    return 1 - (progress * 0.7); 
  });

  // 3. Grayscale Logic (EARLIER FADE IN / LATER FADE OUT)
  // By increasing colorStart to 500, we make the central 1000px of the screen FULL COLOR.
  const grayscale = useTransform(parentX, (x) => {
    const positionOnScreen = itemCenter + x;
    const distanceFromCenter = Math.abs(positionOnScreen - layout.center);

    // Any item within 500px of center is COLOR.
    // Fades to gray between 500px and 900px.
    const colorStart = 500;
    const colorEnd = 900;

    if (distanceFromCenter <= colorStart) return 0; // Full Color
    if (distanceFromCenter >= colorEnd) return 1;   // Full Gray

    return (distanceFromCenter - colorStart) / (colorEnd - colorStart);
  });

  return (
    <motion.div
      style={{ 
        scale, 
        opacity,
        marginRight: `${gap}px`,
        width: `${cardWidth}px`
      }}
      className="relative shrink-0 aspect-[3/4] origin-center cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden shadow-2xl bg-carmel-muted/10 group rounded-sm">
        <motion.div 
          style={{ filter: useTransform(grayscale, v => `grayscale(${v})`) }}
          className="w-full h-full relative"
        >
          <Image
            src={project.image}
            alt={project.client}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 180px, 250px"
            priority={index < 5}
          />
        </motion.div>
        
        {/* Overlay Text */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-[9px] tracking-[0.2em] text-white/90 uppercase mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            {project.category}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-white leading-none translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {project.client}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
