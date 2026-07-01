import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Inbox, Filter, X } from 'lucide-react';
import ItemCard from './ItemCard';
import SkeletonCard from './ui/SkeletonCard';
import type { Listing, Category, TransactionType } from '../types';

interface SearchViewProps {
  stashItems: Listing[];
  wishlistItems: Listing[];
  onItemClick: (item: Listing) => void;
}

type SourceFilter = 'All' | 'Stash' | 'Wishlist';
type CategoryFilter = 'All' | Category;
type TypeFilter = 'All' | TransactionType;

const CATEGORIES: CategoryFilter[] = ['All', 'Hardware', 'Academic', 'Lab'];
const TYPES: TypeFilter[] = ['All', 'Temporary Borrow', 'Permanent Swap', 'Free Giveaway'];
const SOURCES: { name: SourceFilter; label: string }[] = [
  { name: 'All', label: 'All Items' },
  { name: 'Stash', label: 'Stash (Offering)' },
  { name: 'Wishlist', label: 'Wishlist (Requesting)' },
];

const filterBtn = (active: boolean) =>
  `px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
    active
      ? 'bg-brand-slate text-white border-brand-slate'
      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800'
  }`;

export default function SearchView({ stashItems, wishlistItems, onItemClick }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<SourceFilter>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedType, setSelectedType] = useState<TypeFilter>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Skeleton on initial mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const allItems = [
    ...stashItems.map((item) => ({ ...item, source: 'Stash' as const })),
    ...wishlistItems.map((item) => ({ ...item, source: 'Wishlist' as const })),
  ];

  const filteredItems = allItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.owner.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    const matchesSource = selectedSource === 'All' || item.source === selectedSource;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.transactionType === selectedType;
    return matchesQuery && matchesSource && matchesCategory && matchesType;
  });

  const hasFilters = searchQuery !== '' || selectedSource !== 'All' || selectedCategory !== 'All' || selectedType !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSource('All');
    setSelectedCategory('All');
    setSelectedType('All');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
          Search Catalog
        </h1>
        <p className="text-xs font-semibold text-brand-muted mt-1">
          Discover, borrow, or request items listed across campus.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, owner, or category…"
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] text-brand-slate placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters panel */}
      <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl mb-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-indigo-950 uppercase tracking-wide">
            <Filter className="w-4 h-4" />
            <span>Filter Catalog</span>
          </div>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[10px] font-bold text-brand-muted hover:text-rose-600 transition-colors cursor-pointer border-none bg-transparent"
            >
              <X className="w-3 h-3" />
              Reset all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Source filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Listing Type</label>
            <div className="flex flex-wrap gap-1.5">
              {SOURCES.map((src) => (
                <button key={src.name} onClick={() => setSelectedSource(src.name)} className={filterBtn(selectedSource === src.name)}>
                  {src.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={filterBtn(selectedCategory === cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction type filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Exchange Type</label>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((type) => (
                <button key={type} onClick={() => setSelectedType(type)} className={filterBtn(selectedType === type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </motion.div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.25, ease: 'easeOut' }}
                className="relative"
              >
                {/* Source badge */}
                <div className={`absolute top-2.5 left-2.5 z-20 text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm border ${
                  item.source === 'Stash'
                    ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {item.source}
                </div>
                <div className="pt-3 h-full">
                  <ItemCard {...item} onClick={() => onItemClick(item)} />
                </div>
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
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-extrabold text-brand-slate mb-1">No items match your filters</h3>
            <p className="text-xs font-semibold text-brand-muted max-w-sm">
              Try modifying your query or adjusting the filters to explore other campus listings.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2 bg-indigo-950 text-white rounded-full text-xs font-bold hover:bg-indigo-900 transition-colors shadow-sm cursor-pointer border-none"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
