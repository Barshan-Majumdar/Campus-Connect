import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Dashboard from './components/Dashboard';
import TransactionModal from './components/TransactionModal';
import Sidebar from './components/Sidebar';


function App() {
  const [selectedItem, setSelectedItem] = useState<{title: string} | null>(null);

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
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-indigo-50/50 relative font-sans selection:bg-brand-accent selection:text-white flex overflow-hidden">
      {/* Outer Shell Mesh Gradient (mixes top and sidebar) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-400/30 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[0%] -right-[10%] w-[50%] h-[60%] bg-fuchsia-400/20 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] bg-sky-400/30 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen min-w-0 pt-3 z-10 relative">
        
        <div className="flex-1 relative overflow-hidden bg-white rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.06)] border border-white/60 mr-3">
          {/* Absolute strict SaaS Grid Background */}
          <div className="absolute inset-0 bg-grid z-0 pointer-events-none" />

          {/* Ambient static background aura spots */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob z-0 pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 z-0 pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-emerald-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 z-0 pointer-events-none" />

          {/* Refreshing aura spots tracking mouse */}
          <motion.div 
            style={{ x: springX1, y: springY1 }}
            className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[200px] -mt-[200px]" 
          />
          <motion.div 
            style={{ x: springX2, y: springY2 }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[250px] -mt-[250px]" 
          />
          <motion.div 
            style={{ x: springX3, y: springY3 }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[300px] -mt-[300px]" 
          />
          
          <main className="relative z-10 w-full h-full overflow-y-auto">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
                    Marketplace
                  </h1>
                </div>
                <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
              className="bg-transparent border-2 border-indigo-950 text-indigo-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-950 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(49,46,129,0.3)]"
            >
              New Listing
            </motion.button>
          </div>
          
          <Dashboard onItemClick={(item) => setSelectedItem(item)} />
            </div>
          </main>
        </div>
      </div>

      <TransactionModal 
        isOpen={selectedItem !== null} 
        onClose={() => setSelectedItem(null)} 
        itemTitle={selectedItem?.title || ''} 
      />
    </div>
  );
}

export default App;
