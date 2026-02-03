import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';
import { MapPin, Navigation, Sparkles, ArrowRightLeft } from 'lucide-react';

export default function ComparePage() {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ route1: null, route2: null });
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComparison = async () => {
      if (!slug1 || !slug2) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // On récupère les données
        const res1 = await routesService.getRouteBySlug(slug1);
        const res2 = await routesService.getRouteBySlug(slug2);
        
        if (!res1 || !res2) {
          console.warn("One of the routes was not found in database");
          setError(true);
        } else {
          setData({ route1: res1, route2: res2 });
          // Verdict en Anglais pour le SEO
          setVerdict(`${res1.city} vs ${res2.city}: A world-class GPS art challenge for heart-seekers.`);
        }
      } catch (err) {
        console.error("Database fetch failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [slug1, slug2]);

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-pink-500 mx-auto mb-4"></div>
          <p className="animate-pulse">Loading Comparison...</p>
        </div>
      </div>
    );
  }

  // Écran d'erreur (si les slugs sont mauvais)
  if (error || !data.route1 || !data.route2) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Comparison Not Available</h1>
        <p className="text-slate-400 mb-6">Make sure the URL is correct or try other cities.</p>
        <Link to="/routes" className="bg-pink-600 px-6 py-2 rounded-full font-bold">Back to Routes</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl md:text-5xl font-bold">{data.route1.city}</h1>
            <ArrowRightLeft className="text-pink-500" size={30} />
            <h1 className="text-3xl md:text-5xl font-bold">{data.route2.city}</h1>
          </div>
          {verdict && (
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm italic text-slate-300">
              <Sparkles size={16} className="text-pink-500" /> {verdict}
            </div>
          )}
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {[data.route1, data.route2].map((route, index) => (
            <div key={route.id || index} className="bg-[#111827] rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
              <div className="h-48 overflow-hidden bg-slate-800">
                <img 
                  src={route.image_url} 
                  alt={route.city} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-pink-500" size={18} /> {route.city}
                </h2>
                <div className="flex justify-between mb-8 text-sm text-slate-400 border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1"><Navigation size={14}/> {route.distance_km} km</span>
                  <span className="capitalize">{route.difficulty || 'Moderate'}</span>
                </div>
                <Link 
                  to={`/routes/${route.slug}`} 
                  className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${index === 0 ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  View {route.city} Heart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
