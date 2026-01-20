"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const projects = [
  { id: 1, client: "L'Oréal Paris", title: "Women of Worth", image: "/portfolio/loreal-gala.webp" },
  { id: 2, client: "SportsCenter", title: "Top 10 Anniversary", image: "/portfolio/sc-booth.webp" },
  { id: 3, client: "Giorgio Armani", title: "Beauty Launch", image: "/portfolio/armani-launch.webp" },
  { id: 4, client: "Fabelfruit", title: "Immersive Garden", image: "/portfolio/whimsical-set.webp" },
  { id: 5, client: "Private Client", title: "Gala Evening", image: "/portfolio/lumina-dinner.webp" },
  { id: 6, client: "Celsius", title: "Live Fit Tour", image: "/portfolio/celsius-concert.webp" },
  { id: 7, client: "Tatcha", title: "Forest Immersion", image: "/portfolio/tatcha-forest.webp" },
];

export default function Portfolio() {
  const { ref, isInView } = useInView({ threshold: 0.4 });

  return (
    <section 
      id="work" 
      // snap-section ensures 100vh height and centers content
      className="snap-section bg-carmel-bg relative overflow-hidden" 
      ref={ref}
    >
      <div className="w-full h-full flex flex-col justify-center">
        
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-16 mb-8 md:mb-12 text-center md:text-left">
          <h2 className={`font-serif text-4xl md:text-6xl text-carmel-text transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Selected Work
          </h2>
          <div className={`h-px bg-carmel-text/20 mt-6 w-full max-w-[200px] md:max-w-[400px] transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 scale-x-100 origin-left' : 'opacity-0 scale-x-0'}`} />
        </div>

        {/* Horizontal Slider 
            data-lenis-prevent stops the vertical scroll engine from interfering 
            when the user is swiping sideways 
        */}
        <div 
          data-lenis-prevent 
          className={`flex overflow-x-auto gap-4 md:gap-8 px-6 md:px-12 lg:px-16 pb-8 no-scrollbar w-full items-center h-[50vh] md:h-[60vh] transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="relative shrink-0 h-full aspect-[3/4] md:aspect-[4/5] overflow-hidden group cursor-pointer bg-carmel-muted/10"
            >
              <Image
                src={project.image}
                alt={project.client}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-90 mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{project.client}</p>
                <p className="font-serif text-2xl md:text-3xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</p>
              </div>
            </div>
          ))}
          
          {/* Spacer for end of scroll */}
          <div className="shrink-0 w-6 md:w-12" />
        </div>

        {/* Scroll Hint */}
        <div className={`text-center mt-4 transition-opacity duration-1000 delay-700 ${isInView ? 'opacity-40' : 'opacity-0'}`}>
          <p className="text-[10px] uppercase tracking-widest">Scroll &rarr;</p>
        </div>
      </div>
    </section>
  );
}
