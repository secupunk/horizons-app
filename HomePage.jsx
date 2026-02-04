import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroImage from '../components/HeroImage';
import CallToAction from '../components/CallToAction';
import WelcomeMessage from '../components/WelcomeMessage';

// Import des icônes Lucide pour la section du bas (Image 2)
import { MapPin, Trophy, Star } from 'lucide-react';

const HomePage = () => {
    return (
        <div className='min-h-screen bg-[#0A0E27] selection:bg-pink-500/30'>
            <Helmet>
                <title>CityHeart.run | Run with your Heart</title>
                <meta name="description" content="Discover and download GPS-ready heart-shaped running routes." />
            </Helmet>

            {/* --- SECTION HERO (Image 1) --- */}
            <div
                className='min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative'
                style={{
                    background: `radial-gradient(100% 100% at 50% 100%, var(--Gradients-Main-Color-4, #FF9875) 0%, var(--Gradients-Main-Color-3, #B452FF) 15%, var(--Gradients-Main-Color-2, #673DE6) 30%, var(--neutral--800, #0A0E27) 80%)`
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='flex flex-col items-center gap-4 w-full max-w-[1200px]'
                >
                    {/* Cette partie gère le compte à rebours et le titre massif "RUN WITH YOUR HEART" */}
                    <HeroImage />
                    
                    <div className='flex flex-col gap-4 w-full text-center items-center'>
                        {/* Affiche les boutons BROWSE ROUTES et TRY FOR FREE */}
                        <CallToAction />
                        
                        {/* Affiche le texte descriptif sous les boutons */}
                        <WelcomeMessage />
                    </div>
                </motion.div>
            </div>

            {/* --- SECTION FEATURES (Image 2) --- */}
            <section className="py-24 bg-[#0A0E27] border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        
                        {/* Global Cities */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#26162C] p-5 rounded-2xl mb-6 border border-[#FF4D94]/20">
                                <MapPin className="text-[#FF4D94]" size={32} />
                            </div>
                            <h2 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">GLOBAL CITIES</h2>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                Routes professionally mapped in Paris, London, Tokyo, and more.
                            </p>
                        </div>

                        {/* GPX Ready */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#161B3D] p-5 rounded-2xl mb-6 border border-[#4D7CFF]/20">
                                <Trophy className="text-[#4D7CFF]" size={32} />
                            </div>
                            <h2 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">GPX READY</h2>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                Instant download for your Garmin, Apple Watch, or Strava.
                            </p>
                        </div>

                        {/* Perfect Shapes */}
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#29241A] p-5 rounded-2xl mb-6 border border-[#FFB84D]/20">
                                <Star className="text-[#FFB84D]" size={32} />
                            </div>
                            <h2 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">PERFECT SHAPES</h2>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                Every route is tested to ensure a perfect heart shape on your GPS.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
