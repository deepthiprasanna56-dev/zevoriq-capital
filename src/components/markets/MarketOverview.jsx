import { useState } from 'react';
import { ArrowRight, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Sparkline from '../common/Sparkline';

const chartPoints = '8,162 24,129 38,142 54,107 68,119 84,87 100,101 116,76 132,93 148,67 164,83 180,58 196,72 212,52 228,70 244,61 260,85 276,71 292,48 308,64 324,35 340,50 356,43 372,58 388,37 404,49 420,25 436,42 452,31 468,50 484,36 500,45 516,25 532,38 548,18 564,32 580,25 596,42 612,30';

export default function MarketOverview({ indices = [], onSelectAsset }) {
  const [range, setRange] = useState('1D');
  const visibleIndices = [indices[0], indices[1], indices.find((item) => item.id === 'btc')].filter(Boolean);

  return (
    <section id="markets" className="market-overview-section relative overflow-hidden border-t border-[#dfb15b]/20 py-10 sm:py-12">
      <div className="market-overview-glow" />
      <div className="relative mx-auto grid max-w-[1600px] items-center gap-6 px-5 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:gap-5 lg:px-10 xl:grid-cols-[0.88fr_1.7fr_0.92fr]">
        <div className="market-intro">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e4ba6d]">
            <span>Market</span><span className="text-[#8b7146]">Overview</span>
          </div>
          <h2 className="font-serif-luxury text-4xl leading-[1.05] text-[#fff5e3] sm:text-5xl lg:text-[3.25rem]">
            Global Markets<br /><span className="gold-gradient-text">at a Glance</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#e5ddcf]">
            Stay informed with real-time market insights and powerful analytics.
          </p>
          <button type="button" onClick={() => document.getElementById('stocks')?.scrollIntoView({ behavior: 'smooth' })} className="gold-gradient-btn mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold">
            View All Markets <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="market-chart-card rounded-2xl border border-white/10 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 sm:gap-3">
            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((item) => (
              <button key={item} type="button" onClick={() => setRange(item)} className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${range === item ? 'bg-[#f2cb7d] text-[#17120a]' : 'text-slate-400 hover:text-white'}`}>{item}</button>
            ))}
            <span className="ml-auto hidden items-center gap-1.5 text-[10px] text-[#a99e8c] sm:flex"><Activity className="h-3 w-3 text-[#d9ad60]" /> S&P 500</span>
          </div>
          <div className="relative h-[190px] overflow-hidden sm:h-[220px]">
            <div className="absolute inset-0 flex flex-col justify-between pb-2 text-right text-[10px] text-[#bdb3a3]">
              {[5900, 5800, 5700, 5600].map((value) => <div key={value} className="flex items-center gap-3"><span className="h-px flex-1 bg-white/[0.055]" /><span>{value.toLocaleString()}</span></div>)}
            </div>
            <svg viewBox="0 0 650 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-[calc(100%-38px)] overflow-visible" aria-label={`Market chart ${range}`} role="img">
              <defs><linearGradient id="marketFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#e7b85f" stopOpacity=".32"/><stop offset="100%" stopColor="#e7b85f" stopOpacity="0"/></linearGradient></defs>
              <polygon points={`0,180 ${chartPoints} 650,38 650,180`} fill="url(#marketFill)" />
              <polyline points={chartPoints} fill="none" stroke="#efc36f" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        <div className="market-index-list grid grid-cols-1 gap-2 md:col-span-2 md:grid-cols-3 xl:col-span-1 xl:grid-cols-1">
          {visibleIndices.map((item, index) => {
            const positive = item.changePercent >= 0;
            return <button key={item.id || item.symbol} type="button" onClick={() => onSelectAsset?.(item)} className="market-index-row flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition hover:border-[#dcb363]/35 hover:bg-white/[0.05]">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${index === 2 ? 'bg-[#f7931a] text-white' : 'bg-white text-[#243f83]'}`}>{index === 2 ? '₿' : '🇺🇸'}</span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-medium text-[#fff7e8]">{item.symbol}</span><span className="mt-1 block text-xs text-[#e5ddcf]">{item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></span>
              <span className={`flex items-center text-[11px] font-semibold ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>{positive ? <ArrowUpRight className="h-3 w-3"/> : <ArrowDownRight className="h-3 w-3"/>}{positive ? '+' : ''}{item.changePercent.toFixed(2)}%</span>
              <span className="hidden xl:block"><Sparkline data={item.sparkline} isPositive={positive} width={66} height={28} /></span>
            </button>;
          })}
        </div>
      </div>
    </section>
  );
}
