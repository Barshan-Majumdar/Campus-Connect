import { useRef, useState } from 'react';
import { Home, Compass, Package, Users, Bell, Search, Settings } from 'lucide-react';
import NotificationsPanel from './NotificationsPanel';
import type { AppNotification } from '../types';

interface SidebarProps {
  activeTab: string;
  onNavigate: (path: string) => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
}

const features = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Projects', icon: Compass, path: '/projects' },
  { name: 'Assets', icon: Package, path: '/assets' },
  { name: 'Team', icon: Users, path: '/team' },
];

export default function Sidebar({ activeTab, onNavigate, notifications, onMarkAllRead }: SidebarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-[156px] h-screen shrink-0 bg-transparent flex flex-col z-20 relative hidden lg:flex pt-3 pb-5 border-r border-slate-200/20">
      {/* Logo */}
      <a
        href="/home"
        onClick={(e) => { e.preventDefault(); onNavigate('/home'); }}
        className="mb-4 mt-1 flex px-5 w-full cursor-pointer hover:scale-[1.02] transition-transform block no-underline select-none"
      >
        <div
          className="text-[26px] font-normal tracking-normal text-indigo-950 drop-shadow-sm pb-1"
          style={{ fontFamily: 'Pacifico, cursive', lineHeight: '1.2' }}
        >
          Campus<br />Connect
        </div>
      </a>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1.5 w-full px-3 mt-0">
        {features.map((feature) => {
          const isActive = activeTab === feature.name;
          return (
            <a
              key={feature.name}
              href={feature.path}
              onClick={(e) => { e.preventDefault(); onNavigate(feature.path); }}
              className={`flex flex-row items-center gap-3 w-full h-[40px] px-3 rounded-[10px] text-left transition-all cursor-pointer select-none no-underline ${
                isActive
                  ? 'bg-white shadow-sm text-brand-accent font-bold'
                  : 'text-slate-500 hover:bg-slate-200/50 hover:text-brand-slate font-medium'
              }`}
            >
              <feature.icon className={`w-[16px] h-[16px] shrink-0 ${isActive ? 'text-brand-accent' : 'text-slate-500'}`} />
              <span className="text-[11px] tracking-wide">{feature.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Bottom bar */}
      <div className="mt-auto pt-4 flex flex-row justify-between items-center w-full px-5 mb-2 relative">
        {/* Bell */}
        <button
          ref={bellRef}
          onClick={() => setNotifOpen((o) => !o)}
          className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/50 transition-colors relative border-none outline-none cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-[14px] h-[14px]" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] bg-brand-accent text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white px-0.5">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>

        {/* Settings */}
        <button className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/50 transition-colors border-none outline-none cursor-pointer">
          <Settings className="w-[14px] h-[14px]" />
        </button>

        {/* Avatar */}
        <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-slate-50 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=0f172a&textColor=ffffff"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Notifications panel */}
        <NotificationsPanel
          isOpen={notifOpen}
          onClose={() => setNotifOpen(false)}
          notifications={notifications}
          onMarkAllRead={() => { onMarkAllRead(); setNotifOpen(false); }}
        />
      </div>
    </div>
  );
}
