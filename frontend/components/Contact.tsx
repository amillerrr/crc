"use client";
import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // STRICT TRIGGER: Center Screen Only
  const { ref: sectionRef, isInView } = useInView({ 
    threshold: 0.2,
    rootMargin: '0px 0px -50% 0px' 
  });

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
        setMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to send. Please check your connection.');
    }
  };

  return (
    <section 
      id="contact" 
      className="snap-section scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-warm-white relative overflow-hidden" 
      ref={sectionRef}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full animate-float-slower opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(180, 160, 140, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-lg mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Get in Touch
          </h2>
          
          <div className={`mt-6 w-12 h-px bg-carmel-text/20 mx-auto transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />
        </div>
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className={`space-y-6 sm:space-y-8 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '150ms' }}
        >
          {/* Name field */}
          <div className="relative">
            <label htmlFor="name" className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'name' || (formRef.current?.elements.namedItem('name') as HTMLInputElement)?.value ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' : 'top-2.5 text-base text-carmel-text/30'}`}>Name</label>
            <input id="name" name="name" type="text" autoComplete="name" className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300" disabled={status === 'loading'} required onFocus={() => setFocusedField('name')} onBlur={(e) => !e.target.value && setFocusedField(null)}/>
          </div>

          {/* Email field */}
          <div className="relative">
            <label htmlFor="email" className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'email' || (formRef.current?.elements.namedItem('email') as HTMLInputElement)?.value ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' : 'top-2.5 text-base text-carmel-text/30'}`}>Email</label>
            <input id="email" name="email" type="email" autoComplete="email" className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300" disabled={status === 'loading'} required onFocus={() => setFocusedField('email')} onBlur={(e) => !e.target.value && setFocusedField(null)}/>
          </div>

          {/* Message field */}
          <div className="relative">
            <label htmlFor="message" className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'message' || (formRef.current?.elements.namedItem('message') as HTMLTextAreaElement)?.value ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' : 'top-2.5 text-base text-carmel-text/30'}`}>Message</label>
            <textarea id="message" name="message" rows={4} className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300 resize-none" disabled={status === 'loading'} required onFocus={() => setFocusedField('message')} onBlur={(e) => !e.target.value && setFocusedField(null)}/>
          </div>

          {/* Submit button */}
          <div className="pt-3 sm:pt-4">
            <button type="submit" disabled={status === 'loading'} className="w-full py-3 sm:py-3.5 flex justify-center items-center pl-[0.15em] text-[10px] tracking-[0.15em] uppercase border border-carmel-text/15 text-carmel-text/60 hover:bg-carmel-text hover:text-white hover:border-carmel-text transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {message && <p className={`text-center text-sm ${status === 'success' ? 'text-carmel-text/50' : 'text-red-500/70'}`}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
