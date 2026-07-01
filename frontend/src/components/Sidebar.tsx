import { Home, Compass, Package, Users, Settings, LogOut, ArrowRightLeft, Bell, Search } from 'lucide-react';

export default function Sidebar() {
  const features = [
    { name: "Home", icon: Home, active: true },
    { name: "Search", icon: Search },
    { name: "Projects", icon: Compass },
    { name: "Assets", icon: Package },
    { name: "Team", icon: Users },
  ];

  return (
    <div className="w-[156px] h-screen shrink-0 bg-transparent flex flex-col z-20 relative hidden lg:flex pt-3 pb-5 border-r border-slate-200/20">
      {/* Stacked Stylish Wordmark Logo */}
      <div className="mb-4 mt-1 flex px-5 w-full cursor-pointer hover:scale-[1.02] transition-transform">
        <div className="text-[26px] font-normal tracking-normal text-indigo-950 drop-shadow-sm pb-1" style={{ fontFamily: 'Pacifico, cursive', lineHeight: '1.2' }}>
          Campus<br/>Connect
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1.5 w-full px-3 mt-0">
        {features.map((feature) => (
          <a
            key={feature.name}
            href="#"
            className={`flex flex-row items-center gap-3 w-full h-[40px] px-3 rounded-[10px] transition-all ${
              feature.active 
                ? 'bg-white shadow-sm text-brand-accent' 
                : 'text-slate-500 hover:bg-slate-200/50 hover:text-brand-slate'
            }`}
          >
            <feature.icon className={`w-[16px] h-[16px] shrink-0 ${feature.active ? 'text-brand-accent' : 'text-slate-500'}`} />
            <span className="text-[11px] font-bold tracking-wide">{feature.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-4 flex flex-row justify-between items-center w-full px-5 mb-2">
        <button className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/50 transition-colors relative">
          <Bell className="w-[14px] h-[14px]" />
          <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-brand-accent rounded-full border border-white"></span>
        </button>

        <button className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-brand-slate hover:bg-slate-200/50 transition-colors">
          <Settings className="w-[14px] h-[14px]" />
        </button>

        <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden border border-slate-50 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          <img src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=0f172a&textColor=ffffff" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
