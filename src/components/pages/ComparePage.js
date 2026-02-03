import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';
import { Button } from '../ui/button';
import { MapPin, Navigation, Sparkles, ArrowRightLeft, Trophy } from 'lucide-react';

export default function ComparePage() {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ route1: null, route2: null });
  const [verdict, setVerdict] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      try {
        // 1. Fetch data for both routes from Supabase
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        
        setData({ route1: res1, route2: res2 });

        // 2. Generate AI Verdict (In English for Global SEO)
        // Note: In a production environment, you would call your Vercel API route here
        if (res1 && res2) {
          generateAIVerdict(res1.city, res2.city);
        }
      } catch (e) {
        console.error("Comparison error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchComparison();
  }, [slug1, slug2]);

  const generateAIVerdict = (city1, city2) => {
    // This is the prompt logic Gemini will use
    const prompts = [
      `${city1} offers a classic romantic vibe, while ${city2} challenges you with its unique urban landscape. Both heart routes are perfect for your Strava art collection!`,
      `Choosing between ${city1} and ${city2}? The first is a scenic masterpiece, the second is a runner's high waiting to happen. Download both and decide on the road!`,
      `From the streets of ${city1} to the paths of ${city2}, these GPS art routes represent the best of global running culture. A tough choice for any dedicated athlete.`
    ];
    // Randomly select one for now to keep content "fresh"
    setVerdict(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF1493] mb-4"></div>
        <p className="text-slate-400 animate-pulse">Analyzing world-class routes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-28 pb-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 border border-white/10">
            <ArrowRightLeft className="text-[#FF1493] w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            {data.route1?.city} <span className="text-[#FF1493]">vs</span> {data.route2?.city}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            World Tour Edition: Compare the best heart-shaped running routes across the globe.
          </p>
        </div>

        {/* AI VERDICT BOX (The SEO Teaser) */}
        {verdict && (
          <div className="relative group max-w-3xl mx-auto mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1493] to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#1E293B] border border-white/10 p-6 rounded-2xl flex gap-4 items-center">
              <div className="bg-[#FF1493]/20 p-3 rounded-xl">
                <Sparkles className="text-[#FF1493] w-6 h-6" />
              </div>
              <div className="italic text-slate-200 text-lg leading-relaxed">
                <span className="text-[#FF1493] font-bold not-italic">AI Verdict: </span>
                "{verdict}"
              </div>
            </div>
          </div>
        )}

        {/* COMPARISON GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* ROUTE 1 */}
          <div className="flex flex-col bg-[#111827] rounded-3xl overflow-hidden border border-slate-800 hover:border-[#FF1493]/50 transition-all duration-300 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img src={data.route1?.image_url} alt={data.route1?.city} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-[#FF1493] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Option A</div>
            </div>
            <div className="p-8 flex-grow">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <MapPin className="text-[#FF1493]" /> {data.route1?.city}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-xs uppercase mb-1">Distance</div>
                  <div className="text-xl font-bold flex items-center gap-2"><Navigation size={18} className="text-[#FF1493]"/> {data.route1?.distance_km}km</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-xs uppercase mb-1">Level</div>
                  <div className="text-xl font-bold flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> {data.route1?.difficulty || 'Moderate'}</div>
                </div>
              </div>
              <Button asChild className="w-full py-6 bg-[#FF1493] hover:bg-[#FF1493]/90 text-lg font-bold rounded-2xl transition-all shadow-lg shadow-[#FF1493]/20">
                <Link to={`/routes/${data.route1?.slug}`}>Personalize {data.route1?.city}</Link>
              </Button>
            </div>
          </div>

          {/* ROUTE 2 */}
          <div className="flex flex-col bg-[#111827] rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
            <div className="relative h-64 overflow-hidden">
              <img src={data.route2?.image_url} alt={data.route2?.city} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Option B</div>
            </div>
            <div className="p-8 flex-grow">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <MapPin className="text-blue-400" /> {data.route2?.city}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-xs uppercase mb-1">Distance</div>
                  <div className="text-xl font-bold flex items-center gap-2"><Navigation size={18} className="text-blue-400"/> {data.route2?.distance_km}km</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-xs uppercase mb-1">Level</div>
                  <div className="text-xl font-bold flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> {data.route2?.difficulty || 'Moderate'}</div>
                </div>
              </div>
              <Button asChild className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                <Link to={`/routes/${data.route2?.slug}`}>Personalize {data.route2?.city}</Link>
              </Button>
            </div>
          </div>

        </div>

        {/* FOOTER CTA */}
        <div className="mt-20 text-center bg-white/5 p-10 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold mb-4">Can't decide?</h3>
          <p className="text-slate-400 mb-8">All our routes are optimized for Strava, Garmin, and Apple Watch.</p>
          <Link to="/routes" className="text-[#FF1493] hover:underline font-bold text-lg">← Back to all world routes</Link>
        </div>
      </div>
    </div>
  );
}
