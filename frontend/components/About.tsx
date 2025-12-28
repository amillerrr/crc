"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section 
      id="about" 
      className="scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-carmel-bg" 
      ref={ref}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
        {/* Two column layout - stacks on mobile with more breathing room */}
        <div className="grid gap-14 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Full width on mobile, constrained on desktop */}
            <div className="relative aspect-[3/4] w-full sm:max-w-sm mx-auto lg:mx-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Portrait representing Carmel Rose Collective"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div>
            <span className={`block font-italianno text-2xl text-carmel-muted mb-3 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Our Story
            </span>
            
            <h2 
              className={`font-serif text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 sm:mb-6 text-balance transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              The Art of Gathering
            </h2>
            
            <div 
              className={`space-y-4 text-carmel-text/55 text-[15px] sm:text-[15px] leading-relaxed transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p>
                Carmel Rose Collective was born from a desire to blend strategy with soul. 
                We believe an event is not merely a date on a calendar—it&apos;s a chapter in your brand&apos;s story.
              </p>
              <p>
                We obsess over the tactile, the visual, and the emotional resonance of every space we touch. 
                Each project is an opportunity to create something that lingers long after the moment passes.
              </p>
            </div>
            
            {/* Stats */}
            <div 
              className={`flex gap-8 sm:gap-12 mt-10 sm:mt-10 pt-8 sm:pt-8 border-t border-carmel-text/8 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div>
                <p className="font-serif text-3xl sm:text-3xl md:text-4xl mb-1">50+</p>
                <p className="text-[9px] tracking-[0.15em] uppercase text-carmel-text/35">
                  Activations
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-3xl md:text-4xl mb-1">12</p>
                <p className="text-[9px] tracking-[0.15em] uppercase text-carmel-text/35">
                  Cities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
