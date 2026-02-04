import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { routesService } from '../../services/routesService';
import { Trophy, Heart, MapPin } from 'lucide-react';

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug1, slug2]);

  if (loading) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white italic">Comparing...</div>;
  if (!data.r1 || !data.r2) return <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center text-white">Duel not found.</div>;

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>{`${data.r1.city} vs ${data.r2.city} | Heart Run Battle`}</title>
      </Helmet>

      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-black italic uppercase mb-12">
          {data.r1.city} <span className="text-pink-500">VS</span> {data.r2.city}
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-900 p-8 rounded-3xl border border-pink-500">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><Heart className="text-pink-500"/> {data.r1.city}</h3>
            <p className="text-4xl font-black mb-4">{data.r1.distance_km} km</p>
            <Link to={`/routes/${data.r1.slug}`} className="text-pink-500 font-bold underline">View Details</Link>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl border border-blue-500">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><Trophy className="text-blue-500"/> {data.r2.city}</h3>
            <p className="text-4xl font-black mb-4">{data.r2.distance_km} km</p>
            <Link to={`/routes/${data.r2.slug}`} className="text-blue-500 font-bold underline">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
