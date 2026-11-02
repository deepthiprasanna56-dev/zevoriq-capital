import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TickerTape({ indices = [], stocks = [], onSelectAsset }) {
  // Combine indices and key stocks into one marquee stream
  const items = [
    ...indices.map((idx) => ({
      symbol: idx.symbol,
      price: idx.price,
      changePercent: idx.changePercent,
      isIndex: true,
      raw: idx,
    })),
    ...stocks.slice(0, 8).map((stk) => ({
      symbol: stk.symbol,
      price: stk.price,
      changePercent: stk.changePercent,
      isIndex: false,
      raw: stk,
    })),
  ];

  // Duplicate items for seamless infinite scroll
  const stream = [...items, ...items];

  const handleClick = (item) => {
    if (onSelectAsset) {
      onSelectAsset(item);
    }
  };

  return (
    <div className="w-full bg-[#060910] border-y border-slate-800/80 overflow-hidden py-2.5 relative select-none z-20">
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#060910] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#060910] to-transparent z-10 pointer-events-none" />

      <div className="ticker-track flex items-center gap-8 text-xs font-mono">
        {stream.map((item, idx) => {
          const isPositive = item.changePercent >= 0;
          return (
            <button
              key={`${item.symbol}-${idx}`}
              type="button"
              onClick={() => handleClick(item)}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800/90 hover:border-blue-500/50 transition-all border border-slate-800/40 shrink-0 cursor-pointer text-left"
              title={`Click to inspect ${item.symbol}`}
            >
              <span className="font-bold text-slate-200">{item.symbol}</span>
              <span className="text-slate-300 font-semibold">
                ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`flex items-center text-[11px] font-bold ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {isPositive ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
