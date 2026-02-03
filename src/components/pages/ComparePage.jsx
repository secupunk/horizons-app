import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { routesService } from '../../services/routesService';

const ComparePage = () => {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ r1: null, r2: null });
  const [status, setStatus] = useState('Initialisation...');

  useEffect(() => {
    const loadData = async () => {
      setStatus(`Chargement : ${slug1} vs ${slug2}...`);
      try {
        const [res1, res2] = await Promise.all([
          routesService.getRouteBySlug(slug1),
          routesService.getRouteBySlug(slug2)
        ]);
        
        if (!res1 || !res2) {
          setStatus('Erreur : Un des parcours est introuvable.');
        } else {
          setData({ r1: res1, r2: res2 });
          setStatus('Données chargées !');
        }
      } catch (e) {
        setStatus(`Erreur technique : ${e.message}`);
      }
    };
    if (slug1 && slug2) loadData();
  }, [slug1, slug2]);

  return (
    <div style={{ background: '#0A0E27', minHeight: '100vh', color: 'white', padding: '120px 20px' }}>
      <div style={{ border: '3px solid #FF1493', padding: '20px', borderRadius: '15px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#FF1493', marginTop: 0 }}>Mode Diagnostic : Compare Page</h1>
        <p><strong>Statut :</strong> {status}</p>
        <p><strong>Ville 1 :</strong> {slug1}</p>
        <p><strong>Ville 2 :</strong> {slug2}</p>
      </div>

      {data.r1 && data.r2 && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', maxWidth: '800px', margin: '30px auto' }}>
          <div style={{ flex: 1, padding: '20px', background: '#111827', borderRadius: '10px', border: '1px solid #374151' }}>
            <h2 style={{ color: '#FF1493' }}>{data.r1.city}</h2>
            <p>{data.r1.distance_km} km</p>
          </div>
          <div style={{ flex: 1, padding: '20px', background: '#111827', borderRadius: '10px', border: '1px solid #374151' }}>
            <h2 style={{ color: '#3b82f6' }}>{data.r2.city}</h2>
            <p>{data.r2.distance_km} km</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
