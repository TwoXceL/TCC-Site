import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { BlogQuiz } from '../components/BlogQuiz';
import { blogPosts } from '../data/blogs';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-bg">
        <h1 className="text-4xl font-serif text-primary mb-4">Post not found</h1>
        <button 
          onClick={() => navigate('/blog')} 
          className="text-accent underline uppercase tracking-widest text-sm rounded-sm cursor-pointer"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const excerpt = post.excerpt || post.body[0] || '';
  const postUrl = `https://theconsciouscollective.ca/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Sheri MacLeod',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Conscious Collective Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theconsciouscollective.ca/favicon-512.png',
      },
    },
    mainEntityOfPage: postUrl,
  };

  return (
    <div className="min-h-screen bg-bg">
      <Helmet>
        <title>{`${post.title} | The Conscious Collective`}</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={`${post.title} | The Conscious Collective`} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Centered hero header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-40 pb-20 px-4 text-center border-b border-primary/10"
      >
        <span className="text-accent text-[15px] uppercase tracking-[0.4em] mb-6 block">{post.category}</span>
        <h1 className="text-4xl md:text-6xl font-serif text-primary tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
          {post.title}
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] text-primary/40 font-body">{post.date} &nbsp;·&nbsp; {post.readTime}</p>
        <div className="w-12 h-[2px] bg-accent mx-auto mt-8" />
      </motion.div>

      {/* Balanced two-column body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-7xl mx-auto px-4 md:px-20 py-24 grid grid-cols-1 md:grid-cols-3 gap-20 items-start"
      >
        {/* Left — article body */}
        <div className="md:col-span-2 space-y-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-bold hover:text-primary transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to all articles
          </button>

          <div className="prose prose-lg max-w-none text-primary/80 font-body leading-relaxed space-y-6">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed">{paragraph}</p>
            ))}
          </div>

          <div className="pt-12 border-t border-primary/10 flex items-center justify-between">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-bold hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to all articles
            </button>
            <span className="text-xs uppercase tracking-widest text-primary/40 font-bold">{post.category}</span>
          </div>

          {/* Interactive Quiz integration */}
          <BlogQuiz postSlug={post.slug} />
        </div>

        {/* Right — author card & consultation CTA */}
        <div className="space-y-10">
          <div className="p-8 border border-primary/10 bg-[#F9F9F4]">
            <span className="text-accent text-[15px] uppercase tracking-[0.4em] mb-4 block">Author</span>
            <h4 className="text-2xl font-serif text-primary mb-3">Sheri MacLeod</h4>
            <p className="text-sm font-body text-primary/70 leading-relaxed mb-6">
              Founder of The Conscious Collective. Fractional HR strategist, leadership coach, and facilitator helping Alberta businesses and leaders align culture with performance.
            </p>
            <a
              href="mailto:hello@theconsciouscollective.ca"
              className="text-xs uppercase tracking-widest text-accent font-bold hover:text-primary transition-colors"
            >
              hello@theconsciouscollective.ca
            </a>
          </div>

          <div className="p-8 bg-primary text-white">
            <span className="text-accent text-[15px] uppercase tracking-[0.4em] mb-4 block">Work With Us</span>
            <h4 className="text-2xl font-serif text-white mb-4">Start the Conversation</h4>
            <p className="text-sm font-body text-white/70 leading-relaxed mb-6">
              Whether you are looking for fractional HR advisory for your team or personal coaching for your relationships, book a complimentary consultation to explore how we can support you.
            </p>
            <a
              href="https://scheduler.zoom.us/sheri-macleod"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-8 py-4 bg-accent text-white text-[15px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-primary transition-all rounded-sm cursor-pointer"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};
