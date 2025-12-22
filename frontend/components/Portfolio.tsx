"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const portfolioItems = [
  {
    title: "Solstice Gala",
    category: "Brand Experience",
    year: "2024",
    image: "https://images.unsplash.com/photo-1519671482502-9759101d4561?auto=format&fit=crop&q=80&w=800",
    size: "normal",
  },
  {
    title: "Lumina Launch",
    category: "Product Launch",
    year: "2024",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    size: "tall",
  },
  {
    title: "Apex Retreat",
    category: "Corporate Event",
    year: "2024",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800",
    size: "normal",
  },
  {
    title: "Velvet Lounge",
    category: "Pop-up Experience",
    year: "2023",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800",
    size: "normal",
  },
  {
    title: "Echo Chamber",
    category: "Immersive Installation",
    year: "2023",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    size: "normal",
  },
];

export default function Portfolio() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.05 });

  return (
    <section id="portfolio" className="py-32 md:py-40 bg-white overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto mb-20" ref={headerRef}>
        <div className="flex items-center justify-between mb-6">
          <span 
            className={`font-sans text-[10px] tracking-[0.4em] uppercase text-carmel-text/40 animate-fade-up ${
              headerInView ? 'in-view' : ''
            }`}
          >
            Portfolio
          </span>
          <div 
            className={`flex-grow mx-6 h-px bg-carmel-text/10 animate-line-draw ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          />
          <span 
            className={`font-sans text-[10px] tracking-[0.4em] uppercase text-carmel-text/40 animate-fade-up ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            Selected Works
          </span>
        </div>
        
        <div className="text-center">
          <h2 
            className={`font-serif text-4xl md:text-5xl lg:text-6xl mb-4 animate-blur-reveal ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '150ms' }}
          >
            Moments We&apos;ve Crafted
          </h2>
          <p 
            className={`font-script text-3xl md:text-4xl text-carmel-text/30 animate-fade-up ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '350ms' }}
          >
            where brands come alive
          </p>
        </div>
      </div>
      
      {/* Portfolio Grid */}
      <div 
        ref={gridRef}
        className="px-4 md:px-20 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[380px] md:auto-rows-[420px]">
          {portfolioItems.map((item, index) => (
            <article 
              key={item.title}
              className={`group relative overflow-hidden cursor-pointer animate-scale-reveal ${
                item.size === 'tall' ? 'lg:row-span-2 lg:auto-rows-auto' : ''
              } ${gridInView ? 'in-view' : ''}`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                height: item.size === 'tall' ? 'auto' : undefined
              }}
            >
              {/* Image */}
              <div className={`absolute inset-0 ${item.size === 'tall' ? 'lg:relative lg:h-[860px]' : ''}`}>
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Corner frame */}
              <div className="absolute inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/0 group-hover:border-white/40 transition-colors duration-500 delay-100" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/0 group-hover:border-white/40 transition-colors duration-500 delay-150" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/0 group-hover:border-white/40 transition-colors duration-500 delay-200" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/0 group-hover:border-white/40 transition-colors duration-500 delay-250" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Year badge */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-white/60 text-[10px] tracking-[0.15em] uppercase">
                    {item.year}
                  </span>
                </div>
                
                {/* Title and category */}
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600 ease-out">
                  <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-2xl md:text-3xl leading-tight">
                    {item.title}
                  </h3>
                  
                  {/* View project link */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-white/50 text-[10px] tracking-[0.15em] uppercase">
                      View Project
                    </span>
                    <svg 
                      className="w-3 h-3 text-white/50 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <span className="sr-only">{item.title} - {item.category}</span>
            </article>
          ))}
        </div>
      </div>
      
      {/* View all link */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto mt-16 text-center">
        <a 
          href="#" 
          className="group inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase text-carmel-text/50 hover:text-carmel-text transition-colors duration-500"
        >
          <span className="w-12 h-px bg-current transition-all duration-500 group-hover:w-8" />
          <span>View All Projects</span>
          <span className="w-12 h-px bg-current transition-all duration-500 group-hover:w-8" />
        </a>
      </div>
    </section>
  );
}
