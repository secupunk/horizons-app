import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Mail } from 'lucide-react';

function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Can I really propose with this?',
      answer: "Yes! We've had dozens of runners propose using our routes. Imagine finishing your run, showing them the map trace that forms a perfect heart, and dropping to one knee. It's a story you'll tell forever."
    },
    {
      question: 'How do I share the heart with them?',
      answer: "Once you complete the route, it saves to your GPS history. You can share the map image from Strava, Nike Run Club, Garmin, or just take a screenshot of your route. Post it, print it, or frame it!"
    },
    {
      question: "What if I'm not a runner?",
      answer: "No problem! These routes are just GPS paths. You can walk them, bike them, or even drive them if the streets allow. The heart shape on the map will look just as beautiful regardless of your speed."
    },
    {
      question: "Do I need to be tech-savvy?",
      answer: "Not at all. When you purchase, you get a simple file and easy instructions. If you can open an email on your phone, you can use CityHeart."
    }
  ];

  return (
    <section 
      ref={ref} 
      id="faq" 
      className="py-24 bg-gradient-to-b from-[#1a1f3a] to-[#0A0E27]"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-playfair text-white"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-pink-500/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
                style={{ minHeight: '48px' }}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 
                  className="text-lg sm:text-xl font-semibold text-white font-poppins"
                >
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-pink-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <motion.div
                id={`faq-answer-${index}`}
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <p 
                    className="text-gray-300 text-lg leading-relaxed font-poppins"
                  >
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a href="mailto:contact@cityheart.run" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold transition-colors">
            <Mail className="w-4 h-4" aria-hidden="true" />
            Still have questions? Email us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;