import React from 'react';
import { Helmet } from 'react-helmet-async';

const RefundPolicy = () => {
  return (
    <div className="bg-[#0A0E27] min-h-screen text-white pt-32 pb-20 px-6">
      <Helmet>
        <title>Refund Policy | CityHeart.run</title>
        <meta name="description" content="Refund Policy for CityHeart.run" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 italic uppercase">Refund Policy</h1>
        <div className="prose prose-invert text-slate-400 leading-relaxed">
          <p className="mb-4">All sales of digital products (GPX files) are final.</p>
          <h2 className="text-xl font-bold text-white mt-8 mb-4 uppercase">1. Digital Nature</h2>
          <p className="mb-4">Since our routes are digital assets, we cannot offer refunds once the file has been accessed or downloaded.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
