import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Map, Download, Share2 } from 'lucide-react';

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: Map,
      title: 'Choose your city',
      description: 'Find your perfect location from our collection of 100+ curated heart routes worldwide.'
    },
    {
      icon: Download,
      title: 'Get the route instantly',
      description: 'Receive the GPS file immediately. It works with any watch or phone app (Strava, Garmin, etc).'
    },
    {
      icon: Share2,
      title: 'Run & share the love',
      description: 'Complete the route to reveal the heart shape on your map. Share it and surprise them!'
    }
  ];

  return (
    <section 
      id="how-it-works"
      ref={ref} 
      className="py-24 bg-[#0A0E27]"
      aria-label="How it works section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent font-playfair">
            Your Romantic Gesture
          </h2>
          <p className="text-gray-400 text-lg uppercase tracking-widest font-semibold">in 3 simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-pink-500/0 via-pink-500/50 to-pink-500/0 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div 
                  className="w-24 h-24 rounded-full bg-[#0A0E27] border-4 border-pink-500/20 group-hover:border-pink-500 flex items-center justify-center mb-8 transition-colors duration-300 shadow-[0_0_30px_rgba(255,105,180,0.1)] group-hover:shadow-[0_0_30px_rgba(255,105,180,0.3)]"
                >
                  <Icon className="w-10 h-10 text-white group-hover:text-pink-400 transition-colors" />
                </div>
                <h3 
                  className="text-2xl font-bold text-white mb-4 font-playfair"
                >
                  {step.title}
                </h3>
                <p 
                  className="text-gray-400 text-lg leading-relaxed px-4 font-poppins"
                >
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;