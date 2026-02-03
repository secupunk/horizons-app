import React from 'react';
import { useModals } from '../../context/ModalContext';

export default function WorldCup2026Section() {
  const { openWaitlist } = useModals();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1691658729764-69c53be7de02?auto=format&fit=crop&q=80" 
          alt="Stadium" 
          className="w-full h-full object-cover grayscale contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-[#0A0E27]"></div>
      </div>

      <div className="container-tight relative z-10 text-center">
        <div className="inline-block px-4 py-2 bg-blue-600 rounded-full text-white font-bold text-sm tracking-widest mb-6 shadow-lg shadow-blue-500/50">
          COMING JUNE 2026
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic">
          Run The World Cup
        </h2>
        
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
          Exclusive heart-shaped routes connecting stadiums and landmarks in all 16 host cities across USA, Canada, and Mexico.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold text-gray-300 mb-12 opacity-80">
          <div>New York/NJ</div>
          <div>Los Angeles</div>
          <div>Mexico City</div>
          <div>Toronto</div>
          <div>Miami</div>
          <div>Dallas</div>
          <div>Vancouver</div>
          <div>Atlanta</div>
          <div className="col-span-2 md:col-span-4 text-xs font-normal text-gray-400 mt-2">+ 8 More Host Cities</div>
        </div>

        <button 
          onClick={openWaitlist}
          className="px-10 py-5 bg-white text-blue-900 font-black text-lg rounded-xl hover:bg-gray-100 transition-colors shadow-2xl"
        >
          Join World Cup Waitlist
        </button>
      </div>
    </section>
  );
}