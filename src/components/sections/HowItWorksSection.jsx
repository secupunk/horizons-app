import React from 'react';
import { motion } from 'framer-motion';
import { Map, Download, Share2 } from 'lucide-react';
import StravaCarousel from './StravaCarousel';

export default function HowItWorksSection() {
  const steps = [
    { 
      icon: <Map className="w-6 h-6 text-[#FF1493]" />, 
      title: "1. Choose Your City", 
      desc: "Select a heart route near you.", 
      image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/0e18cdb21c6a6d6d44fcbc19402c8593.png", 
      stats: "New York • 6.6km"
    },
    { 
      icon: <Download className="w-6 h-6 text-[#00E5FF]" />, 
      title: "2. Download GPX", 
      desc: "Sync instantly to your watch.", 
      image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/4ca804504dd0a99b245970c4e6c21677.png", 
      stats: "Barcelona • 6.8km"
    },
    { 
      icon: <Share2 className="w-6 h-6 text-[#AA00FF]" />, 
      title: "3. Run & Share", 
      desc: "Create art with your feet.", 
      image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/835d213264e9733bf14c70973caccf90.png", 
      stats: "London • 7.8km"
    },
  ];

  return (
    <section className="py-24 bg-[#001F3F]" id="how-it-works">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">From Map To Masterpiece</h2>
          <p className="text-gray-300">Simple process. Stunning results.</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-24">
          <div className="hidden md:block absolute top-[40%] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#FF1493]/20 via-[#00E5FF]/20 to-[#AA00FF]/20 z-0 border-t border-dashed border-white/20" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="relative w-full max-w-[280px] aspect-[9/16] bg-black rounded-[2.5rem] border-[8px] border-[#1a1f3d] shadow-2xl overflow-hidden mb-8 transform transition-transform duration-500 group-hover:-translate-y-2">
                 <img 
                   src={step.image} 
                   alt={step.title}
                   className="w-full h-full object-cover opacity-90"
                   loading="lazy"
                 />
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                   <div className="flex items-center gap-2 mb-1">
                     <div className="p-1.5 bg-white/10 rounded-full backdrop-blur-md">
                       {step.icon}
                     </div>
                     <span className="text-xs font-bold text-white">{step.title}</span>
                   </div>
                   <p className="text-[10px] text-gray-300 text-left pl-1">{step.stats}</p>
                 </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Strava Integration Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center pt-16 border-t border-white/10">
          <div className="text-left order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-4 text-white">See Your Run As Art</h3>
            <p className="text-lg text-gray-300 mb-6">
              Join thousands of runners turning their daily cardio into creative expression. 
              Syncs perfectly with Strava to light up your feed.
            </p>
            <ul className="space-y-4 mb-8">
              {["Get more Kudos on Strava", "Visualize your effort", "Challenge your friends", "Create lasting memories"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <div className="w-6 h-6 rounded-full bg-[#FF1493]/20 flex items-center justify-center shrink-0">
                    <Share2 className="w-3 h-3 text-[#FF1493]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative order-1 md:order-2">
            <StravaCarousel />
          </div>
        </div>

      </div>
    </section>
  );
}