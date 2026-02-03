import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { addToWaitlist } from '../../services/waitlistService';
import { useToast } from '../ui/use-toast';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    const result = await addToWaitlist(email);

    if (result.success) {
      setStatus('success');
      setMessage("You're in! We'll notify you when we launch.");
      setEmail('');
      toast({
        title: "Welcome to the club! 🏃",
        description: "You've been added to the early adopter waitlist.",
      });
    } else {
      setStatus('error');
      setMessage(result.error || "Something went wrong. Please try again.");
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: result.error || "Failed to join waitlist.",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Enter your email address"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-white/10 border border-white/10 rounded-xl py-4 pl-5 pr-14 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="absolute right-2">
            <AnimatePresence mode='wait'>
              {status === 'loading' ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Loader2 className="w-6 h-6 text-pink-500 animate-spin p-1" />
                </motion.div>
              ) : status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Check className="w-8 h-8 text-green-500 p-1" />
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="submit"
                  className="p-2 bg-pink-500 hover:bg-pink-400 rounded-lg text-white transition-colors shadow-lg shadow-pink-500/30"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              className={`mt-3 text-sm font-medium flex items-center gap-2 ${
                status === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {status === 'error' && <AlertCircle className="w-4 h-4" />}
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}