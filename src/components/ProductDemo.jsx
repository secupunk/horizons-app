import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, RefreshCw, Play, MapPin, Download, QrCode, ArrowLeft } from 'lucide-react';
import ShareModal from './modals/ShareModal';
import QRCodeModal from './modals/QRCodeModal';

function ProductDemo({ onReset, city = "New York" }) {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Use real screenshot for the "generated" state
  const demoImage = "https://horizons-cdn.hostinger.com/1e1a9bb3-dbad-4da5-b7d7-a41e3c8e5f49/0e18cdb21c6a6d6d44fcbc19402c8593.png";

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsGenerated(false);
    if (onReset) onReset();
  };

  const handleDownloadGPX = () => {
    // ... (keep existing logic)
    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="CityHeart"><metadata><name>${city} Heart Run</name></metadata></gpx>`;
    const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `heart-route-${city.toLowerCase()}.gpx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <div className="w-full max-w-4xl mx-auto bg-[#0A0E27] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row h-auto md:h-[650px] relative">
      
      {/* Left Side - Map Visualization */}
      <div className="relative w-full h-[500px] md:h-full bg-[#050505] overflow-hidden group">
        
        {/* Background Logic: Either clean map or generated route */}
        <div className="absolute inset-0 transition-opacity duration-1000">
           {isGenerated ? (
             <img 
               src={demoImage} 
               alt="Generated Route" 
               className="w-full h-full object-cover"
             />
           ) : (
             <>
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
                  alt="Dark map background" 
                  className="w-full h-full object-cover grayscale contrast-125 brightness-50"
                />
                <div className="absolute inset-0 bg-[#0A0E27]/40"></div>
             </>
           )}
        </div>

        {/* Branding Overlay */}
        <div className="absolute top-8 left-0 right-0 flex flex-col items-center z-20 pointer-events-none">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 mb-1"
          >
            <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex flex-col items-start bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span className="text-pink-500 font-bold tracking-wide text-sm leading-none">cityheart.run</span>
            </div>
          </motion.div>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {isGenerating && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/60 backdrop-blur-sm">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mb-4"
                />
                <motion.p className="text-pink-400 font-bold tracking-widest uppercase text-sm">Tracing Route...</motion.p>
             </div>
          )}

          {!isGenerated && !isGenerating && (
            <div className="absolute top-[45%] left-0 right-0 flex items-center justify-center z-10 pointer-events-none transform -translate-y-1/2">
              <motion.h3 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-black text-white/90 text-center font-display uppercase drop-shadow-xl"
              >
                Ready To<br /><span className="text-pink-500">Run?</span>
              </motion.h3>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Card Interface */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
          <motion.div 
            layout
            className="bg-[#1a1625]/95 backdrop-blur-xl rounded-[2rem] p-5 border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-900/30">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-playfair leading-tight">Heart</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{city}, USA</span>
                  </div>
                </div>
              </div>
              
              {isGenerated && (
                <div className="px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 text-xs font-bold flex items-center gap-1">
                  <Play className="w-3 h-3 fill-current" /> Ready
                </div>
              )}
            </div>

            {/* Stats - Only show if generated */}
            {isGenerated && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-3 gap-4 mb-6"
              >
                <div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-pink-500 text-xl font-bold font-mono">6.6</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase">KM</p>
                </div>
                 <div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-pink-500 text-xl font-bold font-mono">49</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase">Min</p>
                </div>
                 <div className="text-center p-2 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-pink-500 text-xl font-bold font-mono">142</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase">BPM</p>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            {!isGenerated ? (
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70"
              >
                {isGenerating ? "Calculating..." : "Generate Route"}
              </button>
            ) : (
              <div className="space-y-3">
                 <div className="grid grid-cols-2 gap-3">
                   <button 
                    onClick={handleDownloadGPX}
                    className="py-3 rounded-xl bg-pink-500 text-white font-bold shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 hover:bg-pink-400 transition-colors"
                   >
                     <Download className="w-4 h-4" /> GPX
                   </button>
                   <button 
                    onClick={() => setShowQRModal(true)}
                    className="py-3 rounded-xl bg-white/10 text-white font-bold border border-white/10 flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                   >
                     <QrCode className="w-4 h-4" /> QR Code
                   </button>
                 </div>
                 
                 <div className="flex justify-between items-center gap-3">
                    <button 
                      onClick={() => setShowShareModal(true)}
                      className="flex-1 py-3 rounded-xl border border-pink-500/30 text-pink-400 text-sm font-bold hover:bg-pink-500/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                    <button 
                      onClick={handleReset}
                      className="w-12 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Desktop Info Panel */}
      <div className="hidden md:flex w-2/5 bg-[#12162e] border-l border-white/5 p-8 flex-col justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12162e] to-[#0A0E27]"></div>
        <div className="relative z-10 space-y-8">
           <div>
             <h3 className="text-3xl font-bold text-white font-playfair mb-3">{city} Heart Run</h3>
             <p className="text-gray-400 text-sm leading-relaxed">
               {isGenerated 
                ? "This 6.6km route takes you through the most scenic parts of downtown. It's flat, fast, and forms a perfect heart shape visible from space." 
                : "Experience the city like never before. Our algorithm finds the perfect heart-shaped loop in your chosen city, optimizing for runnability and scenic views."}
             </p>
           </div>

           <div className="space-y-4">
             <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10 cursor-default">
               <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                 <Play className="w-5 h-5 text-pink-500 fill-pink-500 ml-1" />
               </div>
               <div>
                 <p className="text-white font-bold">Turn-by-Turn</p>
                 <p className="text-xs text-gray-400">Audio cues at every turn</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10 cursor-default">
               <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                 <Share2 className="w-5 h-5 text-cyan-400" />
               </div>
               <div>
                 <p className="text-white font-bold">Social Ready</p>
                 <p className="text-xs text-gray-400">Perfect for Strava & Insta</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>

    {/* Modals */}
    <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    <QRCodeModal isOpen={showQRModal} onClose={() => setShowQRModal(false)} />
    </>
  );
}

export default ProductDemo;