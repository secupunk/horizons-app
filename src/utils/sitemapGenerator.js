const BASE_URL = 'https://runtheworld.today'; // TODO: Update with your actual domain

/**
 * Generates an XML sitemap string from a list of routes.
 * @param {Array} routes - Array of route objects { slug, updated_at, image_url, title }
 * @returns {string} XML sitemap content
 */
export const generateSitemapXML = (routes = []) => {
  const currentDate = new Date().toISOString();

  // Define static pages with their priorities and change frequencies
  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/routes', priority: '0.9', changefreq: 'daily' },
    { path: '/free-running-routes', priority: '0.9', changefreq: 'daily' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
    { path: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
    { path: '/refund-policy', priority: '0.5', changefreq: 'yearly' },
  ];

  // Generate XML for static pages
  const staticUrls = staticPages
    .map((page) => {
      return `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('');

  // Helper to escape XML special characters
  const escapeXml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  // Generate XML for dynamic route pages
  const dynamicUrls = routes
    .map((route) => {
      const lastMod = route.updated_at
        ? new Date(route.updated_at).toISOString()
        : currentDate;
      
      const loc = `${BASE_URL}/route/${route.slug}`;
      const title = route.title ? escapeXml(route.title) : 'Route';
      const imageUrl = route.image_url ? escapeXml(route.image_url) : null;

      let imageTag = '';
      if (imageUrl) {
        imageTag = `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${title}</image:title>
    </image:image>`;
      }

      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`;
    })
    .join('');

  // Combine into final XML
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticUrls}
${dynamicUrls}
</urlset>`;
};