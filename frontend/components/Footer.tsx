"use client";
import { useInView } from '@/hooks/useInView';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  
  return (
    <footer className="bg-carmel-text text-white py-12 sm:py-14 md:py-16" ref={ref}>
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-5xl mx-auto">
        {/* Top section */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-white/8 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="mb-5 md:mb-0">
            {/* LOGO REPLACEMENT 
              Using CSS Mask to apply the 'Cream' (bg-carmel-bg) color to the SVG shape.
            */}
            <div 
              className="w-48 sm:w-64 md:w-80 h-10 sm:h-12 md:h-14 bg-carmel-bg mb-4"
              style={{
                maskImage: 'url(/CRC-Logo.svg)',
                maskPosition: 'left center',
                maskRepeat: 'no-repeat',
                maskSize: 'contain',
                WebkitMaskImage: 'url(/CRC-Logo.svg)',
                WebkitMaskPosition: 'left center',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain'
              }}
              role="img"
              aria-label="Carmel Rose"
            />
            
            <p className="text-[10px] tracking-[0.15em] uppercase text-white/35 pl-1">
              Los Angeles, California
            </p>
          </div>
          
          <a 
            href="mailto:bree@carmelrose.com" 
            className="text-sm sm:text-base md:text-lg text-white/60 hover:text-white transition-colors duration-300 link-underline"
          >
            bree@carmelrose.com
          </a>
        </div>
        
        {/* Bottom section */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 transition-all duration-700 delay-100 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
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
