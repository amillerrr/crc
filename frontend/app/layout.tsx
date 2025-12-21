import type { Metadata } from "next";
import { Playfair_Display, Lato, Italianno } from "next/font/google";
import "./globals.css";

// Font Configuration
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const lato = Lato({ weight: ["300", "400"], subsets: ["latin"], variable: '--font-lato' });

const italianno = Italianno({ 
  weight: ["400"], 
  subsets: ["latin"], 
  variable: '--font-italianno' 
});

export const metadata: Metadata = {
  title: "Carmel Rose Collective",
  description: "Experiential marketing and brand activations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} ${italianno.variable} bg-carmel-bg text-carmel-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
