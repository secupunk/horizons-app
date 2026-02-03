// Google Analytics 4 Tracking Utilities

/**
 * Wrapper for the window.gtag function.
 * Safely ignores calls if GA4 is not initialized or blocked.
 */
export const gtag = (...args) => {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    // Fallback or dev mode logging
    // console.debug('GA4 Event:', ...args);
  }
};

/**
 * Tracks adding a product to cart.
 * @param {string} productName - The name of the product
 * @param {number} price - The price of the product
 */
export const trackAddToCart = (productName, price) => {
  gtag('event', 'add_to_cart', {
    event_category: 'ecommerce',
    event_label: productName,
    value: price,
    currency: 'EUR',
    items: [
      {
        item_name: productName,
        price: price,
        quantity: 1
      }
    ]
  });
};

/**
 * Tracks navigation to the external app (generator).
 */
export const trackAppNavigation = () => {
  gtag('event', 'to_app', {
    event_category: 'navigation',
    event_label: 'external_link_click',
    destination: 'https://heart.cityheart.run'
  });
};

/**
 * Tracks Stripe checkout initiation.
 * @param {string} tier - The product tier (e.g., 'single_heart', 'lovers_pack')
 * @param {number} price - The price of the product
 */
export const trackStripeCheckout = (tier, price) => {
  gtag('event', 'stripe_checkout', {
    event_category: 'ecommerce',
    event_label: tier,
    value: price,
    currency: 'EUR',
    items: [
      {
        item_id: tier,
        item_name: tier.replace('_', ' ').toUpperCase(),
        price: price,
        quantity: 1
      }
    ]
  });
};

/**
 * Tracks viewing of a specific route detail page.
 * @param {string} slug - The route slug
 */
export const trackRouteView = (slug) => {
  gtag('event', 'view_route', {
    event_category: 'engagement',
    event_label: slug
  });
};

/**
 * Tracks GPX file download.
 * @param {string} slug - The route slug
 */
export const trackGPXDownload = (slug) => {
  gtag('event', 'download_gpx', {
    event_category: 'engagement',
    event_label: slug
  });
};

/**
 * Tracks route search queries.
 * @param {string} term - The search term used
 */
export const trackRouteSearch = (term) => {
  if (!term) return;
  gtag('event', 'search_routes', {
    event_category: 'engagement',
    event_label: term
  });
};

/**
 * Tracks usage of route filters.
 * @param {string} filterType - The type and value of filter (e.g., "distance: 5-10")
 */
export const trackRouteFilter = (filterType) => {
  gtag('event', 'filter_routes', {
    event_category: 'engagement',
    event_label: filterType
  });
};