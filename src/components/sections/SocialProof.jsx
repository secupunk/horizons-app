import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, Heart } from 'lucide-react';

function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const testimonials = [
    {
      name: "Sarah, Paris",
      role: "Valentine's Surprise",
      text: "I woke up to a Strava notification from my boyfriend. He had woken up at 5am to run a giant heart around my apartment. I literally cried. Best Valentine's gift ever.",
      image: "https://images.unsplash.com/photo-1522845015757-50bce044e5da?auto=format&fit=crop&q=80&w=200&h=200",
      rating: 5
    },
    {
      name: "Tom, NYC",
      role: "The Proposal",
      text: "I told her we were going for a casual jog in Central Park. When we finished, I showed her the map trace on my phone. It was a heart. I dropped to one knee right there. She said YES! 💍",
      image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=200&h=200",
      rating: 5
    },
    {
      name: "Alex, Tokyo",
      role: "Viral Moment",
      text: "Ran the Shibuya heart route for our anniversary. Posted the trace on Instagram and it went completely viral. My partner was blown away by the effort. Highly recommend!",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
      rating: 5
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-[#0A0E27] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Love Stories in <span className="text-gradient-pink">Motion</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From tears of joy to "I do"—see how runners are using CityHeart to create unforgettable romantic moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:transform hover:-translate-y-2 group"
            >
              <Quote className="w-10 h-10 text-pink-500/20 mb-6" />
              <p className="text-gray-200 text-lg mb-8 leading-relaxed font-light">"{item.text}"</p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/50"
                />
                <div>
                  <h4 className="text-white font-bold font-playfair">{item.name}</h4>
                  <span className="text-pink-400 text-sm font-medium">{item.role}</span>
                </div>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;