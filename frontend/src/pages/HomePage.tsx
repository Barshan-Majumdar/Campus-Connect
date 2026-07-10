import { useState, useMemo } from 'react';
import { motion, type Transition } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Users, RefreshCcw, ShieldCheck, ArrowRight, Store,
  ArrowRightLeft, Calendar, Clock, AlertTriangle, Package,
  ChevronLeft, ChevronRight, Star, Flame,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import {
  mockListings, mockTransactions, weeklyActivity, trustScoreHistory,
  calendarEvents, getTransactionStatusCounts, getMostWantedItems,
  type CalendarEvent,
} from '../data/mockData';
import { StatusBadge } from '../components/Badge';

// ── Recharts shared tooltip style ────────────────────────────
const tooltipStyle = {
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(226,232,240,0.8)',
  borderRadius: '12px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
  fontSize: '12px',
  fontWeight: 600,
};

// ── Calendar helpers ─────────────────────────────────────────
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const eventTypeConfig: Record<CalendarEvent['type'], { color: string; dotColor: string; icon: typeof Clock }> = {
  return_due: { color: 'text-amber-600', dotColor: 'bg-amber-500', icon: Clock },
  pickup: { color: 'text-sky-600', dotColor: 'bg-sky-500', icon: Package },
  handover: { color: 'text-brand-accent', dotColor: 'bg-brand-accent', icon: ArrowRightLeft },
  overdue: { color: 'text-red-600', dotColor: 'bg-red-500', icon: AlertTriangle },
};

