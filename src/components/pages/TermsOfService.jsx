import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A0E27] text-gray-300">
      <Helmet>
        <title>Terms of Service | CityHeart</title>
        <meta name="description" content="Terms of Service for CityHeart - Usage guidelines and legal agreement." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white font-playfair">Terms of Service</h1>
          <p className="mb-8 text-sm text-gray-500">Last updated: January 11, 2026</p>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CityHeart ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">2. Description of Service</h2>
            <p>
              CityHeart provides downloadable GPS route files (.gpx) designed to create heart shapes when walked, run, or cycled in specific cities. These are digital products delivered electronically.
            </p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">3. Payment & Refunds</h2>
            <p>
              <strong>Pricing:</strong> Routes are available for a one-time purchase fee of $4.99 USD. Prices are subject to change without notice.
            </p>
            <p>
              <strong>Refunds:</strong> Due to the nature of digital goods, all sales are final. However, if you experience technical issues with the file, please contact support for assistance or a replacement.
            </p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">4. User Responsibilities</h2>
            <p>
              You agree to use the Service only for lawful purposes. You are responsible for your own safety while navigating the routes. CityHeart is not responsible for any injuries, accidents, or damages that may occur while using our routes. Always obey local traffic laws and be aware of your surroundings.
            </p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">5. Intellectual Property</h2>
            <p>
              All content, designs, and route data provided by CityHeart are the intellectual property of CityHeart. You may not resell, redistribute, or reproduce the route files for commercial purposes without our express written consent.
            </p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, CityHeart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsOfService;