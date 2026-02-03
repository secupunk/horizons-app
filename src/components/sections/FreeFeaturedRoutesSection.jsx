import React from 'react';
import FreeRouteCard from '../FreeRouteCard';

export default function FreeFeaturedRoutesSection({ routes }) {
  return (
    <section id="featured-routes" className="py-24 bg-[#0A0E27] relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-display">
            Featured Free Running Routes
          </h2>
          <p className="text-xl text-gray-400">
            High-precision GPX files for the world's most beautiful cities. Zero cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route) => (
            <FreeRouteCard key={route.id} route={route} />
          ))}
        </div>
      </div>
    </section>
  );
}