import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, Heart, ChevronRight, Swords } from 'lucide-react';
import { useModals } from '../context/ModalContext';
import ExternalLinkIcon from '../utils/ExternalLinkIcon';
import { trackAppNavigation } from '../utils/analyticsTracking';

export default function Footer() {
  const { openCityRequest } = useModals();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05081c] pt-20 pb-10 border-t border-white/5 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: RESOURCES */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">RESOURCES <ChevronRight className="w-4 h-4 text-pink-500" /></h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/free" className="hover:text-[#FF1493] transition-colors">Free Running Routes</Link></li>
              <li><Link to="/routes" className="hover:text-[#FF1493] transition-colors">Browse All Routes</Link></li>
              <li><a href="/#how-it-works" className="hover:text-[#FF1493] transition-colors">How It Works</a></li>
              <li><a href="/#faq" className="hover:text-[#FF1493] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 2: POPULAR CITIES */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">POPULAR CITIES <ChevronRight className="w-4 h-4 text-pink-500" /></h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/routes/running-heart-berlin" className="hover:text-[#FF1493] transition-colors font-medium">Berlin</Link></li>
              <li><Link to="/routes/running-heart-paris" className="hover:text-[#FF1493] transition-colors font-medium">Paris</Link></li>
              <li><Link to="/routes/running-heart-london" className="hover:text-[#FF1493] transition-colors font-medium">London</Link></li>
              <li><Link to="/routes/running-heart-new-york" className="hover:text-[#FF1493] transition-colors font-medium">New York</Link></li>
            </ul>
          </div>

          {/* Column 3: WORLD BATTLES (SEO GATEWAY) */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">World Battles <Swords className="w-4 h-4 text-blue-500" /></h3>
            <ul className="space-y-3 text-sm text-slate-400 italic">
              <li><Link to="/compare/running-heart-paris-vs-running-heart-london" className="hover:text-white transition-colors">Paris vs London</Link></li>
              <li><Link to="/compare/running-heart-berlin-vs-running-heart-tokyo" className="hover:text-white transition-colors">Berlin vs Tokyo</Link></li>
              <li><Link to="/compare/running-heart-amsterdam-vs-running-heart-rotterdam" className="hover:text-white transition-colors">Amsterdam vs Rotterdam</Link></li>
              <li><Link to="/compare/running-heart-barcelona-vs-running-heart-madrid" className="hover:text-white transition-colors">Barcelona vs Madrid</Link></li>
              
              {/* LIEN CRUCIAL POUR LE SEO : Le Hub qui contient tous les autres duels */}
              <li className="pt-4 non-italic">
                <Link to="/compare" className="text-pink-500 hover:text-pink-400 font-bold flex items-center gap-1 group">
                  View All Battles 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: BRAND & LEGAL */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-6 group">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">❤️</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 italic">cityheart.run</span>
            </Link>
            <p className="text-gray-400 text-xs mb-8 leading-relaxed max-w-xs uppercase tracking-widest">
              Trace hearts. Share love. Run the world.
            </p>
            
            <div className="flex gap-4 mb-6">
               <Link to="/privacy" className="text-[10px] text-slate-600 hover:text-white uppercase tracking-tighter">Privacy</Link>
               <Link to="/terms" className="text-[10px] text-slate-600 hover:text-white uppercase tracking-tighter">Terms</Link>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-pink-500 transition-all border border-white/5"><Instagram size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all border border-white/5"><Twitter size={14} /></a>
              <a href="mailto:hello@cityheart.run" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all border border-white/5"><Mail size={14} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[11px] uppercase tracking-widest">
          <p>© {currentYear} CityHeart. World Edition.</p>
          <p className="flex items-center gap-1">Made for <Heart className="w-3 h-3 text-red-500 fill-current" /> runners by runners.</p>
        </div>
      </div>
    </footer>
  );
}
