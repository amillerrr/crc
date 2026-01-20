"use client";
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const subCategories = [
  { 
    title: "Brand Activation", 
    description: "We transform brand narratives into tangible, multi-sensory experiences. By merging strategy with soul, we create moments that forge lasting emotional connections."
  },
  { 
    title: "Event Production", 
    description: "From initial concept to flawless execution, we craft occasions that transcend the expected. Our technical precision ensures every detail contributes to a seamless narrative."
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.5 });

  return (
    <section 
      id="services" 
      className="snap-section bg-carmel-bg relative overflow-hidden" 
      ref={ref}
    >
      <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-10 w-full">
        
        <div className="text-center mb-12 md:mb-20">
          <span className={`block text-[10px] tracking-[0.2em] uppercase text-carmel-muted mb-4 ${isInView ? 'snap-reveal-visible' : 'snap-reveal-hidden'}`}>
            Our Expertise
          </span>
          
          <h2 className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-carmel-text tracking-tight leading-none ${isInView ? 'snap-reveal-visible delay-100' : 'snap-reveal-hidden'}`}>
            Experiential Marketing
          </h2>
          
          <div className={`mt-8 max-w-2xl mx-auto ${isInView ? 'snap-reveal-visible delay-200' : 'snap-reveal-hidden'}`}>
            <p className="text-lg md:text-xl text-carmel-text/60 leading-relaxed">
              We engineer strategic campaigns that ignite conversation and drive meaningful engagement.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
          {/* Vertical Divider (Desktop) */}
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-carmel-text/10 -translate-x-1/2 transition-all duration-1000 ${isInView ? 'opacity-100 scale-y-100 delay-300' : 'opacity-0 scale-y-0'}`} />

          {subCategories.map((service, index) => (
            <div 
              key={service.title}
              className={`flex flex-col items-center text-center md:items-start md:text-left ${isInView ? (index === 0 ? 'reveal-slide-left-visible' : 'reveal-slide-right-visible') : (index === 0 ? 'reveal-slide-left-hidden' : 'reveal-slide-right-hidden')}`}
              style={{ transitionDelay: `${400 + (index * 150)}ms` }}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <h3 className="font-serif text-3xl md:text-4xl text-carmel-text mb-4 relative inline-block w-fit">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-carmel-text/70 leading-relaxed max-w-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
