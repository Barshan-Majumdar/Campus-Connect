import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { Users2, Search, Plus, Star, TrendingUp, CheckCircle2, UserPlus } from 'lucide-react';

type GroupCategory = 'All' | 'My Groups' | 'Hostel' | 'Academic' | 'Club' | 'Sports';

interface Group {
  id: string;
  name: string;
  description: string;
  category: Exclude<GroupCategory, 'All' | 'My Groups'>;
  memberCount: number;
  activeListingsCount: number;
  isJoined: boolean;
  avatarSeed: string;
  isTrending?: boolean;
}

const mockGroups: Group[] = [
  { id: 'g1', name: 'Hostel A Block', description: 'Exclusive group for residents of Hostel A Block. Trade essentials easily.', category: 'Hostel', memberCount: 142, activeListingsCount: 38, isJoined: true, avatarSeed: 'hostelA', isTrending: true },
  { id: 'g2', name: 'Robotics Club', description: 'Share components, arduinos, and tools with fellow robotics enthusiasts.', category: 'Club', memberCount: 85, activeListingsCount: 45, isJoined: false, avatarSeed: 'robotics', isTrending: true },
  { id: 'g3', name: 'CSE 3rd Sem', description: 'Study materials, textbooks, and past papers for CSE students.', category: 'Academic', memberCount: 210, activeListingsCount: 112, isJoined: true, avatarSeed: 'cse3' },
  { id: 'g4', name: 'Campus Cyclists', description: 'Borrow/lend cycles and accessories for quick campus commutes.', category: 'Sports', memberCount: 320, activeListingsCount: 15, isJoined: false, avatarSeed: 'cycles' },
  { id: 'g5', name: 'Design Society', description: 'Designers helping designers. Trade tablets, styluses, and design books.', category: 'Club', memberCount: 64, activeListingsCount: 12, isJoined: false, avatarSeed: 'design' },
  { id: 'g6', name: 'Hostel B Wing', description: 'A close-knit community for residents of Hostel B Wing.', category: 'Hostel', memberCount: 95, activeListingsCount: 22, isJoined: false, avatarSeed: 'hostelB' },
];

const categories: GroupCategory[] = ['All', 'My Groups', 'Hostel', 'Academic', 'Club', 'Sports'];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Hostel': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    case 'Club': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'Academic': return 'text-sky-600 bg-sky-50 border-sky-200';
    case 'Sports': return 'text-amber-600 bg-amber-50 border-amber-200';
    default: return 'text-slate-600 bg-slate-50 border-slate-200';
  }
};

export default function GroupsPage() {
  const [activeCategory, setActiveCategory] = useState<GroupCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

  const filteredGroups = useMemo(() => {
    return mockGroups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            group.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = true;
      if (activeCategory === 'My Groups') {
        matchesCategory = group.isJoined;
      } else if (activeCategory !== 'All') {
        matchesCategory = group.category === activeCategory;
      }

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  const trendingGroups = mockGroups.filter(g => g.isTrending);

  return (
    <div className="pb-8 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-black text-brand-slate tracking-tight"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Campus Groups
          </h1>
          <p className="text-sm text-brand-muted mt-1">Discover, join, and trade within trusted campus communities</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={sliceSpring}
          className="bg-indigo-950 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-[0_0_15px_rgba(49,46,129,0.3)] transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Group
        </motion.button>
      </div>

      {/* Trending / Featured Groups */}
      <AnimatePresence>
        {activeCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <h2 className="text-sm font-bold text-brand-slate tracking-wide" style={{ fontFamily: 'Geist, sans-serif' }}>Trending Communities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {trendingGroups.map((group, idx) => (
                <motion.div
                  key={`trending-${group.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring' }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="relative glass-panel p-6 group cursor-pointer overflow-hidden border border-white/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all"
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full mix-blend-multiply filter blur-3xl opacity-40 bg-indigo-200 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-slate-100 border-2 border-white group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                      <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${group.avatarSeed}&backgroundColor=0f172a`} alt={group.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-lg font-black text-brand-slate truncate" style={{ fontFamily: 'Geist, sans-serif' }}>{group.name}</h3>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(group.category)}`}>
                          {group.category}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-3">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1.5"><Users2 className="w-3.5 h-3.5" /> {group.memberCount}</span>
                          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400" /> {group.activeListingsCount} listings</span>
                        </div>
                        <button className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                          group.isJoined 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-indigo-950 text-white hover:shadow-[0_4px_12px_rgba(49,46,129,0.2)] hover:scale-105'
                        }`}>
                          {group.isJoined ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Joined
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-3.5 h-3.5" />
                              Join
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groups by name or topic..."
            className="w-full glass-panel px-4 py-2.5 pl-10 text-sm font-medium text-brand-slate placeholder:text-slate-400 rounded-full border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/40 transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar scroll-smooth">
          <div className="bg-slate-200/60 p-1 flex rounded-full relative shadow-inner shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors z-10 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'text-slate-500 hover:text-indigo-900'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="groupCategoryTab"
                    className="absolute inset-0 bg-indigo-950 rounded-full shadow-[0_0_10px_rgba(49,46,129,0.2)]"
                    initial={false}
                    transition={sliceSpring}
                    style={{ zIndex: -1 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-center py-20 glass-panel"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-brand-slate mb-1">No groups found</h3>
          <p className="text-sm text-brand-muted max-w-sm mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="glass-panel p-5 relative overflow-hidden group border border-white/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col h-full cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm bg-slate-100 border-2 border-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${group.avatarSeed}&backgroundColor=0f172a`} alt={group.name} className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(group.category)}`}>
                    {group.category}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-brand-slate mb-1 group-hover:text-indigo-950 transition-colors">{group.name}</h3>
                <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4 flex-grow">{group.description}</p>
                
                <div className="mt-auto pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1 text-slate-400" title="Members"><Users2 className="w-3.5 h-3.5" /> {group.memberCount}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1 text-slate-400" title="Listings"><Star className="w-3 h-3 text-amber-400/70" /> {group.activeListingsCount}</span>
                  </div>
                  
                  <button className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all flex items-center gap-1.5 ${
                    group.isJoined 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-indigo-950 text-white hover:shadow-[0_4px_12px_rgba(49,46,129,0.2)] hover:scale-105'
                  }`}>
                    {group.isJoined ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Joined
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3" />
                        Join
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
