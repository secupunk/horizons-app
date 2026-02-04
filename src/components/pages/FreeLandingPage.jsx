import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Download, Gift, ArrowRight } from 'lucide-react';

const FreeLandingPage = () => {
  return (
    <div className="bg-[#0A0E27] min-h-screen text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>Free Heart Routes | CityHeart.run</title>
        <meta name="description" content="Download free heart-shaped running routes to try our GPX files." />
      </Helmet>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-pink-500/20 text-pink-500 p-4 rounded-full mb-8">
          <Gift size={40} />
        </div>
        
        <h1 className="text-5xl font-black italic uppercase mb-6 tracking-tighter">
          Free <span className="text-pink-500">Samples</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Not sure how GPX art works? Download one of our starter routes for free and see how it looks on your watch or Strava.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Exemple de carte pour une route gratuite */}
          <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl text-left">
            <h3 className="text-2xl font-bold mb-2">Starter Heart - Berlin</h3>
            <p className="text-slate-500 mb-6">A simple 5km route perfect for testing your device compatibility.</p>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-500 hover:text-white transition-all">
              <Download size={20} /> Download GPX
            </button>
          </div>

          <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl text-left">
            <h3 className="text-2xl font-bold mb-2">Mini Heart - Paris</h3>
            <p className="text-slate-500 mb-6">A beautiful 3km loop through the local parks of Paris.</p>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-pink-500 hover:text-white transition-all">
              <Download size={20} /> Download GPX
            </button>
          </div>
        </div>

        <div className="mt-16 p-8 bg-pink-500/10 rounded-3xl border border-pink-500/20">
          <h2 className="text-2xl font-bold mb-4">Ready for more?</h2>
          <p className="text-slate-400 mb-6">Access our full catalog of premium heart routes in over 50 cities.</p>
          <Link to="/routes" className="inline-flex items-center gap-2 text-pink-500 font-bold uppercase tracking-widest hover:gap-4 transition-all">
            Browse Premium Routes <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreeLandingPage;
