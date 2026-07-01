import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Package } from 'lucide-react';
import type { AppNotification } from '../types';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  /** Anchor element to position the panel near */
  anchorRef?: React.RefObject<HTMLElement | null>;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}: NotificationsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute bottom-10 left-4 z-50 w-80 bg-white border border-slate-200 rounded-2xl shadow-[0_16px_50px_-10px_rgba(0,0,0,0.15)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-black text-brand-slate">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-black bg-brand-accent text-white px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="flex items-center gap-1 text-[10px] font-bold text-brand-muted hover:text-brand-accent transition-colors cursor-pointer border-none bg-transparent"
              >
                <CheckCheck className="w-3 h-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <Package className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-bold">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 last:border-0 transition-colors ${
                    !notif.read ? 'bg-indigo-50/40' : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Unread dot */}
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-brand-accent' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-brand-slate leading-snug">{notif.title}</p>
                    <p className="text-[11px] font-medium text-brand-muted mt-0.5 leading-snug">{notif.body}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{timeAgo(notif.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
