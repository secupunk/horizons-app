import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function FreeHeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#0A1628] to-[#1E293B] py-24 md:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF1493] animate-pulse"></span>
            <span className="text-pink-300 text-sm font-bold uppercase tracking-wider">Limited Time Offer</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif">
            Try CityHeart for <span className="text-[#FF1493]">Free</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
            Download 5 featured GPX running routes instantly to test on your watch. No account required, no friction. Love the run? Access our full library of 100+ cities.
          </p>

          {/* Stats Bar */}
          <div className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-6 bg-slate-800/50 border border-slate-700 backdrop-blur-sm px-6 py-3 rounded-2xl md:rounded-full mb-12">
            {[
              "5 High-Quality Routes",
              "No Signup Needed",
              "GPX for Garmin/Strava"
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <Check className="w-4 h-4 text-[#FF1493]" />
                {stat}
              </div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="animate-bounce"
          >
            <a href="#featured-routes" className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-2 text-sm font-medium">
              Start Exploring
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}