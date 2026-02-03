import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Use import.meta.env for Vite environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables in sitemap handler');
    return res.status(500).send('Configuration Error');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Fetch all public routes in real-time
    const { data: routes, error } = await supabase
      .from('public_routes')
      .select('slug, updated_at')
      .eq('is_public', true);

    if (error) {
      console.error('❌ Supabase fetch error:', error);
      throw error;
    }

    console.log(`✅ Sitemap generated: ${routes?.length || 0} routes`);

    const baseUrl = 'https://cityheart.run';
    const today = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/routes', priority: '0.9', changefreq: 'daily' },
      { url: '/free', priority: '0.8', changefreq: 'weekly' }
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add dynamic route pages
    if (routes && routes.length > 0) {
      routes.forEach(route => {
        const lastMod = route.updated_at ? route.updated_at.split('T')[0] : today;
        xml += `
  <url>
    <loc>${baseUrl}/routes/${route.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }

    xml += `
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(xml);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    
    // Return minimal sitemap on error to prevent total failure
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cityheart.run/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(fallbackXml);
  }
}