// Meta Pixel Tracking Utilities

/**
 * Tracks a page view event.
 * Should be called on route changes in SPAs.
 */
export const trackPageView = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  } else {
    console.debug('Meta Pixel: PageView (mock)', window.location.pathname);
  }
};

/**
 * Tracks when a user views content (e.g., a specific route page).
 * @param {string} routeTitle - Name of the route
 * @param {number|string} routePrice - Price of the route
 */
export const trackViewContent = (routeTitle, routePrice) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: routeTitle,
      content_type: 'product',
      value: Number(routePrice) || 0,
      currency: 'EUR'
    });
  } else {
    console.debug('Meta Pixel: ViewContent (mock)', { routeTitle, routePrice });
  }
};

/**
 * Tracks when an item is added to cart (or clicked to buy).
 * @param {string} packName - Name of the package (e.g., "Single Heart")
 * @param {number|string} price - Price of the package
 */
export const trackAddToCart = (packName, price) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: packName,
      content_type: 'product',
      value: Number(price) || 0,
      currency: 'EUR'
    });
  } else {
    console.debug('Meta Pixel: AddToCart (mock)', { packName, price });
  }
};

/**
 * Tracks initiation of checkout process (e.g., Stripe redirect).
 * @param {string} packName - Name of the package
 * @param {number|string} price - Price of the package
 */
export const trackInitiateCheckout = (packName, price) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: packName,
      content_type: 'product',
      value: Number(price) || 0,
      currency: 'EUR'
    });
  } else {
    console.debug('Meta Pixel: InitiateCheckout (mock)', { packName, price });
  }
};