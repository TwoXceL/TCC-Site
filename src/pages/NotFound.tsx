import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Home } from 'lucide-react';
import { Footer } from '../components/Footer';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col justify-between">
      <Helmet>
        <title>Page Not Found | The Conscious Collective</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="flex-1 flex items-center justify-center px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <span className="text-accent text-[15px] uppercase tracking-[0.4em] mb-4 block font-semibold">
            404 Error
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-lg font-body text-primary/70 leading-relaxed mb-10">
            The page you are looking for may have moved, been renamed, or does not exist. Let us guide you back to our core offerings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-[15px] uppercase tracking-[0.2em] font-bold hover:bg-accent transition-all rounded-sm inline-flex items-center justify-center gap-2"
            >
              <Home size={16} />
              Return Home
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 border border-primary/20 text-primary text-[15px] uppercase tracking-[0.2em] font-bold hover:border-accent hover:text-accent transition-all rounded-sm inline-flex items-center justify-center gap-2"
            >
              Get in Touch
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
