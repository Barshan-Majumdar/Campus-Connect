import { Home, Compass, Package, Users, Settings, Bell, Search } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onNavigate: (path: string) => void;
}

export default function Sidebar({ activeTab, onNavigate }: SidebarProps) {
  const features = [
    { name: "Home", icon: Home },
    { name: "Search", icon: Search },
    { name: "Projects", icon: Compass },
    { name: "Assets", icon: Package },
    { name: "Team", icon: Users },
  ];

  return (
    <div className="w-[156px] h-screen shrink-0 bg-transparent flex flex-col z-20 relative hidden lg:flex pt-3 pb-5 border-r border-slate-200/20">
      {/* Stacked Stylish Wordmark Logo */}
      <a 
        href="/home" 
        onClick={(e) => {
          e.preventDefault();
          onNavigate("/home");
        }}
        className="mb-4 mt-1 flex px-5 w-full cursor-pointer hover:scale-[1.02] transition-transform block no-underline select-none"
      >
        <div className="text-[26px] font-normal tracking-normal text-indigo-950 drop-shadow-sm pb-1" style={{ fontFamily: 'Pacifico, cursive', lineHeight: '1.2' }}>
          Campus<br/>Connect
        </div>
      </a>

      <nav className="flex-1 flex flex-col gap-1.5 w-full px-3 mt-0">
        {features.map((feature) => {
          const isActive = activeTab === feature.name;
          const path = `/${feature.name.toLowerCase()}`;
          return (
            <a
              key={feature.name}
              href={path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(path);
              }}
              className={`flex flex-row items-center gap-3 w-full h-[40px] px-3 rounded-[10px] text-left transition-all cursor-pointer select-none no-underline ${
                isActive 
                  ? 'bg-white shadow-sm text-brand-accent font-bold animate-pulse-subtle' 
                  : 'text-slate-500 hover:bg-slate-200/50 hover:text-brand-slate font-medium'
              }`}
            >
              <feature.icon className={`w-[16px] h-[16px] shrink-0 ${isActive ? 'text-brand-accent' : 'text-slate-500'}`} />
              <span className="text-[11px] tracking-wide">{feature.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 flex flex-row justify-between items-center w-full px-5 mb-2">
        <button className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/50 transition-colors relative border-none outline-none cursor-pointer">
          <Bell className="w-[14px] h-[14px]" />
          <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-brand-accent rounded-full border border-white"></span>
        </button>

        <button className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/50 transition-colors border-none outline-none cursor-pointer">
          <Settings className="w-[14px] h-[14px]" />
        </button>

        <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-slate-50 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          <img src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=0f172a&textColor=ffffff" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
