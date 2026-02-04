import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { routesService } from '../../services/routesService';
import { MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await routesService.getAllRoutes();
      setRoutes(data || []);
    };
    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter(route =>
    route.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0A0E27] min-h-screen pt-32 pb-20 px-6">
      <Helmet>
        <title>All Heart Routes | CityHeart.run</title>
        <meta name="description" content="Browse all our heart-shaped running routes worldwide." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase mb-8">All Routes</h1>
        
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by city..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-pink-500 transition-colors text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredRoutes.map(route => (
            <Link key={route.id} to={`/routes/${route.slug}`} className="group">
              <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/5 group-hover:border-pink-500/50 transition-all">
                <img src={route.image_url} alt={route.city} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold uppercase italic text-white">{route.city}</h3>
                    <span className="text-pink-500 font-bold">{route.distance_km}km</span>
                  </div>
                  <p className="text-slate-500 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {route.country}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
