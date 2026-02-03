import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCcw, Mail, FileText } from 'lucide-react';
import Footer from '../Footer';

export default function RefundPolicy() {
  const sections = [
    {
      title: "Overview",
      icon: <ShieldCheck className="w-6 h-6 text-pink-500" />,
      content: (
        <p>
          At CityHeart, we want you to love your route as much as you love your run. 
          That's why we offer a <strong>7-Day "No Questions Asked" Money-Back Guarantee</strong>. 
          If the route doesn't work for you, the shape isn't what you expected, or you simply change your mind, 
          we'll refund your purchase in full.
        </p>
      )
    },
    {
      title: "Eligibility",
      icon: <FileText className="w-6 h-6 text-cyan-400" />,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>The refund request must be made within 7 days of the original purchase date.</li>
          <li>We accept refund requests for any reason, including technical incompatibility or dissatisfaction with the route design.</li>
          <li>Purchases made through bundles (e.g., Lover Pack, Explorer Pack) are eligible for a partial refund prorated based on the items used, or a full refund if none of the routes have been satisfactory.</li>
        </ul>
      )
    },
    {
      title: "Process",
      icon: <RefreshCcw className="w-6 h-6 text-purple-400" />,
      content: (
        <div className="space-y-4">
          <p>To initiate a refund, simply follow these steps:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Email our support team at <a href="mailto:hello@cityheart.run" className="text-pink-400 hover:underline">hello@cityheart.run</a>.</li>
            <li>Include your Order ID (found in your confirmation email) or the email address used for purchase.</li>
            <li>Ideally, tell us briefly why you're requesting a refund (optional, but helps us improve!).</li>
          </ol>
          <p>
            Once approved, your refund will be processed immediately. Depending on your bank or credit card provider, 
            it may take <strong>5-10 business days</strong> for the funds to appear on your statement.
          </p>
        </div>
      )
    },
    {
      title: "Contact Us",
      icon: <Mail className="w-6 h-6 text-yellow-400" />,
      content: (
        <p>
          If you have any questions about our Refund Policy, please contact us at:
          <br />
          <a href="mailto:hello@cityheart.run" className="text-pink-400 hover:underline font-bold mt-2 inline-block">hello@cityheart.run</a>
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white">
      <Helmet>
        <title>Refund Policy | CityHeart</title>
        <meta name="description" content="CityHeart's 7-Day Money-Back Guarantee. We offer full refunds if you are not satisfied with your GPS art route." />
      </Helmet>

      <div className="pt-32 pb-20 px-4 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">Refund Policy</h1>
          <p className="text-xl text-gray-400">Your satisfaction is guaranteed.</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold font-display">{section.title}</h2>
              </div>
              <div className="text-gray-300 leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          Last updated: January 13, 2026
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}