import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { routesService } from '../../services/routesService';
import { Scale, ChevronRight, Heart } from 'lucide-react';

const CompareDirectory = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const data = await routesService.getAllRoutes();
        setRoutes(data || []);
      } catch (err) {
        console.error("Erreur chargement routes:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRoutes();
  }, []);

  const generateMatchups = () => {
    const pairs = [];
    for (let i = 0; i < routes.length; i++) {
      for (let j = i + 1; j < routes.length; j++) {
        pairs.push({ r1: routes[i], r2: routes[j] });
      }
    }
    return pairs;
  };

  const matchups = generateMatchups();

  if (loading) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white">Chargement des duels...</div>;

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-32 pb-20">
      <Helmet>
        <title>Comparatif des parcours running Heart Run | GPS Art</title>
        <meta name="description" content="Comparez tous nos parcours en forme de cœur. Quel est le meilleur tracé pour votre run ?" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-black italic uppercase mb-8 flex items-center gap-4">
          <Scale className="text-pink-500" /> Les Duels Heart Run
        </h1>

        <div className="grid gap-4">
          {matchups.map((pair) => (
            <Link 
              key={`${pair.r1.id}-${pair.r2.id}`}
              to={`/compare/${pair.r1.slug}-vs-${pair.r2.slug}`}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:border-pink-500 transition-all"
            >
              <div className="flex items-center gap-8">
                <span className="font-bold text-lg">{pair.r1.city}</span>
                <span className="text-pink-500 font-black italic">VS</span>
                <span className="font-bold text-lg">{pair.r2.city}</span>
              </div>
              <ChevronRight className="text-slate-500" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareDirectory;
