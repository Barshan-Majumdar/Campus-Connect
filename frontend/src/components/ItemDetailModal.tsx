import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, BookOpen, FlaskConical, Package, Send,
  RefreshCw, Gift, User, Star,
} from 'lucide-react';
import type { Listing, Request, AppNotification } from '../types';
import Modal from './ui/Modal';
import { TransactionBadge, StatusBadge } from './ui/Badge';

interface ItemDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  onRequest: (request: Omit<Request, 'id' | 'createdAt'>, notification: Omit<AppNotification, 'id' | 'createdAt'>) => void;
}

const categoryConfig = {
  Hardware: { icon: Cpu, bg: 'bg-indigo-100', color: 'text-indigo-600', label: 'Hardware' },
  Academic: { icon: BookOpen, bg: 'bg-amber-100', color: 'text-amber-600', label: 'Academic' },
  Lab: { icon: FlaskConical, bg: 'bg-emerald-100', color: 'text-emerald-600', label: 'Lab Equipment' },
};

const actionConfig = {
  'Temporary Borrow': { label: 'Request to Borrow', icon: RefreshCw, cls: 'bg-sky-600 hover:bg-sky-700 shadow-sky-200' },
  'Permanent Swap': { label: 'Propose Swap', icon: RefreshCw, cls: 'bg-slate-800 hover:bg-slate-900 shadow-slate-200' },
  'Free Giveaway': { label: 'Claim Item', icon: Gift, cls: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' },
};

const conditionColors: Record<string, string> = {
  New: 'text-emerald-600',
  'Like New': 'text-sky-600',
  Good: 'text-indigo-600',
  Fair: 'text-amber-600',
  Poor: 'text-red-500',
};

export default function ItemDetailModal({ listing, onClose, onRequest }: ItemDetailModalProps) {
  const [step, setStep] = useState<'detail' | 'request' | 'success'>('detail');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => { setStep('detail'); setMessage(''); }, 350);
  };

  if (!listing) return null;

  const catCfg = categoryConfig[listing.category];
  const actionCfg = actionConfig[listing.transactionType];
  const CatIcon = catCfg.icon;
  const ActionIcon = actionCfg.icon;
  const isAlreadyRequested = listing.status === 'requested';
  const isUnavailable = listing.status === 'unavailable';

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    onRequest(
      {
        listingId: listing.id,
        listingTitle: listing.title,
        requestedBy: 'You',
        message: message.trim(),
      },
      {
        title: 'New Request Received',
        body: `Someone requested "${listing.title}" — check your listings.`,
        read: false,
      },
    );

    setSubmitting(false);
    setStep('success');
  };

  const placeholderImg = `https://api.dicebear.com/7.x/shapes/svg?seed=${listing.id}&backgroundColor=f1f5f9`;

  return (
    <Modal isOpen={listing !== null} onClose={handleClose} maxWidth="max-w-2xl">
      <AnimatePresence mode="wait" initial={false}>
        {/* ── DETAIL STEP ─────────────────────────────────────────────── */}
        {step === 'detail' && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Hero image */}
            <div className="w-full h-48 bg-slate-100 overflow-hidden">
              <img
                src={listing.image || placeholderImg}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-7 py-6 space-y-5">
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${catCfg.bg} ${catCfg.color} flex items-center justify-center`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${catCfg.color}`}>
                      {catCfg.label}
                    </p>
                    <h2 className="text-xl font-black text-brand-slate leading-tight">{listing.title}</h2>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <TransactionBadge type={listing.transactionType} size="md" />
                  <StatusBadge status={listing.status} />
                </div>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-brand-muted">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-semibold text-slate-700">{listing.owner}</span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-muted">
                  <Star className="w-3.5 h-3.5" />
                  <span className="font-semibold">
                    Condition: <span className={conditionColors[listing.condition] ?? 'text-slate-600'}>{listing.condition}</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Description</p>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {listing.description || 'No description provided.'}
                </p>
              </div>

              {/* Action button */}
              {!isAlreadyRequested && !isUnavailable ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep('request')}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white shadow-lg transition-all cursor-pointer border-none ${actionCfg.cls}`}
                >
                  <ActionIcon className="w-4 h-4" />
                  {actionCfg.label}
                </motion.button>
              ) : (
                <div className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-slate-400 bg-slate-100 border border-slate-200`}>
                  <Package className="w-4 h-4" />
                  {isAlreadyRequested ? 'Already Requested' : 'Not Available'}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── REQUEST FORM STEP ───────────────────────────────────────── */}
        {step === 'request' && (
          <motion.div
            key="request"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="px-7 py-8 space-y-6"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-1">{actionCfg.label}</p>
              <h3 className="text-xl font-black text-brand-slate">{listing.title}</h3>
              <p className="text-xs font-medium text-brand-muted mt-1">Send a message to <span className="text-slate-700 font-bold">{listing.owner}</span> along with your request.</p>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={`Hi ${listing.owner}, I'd love to ${listing.transactionType === 'Free Giveaway' ? 'claim' : 'borrow'} this...`}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all placeholder:text-slate-400 text-brand-slate resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('detail')}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-none"
              >
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={submitting}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white shadow-lg transition-all cursor-pointer border-none ${actionCfg.cls} disabled:opacity-60`}
              >
                {submitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Request
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── SUCCESS STEP ────────────────────────────────────────────── */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="px-7 py-12 flex flex-col items-center text-center gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center"
            >
              <Send className="w-7 h-7 text-emerald-600" />
            </motion.div>
            <h3 className="text-2xl font-black text-brand-slate">Request Sent!</h3>
            <p className="text-sm font-medium text-brand-muted max-w-xs">
              Your request for <span className="font-bold text-slate-700">{listing.title}</span> has been sent to {listing.owner}. You'll be notified of their response.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleClose}
              className="mt-2 px-8 py-3 bg-indigo-950 text-white rounded-2xl text-sm font-bold hover:bg-indigo-900 transition-colors cursor-pointer border-none"
            >
              Done
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
