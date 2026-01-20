"use client";
import Reveal from './Reveal';

export default function About() {
  return (
    <section 
      id="about" 
      // FIX: Use strict h-screen and overflow-hidden so scroll snapping works perfectly
      // Reduced vertical padding (py-10) to ensure content fits on laptops
      className="snap-section h-screen bg-carmel-bg flex flex-col justify-center items-center py-10 overflow-hidden" 
    >
      <div className="px-6 sm:px-8 md:px-12 max-w-4xl mx-auto w-full text-center flex flex-col justify-center h-full">
        
        {/* Divider */}
        <Reveal width="100%">
          <div className="w-12 h-px bg-carmel-text/20 mx-auto mb-6 md:mb-10" />
        </Reveal>
        
        {/* Main Quote - Responsive text sizing */}
        <Reveal type="fade" delay={0.1} width="100%">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-5xl text-carmel-text leading-tight mb-6 md:mb-10">
            We create experiences that people feel long after they leave.
          </blockquote>
        </Reveal>
        
        {/* Paragraphs - Compact spacing */}
        <Reveal type="fade" delay={0.3} width="100%">
          <div className="text-carmel-text/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed space-y-4 md:space-y-6">
            <p>
              Carmel Rose Collective was founded by Los Angeles native Bree Chenelia to bring together what she does best: design forward experiences executed with precision, calm, and an uncompromising eye for detail.
            </p>
            <p className="hidden sm:block">
              With more than a decade in events and experiential marketing, Bree built her career from the ground up—earning a reputation as the go-to partner for high stakes projects.
            </p>
          </div>
        </Reveal>

        {/* Footer info - Reduced margin top */}
        <Reveal type="fade" delay={0.5} width="100%">
          <div className="mt-8 md:mt-12">
            <p className="font-serif text-lg md:text-xl text-carmel-text">Bree Chenelia</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-carmel-muted mt-2">Founder</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
