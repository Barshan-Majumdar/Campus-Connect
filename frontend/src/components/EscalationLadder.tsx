import { CheckCircle2, AlertCircle, Clock, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

interface EscalationLadderProps {
  overdueDays: number;
}

const stages = [
  { label: 'Reminder Sent', description: 'Return reminder sent to borrower', icon: Clock, threshold: 0 },
  { label: 'Due Today', description: 'Item is due for return today', icon: AlertCircle, threshold: 0 },
  { label: '+3 Days Overdue', description: '3 days past due date', icon: AlertCircle, threshold: 3 },
  { label: 'Requests Frozen', description: 'New requests blocked until resolved', icon: Ban, threshold: 7 },
];

function getActiveStage(overdueDays: number): number {
  if (overdueDays >= 7) return 3;
  if (overdueDays >= 3) return 2;
  if (overdueDays >= 1) return 1;
  return 0;
}

export default function EscalationLadder({ overdueDays }: EscalationLadderProps) {
  const activeStage = getActiveStage(overdueDays);

  return (
    <div className="flex flex-col gap-0">
      {stages.map((stage, index) => {
        const isCompleted = index < activeStage;
        const isActive = index === activeStage;
        const isFuture = index > activeStage;
        const Icon = stage.icon;

        return (
          <div key={stage.label} className="flex items-start gap-3">
            {/* Vertical line + icon */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-600'
                    : isActive
                    ? 'bg-brand-accent/10 text-brand-accent ring-2 ring-brand-accent/30'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </motion.div>
              {index < stages.length - 1 && (
                <div
                  className={`w-[2px] h-8 ${
                    isCompleted ? 'bg-emerald-300' : isActive ? 'bg-brand-accent/30' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>

            {/* Label */}
            <div className="pt-0.5 pb-4">
              <p
                className={`text-xs font-bold ${
                  isCompleted
                    ? 'text-emerald-700'
                    : isActive
                    ? 'text-brand-accent'
                    : 'text-slate-400'
                }`}
              >
                {stage.label}
              </p>
              <p
                className={`text-[10px] mt-0.5 ${
                  isFuture ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {stage.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
