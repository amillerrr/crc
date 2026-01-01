import type { Metadata, Viewport } from "next";
import { Poiret_One, Cormorant_Garamond, Parisienne } from "next/font/google";
import { SmoothScroll, ScrollProgress } from "@/components";
import "./globals.css";

// 1. Header Font
const poiretOne = Poiret_One({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-poiret-one",
  display: "swap",
});

// 2. Body Font
const cormorant = Cormorant_Garamond({ 
  weight: ["300", "400", "500", "600", "700"], 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  display: "swap",
});

// 3. New Accent Font (Parisienne)
const parisienne = Parisienne({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-parisienne", // Updated variable name
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F9F8F4',
};

export const metadata: Metadata = {
  title: {
    default: "Carmel Rose Collective",
    template: "%s | Carmel Rose Collective",
  },
  description: "Experiential marketing and brand activations. We craft immersive events that bring your brand narrative to life.",
  icons: {
    icon: '/CR-Favicon.webp',
    shortcut: '/CR-Favicon.webp',
    apple: '/CR-Favicon.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Added snap-container for soft scrolling physics
    <html lang="en" className="snap-container">
      <body 
        className={`${poiretOne.variable} ${cormorant.variable} ${parisienne.variable} bg-carmel-bg text-carmel-text antialiased`}
      >
        <ScrollProgress />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
