import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
        {icon || <PackageOpen className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-lg font-bold text-brand-slate mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>
        {title}
      </h3>
      <p className="text-sm text-brand-muted max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
          onClick={onAction}
          className="bg-indigo-950 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-[0_0_15px_rgba(49,46,129,0.3)] transition-all"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}
