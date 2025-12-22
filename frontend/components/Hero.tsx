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

      <div className="relative z-10 text-center text-carmel-text px-4">
        <p className="font-sans text-xs tracking-[0.4em] uppercase mb-8 text-gray-500">
          Est. 2025
        </p>

        {/* SVG Logo */}
        <h1 className="mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CRC-Logo.svg"
            alt="Carmel Rose Collective"
            className="w-[280px] h-auto sm:w-[360px] md:w-[480px] lg:w-[600px] xl:w-[820px] mx-auto"
          />
        </h1>

        <a 
          href="#services"
          className="inline-block border border-carmel-text px-12 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-carmel-text hover:text-white transition duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-2"
        >
          Discover
        </a>
      </div>
    </section>
  );
}
