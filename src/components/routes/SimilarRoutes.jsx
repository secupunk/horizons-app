import React, { useEffect, useState } from 'react';
import { routesService } from '../../services/routesService';
import RouteCard from './RouteCard';

export default function SimilarRoutes({ city, currentSlug }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const data = await routesService.getSimilarRoutes(city, currentSlug);
        if (mounted) {
          setRoutes(data);
        }
      } catch (error) {
        console.error("Failed to fetch similar routes:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (city) fetch();

    return () => { mounted = false; };
  }, [city, currentSlug]);

  if (!loading && routes.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-16 mt-16">
      <h2 className="text-2xl font-bold text-white mb-8">More Routes in {city}</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
             <div key={i} className="aspect-[4/3] bg-white/5 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      )}
    </div>
  );
}