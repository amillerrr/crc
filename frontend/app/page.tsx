"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

// --- COMPONENTS ---

const Navigation = () => (
  <nav className="fixed w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center uppercase tracking-widest text-[10px] md:text-xs text-carmel-text">
    <div className="font-serif text-lg md:text-xl tracking-normal font-bold">Carmel Rose</div>
    <div className="hidden md:flex gap-8">
      <a href="#services" className="hover:opacity-60 transition">Services</a>
      <a href="#portfolio" className="hover:opacity-60 transition">Portfolio</a>
      <a href="#about" className="hover:opacity-60 transition">About</a>
      <a href="#contact" className="hover:opacity-60 transition">Contact</a>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-carmel-bg">
      {/* Decorative large faint text in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-carmel-accent opacity-20 pointer-events-none select-none whitespace-nowrap">
        Carmel Rose
      </div>

      <div className="relative z-10 text-center text-carmel-text px-4 w-full max-w-[90vw]">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.4em] uppercase mb-12 text-gray-500"
        >
          Est. 2024
        </motion.p>

        {/* Updated Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif mb-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
        >
          <span className="text-xl md:text-3xl lg:text-4xl tracking-[0.3em] font-light whitespace-nowrap relative z-0">
            CARMEL
          </span>
          
          {/* Updates for Italianno:
             1. Slightly adjusted margins (-mx-3) for the new letter width.
             2. Italianno has a very clean, non-loopy "R".
          */}
          <span className="font-script text-8xl md:text-9xl lg:text-[11rem] text-carmel-text relative z-10 -my-4 md:-my-0 md:-mx-3 lg:-mx-5 leading-none pb-4 md:pb-0">
            Rose
          </span>
          
          <span className="text-xl md:text-3xl lg:text-4xl tracking-[0.3em] font-light whitespace-nowrap relative z-0">
            COLLECTIVE
          </span>
        </motion.h1>

        <motion.a 
          href="#services"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-block border border-carmel-text px-12 py-4 text-[10px] tracking-[0.25em] uppercase hover:bg-carmel-text hover:text-white transition duration-500"
        >
          Discover
        </motion.a>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Brand Activation", desc: "Immersive physical experiences that bring your brand narrative to life." },
    { title: "Experiential Marketing", desc: "Strategic events designed to engage consumers and drive viral conversation." },
    { title: "Event Production", desc: "End-to-end logistics, design, and execution for seamless occasions." }
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-20 bg-carmel-bg">
      <div className="grid md:grid-cols-3 gap-16 border-t border-carmel-text/10 pt-16">
        {services.map((s, i) => (
          <div key={i} className="group cursor-pointer">
            <span className="block font-sans text-[10px] text-gray-400 mb-6 tracking-widest">0{i + 1}</span>
            <h3 className="font-serif text-3xl mb-4 group-hover:italic transition-all duration-300">{s.title}</h3>
            <p className="font-sans text-sm leading-loose text-gray-500 w-5/6">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="font-serif text-5xl mb-3">Selected Works</h2>
        <p className="font-script text-4xl text-gray-400">moments we've crafted</p>
      </div>
      
      {/* Masonry-style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[400px]">
        <div className="relative group overflow-hidden bg-neutral-100">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519671482502-9759101d4561?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-700"/>
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                <span className="text-white font-serif italic text-3xl">Solstice Gala</span>
             </div>
        </div>
        <div className="relative group overflow-hidden bg-neutral-200 lg:row-span-2 lg:h-[816px]">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-700"/>
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                <span className="text-white font-serif italic text-3xl">Lumina Launch</span>
             </div>
        </div>
        <div className="relative group overflow-hidden bg-neutral-100">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-700"/>
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                 <span className="text-white font-serif italic text-3xl">Apex Retreat</span>
             </div>
        </div>
        <div className="relative group overflow-hidden bg-neutral-100">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-700"/>
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                 <span className="text-white font-serif italic text-3xl">Velvet Lounge</span>
             </div>
        </div>
        <div className="relative group overflow-hidden bg-neutral-100">
             <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-700"/>
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                 <span className="text-white font-serif italic text-3xl">Echo Chamber</span>
             </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 px-6 md:px-20 bg-carmel-bg flex flex-col md:flex-row gap-20 items-center">
    <div className="md:w-1/2 relative">
       <div className="aspect-[3/4] w-3/4 mx-auto md:mr-auto grayscale contrast-125 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80')] bg-cover bg-center shadow-2xl"></div>
       <div className="absolute -bottom-6 -right-6 md:right-10 bg-white p-6 shadow-xl">
          <p className="font-serif italic text-xl">"Details are not just details."</p>
       </div>
    </div>
    <div className="md:w-1/2">
      <h2 className="font-serif text-5xl md:text-6xl mb-10 leading-none">The Art of <br/> <span className="italic text-gray-400">Gathering</span></h2>
      <p className="font-sans text-gray-600 leading-loose mb-8 text-sm md:text-base">
        Carmel Rose Collective was born from a desire to blend strategy with soul. We believe that an event is not just a date on a calendar, but a chapter in a brand's story. We obsess over the tactile, the visual, and the emotional resonance of every space we touch.
      </p>
      <div className="grid grid-cols-2 gap-8 mt-12 border-t border-gray-300 pt-8">
        <div>
          <span className="font-serif text-5xl block mb-2">50+</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Unique Activations</span>
        </div>
        <div>
          <span className="font-serif text-5xl block mb-2">12</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Cities Worldwide</span>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      // Relative path: Caddy routes this to backend container
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('Message sent successfully. We will be in touch shortly.');
        form.reset();
      } else {
        setStatus('Unable to send. Please try again later.');
      }
    } catch (err) {
      setStatus('Unable to send. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-20 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-5xl mb-4">Let's Create Together</h2>
        <p className="font-sans text-xs text-gray-400 mb-16 uppercase tracking-[0.2em]">Inquire for availability</p>
        
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Name</label>
            <input name="name" type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition bg-transparent font-serif text-xl" required />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Email</label>
            <input name="email" type="email" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition bg-transparent font-serif text-xl" required />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Project Details</label>
            <textarea name="message" rows={4} className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition bg-transparent resize-none font-serif text-xl" required></textarea>
          </div>
          <button type="submit" className="w-full bg-carmel-text text-white py-5 uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-700 transition duration-300">
            Send Inquiry
          </button>
          {status && <p className="text-center text-sm mt-6 font-sans text-gray-500">{status}</p>}
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-carmel-text text-white py-16 text-center">
    <p className="font-serif text-3xl mb-6">Carmel Rose Collective</p>
    <div className="flex justify-center gap-8 mb-10">
       <span className="text-[10px] uppercase tracking-widest opacity-60 cursor-pointer hover:opacity-100 transition">Instagram</span>
       <span className="text-[10px] uppercase tracking-widest opacity-60 cursor-pointer hover:opacity-100 transition">Pinterest</span>
       <span className="text-[10px] uppercase tracking-widest opacity-60 cursor-pointer hover:opacity-100 transition">Email</span>
    </div>
    <div className="opacity-20 text-[10px] uppercase tracking-widest">
      &copy; 2025 Carmel Rose Collective. All Rights Reserved.
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-carmel-bg">
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
