"use client";
import { useState, useRef } from 'react';
import Reveal from './Reveal';
import { contactConfig, getResponsiveConfig, FORM_LIMITS } from '@/config/sections.config';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * ============================================
 * CONTACT SECTION
 * ============================================
 * 
 * Contact form with client-side validation.
 * Form limits are defined in sections.config.ts and match backend limits.
 */

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

    // Client-side validation
    if (!data.name || !data.email || !data.message) {
      setStatus('error');
      setMessage('Please fill in all fields.');
      return;
    }

    // Validate lengths (matches backend limits)
    if (data.name.length > FORM_LIMITS.name.maxLength) {
      setStatus('error');
      setMessage(`Name must be ${FORM_LIMITS.name.maxLength} characters or less.`);
      return;
    }

    if (data.email.length > FORM_LIMITS.email.maxLength) {
      setStatus('error');
      setMessage(`Email must be ${FORM_LIMITS.email.maxLength} characters or less.`);
      return;
    }

    if (data.message.length > FORM_LIMITS.message.maxLength) {
      setStatus('error');
      setMessage(`Message must be ${FORM_LIMITS.message.maxLength} characters or less.`);
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

  // Helper to check if field has value (for floating label)
  const getFieldValue = (fieldName: string): string => {
    if (!formRef.current) return '';
    const element = formRef.current.elements.namedItem(fieldName) as HTMLInputElement | HTMLTextAreaElement | null;
    return element?.value || '';
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
            noValidate
          >
            {/* Name Field */}
            <div className="relative">
              <label 
                htmlFor="name" 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focusedField === 'name' || getFieldValue('name')
                    ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' 
                    : 'top-2.5 text-base text-carmel-text/30'
                }`}
              >
                Name
              </label>
              <input 
                id="name" 
                name="name" 
                type="text"
                maxLength={FORM_LIMITS.name.maxLength}
                className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300"
                disabled={status === 'loading'} 
                required 
                onFocus={() => setFocusedField('name')} 
                onBlur={(e) => !e.target.value && setFocusedField(null)}
                aria-describedby="name-limit"
              />
              <span id="name-limit" className="sr-only">
                Maximum {FORM_LIMITS.name.maxLength} characters
              </span>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focusedField === 'email' || getFieldValue('email')
                    ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' 
                    : 'top-2.5 text-base text-carmel-text/30'
                }`}
              >
                Email
              </label>
              <input 
                id="email" 
                name="email" 
                type="email"
                maxLength={FORM_LIMITS.email.maxLength}
                className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300"
                disabled={status === 'loading'} 
                required 
                onFocus={() => setFocusedField('email')} 
                onBlur={(e) => !e.target.value && setFocusedField(null)}
                aria-describedby="email-limit"
              />
              <span id="email-limit" className="sr-only">
                Maximum {FORM_LIMITS.email.maxLength} characters
              </span>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label 
                htmlFor="message" 
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focusedField === 'message' || getFieldValue('message')
                    ? '-top-5 text-[9px] tracking-[0.15em] uppercase text-carmel-text/50' 
                    : 'top-2.5 text-base text-carmel-text/30'
                }`}
              >
                Message
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={2}
                maxLength={FORM_LIMITS.message.maxLength}
                className="w-full bg-transparent border-b border-carmel-text/12 py-2.5 text-base focus:outline-none focus:border-carmel-text/35 transition-colors duration-300 resize-none"
                disabled={status === 'loading'} 
                required 
                onFocus={() => setFocusedField('message')} 
                onBlur={(e) => !e.target.value && setFocusedField(null)}
                aria-describedby="message-limit"
              />
              <span id="message-limit" className="sr-only">
                Maximum {FORM_LIMITS.message.maxLength} characters
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={status === 'loading'} 
                className="w-full py-3 flex justify-center items-center text-[10px] tracking-[0.15em] uppercase border border-carmel-text/15 text-carmel-text/60 hover:bg-carmel-text hover:text-white hover:border-carmel-text transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p 
                className={`text-center text-xs ${status === 'success' ? 'text-carmel-text/50' : 'text-red-500/70'}`}
                role={status === 'error' ? 'alert' : 'status'}
              >
                {message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
