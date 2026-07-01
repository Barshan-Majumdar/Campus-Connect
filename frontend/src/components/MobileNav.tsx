import { Home, Search, Compass, Package, Users } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onNavigate: (path: string) => void;
}

const features = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Projects', icon: Compass, path: '/projects' },
  { name: 'Assets', icon: Package, path: '/assets' },
  { name: 'Team', icon: Users, path: '/team' },
];

export default function MobileNav({ activeTab, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 flex lg:hidden px-2 pb-safe">
      {features.map((feature) => {
        const isActive = activeTab === feature.name;
        return (
          <button
            key={feature.name}
            onClick={() => onNavigate(feature.path)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors cursor-pointer border-none bg-transparent ${
              isActive ? 'text-brand-accent' : 'text-slate-400 hover:text-brand-slate'
            }`}
          >
            <feature.icon className="w-5 h-5" />
            <span className={`text-[9px] font-bold tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {feature.name}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-brand-accent" style={{ marginBottom: 0 }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
