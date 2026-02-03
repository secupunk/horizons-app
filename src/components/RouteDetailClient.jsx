"use client";
import React from 'react';
import { MapPin, Calendar, Navigation, Mountain, Activity, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import Breadcrumb from './Breadcrumb';
import { Helmet } from 'react-helmet-async';

export default function RouteDetailClient({ route }) {
  const { toast } = useToast();

  const handlePersonalize = () => {
    const personalizationUrl = `https://heart.cityheart.run/?city=${encodeURIComponent(route?.city || '')}`;
    window.open(personalizationUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: route.title,
        text: `Check out this heart-shaped running route in ${route.city}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  return (
    <div className="bg-[#0A0E27] min-h-screen text-white pb-20 font-sans">
      {/* SEO & LLM Optimization */}
      <Helmet>
        <title>{`${route.title} - Heart Route in ${route.city} | CityHeart`}</title>
        <meta 
          name="description" 
          content={`Explore and download the GPS track for this romantic ${route.distance_km}km heart-shaped running route in ${route.city}. Perfect for Strava art and unique runs.`} 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${route.title} - Heart-Shaped Run in ${route.city}`} />
        <meta property="og:description" content={`Run your heart out in ${route.city} with this unique ${route.distance_km}km GPS route.`} />
        <meta property="og:image" content={route.image_url} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Heart Running Route: ${route.city}`} />
        <meta name="twitter:description" content={`Download the GPX for this ${route.distance_km}km heart-shaped route.`} />
        <meta name="twitter:image" content={route.image_url} />
      </Helmet>

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img 
          src={route.image_url} 
          alt={`${route.title} - Heart shaped running route map in ${route.city}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
            <div className="container mx-auto max-w-6xl">
              <Breadcrumb 
                items={[
                  { label: "Routes", href: "/routes" },
                  { label: route.city, href: `/routes?city=${route.city}` },
                  { label: route.title, href: null }
                ]} 
                className="mb-6"
              />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
                {route.title}
              </h1>
              
              <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-sm md:text-base">
                    <MapPin className="w-5 h-5 text-[#FF1493]" />
                    <span className="font-semibold">{route.city}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-sm md:text-base">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>Updated {new Date(route.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
              </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-20 -mt-16">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Navigation, label: "Kilometers", value: route.distance_km, color: "text-[#FF1493]" },
              { icon: Mountain, label: "Terrain", value: route.terrain || 'Road', color: "text-blue-400" },
              { icon: Activity, label: "Difficulty", value: route.difficulty || 'Moderate', color: "text-emerald-400" },
              { icon: Share2, label: "Downloads", value: (route.downloads_count || 120) + 450, color: "text-purple-400" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center group hover:border-[#FF1493]/50 transition-all duration-300">
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Description Section */}
                <section className="prose prose-invert prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">About this Route</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    This {route.distance_km}km running route through {route.city} is designed to create a perfect heart shape on your GPS activity tracker. 
                    Whether you're celebrating Valentine's Day or just love GPS art, this route offers a unique way to explore the streets of {route.city}.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    The route primarily follows {route.terrain ? route.terrain.toLowerCase() : 'road'} surfaces and is suitable for runners of {route.difficulty ? route.difficulty.toLowerCase() : 'moderate'} ability.
                  </p>
                </section>

                {/* Personalize CTA Section */}
                <section className="bg-gradient-to-br from-[#1E293B] to-[#0f172a] p-8 md:p-10 rounded-3xl border border-[#FF1493]/30 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1493]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                  
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                      <span className="bg-[#FF1493] rounded-lg p-1 text-sm">✨</span> 
                      Ready to run this route?
                  </h3>
                  
                  <div className="relative z-10">
                    <p className="text-gray-300 mb-8 text-lg">
                        Make this route your own! Adjust the starting point, change the distance, or reverse the direction.
                    </p>

                    <div className="mt-8">
                      <button
                        onClick={handlePersonalize}
                        className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-[#FF1493]/20 text-lg cursor-pointer flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>✨</span> Personalize this route
                      </button>
                      
                      <p className="text-center text-sm text-slate-400 mt-4">
                        Customize your distance and export the GPX to Strava or Garmin.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Map Section (Conditional) */}
                {route.map_url && (
                  <section>
                    <h2 className="text-2xl font-bold mb-6">Route Map</h2>
                    <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
                        <img src={route.map_url} alt={`Map of ${route.title}`} className="w-full h-auto" />
                    </div>
                  </section>
                )}

                {/* How To Use Section */}
                <section>
                  <h2 className="text-2xl font-bold mb-8">How to use this route</h2>
                  <div className="grid gap-6">
                    {[
                      { step: 1, title: 'Click "Personalize"', desc: 'Open the route in our advanced route planner.' },
                      { step: 2, title: 'Customize (Optional)', desc: 'Adjust scaling to fit your target distance.' },
                      { step: 3, title: 'Export GPX', desc: 'Download the file to your device.' },
                      { step: 4, title: 'Start Running!', desc: 'Follow the line and create your art.' }
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E293B] border border-[#FF1493]/30 flex items-center justify-center text-[#FF1493] font-bold">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-1 text-white">{item.title}</h4>
                            <p className="text-slate-400">{item.desc}</p>
                          </div>
                      </div>
                    ))}
                  </div>
                </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 sticky top-24">
                  <h3 className="text-xl font-bold mb-6 pb-4 border-b border-slate-700">Quick Details</h3>
                  <div className="space-y-4">
                      {[
                        { label: "Location", val: route.city },
                        { label: "Total Distance", val: `${route.distance_km} km` },
                        { label: "Surface", val: route.terrain || 'Road', caps: true },
                        { label: "Est. Time (6:00/km)", val: `${Math.round(route.distance_km * 6)} mins` }
                      ].map((d, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">{d.label}</span>
                          <span className={`font-medium text-white ${d.caps ? 'capitalize' : ''}`}>{d.val}</span>
                        </div>
                      ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700">
                      <Button 
                        variant="outline" 
                        className="w-full border-slate-600 text-slate-200 hover:bg-white hover:text-black transition-colors"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" /> Share with friends
                      </Button>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}
