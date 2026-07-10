import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Zap, Check, X, ShieldCheck, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import ChainDiagram from '../components/ChainDiagram';
import { mockMatches, type Match, type MatchType } from '../data/mockData';

export default function MatchesPage() {
  const [filter, setFilter] = useState<'all' | MatchType>('all');
  const [selectedMatchId, setSelectedMatchId] = useState<string>(mockMatches[0].id);

  // Derive matches based on filter
  const filteredMatches = useMemo(() => {
    let result = mockMatches;
    if (filter !== 'all') {
      result = result.filter(m => m.type === filter);
    }
    return result.sort((a, b) => b.matchScore - a.matchScore);
  }, [filter]);

  const selectedMatch = useMemo(() => {
    return mockMatches.find(m => m.id === selectedMatchId) || mockMatches[0];
  }, [selectedMatchId]);

  // If the filter removes the selected match, reset selection
  useMemo(() => {
    if (!filteredMatches.find(m => m.id === selectedMatchId) && filteredMatches.length > 0) {
      setSelectedMatchId(filteredMatches[0].id);
    }
  }, [filteredMatches, selectedMatchId]);

  return (
    <div className="h-full flex flex-col -m-4 sm:-m-6 lg:-m-8">
      {/* ─── Header ────────────────────────────────────────────── */}
      <div className="px-6 pt-8 pb-4 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50">
        <div>
          <h1 className="text-3xl font-black text-brand-slate tracking-tight" style={{ fontFamily: 'Geist, sans-serif' }}>
            Your Matches
          </h1>
          <p className="text-sm text-brand-muted mt-1">Algorithmically discovered trade opportunities</p>
        </div>

        {/* Filters */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'all' ? 'bg-white shadow-sm text-brand-accent' : 'text-slate-500 hover:text-brand-slate'}`}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilter('pairwise')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'pairwise' ? 'bg-white shadow-sm text-brand-accent' : 'text-slate-500 hover:text-brand-slate'}`}
          >
            Direct Swaps
          </button>
          <button
            onClick={() => setFilter('chain')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === 'chain' ? 'bg-white shadow-sm text-brand-accent' : 'text-slate-500 hover:text-brand-slate'}`}
          >
            Barter Chains
          </button>
        </div>
      </div>

      {/* ─── Main Content ──────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Left Sidebar (List) */}
        <div className={`w-full md:w-[360px] lg:w-[420px] flex-shrink-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${selectedMatchId && 'hidden md:block'}`}>
          <div className="p-4 md:pl-8 space-y-4">
            {filteredMatches.length === 0 ? (
              <div className="text-center py-10">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-400">No matches found.</p>
              </div>
            ) : (
              filteredMatches.map(match => {
                const isSelected = match.id === selectedMatchId;
                const you = match.participants.find(p => p.name === 'You');
                return (
                  <motion.div
                    key={match.id}
                    layoutId={`card-${match.id}`}
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`cursor-pointer rounded-[24px] p-5 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white shadow-md border border-brand-accent/50 ring-2 ring-brand-accent/20 -translate-y-0.5' 
                        : 'bg-white border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${match.type === 'chain' ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-accent/10 text-brand-accent'}`}>
                          {match.type === 'chain' ? <Shuffle className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-bold text-brand-slate">
                          {match.type === 'chain' ? 'Barter Chain' : 'Direct Swap'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100">
                        <span className="text-[10px] font-bold text-brand-accent">{match.matchScore}% Match</span>
                      </div>
                    </div>

                    {you && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 w-12 font-bold">Give:</span>
                          <span className="font-semibold text-brand-slate truncate">{you.gives}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 w-12 font-bold">Get:</span>
                          <span className="font-semibold text-brand-slate truncate">{you.receives}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {match.participants.filter(p => p.name !== 'You').map((p, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.avatar}&backgroundColor=0f172a&textColor=ffffff`} alt={p.name} className="w-full h-full" />
                          </div>
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        match.status === 'ready' ? 'text-emerald-500' :
                        match.actionRequired ? 'text-brand-accent' : 'text-slate-400'
                      }`}>
                        {match.status === 'ready' ? 'Ready to Trade' : match.actionRequired ? 'Action Needed' : 'Waiting on others'}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane (Details) */}
        <AnimatePresence mode="wait">
          {selectedMatch && (
            <motion.div
              key={selectedMatch.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] bg-white relative md:rounded-[40px] md:mx-6 lg:mx-8 md:mt-4 md:mb-10 lg:mb-12 border border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.05)]"
            >
              {/* Mobile Back Button */}
              <div className="md:hidden sticky top-0 bg-white/90 backdrop-blur-md z-10 p-4 border-b border-slate-100">
                <button 
                  onClick={() => setSelectedMatchId('')}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-slate"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to matches
                </button>
              </div>

              <div className="p-6 lg:p-10 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-brand-slate" style={{ fontFamily: 'Geist, sans-serif' }}>
                      {selectedMatch.type === 'chain' ? '3-Way Barter Chain' : '2-Way Direct Swap'}
                    </h2>
                    <p className="text-sm text-brand-muted mt-1">
                      {selectedMatch.status === 'ready' ? 'Everyone has accepted. Ready to meet.' : 'Review the proposed flow of items.'}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                    <span className="text-lg font-black text-brand-accent">{selectedMatch.matchScore}%</span>
                  </div>
                </div>

                {/* Diagram */}
                <div className="bg-white rounded-[40px] p-8 mb-8 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full mix-blend-multiply blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full mix-blend-multiply blur-3xl group-hover:scale-110 transition-transform duration-700" />
                  
                  <ChainDiagram 
                    participants={selectedMatch.participants.map(p => ({
                      name: p.name,
                      avatar: p.avatar,
                      item: p.gives
                    }))} 
                    status={selectedMatch.status === 'ready' ? 'completed' : 'active'}
                  />
                </div>

                {/* Participant Breakdown */}
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Trade Breakdown</h3>
                <div className="space-y-4 mb-8">
                  {selectedMatch.participants.map((p, i) => {
                    const isYou = p.name === 'You';
                    const receivesFrom = i === 0 ? selectedMatch.participants[selectedMatch.participants.length - 1] : selectedMatch.participants[i - 1];
                    
                    return (
                      <div key={i} className={`flex items-start gap-4 p-5 rounded-[24px] border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isYou ? 'bg-white border-brand-accent/50 shadow-[0_8px_30px_rgba(139,92,246,0.12)] ring-1 ring-brand-accent/20' : 'bg-white border-slate-300 shadow-sm'}`}>
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.avatar}&backgroundColor=0f172a&textColor=ffffff`} alt={p.name} className="w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-brand-slate">{p.name}</span>
                            {!isYou && (
                              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                                <ShieldCheck className="w-3 h-3" /> {p.trustScore} Trust
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="w-8 text-slate-400 font-medium">Gives:</span>
                              <span className="font-semibold text-brand-slate truncate">{p.gives}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="w-8 text-slate-400 font-medium">Gets:</span>
                              <span className="font-semibold text-brand-slate truncate">{p.receives}</span>
                              <span className="text-[10px] text-slate-400 truncate">(from {receivesFrom.name})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                  {selectedMatch.actionRequired ? (
                    <>
                      <button className="flex-1 bg-brand-accent text-white py-3 rounded-xl text-sm font-bold hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /> Accept Match
                      </button>
                      <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                        <X className="w-4 h-4" /> Decline
                      </button>
                    </>
                  ) : selectedMatch.status === 'ready' ? (
                    <button className="w-full bg-emerald-500 text-white py-3 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Message Participants
                    </button>
                  ) : (
                    <div className="w-full bg-slate-50 text-slate-500 py-3 rounded-xl text-sm font-bold text-center border border-slate-200">
                      Waiting for others to accept...
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
