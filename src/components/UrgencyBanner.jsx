import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-[#FFE4F0] to-[#FFB6D9] text-[#0A0E27] shadow-md"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-sm sm:text-base font-semibold text-center flex-1">
            <span className="font-bold mr-1">cityheart.run</span> 🌹 Valentine's Day Special - <span className="font-bold text-pink-700">34 days left</span> - Perfect last-minute gift
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UrgencyBanner;