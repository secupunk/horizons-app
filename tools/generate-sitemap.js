import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSitemapXML } from '../src/utils/sitemapGenerator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Helper to load env vars manually in Node environment
const loadEnv = () => {
  const envPath = path.join(PROJECT_ROOT, '.env.local');
  const envVars = {};
  
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, '');
        envVars[key] = value;
      }
    });
  }
  return envVars;
};

const generateSitemap = async () => {
  console.log('🔄 [Sitemap] Starting generation process...');
  
  // 1. Load Credentials
  const env = loadEnv();
  const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

  let dynamicRoutes = [];

  // 2. Fetch Routes from Supabase
  if (supabaseUrl && supabaseKey) {
    try {
      console.log('⏳ [Sitemap] Connecting to Supabase...');
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error } = await supabase
        .from('public_routes')
        .select('slug, updated_at, image_url, title')
        .eq('is_public', true);

      if (error) throw error;

      dynamicRoutes = data || [];
      console.log(`✅ [Sitemap] Successfully fetched ${dynamicRoutes.length} dynamic routes.`);
      
    } catch (err) {
      console.error('⚠️ [Sitemap] Failed to fetch dynamic routes:', err.message);
      console.log('   Proceeding with static pages only.');
    }
  } else {
    console.warn('⚠️ [Sitemap] Supabase credentials missing. Generating static sitemap only.');
  }

  // 3. Generate XML using shared utility
  try {
    const xml = generateSitemapXML(dynamicRoutes);
    
    // 4. Write to file
    const publicDir = path.join(PROJECT_ROOT, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    const filePath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(filePath, xml);
    
    console.log('------------------------------------------------');
    console.log(`🎉 [Sitemap] Generated successfully!`);
    console.log(`   Location: ${filePath}`);
    console.log(`   Dynamic Routes Included: ${dynamicRoutes.length}`);
    console.log('------------------------------------------------');
    
  } catch (err) {
    console.error('❌ [Sitemap] Error during XML generation:', err.message);
    process.exit(1);
  }
};

generateSitemap();