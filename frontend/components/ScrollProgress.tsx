"use client";
import { useState, useCallback } from 'react';
import { useLenisScroll } from './LenisProvider';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(({ progress: scrollProgress }: { progress: number }) => {
    setProgress(scrollProgress * 100);
  }, []);

  useLenisScroll(handleScroll);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[1000] pointer-events-none">
      <div
        className="h-full bg-carmel-text/20 transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

