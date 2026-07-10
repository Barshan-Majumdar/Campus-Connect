import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import TransactionsPage from './pages/TransactionsPage';
import TrustPage from './pages/TrustPage';
import MatchesPage from './pages/MatchesPage';
import GroupsPage from './pages/GroupsPage';


function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig1 = { damping: 40, stiffness: 150, mass: 0.5 };
  const springConfig2 = { damping: 50, stiffness: 100, mass: 1.2 };
  const springConfig3 = { damping: 60, stiffness: 80, mass: 2.0 };
  
  const springX1 = useSpring(mouseX, springConfig1);
  const springY1 = useSpring(mouseY, springConfig1);
  
  const springX2 = useSpring(mouseX, springConfig2);
  const springY2 = useSpring(mouseY, springConfig2);
  
  const springX3 = useSpring(mouseX, springConfig3);
  const springY3 = useSpring(mouseY, springConfig3);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Only track mouse movement on desktop to save performance on mobile
    if (window.innerWidth >= 1024) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <div className="h-[100dvh] w-full bg-indigo-50/50 relative font-sans selection:bg-brand-accent selection:text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Outer Shell Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-400/30 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[0%] -right-[10%] w-[50%] h-[60%] bg-fuchsia-400/20 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] bg-sky-400/30 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden shrink-0 flex items-center justify-between px-5 py-3 z-20 relative bg-indigo-50/40 backdrop-blur-xl border-b border-indigo-900/5 shadow-sm">
        <div className="text-[24px] font-normal tracking-normal text-indigo-950 drop-shadow-sm" style={{ fontFamily: 'Pacifico, cursive', lineHeight: '1.2' }}>
          Campus Connect
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-slate-200/50 text-slate-600 hover:bg-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0 pt-0 lg:pt-3 z-10 relative overflow-hidden">
        <div className="flex-1 relative overflow-hidden bg-white rounded-t-[32px] lg:rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.06)] border border-white/60 lg:mr-3 mt-1 lg:mt-0">
          {/* Absolute strict SaaS Grid Background */}
          <div className="absolute inset-0 bg-grid z-0 pointer-events-none" />

          {/* Ambient static background aura spots */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob z-0 pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 z-0 pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-emerald-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 z-0 pointer-events-none" />

          {/* Refreshing aura spots tracking mouse (hidden on mobile) */}
          <motion.div 
            style={{ x: springX1, y: springY1 }}
            className="hidden lg:block absolute top-0 left-0 w-[400px] h-[400px] bg-sky-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[200px] -mt-[200px]" 
          />
          <motion.div 
            style={{ x: springX2, y: springY2 }}
            className="hidden lg:block absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[250px] -mt-[250px]" 
          />
          <motion.div 
            style={{ x: springX3, y: springY3 }}
            className="hidden lg:block absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[300px] -mt-[300px]" 
          />
          
          <main className="relative z-10 w-full h-full overflow-y-auto">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-12 lg:pb-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/matches" element={<MatchesPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/trust" element={<TrustPage />} />
                <Route path="/groups" element={<GroupsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
