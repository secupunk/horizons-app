import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Activity, Share2 } from 'lucide-react';

const slides = [
  {
    image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/7d4e6b836456796f2413877000e47bc7.png",
    name: "Paris Heart Route",
    location: "Montparnasse, Paris",
    distance: "7.1 km",
    time: "53 min",
    elevation: "142m",
    theme: "pink",
    accent: "#FF1493"
  },
  {
    image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/09ed3f8852ccce0572cabbdb85ac611f.png",
    name: "Paris Running Course",
    location: "Paris, France",
    distance: "7.05 km",
    time: "48m 20s",
    elevation: "67m",
    theme: "blue",
    accent: "#00E5FF"
  }
];

export default function StravaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // Slightly longer duration to view details
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir) => {
    if (dir === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full max-w-sm md:max-w-md mx-auto relative group">
      {/* Dynamic Glow Effect */}
      <motion.div 
        animate={{ 
          backgroundColor: currentSlide.accent,
          opacity: 0.2 
        }}
        className="absolute inset-0 blur-[100px] rounded-full pointer-events-none transition-colors duration-500"
      />

      {/* Phone Frame */}
      <div className="relative z-10 bg-black rounded-[2.5rem] border-[8px] border-[#1a1f3d] shadow-2xl overflow-hidden aspect-[9/18] flex flex-col">
        
        {/* Strava UI Header */}
        <div className="bg-[#fc4c02] p-4 pt-8 text-white shrink-0 z-20">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
               <Activity className="w-5 h-5" />
               <span className="font-bold text-sm">Strava</span>
             </div>
             <Share2 className="w-5 h-5" />
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative flex-1 bg-white text-black overflow-hidden flex flex-col">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full flex flex-col"
            >
              {/* Image Area - Expanded to show more map */}
              <div className="relative flex-1 bg-gray-100 overflow-hidden">
                <img 
                  src={currentSlide.image} 
                  alt={currentSlide.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Stats Area */}
              <div className="p-5 pb-8 bg-white shrink-0 relative z-10 border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentIndex}`} alt="User" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">CityRunner</h3>
                    <p className="text-xs text-gray-500">{currentSlide.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold">{currentSlide.name}</h2>
                  <span className="text-lg animate-pulse">
                    {currentSlide.theme === 'pink' ? '💗' : '💙'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Distance</p>
                    <p className="text-lg font-medium">{currentSlide.distance}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Time</p>
                    <p className="text-lg font-medium">{currentSlide.time}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Elev</p>
                    <p className="text-lg font-medium">{currentSlide.elevation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls (Outside Phone) */}
      <button 
        onClick={() => navigate('prev')}
        className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 p-3 rounded-full bg-[#001F3F] border border-[#FF1493]/30 text-[#FF1493] hover:bg-[#FF1493] hover:text-white transition-all shadow-lg z-20 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => navigate('next')}
        className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 p-3 rounded-full bg-[#001F3F] border border-[#FF1493]/30 text-[#FF1493] hover:bg-[#FF1493] hover:text-white transition-all shadow-lg z-20 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Caption */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm font-medium">
          Actual routes created with CityHeart
        </p>
      </div>
    </div>
  );
}