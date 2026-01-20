import Reveal from './Reveal'; // Ensure you have this component from previous turns

export default function About() {
  return (
    <section 
      id="about" 
      className="snap-section min-h-screen bg-carmel-bg flex flex-col justify-center items-center py-20" 
    >
      <div className="px-6 sm:px-8 md:px-12 max-w-4xl mx-auto w-full text-center">
        
        <Reveal type="text">
          <div className="w-12 h-px bg-carmel-text/20 mx-auto mb-10" />
        </Reveal>
        
        <Reveal type="text" delay={100}>
          <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-carmel-text leading-tight mb-12">
            We create experiences that people feel long after they leave.
          </blockquote>
        </Reveal>
        
        <Reveal type="text" delay={300}>
          <div className="text-carmel-text/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed space-y-6">
            <p>
              Carmel Rose Collective was founded by Los Angeles native Bree Chenelia to bring together what she does best: design forward experiences executed with precision, calm, and an uncompromising eye for detail.
            </p>
            <p>
              With more than a decade in events and experiential marketing, Bree built her career from the ground up—earning a reputation as the go-to partner for high stakes projects.
            </p>
          </div>
        </Reveal>

        <Reveal type="text" delay={500}>
          <div className="mt-12">
            <p className="font-serif text-xl text-carmel-text">Bree Chenelia</p>
            <p className="text-xs tracking-[0.2em] uppercase text-carmel-muted mt-2">Founder</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
