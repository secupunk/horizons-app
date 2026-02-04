export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { route1, route2 } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; // Managed by Vercel, not visible to users

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Compare these running routes. Return ONLY raw JSON: 
              Route 1: ${route1.city} (${route1.distance_km}km)
              Route 2: ${route2.city} (${route2.distance_km}km)`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    
    // Extract the text from Gemini
    const aiText = data.candidates[0].content.parts[0].text;
    
    // Clean and parse the JSON before sending it back to your React app
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse AI" };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
