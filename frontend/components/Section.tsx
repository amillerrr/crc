"use client";
import { ReactNode } from 'react';

/**
 * ============================================
 * SECTION COMPONENT
 * ============================================
 * 
 * A reusable wrapper component for page sections.
 * Applies consistent styling while allowing per-section customization.
 * 
 * USAGE:
 * <Section name="services" id="services" className="bg-carmel-bg">
 *   <YourContent />
 * </Section>
 * 
 * The component automatically:
 * - Applies the correct CSS class (section-{name})
 * - Adds snap-section base class
 * - Handles the section ID for navigation
 */

export type SectionName = 'services' | 'portfolio' | 'about' | 'contact' | 'footer';

interface SectionProps {
  /** The section name - used to apply section-{name} CSS class */
  name: SectionName;
  /** The ID for anchor navigation (defaults to name if not provided) */
  id?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Child components */
  children: ReactNode;
  /** HTML tag to use (defaults to 'section', use 'footer' for footer) */
  as?: 'section' | 'footer' | 'div';
  /** Whether to include snap-section base class (default: true) */
  useSnapSection?: boolean;
}

export default function Section({
  name,
  id,
  className = '',
  children,
  as: Component = 'section',
  useSnapSection = true,
}: SectionProps) {
  // Build the class string
  const baseClasses = useSnapSection ? 'snap-section' : '';
  const sectionClass = `section-${name}`;
  const fullClassName = `${baseClasses} ${sectionClass} ${className}`.trim();

  return (
    <Component
      id={id ?? name}
      className={fullClassName}
    >
      {children}
    </Component>
  );
}

/**
 * ============================================
 * SECTION CONTENT WRAPPER
 * ============================================
 * 
 * Optional inner wrapper for section content that needs
 * consistent max-width and horizontal padding.
 */

interface SectionContentProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl' | 'full';
  centerContent?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export function SectionContent({
  children,
  className = '',
  maxWidth = '7xl',
  centerContent = false,
}: SectionContentProps) {
  const baseClasses = `w-full mx-auto px-6 md:px-12 lg:px-16 ${maxWidthClasses[maxWidth]}`;
  const centerClasses = centerContent ? 'flex flex-col items-center justify-center h-full' : '';
  
  return (
    <div className={`${baseClasses} ${centerClasses} ${className}`.trim()}>
      {children}
    </div>
  );
}
