import { motion } from 'framer-motion';
import { TrendingUp, Users, RefreshCcw, ShieldCheck } from 'lucide-react';

export default function HeroStats() {
  const stats = [
    { label: "Active Listings", value: "2,405", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50", glow: "bg-indigo-200" },
    { label: "Successful Swaps", value: "1,284", icon: RefreshCcw, color: "text-emerald-600", bg: "bg-emerald-50", glow: "bg-emerald-200" },
    { label: "Campus Members", value: "850+", icon: Users, color: "text-sky-600", bg: "bg-sky-50", glow: "bg-sky-200" },
    { label: "Verified Trades", value: "99.8%", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", glow: "bg-purple-200" },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="glass-panel p-5 relative overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-default border border-white/80"
        >
          {/* Decorative background glow */}
          <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full mix-blend-multiply filter blur-2xl opacity-60 transition-transform duration-500 group-hover:scale-150 ${stat.glow}`} />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} border border-white/60 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-brand-slate tracking-tight mb-0.5" style={{ fontFamily: 'Geist, sans-serif' }}>{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
