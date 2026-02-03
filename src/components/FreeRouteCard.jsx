import React, { useState } from 'react';
import { MapPin, Ruler, Activity, Loader2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from './ui/use-toast';

// Define the 5 free cities explicitly
const FREE_CITIES = ['Paris', 'London', 'Berlin', 'Rotterdam', 'Rome'];

export default function FreeRouteCard({ route }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const trackDownload = (city) => {
    // 1. Plausible Analytics
    if (window.plausible) {
      window.plausible('Free Download', {
        props: { city: city, timestamp: new Date().toISOString() }
      });
    }

    // 2. Google Analytics
    if (window.gtag) {
      window.gtag('event', 'free_download', {
        'event_category': 'engagement',
        'event_label': 'free_gpx_download',
        'city': city
      });
    }
  };

  const generateGPXString = (routeData) => {
    if (!routeData.coordinates || !Array.isArray(routeData.coordinates)) {
      throw new Error('Invalid coordinates data');
    }

    const points = routeData.coordinates.map(pt => 
      `<trkpt lat="${pt.lat}" lon="${pt.lng}"></trkpt>`
    ).join('\n      ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="CityHeart - https://cityheart.run" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>CityHeart ${routeData.city}</name>
    <desc>Heart-shaped running route in ${routeData.city}</desc>
    <author>
      <name>CityHeart</name>
      <link href="https://cityheart.run"></link>
    </author>
  </metadata>
  <trk>
    <name>${routeData.title || `CityHeart ${routeData.city}`}</name>
    <trkseg>
      ${points}
    </trkseg>
  </trk>
</gpx>`;
  };

  const handleDownloadGPX = async () => {
    console.log(`🎯 DOWNLOAD CLICKED: ${route.city}`);
    
    if (isDownloading) return;

    // Check if it's a valid free route by CITY NAME (Case Insensitive)
    const isFreeCity = FREE_CITIES.some(city => city.toLowerCase() === route.city?.toLowerCase());
    
    if (!isFreeCity) {
      console.log('❌ Restricted: Not a free city');
      toast({
        title: "Premium Route",
        description: "This route is not part of the free collection.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);

    try {
      // Small delay to show loading state (UX)
      await new Promise(resolve => setTimeout(resolve, 800));

      const fileName = `CityHeart_${route.city.charAt(0).toUpperCase() + route.city.slice(1)}.gpx`;
      
      // Generate GPX content directly
      const gpxContent = generateGPXString(route);
      
      // Create blob and download link
      const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      console.log('✅ Download successful');
      trackDownload(route.city);
      
      toast({
        title: "✓ Ready to run! ❤️",
        description: `Downloaded ${fileName}`,
        className: "bg-pink-600 text-white border-none"
      });

    } catch (error) {
      console.error('❌ Download error:', error);
      toast({
        title: "Download Failed",
        description: "Could not generate the GPX file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0f1535] rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 shadow-lg hover:shadow-2xl hover:shadow-pink-500/10 transition-all group flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-gray-800">
        <img 
          src={route.image_url} 
          alt={`Free ${route.distance_km}km Running Route in ${route.city} - CityHeart`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1535] via-transparent to-transparent opacity-80"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
           <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
             FREE
           </span>
           <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10 flex items-center gap-1">
             <Activity size={10} className="text-blue-400" />
             {route.distance_km < 10 ? '5K Run' : '10K Run'}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
          {route.city}
        </h2>
        
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-pink-500" />
            {route.distance_km}km Route
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-400" />
            City Center
          </span>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleDownloadGPX}
            disabled={isDownloading}
            className="w-full py-4 px-6 bg-[#FF1493] hover:bg-pink-600 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] focus:ring-4 focus:ring-pink-500/30 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-pink-900/20"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" /> Download GPX
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}