import React from 'react';
import { motion } from 'framer-motion';
import { Unlock, Watch, Navigation } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group"
  >
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default function FreeFeaturesSection() {
  return (
    <section className="py-24 bg-[#05081c] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose CityHeart?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">More than just a line on a map. We create experiences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Unlock}
            title="No Signup Needed"
            desc="We believe in open access. Download your files directly without creating an account or sharing your email."
            delay={0.1}
          />
          <FeatureCard 
            icon={Watch}
            title="Universal Format"
            desc="Our standard GPX files work seamlessly with Garmin, Strava, Apple Watch, Coros, Suunto, and all major apps."
            delay={0.2}
          />
          <FeatureCard 
            icon={Navigation}
            title="Pro GPS Art"
            desc="Every turn is calculated. Our algorithms ensure the heart shape is perfect while keeping you on runnable paths."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}