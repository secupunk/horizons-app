import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Bell } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

export default function WorldCupWaitlistForm() {
  const { isWaitlistOpen, closeWaitlist } = useModals();

  if (!isWaitlistOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={closeWaitlist}
        />
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="relative w-full max-w-lg bg-[#0f172a] rounded-2xl border border-blue-500/20 p-6 shadow-2xl z-10"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <button onClick={closeWaitlist} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Trophy /></div>
            <div>
              <h3 className="text-xl font-bold">World Cup 2026 Waitlist</h3>
              <p className="text-xs text-blue-400">Be the first to run the host cities</p>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); closeWaitlist(); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
              <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Interested Cities (Optional)</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none">
                <option>New York / New Jersey</option>
                <option>Los Angeles</option>
                <option>Mexico City</option>
                <option>Toronto</option>
                <option>All of them!</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Bell size={18} /> Join Waitlist
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}