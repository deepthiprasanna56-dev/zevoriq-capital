import { useState } from 'react';
import {
  TrendingUp,
  Search,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Eye,
  X,
} from 'lucide-react';
import Sparkline from '../common/Sparkline';

export default function StockMarket({
  stocks = [],
  watchlistSymbols = [],
  onToggleWatchlist,
  onTradeStock,
  onOpenStockDetail,
}) {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'gainers' | 'losers' | 'price'

  const sectors = ['All', 'Semiconductors & AI', 'Consumer Electronics', 'Cloud & Enterprise AI', 'Automotive & Clean Tech', 'Banking & Financials'];

  // Filter logic
  let filtered = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase()) ||
      stock.sector.toLowerCase().includes(search.toLowerCase());
    const matchesSector =
      selectedSector === 'All' || stock.sector.includes(selectedSector);
    return matchesSearch && matchesSector;
  });

  // Sort logic
  if (sortBy === 'gainers') {
    filtered = [...filtered].sort((a, b) => b.changePercent - a.changePercent);
  } else if (sortBy === 'losers') {
    filtered = [...filtered].sort((a, b) => a.changePercent - b.changePercent);
  } else if (sortBy === 'price') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <section id="stocks" className="py-20 relative border-t border-slate-800/80">
      <div className="w-full px-0">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Equities & Spot Markets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Popular & Trending Stocks
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Execute direct equity orders with zero commission, high-frequency limit routing, and institutional market depth.
            </p>
          </div>

          {/* Controls: Search, Sort & View Mode */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter stocks..."
                className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  title="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="popular">Sort: Default</option>
              <option value="gainers">Top Gainers (%)</option>
              <option value="losers">Top Losers (%)</option>
              <option value="price">Highest Price</option>
            </select>

            {/* Grid / Table Toggle */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Pro Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {sectors.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSector === sec
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* View Mode 1: Grid Cards View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              const isWatchlisted = watchlistSymbols.includes(stock.symbol);

              return (
                <div
                  key={stock.symbol}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top line: Logo, Symbol, Watchlist Button */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                          {stock.logo}
                        </span>
                        <div>
                          <div className="font-extrabold text-white text-base group-hover:text-blue-400 transition flex items-center gap-1.5">
                            {stock.symbol}
                          </div>
                          <div className="text-xs text-slate-400 truncate max-w-[130px]">
                            {stock.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onOpenStockDetail(stock)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                          title="View Chart & Analysis"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleWatchlist(stock.symbol)}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            isWatchlisted
                              ? 'text-amber-400 bg-amber-400/10'
                              : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                          }`}
                          title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                          <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Sector Tag */}
                    <div className="mb-4">
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700/40">
                        {stock.sector}
                      </span>
                    </div>

                    {/* Price & Sparkline */}
                    <div className="flex items-end justify-between my-2">
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

                  {/* Buy / Sell Quick Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onTradeStock(stock, 'buy')}
                      className="py-2 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-950/40 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => onTradeStock(stock, 'sell')}
                      className="py-2 bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-rose-950/40 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Sell
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View Mode 2: Pro Data Table View */
          <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase text-[11px] font-sans">
                  <tr>
                    <th className="py-3.5 px-4">Asset</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">24h Change</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">24h Range</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Volume</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Market Cap</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Trend</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filtered.map((stock) => {
                    const isPositive = stock.changePercent >= 0;
                    const isWatchlisted = watchlistSymbols.includes(stock.symbol);

                    return (
                      <tr
                        key={stock.symbol}
                        className="hover:bg-slate-800/50 transition duration-150"
                      >
                        {/* Asset info */}
                        <td className="py-3.5 px-4 font-sans">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{stock.logo}</span>
                            <div>
                              <div className="font-extrabold text-white text-sm flex items-center gap-2">
                                {stock.symbol}
                                <span className="text-[10px] text-slate-400 font-mono font-normal hidden xl:inline">
                                  {stock.sector}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400">{stock.name}</div>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-4 font-bold text-white text-sm">
                          ${stock.price.toFixed(2)}
                        </td>

                        {/* 24h Change */}
                        <td className="py-3.5 px-4">
                          <div
                            className={`inline-flex items-center gap-1 font-semibold ${
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
                              {stock.changePercent}%
                            </span>
                          </div>
                        </td>

                        {/* Range */}
                        <td className="py-3.5 px-4 hidden md:table-cell text-slate-400">
                          ${stock.low24} - ${stock.high24}
                        </td>

                        {/* Volume */}
                        <td className="py-3.5 px-4 hidden lg:table-cell text-slate-300">
                          {stock.volume}
                        </td>

                        {/* Market Cap */}
                        <td className="py-3.5 px-4 hidden lg:table-cell text-slate-300">
                          {stock.marketCap}
                        </td>

                        {/* Trend Sparkline */}
                        <td className="py-3.5 px-4 hidden sm:table-cell">
                          <Sparkline
                            data={stock.sparkline}
                            isPositive={isPositive}
                            width={75}
                            height={26}
                          />
                        </td>

                        {/* Action buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => onToggleWatchlist(stock.symbol)}
                              className={`p-1.5 rounded-lg transition cursor-pointer ${
                                isWatchlisted
                                  ? 'text-amber-400 bg-amber-400/10'
                                  : 'text-slate-400 hover:text-white'
                              }`}
                              title={isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
                            >
                              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400' : ''}`} />
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenStockDetail(stock)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition cursor-pointer"
                            >
                              Analyze
                            </button>
                            <button
                              type="button"
                              onClick={() => onTradeStock(stock, 'buy')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Buy
                            </button>
                            <button
                              type="button"
                              onClick={() => onTradeStock(stock, 'sell')}
                              className="px-3 py-1 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Sell
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
