"use client";
import { useInView } from '@/hooks/useInView';

const services = [
  { 
    number: "01",
    title: "Brand Activation", 
    description: "We transform brand narratives into tangible, multi-sensory experiences that forge lasting emotional connections with your audience."
  },
  { 
    number: "02",
    title: "Experiential Marketing", 
    description: "Strategic campaigns engineered to ignite conversation, drive meaningful engagement, and convert passive observers into passionate advocates."
  },
  { 
    number: "03",
    title: "Event Production", 
    description: "From concept to execution, we craft occasions that transcend the expected—delivering flawless, memorable experiences."
  }
];

export default function Services() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section 
      id="services" 
      className="scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-carmel-bg" 
      ref={ref}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
        {/* Section header - elegant serif */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h2 
            className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What We Do
          </h2>
        </div>

        {/* Services grid - stacks on mobile, 3 columns on desktop */}
        <div className="grid gap-10 sm:gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {services.map((service, i) => (
            <div 
              key={service.title}
              className={`group transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${150 + i * 100}ms` }}
            >
              {/* Number */}
              <span className="block text-[11px] tracking-[0.2em] text-carmel-text/25 mb-4 sm:mb-6">
                {service.number}
              </span>
              
              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 group-hover:text-carmel-text/70 transition-colors duration-300">
                {service.title}
              </h3>
              
              {/* Subtle line */}
              <div className="w-8 h-px bg-carmel-text/15 mb-4 sm:mb-5 group-hover:w-12 group-hover:bg-carmel-text/30 transition-all duration-500" />
              
              {/* Description */}
              <p className="text-sm text-carmel-text/50 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
