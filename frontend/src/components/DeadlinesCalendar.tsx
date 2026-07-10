import { motion } from 'framer-motion';
import { calendarEvents, type CalendarEvent } from '../data/mockData';
import { AlertCircle, Clock, CalendarDays, ArrowRightLeft, Handshake } from 'lucide-react';

// Helper to sort events by date (closest first)
const sortedEvents = [...calendarEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export default function DeadlinesCalendar() {
  const getEventStyles = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'overdue':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          iconBg: 'bg-rose-100',
          iconColor: 'text-rose-600',
          textColor: 'text-rose-700',
          icon: AlertCircle
        };
      case 'return_due':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          textColor: 'text-amber-700',
          icon: Clock
        };
      case 'pickup':
        return {
          bg: 'bg-fuchsia-50',
          border: 'border-fuchsia-200',
          iconBg: 'bg-fuchsia-100',
          iconColor: 'text-fuchsia-600',
          textColor: 'text-fuchsia-700',
          icon: Handshake
        };
      case 'handover':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          iconBg: 'bg-sky-100',
          iconColor: 'text-sky-600',
          textColor: 'text-sky-700',
          icon: ArrowRightLeft
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          iconBg: 'bg-slate-100',
          iconColor: 'text-slate-600',
          textColor: 'text-slate-700',
          icon: CalendarDays
        };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    // Check if it's today or tomorrow for friendly labels
    const isToday = date.toDateString() === today.toDateString();
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';

    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="glass-panel p-6 rounded-[32px]">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5" /> Upcoming Deadlines
        </p>
      </div>

      <div className="space-y-4">
        {sortedEvents.map((event, idx) => {
          const styles = getEventStyles(event.type);
          const Icon = styles.icon;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`flex items-start gap-4 p-4 rounded-[20px] border ${styles.border} ${styles.bg} transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
                <Icon className={`w-5 h-5 ${styles.iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h4 className={`text-sm font-bold truncate ${styles.textColor}`}>{event.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap bg-white/60 ${styles.textColor} border ${styles.border}`}>
                    {formatDate(event.date)}
                  </span>
                </div>
                
                <p className="text-xs font-semibold text-slate-600 truncate mb-1">
                  {event.relatedItem}
                </p>
                
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-4 h-4 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-white">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${event.otherParty.substring(0, 2)}&backgroundColor=0f172a&textColor=ffffff`}
                      alt={event.otherParty}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">with {event.otherParty}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {sortedEvents.length === 0 && (
          <div className="text-center py-8">
            <CalendarDays className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-400">No upcoming deadlines.</p>
          </div>
        )}
      </div>
    </div>
  );
}
