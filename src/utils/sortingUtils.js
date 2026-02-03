export const SORT_OPTIONS = {
  LATEST: 'latest',
  OLDEST: 'oldest',
  AZ: 'az',
  ZA: 'za',
  DISTANCE_ASC: 'distance_asc',
  DISTANCE_DESC: 'distance_desc'
};

export const getSortLabel = (option) => {
  switch (option) {
    case SORT_OPTIONS.LATEST: return 'Newest First';
    case SORT_OPTIONS.OLDEST: return 'Oldest First';
    case SORT_OPTIONS.AZ: return 'City (A-Z)';
    case SORT_OPTIONS.ZA: return 'City (Z-A)';
    case SORT_OPTIONS.DISTANCE_ASC: return 'Distance (Shortest)';
    case SORT_OPTIONS.DISTANCE_DESC: return 'Distance (Longest)';
    default: return 'Sort By';
  }
};

export const sortRoutes = (routes, sortOption) => {
  if (!routes || !Array.isArray(routes)) return [];
  
  const sorted = [...routes];
  
  switch (sortOption) {
    case SORT_OPTIONS.LATEST:
      return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    case SORT_OPTIONS.OLDEST:
      return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    case SORT_OPTIONS.AZ:
      return sorted.sort((a, b) => (a.city || '').localeCompare(b.city || ''));
    case SORT_OPTIONS.ZA:
      return sorted.sort((a, b) => (b.city || '').localeCompare(a.city || ''));
    case SORT_OPTIONS.DISTANCE_ASC:
      return sorted.sort((a, b) => (a.distance_km || 0) - (b.distance_km || 0));
    case SORT_OPTIONS.DISTANCE_DESC:
      return sorted.sort((a, b) => (b.distance_km || 0) - (a.distance_km || 0));
    default:
      return sorted;
  }
};