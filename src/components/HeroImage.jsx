import React from 'react';
import ValentineCountdown from './ValentineCountdown';

const HeroImage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* On appelle le compteur ICI et UNIQUEMENT ici */}
      <ValentineCountdown />

      {/* Ton titre stylé de la capture d'écran */}
      <h1 className="text-6xl md:text-[110px] font-black italic uppercase tracking-tighter leading-[0.85] mt-12 text-center text-white">
        RUN WITH YOUR <span className="text-[#E94E91]">HEART</span>
      </h1>
    </div>
  );
};

export default HeroImage;
