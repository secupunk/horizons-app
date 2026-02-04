import React from 'react';
import ValentineCountdown from './ValentineCountdown';

const HeroImage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* 1. Le Compte à rebours */}
      <ValentineCountdown />

      {/* 2. Le Titre Massif en Italique */}
      <h1 className="text-5xl md:text-[110px] font-[900] italic uppercase tracking-tighter leading-[0.9] mt-12 mb-4 text-center">
        RUN WITH YOUR <span className="text-[#FF4D94]">HEART</span>
      </h1>
    </div>
  );
};

export default HeroImage;
