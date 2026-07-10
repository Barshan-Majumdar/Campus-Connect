import type { TransactionStatus } from '../data/mockData';

interface StatusBadgeProps {
  status: TransactionStatus;
}

const statusConfig: Record<TransactionStatus, { bg: string; text: string; border: string; label: string }> = {
  requested: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', label: 'Requested' },
  accepted: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', label: 'Accepted' },
  in_transit: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'In Transit' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Completed' },
  overdue: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Overdue' },
  cancelled: { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', label: 'Cancelled' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  );
}

interface CountBadgeProps {
  count: number;
}

export function CountBadge({ count }: CountBadgeProps) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-brand-accent text-white text-[9px] font-bold px-1 border-2 border-white shadow-sm">
      {count > 99 ? '99+' : count}
    </span>
  );
}
