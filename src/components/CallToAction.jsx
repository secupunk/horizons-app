import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full text-center"
    >
      <div className="mb-4 text-gray-300 text-sm">
        Works instantly on any device • No install required
      </div>
      <a 
        href="https://heart.cityheart.run"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-[#FF1493] rounded-full hover:bg-[#D10074] transition-colors shadow-[0_0_15px_rgba(255,20,147,0.4)]"
      >
        Create Your Route
      </a>
    </motion.div>
  );
};

export default CallToAction;