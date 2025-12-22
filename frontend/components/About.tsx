"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

export default function About() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });

  return (
    <section 
      id="about" 
      className="py-32 md:py-40 bg-carmel-bg overflow-hidden"
      ref={sectionRef}
    >
      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-20">
          <span 
            className={`font-sans text-[10px] tracking-[0.4em] uppercase text-carmel-text/40 animate-fade-up ${
              isInView ? 'in-view' : ''
            }`}
          >
            About
          </span>
          <div 
            className={`flex-grow h-px bg-carmel-text/10 animate-line-draw ${
              isInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <div className="relative">
            {/* Main image */}
            <div 
              className={`relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden animate-slide-left ${
                isInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: '100ms' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Portrait representing the Carmel Rose Collective brand"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-110"
              />
              
              {/* Frame overlay */}
              <div className="absolute inset-6 border border-white/20 pointer-events-none" />
            </div>
            
            {/* Floating quote card */}
            <div 
              className={`absolute -bottom-8 -right-4 md:right-0 lg:-right-12 bg-white p-8 shadow-2xl max-w-[280px] animate-fade-up ${
                isInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <div className="w-8 h-px bg-carmel-text/20 mb-4" />
              <p className="font-serif text-xl italic leading-relaxed mb-3">
                &quot;Details are not just details. They make the design.&quot;
              </p>
              <span className="text-[10px] tracking-[0.2em] uppercase text-carmel-text/40">
                — Charles Eames
              </span>
            </div>
            
            {/* Decorative element */}
            <div 
              className={`absolute -top-8 -left-8 w-24 h-24 border border-carmel-text/10 animate-fade-in ${
                isInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: '600ms' }}
            />
          </div>
          
          {/* Content column */}
          <div className="lg:pl-8">
            <h2 
              className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 animate-blur-reveal ${
                isInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: '200ms' }}
            >
              The Art of<br />
              <span className="italic text-carmel-text/40">Gathering</span>
            </h2>
            
            <div 
              className={`space-y-6 mb-12 animate-fade-up ${
                isInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: '350ms' }}
            >
              <p className="font-sans text-carmel-text/60 leading-relaxed">
                Carmel Rose Collective was born from a desire to blend strategy with soul. 
                We believe that an event is not just a date on a calendar, but a chapter in a brand&apos;s story.
              </p>
              <p className="font-sans text-carmel-text/60 leading-relaxed">
                We obsess over the tactile, the visual, and the emotional resonance of every space we touch. 
                Each project is an opportunity to create something that lingers in memory long after the last guest departs.
              </p>
            </div>
            
            {/* Stats */}
            <div 
              className={`grid grid-cols-2 gap-12 pt-10 border-t border-carmel-text/10 animate-fade-up ${
                isInView ? 'in-view' : ''
              }`}
              style={{ animationDelay: '500ms' }}
            >
              <div>
                <span className="block font-serif text-5xl md:text-6xl text-carmel-text mb-2">
                  50<span className="text-carmel-text/30">+</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-carmel-text/40">
                  Unique Activations
                </span>
              </div>
              <div>
                <span className="block font-serif text-5xl md:text-6xl text-carmel-text mb-2">
                  12
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-carmel-text/40">
                  Cities Worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
