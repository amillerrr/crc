"use client";
import { useInView } from '@/hooks/useInView';

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  
  return (
    <footer 
      className="bg-carmel-text text-white py-20 md:py-24" 
      role="contentinfo"
      ref={ref}
    >
      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        {/* Top section */}
        <div 
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 pb-16 border-b border-white/10 animate-fade-up ${
            isInView ? 'in-view' : ''
          }`}
        >
          {/* Logo and tagline */}
          <div className="mb-10 md:mb-0">
            <p className="font-serif text-3xl md:text-4xl mb-4">
              Carmel Rose<br />
              <span className="italic text-white/40">Collective</span>
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30">
              Crafting Unforgettable Experiences
            </p>
          </div>
          
          {/* Contact info */}
          <div className="text-right">
            <a 
              href="mailto:hello@carmelrose.com" 
              className="block font-serif text-xl md:text-2xl mb-2 hover:text-white/70 transition-colors duration-300"
            >
              hello@carmelrose.com
            </a>
            <p className="text-[11px] tracking-[0.15em] uppercase text-white/30">
              Los Angeles, California
            </p>
          </div>
        </div>
        
        {/* Middle section */}
        <div 
          className={`grid md:grid-cols-3 gap-12 mb-16 animate-fade-up ${
            isInView ? 'in-view' : ''
          }`}
          style={{ animationDelay: '100ms' }}
        >
          {/* Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">
              Navigation
            </p>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Social */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">
              Social
            </p>
            <nav className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/50 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Newsletter hint */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">
              Stay Connected
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Follow along for inspiration, behind-the-scenes moments, and our latest projects.
            </p>
          </div>
        </div>
        
        {/* Bottom section */}
        <div 
          className={`flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-white/5 animate-fade-up ${
            isInView ? 'in-view' : ''
          }`}
          style={{ animationDelay: '200ms' }}
        >
          <p className="text-[10px] tracking-[0.15em] uppercase text-white/20 mb-4 md:mb-0">
            &copy; {currentYear} Carmel Rose Collective. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-[10px] tracking-[0.15em] uppercase text-white/20 hover:text-white/50 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-[10px] tracking-[0.15em] uppercase text-white/20 hover:text-white/50 transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
