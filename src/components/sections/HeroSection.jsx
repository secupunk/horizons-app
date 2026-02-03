import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Plane, Trophy, Footprints, Calendar, ArrowRight } from 'lucide-react';
import ExternalLinkIcon from '../../utils/ExternalLinkIcon';
import { trackAppNavigation } from '../../utils/analyticsTracking';

export default function HeroSection() {
  const heroImage = "https://images.unsplash.com/photo-1629159183951-7cb9bd3ee8df?auto=format&fit=crop&q=80";
  const daysLeft = Math.ceil((new Date('2026-02-14') - new Date('2026-01-14')) / (1000 * 60 * 60 * 24));

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-[#001F3F]">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          src={heroImage} 
          className="w-full h-full object-cover absolute inset-0 mix-blend-overlay" 
          alt="Couple running in city" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/90 via-[#001F3F]/50 to-[#001F3F] z-10"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 text-center pt-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Urgency Badge */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FF1493]/20 border border-[#FF1493] text-[#FF1493] text-sm md:text-base font-bold tracking-wider mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,20,147,0.4)]"
          >
            <Calendar className="w-4 h-4" />
            🎁 VALENTINE'S SPECIAL - {daysLeft} DAYS LEFT
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl font-playfair">
            Show Your City <br />
            Some Love This <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-red-500 filter drop-shadow-[0_0_25px_rgba(255,20,147,0.6)]">
              Valentine's Day 💗
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">Professional heart-shaped GPS routes for 100+ cities worldwide. Perfect for Valentine's, travel memories, or showing city love. Download, sync, and run in minutes.</p>

          {/* Secondary Mentions */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-300 font-medium mb-10 opacity-90">
            <span className="flex items-center gap-2"><Plane className="w-4 h-4 text-blue-400" /> Perfect for Travel</span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" /> Special Events</span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="flex items-center gap-2"><Footprints className="w-4 h-4 text-green-400" /> Great for Walking</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="https://heart.cityheart.run" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={trackAppNavigation}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#FF1493] to-red-600 text-white rounded-full text-xl font-bold transition-all shadow-[0_0_30px_rgba(255,20,147,0.5)] hover:shadow-[0_0_50px_rgba(255,20,147,0.7)] hover:scale-105 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Try It Free - Generate Route</span>
              <ExternalLinkIcon className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
            </a>
            <a 
              href="#pricing" 
              className="group relative px-8 py-5 border border-white/20 text-white rounded-full text-xl font-bold transition-all hover:bg-white/10 hover:shadow-lg hover:scale-105 flex items-center gap-3"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}