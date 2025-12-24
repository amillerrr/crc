"use client";
import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

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
      className="scroll-mt-20 md:scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 bg-warm-white" 
      ref={sectionRef}
    >
      <div className="px-5 sm:px-6 md:px-12 lg:px-16 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 
            className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Get in Touch
          </h2>
        </div>
        
        {/* Form */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className={`space-y-5 sm:space-y-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          <div>
            <label 
              htmlFor="name"
              className="block text-[10px] tracking-[0.15em] uppercase text-carmel-text/35 mb-2"
            >
              Name
            </label>
            <input 
              id="name"
              name="name" 
              type="text" 
              autoComplete="name"
              className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300 placeholder:text-carmel-text/20"
              disabled={status === 'loading'}
              required 
            />
          </div>

          <div>
            <label 
              htmlFor="email"
              className="block text-[10px] tracking-[0.15em] uppercase text-carmel-text/35 mb-2"
            >
              Email
            </label>
            <input 
              id="email"
              name="email" 
              type="email" 
              autoComplete="email"
              className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300 placeholder:text-carmel-text/20"
              disabled={status === 'loading'}
              required 
            />
          </div>

          <div>
            <label 
              htmlFor="message"
              className="block text-[10px] tracking-[0.15em] uppercase text-carmel-text/35 mb-2"
            >
              Message
            </label>
            <textarea 
              id="message"
              name="message" 
              rows={4}
              className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300 resize-none placeholder:text-carmel-text/20"
              disabled={status === 'loading'}
              required
            />
          </div>

          <div className="pt-3 sm:pt-4">
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full py-3 sm:py-3.5 text-[10px] tracking-[0.15em] uppercase border border-carmel-text/15 text-carmel-text/60 hover:bg-carmel-text hover:text-white hover:border-carmel-text transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {message && (
            <p 
              className={`text-center text-sm ${
                status === 'success' ? 'text-carmel-text/50' : 'text-red-500/70'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
