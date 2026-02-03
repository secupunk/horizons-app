import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Search, MapPin, Activity } from 'lucide-react';
import { routesService } from '../../services/routesService';
import Breadcrumb from '../Breadcrumb';

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadRoutes = async () => {
      setLoading(true);
      try {
        // Updated service method now filters by is_public internally
        const data = await routesService.getAllRoutes();
        setRoutes(data || []);
      } catch (err) {
        console.error("Failed to load routes:", err);
        setError("Unable to load routes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadRoutes();
  }, []);

  const filteredRoutes = routes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0A0E27] min-h-screen text-white pt-24 pb-20 px-4">
       <Helmet>
          <title>100+ Free Heart-Shaped Running Routes | CityHeart</title>
          <meta name="description" content="Browse our collection of GPS art running routes. Free heart-shaped GPX downloads for cities worldwide including London, Paris, New York, and more." />
          <link rel="canonical" href="https://cityheart.run/routes" />
          <meta property="og:title" content="100+ Free Heart-Shaped Running Routes" />
       </Helmet>

       <div className="container mx-auto max-w-6xl">
          <Breadcrumb items={[{ label: "Routes", href: null }]} className="mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Routes</h1>
                <p className="text-gray-400 max-w-2xl">
                  Discover heart-shaped running routes in cities around the world. 
                  Download the GPX file and start your run.
                </p>
                {!loading && (
                   <p className="text-sm text-pink-500 font-semibold mt-2">
                      Showing {filteredRoutes.length} public routes
                   </p>
                )}
             </div>
             
             <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search city or route..." 
                  className="w-full md:w-80 bg-[#131b40] border border-white/10 rounded-full py-3 pl-10 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>

          {loading ? (
             <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading public routes...</p>
             </div>
          ) : error ? (
            <div className="text-center py-20">
               <p className="text-red-400 mb-4">{error}</p>
               <button onClick={() => window.location.reload()} className="text-white underline hover:text-pink-500">Try Again</button>
            </div>
          ) : filteredRoutes.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
               No routes found matching your search.
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRoutes.map(route => (
                   <Link to={`/routes/${route.slug}`} key={route.id} className="group block h-full">
                      <article className="bg-[#131b40] rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 transition-all h-full flex flex-col">
                         <div className="aspect-[4/3] overflow-hidden relative">
                            <img 
                               src={route.image_url} 
                               alt={`Run in ${route.city}`}
                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                               loading="lazy"
                            />
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                               {route.distance_km} km
                            </div>
                         </div>
                         <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-pink-500 text-sm font-medium mb-2">
                               <MapPin className="w-4 h-4" /> {route.city}
                            </div>
                            <h2 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{route.title}</h2>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                               Heart-shaped route through {route.city}.
                            </p>
                            
                            <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                               <span className="flex items-center gap-1 uppercase tracking-wider">
                                  <Activity className="w-3 h-3" /> {route.activity_type || 'Running'}
                               </span>
                               <span className="text-blue-400 font-medium group-hover:underline">
                                  View Details →
                               </span>
                            </div>
                         </div>
                      </article>
                   </Link>
                ))}
             </div>
          )}
       </div>
    </div>
  );
}