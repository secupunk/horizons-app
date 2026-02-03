import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Ruler, Activity, ArrowRight, Heart } from 'lucide-react';

const RouteCard = memo(({ route }) => {
  return (
    <Link 
      to={`/routes/${route.slug}`}
      className="group block bg-[#0f1225] border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(236,72,153,0.3)] hover:border-pink-500/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
        {route.image_url ? (
          <img 
            src={route.image_url} 
            alt={route.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
            <Heart className="w-12 h-12 text-pink-500/50" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-medium text-white border border-white/10 capitalize">
            {route.activity_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
          {route.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-y-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-pink-500" />
            <span>{route.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Ruler className="w-4 h-4 text-blue-400" />
            <span>{route.distance_km} km</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-gray-500 font-medium bg-white/5 px-2 py-1 rounded">
            {route.terrain_type}
          </span>
          <span className="text-pink-500 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
            View Route <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
});

export default RouteCard;