export default function HomePage() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

  // Calendar state
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  // Map events to date strings for dot rendering
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const ev of calendarEvents) {
      const d = ev.date;
      if (!map[d]) map[d] = [];
      map[d].push(ev);
    }
    return map;
  }, []);

  const calPrev = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const calNext = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  // Derived stats
  const activeListings = mockListings.length;
  const completedSwaps = mockTransactions.filter(t => t.status === 'completed').length;
  const inProgress = mockTransactions.filter(t => ['requested', 'accepted', 'in_transit'].includes(t.status)).length;
  const overdueCount = mockTransactions.filter(t => t.status === 'overdue').length;
  const txnStatusData = getTransactionStatusCounts();
  const mostWanted = getMostWantedItems();

  // Trust ring
  const scoreRadius = 44;
  const circumference = 2 * Math.PI * scoreRadius;
  const progress = (user.trustScore / 100) * circumference;
  const scoreColor = user.trustScore >= 80 ? '#10B981' : user.trustScore >= 60 ? '#F59E0B' : '#F87171';

  // Upcoming events (sorted, future first)
  const upcomingEvents = [...calendarEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const stats = [
    { label: 'Active Listings', value: activeListings.toString(), icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', glow: 'bg-indigo-200', link: '/marketplace' },
    { label: 'Completed Swaps', value: completedSwaps.toString(), icon: RefreshCcw, color: 'text-emerald-600', bg: 'bg-emerald-50', glow: 'bg-emerald-200', link: '/transactions' },
    { label: 'In Progress', value: inProgress.toString(), icon: Users, color: 'text-sky-600', bg: 'bg-sky-50', glow: 'bg-sky-200', link: '/transactions' },
    { label: 'Overdue', value: overdueCount.toString(), icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', glow: 'bg-red-200', link: '/transactions' },
  ];

  return (
    <>
      {/* ─── Welcome Header ─────────────────────────────────── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-brand-muted mt-1">Here's your campus dashboard for {monthNames[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          transition={sliceSpring}
          onClick={() => navigate('/marketplace')}
          className="bg-indigo-950 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-[0_0_15px_rgba(49,46,129,0.3)] transition-all hidden sm:flex items-center gap-2"
        >
          <Store className="w-3.5 h-3.5" />
          Browse Marketplace
        </motion.button>
      </div>

      {/* ─── Stats Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5, type: 'spring' }}
            whileHover={{ y: -3, scale: 1.02 }}
            onClick={() => navigate(stat.link)}
            className="glass-panel p-4 relative overflow-hidden group hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer border border-white/80"
          >
            <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 transition-transform duration-500 group-hover:scale-150 ${stat.glow}`} />
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} border border-white/60 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>{stat.value}</h3>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Row 1: Activity Chart + Trust Score ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Weekly Activity Area Chart (2/3 width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
          className="lg:col-span-2 glass-panel p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
              Campus Activity This Week
            </h3>
            <div className="flex items-center gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-brand-accent"></span>Listings</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Swaps</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500"></span>Borrows</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyActivity} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradListings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradSwaps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradBorrows" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.06)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="listings" stroke="#8B5CF6" fill="url(#gradListings)" strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="swaps" stroke="#10B981" fill="url(#gradSwaps)" strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="borrows" stroke="#0EA5E9" fill="url(#gradBorrows)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Trust Score Card (1/3 width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => navigate('/trust')}
          className="glass-panel p-5 flex flex-col items-center justify-center cursor-pointer hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all group"
        >
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Your Trust Score</p>
          <div className="relative w-28 h-28 mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={scoreRadius} fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r={scoreRadius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference - progress }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-black text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>{user.trustScore}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: scoreColor }} />
            <span className="text-xs font-bold" style={{ color: scoreColor }}>
              {user.trustScore >= 80 ? 'Highly Trusted' : user.trustScore >= 60 ? 'Trusted' : 'Building Trust'}
            </span>
          </div>

          {/* Mini breakdown bars */}
          <div className="w-full mt-4 space-y-2">
            {[
              { label: 'On-time', value: user.trustBreakdown.onTimeReturns, color: 'bg-emerald-500' },
              { label: 'Condition', value: user.trustBreakdown.conditionRatings, color: 'bg-sky-500' },
              { label: 'Trades', value: user.trustBreakdown.completedTrades, color: 'bg-brand-accent' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400 w-14 text-right">{b.label}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${b.value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                    className={`h-full rounded-full ${b.color}`}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-500 w-6">{b.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 mt-3 text-[10px] text-brand-muted group-hover:text-brand-accent transition-colors">
            <span className="font-semibold">View full profile</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>
      </div>

      {/* ─── Row 2: Calendar + Transaction Mix + Trust History ─ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {/* Mini Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
              <Calendar className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              {monthNames[calMonth]} {calYear}
            </h3>
            <div className="flex items-center gap-1">
              <button onClick={calPrev} className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={calNext} className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-0 mb-1">
            {dayLabels.map(d => (
              <div key={d} className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-0">
            {/* Empty cells for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isToday = dayNum === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
              const dayEvents = eventsByDate[dateStr] || [];
              const hasOverdue = dayEvents.some(e => e.type === 'overdue');

              return (
                <div key={dayNum} className="h-8 flex flex-col items-center justify-center relative">
                  <span className={`text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                    isToday
                      ? 'bg-indigo-950 text-white'
                      : dayEvents.length > 0
                      ? 'text-brand-slate'
                      : 'text-slate-400'
                  }`}>
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5 absolute -bottom-0.5">
                      {dayEvents.slice(0, 3).map((ev, j) => (
                        <span key={j} className={`w-1 h-1 rounded-full ${hasOverdue ? 'bg-red-500' : eventTypeConfig[ev.type].dotColor}`} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Transaction Mix Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-5"
        >
          <h3 className="text-sm font-bold text-brand-slate mb-2" style={{ fontFamily: 'Geist, sans-serif' }}>
            Transaction Mix
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={txnStatusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={65} innerRadius={38} paddingAngle={3} strokeWidth={0}>
                {txnStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-1">
            {txnStatusData.map(d => (
              <span key={d.status} className="flex items-center gap-1 text-[9px] font-bold text-slate-500 capitalize">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.status}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Trust Score History Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-5"
        >
          <h3 className="text-sm font-bold text-brand-slate mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
            Trust Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trustScoreHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 3, fill: '#8B5CF6', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ─── Row 3: Upcoming Events + Most Wanted ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

        {/* Upcoming Events Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
              Upcoming Events
            </h3>
            <button onClick={() => navigate('/transactions')} className="text-[10px] font-bold text-brand-accent hover:text-brand-accent-hover transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((ev, index) => {
              const config = eventTypeConfig[ev.type];
              const Icon = config.icon;
              const dateObj = new Date(ev.date);
              const isPast = dateObj < today;
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + index * 0.06, duration: 0.3 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isPast ? 'bg-red-50/50' : 'hover:bg-slate-50/50'}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    ev.type === 'overdue' ? 'bg-red-100' : ev.type === 'pickup' ? 'bg-sky-50' : ev.type === 'handover' ? 'bg-violet-50' : 'bg-amber-50'
                  }`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isPast ? 'text-red-600' : 'text-brand-slate'}`}>{ev.title}</p>
                    <p className="text-[10px] text-brand-muted mt-0.5">
                      with {ev.otherParty} · {dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                    ev.type === 'overdue' ? 'bg-red-50 text-red-700 border-red-200' :
                    ev.type === 'return_due' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    ev.type === 'pickup' ? 'bg-sky-50 text-sky-700 border-sky-200' :
                    'bg-violet-50 text-violet-700 border-violet-200'
                  }`}>
                    {ev.type.replace('_', ' ')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Most Wanted Items Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
              <Flame className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5 text-orange-500" />
              Most Wanted Items
            </h3>
            <button onClick={() => navigate('/marketplace')} className="text-[10px] font-bold text-brand-accent hover:text-brand-accent-hover transition-colors flex items-center gap-1">
              Browse all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-2 mb-2">
            <span className="col-span-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">#</span>
            <span className="col-span-5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Item</span>
            <span className="col-span-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Category</span>
            <span className="col-span-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Wanted</span>
          </div>

          {/* Table Rows */}
          <div className="space-y-1">
            {mostWanted.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.06, duration: 0.3 }}
                onClick={() => navigate('/marketplace')}
                className="grid grid-cols-12 gap-2 items-center px-2 py-2.5 rounded-xl hover:bg-slate-50/50 transition-colors cursor-pointer group"
              >
                <span className="col-span-1 text-xs font-black text-slate-300">{index + 1}</span>
                <div className="col-span-5 flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.ownerAvatar}&backgroundColor=0f172a&textColor=ffffff`}
                      alt={item.owner}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-brand-slate truncate group-hover:text-brand-accent transition-colors">{item.title}</span>
                </div>
                <span className="col-span-3 text-[10px] font-semibold text-brand-muted">{item.category}</span>
                <div className="col-span-3 flex items-center justify-end gap-1.5">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span className="text-xs font-black text-brand-slate">{item.wantedCount}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Row 4: Recent Transactions ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-panel p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
            Recent Transactions
          </h3>
          <button onClick={() => navigate('/transactions')} className="text-[10px] font-bold text-brand-accent hover:text-brand-accent-hover transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {mockTransactions.slice(0, 5).map((txn, index) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + index * 0.05, duration: 0.3 }}
              onClick={() => navigate('/transactions')}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${txn.otherPartyAvatar}&backgroundColor=0f172a&textColor=ffffff`}
                  alt={txn.otherParty}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand-slate truncate group-hover:text-brand-accent transition-colors">{txn.itemTitle}</p>
                <p className="text-[10px] text-brand-muted mt-0.5">
                  with {txn.otherParty} · {txn.createdDate}
                </p>
              </div>
              <StatusBadge status={txn.status} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
