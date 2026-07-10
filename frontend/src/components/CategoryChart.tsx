import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getCategoryCounts } from '../data/mockData';

const CATEGORY_COLORS: Record<string, string> = {
  Hardware: '#8B5CF6',   // brand-accent
  Academic: '#0EA5E9',   // sky-500
  Lab: '#10B981',        // emerald-500
};

export default function CategoryChart() {
  const data = getCategoryCounts();

  return (
    <div className="glass-panel p-6 mt-8">
      <h3 className="text-sm font-bold text-brand-slate mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
        Listings by Category
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.06)" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }}
            axisLine={{ stroke: 'rgba(15, 23, 42, 0.08)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748B' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
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
          <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={50}>
            {data.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || '#8B5CF6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
