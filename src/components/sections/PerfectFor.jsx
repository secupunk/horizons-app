import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Gift, Map, UserPlus, Sparkles } from 'lucide-react';

function PerfectFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const moments = [
    { 
      icon: Sparkles, 
      title: "The Ultimate Proposal", 
      desc: "Ask the big question with a route that says it all." 
    },
    { 
      icon: Heart, 
      title: "Valentine's Surprise", 
      desc: "Forget chocolates. Give them your sweat and heart." 
    },
    { 
      icon: Gift, 
      title: "Anniversary Gift", 
      desc: "Celebrate your years together with miles of love." 
    },
    { 
      icon: Map, 
      title: "City Love Letters", 
      desc: "Show your favorite city how much you love it." 
    },
    { 
      icon: UserPlus, 
      title: "Running Partners", 
      desc: "Surprise your run buddy with a special route." 
    }
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 bg-gradient-to-b from-[#1a1f3a] to-[#0A0E27] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-playfair leading-tight">
              Perfect for life's most <span className="text-gradient-pink">romantic moments</span>
            </h2>
            
            <div className="space-y-6">
              {moments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-pink-500/10"
                  >
                    <div className="bg-pink-500/20 p-3 rounded-lg text-pink-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 font-playfair">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute top-0 right-0 w-3/4 h-3/5 rounded-2xl overflow-hidden shadow-2xl border border-pink-500/20 z-10">
              <img 
                src="https://images.unsplash.com/photo-1695860844351-63f8b8545ea7" 
                alt="Romantic sunset moment" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-3/4 h-3/5 rounded-2xl overflow-hidden shadow-2xl border border-pink-500/20 z-20">
              <img 
                src="https://images.unsplash.com/photo-1670388429858-881804cbc864" 
                alt="Holding hands running" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white font-playfair text-2xl font-bold">
                Make memories that last.
              </div>
            </div>
            
            {/* Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-pink-500/30 rounded-full animate-spin-slow pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PerfectFor;