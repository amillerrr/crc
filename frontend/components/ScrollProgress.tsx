"use client";
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-[2px] z-[100] transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-carmel-text/5" />
      
      {/* Progress bar */}
      <div 
        className="h-full bg-gradient-to-r from-carmel-text/20 via-carmel-text/40 to-carmel-text/20 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      
      {/* Glow effect at the end */}
      <div 
        className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent to-carmel-text/10 blur-sm transition-all duration-150"
        style={{ left: `calc(${progress}% - 2rem)` }}
      />
    </div>
  );
}
