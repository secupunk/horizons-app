import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BeyondValentinesDaySection from './sections/BeyondValentinesDaySection';
import PricingSection from './sections/PricingSection';
import RealStoriesSection from './sections/RealStoriesSection';
import FAQSection from './sections/FAQSection';
import FinalCTASection from './sections/FinalCTASection';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import RequestCityForm from './modals/RequestCityForm';
import WorldCupWaitlistForm from './modals/WorldCupWaitlistForm';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#001F3F] text-white">
      <Helmet>
        <title>CityHeart - Perfect Heart GPS Routes | Valentine's, Travel & More</title>
        <meta name="description" content="Professional heart-shaped GPS routes for 60+ cities. Perfect for Valentine's Day gifts, travel memories, running clubs, and special occasions. Instant download." />
        <meta name="keywords" content="valentine's day running, GPS art, heart shaped route, running gift, travel memories, GPS heart, running route, city running" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "CityHeart GPS Art Routes",
              "description": "Downloadable GPS (GPX) files for heart-shaped running and walking routes in major global cities.",
              "brand": {
                "@type": "Brand",
                "name": "CityHeart"
              },
              "offers": {
                "@type": "Offer",
                "price": "4.99",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock"
              }
            }
          `}
        </script>
      </Helmet>

      <main>
        <HeroSection />
        <HowItWorksSection />
        <BeyondValentinesDaySection />
        <PricingSection />
        <RealStoriesSection />
        <FAQSection />
        <FinalCTASection />
      </main>

      <Footer />
      <FloatingCTA />
      
      {/* Modals placed here to be accessible via context from any section */}
      <RequestCityForm />
      <WorldCupWaitlistForm />
    </div>
  );
}