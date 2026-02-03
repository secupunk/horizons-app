import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: "Is this only for Valentine's Day?", a: "Not at all! While it's our most popular time, runners use our routes year-round for anniversaries, birthdays, proposals, travel memories, or simply to add some fun to their training." },
  { q: "Do I have to run? Can I walk?", a: "Absolutely! Most of our hearts are between 5-10km, which is a lovely 1-2 hour walk. It makes for a fantastic active date or city exploration tour." },
  { q: "How do QR codes work?", a: "QR codes let you start running immediately from your phone without syncing to GPS device. Simply scan the QR code → Open route in Strava/Apple Maps → Start running. Perfect for quick starts on mobile." },
  { q: "Can I use this for group challenges?", a: "Yes! Running clubs often use our routes for themed events. If you're organizing a large public event, check out our Explorer Pack or contact us for support." },
  { q: "Which cities do you cover?", a: <span>We currently have verified heart routes in over 60 major cities. If your city isn't listed, you can <Link to="/routes" className="text-pink-400 hover:underline">browse all cities</Link> or request it!</span> },
  { q: "What about cycling?", a: "Most routes follow runnable streets and paths. While many are bike-friendly, some might include pedestrian-only zones, stairs, or park paths. We recommend checking the route on your map app first if you plan to cycle." },
  { q: "What exactly do I get?", a: "You receive a standard GPX file that contains GPS data for a heart-shaped route in your chosen city. This file works with almost all fitness apps and devices." },
  { q: "Does it work with my device?", a: <span>Yes. GPX is the universal standard. Compatible with Garmin, Apple Watch (via WorkOutDoors), Strava, Coros, Suunto. <Link to="/routes" className="text-pink-400 hover:underline">Check compatible routes</Link>.</span> },
  { q: "Are the routes safe to run?", a: "We design routes primarily on runnable streets and paths. However, cities change. Always prioritize your safety, obey traffic laws, and be aware of your surroundings. You are responsible for your own safety." },
  { q: "Where to find the best 5km routes?", a: <span>We have curated 5km heart-shaped routes in major European capitals. Check out our <Link to="/free" className="text-pink-400 hover:underline">Free Routes</Link> or <Link to="/routes" className="text-pink-400 hover:underline">Full Library</Link> to explore more.</span> },
  { q: "Can I get a refund?", a: "Yes. If the technical file doesn't work for you or you're unhappy with the shape, we offer a 30-day money-back guarantee." },
  { q: "Do you have a route for my small town?", a: "Currently, we focus on major metropolitan areas where grid systems allow for clean shapes. You can request your city using the form in the footer." },
  { q: "Is this a subscription?", a: "No. You pay once and own the route file forever." },
  { q: "When will the World Cup routes be ready?", a: "We are finalizing the 2026 collection now. World Cup host cities are included in all our route packages." },
  { q: "How do I upload a GPX file to Garmin?", a: <span>The easiest way is using Garmin Connect. Go to 'Training' {'>'} 'Courses' {'>'} 'Import'. <Link to="/routes" className="text-pink-400 hover:underline">Find a route first</Link>.</span> },
  { q: "Can I use these routes on Apple Watch?", a: <span>Yes! Use apps like WorkOutDoors or import to Strava. <Link to="/routes" className="text-pink-400 hover:underline">Get a route now</Link>.</span> },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-[#0A0E27]" id="faq">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-pink-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about tracing your heart.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i} 
              className="border border-white/10 rounded-xl bg-white/5 overflow-hidden transition-colors hover:border-pink-500/30"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:bg-white/5 transition-colors"
              >
                {faq.q}
                <ChevronDown className={`text-pink-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-gray-300 text-sm leading-relaxed border-t border-white/5 mt-2">
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