import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import HeroImage from '../components/HeroImage';
import CallToAction from '../components/CallToAction';
import WelcomeMessage from '../components/WelcomeMessage';

// Import des icônes pour la section du bas (Image 2)
import { MapPin, Trophy, Star } from 'lucide-react';

const HomePage = () => {
    return (
        <div className='min-h-screen flex flex-col bg-[#0A0E27]'>
            <Helmet>
                <title>CityHeart.run | Run with your Heart</title>
            </Helmet>

            {/* SECTION HERO (IMAGE 1) */}
            <div
                className='min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative'
                style={{
                    background: `radial-gradient(100% 100% at 50% 100%, #FF9875 0%, #B452FF 15%, #673DE6 30%, #0A0E27 80%)`
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='flex flex-col items-center gap-4 w-full max-w-[1200px]' 
                >
                    {/* HeroImage DOIT contenir le titre et UN SEUL countdown */}
                    <HeroImage />
                    
                    <div className='flex flex-col gap-1 w-full text-center items-center'>
                        <CallToAction />
                        <WelcomeMessage />
                    </div>
                </motion.div>
            </div>

            {/* SECTION FEATURES (IMAGE 2) */}
            <section className="py-24 bg-[#0A0E27] border-t border-white/5">
                <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center text-white">
                    <div className="flex flex-col items-center">
                        <div className="bg-[#26162C] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/20">
                            <MapPin className="text-pink-500" size={32} />
                        </div>
                        <h3 className="font-black italic uppercase text-xl mb-2">GLOBAL CITIES</h3>
                        <p className="text-slate-400">Routes professionally mapped in Paris, London, Tokyo, and more.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-[#161B3D] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                            <Trophy className="text-blue-500" size={32} />
                        </div>
                        <h3 className="font-black italic uppercase text-xl mb-2">GPX READY</h3>
                        <p className="text-slate-400">Instant download for your Garmin, Apple Watch, or Strava.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-[#29241A] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
                            <Star className="text-yellow-500" size={32} />
                        </div>
                        <h3 className="font-black italic uppercase text-xl mb-2">PERFECT SHAPES</h3>
                        <p className="text-slate-400">Every route is tested to ensure a perfect heart shape on your GPS.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;
