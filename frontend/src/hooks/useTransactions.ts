import { useState, useCallback, useMemo } from 'react';
import { mockTransactions, type Transaction, type TransactionStatus } from '../data/mockData';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all');

  const filteredTransactions = useMemo(() => {
    if (statusFilter === 'all') return transactions;
    return transactions.filter((t) => t.status === statusFilter);
  }, [transactions, statusFilter]);

  const updateStatus = useCallback((id: string, newStatus: TransactionStatus) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        return {
          ...t,
          status: newStatus,
          completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : t.completedDate,
        };
      })
    );
  }, []);

  const cancelTransaction = useCallback((id: string) => {
    updateStatus(id, 'cancelled');
  }, [updateStatus]);

  const setHandoverPoint = useCallback((id: string, point: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, handoverPoint: point } : t))
    );
  }, []);

  const filterByStatus = useCallback((status: TransactionStatus | 'all') => {
    setStatusFilter(status);
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of transactions) {
      counts[t.status] = (counts[t.status] || 0) + 1;
    }
    return counts;
  }, [transactions]);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    statusFilter,
    statusCounts,
    filterByStatus,
    updateStatus,
    cancelTransaction,
    setHandoverPoint,
  };
}
