"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-carmel-text text-white py-12 sm:py-14 md:py-16">
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-5xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-white/8">
          <div className="mb-5 md:mb-0">
            <p className="font-serif text-lg sm:text-xl md:text-2xl mb-2">
              Carmel Rose Collective
            </p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/35">
              Los Angeles, California
            </p>
          </div>
          
          <a 
            href="mailto:hello@carmelrose.com" 
            className="text-sm sm:text-base md:text-lg text-white/60 hover:text-white transition-colors duration-300"
          >
            hello@carmelrose.com
          </a>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <p className="text-[10px] tracking-[0.1em] uppercase text-white/25">
            © {currentYear} Carmel Rose Collective
          </p>
          
          <div className="flex items-center gap-5 sm:gap-6">
            <a 
              href="https://instagram.com" 
              className="text-[10px] tracking-[0.1em] uppercase text-white/35 hover:text-white/60 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a 
              href="https://linkedin.com" 
              className="text-[10px] tracking-[0.1em] uppercase text-white/35 hover:text-white/60 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
