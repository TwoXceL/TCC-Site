import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { submitToHubSpot } from '../lib/hubspot';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Strategic HR Consulting',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactHelmet = (
    <Helmet>
      <title>Contact The Conscious Collective | Book HR Consulting & Coaching Alberta</title>
      <meta name="description" content="Get in touch with The Conscious Collective Inc. Book a discovery call with Sheri MacLeod, email hello@theconsciouscollective.ca, or call 587-797-5303. Serving Red Deer and all of Alberta." />
      <link rel="canonical" href="https://theconsciouscollective.ca/contact" />
      <meta property="og:title" content="Contact The Conscious Collective | HR & Coaching Alberta" />
      <meta property="og:description" content="Book a discovery call or send a message. Fractional HR consulting and personal coaching services across Alberta." />
      <meta property="og:url" content="https://theconsciouscollective.ca/contact" />
    </Helmet>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitToHubSpot({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      source: 'contact_form',
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Something went wrong. Please try again or reach out directly.');
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {contactHelmet}

      {/* Centered hero header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-40 pb-20 px-4 text-center border-b border-primary/10"
      >
        <span className="text-accent text-[15px] uppercase tracking-[0.4em] mb-6 block">Connect With Us</span>
        <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-tight mb-6">
          Get in Touch
        </h1>
        <p className="text-xl font-body text-primary/70 max-w-xl mx-auto leading-relaxed">
          We would love to hear from you. Fill out the form, send us an email, or book directly on our scheduler.
        </p>
        <div className="w-12 h-[2px] bg-accent mx-auto mt-8" />
      </motion.div>

      {/* Balanced two-column body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-7xl mx-auto px-4 md:px-20 py-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch"
      >
        {/* Left — contact info */}
        <div className="flex flex-col gap-10">
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-sm border border-primary/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[15px] uppercase tracking-widest text-accent font-bold mb-1">Email</p>
                <a href="mailto:hello@theconsciouscollective.ca" className="text-lg font-body text-primary hover:text-accent transition-colors">
                  hello@theconsciouscollective.ca
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-sm border border-primary/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[15px] uppercase tracking-widest text-accent font-bold mb-1">Phone</p>
                <a href="tel:587-797-5303" className="text-lg font-body text-primary hover:text-accent transition-colors">
                  587-797-5303
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-sm border border-primary/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[15px] uppercase tracking-widest text-accent font-bold mb-1">Mailing Address</p>
                <p className="text-lg font-body text-primary/70 leading-relaxed">
                  PO Box 25191, RPO Deer Park<br />Red Deer, AB, T4R 2M2
                </p>
              </div>
            </div>
          </div>

          {/* Schedule card */}
          <div className="p-10 bg-primary text-white flex-1 flex flex-col justify-center">
            <p className="text-[15px] uppercase tracking-[0.3em] font-bold text-accent mb-4">Book Immediately</p>
            <h4 className="text-2xl font-serif text-white mb-4">Prefer to schedule directly?</h4>
            <p className="text-base font-body text-white/70 leading-relaxed mb-8">
              Skip the inbox and book a complimentary consultation with Sheri MacLeod directly on Zoom.
            </p>
            <a
              href="https://scheduler.zoom.us/sheri-macleod"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent text-white text-[15px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-primary transition-all rounded-sm cursor-pointer"
            >
              Schedule Zoom Session <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right — contact form */}
        <div className="p-10 md:p-12 border border-primary/10 bg-[#F9F9F4]">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-accent rounded-sm flex items-center justify-center text-white mx-auto mb-6">
                <Send size={24} />
              </div>
              <h3 className="text-3xl font-serif text-primary mb-3">Message Sent</h3>
              <p className="text-base font-body text-primary/70 leading-relaxed max-w-md mx-auto mb-6">
                Thank you for reaching out, {formData.name.split(' ')[0] || ''}. We will review your inquiry and respond within 48 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', service: 'Strategic HR Consulting', message: '' });
                }}
                className="text-xs uppercase tracking-[0.2em] text-accent font-bold hover:text-primary transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-primary mb-2">Send Us a Message</h3>
                <p className="text-base font-body text-primary/50">We read every message and respond personally.</p>
              </div>

              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm flex items-center gap-3">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[15px] uppercase tracking-[0.2em] font-bold text-primary/50 block">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b-2 border-primary/10 py-3 focus:border-accent outline-none text-primary font-body text-base transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[15px] uppercase tracking-[0.2em] font-bold text-primary/50 block">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full bg-transparent border-b-2 border-primary/10 py-3 focus:border-accent outline-none text-primary font-body text-base transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[15px] uppercase tracking-[0.2em] font-bold text-primary/50 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(587) 000-0000"
                    className="w-full bg-transparent border-b-2 border-primary/10 py-3 focus:border-accent outline-none text-primary font-body text-base transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[15px] uppercase tracking-[0.2em] font-bold text-primary/50 block">Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-primary/10 py-3 focus:border-accent outline-none text-primary font-body text-base transition-colors cursor-pointer"
                  >
                    <option value="Strategic HR Consulting">Strategic HR Consulting</option>
                    <option value="Relationship Coaching">Individuals & Relationship Coaching</option>
                    <option value="Workshops & Speaking">Workshops & Speaking</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[15px] uppercase tracking-[0.2em] font-bold text-primary/50 block">Message</label>
                <textarea
                  rows={4}
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us a little bit about your team, your goals, or where you'd like support..."
                  className="w-full bg-transparent border-b-2 border-primary/10 py-3 focus:border-accent outline-none text-primary font-body text-base transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-white text-[15px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all flex items-center justify-center gap-3 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending to CRM...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};
