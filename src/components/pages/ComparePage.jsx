import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';

const ComparePage = () => {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ route1: null, route2: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        
        if (!res1 || !res2) {
          setError("One or both routes not found.");
        } else {
          setData({ route1: res1, route2: res2 });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug1 && slug2) fetchComparison();
  }, [slug1, slug2]);

  if (loading) return <div style={{color:'white', textAlign:'center', paddingTop:'100px'}}>Loading Comparison...</div>;
  
  if (error || !data.route1 || !data.route2) return (
    <div style={{color:'white', textAlign:'center', paddingTop:'100px'}}>
      <h1>Error</h1>
      <p>{error || "Routes missing"}</p>
      <Link to="/routes" style={{color:'#FF1493'}}>Back to Routes</Link>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0A0E27', minHeight: '100vh', color: 'white', paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>
        {data.route1.city} VS {data.route2.city}
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* CARTE 1 */}
        <div style={{ background: '#111827', borderRadius: '20px', padding: '20px', border: '1px solid #374151' }}>
          <img src={data.route1.image_url} alt={data.route1.city} style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} />
          <h2>{data.route1.city}</h2>
          <p>Distance: {data.route1.distance_km} km</p>
          <Link to={`/routes/${data.route1.slug}`} style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#FF1493', textAlign: 'center', borderRadius: '10px', color: 'white', textDecoration: 'none' }}>View Route</Link>
        </div>

        {/* CARTE 2 */}
        <div style={{ background: '#111827', borderRadius: '20px', padding: '20px', border: '1px solid #374151' }}>
          <img src={data.route2.image_url} alt={data.route2.city} style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} />
          <h2>{data.route2.city}</h2>
          <p>Distance: {data.route2.distance_km} km</p>
          <Link to={`/routes/${data.route2.slug}`} style={{ display: 'block', marginTop: '20px', padding: '10px', background: '#3b82f6', textAlign: 'center', borderRadius: '10px', color: 'white', textDecoration: 'none' }}>View Route</Link>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
