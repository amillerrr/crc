"use client";
import Reveal from './Reveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="snap-start snap-always bg-carmel-text text-white py-16 sm:py-20">
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-5xl mx-auto">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-10 mb-10">
            <div className="mb-8 md:mb-0">
               <h3 className="font-serif text-3xl mb-2">Carmel Rose</h3>
               <p className="text-xs tracking-[0.2em] uppercase text-white/40">Los Angeles, California</p>
            </div>
            <a href="mailto:bree@carmelrose.com" className="text-lg hover:text-white/70 transition-colors">bree@carmelrose.com</a>
          </div>
        </Reveal>
        
        <Reveal width="100%" delay={0.2}>
          <div className="flex justify-between items-center text-[10px] tracking-[0.15em] uppercase text-white/30">
            <p>© {currentYear} CRC</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
