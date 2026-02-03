import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import FreeHeroSection from '../sections/FreeHeroSection';
import FreeFeaturesSection from '../sections/FreeFeaturesSection';
import FreePricingSection from '../sections/FreePricingSection';
import FreeFAQSection from '../sections/FreeFAQSection';
import FreeRouteCard from '../FreeRouteCard'; 
import { routesService } from '../../services/routesService';
import { isValidRoute } from '../../utils/routeQualityFilter';

// Define strict free cities list
const FREE_CITIES = ['Paris', 'London', 'Berlin', 'Rotterdam', 'Rome'];

// Mock Data Fallback (Used if Supabase is not connected or returns empty)
const MOCK_FREE_ROUTES = [
  {
    id: 'rome-free',
    slug: 'running-heart-rome',
    title: 'Rome Heart Route',
    city: 'Rome',
    distance_km: 10.5,
    downloads_count: 1250,
    image_url: 'https://images.unsplash.com/photo-1698475437312-c23b5e374417',
    coordinates: Array(25).fill({ lat: 41.9028, lng: 12.4964 }),
    activity_type: 'running',
    terrain: 'road'
  },
  {
    id: 'paris-free',
    slug: 'running-heart-paris',
    title: 'Paris Heart Route',
    city: 'Paris',
    distance_km: 8.2,
    downloads_count: 980,
    image_url: 'https://images.unsplash.com/photo-1684443315219-aba1525e7d59',
    coordinates: Array(25).fill({ lat: 48.8566, lng: 2.3522 }),
    activity_type: 'running',
    terrain: 'road'
  },
  {
    id: 'berlin-free',
    slug: 'running-heart-berlin',
    title: 'Berlin Heart Route',
    city: 'Berlin',
    distance_km: 9.5,
    downloads_count: 850,
    image_url: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392',
    coordinates: Array(25).fill({ lat: 52.5200, lng: 13.4050 }),
    activity_type: 'running',
    terrain: 'road'
  },
  {
    id: 'london-free',
    slug: 'running-heart-london',
    title: 'London Heart Route',
    city: 'London',
    distance_km: 12.1,
    downloads_count: 720,
    image_url: 'https://images.unsplash.com/photo-1698046473598-c043c61c2b67',
    coordinates: Array(25).fill({ lat: 51.5074, lng: -0.1278 }),
    activity_type: 'running',
    terrain: 'road'
  },
  {
    id: 'rotterdam-free',
    slug: 'running-heart-rotterdam',
    title: 'Rotterdam Heart Route',
    city: 'Rotterdam',
    distance_km: 7.8,
    downloads_count: 650,
    image_url: 'https://images.unsplash.com/photo-1594914101168-07d72224c609',
    coordinates: Array(25).fill({ lat: 51.9225, lng: 4.4792 }),
    activity_type: 'running',
    terrain: 'road'
  }
];

export default function FreeLandingPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterRoutes = async () => {
      setLoading(true);
      
      try {
        // 1. Fetch all routes from Supabase
        let allRoutes = [];
        try {
           allRoutes = await routesService.getAllRoutes();
        } catch (e) {
           console.warn("⚠️ API fetch failed (possibly no connection), switching to fallback data", e);
        }

        // 2. Filter Logic
        let filteredRoutes = [];
        
        if (allRoutes && allRoutes.length > 0) {
          filteredRoutes = allRoutes.filter(route => {
             // 3. Filter by City Name (Case Insensitive)
             const isFreeCity = FREE_CITIES.some(freeCity => 
                freeCity.toLowerCase() === route.city?.toLowerCase()
             );
             
             // 4. Filter by Quality Standards
             const isValid = isValidRoute(route);
             
             return isFreeCity && isValid;
          });
        }

        // 5. Fallback if no routes found (or DB empty/failed)
        if (filteredRoutes.length === 0) {
           console.log("ℹ️ No matching routes in DB, using MOCK_FREE_ROUTES");
           filteredRoutes = MOCK_FREE_ROUTES.filter(route => {
             const isFreeCity = FREE_CITIES.some(freeCity => 
                freeCity.toLowerCase() === route.city?.toLowerCase()
             );
             return isFreeCity && isValidRoute(route);
           });
        }

        // 6. Deduplicate by city (take the first found for each free city)
        const uniqueCityRoutes = [];
        const seenCities = new Set();
        
        // Prioritize order based on FREE_CITIES array
        FREE_CITIES.forEach(targetCity => {
          const match = filteredRoutes.find(r => 
             r.city.toLowerCase() === targetCity.toLowerCase()
          );
          if (match && !seenCities.has(match.city.toLowerCase())) {
            uniqueCityRoutes.push(match);
            seenCities.add(match.city.toLowerCase());
          }
        });

        // 7. Limit to max 5 (though array size matches cities, safety check)
        const finalRoutes = uniqueCityRoutes.slice(0, 5);

        console.log(`✅ FREE ROUTES: ${finalRoutes.map(r => r.city).join(', ')}`);
        
        setRoutes(finalRoutes);

      } catch (error) {
        console.error("❌ Critical error in route fetching logic:", error);
        setRoutes(MOCK_FREE_ROUTES); // Absolute fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterRoutes();
  }, []);

  return (
    <div className="bg-[#0A0E27] min-h-screen text-white">
      <Helmet>
        <title>5 Free GPX Running Routes - No Signup | CityHeart</title>
        <meta name="description" content="Download free heart-shaped running routes for Paris, Berlin, Rotterdam and more. No account needed. Professional GPX files for all GPS watches." />
        <meta name="keywords" content="free running routes, GPX download, heart-shaped routes, Strava art, running maps" />
        
        <meta property="og:title" content="5 Free GPX Running Routes - No Signup | CityHeart" />
        <meta property="og:description" content="Download free heart-shaped running routes for Paris, Berlin, Rotterdam and more. No account needed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cityheart.run/free" />
        <meta property="og:image" content={routes[0]?.image_url} />
      </Helmet>

      <FreeHeroSection />
      
      <section className="py-20 px-4" id="featured-routes">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Free Running Routes</h2>
             <p className="text-gray-400 text-lg">Instant download. No account required.</p>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading featured routes...</p>
            </div>
          ) : routes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {routes.map((route) => (
                <div key={route.id} className="group relative bg-[#131b40] rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/50 transition-all flex flex-col">
                  {/* Reuse FreeRouteCard-like structure but wrap in Link for navigation */}
                   <Link to={`/routes/${route.slug}`} className="block overflow-hidden relative aspect-video">
                     <img 
                       src={route.image_url} 
                       alt={`Free running route in ${route.city}`}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                       loading="lazy"
                     />
                     <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                       FREE
                     </div>
                   </Link>
                   
                   <div className="p-6 flex flex-col flex-grow">
                     <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">{route.city}</h3>
                       <span className="text-sm font-mono text-pink-400 bg-pink-400/10 px-2 py-1 rounded">{route.distance_km}km</span>
                     </div>
                     <p className="text-gray-400 text-sm mb-6 flex-grow">{route.title}</p>
                     
                     <Link to={`/routes/${route.slug}`} className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-pink-500 transition-colors text-sm font-bold">
                       <Download className="w-4 h-4" /> Download GPX
                     </Link>
                   </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="py-12 text-center text-gray-400">
               <p>No free routes currently available. Please check back later.</p>
             </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/routes" className="inline-flex items-center gap-2 text-white font-medium hover:text-[#FF1493] transition-colors text-lg">
              Browse all 100+ cities <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      <FreeFeaturesSection />
      <FreePricingSection />
      <FreeFAQSection />
    </div>
  );
}