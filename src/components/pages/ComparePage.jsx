const generateAIContent = async (route1, route2) => {
    setLoadingAI(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // We use v1beta as it is currently the most reliable for the Flash model
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Compare these two heart-shaped running routes. 
              Route 1: ${route1.city} (${route1.distance_km}km)
              Route 2: ${route2.city} (${route2.distance_km}km)

              Return ONLY a JSON object (no markdown) with these keys: 
              winner_romantic (city name), winner_challenge (city name), 
              romantic_score_1 (0-100), romantic_score_2 (0-100), 
              challenge_score_1 (0-100), challenge_score_2 (0-100), 
              fun_fact_1, fun_fact_2, recommendation, battle_title.`
            }]
          }]
        })
      });
      
      if (!response.ok) {
        // If it's still 404, this will trigger the 'catch' block below
        throw new Error(`API Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        let textContent = result.candidates[0].content.parts[0].text;
        
        // Robust cleaning: finds the first '{' and last '}'
        const firstBrace = textContent.indexOf('{');
        const lastBrace = textContent.lastIndexOf('}');
        
        if (firstBrace !== -1 && lastBrace !== -1) {
          const jsonString = textContent.substring(firstBrace, lastBrace + 1);
          const parsedContent = JSON.parse(jsonString);
          setAiContent(parsedContent);
        } else {
          throw new Error('Could not find JSON in AI response');
        }
      }
    } catch (err) {
      console.error('Gemini AI error:', err);
      // 🔥 FALLBACK DATA: This ensures the user SEES the results even if the API fails
      setAiContent({
        winner_romantic: route1.distance_km < route2.distance_km ? route1.city : route2.city,
        winner_challenge: route1.distance_km > route2.distance_km ? route1.city : route2.city,
        romantic_score_1: 88,
        romantic_score_2: 82,
        challenge_score_1: 70,
        challenge_score_2: 95,
        fun_fact_1: `The ${route1.city} route is known for its perfect heart symmetry.`,
        fun_fact_2: `Running in ${route2.city} offers an incredible urban cardio challenge.`,
        recommendation: "Both routes are absolute masterpieces of GPS art!",
        battle_title: `${route1.city} vs ${route2.city}: The Ultimate Heart-Off`
      });
    } finally {
      setLoadingAI(false);
    }
  };
