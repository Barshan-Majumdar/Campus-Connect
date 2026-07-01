import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, BookOpen, FlaskConical, PlusCircle } from 'lucide-react';
import { type ItemCategory, type TransactionState } from './ItemCard';

interface NewListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: {
    title: string;
    category: ItemCategory;
    state: TransactionState;
    owner: string;
    targetTab: 'My Stash' | 'My Wishlist';
  }) => void;
}

export default function NewListingModal({ isOpen, onClose, onAddListing }: NewListingModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory | ''>('');
  const [state, setState] = useState<TransactionState | ''>('');
  const [owner, setOwner] = useState('You');
  const [targetTab, setTargetTab] = useState<'My Stash' | 'My Wishlist'>('My Stash');
  const [error, setError] = useState('');

  const categories: { name: ItemCategory; icon: React.ReactNode; label: string }[] = [
    { name: 'Hardware', icon: <Cpu className="w-5 h-5" />, label: 'Hardware' },
    { name: 'Academic', icon: <BookOpen className="w-5 h-5" />, label: 'Academic/Books' },
    { name: 'Lab', icon: <FlaskConical className="w-5 h-5" />, label: 'Lab Equipment' },
  ];

  const transactionStates: TransactionState[] = [
    'Temporary Borrow',
    'Permanent Swap',
    'Free Giveaway',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for the listing.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!state) {
      setError('Please select a listing deal type.');
      return;
    }

    onAddListing({
      title: title.trim(),
      category,
      state,
      owner: owner.trim() || 'You',
      targetTab,
    });

    // Reset fields
    setTitle('');
    setCategory('');
    setState('');
    setOwner('You');
    setTargetTab('My Stash');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white border border-slate-200 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] rounded-3xl w-full max-w-lg p-6 relative overflow-hidden"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            {/* Header decor */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500" />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black text-brand-slate tracking-tight">Create a New Listing</h2>
              <p className="text-xs font-semibold text-brand-muted mt-1">Share an asset or submit a request on the campus network.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tab Selector */}
              <div>
                <label className="block text-xs font-black text-brand-slate uppercase tracking-wider mb-2">Listing Goal</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setTargetTab('My Stash')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      targetTab === 'My Stash'
                        ? 'bg-white text-indigo-950 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    I Have This (Add to Stash)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetTab('My Wishlist')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${
                      targetTab === 'My Wishlist'
                        ? 'bg-white text-indigo-950 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    I Need This (Add to Wishlist)
                  </button>
                </div>
              </div>

              {/* Title input */}
              <div>
                <label htmlFor="title" className="block text-xs font-black text-brand-slate uppercase tracking-wider mb-2">
                  Item Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Raspberry Pi 4, Organic Chemistry Textbook"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all placeholder:text-slate-400 text-brand-slate"
                />
              </div>

              {/* Category Selectors */}
              <div>
                <label className="block text-xs font-black text-brand-slate uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const isSelected = category === cat.name;
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setCategory(cat.name)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all gap-2 text-center group ${
                          isSelected
                            ? 'border-brand-accent bg-indigo-50/40 text-brand-accent shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 bg-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-xl transition-colors ${
                          isSelected ? 'bg-indigo-100 text-brand-accent' : 'bg-slate-50 group-hover:bg-slate-100'
                        }`}>
                          {cat.icon}
                        </div>
                        <span className="text-[11px] font-bold tracking-tight">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transaction States */}
              <div>
                <label className="block text-xs font-black text-brand-slate uppercase tracking-wider mb-2">
                  Deal / Exchange Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {transactionStates.map((st) => {
                    const isSelected = state === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setState(st)}
                        className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-brand-slate text-white border-brand-slate shadow-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Owner */}
              <div>
                <label htmlFor="owner" className="block text-xs font-black text-brand-slate uppercase tracking-wider mb-2">
                  Listing Owner
                </label>
                <input
                  type="text"
                  id="owner"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="e.g. You, Alex M."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all text-brand-slate"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white rounded-full text-xs font-bold shadow-md hover:shadow-indigo-950/20 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  Publish Listing
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
