"use client";
import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.3 });
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    if (!data.name || !data.email || !data.message) {
      setStatus('error');
      setMessage('Please fill in all fields.');
      return;
    }
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Thank you. We\'ll be in touch soon.');
        formRef.current?.reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to send. Please check your connection.');
    }
  };

  return (
    <section 
      id="contact" 
      className="snap-section bg-warm-white relative overflow-hidden flex flex-col justify-between" 
      ref={sectionRef}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 bg-gradient-radial from-carmel-text/5 to-transparent" />
      </div>

      {/* Main Content (Centered) */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 w-full max-w-lg mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Get in Touch
          </h2>
          <div className={`mt-6 w-12 h-px bg-carmel-text/20 mx-auto transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
        </div>
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className={`space-y-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '150ms' }}
        >
          {['name', 'email', 'message'].map((field) => (
            <div key={field} className="relative">
              <label 
                htmlFor={field} 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focusedField === field || (formRef.current?.elements.namedItem(field) as HTMLInputElement)?.value 
                  ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' 
                  : 'top-2.5 text-base text-carmel-text/30'
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === 'message' ? (
                <textarea 
                  id={field} name={field} rows={2} 
                  className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300 resize-none"
                  disabled={status === 'loading'} required 
                  onFocus={() => setFocusedField(field)} 
                  onBlur={(e) => !e.target.value && setFocusedField(null)}
                />
              ) : (
                <input 
                  id={field} name={field} type={field === 'email' ? 'email' : 'text'} 
                  className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300"
                  disabled={status === 'loading'} required 
                  onFocus={() => setFocusedField(field)} 
                  onBlur={(e) => !e.target.value && setFocusedField(null)}
                />
              )}
            </div>
          ))}

          <div className="pt-4">
            <button type="submit" disabled={status === 'loading'} className="w-full py-3 flex justify-center items-center text-[10px] tracking-[0.15em] uppercase border border-carmel-text/15 text-carmel-text/60 hover:bg-carmel-text hover:text-white hover:border-carmel-text transition-all duration-400">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {message && <p className={`text-center text-xs ${status === 'success' ? 'text-carmel-text/50' : 'text-red-500/70'}`}>{message}</p>}
        </form>
      </div>

      {/* Footer / Copyright Section (Integrated) */}
      <div className="w-full px-6 md:px-12 pb-8 pt-4 border-t border-carmel-text/5 mt-auto">
        <div className={`flex justify-between items-center text-[10px] tracking-[0.15em] uppercase text-carmel-text/30 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <p>© {currentYear} CRC</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-carmel-text transition-colors">Instagram</a>
            <a href="#" className="hover:text-carmel-text transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
