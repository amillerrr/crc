"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const portfolioItems = [
  { title: "Women of Worth", client: "L'Oréal Paris", category: "Gala Production", image: "/portfolio/loreal-gala.webp", year: "2024" },
  { title: "Live Fit Experience", client: "Celsius", category: "Brand Activation", image: "/portfolio/celsius-concert.webp", year: "2024" },
  { title: "The Forest Ritual", client: "Tatcha", category: "Immersive Experience", image: "/portfolio/tatcha-forest.webp", year: "2023" },
  { title: "Prisma Glass Launch", client: "Giorgio Armani", category: "Product Launch", image: "/portfolio/armani-launch.webp", year: "2024" },
  { title: "Whimsical World", client: "FabFitFun", category: "Set Fabrication", image: "/portfolio/whimsical-set.webp", year: "2023" },
  { title: "Lumina Night", client: "Private Client", category: "Corporate Dinner", image: "/portfolio/lumina-dinner.webp", year: "2023" },
  { title: "Cali With Love", client: "Influencer Event", category: "Event Design", image: "/portfolio/cali-table.webp", year: "2024" },
  { title: "Top 10 Experience", client: "SportsCenter", category: "Interactive Booth", image: "/portfolio/sc-booth.webp", year: "2024" },
  { title: "Knob Creek Event", client: "Knob Creek", category: "Brand Activation", image: "/portfolio/knob-creek.webp", year: "2024" },
];

export default function Portfolio() {
  // STRICT TRIGGER: Center Screen Only
  const { ref, isInView } = useInView({ 
    threshold: 0.1, 
    rootMargin: '0px 0px -50% 0px' 
  });

  return (
    <section 
      id="portfolio" 
      className="snap-section scroll-mt-0 py-20 bg-carmel-bg" 
      ref={ref}
    >
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16 px-6">
          <h2 className={`font-serif text-5xl sm:text-6xl md:text-8xl text-carmel-text tracking-tight relative inline-block ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}>
            Our Portfolio
            <span 
              className={`absolute bottom-2 left-0 h-[2px] bg-carmel-text/60 transition-all duration-[1.5s] ease-luxury delay-500 ${
                isInView ? 'w-full' : 'w-0'
              }`} 
            />
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 md:gap-y-0">
          {portfolioItems.map((item, index) => (
            <div key={item.title} className="relative group cursor-pointer w-full">
              <div 
                className={`relative aspect-[3/4] w-full overflow-hidden ${isInView ? 'reveal-image-visible' : 'reveal-image-hidden'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={item.image}
                  alt={`${item.client} - ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[2s] ease-luxury group-hover:scale-105"
                />
                
                <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out flex-col items-center justify-center text-center p-8 z-10 backdrop-blur-[2px]">
                  <div className="w-px h-8 bg-white/30 mb-6 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/90 mb-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-150 ease-out">{item.client}</span>
                  <h3 className="font-sans text-3xl md:text-4xl text-white mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out">{item.title}</h3>
                  <span className="font-sans text-2xl text-white/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300 ease-out">{item.category}</span>
                </div>
              </div>

              <div className={`md:hidden flex flex-col items-center text-center mt-6 px-4 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="text-[9px] tracking-[0.2em] uppercase text-carmel-text/40 mb-2">{item.client}</span>
                <h3 className="font-sans text-2xl text-carmel-text mb-1">{item.title}</h3>
                <span className="font-sans text-xl text-carmel-muted">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
