import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Plane, Trophy } from 'lucide-react';
import ExternalLinkIcon from '../../utils/ExternalLinkIcon';
import { trackAppNavigation } from '../../utils/analyticsTracking';

export default function FinalCTASection() {
  const daysLeft = Math.ceil((new Date('2026-02-14') - new Date('2026-01-14')) / (1000 * 60 * 60 * 24));

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#1a0b1c] to-[#2d0f1e] z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
      
      <div className="container relative z-10 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight font-playfair">
            Ready To Trace <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Your Love?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 font-light">100+ cities waiting for your footsteps. Instant delivery. Works for everyone.</p>

          <div className="mb-12">
            <a 
              href="#pricing"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0A0E27] rounded-full text-xl font-bold transition-all hover:scale-105 hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Get Your Heart Route - From €4.99 <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <a 
            href="https://heart.cityheart.run" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={trackAppNavigation}
            className="inline-flex items-center gap-1.5 text-lg text-pink-400 hover:text-pink-300 transition-colors mb-12"
          >
            Or try the free generator → <ExternalLinkIcon className="w-4 h-4" />
          </a>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 inline-block max-w-2xl w-full">
            <p className="text-sm font-bold text-pink-400 mb-4 uppercase tracking-wider">🔥 Popular Right Now</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4 text-pink-500" />
                <span>Valentine's Gifts <br /><span className="text-xs text-gray-500">({daysLeft} days left!)</span></span>
              </div>
              <div className="flex items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0">
                <Plane className="w-4 h-4 text-blue-500" />
                <span>Travel Memory <br />Collections</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>World Cup <br />Challenges</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}