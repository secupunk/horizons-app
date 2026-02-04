import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routesService } from '../../services/routesService';
import { Trophy, Heart, Zap, TrendingUp, MapPin } from 'lucide-react';

const ComparePage = () => {
  const { slug1, slug2 } = useParams();
  const [data, setData] = useState({ r1: null, r2: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiContent, setAiContent] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

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
          // Générer le contenu AI après avoir chargé les routes
          generateAIContent(res1, res2);
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

  const generateAIContent = async (route1, route2) => {
    setLoadingAI(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Compare ces deux parcours en forme de cœur pour un ton fun et gamifié :

Route 1: ${route1.city}, ${route1.country} - ${route1.distance_km}km
Route 2: ${route2.city}, ${route2.country} - ${route2.distance_km}km

Génère une réponse au format JSON UNIQUEMENT (pas de texte avant ou après) :
{
  "winner_romantic": "${route1.city}" ou "${route2.city}",
  "winner_challenge": "${route1.city}" ou "${route2.city}",
  "romantic_score_1": 0-100,
  "romantic_score_2": 0-100,
  "challenge_score_1": 0-100,
  "challenge_score_2": 0-100,
  "fun_fact_1": "Une anecdote courte sur ${route1.city}",
  "fun_fact_2": "Une anecdote courte sur ${route2.city}",
  "recommendation": "Une phrase pour recommander quel parcours selon le profil (débutant, romantique, sportif)",
  "battle_title": "Un titre fun pour cette battle (ex: 'Battle des Capitales!', 'Clash des Cœurs!')"
}

Sois créatif, fun et précis. Les scores doivent être cohérents avec les distances.`
            }]
          }]
        })
      });

      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const textContent = result.candidates[0].content.parts[0].text;
        // Nettoyer le JSON (enlever les ```json si présent)
        const cleanedText = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsedContent = JSON.parse(cleanedText);
        setAiContent(parsedContent);
      }
    } catch (err) {
      console.error('Erreur AI:', err);
      // Fallback en cas d'erreur
      setAiContent(null);
    } finally {
      setLoadingAI(false);
    }
  };

  // Calculs automatiques
  const calculateStats = () => {
    if (!data.r1 || !data.r2) return null;

    const longerRoute = data.r1.distance_km > data.r2.distance_km ? data.r1 : data.r2;
    const shorterRoute = data.r1.distance_km <= data.r2.distance_km ? data.r1 : data.r2;
    const distanceDiff = Math.abs(data.r1.distance_km - data.r2.distance_km).toFixed(2);
    
    // Calcul approximatif des calories (environ 60 cal/km pour une personne moyenne)
    const calories1 = Math.round(data.r1.distance_km * 60);
    const calories2 = Math.round(data.r2.distance_km * 60);

    return {
      longerRoute,
      shorterRoute,
      distanceDiff,
      calories1,
      calories2,
      winner_calories: calories1 > calories2 ? data.r1 : data.r2
    };
  };

  const stats = calculateStats();

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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Titre avec AI Battle */}
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px', fontStyle: 'italic', textTransform: 'uppercase' }}>
          {aiContent?.battle_title || 
            `${data.r1.city} VS ${data.r2.city}`
          }
        </h1>
        <p style={{ textAlign: 'center', color: '#FF1493', fontSize: '1.2rem', marginBottom: '40px' }}>
          ⚔️ Battle des cœurs ⚔️
        </p>

        {/* Section AI Gamification */}
        {loadingAI && (
          <div style={{ textAlign: 'center', padding: '20px', background: '#1F2937', borderRadius: '15px', marginBottom: '30px' }}>
            <p>🤖 L'IA analyse les parcours...</p>
          </div>
        )}

        {aiContent && (
          <div style={{ background: 'linear-gradient(135deg, #FF1493 0%, #9333EA 100%)', padding: '30px', borderRadius: '20px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Trophy size={28} /> Les Résultats
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Heart size={24} color="#FF69B4" />
                  <h3>Plus Romantique</h3>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{aiContent.winner_romantic}</p>
                <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>
                  {data.r1.city}: {aiContent.romantic_score_1}/100<br/>
                  {data.r2.city}: {aiContent.romantic_score_2}/100
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Zap size={24} color="#FFD700" />
                  <h3>Plus Challengeant</h3>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{aiContent.winner_challenge}</p>
                <div style={{ marginTop: '10px', fontSize: '0.9rem', opacity: 0.8 }}>
                  {data.r1.city}: {aiContent.challenge_score_1}/100<br/>
                  {data.r2.city}: {aiContent.challenge_score_2}/100
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px' }}>
              <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={20} /> Recommandation
              </h3>
              <p>{aiContent.recommendation}</p>
            </div>
          </div>
        )}

        {/* Stats automatiques */}
        {stats && (
          <div style={{ background: '#1F2937', padding: '30px', borderRadius: '20px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>📊 Battle Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', color: '#FF1493', fontWeight: 'bold' }}>
                  {stats.distanceDiff} km
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Différence de distance</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', color: '#FFD700', fontWeight: 'bold' }}>
                  {stats.winner_calories.city}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Brûle le plus de calories</div>
                <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                  {stats.calories1} vs {stats.calories2} cal
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', color: '#3B82F6', fontWeight: 'bold' }}>
                  {stats.longerRoute.city}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Parcours le plus long</div>
              </div>
            </div>
          </div>
        )}

        {/* Cartes des routes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* CARTE VILLE 1 */}
          <div style={{ background: '#111827', borderRadius: '20px', overflow: 'hidden', border: '2px solid #FF1493', position: 'relative' }}>
            {aiContent?.winner_romantic === data.r1.city && (
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#FF1493', padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10 }}>
                ❤️ Most Romantic
              </div>
            )}
            <img src={data.r1.image_url} alt={data.r1.city} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{data.r1.city}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', opacity: 0.7 }}>
                <MapPin size={16} />
                <span>{data.r1.country}</span>
              </div>
              <p style={{ fontSize: '1.3rem', color: '#FF1493', fontWeight: 'bold', marginBottom: '10px' }}>
                Distance : {data.r1.distance_km} km
              </p>
              {aiContent?.fun_fact_1 && (
                <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                  💡 {aiContent.fun_fact_1}
                </p>
              )}
              <Link to={`/routes/${data.r1.slug}`} style={{ display: 'block', textAlign: 'center', background: '#FF1493', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', marginTop: '20px', fontWeight: 'bold' }}>
                Voir le parcours
              </Link>
            </div>
          </div>

          {/* CARTE VILLE 2 */}
          <div style={{ background: '#111827', borderRadius: '20px', overflow: 'hidden', border: '2px solid #3b82f6', position: 'relative' }}>
            {aiContent?.winner_romantic === data.r2.city && (
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#FF1493', padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 10 }}>
                ❤️ Most Romantic
              </div>
            )}
            <img src={data.r2.image_url} alt={data.r2.city} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{data.r2.city}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', opacity: 0.7 }}>
                <MapPin size={16} />
                <span>{data.r2.country}</span>
              </div>
              <p style={{ fontSize: '1.3rem', color: '#3b82f6', fontWeight: 'bold', marginBottom: '10px' }}>
                Distance : {data.r2.distance_km} km
              </p>
              {aiContent?.fun_fact_2 && (
                <p style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                  💡 {aiContent.fun_fact_2}
                </p>
              )}
              <Link to={`/routes/${data.r2.slug}`} style={{ display: 'block', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '10px', textDecoration: 'none', marginTop: '20px', fontWeight: 'bold' }}>
                Voir le parcours
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '30px', background: 'linear-gradient(135deg, #FF1493 0%, #9333EA 100%)', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Prêt à tracer ton cœur ?</h3>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            Chaque parcours à seulement €4.99 • GPS-perfect • Téléchargement instantané
          </p>
          <Link to="/routes" style={{ display: 'inline-block', background: 'white', color: '#FF1493', padding: '15px 40px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Voir tous les parcours →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
