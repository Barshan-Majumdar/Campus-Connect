import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { MapPin, XCircle, AlertTriangle, ArrowRight, ShieldCheck, Check, Truck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../components/Badge';
import EscalationLadder from '../components/EscalationLadder';
import TransactionPieChart from '../components/TransactionPieChart';
import EmptyState from '../components/EmptyState';
import { useTransactions } from '../hooks/useTransactions';
import { handoverPoints, type TransactionStatus } from '../data/mockData';

const statusTabs: { value: TransactionStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'requested', label: 'Requested' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'completed', label: 'Completed' },
  { value: 'overdue', label: 'Overdue' },
];

const lifecycleSteps = ['requested', 'accepted', 'in_transit', 'completed'];

export default function TransactionsPage() {
  const {
    transactions,
    statusFilter,
    filterByStatus,
    updateStatus,
    cancelTransaction,
    setHandoverPoint,
  } = useTransactions();

  // If there's no transaction selected, select the first one in the filtered list
  const [selectedTxnId, setSelectedTxnId] = useState<string>('');
  
  const sliceSpring: Transition = { type: 'spring', stiffness: 500, damping: 35, mass: 0.8 };

  const selectedTxn = useMemo(() => {
    return transactions.find(t => t.id === selectedTxnId) || transactions[0];
  }, [transactions, selectedTxnId]);

  // Ensure selectedTxnId is valid for current filter
  useMemo(() => {
    if (transactions.length > 0 && !transactions.find(t => t.id === selectedTxnId)) {
      setSelectedTxnId(transactions[0].id);
    }
  }, [transactions, selectedTxnId]);

  return (
    <div className="h-full flex flex-col -m-4 sm:-m-6 lg:-m-8">
      {/* ─── Header ────────────────────────────────────────────── */}
      <div className="px-6 pt-8 pb-4 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50">
        <div>
          <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
            Transactions
          </h1>
          <p className="text-sm text-brand-muted mt-1">Track your active and past exchanges</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="bg-slate-200/60 p-1.5 flex rounded-full relative overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="flex w-max">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => filterByStatus(tab.value)}
                className={`relative px-5 py-2 text-xs font-bold rounded-full transition-colors z-10 whitespace-nowrap ${
                  statusFilter === tab.value
                    ? 'text-white'
                    : 'text-slate-500 hover:text-indigo-900'
                }`}
              >
                {statusFilter === tab.value && (
                  <motion.div
                    layoutId="txnTabIndicator"
                    className="absolute inset-0 bg-indigo-950 rounded-full shadow-[0_0_10px_rgba(49,46,129,0.2)]"
                    initial={false}
                    transition={sliceSpring}
                    style={{ zIndex: -1 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Content ──────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Left Sidebar (List) */}
        <div className={`w-full md:w-[360px] lg:w-[420px] flex-shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${selectedTxn && 'hidden md:block'}`}>
          <div className="p-4 md:pl-8 pb-8 space-y-4">
            {transactions.length === 0 ? (
              <EmptyState
                title="No transactions here"
                description="When you request or receive items, they'll show up here."
              />
            ) : (
              transactions.map(txn => {
                const isSelected = txn.id === (selectedTxn?.id || '');
                const isOverdue = txn.status === 'overdue';

                return (
                  <motion.div
                    key={txn.id}
                    layoutId={`txn-${txn.id}`}
                    onClick={() => setSelectedTxnId(txn.id)}
                    className={`cursor-pointer rounded-[24px] p-4 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white shadow-md border border-brand-accent/50 ring-2 ring-brand-accent/20 -translate-y-0.5' 
                        : 'bg-white border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                    } ${isOverdue && !isSelected ? 'border-red-200 bg-red-50/50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${txn.otherPartyAvatar}&backgroundColor=0f172a&textColor=ffffff`}
                          alt={txn.otherParty}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-slate truncate">{txn.itemTitle}</p>
                        <p className="text-xs text-brand-muted truncate">
                          with <span className="font-semibold">{txn.otherParty}</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <StatusBadge status={txn.status} />
                      <span className="text-[10px] font-bold text-slate-400">{txn.createdDate}</span>
                    </div>
                  </motion.div>
                );
              })
            )}

            {/* Pie Chart at the bottom of the list */}
            {transactions.length > 0 && (
              <div className="mt-8">
                <TransactionPieChart />
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Details) */}
        <AnimatePresence mode="wait">
          {selectedTxn && (
            <motion.div
              key={selectedTxn.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] bg-white relative md:rounded-[40px] md:mx-6 lg:mx-8 md:mt-4 md:mb-10 lg:mb-12 border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
            >
              {/* Mobile Back Button */}
              <div className="md:hidden sticky top-0 bg-white/90 backdrop-blur-md z-10 p-4 border-b border-slate-100">
                <button 
                  onClick={() => setSelectedTxnId('')}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-slate"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to list
                </button>
              </div>

              <div className="p-6 lg:p-10 max-w-3xl mx-auto">
                
                {/* Header & Status */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-[24px] bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedTxn.otherPartyAvatar}&backgroundColor=0f172a&textColor=ffffff`}
                        alt={selectedTxn.otherParty}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-brand-slate leading-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
                        {selectedTxn.itemTitle}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-slate-500">with {selectedTxn.otherParty}</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          <ShieldCheck className="w-3 h-3" /> 88 Trust
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <StatusBadge status={selectedTxn.status} />
                    <span className="text-xs font-bold text-brand-slate bg-brand-accent/5 px-3 py-1 rounded-full text-brand-accent">
                      {selectedTxn.transactionType}
                    </span>
                  </div>
                </div>

                {/* Progress Tracker */}
                {!['cancelled', 'overdue'].includes(selectedTxn.status) && (
                  <div className="mb-10">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Transaction Progress</h3>
                    <div className="flex items-center w-full justify-between relative">
                      {/* Background Track */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0" />
                      
                      {/* Active Track */}
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-accent rounded-full z-0 transition-all duration-500"
                        style={{ 
                          width: `${(lifecycleSteps.indexOf(selectedTxn.status) / (lifecycleSteps.length - 1)) * 100}%` 
                        }} 
                      />

                      {lifecycleSteps.map((step, idx) => {
                        const isCompleted = lifecycleSteps.indexOf(selectedTxn.status) > idx;
                        const isCurrent = selectedTxn.status === step;
                        const isFuture = lifecycleSteps.indexOf(selectedTxn.status) < idx;

                        return (
                          <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted ? 'bg-brand-accent text-white' :
                              isCurrent ? 'bg-white text-brand-accent ring-2 ring-brand-accent' :
                              'bg-white text-slate-300 border-2 border-slate-200'
                            }`}>
                              {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                            <span className={`text-[10px] font-bold capitalize absolute top-10 whitespace-nowrap ${
                              isCurrent ? 'text-brand-accent' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                            }`}>
                              {step.replace('_', ' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Overdue Escalation */}
                {selectedTxn.status === 'overdue' && (
                  <div className="bg-red-50 border border-red-100 rounded-3xl p-6 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-red-900">Overdue Resolution</h3>
                        <p className="text-xs text-red-700 font-medium">Item was due back {selectedTxn.overdueDays} days ago</p>
                      </div>
                    </div>
                    <EscalationLadder overdueDays={selectedTxn.overdueDays} />
                  </div>
                )}

                {/* Handover Details */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-8 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center shadow-sm">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Handover Point</h3>
                      {selectedTxn.handoverPoint ? (
                        <p className="text-sm font-semibold text-brand-slate">{selectedTxn.handoverPoint}</p>
                      ) : (
                        <p className="text-sm font-semibold text-slate-400">Not set yet</p>
                      )}
                    </div>
                  </div>
                  
                  {!selectedTxn.handoverPoint && ['requested', 'accepted'].includes(selectedTxn.status) && (
                    <select
                      onChange={(e) => setHandoverPoint(selectedTxn.id, e.target.value)}
                      defaultValue=""
                      className="w-full bg-white px-4 py-3 text-sm font-medium text-brand-slate rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="" disabled>Select a meeting location...</option>
                      {handoverPoints.map((hp) => (
                        <option key={hp.id} value={hp.name}>{hp.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Created</span>
                    <span className="text-sm font-semibold text-brand-slate">{selectedTxn.createdDate}</span>
                  </div>
                  {(selectedTxn.dueDate || selectedTxn.completedDate) && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {selectedTxn.completedDate ? 'Completed' : 'Due Date'}
                      </span>
                      <span className={`text-sm font-semibold ${selectedTxn.status === 'overdue' ? 'text-red-600' : 'text-brand-slate'}`}>
                        {selectedTxn.completedDate || selectedTxn.dueDate}
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Actions Anchored */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                  {selectedTxn.status === 'requested' && (
                    <>
                      <button 
                        onClick={() => updateStatus(selectedTxn.id, 'accepted')}
                        className="flex-1 bg-indigo-950 text-white py-4 rounded-2xl text-sm font-bold hover:shadow-[0_0_20px_rgba(49,46,129,0.3)] transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Accept Request
                      </button>
                      <button 
                        onClick={() => cancelTransaction(selectedTxn.id)}
                        className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  )}
                  {selectedTxn.status === 'accepted' && (
                    <>
                      <button 
                        onClick={() => updateStatus(selectedTxn.id, 'in_transit')}
                        className="flex-1 bg-brand-accent text-white py-4 rounded-2xl text-sm font-bold hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
                      >
                        <Truck className="w-4 h-4" /> Mark In Transit
                      </button>
                      <button 
                        onClick={() => cancelTransaction(selectedTxn.id)}
                        className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  )}
                  {selectedTxn.status === 'in_transit' && (
                    <button 
                      onClick={() => updateStatus(selectedTxn.id, 'completed')}
                      className="w-full bg-emerald-500 text-white py-4 rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Mark Completed
                    </button>
                  )}
                  {selectedTxn.status === 'overdue' && (
                    <button 
                      className="w-full border border-red-200 text-red-600 bg-white py-4 rounded-2xl text-sm font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <AlertTriangle className="w-5 h-5" /> Report Issue to Admin
                    </button>
                  )}
                  {['completed', 'cancelled'].includes(selectedTxn.status) && (
                    <div className="w-full bg-slate-50 text-slate-500 py-4 rounded-2xl text-sm font-bold text-center border border-slate-200">
                      This transaction is closed.
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
