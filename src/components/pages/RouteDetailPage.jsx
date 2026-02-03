import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { routesService } from '../../services/routesService';
import { useToast } from '../ui/use-toast';
import RouteDetailClient from '../RouteDetailClient';
import RouteNotFound from '../routes/RouteNotFound';

/**
 * RouteDetailPage Container
 * Handles data fetching, SEO Metadata injection, and error states.
 * Acts as the "Server Component" equivalent in this SPA architecture.
 */
export default function RouteDetailPage() {
  const { slug } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRouteData = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await routesService.getRouteBySlug(slug);
        
        // Simulating "Server Component" logic: strict filtering
        if (data && data.is_public === true) {
          setRoute(data);
          // View count increment disabled to prevent RPC errors
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error loading route:", error);
        toast({
            title: "Error",
            description: "Could not load route details.",
            variant: "destructive"
        });
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchRouteData();
    }
  }, [slug, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E27]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF1493]"></div>
      </div>
    );
  }

  if (notFound || !route) {
    return <RouteNotFound />;
  }

  // Calculate duration for Schema (Math.round(distance * 10) minutes)
  const distance = parseFloat(route.distance_km || 0);
  const durationMinutes = Math.round(distance * 10);

  // Schema.org ExercisePlan Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ExercisePlan",
    "name": route.title,
    "description": route.description || `A ${distance}km heart-shaped running route in ${route.city}.`,
    "image": route.image_url,
    "url": `https://cityheart.run/routes/${route.slug}`,
    "activityDuration": `PT${durationMinutes}M`,
    "exerciseType": "Running",
    "intensity": route.difficulty || "Moderate",
    "workDistance": {
      "@type": "QuantitativeValue",
      "value": distance,
      "unitCode": "KMT"
    },
    "location": {
      "@type": "Place",
      "name": route.city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": route.city,
        "addressCountry": "Unknown" 
      },
      // Safely access nested coordinates if they exist
      "geo": (route.coordinates && route.coordinates[0]) ? {
        "@type": "GeoCoordinates",
        "latitude": parseFloat(route.coordinates[0].lat),
        "longitude": parseFloat(route.coordinates[0].lng)
      } : undefined
    },
    "offers": {
      "@type": "Offer",
      "price": "4.99",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta */}
        <title>{`${route.title} - ${route.distance_km}km Running Route | CityHeart`}</title>
        <meta name="description" content={route.description || `Customize and download the ${route.title} GPX file. A ${route.distance_km}km heart-shaped running route in ${route.city}.`} />
        <meta name="keywords" content={`running route ${route.city}, heart shaped route ${route.city}, strava art ${route.city}, gpx download ${route.city}, public running routes`} />
        <link rel="canonical" href={`https://cityheart.run/routes/${route.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="place" />
        <meta property="og:title" content={`${route.title} - Personalize Route`} />
        <meta property="og:description" content={`Running Route in ${route.city} (${route.distance_km}km). Customize this route now.`} />
        <meta property="og:image" content={route.image_url} />
        <meta property="og:url" content={`https://cityheart.run/routes/${route.slug}`} />
        <meta property="og:site_name" content="CityHeart" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={route.title} />
        <meta name="twitter:description" content={`Running Route in ${route.city}. Download GPX now.`} />
        <meta name="twitter:image" content={route.image_url} />

        {/* JSON-LD Schema Injection */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Render Client Component */}
      <RouteDetailClient route={route} />
    </>
  );
}