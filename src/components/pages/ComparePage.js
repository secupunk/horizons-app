import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';
import { MapPin, Navigation, Sparkles, ArrowRightLeft, Trophy } from 'lucide-react';

export default function ComparePage() {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ route1: null, route2: null });
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparison = async () => {
      console.log("Starting comparison for:", slug1, "and", slug2);
      setLoading(true);
      try {
        // Fetching both routes from Supabase
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        
        setData({ route1: res1, route2: res2 });

        // AI Verdict Generation (English for Global SEO)
        if (res1 && res2) {
          const prompts = [
            `${res1.city} offers a romantic maze of historic streets, while ${res2.city} provides a high-energy urban canvas for your heart art.`,
            `Choosing between ${res1.city} and ${res2.city}? One is a scenic masterpiece, the other is a runner's high waiting to happen.`,
            `From the heart of ${res1.city} to the soul of ${res2.city}, these GPS routes represent the best of global running culture.`
          ];
          setVerdict(prompts[Math.floor(Math.random() * prompts.length)]);
        }
      } catch (e) {
        console.error("Fetch error details:", e);
      } finally {
        // This ensures the blank screen disappears even if there is an error
        setLoading(false);
      }
    };

    if (slug1 && slug2) {
      fetchComparison();
    }
  }, [slug1, slug2]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center text-white font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-slate-400 animate-pulse uppercase tracking-widest text-xs">Analyzing World-Class Routes...</p>
      </div>
    );
  }

  // Fallback if data is missing
  if (!data.route1 || !data.route2) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center text-white p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Routes not found</h2>
        <p className="text-slate-400 mb-8">We couldn't find these specific hearts. Try another combination!</p>
        <Link to="/routes" className="text-pink-500 hover:underline">Back to all routes</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-32 pb-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 border border-white/10">
            <ArrowRightLeft className="text-pink-500 w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight uppercase">
            {data.route1.city} <span className="text-pink-500">vs</span> {data.route2.city}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto italic font-light">
            Compare the world's most beautiful heart-shaped GPS art.
          </p>
        </div>

        {/* AI VERDICT BOX */}
        {verdict && (
          <div className="max-w-3xl mx-auto mb-16 bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles className="text-pink-500 w-12 h-12" />
            </div>
            <div className="relative z-10 leading-relaxed text-lg md:text-xl text-slate-200">
               <span className="text-pink-500 font-black uppercase text-sm tracking-tighter mr-2 italic">AI Verdict:</span>
               "{verdict}"
            </div>
          </div>
        )}

        {/* COMPARISON GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* ROUTE 1 */}
          <div className="bg-[#111827] rounded-[2.5rem] overflow-hidden border border-slate-800 flex flex-col shadow-2xl">
            <div className="h-64 relative">
              <img src={data.route1.image_url} alt={data.route1.city} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-pink-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Candidate A</div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 italic">
                <MapPin className="text-pink-500" /> {data.route1.city}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-slate-500 uppercase text-[10px] font-bold mb-1">Distance</div>
                  <div className="font-bold flex items-center gap-2 text-lg"><Navigation size={14} className="text-pink-500"/> {data.route1.distance_km} km</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-slate-500 uppercase text-[10px] font-bold mb-1">Difficulty</div>
                  <div className="font-bold flex items-center gap-2 text-lg uppercase tracking-tighter text-yellow-500">{data.route1.difficulty || 'Moderate'}</div>
                </div>
              </div>
              <Link to={`/routes/${data.route1.slug}`} className="mt-auto block w-full py-5 bg-pink-500 hover:bg-pink-600 text-center font-black rounded-2xl transition-all uppercase tracking-widest shadow-lg shadow-pink-500/20">
                Get {data.route1.city} Heart
              </Link>
            </div>
          </div>

          {/* ROUTE 2 */}
          <div className="bg-[#111827] rounded-[2.5rem] overflow-hidden border border-slate-800 flex flex-col shadow-2xl">
            <div className="h-64 relative">
              <img src={data.route2.image_url} alt={data.route2.city} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Candidate B</div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 italic text-blue-400">
                <MapPin className="text-blue-400" /> {data.route2.city}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-slate-500 uppercase text-[10px] font-bold mb-1">Distance</div>
                  <div className="font-bold flex items-center gap-2 text-lg"><Navigation size={14} className="text-blue-400"/> {data.route2.distance_km} km</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-slate-500 uppercase text-[10px] font-bold mb-1">Difficulty</div>
                  <div className="font-bold flex items-center gap-2 text-lg uppercase tracking-tighter text-yellow-500">{data.route2.difficulty || 'Moderate'}</div>
                </div>
              </div>
              <Link to={`/routes/${data.route2.slug}`} className="mt-auto block w-full py-5 bg-blue-600 hover:bg-blue-700 text-center font-black rounded-2xl transition-all uppercase tracking-widest shadow-lg shadow-blue-600/20">
                Get {data.route2.city} Heart
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
