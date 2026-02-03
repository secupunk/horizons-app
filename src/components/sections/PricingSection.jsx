import React from 'react';
import { Helmet } from 'react-helmet';
import { Check, Sparkles, Heart, Globe, ShieldCheck } from 'lucide-react';
import ExternalLinkIcon from '../../utils/ExternalLinkIcon';
import { trackAddToCart, trackStripeCheckout, trackAppNavigation } from '../../utils/analyticsTracking';
import { generateProductSchema } from '../../utils/schemaGenerator';

const Tier = ({
  name,
  price,
  routes,
  savings,
  features,
  popular,
  bestValue,
  hint,
  icon: Icon,
  stripeLink,
  productKey
}) => {
  const handleBuyClick = () => {
    trackAddToCart(name, price); // Pixel
    trackStripeCheckout(productKey, price); // GA4
  };

  return (
    <div className={`relative p-8 rounded-3xl border flex flex-col h-full ${popular ? 'bg-[#1a1625] border-pink-500 shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)] transform md:-translate-y-4' : bestValue ? 'bg-[#0f1535] border-blue-500/50 shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10'}`}>
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
          🔥 Most Popular
        </span>
      )}
      {bestValue && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
          ⭐ Best Value
        </span>
      )}
      
      <div className="mb-4">
         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${popular ? 'bg-pink-500/20 text-pink-500' : bestValue ? 'bg-blue-500/20 text-blue-500' : 'bg-white/10 text-white'}`}>
           <Icon className="w-6 h-6" />
         </div>
         <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
         <p className="text-xs text-gray-400 min-h-[40px]">{hint}</p>
      </div>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl lg:text-4xl font-black text-white">€{price}</span>
        <span className="text-sm text-gray-500">/one-time</span>
      </div>
      
      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
          <span className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center font-bold text-xs text-white shadow-sm">{routes}</span>
          <span className="text-sm font-medium text-white">GPX Route{routes > 1 ? 's' : ''} Included</span>
        </div>
        {savings && <div className="text-green-400 text-sm font-bold flex items-center gap-2"><Check className="w-4 h-4" /> Save €{savings}</div>}
        
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <Check size={16} className="text-pink-500 shrink-0 mt-0.5" /> 
              <span className="leading-tight">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <a 
        href={stripeLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={handleBuyClick}
        className={`block w-full py-4 rounded-xl font-bold transition-all text-center text-sm uppercase tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] ${popular ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-pink-500/20' : bestValue ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/20' : 'bg-white text-[#0A0E27] hover:bg-gray-100'}`}
      >
        Buy {name} - €{price}
      </a>
      
      <a 
        href="https://heart.cityheart.run" 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={trackAppNavigation}
        className="block mt-4 text-center text-xs text-gray-400 hover:text-pink-400 hover:underline transition-colors"
      >
        Try it free first →
      </a>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-500">
        <ShieldCheck className="w-3 h-3 text-gray-400" />
        <span>7-Day Money-Back Guarantee</span>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const productSchemas = [
    generateProductSchema({
      name: "Single Heart - GPS Route",
      description: "One heart-shaped GPS route for a city of your choice. Instant digital download.",
      price: "4.99",
      url: "https://buy.stripe.com/00wcN66G11oV7MxfjI8so08",
      image: "https://cityheart.run/og-image.jpg"
    }),
    generateProductSchema({
      name: "Lover's Pack - 3 GPS Routes",
      description: "Three heart-shaped GPS routes. Perfect for couples or multiple cities.",
      price: "9.99",
      url: "https://buy.stripe.com/bJe00k6G16Jf0k58Vk8so09",
      image: "https://cityheart.run/og-image.jpg"
    }),
    generateProductSchema({
      name: "Explorer Pack - 10 GPS Routes",
      description: "Ten heart-shaped GPS routes including World Cup 2026 cities. Best value.",
      price: "24.99",
      url: "https://buy.stripe.com/dRm9AU1lH9Vr2sd2wW8so07",
      image: "https://cityheart.run/og-image.jpg"
    })
  ];

  return (
    <section className="py-24 bg-[#0A0E27] relative" id="pricing">
      <Helmet>
        {productSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Choose Your Love Package</h2>
          <p className="text-gray-400">No subscriptions. No installation required. Own your routes forever.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Tier 
            name="Single Heart" 
            price="4.99" 
            productKey="single_heart"
            routes={1} 
            icon={Heart} 
            hint="Perfect for: Valentine's gift | Travel memory | First time trying GPS art" 
            features={[
              "1 City Heart Route", 
              "Instant GPX Download + QR Code", 
              "One-Time Payment"
            ]}
            stripeLink="https://buy.stripe.com/00wcN66G11oV7MxfjI8so08"
          />
          <Tier 
            name="Lover's Pack" 
            price="9.99" 
            productKey="lovers_pack"
            routes={3} 
            savings="5" 
            icon={Sparkles} 
            popular={true} 
            hint="Perfect for: Couples (2 cities each) | Anniversary trip | Long-distance relationships" 
            features={[
              "3 City Heart Routes", 
              "Instant GPX Download + QR Code", 
              "One-Time Payment"
            ]}
            stripeLink="https://buy.stripe.com/bJe00k6G16Jf0k58Vk8so09"
          />
          <Tier 
            name="Explorer Pack" 
            price="24.99" 
            productKey="explorer_pack"
            routes={10} 
            savings="25" 
            icon={Globe} 
            bestValue={true}
            hint="Perfect for: World travelers | Running clubs | Year of adventures | Event collectors" 
            features={[
              "10 City Heart Routes", 
              "World Cup 2026 Cities Included", 
              "Instant GPX Download + QR Code", 
              "One-Time Payment"
            ]}
            stripeLink="https://buy.stripe.com/dRm9AU1lH9Vr2sd2wW8so07"
          />
        </div>
      </div>
    </section>
  );
}