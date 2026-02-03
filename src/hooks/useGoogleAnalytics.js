import { useEffect } from 'react';

const TRACKING_ID = 'G-FMD2XM6F23';

/**
 * Hook to initialize Google Analytics
 * Loads the gtag.js script and initializes the dataLayer
 */
const useGoogleAnalytics = () => {
  useEffect(() => {
    // Check if script is already present to prevent duplicates
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${TRACKING_ID}"]`);
    
    if (!existingScript) {
      // Create script element
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
      
      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      // Initialize configuration after script loads
      script.onload = () => {
        gtag('js', new Date());
        gtag('config', TRACKING_ID, {
          send_page_view: false // We will manually track page views to handle SPA routing
        });
      };
      
      // Append to head
      document.head.appendChild(script);
      
      // Pre-initialize for immediate use (even before script loads, dataLayer works)
      gtag('js', new Date());
      gtag('config', TRACKING_ID, {
        send_page_view: false 
      });
    }
  }, []);
};

export default useGoogleAnalytics;