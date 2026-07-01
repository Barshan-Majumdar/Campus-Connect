import { motion } from 'framer-motion';
import { Zap, Shield, Search, Star, Settings } from 'lucide-react';

export default function FeatureButtons() {
  const features = [
    { name: "Feature 1", icon: Zap },
    { name: "Feature 2", icon: Shield },
    { name: "Feature 3", icon: Search },
    { name: "Feature 4", icon: Star },
    { name: "Feature 5", icon: Settings },
  ];

  return (
    <div className="w-full flex flex-wrap gap-4 mb-10">
      {features.map((feature, index) => (
        <motion.button
          key={feature.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 400, damping: 25 }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 min-w-[150px] flex items-center gap-3 glass-panel py-3 px-5 hover:border-indigo-300 hover:shadow-[0_8px_20px_rgba(49,46,129,0.12)] transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100/80 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shadow-inner">
            <feature.icon className="w-4 h-4 text-brand-muted group-hover:text-indigo-600 transition-colors" />
          </div>
          <span className="text-sm font-bold text-brand-slate tracking-wide group-hover:text-indigo-950 transition-colors" style={{ fontFamily: 'Geist, sans-serif' }}>
            {feature.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
