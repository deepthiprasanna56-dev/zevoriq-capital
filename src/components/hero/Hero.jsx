import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  CheckCircle,
  Activity,
} from 'lucide-react';
import Sparkline from '../common/Sparkline';

export default function Hero({ onStartTrading, onExploreMarkets, onQuickSelectStock, featuredStock }) {
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [priceDelta, setPriceDelta] = useState(0);
  const [priceFlash, setPriceFlash] = useState(null); // 'green' | 'red' | null

  // Subtle real-time tick effect for hero chart
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 0.4;
      setPriceDelta((prev) => {
        const next = parseFloat((prev + delta).toFixed(2));
        setPriceFlash(delta >= 0 ? 'green' : 'red');
        setTimeout(() => setPriceFlash(null), 600);
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const basePrice = featuredStock ? featuredStock.price : 138.25;
  const simulatedPrice = parseFloat((basePrice + priceDelta).toFixed(2));

  // Timeframe-specific sparklines for the hero widget
  const defaultSpark = featuredStock?.sparkline || [132.5, 133.8, 135.2, 134.6, 136.9, 137.5, 138.25];
  const timeframeSparklines = {
    '1D': defaultSpark,
    '1W': [basePrice * 0.94, basePrice * 0.96, basePrice * 0.95, basePrice * 0.98, basePrice * 0.97, simulatedPrice],
    '1M': [basePrice * 0.88, basePrice * 0.91, basePrice * 0.90, basePrice * 0.94, basePrice * 0.96, simulatedPrice],
    '1Y': [basePrice * 0.65, basePrice * 0.72, basePrice * 0.80, basePrice * 0.88, basePrice * 0.93, simulatedPrice],
  };

  const currentSparkline = timeframeSparklines[activeTimeframe] || defaultSpark;

  const stats = [
    { label: 'Daily Trading Volume', value: '$4.8B+' },
    { label: 'Execution Speed', value: '< 15ms' },
    { label: 'Global Assets', value: '10,000+' },
    { label: 'Platform Availability', value: '99.99%' },
  ];

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      {/* Background radial glows and cyber grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Next-Generation Multi-Asset Institutional Engine</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-mono">v3.4.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Trade Global Markets with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Sub-Millisecond
              </span>{' '}
              Precision & AI Analytics.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Empowering institutional funds and active retail traders with direct NYSE/NASDAQ liquidity pools, zero-commission equity trades, real-time algorithmic signals, and deep portfolio risk modeling.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartTrading}
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start Trading Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreMarkets}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition flex items-center gap-2 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Explore Live Markets</span>
              </button>
            </div>

            {/* Trust and Compliance Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Zero Commission on US Equities</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>SIPC Protection up to $500,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Direct DMA Exchange Routing</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual / Interactive Terminal Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative glass-panel rounded-2xl border border-slate-700/60 p-5 sm:p-6 shadow-2xl shadow-blue-950/40">
              
              {/* Card Header with Live Ticker */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{featuredStock?.logo || '🟢'}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-lg tracking-tight">
                        {featuredStock?.symbol || 'NVDA'}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-semibold">
                        NASDAQ
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 truncate max-w-[160px]">
                      {featuredStock?.name || 'NVIDIA Corporation'}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xl sm:text-2xl font-mono font-bold transition-colors duration-300 ${
                      priceFlash === 'green'
                        ? 'text-emerald-400'
                        : priceFlash === 'red'
                        ? 'text-rose-400'
                        : 'text-white'
                    }`}
                  >
                    ${simulatedPrice.toFixed(2)}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs font-semibold text-emerald-400 font-mono">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+{featuredStock?.changePercent || 4.06}%</span>
                  </div>
                </div>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                  {['1D', '1W', '1M', '1Y'].map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setActiveTimeframe(tf)}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        activeTimeframe === tf
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Real-time Stream ({activeTimeframe})</span>
                </div>
              </div>

              {/* Interactive Mini Area / Candlestick SVG Chart */}
              <div className="py-2">
                <div className="w-full h-40 bg-slate-900/40 rounded-xl p-3 border border-slate-800/60 relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
                    <div className="border-b border-dashed border-slate-600" />
                    <div className="border-b border-dashed border-slate-600" />
                    <div className="border-b border-dashed border-slate-600" />
                  </div>

                  {/* Sparkline Expanded Chart */}
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkline
                      data={currentSparkline}
                      isPositive={true}
                      width={380}
                      height={120}
                    />
                  </div>
                </div>
              </div>

              {/* Live Order Book Depth Preview */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl">
                  <div className="text-[10px] text-emerald-400 uppercase font-semibold">Top Bid</div>
                  <div className="text-white font-bold text-sm">
                    ${(simulatedPrice - 0.02).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">Size: 4,820 shs</div>
                </div>
                <div className="p-2.5 bg-rose-950/20 border border-rose-900/40 rounded-xl">
                  <div className="text-[10px] text-rose-400 uppercase font-semibold">Top Ask</div>
                  <div className="text-white font-bold text-sm">
                    ${(simulatedPrice + 0.02).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">Size: 3,150 shs</div>
                </div>
              </div>

              {/* Quick Trade Action in Hero */}
              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => onQuickSelectStock(featuredStock, 'buy')}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  Quick Buy {featuredStock?.symbol || 'NVDA'}
                </button>
                <button
                  type="button"
                  onClick={() => onQuickSelectStock(featuredStock, 'sell')}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  Quick Sell
                </button>
              </div>

            </div>

            {/* Floating Stat Pill */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 p-3.5 bg-slate-900/95 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-xl">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">AI Bullish Sentiment</div>
                <div className="text-[11px] text-emerald-400 font-semibold font-mono">
                  94.2% Probability Score
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Global Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {s.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
