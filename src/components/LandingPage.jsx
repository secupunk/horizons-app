import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Trophy, Star } from 'lucide-react';
import ValentineCountdown from './ValentineCountdown';

const LandingPage = () => {
  return (
    <div className="bg-[#0A0E27] min-h-screen text-white">
      <Helmet>
        <title>CityHeart.run | Trace Heart-Shaped Running Routes</title>
        <meta name="description" content="Turn your run into art. Discover heart-shaped GPS running routes in cities worldwide." />
      </Helmet>

      {/* Hero Section avec le Countdown */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          
          <ValentineCountdown />

          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mt-12 mb-8 leading-none">
            RUN WITH YOUR <span className="text-pink-500">HEART</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto font-medium">
            Discover and download GPS-ready heart-shaped running routes in the world's most beautiful cities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/routes" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-5 px-10 rounded-full transition-all text-xl uppercase tracking-widest shadow-lg shadow-pink-500/20">
              Browse Routes
            </Link>
            <Link to="/free" className="bg-slate-800/50 hover:bg-slate-800 text-white font-bold py-5 px-10 rounded-full transition-all text-xl uppercase tracking-widest border border-white/10">
              Try for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (le bas de ton image) */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            
            <div className="text-center group">
              <div className="bg-pink-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-pink-500/20 group-hover:scale-110 transition-transform">
                <MapPin className="text-pink-500" size={40} />
              </div>
              <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight">Global Cities</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Routes professionally mapped in Paris, London, Tokyo, and more.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Trophy className="text-blue-500" size={40} />
              </div>
              <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight">GPX Ready</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Instant download for your Garmin, Apple Watch, or Strava.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-yellow-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/20 group-hover:scale-110 transition-transform">
                <Star className="text-yellow-500" size={40} />
              </div>
              <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight">Perfect Shapes</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Every route is tested to ensure a perfect heart shape on your GPS.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
