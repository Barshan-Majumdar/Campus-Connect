import { Cpu, BookOpen, FlaskConical, ArrowRight } from 'lucide-react';
import { motion, type Transition } from 'framer-motion';
import type { Listing } from '../types';
import { TransactionBadge } from './ui/Badge';

// Re-export legacy types so existing importers don't break during migration
export type TransactionState = import('../types').TransactionType;
export type ItemCategory = import('../types').Category;

interface ItemCardProps extends Listing {
  onClick: () => void;
}

const categoryConfig: Record<import('../types').Category, { icon: JSX.Element; bg: string; color: string }> = {
  Hardware: {
    icon: <Cpu className="w-4 h-4" />,
    bg: 'bg-indigo-100',
    color: 'text-indigo-600',
  },
  Academic: {
    icon: <BookOpen className="w-4 h-4" />,
    bg: 'bg-amber-100',
    color: 'text-amber-600',
  },
  Lab: {
    icon: <FlaskConical className="w-4 h-4" />,
    bg: 'bg-emerald-100',
    color: 'text-emerald-600',
  },
};

const transactionBorderHover: Record<import('../types').TransactionType, string> = {
  'Permanent Swap': 'hover:border-slate-400',
  'Temporary Borrow': 'hover:border-sky-400',
  'Free Giveaway': 'hover:border-emerald-400',
};

const transactionAccentHover: Record<import('../types').TransactionType, string> = {
  'Permanent Swap': 'group-hover:bg-slate-500',
  'Temporary Borrow': 'group-hover:bg-sky-500',
  'Free Giveaway': 'group-hover:bg-emerald-500',
};

const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

export default function ItemCard({
  title,
  category,
  transactionType,
  owner,
  status,
  onClick,
}: ItemCardProps) {
  const catCfg = categoryConfig[category];
  const isRequested = status === 'requested';
  const isUnavailable = status === 'unavailable';
  const isDimmed = isRequested || isUnavailable;

  return (
    <motion.div
      onClick={onClick}
      whileHover={isDimmed ? {} : { scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={sliceSpring}
      className={`
        bg-white border border-slate-200 p-4 rounded-2xl cursor-pointer
        hover:shadow-[0_16px_35px_-10px_rgba(0,0,0,0.12)]
        ${transactionBorderHover[transactionType]}
        transition-all duration-200
        flex flex-col justify-between group h-full relative overflow-hidden
        ${isDimmed ? 'opacity-60' : ''}
      `}
    >
      {/* Left accent stripe that shifts color by transaction type on hover */}
      <div
        className={`absolute top-0 left-0 w-1.5 h-full bg-transparent transition-colors duration-300 ${transactionAccentHover[transactionType]}`}
      />

      {/* Requested / Unavailable overlay badge */}
      {isDimmed && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${
            isRequested ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-600 border-red-200'
          }`}>
            {isRequested ? 'Requested' : 'Unavailable'}
          </span>
        </div>
      )}

      <div>
        <div className="flex justify-between items-start mb-3 pl-2">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${catCfg.bg} ${catCfg.color} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
              {catCfg.icon}
            </div>
            <span className="text-xs font-semibold text-slate-500">{category}</span>
          </div>
          <TransactionBadge type={transactionType} />
        </div>

        <h3 className="text-base font-bold text-brand-slate mb-1 pl-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
          {title}
        </h3>
        <p className="text-xs font-medium text-brand-muted pl-2">
          Owner: <span className="text-slate-600">{owner}</span>
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-muted group-hover:text-brand-slate transition-colors pl-2">
        <span>View details</span>
        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}
