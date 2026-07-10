import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getTransactionStatusCounts } from '../data/mockData';

export default function TransactionPieChart() {
  const data = getTransactionStatusCounts();

  return (
    <div className="glass-panel p-6">
      <h3 className="text-sm font-bold text-brand-slate mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
        Transaction Mix
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={45}
            paddingAngle={3}
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(226,232,240,0.8)',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              fontSize: '12px',
              fontWeight: 600,
            }}
          />
          <Legend
            formatter={(value: string) => (
              <span className="text-xs font-bold text-slate-500 capitalize">{value}</span>
            )}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
