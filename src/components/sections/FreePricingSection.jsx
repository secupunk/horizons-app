import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Heart, Sparkles, Globe } from 'lucide-react';
import { trackAddToCart } from '../../utils/analyticsTracking';

const PricingCard = ({ title, price, features, popular, icon: Icon, link, productKey }) => (
  <div className={`relative p-8 rounded-3xl border flex flex-col h-full transition-transform hover:scale-105 ${
    popular 
      ? 'bg-[#1a1625] border-pink-500 shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)] md:-translate-y-4' 
      : 'bg-white/5 border-white/10'
  }`}>
    {popular && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
        🔥 Most Popular
      </span>
    )}
    
    <div className="mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
        popular ? 'bg-pink-500/20 text-pink-500' : 'bg-white/10 text-white'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>

    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-3xl lg:text-4xl font-black text-white">€{price}</span>
      <span className="text-sm text-gray-500">/one-time</span>
    </div>

    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <Check size={16} className="text-pink-500 shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <Link
      to={link}
      onClick={() => trackAddToCart(productKey, price)}
      className={`block w-full py-4 rounded-xl font-bold text-center transition-all ${
        popular
          ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-lg'
          : 'bg-white text-[#0A0E27] hover:bg-gray-100'
      }`}
    >
      Get Access
    </Link>
  </div>
);

export default function FreePricingSection() {
  return (
    <section className="py-24 bg-[#0A0E27]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Loved the experience?</h2>
          <p className="text-xl text-gray-400">Unlock our full library of 100+ cities worldwide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          <PricingCard 
            title="Single Heart"
            price="4.99"
            features={["Pick any city", "Instant GPX Download", "Lifetime Access"]}
            icon={Heart}
            link="/routes"
            productKey="single_heart"
          />
          <PricingCard 
            title="Lover's Pack"
            price="9.99"
            popular={true}
            features={["3 unique routes", "Save €5.00", "Perfect for couples", "Instant Download"]}
            icon={Sparkles}
            link="/routes"
            productKey="lovers_pack"
          />
          <PricingCard 
            title="Explorer Pack"
            price="24.99"
            features={["10 routes of choice", "Save €25.00", "World Cup 2026 Ready", "Best Value"]}
            icon={Globe}
            link="/routes"
            productKey="explorer_pack"
          />
        </div>
      </div>
    </section>
  );
}