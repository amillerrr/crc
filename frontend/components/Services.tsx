const services = [
  { 
    title: "Brand Activation", 
    desc: "Immersive physical experiences that bring your brand narrative to life." 
  },
  { 
    title: "Experiential Marketing", 
    desc: "Strategic events designed to engage consumers and drive viral conversation." 
  },
  { 
    title: "Event Production", 
    desc: "End-to-end logistics, design, and execution for seamless occasions." 
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-20 bg-carmel-bg">
      <h2 className="sr-only">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-16 border-t border-carmel-text/10 pt-16">
        {services.map((service, i) => (
          <article key={service.title} className="group cursor-pointer">
            <span 
              className="block font-sans text-[10px] text-gray-400 mb-6 tracking-widest"
              aria-hidden="true"
            >
              0{i + 1}
            </span>
            <h3 className="font-serif text-3xl mb-4 group-hover:italic transition-all duration-300">
              {service.title}
            </h3>
            <p className="font-sans text-sm leading-loose text-gray-500 w-5/6">
              {service.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
