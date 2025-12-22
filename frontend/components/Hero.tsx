export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-carmel-bg">
      {/* Decorative large faint text in background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-carmel-accent opacity-20 pointer-events-none select-none whitespace-nowrap"
        aria-hidden="true"
      >
        Carmel Rose
      </div>

      <div className="relative z-10 text-center text-carmel-text px-4 w-full max-w-[90vw]">
        <p className="font-sans text-xs tracking-[0.4em] uppercase mb-12 text-gray-500 animate-fade-up">
          Est. 2024
        </p>

        {/* Main Headline - keeping structure for future SVG logo */}
        <h1 className="font-serif mb-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 animate-fade-up animation-delay-200">
          <span className="text-xl md:text-3xl lg:text-4xl tracking-[0.3em] font-light whitespace-nowrap relative z-0">
            CARMEL
          </span>
          
          {/* This span can be replaced with an SVG logo */}
          <span className="font-script text-8xl md:text-9xl lg:text-[11rem] text-carmel-text relative z-10 -my-4 md:-my-0 md:-mx-3 lg:-mx-5 leading-none pb-4 md:pb-0">
            Rose
          </span>
          
          <span className="text-xl md:text-3xl lg:text-4xl tracking-[0.3em] font-light whitespace-nowrap relative z-0">
            COLLECTIVE
          </span>
        </h1>

        <a 
          href="#services"
          className="inline-block border border-carmel-text px-12 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-carmel-text hover:text-white transition duration-500 animate-fade-in animation-delay-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-2"
        >
          Discover
        </a>
      </div>
    </section>
  );
}
