import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato, Italianno } from "next/font/google";
import { SmoothScroll } from "@/components"; // Import the new component
import "./globals.css";

// Font Configuration
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({ 
  weight: ["300", "400"], 
  subsets: ["latin"], 
  variable: '--font-lato',
  display: 'swap',
});

const italianno = Italianno({ 
  weight: ["400"], 
  subsets: ["latin"], 
  variable: '--font-italianno',
  display: 'swap',
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
  keywords: ["experiential marketing", "brand activation", "event production", "luxury events", "corporate events"],
  authors: [{ name: "Carmel Rose Collective" }],
  creator: "Carmel Rose Collective",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Carmel Rose Collective",
    title: "Carmel Rose Collective",
    description: "Experiential marketing and brand activations. We craft immersive events that bring your brand narrative to life.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carmel Rose Collective",
    description: "Experiential marketing and brand activations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body 
        className={`${playfair.variable} ${lato.variable} ${italianno.variable} bg-carmel-bg text-carmel-text antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
