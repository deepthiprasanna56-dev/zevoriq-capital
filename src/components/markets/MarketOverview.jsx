import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye,
} from 'lucide-react';
import Sparkline from '../common/Sparkline';

export default function MarketOverview({ indices = [], onSelectAsset }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Markets' },
    { id: 'us', label: 'US Equities' },
    { id: 'global', label: 'Global Indices' },
    { id: 'crypto', label: 'Crypto Assets' },
    { id: 'commodities', label: 'Commodities' },
  ];

  const filtered = activeCategory === 'all'
    ? indices
    : indices.filter((item) => item.category === activeCategory);

  return (
    <section id="markets" className="py-20 relative border-t border-slate-800/80">
      <div className="w-full px-0">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Index Feed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Global Market Overview
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Track multi-asset global benchmarks, sovereign yields, spot energy, and digital currencies with live depth metrics.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Indices Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectAsset && onSelectAsset(item)}
                className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer relative overflow-hidden group transition-all"
              >
                {/* Top Row: Symbol, Category, Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base tracking-tight group-hover:text-blue-400 transition">
                      {item.symbol}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                      {item.category}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'Market Open' || item.status === '24/7 Live'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                        : 'bg-slate-800/80 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Market Open' || item.status === '24/7 Live'
                          ? 'bg-emerald-400 animate-pulse'
                          : 'bg-slate-500'
                      }`}
                    />
                    {item.status}
                  </span>
                </div>

                {/* Subtitle Name */}
                <div className="text-xs text-slate-400 mb-4 truncate font-medium">
                  {item.name}
                </div>

                {/* Price and Percentage Row */}
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-2xl font-mono font-bold text-white tracking-tight">
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold mt-1 font-mono ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {item.change.toFixed(2)} ({isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  {/* Sparkline Visual */}
                  <div className="shrink-0">
                    <Sparkline
                      data={item.sparkline}
                      isPositive={isPositive}
                      width={100}
                      height={36}
                    />
                  </div>
                </div>

                {/* Bottom stats: High / Low / Volume */}
                <div className="mt-4 pt-3 border-t border-slate-800/70 grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">24h High</span>
                    <span className="text-slate-200 font-semibold">${item.high.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">24h Low</span>
                    <span className="text-slate-200 font-semibold">${item.low.toLocaleString()}</span>
                  </div>
                  <div className="text-right flex flex-col justify-between items-end">
                    <span className="text-[10px] text-slate-500 block uppercase">Vol</span>
                    <span className="text-slate-200 font-semibold">{item.volume}</span>
                  </div>
                </div>

                {/* Click pill */}
                <div className="mt-3 pt-2 text-[10px] text-blue-400 font-medium flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3" />
                  <span>Inspect Asset</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
