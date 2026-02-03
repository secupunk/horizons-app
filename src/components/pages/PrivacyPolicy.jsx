import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0E27] text-gray-300">
      <Helmet>
        <title>Privacy Policy | CityHeart</title>
        <meta name="description" content="Privacy Policy for CityHeart - How we collect, use, and protect your data." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white font-playfair">Privacy Policy</h1>
          <p className="mb-8 text-sm text-gray-500">Last updated: January 11, 2026</p>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">1. Information We Collect</h2>
            <p>
              When you use CityHeart ("we", "us", or "our"), we collect minimal information necessary to provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> We collect your email address when you purchase a route or subscribe to our newsletter.</li>
              <li><strong>Usage Data:</strong> We may collect anonymous data about how you interact with our website to improve user experience.</li>
              <li><strong>Location Data:</strong> We do NOT track your real-time location. Our route files are pre-generated static GPS data.</li>
            </ul>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">2. How We Use Your Data</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and deliver your purchased GPS route files.</li>
              <li>To communicate with you regarding your order or support inquiries.</li>
              <li>To improve our website functionality and content.</li>
              <li>To prevent fraud and ensure the security of our platform.</li>
            </ul>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">3. Third-Party Services</h2>
            <p>We utilize trusted third-party services to operate our business:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Payment Processing:</strong> We use Stripe to securely process payments. We do not store your credit card information on our servers.</li>
              <li><strong>Hosting:</strong> Our website is hosted on secure cloud infrastructure providers.</li>
              <li><strong>Analytics:</strong> We may use privacy-focused analytics tools to understand website traffic trends.</li>
            </ul>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">4. Your Rights (GDPR & CCPA)</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Opt-out of marketing communications at any time.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p>To exercise these rights, please contact us at <a href="mailto:privacy@cityheart.run" className="text-pink-400 hover:underline">privacy@cityheart.run</a>.</p>
          </section>

          <section className="mb-12 space-y-6">
            <h2 className="text-2xl font-bold text-pink-400 font-playfair">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@cityheart.run" className="text-pink-400 hover:underline">privacy@cityheart.run</a>
            </p>
          </section>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;