import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Trophy, Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-[#0A0E27] min-h-screen text-white">
      <Helmet>
        <title>CityHeart.run | Trace Heart-Shaped Running Routes</title>
        <meta name="description" content="Discover heart-shaped GPS running routes in cities worldwide." />
      </Helmet>

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
            Run with your <span className="text-pink-500 not-italic">Heart</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Discover and download GPS-ready heart-shaped running routes in the world's most beautiful cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/routes" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all text-lg uppercase tracking-widest">
              Browse Routes
            </Link>
            <Link to="/free" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all text-lg uppercase tracking-widest border border-white/10">
              Try for Free
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-pink-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Global Cities</h3>
              <p className="text-slate-400">Routes professionally mapped in Paris, London, Tokyo, and more.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-blue-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">GPX Ready</h3>
              <p className="text-slate-400">Instant download for your Garmin, Apple Watch, or Strava.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-yellow-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Perfect Shapes</h3>
              <p className="text-slate-400">Every route is tested to ensure a perfect heart shape on your GPS.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
