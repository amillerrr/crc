"use client";
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

export default function About() {
  // Use the strict margins defined in your system
  const { ref, isInView } = useInView({ 
    threshold: 0.25,
    rootMargin: '0px 0px -50% 0px' 
  });

  return (
    <section 
      id="about" 
      className="snap-section scroll-mt-0 py-16 sm:py-20 md:py-28 lg:py-32 bg-carmel-bg min-h-screen flex items-center" 
      ref={ref}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-6xl mx-auto w-full">
        
        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className={`font-serif text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-balance relative inline-block ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}
          >
            Our Story
            <span className={`absolute -bottom-2 left-0 h-[1px] bg-carmel-text/60 transition-all duration-[1.5s] ease-luxury delay-500 ${isInView ? 'w-full' : 'w-0'}`} />
          </h2>
        </div>

        <div className="grid gap-14 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* IMAGE COLUMN */}
          <div className={`${isInView ? 'reveal-image-visible' : 'reveal-image-hidden'}`}>
            <div className="relative aspect-[3/4] w-full sm:max-w-sm mx-auto lg:mx-0 overflow-hidden">
              <Image
                src="/about/profile-bree.webp"
                alt="Bree Chenelia - Founder of Carmel Rose Collective"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority // Added priority since this is a key visual
              />
            </div>
          </div>
          
          {/* TEXT COLUMN */}
          <div 
            className={`space-y-4 text-carmel-text/60 text-[15px] sm:text-[15px] leading-relaxed delay-200 ${isInView ? 'reveal-text-visible' : 'reveal-text-hidden'}`}
          >
            <p>
              Carmel Rose Collective was founded by Los Angeles native Bree Chenelia to bring together what she does best: design forward experiences executed with precision, calm, and an uncompromising eye for detail.
            </p>
            <p className="delay-100">
              With more than a decade in events, hospitality, and experiential marketing, Bree built her career from the ground up—earning a reputation as the go-to partner for high stakes projects, tight timelines, and moments that feel effortless to the untrained eye. Her work spans collaborations across a wide range of brands, from luxury, high touch houses to everyday consumer names, always bringing the same level of intention, polish, and operational excellence.
            </p>
            <p className="delay-200">
              Carmel Rose Collective exists at the intersection of artistry and logistics—concepting, production, and finishing touches carried through from the first idea to the final guest moment. Bree is known for delivering under pressure and tight turnarounds, and for curating every detail that makes an experience feel elevated, intentional, and truly memorable.
            </p>
            <p className="delay-300">
              With every project, Carmel Rose Collective aims to redefine what’s possible—creating spaces and experiences that are as beautifully designed as they are flawlessly executed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
