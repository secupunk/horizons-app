import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Send, Loader2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';

export default function RequestCityForm({ onClose, isOpen }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Logic to submit form
    setTimeout(() => {
        setLoading(false);
        toast({
          title: "Request Sent! 🚀",
          description: "Thanks! We've added this city to our wishlist.",
          className: "bg-green-600 text-white border-none",
        });
        if (onClose) onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="relative w-full max-w-md bg-[#1a1625] rounded-2xl border border-white/10 p-6 shadow-2xl z-10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500"><MapPin size={24} /></div>
            <h3 className="text-xl font-bold text-white">Request A City</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">City Name</label>
              <input required type="text" placeholder="e.g. Kyoto" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Country</label>
              <input required type="text" placeholder="e.g. Japan" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Your Email</label>
              <input required type="email" placeholder="To notify you when it's ready" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 outline-none" />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                type="button" 
                onClick={onClose}
                className="w-1/3 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="w-2/3 btn-primary bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} 
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}