import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, Heart, ChevronRight } from 'lucide-react';
import { useModals } from '../context/ModalContext';
import ExternalLinkIcon from '../utils/ExternalLinkIcon';
import { trackAppNavigation } from '../utils/analyticsTracking';

export default function Footer() {
  const { openCityRequest } = useModals();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05081c] pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* RESOURCES Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display flex items-center gap-2">RESOURCES <ChevronRight className="w-4 h-4 text-pink-500" /></h3>
            <ul className="space-y-3 font-body text-sm text-slate-400">
              <li><Link to="/free" className="hover:text-[#FF1493] transition-colors">Free Running Routes</Link></li>
              <li><Link to="/routes" className="hover:text-[#FF1493] transition-colors">Browse All Routes</Link></li>
              <li><a href="/#how-it-works" className="hover:text-[#FF1493] transition-colors">How It Works</a></li>
              <li><a href="/#faq" className="hover:text-[#FF1493] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* POPULAR CITIES Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-display flex items-center gap-2">POPULAR CITIES <ChevronRight className="w-4 h-4 text-pink-500" /></h3>
            <ul className="space-y-3 font-body text-sm text-slate-400">
              <li><Link to="/routes/running-heart-berlin" className="hover:text-[#FF1493] transition-colors">Running in Berlin</Link></li>
              <li><Link to="/routes/running-heart-rotterdam" className="hover:text-[#FF1493] transition-colors">Running in Rotterdam</Link></li>
              <li><Link to="/routes/running-heart-paris" className="hover:text-[#FF1493] transition-colors">Running in Paris</Link></li>
              <li><Link to="/routes/running-heart-barcelona" className="hover:text-[#FF1493] transition-colors">Running in Barcelona</Link></li>
              <li><Link to="/routes/running-heart-rome" className="hover:text-[#FF1493] transition-colors">Running in Rome</Link></li>
            </ul>
          </div>

          {/* LEGAL & BRAND Column */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-6 font-display group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">❤️</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">cityheart.run</span>
            </Link>
            <p className="text-gray-400 text-sm mb-8 font-body leading-relaxed max-w-xs">
              Create unforgettable romantic gestures by tracing heart-shaped routes through your favorite cities.
            </p>
            
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 font-body text-sm text-slate-400 mb-6">
               <li><Link to="/privacy" className="hover:text-[#FF1493] transition-colors">Privacy Policy</Link></li>
               <li><Link to="/terms" className="hover:text-[#FF1493] transition-colors">Terms of Service</Link></li>
               <li><a href="mailto:hello@cityheart.run" className="hover:text-[#FF1493] transition-colors">Contact</a></li>
            </ul>

            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={16} /></a>
              <a href="mailto:hello@cityheart.run" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Mail size={16} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <p>© {currentYear} CityHeart. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" /> for runners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}