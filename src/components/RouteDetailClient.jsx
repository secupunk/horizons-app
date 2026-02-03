import React from 'react';
import { Helmet } from 'react-helmet';

// On a supprimé l'import de RouteDetailClientContent qui faisait planter le build
const RouteDetailClient = ({ route }) => {
  if (!route) return null;

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-24">
      <Helmet>
        <title>{`${route.city} Heart GPS Art - CityHeart.run`}</title>
        <meta name="description" content={`Discover the heart-shaped route in ${route.city}.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black italic uppercase mb-8">
          {route.city} <span className="text-pink-500">Heart</span>
        </h1>
        
        <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 mb-8">
          <img 
            src={route.image_url} 
            alt={route.city} 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Distance</div>
            <div className="text-2xl font-black">{route.distance_km} km</div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-slate-500 text-xs uppercase font-bold mb-1">Difficulté</div>
            <div className="text-2xl font-black uppercase text-yellow-500">{route.difficulty || 'Moyenne'}</div>
          </div>
        </div>

        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          {route.description || `Prêt pour un défi romantique ? Courez ce tracé en forme de cœur à ${route.city}.`}
        </p>
      </div>
    </div>
  );
};

export default RouteDetailClient;
