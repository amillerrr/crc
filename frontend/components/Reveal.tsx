"use client";
import { motion, Variants, Transition } from "framer-motion";
import { ReactNode } from "react";

type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "blur";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // in seconds, e.g., 0.2
  type?: AnimationType;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}

const getVariants = (type: AnimationType): Variants => {
  const baseHidden = { opacity: 0 };
  const baseVisible = { opacity: 1 };
  const variantMap: Record<AnimationType, Variants> = {
    "fade": {
      hidden: { ...baseHidden, y: 20 },
      visible: { ...baseVisible, y: 0 }
    },
    "slide-up": {
      hidden: { ...baseHidden, y: 75 },
      visible: { ...baseVisible, y: 0 }
    },
    "slide-down": {
      hidden: { ...baseHidden, y: -75 },
      visible: { ...baseVisible, y: 0 }
    },
    "slide-left": {
      hidden: { ...baseHidden, x: 75 },
      visible: { ...baseVisible, x: 0 }
    },
    "slide-right": {
      hidden: { ...baseHidden, x: -75 },
      visible: { ...baseVisible, x: 0 }
    },
    "scale": {
      hidden: { ...baseHidden, scale: 0.85 },
      visible: { ...baseVisible, scale: 1 }
    },
    "blur": {
      hidden: { ...baseHidden, filter: "blur(10px)" },
      visible: { ...baseVisible, filter: "blur(0px)" }
    }
  };
  return variantMap[type];
};
export default function Reveal({
  children,
  width = "fit-content",
  delay = 0,
  type = "fade",
  duration = 0.8,
  once = false,
  amount = 0.2,
  className = "",
}: RevealProps) {
  const variants = getVariants(type);
  const transition: Transition = {
    type: "spring",
    damping: 25,
    stiffness: 80,
    duration,
    delay,
  };

  return (
    <div style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount, margin: "-10%" }}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}
