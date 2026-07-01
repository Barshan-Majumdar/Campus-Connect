import { useState } from 'react';
import { Search, Bell, Grid, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full h-12 shrink-0 z-40 bg-transparent px-4 sm:px-8 flex items-center justify-between">
      {/* Mobile Logo */}
      <div className="flex lg:hidden items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-accent to-purple-700 flex items-center justify-center shadow-inner">
          <ArrowRightLeft className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      
      {/* Desktop Spacer */}
      <div className="hidden lg:block"></div>

      {/* Right section: Search and Utilities */}
      <div className="flex items-center gap-3">
        <motion.div 
          className={`flex items-center bg-white/50 border rounded-full px-3 py-1 transition-colors duration-300 ${
            isFocused ? 'border-brand-accent shadow-[0_0_15px_rgba(37,99,235,0.15)] bg-white' : 'border-slate-200/80 hover:border-slate-300 hover:bg-white'
          }`}
          initial={false}
          animate={{ width: isFocused ? 240 : 180 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Search className={`w-3.5 h-3.5 mr-2 ${isFocused ? 'text-brand-accent' : 'text-slate-400'}`} />
          <input 
            type="text"
            placeholder="Search assets..."
            className="bg-transparent border-none outline-none w-full text-xs font-medium text-brand-slate placeholder:text-slate-400"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="hidden sm:flex items-center gap-0.5 shrink-0 ml-1">
            <kbd className="px-1.5 py-0.5 text-[9px] font-sans font-bold text-slate-400 bg-slate-100 rounded">⌘K</kbd>
          </div>
        </motion.div>

        <div className="w-[1px] h-4 bg-slate-200 mx-0.5" />

        <div className="flex items-center gap-0.5">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-100 transition-colors relative"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-brand-accent rounded-full border border-white"></span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-100 transition-colors"
          >
            <Grid className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden border-2 border-white cursor-pointer shadow-sm hover:shadow-md transition-shadow ml-1">
          <img src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=0f172a&textColor=ffffff" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
