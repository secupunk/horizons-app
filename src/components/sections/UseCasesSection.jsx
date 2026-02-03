import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Activity, Gem, Star } from 'lucide-react';

const cases = [
  { 
    icon: <Heart className="text-[#FF1493]" />, 
    title: "New York Love", 
    badge: "POPULAR", 
    desc: "Celebrate the Big Apple with this iconic heart route.",
    image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/0e18cdb21c6a6d6d44fcbc19402c8593.png",
    meta: "6.6 km • ~49 min"
  },
  { 
    icon: <Gem className="text-[#FF1493]" />, 
    title: "Barcelona Romance", 
    desc: "The ultimate flex for running couples in Spain.",
    image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/4ca804504dd0a99b245970c4e6c21677.png",
    meta: "6.8 km • ~51 min"
  },
  { 
    icon: <Users className="text-[#00E5FF]" />, 
    title: "London Group Run", 
    desc: "A perfect themed route for your Saturday morning club.",
    image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/835d213264e9733bf14c70973caccf90.png",
    meta: "7.8 km • ~58 min"
  },
  { 
    icon: <Star className="text-[#FFD700]" />, 
    title: "Rome Explorer", 
    desc: "Get kudos like never before on your Strava feed.",
    image: "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/d1bff08a89ff516e281608ce264fa7f2.png",
    meta: "7.0 km • ~53 min"
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-24 bg-[#001F3F] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Real Routes. Real Art.</h2>
          <p className="text-gray-300 text-lg">Every route is GPS-verified and ready to run.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative overflow-hidden group rounded-2xl bg-[#0A0E27] border border-white/10 shadow-lg aspect-[4/5] flex flex-col justify-end"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/40 to-transparent"></div>
              </div>

              {item.badge && (
                <span className="absolute top-3 right-3 z-10 text-[10px] font-bold px-2 py-1 bg-[#FF1493] rounded-md text-white shadow-lg">
                  {item.badge}
                </span>
              )}

              <div className="relative z-10 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 text-white">
                    {item.icon}
                  </div>
                  <div className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-[#FF1493] border border-white/10">
                    {item.meta}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-1 text-white leading-tight drop-shadow-md">{item.title}</h3>
                <p className="text-xs text-gray-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 drop-shadow-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}