import { 
  Navigation, 
  Hero, 
  Services, 
  Portfolio, 
  About, 
  Contact, 
  Footer 
} from '@/components';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="flex flex-col bg-carmel-bg">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
