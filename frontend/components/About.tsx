import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-20 bg-carmel-bg flex flex-col md:flex-row gap-20 items-center">
      <div className="md:w-1/2 relative">
        <div className="aspect-[3/4] w-3/4 mx-auto md:mr-auto relative shadow-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
            alt="Portrait representing the Carmel Rose Collective brand"
            fill
            sizes="(max-width: 768px) 75vw, 37.5vw"
            className="object-cover grayscale contrast-125"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 md:right-10 bg-white p-6 shadow-xl">
          <p className="font-serif italic text-xl">&quot;Details are not just details.&quot;</p>
        </div>
      </div>
      
      <div className="md:w-1/2">
        <h2 className="font-serif text-5xl md:text-6xl mb-10 leading-none">
          The Art of <br/>
          <span className="italic text-gray-400">Gathering</span>
        </h2>
        <p className="font-sans text-gray-600 leading-loose mb-8 text-sm md:text-base">
          Carmel Rose Collective was born from a desire to blend strategy with soul. 
          We believe that an event is not just a date on a calendar, but a chapter in a brand&apos;s story. 
          We obsess over the tactile, the visual, and the emotional resonance of every space we touch.
        </p>
        <div className="grid grid-cols-2 gap-8 mt-12 border-t border-gray-300 pt-8">
          <div>
            <span className="font-serif text-5xl block mb-2">50+</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">
              Unique Activations
            </span>
          </div>
          <div>
            <span className="font-serif text-5xl block mb-2">12</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">
              Cities Worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
