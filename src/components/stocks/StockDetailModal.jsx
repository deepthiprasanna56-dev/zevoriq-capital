import { useState } from 'react';
import Modal from '../common/Modal';
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Star,
} from 'lucide-react';
import Sparkline from '../common/Sparkline';

export default function StockDetailModal({
  isOpen,
  onClose,
  stock,
  isWatchlisted,
  onToggleWatchlist,
  onTrade,
}) {
  const [activeRange, setActiveRange] = useState('1D');

  if (!stock) return null;

  const isPositive = stock.changePercent >= 0;

  // Timeframe sparklines
  const defaultSpark = stock.sparkline || [132.5, 133.8, 135.2, 134.6, 136.9, 137.5, 138.25];
  const timeframeData = {
    '1D': defaultSpark,
    '1W': [stock.price * 0.94, stock.price * 0.96, stock.price * 0.95, stock.price * 0.98, stock.price * 0.97, stock.price],
    '1M': [stock.price * 0.88, stock.price * 0.91, stock.price * 0.89, stock.price * 0.94, stock.price * 0.97, stock.price],
    '1Y': [stock.price * 0.65, stock.price * 0.72, stock.price * 0.82, stock.price * 0.89, stock.price * 0.95, stock.price],
  };

  const currentSparkline = timeframeData[activeRange] || defaultSpark;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              {stock.logo}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {stock.symbol}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
                  {stock.sector}
                </span>
              </div>
              <p className="text-sm text-slate-400">{stock.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleWatchlist(stock.symbol)}
              className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isWatchlisted
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Price & Change Banner */}
        <div className="flex flex-wrap items-end justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 gap-4">
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold">Live Market Price</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              ${stock.price.toFixed(2)}
            </div>
          </div>

          <div className="text-right">
            <div
              className={`inline-flex items-center gap-1.5 text-base font-bold font-mono ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              <span>
                {isPositive ? '+' : ''}
                {stock.change.toFixed(2)} ({isPositive ? '+' : ''}
                {stock.changePercent}%)
              </span>
            </div>
            <div className="text-xs text-slate-500 font-mono">Today's Session Change</div>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-blue-400" />
              <span>Session Depth & Trend Curve ({activeRange})</span>
            </span>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              {['1D', '1W', '1M', '1Y'].map((rng) => (
                <button
                  key={rng}
                  type="button"
                  onClick={() => setActiveRange(rng)}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    activeRange === rng
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {rng}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-44 flex items-center justify-center pt-2">
            <Sparkline
              data={currentSparkline}
              isPositive={isPositive}
              width={560}
              height={140}
            />
          </div>
        </div>

        {/* Key Fundamental Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-500 uppercase font-sans">Market Cap</div>
            <div className="text-sm font-bold text-white mt-0.5">{stock.marketCap}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-500 uppercase font-sans">P/E Ratio</div>
            <div className="text-sm font-bold text-white mt-0.5">{stock.peRatio || '32.4'}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-500 uppercase font-sans">Analyst Consensus</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{stock.analystRating || 'Strong Buy'}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-500 uppercase font-sans">Target Price</div>
            <div className="text-sm font-bold text-blue-400 mt-0.5">${stock.targetPrice?.toFixed(2) || '175.00'}</div>
          </div>
        </div>

        {/* Company Description */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          <div className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
            Company Intelligence Overview
          </div>
          {stock.description}
        </div>

        {/* Modal Action CTA */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onTrade(stock, 'buy');
            }}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-950/40 cursor-pointer"
          >
            Execute Buy Order
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onTrade(stock, 'sell');
            }}
            className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-rose-950/40 cursor-pointer"
          >
            Execute Sell Order
          </button>
        </div>
      </div>
    </Modal>
  );
}
