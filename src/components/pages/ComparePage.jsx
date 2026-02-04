import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { routesService } from '../../services/routesService';
import { Trophy, Heart, Zap, MapPin, Scale } from 'lucide-react';

const ComparePage = () => {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ r1: null, r2: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        setData({ r1: res1, r2: res2 });
      } catch (err) {
        console.error("Erreur de récupération:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug1, slug2]);

  if (loading) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white italic">Analyse du duel...</div>;
  if (!data.r1 || !data.r2) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white">Oups, duel introuvable.</div>;

  const battleTitle = `${data.r1.city} vs ${data.r2.city} | Duel Heart Run`;

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>{battleTitle}</title>
        <meta name="description" content={`Découvrez qui gagne entre ${data.r1.city} et ${data.r2.city} pour votre prochain run en forme de cœur.`} />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-5xl font-black italic uppercase tracking-tighter mb-12">
          {data.r1.city} <span className="text-pink-500 not-italic">VS</span> {data.r2.city}
        </h1>

        {/* Verdict Automatique */}
        <div className="bg-gradient-to-br from-pink-600 to-purple-800 rounded-3xl p-8 mb-12 grid md:grid-cols-2 gap-8 shadow-2xl">
          <div className="bg-white/10 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 font-bold mb-2 uppercase text-sm tracking-widest text-pink-200">
              <Heart size={16}/> Plus Accessible
            </h3>
            <div className="text-3xl font-bold">{data.r1.distance_km < data.r2.distance_km ? data.r1.city : data.r2.city}</div>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 font-bold mb-2 uppercase text-sm tracking-widest text-yellow-400">
              <Trophy size={16}/> Plus Challenge
            </h3>
            <div className="text-3xl font-bold">{data.r1.distance_km > data.r2.distance_km ? data.r1.city : data.r2.city}</div>
          </div>
        </div>

        {/* Tableau de stats */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
           <div className="flex justify-between border-b border-slate-800 pb-4 font-bold">
              <span className="text-slate-500">Distance</span>
              <span>{data.r1.city}: {data.r1.distance_km}km</span>
              <span>{data.r2.city}: {data.r2.distance_km}km</span>
           </div>
        </div>

        {/* Liens vers les pages individuelles */}
        <div className="grid md:grid-cols-2 gap-8">
            {[data.r1, data.r2].map((route) => (
              <div key={route.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
                <img src={route.image_url} alt={route.city} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{route.city}</h3>
                  <Link to={`/routes/${route.slug}`} className="block text-center bg-slate-800 py-3 rounded-xl font-bold hover:bg-pink-500 transition-colors">Voir le parcours</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
