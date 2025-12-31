"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section 
      id="about" 
      className="scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-carmel-bg" 
      ref={ref}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
        {/* Two column layout - stacks on mobile with more breathing room */}
        <div className="grid gap-14 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Full width on mobile, constrained on desktop */}
            <div className="relative aspect-[3/4] w-full sm:max-w-sm mx-auto lg:mx-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Bree Chenelia - Founder of Carmel Rose Collective"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Content - Removed "Our Story" span */}
          <div>
            <h2 
              className={`font-serif text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 sm:mb-6 text-balance transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Our Story
            </h2>
            
            <div 
              className={`space-y-4 text-carmel-text/60 text-[15px] sm:text-[15px] leading-relaxed transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p>
                Carmel Rose Collective was founded by Los Angeles native Bree Chenelia to bring together what she does best: design forward experiences executed with precision, calm, and an uncompromising eye for detail.
              </p>
              <p>
                With more than a decade in events, hospitality, and experiential marketing, Bree built her career from the ground up—earning a reputation as the go-to partner for high stakes projects, tight timelines, and moments that feel effortless to the untrained eye. Her work spans collaborations across a wide range of brands, from luxury, high touch houses to everyday consumer names, always bringing the same level of intention, polish, and operational excellence.
              </p>
              <p>
                Carmel Rose Collective exists at the intersection of artistry and logistics—concepting, production, and finishing touches carried through from the first idea to the final guest moment. Bree is known for delivering under pressure and tight turnarounds, and for curating every detail that makes an experience feel elevated, intentional, and truly memorable.
              </p>
              <p>
                With every project, Carmel Rose Collective aims to redefine what’s possible—creating spaces and experiences that are as beautifully designed as they are flawlessly executed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
