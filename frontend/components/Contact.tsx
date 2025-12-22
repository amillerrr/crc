"use client";
import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  const validateForm = (data: { name: string; email: string; message: string }): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.length > 200) {
      newErrors.name = 'Name is too long';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.length > 5000) {
      newErrors.message = 'Message is too long';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
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
        setMessage('Your inquiry has been received. We look forward to connecting.');
        formRef.current?.reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'Unable to send. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to send. Please check your connection.');
    }
  };

  return (
    <section id="contact" className="py-32 md:py-40 bg-white" ref={sectionRef}>
      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-20">
          <div 
            className={`flex-grow h-px bg-carmel-text/10 animate-line-draw ${
              isInView ? 'in-view' : ''
            }`}
          />
          <span 
            className={`font-sans text-[10px] tracking-[0.4em] uppercase text-carmel-text/40 animate-fade-up ${
              isInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '150ms' }}
          >
            Get in Touch
          </span>
          <div 
            className={`flex-grow h-px bg-carmel-text/10 animate-line-draw ${
              isInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '100ms', transformOrigin: 'right' }}
          />
        </div>

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 
            className={`font-serif text-4xl md:text-5xl lg:text-6xl mb-6 animate-blur-reveal ${
              isInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '200ms' }}
          >
            Let&apos;s Create<br />
            <span className="italic text-carmel-text/40">Something Extraordinary</span>
          </h2>
          <p 
            className={`font-sans text-sm text-carmel-text/50 animate-fade-up ${
              isInView ? 'in-view' : ''
            }`}
            style={{ animationDelay: '350ms' }}
          >
            Every great project starts with a conversation
          </p>
        </div>
        
        {/* Form */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className={`max-w-xl mx-auto animate-fade-up ${isInView ? 'in-view' : ''}`}
          style={{ animationDelay: '450ms' }}
          noValidate
        >
          <div className="space-y-10">
            {/* Name */}
            <div className="group">
              <label 
                htmlFor="contact-name"
                className="flex items-center gap-3 mb-4"
              >
                <span className="text-carmel-text/20 text-[10px] font-mono">01</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-carmel-text/40 transition-colors duration-300 group-focus-within:text-carmel-text/70">
                  Your Name
                </span>
              </label>
              <input 
                id="contact-name"
                name="name" 
                type="text" 
                autoComplete="name"
                placeholder="Jane Smith"
                className={`w-full bg-transparent border-b py-3 font-serif text-xl placeholder:text-carmel-text/20 focus:outline-none transition-colors duration-300 ${
                  errors.name 
                    ? 'border-red-400' 
                    : 'border-carmel-text/10 focus:border-carmel-text/40'
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={status === 'loading'}
                required 
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-2" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label 
                htmlFor="contact-email"
                className="flex items-center gap-3 mb-4"
              >
                <span className="text-carmel-text/20 text-[10px] font-mono">02</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-carmel-text/40 transition-colors duration-300 group-focus-within:text-carmel-text/70">
                  Email Address
                </span>
              </label>
              <input 
                id="contact-email"
                name="email" 
                type="email" 
                autoComplete="email"
                placeholder="jane@company.com"
                className={`w-full bg-transparent border-b py-3 font-serif text-xl placeholder:text-carmel-text/20 focus:outline-none transition-colors duration-300 ${
                  errors.email 
                    ? 'border-red-400' 
                    : 'border-carmel-text/10 focus:border-carmel-text/40'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={status === 'loading'}
                required 
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-2" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="group">
              <label 
                htmlFor="contact-message"
                className="flex items-center gap-3 mb-4"
              >
                <span className="text-carmel-text/20 text-[10px] font-mono">03</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-carmel-text/40 transition-colors duration-300 group-focus-within:text-carmel-text/70">
                  Tell Us About Your Project
                </span>
              </label>
              <textarea 
                id="contact-message"
                name="message" 
                rows={4}
                placeholder="Describe your vision..."
                className={`w-full bg-transparent border-b py-3 font-serif text-xl placeholder:text-carmel-text/20 focus:outline-none transition-colors duration-300 resize-none ${
                  errors.message 
                    ? 'border-red-400' 
                    : 'border-carmel-text/10 focus:border-carmel-text/40'
                }`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                disabled={status === 'loading'}
                required
              />
              {errors.message && (
                <p id="message-error" className="text-red-500 text-xs mt-2" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-14">
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="group relative w-full py-6 text-[11px] tracking-[0.3em] uppercase overflow-hidden border border-carmel-text/20 transition-all duration-500 hover:border-carmel-text/40 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-4"
            >
              <span className="absolute inset-0 bg-carmel-text origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              
              <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 delay-100 group-hover:text-white">
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Status message */}
          {message && (
            <p 
              className={`text-center text-sm mt-8 ${
                status === 'success' ? 'text-green-600' : 'text-red-500'
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
