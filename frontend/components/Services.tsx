"use client";
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const subCategories = [
  { 
    title: "Brand Activation", 
    description: "We transform brand narratives into tangible, multi-sensory experiences. By merging strategy with soul, we create moments that forge lasting emotional connections and turn passive observers into passionate advocates."
  },
  { 
    title: "Event Production", 
    description: "From initial concept to flawless execution, we craft occasions that transcend the expected. Our technical precision and logistical mastery ensure that every detail contributes to a seamless, memorable narrative."
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  
  // STRICT CONFIG:
  // Animation will strictly wait until the section header is CENTER SCREEN.
  const { ref, isInView } = useInView({ 
    threshold: 0.3, 
    rootMargin: '0px 0px -50% 0px' 
  });

  return (
    <section 
      id="services" 
      className="snap-section scroll-mt-0 py-24 md:py-36 bg-carmel-bg relative overflow-hidden min-h-screen flex flex-col justify-center" 
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(180, 160, 140, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="px-6 md:px-12 lg:px-16 max-w-6xl mx-auto relative z-10 w-full">
        
        <div className="text-center mb-20 md:mb-28">
          <span className={`block text-carmel-text text-3xl sm:text-4xl text-carmel-muted mb-6 ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}>
            OUR EXPERTISE
          </span>
          <h2 className={`font-serif text-5xl sm:text-6xl md:text-8xl text-carmel-text tracking-tight leading-none delay-100 ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}>
            Experiential Marketing
          </h2>
          
          <div className={`mt-8 max-w-2xl mx-auto delay-200 ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}>
            <p className="text-lg md:text-xl text-carmel-text/60 leading-relaxed">
              We engineer strategic campaigns that ignite conversation and drive meaningful engagement, positioning your brand at the center of culture.
            </p>
          </div>

          <div className={`mt-12 w-24 h-px bg-carmel-text/20 mx-auto transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-carmel-text/10 -translate-x-1/2 transition-all duration-1000 delay-500 ${
             isInView ? 'opacity-100 scale-y-100 origin-top' : 'opacity-0 scale-y-0'
          }`} />

          {subCategories.map((service, index) => (
            <div 
              key={service.title}
              className={`group flex flex-col items-center text-center md:items-start md:text-left ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}
              style={{ transitionDelay: `${400 + (index * 150)}ms` }}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <h3 className="font-serif text-3xl sm:text-4xl text-carmel-text mb-6 group-hover:text-carmel-muted transition-colors duration-300 relative inline-block w-fit">
                {service.title}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-carmel-text/60 transition-all duration-500 ease-luxury group-hover:w-full" />
              </h3>
              
              <p className="text-base text-carmel-text/70 leading-relaxed max-w-md">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
