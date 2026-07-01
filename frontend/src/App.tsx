import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Dashboard from './components/Dashboard';
import SearchView from './components/SearchView';
import Sidebar from './components/Sidebar';
import NewListingModal from './components/NewListingModal';
import ItemDetailModal from './components/ItemDetailModal';
import MobileNav from './components/MobileNav';
import type { Listing, Request, AppNotification } from './types';

// ─── Seed Data ────────────────────────────────────────────────────────────────

const initialStash: Listing[] = [
  {
    id: '1',
    title: 'Arduino Uno R3 Kit',
    category: 'Hardware',
    transactionType: 'Temporary Borrow',
    owner: 'Alex M.',
    description: 'Complete Arduino Uno R3 starter kit with breadboard, jumper wires, resistors, LEDs, and USB cable. Perfect for electronics projects.',
    condition: 'Good',
    image: '',
    status: 'available',
  },
  {
    id: '2',
    title: 'Calculus Early Transcendentals',
    category: 'Academic',
    transactionType: 'Permanent Swap',
    owner: 'Sarah J.',
    description: '8th Edition by James Stewart. Covers single-variable and multivariable calculus. Minor highlighting in chapters 3–5.',
    condition: 'Good',
    image: '',
    status: 'available',
  },
  {
    id: '3',
    title: 'Chemistry Textbook',
    category: 'Academic',
    transactionType: 'Free Giveaway',
    owner: 'Dr. Smith',
    description: 'Organic Chemistry by Clayden et al. 2nd Edition. Excellent condition, used for one semester only.',
    condition: 'Like New',
    image: '',
    status: 'available',
  },
  {
    id: '4',
    title: 'Raspberry Pi 4 (4GB)',
    category: 'Hardware',
    transactionType: 'Permanent Swap',
    owner: 'Tech Club',
    description: 'Raspberry Pi 4 Model B with 4GB RAM. Includes official power supply and 32GB micro SD card pre-loaded with Raspberry Pi OS.',
    condition: 'Like New',
    image: '',
    status: 'available',
  },
  {
    id: '5',
    title: 'Physics 101 Notes (A+ Grade)',
    category: 'Academic',
    transactionType: 'Free Giveaway',
    owner: 'Elena V.',
    description: 'Comprehensive handwritten notes for Physics 101 covering kinematics, dynamics, thermodynamics, and waves. Got an A+ with these!',
    condition: 'Good',
    image: '',
    status: 'available',
  },
  {
    id: '6',
    title: 'Oscilloscope (Digital 100MHz)',
    category: 'Hardware',
    transactionType: 'Temporary Borrow',
    owner: 'EE Society',
    description: 'Rigol DS1054Z 4-channel digital oscilloscope. Available for 2-week loan periods. Please return in same condition.',
    condition: 'Good',
    image: '',
    status: 'available',
  },
];

const initialWishlist: Listing[] = [
  {
    id: '7',
    title: 'Digital Multimeter',
    category: 'Hardware',
    transactionType: 'Temporary Borrow',
    owner: 'EE Dept',
    description: 'Looking for a reliable digital multimeter for circuit debugging — any brand works.',
    condition: 'Fair',
    image: '',
    status: 'available',
  },
  {
    id: '8',
    title: 'Lab Coat (Size M)',
    category: 'Lab',
    transactionType: 'Permanent Swap',
    owner: 'Chem Lab',
    description: 'Need a size M lab coat in good condition. Can swap with my size L coat.',
    condition: 'Good',
    image: '',
    status: 'available',
  },
];

const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Welcome to CampusConnect! 🎉',
    body: 'Start browsing items, make requests, and connect with your campus community.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'n2',
    title: 'New item in your area',
    body: 'A Raspberry Pi 4 was just listed — check it out before someone else requests it!',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

// ─── Path ↔ Tab helpers ────────────────────────────────────────────────────

