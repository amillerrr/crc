"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const portfolioItems = [
  {
    title: "Solstice Gala",
    category: "Brand Experience",
    image: "https://images.unsplash.com/photo-1519671482502-9759101d4561?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Lumina Launch",
    category: "Product Launch",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Apex Retreat",
    category: "Corporate Event",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Velvet Lounge",
    category: "Pop-up Experience",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Portfolio() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section 
      id="portfolio" 
      className="scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-warm-white" 
      ref={ref}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
        {/* Section header - elegant serif */}
        <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 
            className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Selected Work
          </h2>
        </div>
        
        {/* Portfolio grid - single column on mobile, 2 columns on sm+ */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-10">
          {portfolioItems.map((item, index) => (
            <article 
              key={item.title}
              className={`group cursor-pointer transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4 sm:mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              
              {/* Caption */}
              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-carmel-text/35 mb-1 sm:mb-1.5">
                  {item.category}
                </p>
                <h3 className="font-serif text-base sm:text-lg md:text-xl group-hover:opacity-70 transition-opacity duration-300">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
