import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <div className="bg-[#0A0E27] min-h-screen text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>Terms of Service | CityHeart.run</title>
        <meta name="description" content="Terms of Service for CityHeart.run" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 italic uppercase">Terms of Service</h1>
        <div className="prose prose-invert text-slate-400 leading-relaxed">
          <p className="mb-4">By using CityHeart.run, you agree to these terms and conditions.</p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4 uppercase">1. Usage</h2>
          <p className="mb-4">The GPX routes provided are for personal use only. Use at your own risk while following local traffic laws.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
