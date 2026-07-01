import { useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import ItemCard, { type TransactionState, type ItemCategory } from './ItemCard';

type TabType = 'My Stash' | 'My Wishlist';

interface Item {
  id: string;
  title: string;
  category: ItemCategory;
  state: TransactionState;
  owner: string;
}

const mockStash: Item[] = [
  { id: '1', title: 'Arduino Uno R3 Kit', category: 'Hardware', state: 'Temporary Borrow', owner: 'Alex M.' },
  { id: '2', title: 'Calculus Early Transcendentals', category: 'Academic', state: 'Permanent Swap', owner: 'Sarah J.' },
  { id: '3', title: 'Organic Chemistry Model Kit', category: 'Lab', state: 'Free Giveaway', owner: 'Dr. Smith' },
  { id: '4', title: 'Raspberry Pi 4 (4GB)', category: 'Hardware', state: 'Permanent Swap', owner: 'Tech Club' },
  { id: '5', title: 'Physics 101 Notes (A+)', category: 'Academic', state: 'Free Giveaway', owner: 'Elena V.' },
];

const mockWishlist: Item[] = [
  { id: '6', title: 'Digital Multimeter', category: 'Hardware', state: 'Temporary Borrow', owner: 'EE Dept' },
  { id: '7', title: 'Lab Coat (Size M)', category: 'Lab', state: 'Permanent Swap', owner: 'Chem Lab' },
];

interface DashboardProps {
  onItemClick: (item: Item) => void;
}

export default function Dashboard({ onItemClick }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('My Stash');

  const tabs: TabType[] = ['My Stash', 'My Wishlist'];
  const activeItems = activeTab === 'My Stash' ? mockStash : mockWishlist;

  const sliceSpring: Transition = { type: "spring", stiffness: 500, damping: 35, mass: 0.8 };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-10">
        <div className="bg-slate-200/60 p-1.5 flex rounded-full relative overflow-hidden shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-2.5 text-sm font-bold rounded-full transition-colors z-10 ${
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
            >
              <ItemCard 
                {...item} 
                onClick={() => onItemClick(item)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
