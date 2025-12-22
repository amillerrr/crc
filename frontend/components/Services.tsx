"use client";
import { useInView } from '@/hooks/useInView';

const services = [
  { 
    num: "01",
    title: "Brand Activation", 
    desc: "We transform brand stories into tangible, multi-sensory experiences that create lasting emotional connections with your audience.",
    details: ["Pop-up Experiences", "Product Launches", "Immersive Installations"]
  },
  { 
    num: "02",
    title: "Experiential Marketing", 
    desc: "Strategic campaigns designed to spark conversation, drive engagement, and turn passive observers into passionate advocates.",
    details: ["Guerrilla Marketing", "Interactive Campaigns", "Social Activations"]
  },
  { 
    num: "03",
    title: "Event Production", 
    desc: "End-to-end design and flawless execution for occasions that transcend the ordinary and become unforgettable milestones.",
    details: ["Corporate Events", "Gala Productions", "Private Celebrations"]
  }
];

export default function Services() {
  const { ref: headerRef, isInView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="py-32 md:py-40 bg-carmel-bg overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto mb-24" ref={headerRef}>
        <div className="flex items-center gap-6 mb-6">
          <span 
            className={`font-sans text-[10px] tracking-[0.4em] uppercase text-carmel-text/40 animate-fade-up ${
              headerInView ? 'in-view' : ''
            }`}
          >
            Services
          </span>
          <div 
            className={`flex-grow h-px bg-carmel-text/10 animate-line-draw ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          />
        </div>
        
        <div className="md:flex md:items-end md:justify-between">
          <h2 
            className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 md:mb-0 animate-blur-reveal ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '100ms' }}
          >
            What We<br />
            <span className="italic text-carmel-text/40">Bring to Life</span>
          </h2>
          
          <p 
            className={`font-sans text-sm text-carmel-text/50 max-w-xs leading-relaxed animate-fade-up ${
              headerInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '300ms' }}
          >
            Every project is an opportunity to craft something extraordinary.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto" ref={gridRef}>
        <div className="grid md:grid-cols-3 gap-px bg-carmel-text/5">
          {services.map((service, i) => (
            <article 
              key={service.title}
              className={`group relative bg-carmel-bg p-8 md:p-10 lg:p-12 cursor-pointer animate-fade-up ${
                gridInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: `${200 + i * 150}ms` }}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-carmel-text/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Top line accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-carmel-text/10">
                <div className="h-full w-0 bg-carmel-text/30 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
              
              {/* Number */}
              <div className="relative mb-16 md:mb-20">
                <span className="font-serif text-7xl md:text-8xl lg:text-9xl text-carmel-text/[0.06] leading-none transition-all duration-700 group-hover:text-carmel-text/[0.12]">
                  {service.num}
                </span>
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="font-serif text-2xl md:text-3xl mb-4 transition-all duration-500">
                  <span className="relative inline-block">
                    {service.title}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-carmel-text scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                  </span>
                </h3>
                
                <p className="font-sans text-sm leading-relaxed text-carmel-text/50 mb-8 transition-colors duration-500 group-hover:text-carmel-text/70">
                  {service.desc}
                </p>
                
                {/* Detail tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.details.map((detail, idx) => (
                    <span 
                      key={detail}
                      className="px-3 py-1 text-[9px] tracking-[0.15em] uppercase border border-carmel-text/10 text-carmel-text/40 transition-all duration-500 group-hover:border-carmel-text/20 group-hover:text-carmel-text/60"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>
                
                {/* Arrow link */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-carmel-text/30 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    Explore
                  </span>
                  <svg 
                    className="w-4 h-4 text-carmel-text/30 translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
