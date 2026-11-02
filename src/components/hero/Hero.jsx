import { useState, useEffect } from 'react';
import {
  ArrowRight,
  TrendingUp,
  BarChart2,
} from 'lucide-react';
import Sparkline from '../common/Sparkline';

export default function Hero({
  onStartTrading,
  onExploreMarkets,
}) {
  const [liveBtcPrice, setLiveBtcPrice] = useState(67432.21);
  const [liveSpPrice, setLiveSpPrice] = useState(5783.23);
  const [liveNasdaqPrice, setLiveNasdaqPrice] = useState(18415.49);

  // Subtle real-time market oscillations for the ticker bar
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBtcPrice((prev) => +(prev + (Math.random() - 0.48) * 12).toFixed(2));
      setLiveSpPrice((prev) => +(prev + (Math.random() - 0.48) * 0.9).toFixed(2));
      setLiveNasdaqPrice((prev) => +(prev + (Math.random() - 0.48) * 2.5).toFixed(2));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section relative pt-4 sm:pt-5 pb-0 overflow-hidden select-none">
      
      {/* Background ambient lighting & luxury gold radiance */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[#dfb15b]/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#c5932e]/12 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(223,177,91,0.12),rgba(255,255,255,0))] pointer-events-none -z-10" />

      {/* Subtle architectural vertical columns and candlestick grid in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfb15b08_1px,transparent_1px),linear-gradient(to_bottom,#dfb15b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="hero-inner max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-2 items-center min-h-[430px] pb-7 sm:pb-9">
          
          {/* Left Column: Typography, Taglines & Action Buttons */}
          <div className="hero-copy lg:col-span-5 space-y-5 text-left z-10">
            
            {/* Tagline: TRADE • INVEST • GROW */}
            <div className="flex items-center gap-3 text-xs tracking-[0.3em] font-semibold text-[#e5b75f] uppercase">
              <span>TRADE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b]" />
              <span>INVEST</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b]" />
              <span>GROW</span>
            </div>

            {/* Monumental Headline matching reference */}
            <h1 className="font-serif-luxury font-medium text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.15rem] tracking-tight text-white leading-[0.98]">
              Clarity in Every<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7e6bc] to-[#dfb15b]">
                Market Move.
              </span>
            </h1>

            {/* Subtitle matching reference */}
            <p className="text-[#eee6d8] text-base sm:text-lg font-light leading-relaxed max-w-lg">
              Elevate your wealth with a more considered approach to investing.
            </p>

            {/* Call To Action Buttons matching reference */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onStartTrading}
                className="px-8 py-3.5 rounded-full gold-gradient-btn text-sm font-bold flex items-center gap-2 cursor-pointer transition transform hover:scale-102 shadow-lg shadow-[#dfb15b]/25"
              >
                <span>Start Trading</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onExploreMarkets}
                className="px-8 py-3.5 rounded-full gold-outline-btn text-sm font-semibold flex items-center gap-2 cursor-pointer transition"
              >
                <span>Explore Markets</span>
              </button>
            </div>

          </div>

          {/* Right Column: Majestic Golden Charging Bull on Marble Pediment */}
          <div className="hero-art lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full max-w-5xl aspect-[1.6/1] flex items-center justify-center">
              
              <img
                src="/hero-bull.png"
                alt="A polished bronze bull charging through a rising market chart"
                className="hero-bull-image relative z-10 block h-full w-full object-cover drop-shadow-[0_20px_45px_rgba(223,177,91,0.4)] animate-in fade-in zoom-in-95 duration-700"
              />

            </div>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* Bottom Indices Ticker Strip matching reference image exactly   */}
      {/* ============================================================== */}
      <div className="w-full bg-[#0a0a0f] border-y border-[#dfb15b]/25 shadow-xl relative z-20">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 py-3 sm:py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            
            {/* 3 Indices Group */}
            <div className="flex flex-1 flex-wrap items-center justify-between gap-4 sm:gap-6 lg:flex-nowrap text-xs font-mono">
              
              {/* Item 1: S&P 500 */}
              <div
                onClick={onExploreMarkets}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#bdb3a3] font-sans block text-[11px] font-semibold">S&P 500</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm tracking-tight">{liveSpPrice}</span>
                    <span className="text-emerald-400 font-semibold text-xs font-mono">▲ +1.24%</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Sparkline
                    data={[5820, 5835, 5828, 5845, 5850, 5842, 5860, 5855, 5864.2]}
                    isPositive={true}
                    width={70}
                    height={26}
                  />
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden md:block w-[1px] h-9 bg-[#dfb15b]/20" />

              {/* Item 2: NASDAQ */}
              <div
                onClick={onExploreMarkets}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] group-hover:scale-110 transition-transform">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#bdb3a3] font-sans block text-[11px] font-semibold">NASDAQ</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm tracking-tight">{liveNasdaqPrice}</span>
                    <span className="text-emerald-400 font-semibold text-xs font-mono">▲ +1.32%</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Sparkline
                    data={[18280, 18310, 18350, 18320, 18390, 18410, 18440, 18452.8]}
                    isPositive={true}
                    width={70}
                    height={26}
                  />
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden lg:block w-[1px] h-9 bg-[#dfb15b]/20" />

              {/* Item 3: BTC */}
              <div
                onClick={onExploreMarkets}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] font-bold text-sm group-hover:scale-110 transition-transform">
                  ₿
                </div>
                <div>
                  <span className="text-[#bdb3a3] font-sans block text-[11px] font-semibold">BTC</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm tracking-tight">${liveBtcPrice.toLocaleString()}</span>
                    <span className="text-emerald-400 font-semibold text-xs font-mono">▲ +2.18%</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Sparkline
                    data={[70100, 70500, 71200, 70900, 71800, 72200, 72480]}
                    isPositive={true}
                    width={70}
                    height={26}
                  />
                </div>
              </div>

            </div>

            {/* Market Open Status Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12121a] border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Market Open</span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
