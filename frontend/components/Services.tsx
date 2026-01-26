"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

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

  return (
    <section
      id="services"
      className="snap-section section-services bg-carmel-bg relative overflow-hidden"
    >
      {/* Hero-like opening area */}
      <div className="h-[30vh] md:h-[40vh] flex items-end justify-center pb-8 md:pb-12">
        <Reveal>
          <div className="text-center">
            <span className="block text-[10px] tracking-[0.2em] uppercase text-carmel-muted mb-4">
              Our Expertise
            </span>
            <h2 className="font-serif text-[length:var(--text-fluid-h1)] text-carmel-text tracking-tight leading-tight">
              Experiential Marketing
            </h2>
          </div>
        </Reveal>
      </div>
      
      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-10 w-full pb-16 md:pb-24">
        <div className="text-center mb-12 md:mb-20">
          <div className="max-w-2xl mx-auto">
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-carmel-text/60 leading-relaxed">
                We engineer strategic campaigns that ignite conversation and drive meaningful engagement.
              </p>
            </Reveal>
          </div>
          
          {/* Elegant divider line */}
          <Reveal delay={0.3}>
            <div className="mt-10 w-16 h-px bg-carmel-text/15 mx-auto" />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
          {/* Vertical Divider (Desktop) */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-carmel-text/10 -translate-x-1/2 origin-top"
          />

          {subCategories.map((service, index) => (
            <Reveal
              key={service.title}
              type={index === 0 ? "slide-right" : "slide-left"}
              delay={0.4 + (index * 0.2)}
              width="100%"
            >
              <div
                className="flex flex-col items-center text-center py-8"
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                <h3 className="font-serif text-3xl md:text-4xl text-carmel-text mb-4 relative inline-block w-fit cursor-default">
                  {service.title}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-carmel-text w-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeService === index ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </h3>
                <p className="text-sm md:text-base text-carmel-text/70 leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA Link */}
        <Reveal delay={0.8}>
          <div className="text-center mt-12 md:mt-16">
            <a 
              href="#portfolio"
              className="group inline-block text-[10px] tracking-[0.15em] uppercase text-carmel-text/40 hover:text-carmel-text/60 transition-colors duration-500"
            >
              <span className="pb-1.5 border-b border-carmel-text/15 group-hover:border-carmel-text/30 transition-colors duration-500">
                View Our Work
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
