import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Share2, Heart } from 'lucide-react';

function SocialProofIntegration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      ref={ref} 
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: '#0A0E27' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-6">
              <Instagram className="w-4 h-4" />
              <span className="text-sm font-semibold">#CityHeartRun</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white font-playfair leading-tight">
              Join 1,000+ couples who've created <span className="text-gradient-pink">heart routes</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 font-poppins leading-relaxed">
              Whether it's a proposal, a Valentine's surprise, or just a Tuesday morning declaration of love, your route tells a story. Sync seamlessly with Strava, share your map art on Instagram, and watch the reactions pour in.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="https://instagram.com/cityheartrun" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Share2 className="w-5 h-5" />
                Share your moment
              </a>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-lg border border-white/10 text-gray-300">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                <span>Tag us @cityheartrun</span>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-105 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1519923834699-ef0b7cde4712" 
                alt="Couple sharing a romantic moment after a run" 
                className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover h-[400px] sm:h-[500px]"
                loading="lazy"
              />
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl max-w-xs"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-white text-sm font-semibold mb-1">"Best anniversary gift ever!"</p>
                <div className="flex text-yellow-400 text-xs">★★★★★</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SocialProofIntegration;