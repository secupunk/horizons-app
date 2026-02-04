import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; 
import { ModalProvider } from './context/ModalContext';
import LandingPage from './components/LandingPage';
import RoutesPage from './components/pages/RoutesPage';
import RouteDetailPage from './components/pages/RouteDetailPage';
import ComparePage from './components/pages/ComparePage';
import CompareDirectory from './components/pages/CompareDirectory'; // Importé ici
import FreeLandingPage from './components/pages/FreeLandingPage';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import RefundPolicy from './components/pages/RefundPolicy';
import Navbar from './components/Navbar';
import ValentineCountdown from './components/ValentineCountdown';
import { Toaster } from './components/ui/toaster';

const AnalyticsWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ModalProvider>
          <AnalyticsWrapper>
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <div className="pt-24 bg-[#0A0E27]">
                    <ValentineCountdown />
                  </div>
                  <LandingPage />
                </>
              } />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/routes/:slug" element={<RouteDetailPage />} />
              
              {/* NOUVELLES ROUTES SEO */}
              <Route path="/compare" element={<CompareDirectory />} />
              <Route path="/compare/:slug1-vs-:slug2" element={<ComparePage />} />
              
              <Route path="/free" element={<FreeLandingPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
            </Routes>
          </AnalyticsWrapper>
          <Toaster />
        </ModalProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
