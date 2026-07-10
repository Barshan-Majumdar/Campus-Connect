import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, BookOpen, FlaskConical, ShieldCheck, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import type { ListingItem } from '../data/mockData';
import { handoverPoints } from '../data/mockData';

interface ItemDetailDrawerProps {
  item: ListingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequest: (itemId: string, handoverPointId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Hardware: <Cpu className="w-4 h-4" />,
  Academic: <BookOpen className="w-4 h-4" />,
  Lab: <FlaskConical className="w-4 h-4" />,
};

const conditionColors: Record<string, string> = {
  Excellent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Good: 'bg-sky-50 text-sky-700 border-sky-200',
  Fair: 'bg-amber-50 text-amber-700 border-amber-200',
  Poor: 'bg-red-50 text-red-700 border-red-200',
};

const transactionTypeStyles: Record<string, string> = {
  'Permanent Swap': 'bg-slate-100 text-slate-700 border-slate-200',
  'Temporary Borrow': 'bg-sky-50 text-sky-700 border-sky-200',
  'Free Giveaway': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function ItemDetailDrawer({ item, isOpen, onClose, onRequest }: ItemDetailDrawerProps) {
  const [selectedHandover, setSelectedHandover] = useState(handoverPoints[0].id);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 shadow-[-20px_0_60px_rgba(0,0,0,0.1)] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
                Item Details
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Category + Type */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                    {categoryIcons[item.category]}
                  </div>
                  <span className="text-xs font-semibold">{item.category}</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${transactionTypeStyles[item.transactionType]}`}>
                  {item.transactionType}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-brand-muted leading-relaxed">
                {item.description}
              </p>

              {/* Condition */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Condition:</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${conditionColors[item.condition]}`}>
                  {item.condition}
                </span>
              </div>

              {/* Wanted count */}
              <div className="flex items-center gap-2 text-xs text-brand-muted">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">{item.wantedCount} people want this</span>
              </div>

              {/* Owner */}
              <div className="glass-panel p-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Owner</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.ownerAvatar}&backgroundColor=0f172a&textColor=ffffff`}
                      alt={item.owner}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-slate">{item.owner}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-600">
                        Trust Score: {item.ownerTrustScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Looking For Requirement */}
              {item.lookingFor && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Looking For in Return</p>
                  <p className="text-sm font-semibold text-indigo-900 leading-relaxed">
                    {item.lookingFor}
                  </p>
                </div>
              )}

              {/* Handover Point */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  Select Handover Point
                </p>
                <select
                  value={selectedHandover}
                  onChange={(e) => setSelectedHandover(e.target.value)}
                  className="w-full glass-panel px-3 py-2.5 text-sm font-medium text-brand-slate rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent appearance-none bg-white cursor-pointer"
                >
                  {handoverPoints.map((hp) => (
                    <option key={hp.id} value={hp.id}>
                      {hp.name} — {hp.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 border-t border-slate-100">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                onClick={() => onRequest(item.id, selectedHandover)}
                className="w-full bg-indigo-950 text-white py-3 rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(49,46,129,0.3)] transition-all"
              >
                Request Item
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
