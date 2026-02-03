import React from 'react';
// Correction de l'import : on passe de react-helmet-async à react-helmet
import { Helmet } from 'react-helmet'; 
import RouteDetailClientContent from './RouteDetailClientContent';

const RouteDetailClient = ({ route }) => {
  if (!route) return null;

  return (
    <>
      {/* On utilise Helmet sans le Provider (non requis pour react-helmet) */}
      <Helmet>
        <title>{`${route.city} Heart GPS Art - CityHeart.run`}</title>
        <meta name="description" content={`Discover and run the heart-shaped route in ${route.city}. Download the GPX and join the community.`} />
      </Helmet>
      
      <RouteDetailClientContent route={route} />
    </>
  );
};

export default RouteDetailClient;
