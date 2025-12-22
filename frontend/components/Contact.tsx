"use client";
import { useState, useRef } from 'react';

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
      newErrors.message = 'Message is too long (max 5000 characters)';
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
        setMessage('Message sent successfully. We will be in touch shortly.');
        formRef.current?.reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'Unable to send. Please try again later.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to send. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-20 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-5xl mb-4">Let&apos;s Create Together</h2>
        <p className="font-sans text-xs text-gray-400 mb-16 uppercase tracking-[0.2em]">
          Inquire for availability
        </p>
        
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="space-y-8 text-left"
          noValidate
        >
          <div>
            <label 
              htmlFor="contact-name"
              className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2"
            >
              Name
            </label>
            <input 
              id="contact-name"
              name="name" 
              type="text" 
              autoComplete="name"
              className={`w-full border-b py-2 focus:outline-none transition bg-transparent font-serif text-xl ${
                errors.name 
                  ? 'border-red-400 focus:border-red-500' 
                  : 'border-gray-200 focus:border-black'
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              disabled={status === 'loading'}
              required 
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="contact-email"
              className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2"
            >
              Email
            </label>
            <input 
              id="contact-email"
              name="email" 
              type="email" 
              autoComplete="email"
              className={`w-full border-b py-2 focus:outline-none transition bg-transparent font-serif text-xl ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500' 
                  : 'border-gray-200 focus:border-black'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={status === 'loading'}
              required 
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="contact-message"
              className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2"
            >
              Project Details
            </label>
            <textarea 
              id="contact-message"
              name="message" 
              rows={4} 
              className={`w-full border-b py-2 focus:outline-none transition bg-transparent resize-none font-serif text-xl ${
                errors.message 
                  ? 'border-red-400 focus:border-red-500' 
                  : 'border-gray-200 focus:border-black'
              }`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              disabled={status === 'loading'}
              required
            />
            {errors.message && (
              <p id="message-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-carmel-text text-white py-5 uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-carmel-text focus-visible:ring-offset-2 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg 
                  className="animate-spin h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              'Send Inquiry'
            )}
          </button>

          {message && (
            <p 
              className={`text-center text-sm mt-6 font-sans ${
                status === 'success' ? 'text-green-600' : 'text-red-500'
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
