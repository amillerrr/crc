import Image from 'next/image';

const portfolioItems = [
  {
    title: "Solstice Gala",
    image: "https://images.unsplash.com/photo-1519671482502-9759101d4561?auto=format&fit=crop&q=80&w=800",
    span: "",
  },
  {
    title: "Lumina Launch",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    span: "lg:row-span-2",
  },
  {
    title: "Apex Retreat",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800",
    span: "",
  },
  {
    title: "Velvet Lounge",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800",
    span: "",
  },
  {
    title: "Echo Chamber",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    span: "",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="font-serif text-5xl mb-3">Selected Works</h2>
        <p className="font-script text-4xl text-gray-400">moments we&apos;ve crafted</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[400px]">
        {portfolioItems.map((item, index) => (
          <article 
            key={item.title}
            className={`relative group overflow-hidden bg-neutral-100 ${item.span} ${
              item.span ? 'lg:h-[816px]' : ''
            }`}
          >
            <Image
              src={item.image}
              alt={`${item.title} - Event photography`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover grayscale group-hover:grayscale-0 transition duration-700"
              loading={index < 3 ? "eager" : "lazy"}
            />
            <div 
              className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500"
              aria-hidden="true"
            >
              <span className="text-white font-serif italic text-3xl">
                {item.title}
              </span>
            </div>
            <span className="sr-only">{item.title}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
