import { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  PieChart,
} from 'lucide-react';
import HoldingsTable from './HoldingsTable';
import { TIMEFRAME_PORTFOLIO_DATA } from '../../data/marketData';

export default function PortfolioDashboard({
  cashBalance,
  holdings,
  onTradeHolding,
  onDepositFunds,
}) {
  const [timeframe, setTimeframe] = useState('1M');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Dynamic calculations
  const totalHoldingsValue = holdings.reduce(
    (acc, curr) => acc + curr.shares * curr.currentPrice,
    0
  );
  const totalCostBasis = holdings.reduce(
    (acc, curr) => acc + curr.shares * curr.avgBuyPrice,
    0
  );
  const netPortfolioValue = cashBalance + totalHoldingsValue;
  const totalPnLDollars = totalHoldingsValue - totalCostBasis;
  const totalPnLPercent = totalCostBasis > 0 ? (totalPnLDollars / totalCostBasis) * 100 : 0;
  const isProfit = totalPnLDollars >= 0;

  // Today's simulated change (~1.45%)
  const todayChangeDollars = totalHoldingsValue * 0.0145;
  const todayChangePercent = 1.45;

  // Chart data calculation
  const chartPoints = TIMEFRAME_PORTFOLIO_DATA[timeframe] || TIMEFRAME_PORTFOLIO_DATA['1M'];
  const values = chartPoints.map((p) => p.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 20;
  const paddingY = 24;

  const svgCoords = chartPoints.map((p, idx) => {
    const x = paddingX + (idx / (chartPoints.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - ((p.value - minVal) / valRange) * (chartHeight - paddingY * 2);
    return { ...p, x, y };
  });

  const pathLine = `M ${svgCoords.map((c) => `${c.x},${c.y}`).join(' L ')}`;
  const pathArea = `${pathLine} L ${chartWidth - paddingX},${chartHeight} L ${paddingX},${chartHeight} Z`;

  return (
    <section id="portfolio" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <PieChart className="w-3.5 h-3.5" />
              <span>Real-Time Portfolio Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Institutional Asset Dashboard
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Track multi-asset capital allocation, mark-to-market performance, unrealized P&L, and purchasing liquidity.
            </p>
          </div>

          <button
            type="button"
            onClick={onDepositFunds}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-blue-950/40 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <span>Deposit $10,000 Demo Funds</span>
          </button>
        </div>

        {/* Top 4 KPI Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Total Portfolio Value */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/90 relative overflow-hidden">
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Portfolio Value</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-2">
              ${netPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>All Assets + Liquid Reserves</span>
            </div>
          </div>

          {/* Card 2: Unrealized Profit / Loss */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/90 relative overflow-hidden">
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Unrealized P&L</div>
            <div
              className={`text-2xl sm:text-3xl font-extrabold font-mono mt-2 ${
                isProfit ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isProfit ? '+' : ''}${totalPnLDollars.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-semibold font-mono mt-2 ${
                isProfit ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isProfit ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>{isProfit ? '+' : ''}{totalPnLPercent.toFixed(2)}% Overall ROI</span>
            </div>
          </div>

          {/* Card 3: Today's Change */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/90 relative overflow-hidden">
            <div className="text-xs text-slate-400 uppercase font-semibold">Today's Session Change</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-2">
              +${todayChangeDollars.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold font-mono mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{todayChangePercent}% Session Delta</span>
            </div>
          </div>

          {/* Card 4: Liquid Cash Reserves */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800/90 relative overflow-hidden">
            <div className="text-xs text-slate-400 uppercase font-semibold">Available Purchasing Power</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400 mt-2">
              ${cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-2 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-blue-400" />
              <span>Instant Clearing Settlement</span>
            </div>
          </div>

        </div>

        {/* Portfolio Performance Chart Card */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800/90 shadow-2xl mb-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Portfolio Performance History
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold">
                  +23.4% Annualized
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mark-to-market performance curve versus benchmark index
              </p>
            </div>

            {/* Timeframe switchers */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold self-start sm:self-auto">
              {['1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => {
                    setTimeframe(tf);
                    setHoveredPoint(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    timeframe === tf
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="relative pt-6">
            
            {/* Hover Tooltip Header */}
            <div className="h-9 mb-2 flex items-center justify-between">
              {hoveredPoint ? (
                <div className="flex items-center gap-3 animate-in fade-in duration-150">
                  <div className="text-xs text-slate-400 font-mono">
                    Period: <strong className="text-white">{hoveredPoint.label}</strong>
                  </div>
                  <div className="text-lg font-bold font-mono text-emerald-400">
                    ${hoveredPoint.value.toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 font-mono">
                  Hover or tap chart points to inspect valuations ({timeframe}).
                </div>
              )}
            </div>

            {/* SVG Responsive Area Chart */}
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-56 overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="portfolioAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid lines */}
                {[0.25, 0.5, 0.75].map((pct, i) => (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={chartHeight * pct}
                    x2={chartWidth - paddingX}
                    y2={chartHeight * pct}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                ))}

                {/* Area under curve */}
                <path d={pathArea} fill="url(#portfolioAreaGrad)" />

                {/* Main line curve */}
                <path
                  d={pathLine}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {svgCoords.map((pt, idx) => (
                  <g
                    key={idx}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onClick={() => setHoveredPoint(pt)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      className="fill-blue-500 stroke-slate-900 stroke-2 group-hover:scale-150 group-hover:fill-emerald-400 transition-transform origin-center"
                    />
                    {/* Time label below */}
                    <text
                      x={pt.x}
                      y={chartHeight - 4}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-500 font-mono"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

          </div>

        </div>

        {/* Holdings Table */}
        <HoldingsTable holdings={holdings} onTradeHolding={onTradeHolding} />

      </div>
    </section>
  );
}
