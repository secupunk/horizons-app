import { supabase } from '../supabaseClient';

export const routesService = {
  /**
   * Fetch all public routes ordered by city
   * STRICTLY FILTERS by is_public = true
   */
  getAllRoutes: async () => {
    try {
      const { data, error } = await supabase
        .from('public_routes')
        .select('*')
        .eq('is_public', true) // Critical security filter
        .order('city', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all routes:', error);
      return [];
    }
  },

  /**
   * Fetch a single route by its slug
   * STRICTLY FILTERS by is_public = true
   */
  getRouteBySlug: async (slug) => {
    try {
      const { data, error } = await supabase
        .from('public_routes')
        .select('*')
        .eq('slug', slug)
        .eq('is_public', true) // Critical security filter
        .single();

      if (error) {
        // If error is code PGRST116 (0 rows), it means not found or not public
        if (error.code === 'PGRST116') {
             return null;
        }
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching route by slug:', error);
      throw error;
    }
  },

  incrementViewCount: async (id) => {
    // RPC call disabled to prevent errors as function does not exist in DB
    // To enable: Create 'increment_view_count' function in Supabase and uncomment below
    /*
    try {
      const { error } = await supabase.rpc('increment_view_count', { row_id: id });
      if (error) {
         console.warn('RPC increment_view_count failed', error);
      }
      return true;
    } catch (error) {
      console.error('Error incrementing view count:', error);
      return false;
    }
    */
    return true;
  },

  getSimilarRoutes: async (city, currentSlug, limit = 3) => {
    try {
      const { data, error } = await supabase
        .from('public_routes')
        .select('*')
        .eq('city', city)
        .neq('slug', currentSlug)
        .eq('is_public', true)
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching similar routes:', error);
      return [];
    }
  },

  searchRoutes: async (searchTerm, distance, activity) => {
    try {
      let query = supabase
        .from('public_routes')
        .select('*')
        .eq('is_public', true) // Critical security filter
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`);
      }

      if (activity && activity !== 'all') {
        query = query.eq('activity_type', activity);
      }

      if (distance && distance !== 'all') {
        if (distance === '0-5') {
          query = query.lte('distance_km', 5);
        } else if (distance === '5-10') {
          query = query.gt('distance_km', 5).lte('distance_km', 10);
        } else if (distance === '10-15') {
          query = query.gt('distance_km', 10).lte('distance_km', 15);
        } else if (distance === '15+') {
          query = query.gt('distance_km', 15);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching routes:', error);
      return [];
    }
  }
};