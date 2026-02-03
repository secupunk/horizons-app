import { generateGPX } from '../lib/gpx-generator';
import { trackGPXDownload } from './analyticsTracking';
import { toast } from '../components/ui/use-toast';

/**
 * Handles the generation and download of a GPX file
 * @param {Object} route - The route object containing details and coordinates
 */
export const downloadGPX = async (route) => {
  try {
    if (!route.coordinates || route.coordinates.length === 0) {
      // In a real scenario, you might need to fetch coordinates if they aren't loaded yet
      // For this static demo, we'll assume they are passed or handle the error
      toast({
        title: "Download Failed",
        description: "Route coordinates are missing.",
        variant: "destructive",
      });
      return;
    }

    const gpxData = generateGPX(route.coordinates, route.title, route.city);
    const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    // Sanitize filename
    const safeCity = route.city.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const safeDist = route.distance_km.toString().replace('.', '-');
    link.download = `cityheart-${safeCity}-${safeDist}km.gpx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Tracking & Feedback
    trackGPXDownload(route.slug);
    toast({
      title: "Success!",
      description: "Your GPX file has been downloaded.",
      variant: "default",
    });

  } catch (error) {
    console.error('GPX Download Error:', error);
    toast({
      title: "Error",
      description: "Failed to generate GPX file. Please try again.",
      variant: "destructive",
    });
  }
};