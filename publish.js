/**
 * Utility functions for publishing maps and managing user sessions.
 */

// Get current logged-in user from localStorage
export function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

// Get all published maps from localStorage
export function getPublishedMaps() {
  return JSON.parse(localStorage.getItem('publishedMaps') || '[]');
}

// Save a new map to published maps
export function publishMap(title, chartData) {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('User not logged in');
  }
  const maps = getPublishedMaps();
  const newMap = {
    id: Date.now(),
    title: title || 'Untitled Map',
    author: user,
    chartData: chartData
  };
  maps.push(newMap);
  localStorage.setItem('publishedMaps', JSON.stringify(maps));
  return newMap;
}
