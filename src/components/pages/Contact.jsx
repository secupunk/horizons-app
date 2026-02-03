import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '../Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      // Basic validation simulation
      if (formData.email && formData.message) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0E27] text-gray-300">
      <Helmet>
        <title>Contact Us | CityHeart</title>
        <meta name="description" content="Get in touch with the CityHeart team for support, inquiries, or feedback." />
      </Helmet>

      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white font-playfair">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-poppins">
              Have questions about a route? Need help with your download? Or just want to share your experience? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20">
                <h3 className="text-xl font-bold text-white mb-4 font-playfair">Direct Contact</h3>
                <div className="flex items-center gap-3 text-pink-400 mb-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Email Us</span>
                </div>
                <a href="mailto:hello@cityheart.run" className="text-gray-300 hover:text-white transition-colors block break-all">
                  hello@cityheart.run
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20">
                <h3 className="text-xl font-bold text-white mb-4 font-playfair">Support Hours</h3>
                <p className="text-gray-400">
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM EST
                </p>
                <p className="text-gray-500 text-sm mt-4">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/10 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-black/20 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                    placeholder="Tell us more details..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    status === 'success' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-pink-500 to-red-500 hover:shadow-lg hover:shadow-pink-500/30'
                  }`}
                >
                  {status === 'submitting' ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm justify-center mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;