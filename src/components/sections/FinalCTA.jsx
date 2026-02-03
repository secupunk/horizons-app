import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lock, Heart, Globe } from 'lucide-react';

function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref}
      className="py-32 relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1689455612985-4ac44a7faa61" 
          alt="Couple hugging at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-8 animate-pulse" fill="currentColor" />
          
          <h2 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 text-white font-playfair leading-tight"
          >
            Show them you love them.
            <br />
            <span className="text-gradient-pink">Run for them.</span>
          </h2>

          <p 
            className="text-xl sm:text-2xl text-gray-300 mb-12 font-poppins font-light"
          >
            Start your romantic journey today directly in your browser.
            <br className="hidden sm:block" />
            No app to download. Just open, create, and run.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <a
              href="https://heart.cityheart.run"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 text-xl sm:text-2xl font-bold rounded-full text-white shadow-[0_0_30px_rgba(255,105,180,0.5)] transform transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-pink-500 to-red-600 border border-white/20"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Open App
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Works on any device</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Secure checkout</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div>Instant Access</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;