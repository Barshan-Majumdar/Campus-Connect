import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus } from 'lucide-react';
import type { ItemCategory, TransactionType, ConditionGrade, ListingItem } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: ListingItem) => void;
}

export default function CreateListingModal({ isOpen, onClose, onSubmit }: CreateListingModalProps) {
  const { user } = useAppContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Hardware');
  const [type, setType] = useState<TransactionType>('Permanent Swap');
  const [condition, setCondition] = useState<ConditionGrade>('Excellent');
  const [lookingFor, setLookingFor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: ListingItem = {
      id: `item-new-${Date.now()}`,
      title,
      description,
      category,
      transactionType: type,
      condition,
      lookingFor: type === 'Permanent Swap' ? lookingFor : undefined,
      owner: user.name,
      ownerAvatar: user.avatarSeed,
      ownerTrustScore: user.trustScore,
      listedDate: new Date().toISOString(),
      wantedCount: 0,
    };

    onSubmit(newItem);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('Hardware');
    setType('Permanent Swap');
    setCondition('Excellent');
    setLookingFor('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 overflow-y-auto z-50 pointer-events-none flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] pointer-events-auto overflow-hidden flex flex-col max-h-full"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-200/60 flex items-center justify-between shrink-0 bg-white/50">
                <div>
                  <h2 className="text-2xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>Create Listing</h2>
                  <p className="text-xs font-semibold text-slate-400 mt-1">Add an item to the campus marketplace</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-brand-slate transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <form id="listing-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Title */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Item Title</label>
                    <input
                      required
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g., Arduino Uno R3 Kit"
                      className="w-full px-4 py-3 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all bg-white"
                    />
                  </div>

                  {/* Photo Upload (Mock) */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Item Photos</label>
                    <div className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:border-brand-accent transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-brand-accent">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold">Click to upload photos</span>
                    </div>
                  </div>

                  {/* Details Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Category</label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value as ItemCategory)}
                        className="w-full px-4 py-3 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent appearance-none cursor-pointer bg-white"
                      >
                        <option value="Hardware">Hardware</option>
                        <option value="Academic">Academic</option>
                        <option value="Lab">Lab</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Type</label>
                      <select
                        value={type}
                        onChange={e => setType(e.target.value as TransactionType)}
                        className="w-full px-4 py-3 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent appearance-none cursor-pointer bg-white"
                      >
                        <option value="Permanent Swap">Permanent Swap</option>
                        <option value="Temporary Borrow">Temporary Borrow</option>
                        <option value="Free Giveaway">Free Giveaway</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Condition</label>
                      <select
                        value={condition}
                        onChange={e => setCondition(e.target.value as ConditionGrade)}
                        className="w-full px-4 py-3 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent appearance-none cursor-pointer bg-white"
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Description</label>
                    <textarea
                      required
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Describe the item, its condition, and any accessories included..."
                      className="w-full px-4 py-3 text-sm font-medium text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 transition-all min-h-[100px] resize-none bg-white"
                    />
                  </div>

                  {/* Swap Requirements (Conditional) */}
                  <AnimatePresence>
                    {type === 'Permanent Swap' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 bg-indigo-50/50 border border-indigo-100 rounded-[24px]">
                          <label className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-2">What are you looking for?</label>
                          <input
                            required
                            type="text"
                            value={lookingFor}
                            onChange={e => setLookingFor(e.target.value)}
                            placeholder="e.g., Raspberry Pi 4, or Chemistry Textbooks"
                            className="w-full px-4 py-3 text-sm font-bold text-brand-slate rounded-2xl border-2 border-indigo-200 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 transition-all bg-white"
                          />
                          <p className="text-[10px] font-semibold text-slate-500 mt-2 pl-1">This helps others know exactly what to offer you for a swap.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </form>
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-slate-200/60 bg-slate-50 shrink-0 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:bg-slate-200 hover:text-brand-slate transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="listing-form"
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-brand-slate hover:bg-indigo-950 transition-colors shadow-lg shadow-indigo-950/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Post Listing
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
