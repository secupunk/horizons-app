import { createClient } from '@supabase/supabase-js';

const STORAGE_KEY = 'cityheart_waitlist';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client if credentials exist
let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

/**
 * Fallback mechanism to store email in localStorage if Supabase fails or is offline.
 * @param {string} email 
 * @returns {Object} result
 */
const addToLocalStorage = (email) => {
  try {
    const currentList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Check for duplicates locally
    if (currentList.some(entry => entry.email === email)) {
      throw new Error('This email is already on the waitlist!');
    }

    const newEntry = {
      id: Date.now(),
      email,
      created_at: new Date().toISOString(),
      status: 'pending_sync' // Mark as pending sync
    };

    const newList = [...currentList, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

    console.log('Saved to local storage (offline mode)');
    return { success: true, data: newEntry, offline: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Adds an email to the waitlist using Supabase as primary source,
 * falling back to localStorage if connection fails.
 * @param {string} email 
 * @returns {Promise<Object>} result
 */
export const addToWaitlist = async (email) => {
  // If Supabase is not configured, strictly use local storage
  if (!supabase) {
    console.warn('Supabase not configured. Using local storage.');
    return addToLocalStorage(email);
  }

  try {
    // Attempt to insert into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ 
        email, 
        status: 'pending' 
        // created_at is handled by default constraint in SQL
      }])
      .select()
      .single();

    if (error) {
      // Handle unique constraint violation (duplicate email)
      // Postgres error code 23505 = unique_violation
      if (error.code === '23505') {
        return { success: false, error: 'This email is already on the waitlist!' };
      }
      
      // For other API errors, throw to catch block to trigger fallback
      throw error; 
    }

    return { success: true, data };

  } catch (error) {
    console.error('Supabase operation failed:', error.message || error);
    
    // Fallback to local storage for offline capabilities or API failures
    // This ensures we capture the lead even if the backend is temporarily unreachable
    return addToLocalStorage(email);
  }
};