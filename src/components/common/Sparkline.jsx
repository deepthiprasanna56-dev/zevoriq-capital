import { useId } from 'react';

export default function Sparkline({ data = [], isPositive = true, width = 110, height = 36 }) {
  const gradientId = useId().replace(/:/g, '');

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Add vertical padding so lines don't hit edges
  const padding = 4;
  const usableHeight = height - padding * 2;

  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - padding - ((val - min) / range) * usableHeight;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  const strokeColor = isPositive ? '#dfb15b' : '#f43f5e';

  return (
    <svg width={width} height={height} className="overflow-visible inline-block">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradientId})`} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
