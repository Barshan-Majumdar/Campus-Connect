import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

import GridBackground from './components/layout/GridBackground';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ClubsPage from './pages/ClubsPage';

// Page transition wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!wrapperRef.current) return;
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <GridBackground />
      <Navbar />
      <PageWrapper key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
        </Routes>
      </PageWrapper>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