const getTabFromPath = (path: string) => {
  switch (path) {
    case '/search': return 'Search';
    case '/projects': return 'Projects';
    case '/assets': return 'Assets';
    case '/team': return 'Team';
    case '/home':
    case '/':
    default: return 'Home';
  }
};

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [stashItems, setStashItems] = useState<Listing[]>(initialStash);
  const [wishlistItems, setWishlistItems] = useState<Listing[]>(initialWishlist);
  const [requests, setRequests] = useState<Request[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState(() => getTabFromPath(window.location.pathname));

  // ── URL navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    const handlePopState = () => setActiveSidebarTab(getTabFromPath(window.location.pathname));
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

  // ── Add listing (from NewListingModal) ──────────────────────────────────
  const handleAddListing = (newListing: {
    title: string;
    category: import('./types').Category;
    state: import('./types').TransactionType;
    owner: string;
    targetTab: 'My Stash' | 'My Wishlist';
  }) => {
    const item: Listing = {
      id: Date.now().toString(),
      title: newListing.title,
      category: newListing.category,
      transactionType: newListing.state,
      owner: newListing.owner,
      description: '',
      condition: 'Good',
      image: '',
      status: 'available',
    };
    if (newListing.targetTab === 'My Stash') {
      setStashItems((prev) => [item, ...prev]);
    } else {
      setWishlistItems((prev) => [item, ...prev]);
    }
  };

  // ── Handle request submission ────────────────────────────────────────────
  const handleRequest = useCallback(
    (
      req: Omit<Request, 'id' | 'createdAt'>,
      notif: Omit<AppNotification, 'id' | 'createdAt'>
    ) => {
      const now = new Date().toISOString();

      // Save request
      const newRequest: Request = { ...req, id: `req-${Date.now()}`, createdAt: now };
      setRequests((prev) => [newRequest, ...prev]);

      // Mark listing as requested (search both arrays)
      const updateStatus = (items: Listing[]) =>
        items.map((it) => it.id === req.listingId ? { ...it, status: 'requested' as const } : it);
      setStashItems(updateStatus);
      setWishlistItems(updateStatus);

      // Add notification
      const newNotif: AppNotification = { ...notif, id: `notif-${Date.now()}`, createdAt: now };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const handleMarkAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // ── Mouse-tracking aura ──────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX1 = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.5 });
  const springY1 = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.5 });
  const springX2 = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 1.2 });
  const springY2 = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 1.2 });
  const springX3 = useSpring(mouseX, { damping: 60, stiffness: 80, mass: 2.0 });
  const springY3 = useSpring(mouseY, { damping: 60, stiffness: 80, mass: 2.0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-indigo-50/50 relative font-sans selection:bg-brand-accent selection:text-white flex overflow-hidden">
      {/* Outer mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-400/30 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[0%] -right-[10%] w-[50%] h-[60%] bg-fuchsia-400/20 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[0%] left-[20%] w-[60%] h-[50%] bg-sky-400/30 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      {/* Sidebar (desktop only) */}
      <Sidebar
        activeTab={activeSidebarTab}
        onNavigate={handleNavigate}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen min-w-0 pt-3 z-10 relative">
        <div className="flex-1 relative overflow-hidden bg-white rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.06)] border border-white/60 mr-3">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid z-0 pointer-events-none" />

          {/* Static aura blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob z-0 pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 z-0 pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-emerald-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 z-0 pointer-events-none" />

          {/* Mouse-tracking aura */}
          <motion.div style={{ x: springX1, y: springY1 }} className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[200px] -mt-[200px]" />
          <motion.div style={{ x: springX2, y: springY2 }} className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[250px] -mt-[250px]" />
          <motion.div style={{ x: springX3, y: springY3 }} className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-100/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0 pointer-events-none -ml-[300px] -mt-[300px]" />

          <main className="relative z-10 w-full h-full overflow-y-auto pb-20 lg:pb-0">
            {activeSidebarTab === 'Home' ? (
              <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
                      Marketplace
                    </h1>
                    <p className="text-xs font-semibold text-brand-muted mt-1">Browse, borrow, and swap items on campus.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                    onClick={() => setIsNewListingOpen(true)}
                    className="bg-transparent border-2 border-indigo-950 text-indigo-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-950 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(49,46,129,0.3)] cursor-pointer"
                  >
                    + New Listing
                  </motion.button>
                </div>

                <Dashboard
                  stashItems={stashItems}
                  wishlistItems={wishlistItems}
                  onItemClick={setSelectedListing}
                />
              </div>
            ) : activeSidebarTab === 'Search' ? (
              <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <SearchView
                  stashItems={stashItems}
                  wishlistItems={wishlistItems}
                  onItemClick={setSelectedListing}
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

      {/* Mobile bottom nav */}
      <MobileNav activeTab={activeSidebarTab} onNavigate={handleNavigate} />

      {/* Item Detail Modal */}
      <ItemDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onRequest={handleRequest}
      />

      {/* New Listing Modal */}
      <NewListingModal
        isOpen={isNewListingOpen}
        onClose={() => setIsNewListingOpen(false)}
        onAddListing={handleAddListing}
      />
    </div>
  );
}

export default App;
