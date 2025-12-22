const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'Email', href: 'mailto:hello@carmelrose.com' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-carmel-text text-white py-16 text-center" role="contentinfo">
      <p className="font-serif text-3xl mb-6">Carmel Rose Collective</p>
      
      <nav className="flex justify-center gap-8 mb-10" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-carmel-text rounded px-1"
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {link.label}
            {link.href.startsWith('http') && (
              <span className="sr-only"> (opens in new tab)</span>
            )}
          </a>
        ))}
      </nav>
      
      <div className="opacity-20 text-[10px] uppercase tracking-widest">
        &copy; {currentYear} Carmel Rose Collective. All Rights Reserved.
      </div>
    </footer>
  );
}
