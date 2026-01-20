"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

// RENAMED to match your component usage
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
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section 
      id="work" 
      // ADDED: snap-section-full (custom class) or min-h-screen to ensure proper snapping
      className="snap-section min-h-screen bg-carmel-bg flex flex-col justify-center py-20" 
      ref={ref}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
        <h2 className={`font-serif text-4xl md:text-6xl text-carmel-text text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Selected Work
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`relative aspect-[3/4] w-full overflow-hidden group cursor-pointer transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Image
                src={project.image}
                alt={project.client}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs uppercase tracking-widest opacity-80 mb-1">{project.client}</p>
                <p className="font-serif text-2xl">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
