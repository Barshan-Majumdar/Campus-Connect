import { Cpu, BookOpen, FlaskConical, ExternalLink } from 'lucide-react';
import { motion, type Transition } from 'framer-motion';

export type TransactionState = 'Permanent Swap' | 'Temporary Borrow' | 'Free Giveaway';
export type ItemCategory = 'Hardware' | 'Academic' | 'Lab';

interface ItemCardProps {
  id: string;
  title: string;
  category: ItemCategory;
  state: TransactionState;
  owner: string;
  lookingFor?: string;
  onClick: () => void;
}

export default function ItemCard({ title, category, state, owner, lookingFor, onClick }: ItemCardProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case 'Hardware': return <Cpu className="w-4 h-4 text-slate-500" />;
      case 'Academic': return <BookOpen className="w-4 h-4 text-slate-500" />;
      case 'Lab': return <FlaskConical className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStateStyles = () => {
    switch (state) {
      case 'Permanent Swap': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Temporary Borrow': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Free Giveaway': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const sliceSpring: Transition = { type: "spring", stiffness: 500, damping: 35, mass: 0.8 };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={sliceSpring}
      className="bg-white border border-slate-200 p-4 rounded-2xl cursor-pointer hover:border-slate-300 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] flex flex-col justify-between group h-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-brand-accent transition-colors duration-300" />
      
      <div>
        <div className="flex justify-between items-start mb-3 pl-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              {getCategoryIcon()}
            </div>
            <span className="text-xs font-semibold text-slate-500">{category}</span>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${getStateStyles()}`}>
            {state}
          </span>
        </div>
        
        <h3 className="text-base font-bold text-brand-slate mb-1 pl-2 line-clamp-1 group-hover:text-brand-accent transition-colors">
          {title}
        </h3>
        <p className="text-xs font-medium text-brand-muted pl-2 mb-2">Owner: <span className="text-slate-600">{owner}</span></p>

        {lookingFor && (
          <div className="ml-2 mt-2 px-3 py-2 bg-indigo-50/80 rounded-xl border border-indigo-100/50">
            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest block mb-0.5">Looking For</span>
            <span className="text-xs font-semibold text-indigo-900 line-clamp-1">{lookingFor}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-muted group-hover:text-brand-slate transition-colors pl-2">
        <span>View details</span>
        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}
