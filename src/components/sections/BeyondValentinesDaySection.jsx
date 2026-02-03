import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plane, Trophy, Users } from 'lucide-react';
import ExternalLinkIcon from '../../utils/ExternalLinkIcon';
import { trackAppNavigation } from '../../utils/analyticsTracking';

const Card = ({ icon: Icon, title, desc, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group h-full flex flex-col"
  >
    <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed flex-grow">{desc}</p>
  </motion.div>
);

export default function BeyondValentinesDaySection() {
  const cards = [
    {
      icon: Heart,
      title: "Romance & Relationships",
      desc: "The ultimate Valentine's surprise, anniversary celebration, creative proposal, or just a unique date idea.",
      color: "bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
    },
    {
      icon: Plane,
      title: "Travel & Tourism",
      desc: "Leave your heart in every city you visit. A perfect way to explore new places while building a unique travel collection.",
      color: "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
    },
    {
      icon: Trophy,
      title: "Events & Challenges",
      desc: "Celebrate big moments like the World Cup, Olympics, or marathons. Create themed challenges for your community.",
      color: "bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
    },
    {
      icon: Users,
      title: "For Everyone",
      desc: "Whether you run, walk, hike, or cycle. Go solo to clear your head or gather a group for a shared adventure.",
      color: "bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
    }
  ];

  return (
    <section className="py-24 bg-[#0A0E27] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Try Route Generator (Free Preview)</h2>
          <p className="text-xl text-gray-300">
            Generate heart-shaped routes for any location instantly.
          </p>
          <a
            href="https://heart.cityheart.run"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackAppNavigation}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-colors shadow-lg"
          >
            Generate Your Route <ExternalLinkIcon className="w-4 h-4" />
          </a>
          <p className="text-gray-400 text-sm mt-3">Or buy a code to download GPX files</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">
            Same perfect routes. Infinite possibilities.
          </p>
        </div>
      </div>
    </section>
  );
}