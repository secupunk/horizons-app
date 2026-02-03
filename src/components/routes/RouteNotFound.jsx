import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Map, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function RouteNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E27] p-4 text-center">
      <Helmet>
        <title>404 - Route Not Found | CityHeart</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="max-w-lg w-full space-y-8 p-8 rounded-2xl bg-[#131b40] border border-white/5 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
            <Map className="w-12 h-12 text-gray-500" />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <h2 className="text-2xl font-bold text-pink-500">Route Not Found</h2>
        
        <p className="text-gray-300">
          The route you are looking for might have been removed, is currently private, or the link is incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/routes" className="w-full sm:w-auto">
            <Button className="w-full bg-[#FF1493] hover:bg-[#FF1493]/90 text-white font-bold h-12 rounded-xl">
              Browse Routes
            </Button>
          </Link>
          <Link to="/free" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold h-12 rounded-xl">
              Free Routes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}