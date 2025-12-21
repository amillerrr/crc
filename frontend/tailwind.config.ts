import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'carmel-bg': '#F9F8F4',      // Bone / Cream
        'carmel-text': '#1C1C1C',    // Soft Charcoal
        'carmel-accent': '#E0DCD3',  // Greige
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
        script: ['var(--font-italianno)', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
