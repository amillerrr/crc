"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {}
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 80,
      duration: 0.8
    }
  }
};

export default function RevealGroup({
  children,
  staggerDelay = 0.15,
  initialDelay = 0,
  once = false,
  amount = 0.2,
  className = "",
}: RevealGroupProps) {
  const customContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      }
    }
  };

  return (
    <motion.div
      variants={customContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "-10%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
