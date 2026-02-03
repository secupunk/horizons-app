import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Heart, Map, Users } from 'lucide-react';
import Footer from '../Footer';

function About() {
  return (
    <div className="min-h-screen bg-[#0A0E27] text-gray-300">
      <Helmet>
        <title>About Us | CityHeart</title>
        <meta name="description" content="Learn about the CityHeart mission to help couples create romantic memories through heart-shaped running routes." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-900/10 to-[#0A0E27] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white font-playfair">
              We Map <span className="text-gradient-pink">Love</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-poppins leading-relaxed">
              CityHeart was born from a simple idea: turning a regular morning run into a declaration of love. We help couples worldwide explore their cities in the most romantic way possible.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Mission Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 p-8 rounded-2xl border border-pink-500/20 text-center"
          >
            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-400">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Our Mission</h3>
            <p>To inspire connection and romance through movement, helping couples create shared memories in every step.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 p-8 rounded-2xl border border-pink-500/20 text-center"
          >
            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-400">
              <Map className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Our Craft</h3>
            <p>We meticulously plan every route to ensure a perfect heart shape while prioritizing safe, scenic, and walkable paths.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white/5 p-8 rounded-2xl border border-pink-500/20 text-center"
          >
            <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-400">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-playfair">Our Community</h3>
            <p>From proposal runs to anniversary walks, thousands of couples have trusted CityHeart to guide their special moments.</p>
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 p-10 rounded-3xl border border-pink-500/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-playfair">The Vision for 2026 & Beyond</h2>
            <p className="text-lg text-gray-300 mb-6 font-poppins">
              What started as a single route in Paris has grown into a global collection of over 100 heart-shaped paths. But we're just getting started. 
            </p>
            <p className="text-lg text-gray-300 font-poppins">
              We envision a world where every city has a "heart beat" — a known route where couples go to celebrate their love, disconnect from screens, and reconnect with each other. Whether you're a marathon runner or a casual walker, CityHeart is for you.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;