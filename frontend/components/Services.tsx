"use client";
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const services = [
  { 
    number: "I",
    title: "Brand Activation", 
    description: "We transform brand narratives into tangible, multi-sensory experiences that forge lasting emotional connections with your audience."
  },
  { 
    number: "II",
    title: "Experiential Marketing", 
    description: "Strategic campaigns engineered to ignite conversation, drive meaningful engagement, and convert passive observers into passionate advocates."
  },
  { 
    number: "III",
    title: "Event Production", 
    description: "From concept to execution, we craft occasions that transcend the expected—delivering flawless, memorable experiences."
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section 
      id="services" 
      className="scroll-mt-20 py-24 md:py-36 bg-carmel-bg relative overflow-hidden" 
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full animate-float-slowest opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(180, 160, 140, 0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="px-6 md:px-12 lg:px-16 max-w-5xl mx-auto relative z-10">
        
        {/* Centered Minimalist Header */}
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
           isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="block font-italianno text-3xl sm:text-4xl text-carmel-muted mb-4">
            Our Expertise
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-carmel-text tracking-tight leading-tight">
            What We Do
          </h2>
          
          {/* Decorative line */}
          <div className={`mt-8 w-16 h-px bg-carmel-text/20 mx-auto transition-all duration-1000 delay-200 ${
            isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>

        {/* The "Executive Index" List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <div 
              key={service.number}
              className={`group border-t border-carmel-text/15 first:border-t transition-colors duration-500 hover:border-carmel-text/50 cursor-default ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="py-8 md:py-12 relative">
                
                {/* Main Row Content */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8">
                  
                  {/* Left: Numeral & Title */}
                  <div className="flex items-baseline gap-6 md:gap-8">
                    <span className="text-xs md:text-sm font-serif tracking-widest text-carmel-muted w-8 transition-colors duration-500 group-hover:text-carmel-text">
                      {service.number}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl text-carmel-text transition-transform duration-700 ease-luxury group-hover:translate-x-4">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: The Interaction Icon (Arrow) */}
                  <div className="hidden md:flex items-center justify-end w-12">
                     <svg 
                       width="24" 
                       height="24" 
                       viewBox="0 0 24 24" 
                       fill="none" 
                       xmlns="http://www.w3.org/2000/svg"
                       className="text-carmel-text/30 transform transition-all duration-700 ease-luxury group-hover:rotate-45 group-hover:text-carmel-text group-hover:scale-110"
                     >
                       <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                </div>

                {/* Description - Accordion Reveal */}
                <div className={`grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-luxury`}>
                  <div className="overflow-hidden">
                    <div className="pt-6 md:pt-8 md:pl-16 lg:pl-20 max-w-2xl">
                      <p className="text-base md:text-lg text-carmel-text/60 leading-relaxed opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-out">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Description (Always Visible, no accordion) */}
                <div className="md:hidden mt-4 pl-10">
                   <p className="text-sm text-carmel-text/60 leading-relaxed">
                     {service.description}
                   </p>
                </div>

              </div>
            </div>
          ))}
          
          {/* Closing Border */}
          <div className={`border-t border-carmel-text/15 transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`} />
        </div>

      </div>
    </section>
  );
}
