import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';

const ComparePage = () => {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ r1: null, r2: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Slugs reçus:", slug1, slug2);
        
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        
        if (!res1 || !res2) {
          setError("L'un des parcours est introuvable dans la base de données.");
        } else {
          setData({ r1: res1, r2: res2 });
        }
      } catch (err) {
        setError("Erreur de connexion à la base de données : " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug1 && slug2) {
      fetchData();
    } else {
      setError("Les noms des villes sont manquants dans l'URL.");
      setLoading(false);
    }
  }, [slug1, slug2]);

  if (loading) {
    return (
      <div style={{ background: '#0A0E27', height: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Analyse des parcours en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#0A0E27', height: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#FF1493' }}>Oups !</h1>
        <p>{error}</p>
        <Link to="/routes" style={{ color: 'cyan', marginTop: '20px' }}>Retour aux parcours</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0A0E27', minHeight: '100vh', color: 'white', paddingTop: '120px', paddingBottom: '50px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px', fontStyle: 'italic' }}>
          {data.r1.city} <span style={{ color: '#FF1493' }}>VS</span> {data.r2.city}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* CARTE VILLE 1 */}
          <div style={{ background: '#111827', borderRadius: '20px', overflow: 'hidden', border: '1px solid #374151' }}>
            <img src={data.r1.image_url} alt={data.r1.city} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h2>{data.r1.city}</h2>
              <p>Distance : {data.r1.distance_km} km</p>
              <Link to={`/routes/${data.r1.slug}`} style={{ display: 'block', textAlign: 'center', background: '#FF1493', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', marginTop: '20px', fontWeight: 'bold' }}>
                Voir le parcours
              </Link>
            </div>
          </div>

          {/* CARTE VILLE 2 */}
          <div style={{ background: '#111827', borderRadius: '20px', overflow: 'hidden', border: '1px solid #374151' }}>
            <img src={data.r2.image_url} alt={data.r2.city} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h2>{data.r2.city}</h2>
              <p>Distance : {data.r2.distance_km} km</p>
              <Link to={`/routes/${data.r2.slug}`} style={{ display: 'block', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', marginTop: '20px', fontWeight: 'bold' }}>
                Voir le parcours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
