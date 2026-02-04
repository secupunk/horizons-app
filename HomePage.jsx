import { motion } from 'framer-motion';
import HeroImage from '../components/HeroImage';
import CallToAction from '../components/CallToAction';
import WelcomeMessage from '../components/WelcomeMessage';

// Import des icônes pour la partie basse de ton image
import { MapPin, Trophy, Star } from 'lucide-react';

const HomePage = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <div
                className='min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative'
                style={{
                    background: `radial-gradient(100% 100% at 50% 100%, var(--Gradients-Main-Color-4, #FF9875) 0%, var(--Gradients-Main-Color-3, #B452FF) 15%, var(--Gradients-Main-Color-2, #673DE6) 30%, var(--neutral--800, #1a1b1e) 80%)`
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='flex flex-col items-center gap-4 w-full max-w-[448px]' // Ta largeur d'origine
                >
                    <HeroImage />
                    <div className='flex flex-col gap-1 w-full text-center'>
                        <CallToAction />
                        <WelcomeMessage />
                    </div>
                </motion.div>
            </div>

            {/* SECTION DU BAS (Image 2) */}
            <section className="py-24 bg-[#0A0E27] border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center text-white">
                        <div>
                            <div className="bg-[#26162C] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-pink-500/20">
                                <MapPin className="text-pink-500" size={32} />
                            </div>
                            <h3 className="font-black italic uppercase mb-2">GLOBAL CITIES</h3>
                            <p className="text-slate-400 text-sm">Routes mapped in Paris, London, Tokyo, and more.</p>
                        </div>
                        <div>
                            <div className="bg-[#161B3D] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                                <Trophy className="text-blue-500" size={32} />
                            </div>
                            <h3 className="font-black italic uppercase mb-2">GPX READY</h3>
                            <p className="text-slate-400 text-sm">Download for Garmin, Apple Watch, or Strava.</p>
                        </div>
                        <div>
                            <div className="bg-[#29241A] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                                <Star className="text-yellow-500" size={32} />
                            </div>
                            <h3 className="font-black italic uppercase mb-2">PERFECT SHAPES</h3>
                            <p className="text-slate-400 text-sm">Tested to ensure a perfect heart shape.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;
