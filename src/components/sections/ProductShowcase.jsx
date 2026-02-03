import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProductDemo from '../ProductDemo';

function ProductShowcase({ onReset, city }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref} 
      className="py-16 md:py-24 bg-gradient-to-b from-[#0A0E27] to-[#0f1435] relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-playfair">
            See It In <span className="text-gradient-pink">Action</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-poppins">
            Trace beautiful heart-shaped routes through your city, share with loved ones, and unlock premium features instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glow Effect behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl -z-10 opacity-75"></div>
          
          <ProductDemo onReset={onReset} city={city} />
        </motion.div>
      </div>
    </section>
  );
}

export default ProductShowcase;