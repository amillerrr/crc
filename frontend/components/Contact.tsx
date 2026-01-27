"use client";
import { useState, useRef } from 'react';
import Reveal from './Reveal';
import { contactConfig, getResponsiveConfig } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { isMobile } = useBreakpoint(contactConfig.breakpoint);
  
  // Get current viewport-specific config
  const viewportConfig = getResponsiveConfig(contactConfig, isMobile);

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

  // Generate inline styles from config
  const sectionStyle: React.CSSProperties = {
    paddingTop: viewportConfig.spacing.paddingTop,
    paddingBottom: viewportConfig.spacing.paddingBottom,
    minHeight: viewportConfig.dimensions.minHeight,
    height: viewportConfig.dimensions.height,
  };

  const contentStyle: React.CSSProperties = {
    paddingLeft: viewportConfig.spacing.paddingX,
    paddingRight: viewportConfig.spacing.paddingX,
  };

  return (
    <section
      id="contact"
      className="snap-section bg-warm-white relative overflow-hidden flex flex-col justify-center"
      style={sectionStyle}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 bg-gradient-radial from-carmel-text/5 to-transparent" />
      </div>

      {/* Main Content (Centered) */}
      <div 
        className="flex-1 flex flex-col justify-center w-full max-w-lg mx-auto relative z-10 py-12 md:py-0"
        style={contentStyle}
      >
        <Reveal width="100%">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
              Get in Touch
            </h2>
            <div className="mt-6 w-12 h-px bg-carmel-text/20 mx-auto" />
          </div>
        </Reveal>
        
        <Reveal width="100%" delay={0.2}>
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-6"
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
        </Reveal>
      </div>
    </section>
  );
}
