import React from 'react';
import { Helmet } from 'react-helmet';

const RouteDetailClient = ({ route }) => {
  if (!route) return null;

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-24">
      <Helmet>
        <title>{`${route.city} Heart GPS Art - CityHeart.run`}</title>
        <meta name="description" content={`Découvrez le parcours en forme de cœur à ${route.city}.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-black italic uppercase mb-8">
          {route.city} <span className="text-pink-500">Heart</span>
        </h1>
        {route.image_url && (
          <img src={route.image_url} alt={route.city} className="w-full max-w-2xl mx-auto rounded-3xl border border-white/10 shadow-2xl" />
        )}
        <div className="mt-8 text-2xl font-bold">{route.distance_km} km</div>
      </div>
    </div>
  );
};

export default RouteDetailClient;
