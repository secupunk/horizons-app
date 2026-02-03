import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden"
        >
          <div className="relative bg-[#001F3F]/95 backdrop-blur-lg border-t border-[#FF1493]/50 p-4 pb-6 rounded-t-2xl shadow-[0_-4px_20px_rgba(255,20,147,0.3)]">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute -top-3 right-4 bg-[#001F3F] border border-[#FF1493]/50 rounded-full p-1 text-[#FF1493] shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center mb-2">
              <span className="text-xs text-[#FF1493] font-semibold uppercase tracking-wider">No Download Needed</span>
            </div>
            <a
              href="https://heart.cityheart.run"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-center text-lg font-bold text-white rounded-full bg-[#FF1493] shadow-lg shadow-[#FF1493]/30"
            >
              <ExternalLink className="w-4 h-4" />
              Open App
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingCTA;