import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
}

export default function TransactionModal({ isOpen, onClose, itemTitle }: TransactionModalProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const timer = setTimeout(() => setStep(1), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
            className="professional-card w-full max-w-md bg-white p-8 relative overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-brand-slate mb-2">Secure Handshake</h2>
              <p className="text-sm font-medium text-brand-muted">Initiating transfer for <span className="text-brand-accent">{itemTitle}</span></p>
            </div>

            <div className="relative flex justify-center mb-10">
              {/* Refreshing Neon Scanning Border */}
              <motion.div 
                className="absolute inset-0 rounded-3xl border-2 border-transparent"
                style={{
                  background: 'linear-gradient(90deg, #0EA5E9, #22D3EE, #34D399, #38BDF8) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="w-48 h-48 bg-white rounded-3xl p-4 shadow-inner relative z-10 flex items-center justify-center">
                {step === 0 ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-12 h-12 text-brand-accent" />
                  </motion.div>
                ) : (
                  <div className="w-full h-full border-4 border-brand-slate rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-wrap">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className={`w-1/8 h-1/8 ${Math.random() > 0.5 ? 'bg-brand-slate' : 'bg-transparent'}`} style={{ width: '12.5%', height: '12.5%' }} />
                      ))}
                    </div>
                    {/* Center logo in QR */}
                    <div className="w-10 h-10 bg-white rounded-lg absolute z-20 flex items-center justify-center shadow-md">
                      <span className="font-bold text-brand-accent text-xs">P2P</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-brand-slate">Requested by you</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-brand-slate">Approved by owner</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                <span className="text-sm font-bold text-slate-400">Scan to complete handover</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
