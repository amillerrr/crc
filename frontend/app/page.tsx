"use client";
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Navigation, 
  Header,
  IntroLoader,
  Services, 
  Portfolio, 
  About, 
  Contact,
  Footer
} from '@/components';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Intro Animation Overlay */}
      <IntroLoader onComplete={handleIntroComplete} />
      
      {/* Fixed Header with Logo */}
      <Header isVisible={introComplete} />
      
      {/* Navigation */}
      <Navigation isVisible={introComplete} />
      
      {/* Main Content */}
      <motion.main 
        id="main-content" 
        className="bg-carmel-bg w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <Services />
        <Portfolio />
        <About />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
