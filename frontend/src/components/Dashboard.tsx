import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import ItemCard from './ItemCard';
import SkeletonCard from './ui/SkeletonCard';
import type { Listing } from '../types';

export type TabType = 'My Stash' | 'My Wishlist';

interface DashboardProps {
  stashItems: Listing[];
  wishlistItems: Listing[];
  onItemClick: (item: Listing) => void;
}

const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

export default function Dashboard({ stashItems, wishlistItems, onItemClick }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('My Stash');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate skeleton loading on mount and tab change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const activeItems = activeTab === 'My Stash' ? stashItems : wishlistItems;
  const tabs: TabType[] = ['My Stash', 'My Wishlist'];

  return (
    <div className="w-full">
      {/* Tab selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/60 p-1.5 flex rounded-full relative overflow-hidden shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-2.5 text-sm font-bold rounded-full transition-colors z-10 cursor-pointer border-none ${
                activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-indigo-900'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="sliceTabIndicator"
                  className="absolute inset-0 bg-indigo-950 rounded-full shadow-[0_0_10px_rgba(49,46,129,0.2)]"
                  initial={false}
                  transition={sliceSpring}
                  style={{ zIndex: -1 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results Grid ───────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        ) : activeItems.length > 0 ? (
          <motion.div
            key={`grid-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
              >
                <ItemCard {...item} onClick={() => onItemClick(item)} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-inner"
          >
            <h3 className="text-lg font-extrabold text-brand-slate mb-1">No items listed</h3>
            <p className="text-xs font-semibold text-brand-muted max-w-xs">
              No items have been listed in this tab yet.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

