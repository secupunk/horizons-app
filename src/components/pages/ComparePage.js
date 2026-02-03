import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';

export default function ComparePage() {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ route1: null, route2: null });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    async function init() {
      try {
        setStatus(`Fetching: ${slug1} vs ${slug2}`);
        const r1 = await routesService.getRouteBySlug(slug1);
        const r2 = await routesService.getRouteBySlug(slug2);
        
        if (!r1 || !r2) {
          setStatus("Error: One or both routes not found in DB.");
        } else {
          setData({ route1: r1, route2: r2 });
          setStatus("Success: Data loaded.");
        }
      } catch (err) {
        setStatus(`Fetch failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [slug1, slug2]);

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-24 px-4">
      {/* BANDEAU DE DEBUG - Doit être visible même si le reste bug */}
      <div className="bg-yellow-500 text-black p-2 text-xs font-bold fixed top-0 left-0 w-full z-[9999]">
        DEBUG MODE: {status} | Slugs: {slug1} / {slug2}
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center mt-20">Loading data...</p>
        ) : !data.route1 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl mb-4">Comparison Unavailable</h2>
            <Link to="/routes" className="text-pink-500">Back to catalog</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
              <h2 className="text-2xl font-bold">{data.route1.city}</h2>
              <img src={data.route1.image_url} alt={data.route1.city} className="mt-4 rounded-xl w-full h-40 object-cover" />
            </div>
            <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
              <h2 className="text-2xl font-bold">{data.route2.city}</h2>
              <img src={data.route2.image_url} alt={data.route2.city} className="mt-4 rounded-xl w-full h-40 object-cover" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
