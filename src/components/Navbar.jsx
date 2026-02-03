import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Gift } from 'lucide-react';
import ExternalLinkIcon from '../utils/ExternalLinkIcon';
import { trackAppNavigation } from '../utils/analyticsTracking';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const NavLinks = ({ mobile = false, onClick }) => (
    <>
      <Link 
        to="/routes" 
        onClick={onClick}
        className={`hover:text-pink-500 transition-colors font-medium ${mobile ? 'text-lg py-2' : 'text-sm'} ${isActive('/routes') ? 'text-white' : 'text-gray-300'}`}
      >
        Browse Routes
      </Link>
      
      <Link 
        to="/free" 
        onClick={onClick}
        className={`hover:text-pink-400 transition-colors font-medium flex items-center gap-2 ${mobile ? 'text-lg py-2' : 'text-sm'} ${isActive('/free') ? 'text-[#FF1493]' : 'text-[#FF1493]'}`}
      >
        <span className="text-lg">🎁</span> Free Samples
      </Link>
      
      <a 
        href="/#faq" 
        onClick={onClick}
        className={`hover:text-pink-500 transition-colors font-medium ${mobile ? 'text-lg py-2' : 'text-sm'} text-gray-300`}
      >
        FAQ
      </a>
      
      <a 
        href="https://heart.cityheart.run" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={() => {
          trackAppNavigation();
          onClick && onClick();
        }}
        className={`flex items-center justify-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold transition-colors shadow-md hover:shadow-lg ${mobile ? 'w-full py-3 mt-4 text-lg' : 'px-5 py-2.5 text-sm'}`}
      >
        Generate Route <ExternalLinkIcon className="w-3.5 h-3.5" />
      </a>
    </>
  );

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-4 md:py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl group z-50 relative">
          <Heart className="w-8 h-8 text-pink-500 fill-current group-hover:scale-110 transition-transform" />
          <span className="text-white">cityheart.run</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-[#0A1628]/95 backdrop-blur-xl z-40 transition-transform duration-300 md:hidden flex flex-col items-center justify-center p-8 space-y-6 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <NavLinks mobile onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
}