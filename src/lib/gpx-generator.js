/**
 * Generates a GPX XML string from route data
 * @param {Array<{lat: number, lng: number}>} coordinates - Array of coordinate objects
 * @param {string} name - Name of the route
 * @param {string} city - City name
 * @returns {string} - The GPX XML string
 */
export const generateGPX = (coordinates, name, city) => {
  if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
    throw new Error('Invalid coordinates data');
  }

  const timestamp = new Date().toISOString();
  const creator = "CityHeart";

  // XML Header
  let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="${creator}" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${name}</name>
    <desc>Heart-shaped running route in ${city} by CityHeart</desc>
    <author>
      <name>CityHeart</name>
      <link href="https://cityheart.run">
        <text>CityHeart</text>
        <type>text/html</type>
      </link>
    </author>
    <time>${timestamp}</time>
  </metadata>
  <trk>
    <name>${name}</name>
    <type>running</type>
    <trkseg>
`;

  // Track Points
  coordinates.forEach(point => {
    // Ensure lat/lng are present. Handle different property names if necessary (e.g., lat vs latitude)
    const lat = point.lat || point.latitude;
    const lng = point.lng || point.lon || point.longitude;
    const ele = point.ele || point.elevation || 0;

    if (lat !== undefined && lng !== undefined) {
      gpx += `      <trkpt lat="${lat}" lon="${lng}">
        <ele>${ele}</ele>
        <time>${timestamp}</time>
      </trkpt>\n`;
    }
  });

  // XML Footer
  gpx += `    </trkseg>
  </trk>
</gpx>`;

  return gpx;
};