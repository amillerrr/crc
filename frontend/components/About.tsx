"use client";
import { useInView } from '@/hooks/useInView';

export default function About() {
  const { ref, isInView } = useInView({ 
    threshold: 0.2,
    rootMargin: '0px',
    delay: 50,
  });

  return (
    <section 
      id="about" 
      className="snap-section min-h-screen bg-carmel-bg flex flex-col justify-center relative overflow-hidden" 
      ref={ref}
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full opacity-30 animate-float-slower"
          style={{ background: 'radial-gradient(circle, rgba(180, 160, 140, 0.08) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-20 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(160, 140, 120, 0.06) 0%, transparent 70%)' }}
        />
      </div>

      <div className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 max-w-5xl mx-auto w-full relative z-10">
        
        {/* The Quote Block */}
        <div className="text-center mb-14 md:mb-16">
          
          {/* Top decorative line */}
          <div 
            className={`w-12 h-px bg-carmel-text/20 mx-auto mb-10 md:mb-12 transition-all duration-1000 ${
              isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          />
          
          {/* Main quote */}
          <blockquote 
            className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-carmel-text leading-snug md:leading-tight tracking-tight max-w-4xl mx-auto ${
              isInView ? 'snap-reveal-visible delay-100' : 'snap-reveal-hidden'
            }`}
          >
            We create experiences that people feel long after they leave.
          </blockquote>
          
          {/* Attribution */}
          <div 
            className={`mt-8 md:mt-10 ${
              isInView ? 'reveal-text-visible delay-300' : 'reveal-text-hidden'
            }`}
          >
            <p className="text-base sm:text-lg text-carmel-text font-serif">
              Bree Chenelia
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-carmel-muted mt-1">
              Founder
            </p>
          </div>

          {/* Bottom decorative line - closes the quote */}
          <div 
            className={`w-12 h-px bg-carmel-text/20 mx-auto mt-10 md:mt-12 transition-all duration-1000 ${
              isInView ? 'opacity-100 scale-x-100 delay-400' : 'opacity-0 scale-x-0'
            }`}
          />
        </div>

        {/* About Section */}
        <div 
          className={`max-w-2xl mx-auto ${
            isInView ? 'reveal-text-visible delay-500' : 'reveal-text-hidden'
          }`}
        >
          {/* Section title */}
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-carmel-muted text-center mb-8">
            Our Story
          </h3>

          <div className="space-y-6 text-carmel-text/55 text-sm sm:text-[15px] leading-relaxed text-center">
            <p>
              Carmel Rose Collective was founded by Los Angeles native Bree Chenelia to bring together what she does best: design forward experiences executed with precision, calm, and an uncompromising eye for detail.
            </p>
            <p>
              With more than a decade in events, hospitality, and experiential marketing, Bree built her career from the ground up—earning a reputation as the go-to partner for high stakes projects, tight timelines, and moments that feel effortless to the untrained eye.
            </p>
            <p>
              Carmel Rose Collective exists at the intersection of artistry and logistics—concepting, production, and finishing touches carried through from the first idea to the final guest moment.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
