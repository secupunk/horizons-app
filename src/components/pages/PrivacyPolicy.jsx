import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0A0E27] min-h-screen text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>Privacy Policy | CityHeart.run</title>
        <meta name="description" content="Privacy Policy for CityHeart.run" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 italic uppercase">Privacy Policy</h1>
        <div className="prose prose-invert text-slate-400 leading-relaxed">
          <p className="mb-4">Your privacy is important to us. This policy outlines how we handle your information.</p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4 uppercase">1. Data Collection</h2>
          <p className="mb-4">We do not store your GPS location data. We only process email addresses for account and delivery purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
