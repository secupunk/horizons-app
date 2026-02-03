/**
 * Validates a route object against quality standards.
 * @param {Object} route - The route object to validate.
 * @returns {boolean} - True if the route passes all quality checks.
 */
export const isValidRoute = (route) => {
  if (!route) return false;

  // 1. Check coordinates: Must exist, be an array, and have enough points for a detailed path (> 20)
  if (!route.coordinates || !Array.isArray(route.coordinates) || route.coordinates.length <= 20) {
    return false;
  }

  // 2. Check image_url: Must exist, be a string, and be a valid URL (start with http)
  if (!route.image_url || typeof route.image_url !== 'string' || !route.image_url.startsWith('http')) {
    return false;
  }

  // 3. Check city: Must be populated
  if (!route.city || typeof route.city !== 'string' || route.city.trim() === '') {
    return false;
  }

  // 4. Check distance: Must be a valid number
  if (typeof route.distance_km !== 'number' || isNaN(route.distance_km)) {
    return false;
  }

  // 5. Check slug: Must exist
  if (!route.slug || typeof route.slug !== 'string' || route.slug.trim() === '') {
    return false;
  }

  return true;
};