import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart, MapPin, Users } from 'lucide-react';

const TestimonialCard = ({ image, quote, author, location, useCase, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10 rounded-2xl pointer-events-none"></div>
    <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
      <img 
        src={image} 
        alt={author} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full">
        <Icon className="w-5 h-5 text-white" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
        <Quote className="w-8 h-8 text-pink-500 mb-4 opacity-80" />
        <p className="text-lg font-medium leading-relaxed mb-6 text-gray-100">"{quote}"</p>
        <div>
          <h4 className="font-bold text-xl">{author}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {location}</span>
            <span className="text-pink-500">•</span>
            <span className="text-pink-400">{useCase}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function RealStoriesSection() {
  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1503687695952-21f157f04f82?auto=format&fit=crop&q=80",
      quote: "I proposed at the tip of the heart in Central Park. She saw the route on my Strava afterwards and cried. Best run ever.",
      author: "Michael & Sarah",
      location: "New York, USA",
      useCase: "Proposal Run",
      icon: Heart
    },
    {
      image: "https://images.unsplash.com/photo-1694290652016-2c1a872b9d71?auto=format&fit=crop&q=80",
      quote: "My goal is to run a heart in every continent. 3 down, 4 to go! It's the best way to force myself to explore new cities.",
      author: "Elena R.",
      location: "Kyoto, Japan",
      useCase: "Travel Collection",
      icon: MapPin
    },
    {
      image: "https://images.unsplash.com/photo-1683825093981-9d45c106d3f0?auto=format&fit=crop&q=80",
      quote: "Our running club did the 'London Love' route for charity. 50 of us tracing a giant heart through the city was magical.",
      author: "Thames Harriers",
      location: "London, UK",
      useCase: "Club Event",
      icon: Users
    }
  ];

  return (
    <section className="py-24 bg-[#001F3F] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Real Stories, Real Hearts</h2>
          <p className="text-gray-300">Join the community of runners making art with their movement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}