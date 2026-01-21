"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // in seconds, e.g., 0.2
  type?: "fade" | "slide" | "scale";
}

export default function Reveal({ 
  children, 
  width = "fit-content", 
  delay = 0,
  type = "fade" 
}: RevealProps) {
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: type === "slide" ? 75 : 20,
      scale: type === "scale" ? 0.95 : 1 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,     // Controls the "bounciness"
        stiffness: 80,   // Controls the speed/snap
        duration: 0.8,
        delay: delay,
      }
    },
  };

  return (
    <div style={{ width, overflow: "hidden" }}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        // UPDATED: once: false ensures animations replay every time 
        // the slide comes into view, creating the "transition" effect.
        viewport={{ once: false, margin: "-10%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
