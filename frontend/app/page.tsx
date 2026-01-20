import { 
  Navigation, 
  Hero, 
  Services, 
  Portfolio, 
  About, 
  Contact
} from '@/components';

export default function Home() {
  return (
    <>
      <Navigation />
      {/* Snap Container:
         We wrap everything in main. 
         Global CSS 'html { scroll-snap-type: y mandatory }' handles the rest.
      */}
      <main id="main-content" className="bg-carmel-bg w-full">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
    </>
  );
}
