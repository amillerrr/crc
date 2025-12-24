"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const portfolioItems = [
  {
    title: "Women of Worth",
    client: "L'Oréal Paris",
    category: "Gala Production",
    image: "/portfolio/loreal-gala.webp",
    year: "2024"
  },
  {
    title: "Live Fit Experience",
    client: "Celsius",
    category: "Brand Activation",
    image: "/portfolio/celsius-concert.webp",
    year: "2024"
  },
  {
    title: "The Forest Ritual",
    client: "Tatcha",
    category: "Immersive Experience",
    image: "/portfolio/tatcha-forest.webp",
    year: "2023"
  },
  {
    title: "Prisma Glass Launch",
    client: "Giorgio Armani",
    category: "Product Launch",
    image: "/portfolio/armani-launch.webp",
    year: "2024"
  },
  {
    title: "Whimsical World",
    client: "FabFitFun",
    category: "Set Fabrication",
    image: "/portfolio/whimsical-set.webp",
    year: "2023"
  },
  {
    title: "Lumina Night",
    client: "Private Client",
    category: "Corporate Dinner",
    image: "/portfolio/lumina-dinner.webp",
    year: "2023"
  },
  {
    title: "Cali With Love",
    client: "Influencer Event",
    category: "Event Design",
    image: "/portfolio/cali-table.webp",
    year: "2024"
  },
  {
    title: "Top 10 Experience",
    client: "SportsCenter",
    category: "Interactive Booth",
    image: "/portfolio/sc-booth.webp",
    year: "2024"
  },
];

export default function Portfolio() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section 
      id="portfolio" 
      className="scroll-mt-20 py-20 bg-carmel-bg" 
      ref={ref}
    >
      <div className="w-full max-w-[1920px] mx-auto">
        
        {/* Minimalist Header */}
        <div className="flex flex-col items-center text-center mb-16 px-6">
          <span className={`font-italianno text-3xl text-carmel-muted mb-2 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Selected Works
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl md:text-6xl text-carmel-text tracking-tight transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our Portfolio
          </h2>
        </div>
        
        {/* Gapless Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-0 space-y-0">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.title}
              className={`relative break-inside-avoid group cursor-pointer overflow-hidden w-full transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.image}
                  alt={`${item.client} - ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.5s] ease-luxury group-hover:scale-105"
                />
                
                {/* Cinema Overlay - Fixed "Pop" Issue using transition-all and explicit duration */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center p-8 z-10">
                  
                  <div className="w-px h-8 bg-white/30 mb-6 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out" />
                  
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-150 ease-out">
                    {item.client}
                  </span>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out">
                    {item.title}
                  </h3>
                  
                  <span className="font-italianno text-2xl text-white/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300 ease-out">
                    {item.category}
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
