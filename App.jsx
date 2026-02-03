import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import LandingPage from './components/LandingPage';
import RoutesPage from './components/pages/RoutesPage';
import RouteDetailPage from './components/pages/RouteDetailPage';
import FreeLandingPage from './components/pages/FreeLandingPage';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';
import RefundPolicy from './components/pages/RefundPolicy';
import Navbar from './components/Navbar';
import ValentineCountdown from './components/ValentineCountdown';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';
import { trackPageView as trackGAPageView } from './utils/analytics';
import { trackPageView as trackPixelPageView } from './utils/pixelTracking';
import { Toaster } from './components/ui/toaster';

const AnalyticsWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    // GA Tracking
    trackGAPageView(location.pathname + location.search);
    // Meta Pixel Tracking
    trackPixelPageView();
    
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);
  return children;
};

function App() {
  useGoogleAnalytics();

  return (
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
            <Route path="/free" element={<FreeLandingPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Routes>
        </AnalyticsWrapper>
        <Toaster />
      </ModalProvider>
    </Router>
  );
}

export default App;