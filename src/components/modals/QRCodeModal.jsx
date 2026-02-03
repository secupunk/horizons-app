import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, MapPin, Calendar } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeModal = ({ isOpen, onClose, routeName = "Sydney Heart Run", routeDate = "Oct 24, 2023", routeUrl = "https://cityheart.run/route/sydney-heart" }) => {
  
  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `cityheart-qr-${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-[#0A0E27] p-6 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20"></div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold font-playfair mb-1 relative z-10">{routeName}</h3>
            <div className="flex items-center justify-center gap-4 text-xs font-medium text-gray-400 relative z-10">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Sydney, AU</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {routeDate}</span>
            </div>
          </div>

          {/* QR Code Area */}
          <div className="p-8 flex flex-col items-center bg-white">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6">
              <QRCodeCanvas
                id="qr-code-canvas"
                value={routeUrl}
                size={200}
                level={"H"}
                includeMargin={true}
                fgColor="#0A0E27"
              />
            </div>
            
            <p className="text-gray-500 text-sm text-center mb-6 px-4">
              Scan this code with your phone camera to instantly load the route in your favorite map app.
            </p>

            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-xl bg-[#0A0E27] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#151b40] transition-colors shadow-xl shadow-blue-900/10"
            >
              <Download className="w-4 h-4" />
              Save Image
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QRCodeModal;