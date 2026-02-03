export const generateOfferShippingDetailsSchema = () => ({
  "@type": "OfferShippingDetails",
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": "0",
    "currency": "EUR"
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "WX" // World Wide
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 0,
      "maxValue": 0,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 0,
      "maxValue": 0,
      "unitCode": "DAY"
    }
  }
});

export const generateMerchantReturnPolicySchema = () => ({
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "WX",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 7,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn"
});

export const generateOfferSchema = (price, url) => ({
  "@type": "Offer",
  "price": price,
  "priceCurrency": "EUR",
  "priceValidUntil": "2026-12-31",
  "availability": "https://schema.org/InStock",
  "url": url,
  "shippingDetails": generateOfferShippingDetailsSchema(),
  "hasMerchantReturnPolicy": generateMerchantReturnPolicySchema()
});

export const generateAggregateRatingSchema = (ratingValue = "4.8", reviewCount = "150") => ({
  "@type": "AggregateRating",
  "ratingValue": ratingValue,
  "reviewCount": reviewCount
});

export const generateProductSchema = ({ name, description, image, price, url, brand = "CityHeart", ratingValue, reviewCount }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "image": image || "https://cityheart.run/og-image.jpg",
  "brand": {
    "@type": "Brand",
    "name": brand
  },
  "offers": generateOfferSchema(price, url),
  "aggregateRating": generateAggregateRatingSchema(ratingValue, reviewCount)
});

export const generateSportsActivityLocationSchema = ({ name, description, image, city, latitude = "0", longitude = "0" }) => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": name,
  "description": description,
  "image": image || "https://cityheart.run/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": city,
    "addressCountry": "World"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": latitude,
    "longitude": longitude
  },
  "aggregateRating": generateAggregateRatingSchema("4.7", "200")
});