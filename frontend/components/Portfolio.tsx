"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

// Data mapping for your uploaded images
const portfolioItems = [
  {
    title: "Women of Worth",
    client: "L'Oréal Paris",
    category: "Gala Production",
    image: "/portfolio/loreal-gala.webp", // Formerly HA8A4711.jpg
    year: "2024"
  },
  {
    title: "Live Fit Experience",
    client: "Celsius",
    category: "Brand Activation",
    image: "/portfolio/celsius-concert.webp", // Formerly C6BA74EB...
    year: "2024"
  },
  {
    title: "The Forest Ritual",
    client: "Tatcha",
    category: "Immersive Experience",
    image: "/portfolio/tatcha-forest.webp", // Formerly fFBoWvg...webp
    year: "2023"
  },
  {
    title: "Prisma Glass Launch",
    client: "Giorgio Armani",
    category: "Product Launch",
    image: "/portfolio/armani-launch.webp", // Formerly IMG_5547.jpg
    year: "2024"
  },
  {
    title: "Whimsical World",
    client: "FabFitFun",
    category: "Set Fabrication",
    image: "/portfolio/whimsical-set.webp", // Formerly IMG_8800.jpg
    year: "2023"
  },
  {
    title: "Lumina Night",
    client: "Private Client",
    category: "Corporate Dinner",
    image: "/portfolio/lumina-dinner.webp", // Formerly HA8A4990.jpg
    year: "2023"
  },
  {
    title: "Cali With Love",
    client: "Influencer Event",
    category: "Event Design",
    image: "/portfolio/cali-table.webp", // Formerly IMG_3151.jpg
    year: "2024"
  },
  {
    title: "Top 10 Experience",
    client: "SportsCenter",
    category: "Interactive Booth",
    image: "/portfolio/sc-booth.webp", // Formerly IMG_1102.jpg
    year: "2024"
  },
];

export default function Portfolio() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section 
      id="portfolio" 
      className="scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-warm-white" 
      ref={ref}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 md:mb-24 gap-6">
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
              Selected Work
            </h2>
            <p className="text-carmel-text/60 text-sm sm:text-base max-w-md leading-relaxed">
              Curating unforgettable moments where brand strategy meets artistic execution.
            </p>
          </div>
          
          <div className={`hidden md:block mb-2 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
             <span className="text-[10px] tracking-[0.2em] uppercase text-carmel-text/40">
               Scroll to Explore
             </span>
          </div>
        </div>
        
        {/* Editorial Grid Layout 
           We use a 2-column grid, but we apply a margin-top to every even item 
           on desktop to create a staggered, 'masonry' feel.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-0">
          {portfolioItems.map((item, index) => {
            // Determine column offset for the "staggered" look
            const isRightColumn = index % 2 !== 0;
            
            return (
              <article 
                key={item.title}
                className={`group cursor-pointer mb-0 md:mb-24 transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${isRightColumn ? 'md:mt-24' : ''}`} // Stagger right column down
                style={{ transitionDelay: `${100 + (index % 2) * 150}ms` }}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-carmel-text/5">
                  <Image
                    src={item.image}
                    alt={`${item.client} - ${item.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-luxury group-hover:scale-[1.03]"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Content */}
                <div className="flex justify-between items-start border-t border-carmel-text/10 pt-4">
                  <div>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-carmel-text/40 mb-2">
                      {item.client}
                    </p>
                    <h3 className="font-serif text-xl sm:text-2xl text-carmel-text group-hover:text-carmel-text/70 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-carmel-text/50 mt-1 font-light">
                      {item.category}
                    </p>
                  </div>
                  
                  <span className="text-[10px] tracking-[0.1em] text-carmel-text/30 pt-1 group-hover:translate-x-1 transition-transform duration-300">
                    {item.year}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
