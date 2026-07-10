import { NavLink, useLocation } from 'react-router-dom';
import { Home, Store, Shuffle, ArrowRightLeft, ShieldCheck, Users2, Bell, Settings, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', icon: Home, to: '/' },
  { name: 'Marketplace', icon: Store, to: '/marketplace' },
  { name: 'Matches', icon: Shuffle, to: '/matches', badgeKey: 'matches' as const },
  { name: 'Transactions', icon: ArrowRightLeft, to: '/transactions', badgeKey: 'transactions' as const },
  { name: 'Trust & Profile', icon: ShieldCheck, to: '/trust' },
  { name: 'Groups', icon: Users2, to: '/groups' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { user } = useAppContext();
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform lg:static lg:translate-x-0 lg:flex lg:z-20 w-[240px] lg:w-[156px] h-screen shrink-0 bg-brand-bg lg:bg-transparent flex flex-col pt-3 pb-5 lg:border-r border-slate-200/20 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0 shadow-[20px_0_40px_rgba(0,0,0,0.1)] lg:shadow-none' : '-translate-x-full'
        }`}
      >
        {/* Stacked Stylish Wordmark Logo */}
        <div className="mb-8 lg:mb-4 mt-2 lg:mt-1 flex justify-between items-start px-5 lg:px-5 w-full">
          <div className="cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="text-[26px] font-normal tracking-normal text-indigo-950 drop-shadow-sm pb-1" style={{ fontFamily: 'Pacifico, cursive', lineHeight: '1.2' }}>
              Campus<br/>Connect
            </div>
          </div>
          
          {/* Mobile Close Button */}
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/60 text-slate-500 hover:text-brand-slate hover:bg-slate-300/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 lg:gap-1.5 w-full px-4 lg:px-3 mt-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={onClose}
                className={`flex flex-row items-center gap-4 lg:gap-3 w-full h-[48px] lg:h-[40px] px-4 lg:px-3 rounded-[12px] lg:rounded-[10px] transition-all relative ${
                  isActive
                    ? 'bg-white shadow-sm text-brand-accent font-bold'
                    : 'text-slate-500 hover:bg-slate-200/60 hover:text-brand-slate font-semibold lg:font-bold'
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] lg:w-[16px] lg:h-[16px] shrink-0 ${isActive ? 'text-brand-accent' : 'text-slate-500'}`} />
                <span className="text-[14px] lg:text-[11px] tracking-wide">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 lg:pt-4 flex flex-row justify-between items-center w-full px-6 lg:px-5 mb-4 lg:mb-2 border-t border-slate-200/30 lg:border-none">
          <button className="w-9 h-9 lg:w-7 lg:h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/60 transition-colors relative">
            <Bell className="w-[18px] h-[18px] lg:w-[14px] lg:h-[14px]" />
          </button>

          <button className="w-9 h-9 lg:w-7 lg:h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/60 transition-colors">
            <Settings className="w-[18px] h-[18px] lg:w-[14px] lg:h-[14px]" />
          </button>

          <div className="w-8 h-8 lg:w-7 lg:h-7 rounded-full bg-slate-200 overflow-hidden border border-slate-50 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.avatarSeed}&backgroundColor=0f172a&textColor=ffffff`} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
}
