import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function HoldingsTable({ holdings = [], onTradeHolding }) {
  if (!holdings || holdings.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-500 text-sm">
        No active asset holdings. Execute a buy order from the terminal to build your portfolio.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl">
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Active Portfolio Holdings</h3>
          <p className="text-xs text-slate-400">Position sizes and unrealized gain/loss breakdown</p>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-400 bg-slate-800/70 px-2.5 py-1 rounded-lg">
          {holdings.length} Assets
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[11px] font-sans">
            <tr>
              <th className="py-3.5 px-4">Asset</th>
              <th className="py-3.5 px-4">Position Size</th>
              <th className="py-3.5 px-4">Avg Buy Price</th>
              <th className="py-3.5 px-4">Current Price</th>
              <th className="py-3.5 px-4">Market Value</th>
              <th className="py-3.5 px-4">Unrealized P&L</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {holdings.map((h) => {
              const marketValue = h.shares * h.currentPrice;
              const costBasis = h.shares * h.avgBuyPrice;
              const pnlDollars = marketValue - costBasis;
              const pnlPercent = costBasis > 0 ? (pnlDollars / costBasis) * 100 : 0;
              const isProfit = pnlDollars >= 0;

              return (
                <tr key={h.symbol} className="hover:bg-slate-800/40 transition duration-150">
                  {/* Asset */}
                  <td className="py-3.5 px-4 font-sans">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{h.logo}</span>
                      <div>
                        <div className="font-extrabold text-white text-sm">{h.symbol}</div>
                        <div className="text-xs text-slate-400 truncate max-w-[120px]">{h.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="py-3.5 px-4 font-bold text-white">
                    {h.shares} <span className="text-slate-500 font-normal text-[11px]">shs</span>
                  </td>

                  {/* Avg Buy */}
                  <td className="py-3.5 px-4 text-slate-300">
                    ${h.avgBuyPrice.toFixed(2)}
                  </td>

                  {/* Current */}
                  <td className="py-3.5 px-4 font-bold text-white">
                    ${h.currentPrice.toFixed(2)}
                  </td>

                  {/* Market Value */}
                  <td className="py-3.5 px-4 font-bold text-white">
                    ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* P&L */}
                  <td className="py-3.5 px-4">
                    <div
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isProfit ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isProfit ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      <span>
                        {isProfit ? '+' : ''}${Math.abs(pnlDollars).toFixed(2)} ({isProfit ? '+' : ''}
                        {pnlPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onTradeHolding(h, 'buy')}
                        className="px-2.5 py-1 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
                      >
                        Buy More
                      </button>
                      <button
                        onClick={() => onTradeHolding(h, 'sell')}
                        className="px-2.5 py-1 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition"
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
  );
}
