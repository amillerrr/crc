"use client";
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // ms
  type?: 'text' | 'image' | 'fade'; // fade is generic opacity
  className?: string;
  threshold?: number;
}

export default function Reveal({ 
  children, 
  delay = 0, 
  type = 'text', 
  className = '',
  threshold = 0.2 
}: RevealProps) {
  const { ref, isInView } = useInView({ threshold, rootMargin: '0px 0px -20% 0px' });

  let animClass = '';
  if (type === 'text') animClass = isInView ? 'reveal-text-visible' : 'reveal-text-hidden';
  if (type === 'image') animClass = isInView ? 'reveal-image-visible' : 'reveal-image-hidden';
  if (type === 'fade') animClass = isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';

  return (
    <div 
      ref={ref} 
      className={`${className} ${animClass} transition-all duration-1000`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
