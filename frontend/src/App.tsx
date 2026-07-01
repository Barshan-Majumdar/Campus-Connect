import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Dashboard, { type Item } from './components/Dashboard';
import TransactionModal from './components/TransactionModal';
import Sidebar from './components/Sidebar';
import NewListingModal from './components/NewListingModal';
import SearchView from './components/SearchView';

const initialStash: Item[] = [
  { id: '1', title: 'Arduino Uno R3 Kit', category: 'Hardware', state: 'Temporary Borrow', owner: 'Alex M.' },
  { id: '2', title: 'Calculus Early Transcendentals', category: 'Academic', state: 'Permanent Swap', owner: 'Sarah J.' },
  { id: '3', title: 'Organic Chemistry Model Kit', category: 'Lab', state: 'Free Giveaway', owner: 'Dr. Smith' },
  { id: '4', title: 'Raspberry Pi 4 (4GB)', category: 'Hardware', state: 'Permanent Swap', owner: 'Tech Club' },
  { id: '5', title: 'Physics 101 Notes (A+)', category: 'Academic', state: 'Free Giveaway', owner: 'Elena V.' },
];

const initialWishlist: Item[] = [
  { id: '6', title: 'Digital Multimeter', category: 'Hardware', state: 'Temporary Borrow', owner: 'EE Dept' },
  { id: '7', title: 'Lab Coat (Size M)', category: 'Lab', state: 'Permanent Swap', owner: 'Chem Lab' },
];

const getTabFromPath = (path: string) => {
  switch (path) {
    case '/search':
      return 'Search';
    case '/projects':
      return 'Projects';
    case '/assets':
      return 'Assets';
    case '/team':
      return 'Team';
    case '/home':
    case '/':
    default:
      return 'Home';
  }
};

function App() {
  const [stashItems, setStashItems] = useState<Item[]>(initialStash);
  const [wishlistItems, setWishlistItems] = useState<Item[]>(initialWishlist);
  const [selectedItem, setSelectedItem] = useState<{title: string} | null>(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState(() => getTabFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setActiveSidebarTab(getTabFromPath(window.location.pathname));
    };
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.history.replaceState(null, '', '/home');
      setActiveSidebarTab('Home');
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState(null, '', path);
    setActiveSidebarTab(getTabFromPath(path));
  };

  const handleAddListing = (newListing: {
    title: string;
    category: any;
    state: any;
    owner: string;
    targetTab: 'My Stash' | 'My Wishlist';
  }) => {
    const item: Item = {
      id: Date.now().toString(),
      title: newListing.title,
      category: newListing.category,
      state: newListing.state,
      owner: newListing.owner,
    };

    if (newListing.targetTab === 'My Stash') {
      setStashItems((prev) => [item, ...prev]);
    } else {
      setWishlistItems((prev) => [item, ...prev]);
    }
  };

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

      <Sidebar activeTab={activeSidebarTab} onNavigate={handleNavigate} />
      
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
            {activeSidebarTab === 'Home' ? (
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
                    onClick={() => setIsNewListingOpen(true)}
                    className="bg-transparent border-2 border-indigo-950 text-indigo-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-950 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(49,46,129,0.3)] cursor-pointer"
                  >
                    New Listing
                  </motion.button>
                </div>
                
                <Dashboard 
                  stashItems={stashItems} 
                  wishlistItems={wishlistItems} 
                  onItemClick={(item) => setSelectedItem(item)} 
                />
              </div>
            ) : activeSidebarTab === 'Search' ? (
              <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <SearchView
                  stashItems={stashItems}
                  wishlistItems={wishlistItems}
                  onItemClick={(item) => setSelectedItem(item)}
                />
              </div>
            ) : (
              <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 h-full flex flex-col items-center justify-center min-h-[500px]">
                <div className="glass-panel p-10 max-w-md w-full text-center border border-white/60 bg-white/70 shadow-lg">
                  <h2 className="text-2xl font-black text-brand-slate tracking-tight mb-2">{activeSidebarTab} Catalog</h2>
                  <p className="text-xs font-semibold text-brand-muted mb-6">
                    This section of Campus Connect is currently loading. Connect with colleagues to collaborate on joint projects, list digital assets, and review project team members.
                  </p>
                  <button 
                    onClick={() => handleNavigate('/home')}
                    className="px-5 py-2.5 bg-indigo-950 text-white rounded-full text-xs font-bold hover:bg-indigo-900 transition-colors shadow-sm cursor-pointer border-none"
                  >
                    Return to Marketplace
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <TransactionModal 
        isOpen={selectedItem !== null} 
        onClose={() => setSelectedItem(null)} 
        itemTitle={selectedItem?.title || ''} 
      />

      <NewListingModal 
        isOpen={isNewListingOpen} 
        onClose={() => setIsNewListingOpen(false)} 
        onAddListing={handleAddListing} 
      />
    </div>
  );
}

export default App;
