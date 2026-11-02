import { useState } from 'react';
import {
  Star,
  Plus,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye,
} from 'lucide-react';
import Sparkline from '../common/Sparkline';

export default function WatchlistSection({
  stocks = [],
  watchlistSymbols = [],
  onToggleWatchlist,
  onTradeStock,
  onOpenStockDetail,
  isLiveSimulationActive,
  onToggleLiveSimulation,
}) {
  const [selectedAddSymbol, setSelectedAddSymbol] = useState('');

  // Get full stock objects in watchlist
  const watchlistedStocks = stocks.filter((s) => watchlistSymbols.includes(s.symbol));

  // Stocks not yet in watchlist for easy adding
  const unwatchlistedStocks = stocks.filter((s) => !watchlistSymbols.includes(s.symbol));

  const handleAddStock = () => {
    if (!selectedAddSymbol) return;
    onToggleWatchlist(selectedAddSymbol);
    setSelectedAddSymbol('');
  };

  return (
    <section id="watchlist" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
              <span>Personalized Watchlist</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Monitored Equities & Alerts
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Pin your key market securities for zero-latency monitoring, price change alerts, and instant execution.
            </p>
          </div>

          {/* Add Stock to Watchlist & Live Sim Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Price Simulation Toggle */}
            <button
              onClick={onToggleLiveSimulation}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition ${
                isLiveSimulationActive
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle simulated price ticks"
            >
              <Activity className={`w-3.5 h-3.5 ${isLiveSimulationActive ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>Live Tick Sim: {isLiveSimulationActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Quick Add Select */}
            {unwatchlistedStocks.length > 0 && (
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1">
                <select
                  value={selectedAddSymbol}
                  onChange={(e) => setSelectedAddSymbol(e.target.value)}
                  className="bg-transparent text-xs text-slate-300 px-2 py-1 focus:outline-none cursor-pointer"
                >
                  <option value="">Select stock to pin...</option>
                  {unwatchlistedStocks.map((s) => (
                    <option key={s.symbol} value={s.symbol} className="bg-slate-900 text-white">
                      {s.symbol} - {s.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddStock}
                  disabled={!selectedAddSymbol}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Pin</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Watchlist Cards Grid */}
        {watchlistedStocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {watchlistedStocks.map((stock) => {
              const isPositive = stock.changePercent >= 0;

              return (
                <div
                  key={stock.symbol}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Symbol, Logo, Unpin button */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                          {stock.logo}
                        </span>
                        <div>
                          <div className="font-extrabold text-white text-base group-hover:text-blue-400 transition">
                            {stock.symbol}
                          </div>
                          <div className="text-xs text-slate-400 truncate max-w-[120px]">
                            {stock.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onOpenStockDetail(stock)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
                          title="View Chart"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleWatchlist(stock.symbol)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition"
                          title="Remove from Watchlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price and Percentage */}
                    <div className="flex items-end justify-between my-3">
                      <div>
                        <div className="text-2xl font-bold font-mono text-white">
                          ${stock.price.toFixed(2)}
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs font-semibold font-mono mt-0.5 ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          <span>
                            {isPositive ? '+' : ''}
                            {stock.change.toFixed(2)} ({isPositive ? '+' : ''}
                            {stock.changePercent}%)
                          </span>
                        </div>
                      </div>

                      <Sparkline
                        data={stock.sparkline}
                        isPositive={isPositive}
                        width={90}
                        height={32}
                      />
                    </div>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex gap-2">
                    <button
                      onClick={() => onTradeStock(stock, 'buy')}
                      className="flex-1 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-950/40"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => onTradeStock(stock, 'sell')}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-slate-800 p-12 text-center text-slate-500">
            <Star className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">Your Watchlist is Empty</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Star stocks from the Stock Market section or select a symbol from the dropdown above to start tracking.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
