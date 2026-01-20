import type { Metadata, Viewport } from "next";
import { Poiret_One, Cormorant_Garamond, Parisienne } from "next/font/google";
import { SmoothScroll, ScrollProgress } from "@/components";
import { ScrollProvider } from "@/context/ScrollContext"; // New Import
import "./globals.css";

const poiretOne = Poiret_One({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-poiret-one",
  display: "swap",
});

const cormorant = Cormorant_Garamond({ 
  weight: ["300", "400", "500", "600", "700"], 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  display: "swap",
});

const parisienne = Parisienne({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-parisienne",
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
  description: "Experiential marketing and brand activations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // UPDATED: Added 'snap-y snap-mandatory h-screen overflow-y-scroll'
    <html lang="en" className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <body className={`${poiretOne.variable} ${cormorant.variable} ${parisienne.variable} bg-carmel-bg text-carmel-text antialiased`}>
        <ScrollProvider>
          <ScrollProgress />
          <SmoothScroll />
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
