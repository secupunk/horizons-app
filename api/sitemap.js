import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  );

  try {
    const { data: routes, error } = await supabase.from('routes').select('slug');
    
    if (error) throw error;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>https://www.cityheart.run/</loc></url>
      <url><loc>https://www.cityheart.run/routes</loc></url>
      ${routes.map(r => `
        <url>
          <loc>https://www.cityheart.run/routes/${r.slug}</loc>
          <changefreq>weekly</changefreq>
        </url>`).join('')}
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(xml);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
