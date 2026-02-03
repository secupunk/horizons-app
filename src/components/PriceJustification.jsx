import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

function PriceJustification() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const items = [
    {
      title: "Romantic Dinner",
      price: "$150",
      status: "fail",
      icon: "🍽️"
    },
    {
      title: "Flowers & Gifts",
      price: "$50",
      status: "fail",
      icon: "💐"
    },
    {
      title: "CityHeart Experience",
      price: "$4.99",
      status: "success",
      icon: "❤️"
    }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[#0A0E27]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Create Memories, Not Bills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`
                relative p-6 rounded-xl flex flex-col items-center justify-center text-center
                transform transition-all duration-300 hover:scale-105
                ${item.status === 'success' 
                  ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20 border-2 border-pink-500 shadow-[0_0_30px_rgba(255,105,180,0.2)]' 
                  : 'bg-white/5 border border-white/10 opacity-80'}
              `}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {item.title}
              </h3>
              <div className={`text-2xl font-bold mb-4 ${item.status === 'success' ? 'text-pink-300' : 'text-gray-400'}`}>
                {item.price}
              </div>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${item.status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500/20 text-red-400'}
              `}>
                {item.status === 'success' ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PriceJustification;