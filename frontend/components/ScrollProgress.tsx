"use client";
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the snap container or fall back to document
      const snapContainer = document.querySelector('.snap-container');
      
      let scrollTop: number;
      let docHeight: number;
      
      if (snapContainer) {
        scrollTop = snapContainer.scrollTop;
        docHeight = snapContainer.scrollHeight - snapContainer.clientHeight;
      } else {
        scrollTop = window.scrollY;
        docHeight = document.documentElement.scrollHeight - window.innerHeight;
      }
      
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100);
    };

    // Listen on snap container if it exists
    const snapContainer = document.querySelector('.snap-container');
    const target = snapContainer || window;
    
    target.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => target.removeEventListener('scroll', handleScroll);
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
