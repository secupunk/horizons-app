import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Navigation, Clock } from 'lucide-react';

function Cities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const cityMaps = [
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/0e18cdb21c6a6d6d44fcbc19402c8593.png', 
      name: 'New York',
      dist: '6.6 km',
      time: '49 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/4ca804504dd0a99b245970c4e6c21677.png', 
      name: 'Barcelona',
      dist: '6.8 km',
      time: '51 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/835d213264e9733bf14c70973caccf90.png', 
      name: 'London',
      dist: '7.8 km',
      time: '58 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/d1bff08a89ff516e281608ce264fa7f2.png', 
      name: 'Rome',
      dist: '7.0 km',
      time: '53 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/f3799391dab57d4be35d5a020711dab7.png', 
      name: 'Amsterdam',
      dist: '4.2 km',
      time: '35 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/16bae484b9d86723aa6660b047193c18.png', 
      name: 'Paris',
      dist: '5.5 km',
      time: '45 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/cb1a8e09cbc78e31119582da84c4e9f7.png', 
      name: 'Brussels',
      dist: '6.0 km',
      time: '50 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/d81ef4bab9d5f22f6a3dbc73ae9fe717.png', 
      name: 'Camden',
      dist: '5.2 km',
      time: '42 min'
    },
    { 
      url: 'https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/2a0859b81c77cfae098dc5e39a14346f.png', 
      name: 'Toulouse',
      dist: '4.8 km',
      time: '38 min'
    }
  ];

  return (
    <section 
      id="cities"
      ref={ref} 
      className="py-24 bg-[#001F3F]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white font-playfair">
            Choose Your Route
          </h2>
          <p className="text-xl text-gray-300 font-poppins">
            Explore 100+ cities. Find the heart of your town.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {cityMaps.map((mapImg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/5 group bg-[#0A0E27] aspect-[4/5] sm:aspect-square"
            >
              <img
                src={mapImg.url}
                alt={`${mapImg.name} GPS Art Route`}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute top-4 right-4 z-10">
                 <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 group-hover:bg-[#FF1493]/20 group-hover:border-[#FF1493]/50 transition-colors">
                    <Heart className="w-4 h-4 text-white group-hover:text-[#FF1493] group-hover:fill-[#FF1493] transition-colors" />
                 </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white font-playfair mb-2">{mapImg.name}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                   <div className="flex items-center gap-1.5">
                     <Navigation className="w-3.5 h-3.5 text-[#00E5FF]" />
                     <span>{mapImg.dist}</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <Clock className="w-3.5 h-3.5 text-[#FF1493]" />
                     <span>{mapImg.time}</span>
                   </div>
                </div>

                <div className="w-full h-0.5 bg-white/10 mt-4 overflow-hidden rounded-full">
                  <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-[#FF1493] to-purple-500 transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button className="px-10 py-4 rounded-full text-lg font-bold text-white bg-[#FF1493] shadow-[0_0_30px_-5px_rgba(255,20,147,0.4)] hover:shadow-[0_0_50px_-10px_rgba(255,20,147,0.6)] transition-all">
             View All 100+ Cities
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Cities;