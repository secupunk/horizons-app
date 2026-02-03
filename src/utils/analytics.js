/**
 * Utility functions for Google Analytics tracking
 */

/**
 * Tracks a custom event in Google Analytics
 * @param {string} eventName - The name of the event
 * @param {Object} [eventParams={}] - Optional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn(`Google Analytics not initialized. Event '${eventName}' not tracked.`);
  }
};

/**
 * Tracks a page view in Google Analytics
 * @param {string} pagePath - The path of the page viewed
 * @param {string} [pageTitle] - Optional title of the page
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};