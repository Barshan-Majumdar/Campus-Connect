import { useState } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { ShieldCheck, Edit3, Save, X, TrendingUp, Package, CalendarDays, Users, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockNetworkUsers, type NetworkUser } from '../data/mockData';
import DeadlinesCalendar from '../components/DeadlinesCalendar';

const branches = [
  'Computer Science', 'Electronics & Communication', 'Mechanical', 'Civil',
  'Electrical', 'Chemical', 'Information Technology', 'Biomedical',
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

type ViewMode = 'profile' | 'network';

export default function TrustPage() {
  const { user, setUser } = useAppContext();
  const [viewMode, setViewMode] = useState<ViewMode>('profile');
  
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editBranch, setEditBranch] = useState(user.branch);
  const [editSemester, setEditSemester] = useState(user.semester);

  // Network State
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

  const handleSave = () => {
    setUser({
      ...user,
      name: editName,
      email: editEmail,
      branch: editBranch,
      semester: editSemester,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditBranch(user.branch);
    setEditSemester(user.semester);
    setIsEditing(false);
  };

  const selectedNetworkUser = (mockNetworkUsers && mockNetworkUsers.length > 0)
    ? (mockNetworkUsers.find(u => u.id === selectedUserId) || mockNetworkUsers[0])
    : null;

  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // emerald-500
    if (score >= 60) return '#F59E0B'; // amber-500
    return '#F43F5E'; // rose-500
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-emerald-500 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-500 bg-amber-50 border-amber-200';
    return 'text-rose-500 bg-rose-50 border-rose-200';
  };

  return (
    <div className="h-full flex flex-col -m-4 sm:-m-6 lg:-m-8">
      {/* ─── Header & Toggle ────────────────────────────────────────────── */}
      <div className="px-6 pt-8 pb-4 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50">
        <div>
          <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
            Trust & Network
          </h1>
          <p className="text-sm text-brand-muted mt-1">Manage your reputation and view connections</p>
        </div>

        {/* View Toggle Tabs */}
        <div className="bg-slate-200/60 p-1.5 flex rounded-full relative shadow-inner">
          <button
            onClick={() => setViewMode('profile')}
            className={`relative px-5 py-2 text-xs font-bold rounded-full transition-colors z-10 flex items-center gap-2 ${
              viewMode === 'profile' ? 'text-white' : 'text-slate-500 hover:text-indigo-900'
            }`}
          >
            {viewMode === 'profile' && (
              <motion.div
                layoutId="trustTabIndicator"
                className="absolute inset-0 bg-indigo-950 rounded-full shadow-[0_0_10px_rgba(49,46,129,0.2)]"
                initial={false}
                transition={sliceSpring}
                style={{ zIndex: -1 }}
              />
            )}
            <ShieldCheck className="w-4 h-4" /> My Profile
          </button>
          <button
            onClick={() => setViewMode('network')}
            className={`relative px-5 py-2 text-xs font-bold rounded-full transition-colors z-10 flex items-center gap-2 ${
              viewMode === 'network' ? 'text-white' : 'text-slate-500 hover:text-indigo-900'
            }`}
          >
            {viewMode === 'network' && (
              <motion.div
                layoutId="trustTabIndicator"
                className="absolute inset-0 bg-indigo-950 rounded-full shadow-[0_0_10px_rgba(49,46,129,0.2)]"
                initial={false}
                transition={sliceSpring}
                style={{ zIndex: -1 }}
              />
            )}
            <Users className="w-4 h-4" /> Campus Network
          </button>
        </div>
      </div>

      {/* ─── Main Content ──────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* VIEW: MY PROFILE */}
          {/* ========================================================= */}
          {viewMode === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full p-6 md:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Left Column: Profile Editor */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Profile Card */}
                  <div className="glass-panel p-6 rounded-[32px]">
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personal Details</p>
                      {!isEditing ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:text-brand-accent-hover transition-colors bg-brand-accent/5 px-3 py-1.5 rounded-full"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </motion.button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-full shadow-sm transition-colors"
                          >
                            <Save className="w-3 h-3" /> Save
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancel}
                            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-4 py-1.5 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3" /> Cancel
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-slate-200 overflow-hidden border-4 border-white shadow-md shrink-0">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.avatarSeed}&backgroundColor=0f172a&textColor=ffffff`}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Name</label>
                          {isEditing ? (
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-4 py-2.5 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent bg-white/50"
                            />
                          ) : (
                            <p className="text-base font-bold text-brand-slate px-1">{user.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Email</label>
                          {isEditing ? (
                            <input
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              className="w-full px-4 py-2.5 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent bg-white/50"
                            />
                          ) : (
                            <p className="text-base font-bold text-brand-slate px-1">{user.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Branch</label>
                          {isEditing ? (
                            <select
                              value={editBranch}
                              onChange={(e) => setEditBranch(e.target.value)}
                              className="w-full px-4 py-2.5 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent bg-white/50 cursor-pointer appearance-none"
                            >
                              {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                            </select>
                          ) : (
                            <p className="text-base font-bold text-brand-slate px-1">{user.branch}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Semester</label>
                          {isEditing ? (
                            <select
                              value={editSemester}
                              onChange={(e) => setEditSemester(Number(e.target.value))}
                              className="w-full px-4 py-2.5 text-sm font-bold text-brand-slate rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-brand-accent bg-white/50 cursor-pointer appearance-none"
                            >
                              {semesters.map((s) => <option key={s} value={s}>Semester {s}</option>)}
                            </select>
                          ) : (
                            <p className="text-base font-bold text-brand-slate px-1">Semester {user.semester}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Total Trades', value: user.totalTrades, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', glow: 'bg-indigo-200' },
                      { label: 'Items Listed', value: user.itemsListed, icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50', glow: 'bg-emerald-200' },
                      { label: 'Member Since', value: new Date(user.memberSince).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }), icon: CalendarDays, color: 'text-sky-600', bg: 'bg-sky-50', glow: 'bg-sky-200' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="glass-panel p-5 relative overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all rounded-[24px]"
                      >
                        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full mix-blend-multiply filter blur-2xl opacity-60 transition-transform duration-500 group-hover:scale-150 ${stat.glow}`} />
                        <div className="flex flex-col gap-3 relative z-10">
                          <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-brand-slate mb-1" style={{ fontFamily: 'Geist, sans-serif' }}>{stat.value}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Trust Breakdown */}
                  <div className="glass-panel p-6 rounded-[32px]">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5">Score Breakdown</p>
                    <div className="space-y-5">
                      {[
                        { label: 'On-time Returns', value: user.trustBreakdown.onTimeReturns, color: 'bg-emerald-500' },
                        { label: 'Condition Ratings', value: user.trustBreakdown.conditionRatings, color: 'bg-sky-500' },
                        { label: 'Completed Trades', value: user.trustBreakdown.completedTrades, color: 'bg-brand-accent' },
                      ].map((item, idx) => (
                        <div key={item.label}>
                          <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold text-brand-slate">{item.label}</span>
                            <span className="text-xs font-bold text-brand-muted">{item.value}/100</span>
                          </div>
                          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                              className={`h-full rounded-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadlines Calendar */}
                  <DeadlinesCalendar />
                </div>

                {/* Right Column: Score Ring */}
                <div className="space-y-6">
                  <div className="glass-panel p-8 flex flex-col items-center rounded-[32px] sticky top-8">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">My Trust Score</p>

                    <div className="relative w-48 h-48 mb-6">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="60" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                        <motion.circle
                          cx="70" cy="70" r="60" fill="none"
                          stroke={getScoreColor(user.trustScore)}
                          strokeWidth="12" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 60}
                          initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                          animate={{ strokeDashoffset: (2 * Math.PI * 60) - ((user.trustScore / 100) * (2 * Math.PI * 60)) }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
                          {user.trustScore}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 mt-1">/ 100</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getScoreColorClass(user.trustScore)}`}>
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-bold">
                        {user.trustScore >= 80 ? 'Highly Trusted' : user.trustScore >= 60 ? 'Trusted' : 'Building Trust'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* VIEW: CAMPUS NETWORK */}
          {/* ========================================================= */}
          {viewMode === 'network' && (
            <motion.div
              key="network"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col md:flex-row"
            >
              {/* Left Sidebar: Network List */}
              <div className={`w-full md:w-[320px] lg:w-[380px] flex-shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${selectedUserId && 'hidden md:block'}`}>
                <div className="p-4 md:pl-8 pb-8 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 mb-4">Recent Connections</p>
                  
                  {mockNetworkUsers && mockNetworkUsers.length > 0 ? mockNetworkUsers.map(u => {
                    const isSelected = u.id === (selectedUserId || mockNetworkUsers[0].id);
                    return (
                      <div
                        key={u.id}
                        onClick={() => setSelectedUserId(u.id)}
                        className={`flex items-center gap-4 p-4 rounded-[24px] cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'bg-white shadow-md border border-brand-accent/50 ring-2 ring-brand-accent/10'
                            : 'bg-white/80 border border-slate-200 hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                          <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${u.avatarSeed}&backgroundColor=0f172a&textColor=ffffff`}
                            alt={u.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-brand-slate truncate">{u.name}</h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getScoreColor(u.trustScore) }} />
                            <span className="text-[10px] font-bold text-slate-500">Score: {u.trustScore}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="p-4 text-xs font-bold text-slate-400">Loading network...</div>
                  )}
                </div>
              </div>

              {/* Right Pane: Public Profile Card */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] bg-white relative md:rounded-[40px] md:mx-6 lg:mx-8 md:mt-4 md:mb-10 lg:mb-12 border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
                {/* Mobile Back Button */}
                <div className="md:hidden sticky top-0 bg-white/90 backdrop-blur-md z-10 p-4 border-b border-slate-100">
                  <button 
                    onClick={() => setSelectedUserId('')}
                    className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-slate"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to network
                  </button>
                </div>

                <div className="p-6 lg:p-12 max-w-4xl mx-auto flex flex-col xl:flex-row gap-10">
                  {selectedNetworkUser ? (
                    <>
                  {/* Left Side: Avatar & Trust Ring */}
                  <div className="flex flex-col items-center xl:w-[280px] shrink-0">
                    <div className="w-32 h-32 rounded-3xl bg-slate-200 overflow-hidden border-4 border-white shadow-xl mb-6">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedNetworkUser.avatarSeed}&backgroundColor=0f172a&textColor=ffffff`}
                        alt={selectedNetworkUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h2 className="text-2xl font-black text-brand-slate mb-1">{selectedNetworkUser.name}</h2>
                    <p className="text-xs font-semibold text-slate-400 mb-8">Joined {new Date(selectedNetworkUser.memberSince).getFullYear()}</p>

                    {/* Trust Ring */}
                    <div className="relative w-40 h-40 mb-4">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="60" fill="none" stroke="#F8FAFC" strokeWidth="12" />
                        <motion.circle
                          key={selectedNetworkUser.id} // re-animate on change
                          cx="70" cy="70" r="60" fill="none"
                          stroke={getScoreColor(selectedNetworkUser.trustScore)}
                          strokeWidth="12" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 60}
                          initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                          animate={{ strokeDashoffset: (2 * Math.PI * 60) - ((selectedNetworkUser.trustScore / 100) * (2 * Math.PI * 60)) }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
                          {selectedNetworkUser.trustScore}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${getScoreColorClass(selectedNetworkUser.trustScore)}`}>
                      <ShieldCheck className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {selectedNetworkUser.trustScore >= 80 ? 'Highly Trusted' : selectedNetworkUser.trustScore >= 60 ? 'Trusted' : 'Use Caution'}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Stats & Breakdown */}
                  <div className="flex-1 space-y-8">
                    
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-[24px] p-5 border border-slate-100 flex flex-col gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <h3 className="text-2xl font-black text-brand-slate">{selectedNetworkUser.totalTrades}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed Trades</p>
                      </div>
                      <div className="bg-slate-50 rounded-[24px] p-5 border border-slate-100 flex flex-col gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Package className="w-4 h-4" />
                        </div>
                        <h3 className="text-2xl font-black text-brand-slate">{selectedNetworkUser.itemsListed}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items Listed</p>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div>
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Reputation Breakdown</h3>
                      <div className="space-y-6 bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                        {[
                          { label: 'On-time Returns', value: selectedNetworkUser.trustBreakdown.onTimeReturns, color: 'bg-emerald-500' },
                          { label: 'Condition Ratings', value: selectedNetworkUser.trustBreakdown.conditionRatings, color: 'bg-sky-500' },
                          { label: 'Successful Trades', value: selectedNetworkUser.trustBreakdown.completedTrades, color: 'bg-brand-accent' },
                        ].map((item, idx) => (
                          <div key={item.label}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-bold text-brand-slate">{item.label}</span>
                              <span className="text-sm font-bold text-slate-400">{item.value}%</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                key={`${selectedNetworkUser.id}-${item.label}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
                                className={`h-full rounded-full ${item.color}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-4">
                      <button className="w-full py-4 bg-brand-slate text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                        View Active Listings
                      </button>
                    </div>

                  </div>
                  </>
                  ) : (
                    <div className="text-center w-full py-10 text-sm font-bold text-slate-400">
                      No network user selected.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
