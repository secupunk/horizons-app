import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet';

const faqs = [
  {
    q: "How do I use these free running routes?",
    a: "Download the GPX file and upload it to your Garmin, Apple Watch, or Strava account. Our routes are pre-tested to ensure a smooth running experience."
  },
  {
    q: "Why are these routes heart-shaped?",
    a: "We believe running should be fun. Our GPS Art routes turn your workout into a masterpiece on your Strava map."
  },
  {
    q: "Do I need an account to download the GPX files?",
    a: "No. We offer these 5 featured samples 100% free with no signup required so you can test the quality of our city maps instantly."
  },
  {
    q: "Are there more routes available?",
    a: "Yes! Beyond these samples, we have a premium catalog of over 100 cities worldwide including Rome, London, and Tokyo."
  }
];

export default function FreeFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  // JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <section className="py-24 bg-[#0A1628]" id="faq">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about CityHeart</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              className="border border-slate-800 rounded-xl bg-[#1E293B] overflow-hidden transition-all hover:border-[#FF1493]/50"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-white">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-[#FF1493]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}