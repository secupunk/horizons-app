import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { routesService } from '../../services/routesService';
import { Trophy, Heart, Zap, TrendingUp, MapPin, ChevronRight, Scale } from 'lucide-react';

const ComparePage = () => {
  // We extract slug1 and slug2 based on the App.js route definition
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ r1: null, r2: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both routes from your database service
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        
        if (!res1 || !res2) {
          setError("One of these heart routes could not be found.");
        } else {
          setData({ r1: res1, r2: res2 });
        }
      } catch (err) {
        setError("Error connecting to database: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug1 && slug2) {
      fetchData();
    }
  }, [slug1, slug2]);

  // Generate Comparison Stats without relying on external API
  const generateBattleData = () => {
    if (!data.r1 || !data.r2) return null;
    const { r1, r2 } = data;

    return {
      title: `${r1.city} vs ${r2.city}: The Ultimate Heart Race`,
      description: `Comparing the ${r1.distance_km}km route in ${r1.city} with the ${r2.distance_km}km route in ${r2.city}.`,
      winner_romantic: r1.distance_km < r2.distance_km ? r1.city : r2.city,
      winner_challenge: r1.distance_km > r2.distance_km ? r1.city : r2.city,
      cal1: Math.round(r1.distance_km * 60),
      cal2: Math.round(r2.distance_km * 60),
      score1: Math.min(Math.round(r1.distance_km * 7), 98),
      score2: Math.min(Math.round(r2.distance_km * 7), 98)
    };
  };

  const battle = generateBattleData();

  if (loading) return (
    <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white">
      <div className="animate-pulse text-xl">Analyzing heart patterns...</div>
    </div>
  );

  if (error || !data.r1) return (
    <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold text-pink-500 mb-4">404</h1>
      <p className="mb-6">{error || "Comparison not found"}</p>
      <Link to="/routes" className="text-cyan-400 hover:underline">Return to all routes</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-32 pb-20">
      <Helmet>
        <title>{battle.title}</title>
        <meta name="description" content={battle.description} />
        <meta property="og:title" content={battle.title} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://yourdomain.com/compare/${slug1}-vs-${slug2}`} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            {data.r1.city} <span className="text-pink-500 not-italic">VS</span> {data.r2.city}
          </h1>
          <div className="inline-block bg-pink-500/20 text-pink-500 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-sm">
            Battle of the Hearts
          </div>
        </div>

        {/* The Verdict Box */}
        <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-3xl p-8 mb-12 shadow-2xl shadow-pink-500/20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Trophy className="text-yellow-400" /> The Verdict
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-pink-200 uppercase text-sm font-bold tracking-widest">
                <Heart size={18} /> Most Romantic
              </div>
              <div className="text-3xl font-black">{battle.winner_romantic}</div>
              <p className="text-white/70 mt-2">A perfect, manageable distance for a date run.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-2 text-yellow-300 uppercase text-sm font-bold tracking-widest">
                <Zap size={18} /> Biggest Challenge
              </div>
              <div className="text-3xl font-black">{battle.winner_challenge}</div>
              <p className="text-white/70 mt-2">Requires serious stamina to complete the shape.</p>
            </div>
          </div>
        </div>

        {/* Stats Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 mb-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Scale className="text-cyan-400" /> Head-to-Head Stats
          </h3>
          <div className="space-y-6">
            <StatRow label="Distance" val1={`${data.r1.distance_km} km`} val2={`${data.r2.distance_km} km`} />
            <StatRow label="Est. Calories" val1={`${battle.cal1} kcal`} val2={`${battle.cal2} kcal`} />
            <StatRow label="Complexity Score" val1={`${battle.score1}/100`} val2={`${battle.score2}/100`} />
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <RouteCard route={data.r1} color="pink" />
          <RouteCard route={data.r2} color="blue" />
        </div>
      </div>
    </div>
  );
};

// Sub-components for a cleaner file
const StatRow = ({ label, val1, val2 }) => (
  <div className="grid grid-cols-3 py-4 border-b border-slate-800 last:border-0">
    <div className="text-slate-400 font-medium">{label}</div>
    <div className="text-pink-400 font-bold">{val1}</div>
    <div className="text-blue-400 font-bold">{val2}</div>
  </div>
);

const RouteCard = ({ route, color }) => {
  const borderColor = color === 'pink' ? 'border-pink-500' : 'border-blue-500';
  const textColor = color === 'pink' ? 'text-pink-500' : 'text-blue-500';
  const btnBg = color === 'pink' ? 'bg-pink-500' : 'bg-blue-500';

  return (
    <div className={`bg-slate-900 rounded-3xl overflow-hidden border-2 ${borderColor} transition-transform hover:scale-[1.02]`}>
      <div className="h-64 relative">
        <img src={route.image_url} alt={route.city} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2 text-sm">
          <MapPin size={14} className={textColor} /> {route.country}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-black mb-2 uppercase italic">{route.city}</h3>
        <p className={`text-3xl font-bold ${textColor} mb-6`}>{route.distance_km} km</p>
        <Link 
          to={`/routes/${route.slug}`} 
          className={`block text-center ${btnBg} text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity uppercase tracking-widest text-sm`}
        >
          Explore this route
        </Link>
      </div>
    </div>
  );
};

export default ComparePage;
