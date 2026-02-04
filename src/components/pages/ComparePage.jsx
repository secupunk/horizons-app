import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';

const CompareDirectory = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const loadRoutes = async () => {
      const data = await routesService.getAllRoutes(); // Assume this exists in your service
      setRoutes(data);
    };
    loadRoutes();
  }, []);

  // Generate Pairs (Example: Pair every route with the one following it)
  const generateMatchups = () => {
    const pairs = [];
    for (let i = 0; i < routes.length; i++) {
      for (let j = i + 1; j < routes.length; j++) {
        pairs.push({ r1: routes[i], r2: routes[j] });
      }
    }
    return pairs;
  };

  const matchups = generateMatchups();

  return (
    <div style={{ background: '#0A0E27', minHeight: '100vh', color: 'white', paddingTop: '120px', paddingBottom: '50px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Heart Route Battles</h1>
        <div style={{ display: 'grid', gap: '15px' }}>
          {matchups.map((pair) => (
            <Link 
              key={`${pair.r1.id}-${pair.r2.id}`}
              to={`/compare/${pair.r1.slug}/${pair.r2.slug}`}
              style={{ background: '#1F2937', padding: '20px', borderRadius: '12px', color: 'white', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{pair.r1.city} vs {pair.r2.city}</span>
              <span style={{ color: '#FF1493' }}>Compare →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareDirectory;
