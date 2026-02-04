import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { routesService } from '../../services/routesService';
import { ChevronLeft, Download, MapPin, Share2 } from 'lucide-react';

const RouteDetailPage = () => {
  const { slug } = useParams();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const getRoute = async () => {
      try {
        const data = await routesService.getRouteBySlug(slug);
        setRoute(data);
      } catch (err) {
        console.error("Erreur detail:", err);
      }
    };
    getRoute();
  }, [slug]);

  if (!route) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white italic">Loading...</div>;

  return (
    <div className="bg-[#0A0E27] min-h-screen pt-32 pb-20 px-6 text-white">
      <Helmet>
        <title>{`${route.city} Heart Route | CityHeart.run`}</title>
        <meta name="description" content={`Download the heart-shaped running route in ${route.city}.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link to="/routes" className="text-slate-400 hover:text-white flex items-center gap-2 mb-8 transition-colors">
          <ChevronLeft size={20} /> Back to all routes
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img src={route.image_url} alt={route.city} className="w-full rounded-3xl shadow-2xl border border-white/5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-bold uppercase tracking-widest text-sm mb-2">
              <MapPin size={16} /> {route.country}
            </div>
            <h1 className="text-5xl font-black italic uppercase mb-4 tracking-tighter">{route.city}</h1>
            <div className="text-3xl font-bold mb-6">{route.distance_km} km</div>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              Experience the perfect heart-shaped run in {route.city}.
            </p>

            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all uppercase tracking-widest mb-4">
              <Download size={20} /> Download GPX (€4.99)
            </button>
            
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all uppercase tracking-widest border border-white/10">
              <Share2 size={20} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailPage;
