import { motion } from 'framer-motion';

interface Participant {
  name: string;
  avatar: string;
  item: string;
}

interface ChainDiagramProps {
  participants: Participant[];
  status?: 'active' | 'completed' | 'pending';
}

export default function ChainDiagram({ participants, status = 'active' }: ChainDiagramProps) {
  const n = participants.length;
  const cx = 150;
  const cy = 120;
  const radius = 80;
  const nodeRadius = 28;

  const strokeColor =
    status === 'completed' ? '#10B981' : status === 'active' ? '#8B5CF6' : '#94A3B8';

  // Calculate node positions around a circle
  const positions = participants.map((_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  // Draw curved arrows between consecutive participants
  const arrows = participants.map((p, i) => {
    const from = positions[i];
    const to = positions[(i + 1) % n];

    // Midpoint + offset for curve
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const curveOffset = 20;
    const perpX = -dy / Math.sqrt(dx * dx + dy * dy) * curveOffset;
    const perpY = dx / Math.sqrt(dx * dx + dy * dy) * curveOffset;

    const controlX = midX + perpX;
    const controlY = midY + perpY;

    const path = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;

    return { path, item: p.item, controlX, controlY, index: i };
  });

  return (
    <div className="flex justify-center">
      <svg width="300" height="260" viewBox="0 0 300 260" className="overflow-visible">
        <defs>
          <marker
            id={`arrowhead-${status}`}
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={strokeColor} />
          </marker>
        </defs>

        {/* Arrows */}
        {arrows.map((arrow) => (
          <motion.path
            key={`arrow-${arrow.index}`}
            d={arrow.path}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2}
            strokeDasharray="6 3"
            markerEnd={`url(#arrowhead-${status})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3 + arrow.index * 0.2, duration: 0.6, ease: 'easeInOut' }}
          />
        ))}

        {/* Arrow labels (item names) */}
        {arrows.map((arrow) => (
          <text
            key={`label-${arrow.index}`}
            x={arrow.controlX}
            y={arrow.controlY - 8}
            textAnchor="middle"
            className="fill-slate-500 text-[8px] font-semibold"
          >
            {arrow.item.length > 18 ? arrow.item.slice(0, 16) + '…' : arrow.item}
          </text>
        ))}

        {/* Nodes */}
        {participants.map((p, i) => (
          <motion.g
            key={`node-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Node background */}
            <circle
              cx={positions[i].x}
              cy={positions[i].y}
              r={nodeRadius}
              fill="white"
              stroke={strokeColor}
              strokeWidth={2}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
            />
            {/* Avatar */}
            <clipPath id={`clip-${i}`}>
              <circle cx={positions[i].x} cy={positions[i].y} r={nodeRadius - 4} />
            </clipPath>
            <image
              href={`https://api.dicebear.com/7.x/initials/svg?seed=${p.avatar}&backgroundColor=0f172a&textColor=ffffff`}
              x={positions[i].x - nodeRadius + 4}
              y={positions[i].y - nodeRadius + 4}
              width={(nodeRadius - 4) * 2}
              height={(nodeRadius - 4) * 2}
              clipPath={`url(#clip-${i})`}
            />
            {/* Name label below */}
            <text
              x={positions[i].x}
              y={positions[i].y + nodeRadius + 14}
              textAnchor="middle"
              className="fill-brand-slate text-[10px] font-bold"
            >
              {p.name}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
