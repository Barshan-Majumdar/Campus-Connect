import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Max width Tailwind class, defaults to max-w-lg */
  maxWidth?: string;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-lg', title }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative bg-white rounded-3xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.2)] w-full ${maxWidth} overflow-hidden`}
            initial={{ scale: 0.93, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.93, y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border-none cursor-pointer outline-none"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {title && (
              <div className="px-7 pt-8 pb-0">
                <h2 className="text-xl font-black text-brand-slate tracking-tight pr-8">{title}</h2>
              </div>
            )}

            <div className="overflow-y-auto max-h-[85vh]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
