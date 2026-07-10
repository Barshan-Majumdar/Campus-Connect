import { useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import ItemDetailDrawer from '../components/ItemDetailDrawer';
import EmptyState from '../components/EmptyState';
import CreateListingModal from '../components/CreateListingModal';
import { useListings } from '../hooks/useListings';
import type { ListingItem, ItemCategory } from '../data/mockData';

const categories: (ItemCategory | 'All')[] = ['All', 'Hardware', 'Academic', 'Lab'];

const sortOptions = [
  { value: 'newest' as const, label: 'Newest' },
  { value: 'most_wanted' as const, label: 'Most Wanted' },
  { value: 'ending_soon' as const, label: 'Ending Soon' },
];

export default function MarketplacePage() {
  const { listings, activeCategory, sortField, search, filterByCategory, sort, addListing } = useListings();
  const [selectedItem, setSelectedItem] = useState<ListingItem | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    search(value);
  };

  const handleRequest = (itemId: string, _handoverPointId: string) => {
    // Will wire to transaction creation when backend exists
    setSelectedItem(null);
    console.log('Request submitted for', itemId);
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1
            className="text-3xl font-black text-brand-slate tracking-tight"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Marketplace
          </h1>
          <p className="text-sm text-brand-muted mt-1">Browse and request campus items</p>
        </div>
        <motion.button
          onClick={() => setIsCreateModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={sliceSpring}
          className="bg-transparent border-2 border-indigo-950 text-indigo-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-950 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(49,46,129,0.3)]"
        >
          New Listing
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search items, owners, categories..."
            className="w-full glass-panel px-4 py-2.5 pl-10 text-sm font-medium text-brand-slate placeholder:text-slate-400 rounded-full border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/40 transition-all"
          />
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Filters + Sort Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        {/* Category Chips */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-200/60 p-1 flex rounded-full relative overflow-hidden shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => filterByCategory(cat)}
                className={`relative px-5 py-1.5 text-xs font-bold rounded-full transition-colors z-10 ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'text-slate-500 hover:text-indigo-900'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="categoryTabIndicator"
                    className="absolute inset-0 bg-indigo-950 rounded-full shadow-[0_0_10px_rgba(49,46,129,0.2)]"
                    initial={false}
                    transition={sliceSpring}
                    style={{ zIndex: -1 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortField}
          onChange={(e) => sort(e.target.value as typeof sortField)}
          className="glass-panel px-3 py-1.5 text-xs font-bold text-brand-slate rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 appearance-none bg-white cursor-pointer pr-8"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Items Grid */}
      {listings.length === 0 ? (
        <EmptyState
          title="No items found"
          description="Try adjusting your filters or search query. Or be the first to list something!"
          actionLabel="List your first item"
          onAction={() => {}}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortField}-${searchValue}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {listings.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
              >
                <ItemCard
                  id={item.id}
                  title={item.title}
                  category={item.category}
                  state={item.transactionType}
                  owner={item.owner}
                  lookingFor={item.lookingFor}
                  onClick={() => setSelectedItem(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}


      {/* Item Detail Drawer */}
      <ItemDetailDrawer
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onRequest={handleRequest}
      />

      {/* Create Listing Modal */}
      <CreateListingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={addListing}
      />
    </>
  );
}
