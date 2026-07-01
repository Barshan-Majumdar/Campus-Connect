import React from 'react';
import type { TransactionType, ListingStatus } from '../../types';

// ── Transaction-type badge ────────────────────────────────────────────────
interface TransactionBadgeProps {
  type: TransactionType;
  size?: 'sm' | 'md';
}

export function TransactionBadge({ type, size = 'sm' }: TransactionBadgeProps) {
  const styles: Record<TransactionType, string> = {
    'Permanent Swap': 'bg-slate-100 text-slate-700 border-slate-200',
    'Temporary Borrow': 'bg-sky-50 text-sky-700 border-sky-200',
    'Free Giveaway': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  const sizeClass = size === 'md'
    ? 'text-xs px-3 py-1'
    : 'text-[10px] px-2.5 py-1';

  return (
    <span className={`font-bold rounded-full uppercase tracking-wider border ${styles[type]} ${sizeClass}`}>
      {type}
    </span>
  );
}

// ── Status badge ─────────────────────────────────────────────────────────
interface StatusBadgeProps {
  status: ListingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<ListingStatus, { label: string; cls: string }> = {
    available: { label: 'Available', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    requested: { label: 'Requested', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    unavailable: { label: 'Unavailable', cls: 'bg-red-50 text-red-600 border-red-200' },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border ${cls}`}>
      {label}
    </span>
  );
}

// ── Generic pill badge ────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
