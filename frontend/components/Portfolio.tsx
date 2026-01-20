"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const portfolioItems = [
  {
    id: 1,
    client: "L'Oréal Paris",
    title: "Women of Worth",
    image: "/portfolio/loreal-gala.webp",
    size: "large",
  },
  {
    id: 2,
    client: "SportsCenter",
    title: "Top 10 Anniversary",
    image: "/portfolio/sc-booth.webp",
    size: "small",
  },
  {
    id: 3,
    client: "Giorgio Armani",
    title: "Beauty Launch",
    image: "/portfolio/armani-launch.webp",
    size: "small",
  },
  {
    id: 4,
    client: "Fabelfruit",
    title: "Immersive Garden",
    image: "/portfolio/whimsical-set.webp",
    size: "small",
  },
  {
    id: 5,
    client: "Private Client",
    title: "Gala Evening",
    image: "/portfolio/lumina-dinner.webp",
    size: "small",
  },
  {
    id: 6,
    client: "Celsius",
    title: "Live Fit Tour",
    image: "/portfolio/celsius-concert.webp",
    size: "tall",
  },
  {
    id: 7,
    client: "Tatcha",
    title: "Forest Immersion",
    image: "/portfolio/tatcha-forest.webp",
    size: "wide",
  },
];

export default function Portfolio() {
  const { ref, isInView } = useInView({ 
    threshold: 0.1,
    rootMargin: '0px',
    delay: 50,
  });

  return (
    <section 
      id="work" 
      className="snap-section min-h-screen bg-carmel-bg flex flex-col" 
      ref={ref}
    >
      {/* Header - minimal top padding */}
      <div className="pt-20 pb-6 md:pt-24 md:pb-8">
        <h2 
          className={`font-serif text-3xl md:text-4xl lg:text-5xl text-carmel-text text-center transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Our Work
        </h2>
      </div>

      {/* Bento Grid - Full bleed, no padding */}
      <div className="flex-1">
        
        {/* Desktop Bento Layout - equal row heights */}
        <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-[3px] h-[calc(100vh-140px)]">
          
          {/* Large featured - spans 2x2 */}
          <div 
            className={`col-span-2 row-span-2 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <PortfolioCard project={projects[0]} />
          </div>
          
          {/* Top right quadrant - 2 small */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <PortfolioCard project={projects[1]} />
          </div>
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <PortfolioCard project={projects[2]} />
          </div>
          
          {/* Middle right - 2 small */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <PortfolioCard project={projects[3]} />
          </div>
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            <PortfolioCard project={projects[4]} />
          </div>
          
          {/* Bottom row - 1 left, wide right (Tatcha) */}
          <div 
            className={`row-span-1 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <PortfolioCard project={projects[5]} />
          </div>
          <div 
            className={`col-span-3 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <PortfolioCard project={projects[6]} />
          </div>
        </div>

        {/* Mobile Layout - 2 column simple grid */}
        <div className="md:hidden grid grid-cols-2 gap-[2px]">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`aspect-[4/5] transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              <PortfolioCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ project }: { project: typeof projects[0] }) {
  return (
    <div className="group relative w-full h-full overflow-hidden cursor-pointer">
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.client}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      
      {/* Client label - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p className="text-white/90 text-xs md:text-sm tracking-wide font-light">
          {project.client}
        </p>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-carmel-text/0 group-hover:bg-carmel-text/80 transition-all duration-500 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 text-center px-6 translate-y-4 group-hover:translate-y-0">
          <p className="text-carmel-bg text-lg md:text-xl lg:text-2xl font-serif mb-2">
            {project.client}
          </p>
          <p className="text-carmel-bg/70 text-xs md:text-sm tracking-wide">
            {project.title}
          </p>
        </div>
      </div>
      
      {/* Corner accents on hover */}
      <div className="absolute top-4 left-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
        <div className="absolute top-0 left-0 w-full h-px bg-carmel-bg/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
        <div className="absolute top-0 left-0 h-full w-px bg-carmel-bg/40 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-200" />
      </div>
      <div className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
        <div className="absolute bottom-0 right-0 w-full h-px bg-carmel-bg/40 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-carmel-bg/40 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-200" />
      </div>
    </div>
  );
}
