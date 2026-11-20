import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Loader2 } from 'lucide-react';
import { submitToHubSpot } from '../lib/hubspot';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({ isOpen, onClose, title }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await submitToHubSpot({
      name: 'Community Member',
      email,
      message: `Newsletter opt-in from community modal: ${title}`,
      source: 'community_modal',
    });

    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setEmail('');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/20 backdrop-blur-md cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-bg border border-primary/10 p-10 rounded-sm shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-primary/40 hover:text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-6">
              <span className="text-[15px] uppercase tracking-[0.4em] text-accent font-medium">Join the Community</span>
              <h3 className="text-3xl font-serif text-primary tracking-tight">
                Opt into {title} updates
              </h3>
              <p className="text-primary/70 font-light leading-relaxed">
                Connect with our collective. Receive insights on human dynamics, 
                leadership, and mindful workspace advisory.
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 flex flex-col items-center gap-3 text-accent"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <p className="text-lg font-serif text-primary">Welcome to the Collective</p>
                  <p className="text-xs font-body text-primary/60">We have added your email to our private list.</p>
                </motion.div>
              ) : (
                <form className="pt-4 space-y-4" onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@address.com" 
                    className="w-full bg-white border border-primary/10 px-6 py-4 text-sm text-primary focus:outline-none focus:border-accent transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white py-4 text-[15px] uppercase tracking-[0.4em] font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      'Join Collective'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
