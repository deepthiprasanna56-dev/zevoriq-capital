import { useState, useEffect } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Play,
  Shield,
  Zap,
  BarChart2,
  Lock,
  Globe2,
  LineChart,
} from 'lucide-react';

export default function Hero({
  preset = 1,
  onStartTrading,
  onExploreMarkets,
  onOpenDashboard,
  onOpenAuth,
  featuredStock,
}) {
  const [liveBtcPrice, setLiveBtcPrice] = useState(67432.21);
  const [liveSpPrice, setLiveSpPrice] = useState(5783.23);
  const [liveNasdaqPrice, setLiveNasdaqPrice] = useState(18415.49);
  const [phoneTimeframe, setPhoneTimeframe] = useState('1M');

  // Subtle real-time market oscillations
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBtcPrice((prev) => +(prev + (Math.random() - 0.48) * 12).toFixed(2));
      setLiveSpPrice((prev) => +(prev + (Math.random() - 0.48) * 0.9).toFixed(2));
      setLiveNasdaqPrice((prev) => +(prev + (Math.random() - 0.48) * 2.5).toFixed(2));
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden select-none">
      
      {/* Background ambient lighting & luxury radial glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-[#dfb15b]/12 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#c5932e]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(223,177,91,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />

      {/* Subtle geometric grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfb15b08_1px,transparent_1px),linear-gradient(to_bottom,#dfb15b08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* OPTION 1: PREMIUM MINIMAL (The Golden Charging Bull Flagship) */}
        {/* ============================================================== */}
        {preset === 1 && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Headlines & CTAs */}
              <div className="lg:col-span-6 space-y-6 text-left">
                {/* Spaced Tagline */}
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] font-semibold text-[#e5b75f] uppercase">
                  <span>TRADE</span>
                  <span className="w-1 h-1 rounded-full bg-[#dfb15b]" />
                  <span>INVEST</span>
                  <span className="w-1 h-1 rounded-full bg-[#dfb15b]" />
                  <span>GROW</span>
                </div>

                {/* Monumental Headline */}
                <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7e6bc] to-[#dfb15b]">
                    ZEVORIQ
                  </span>
                </h1>

                {/* Elegant Subtitle */}
                <p className="font-serif text-xl sm:text-2xl text-[#f3dfa2] tracking-wide font-normal">
                  Master the Market. Build Your Legacy.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button
                    type="button"
                    onClick={onStartTrading}
                    className="px-8 py-3.5 rounded-full gold-gradient-btn text-sm font-bold flex items-center gap-2 cursor-pointer transition transform hover:scale-102"
                  >
                    <span>Start Trading</span>
                    <ArrowRight className="w-4 h-4" />
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

              {/* Right Column: Majestic Golden Bull & Chart Visual */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                  
                  {/* Candlestick & Glow Background behind the Bull */}
                  <div className="absolute inset-0 flex items-end justify-center gap-3 opacity-30 pointer-events-none pb-8">
                    {[65, 85, 45, 95, 120, 75, 140, 110, 160, 130, 180].map((h, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-[1.5px] bg-[#dfb15b]" style={{ height: `${h + 20}px` }} />
                        <div
                          className="w-3 rounded-xs bg-gradient-to-t from-[#c5932e] to-[#f8e5b4] shadow-[0_0_12px_#dfb15b]"
                          style={{ height: `${h}px` }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Golden Charging Bull SVG Artwork */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center drop-shadow-[0_20px_45px_rgba(223,177,91,0.35)] animate-in fade-in zoom-in-95 duration-700">
                    <svg
                      viewBox="0 0 600 450"
                      className="w-full h-full filter drop-shadow-[0_0_25px_rgba(223,177,91,0.4)]"
                    >
                      <defs>
                        <linearGradient id="bullGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fff8e1" />
                          <stop offset="35%" stopColor="#f5df9e" />
                          <stop offset="70%" stopColor="#c5932e" />
                          <stop offset="100%" stopColor="#6d4808" />
                        </linearGradient>
                        <linearGradient id="bullGoldHorn" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#b8862d" />
                          <stop offset="50%" stopColor="#fffae6" />
                          <stop offset="100%" stopColor="#dfb15b" />
                        </linearGradient>
                        <linearGradient id="goldBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#dfb15b" stopOpacity="0" />
                          <stop offset="50%" stopColor="#f8e5b4" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#dfb15b" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Golden speed streaks */}
                      <path d="M 50,340 Q 220,290 480,310" stroke="url(#goldBeam)" strokeWidth="2.5" fill="none" />
                      <path d="M 80,360 Q 260,330 520,345" stroke="url(#goldBeam)" strokeWidth="1.5" fill="none" />
                      <path d="M 120,380 Q 300,370 560,380" stroke="url(#goldBeam)" strokeWidth="1" fill="none" />

                      {/* Muscular Metallic Charging Bull Body */}
                      <g fill="url(#bullGoldLight)" stroke="#452c04" strokeWidth="1.5">
                        {/* Rear Legs */}
                        <path d="M 120,260 C 105,290 90,340 100,380 C 110,385 125,385 130,370 C 140,335 150,300 160,270 Z" />
                        <path d="M 160,260 C 150,290 145,340 155,375 C 165,380 175,375 180,360 C 190,325 200,290 205,260 Z" opacity="0.85" />
                        
                        {/* Massive Torso & Back Hump */}
                        <path d="M 140,240 C 180,210 240,195 290,175 C 330,160 360,185 410,210 C 440,225 460,260 440,295 C 410,330 330,335 270,330 C 200,325 150,290 140,240 Z" />
                        
                        {/* Front Charging Legs */}
                        <path d="M 360,270 C 375,310 405,355 435,375 C 445,380 455,370 450,355 C 430,325 410,285 395,255 Z" />
                        <path d="M 310,270 C 320,305 340,345 365,370 C 375,375 385,365 380,350 C 365,320 350,280 340,260 Z" opacity="0.9" />

                        {/* Powerful Neck & Head */}
                        <path d="M 380,200 C 420,185 470,205 490,235 C 500,250 495,270 470,280 C 445,285 415,260 395,235 Z" />
                        <path d="M 470,240 C 490,242 505,250 515,262 C 505,275 485,278 470,268 Z" fill="#edd28e" />

                        {/* Menacing Horns */}
                        <path d="M 450,200 C 475,150 515,105 565,95 C 555,125 520,170 480,205 Z" fill="url(#bullGoldHorn)" />
                        <path d="M 430,190 C 445,145 475,115 510,110 C 500,135 475,170 450,195 Z" fill="url(#bullGoldHorn)" opacity="0.9" />
                      </g>
                    </svg>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Streamlined Indices Bar matching Screenshot 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d0d14]/90 border border-[#dfb15b]/25 shadow-xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl">
              <div className="flex flex-wrap items-center gap-8 text-xs font-mono">
                
                {/* S&P 500 */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b]">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 font-sans block text-[11px] font-semibold">S&P 500</span>
                    <span className="text-white font-bold text-sm">{liveSpPrice}</span>
                    <span className="text-emerald-400 font-semibold ml-2">+1.24%</span>
                  </div>
                </div>

                <div className="hidden sm:block w-[1px] h-8 bg-[#dfb15b]/20" />

                {/* NASDAQ */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 font-sans block text-[11px] font-semibold">NASDAQ</span>
                    <span className="text-white font-bold text-sm">{liveNasdaqPrice}</span>
                    <span className="text-emerald-400 font-semibold ml-2">+1.32%</span>
                  </div>
                </div>

                <div className="hidden md:block w-[1px] h-8 bg-[#dfb15b]/20" />

                {/* BTC */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b]">
                    <span className="font-bold text-sm">₿</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-sans block text-[11px] font-semibold">BTC</span>
                    <span className="text-white font-bold text-sm">${liveBtcPrice.toLocaleString()}</span>
                    <span className="text-emerald-400 font-semibold ml-2">+2.18%</span>
                  </div>
                </div>

              </div>

              {/* Market Status indicator */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12121c] border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Market Open</span>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* OPTION 2: ELEGANT DARK (The Executive Penthouse Skyline)       */}
        {/* ============================================================== */}
        {preset === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="text-xs tracking-[0.25em] font-semibold text-[#e5b75f] uppercase">
                SMARTER TRADING. BRIGHTER FUTURE.
              </div>

              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7e6bc] to-[#dfb15b]">
                  ZEVORIQ
                </span>
              </h1>

              <div className="space-y-1">
                <p className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  Elevate Your Wealth.
                </p>
                <p className="font-serif text-2xl sm:text-3xl text-[#f3dfa2] font-normal">
                  Trade Beyond Limits.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="button"
                  onClick={onStartTrading}
                  className="px-8 py-3.5 rounded-full gold-gradient-btn text-sm font-bold flex items-center gap-2 cursor-pointer transition transform hover:scale-102"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreMarkets}
                  className="px-8 py-3.5 rounded-full gold-outline-btn text-sm font-semibold flex items-center gap-2 cursor-pointer transition"
                >
                  <Play className="w-3.5 h-3.5 fill-[#dfb15b]" />
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Right Visual: Executive Penthouse Skyline & Holographic Glass Chart */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#dfb15b]/30 shadow-2xl bg-gradient-to-b from-[#101018] to-[#08080c] p-6 sm:p-8">
                
                {/* Nighttime Skyscraper Skyline Silhouette */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl flex flex-col justify-end">
                  
                  {/* Sky gradient with moon/stars */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-[#0f1422] to-[#171c2e]" />
                  
                  {/* Skyline silhouettes */}
                  <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-2 opacity-40 gap-1 pointer-events-none">
                    <div className="w-8 h-44 bg-slate-800" />
                    <div className="w-12 h-60 bg-slate-700" />
                    <div className="w-7 h-36 bg-slate-800" />
                    <div className="w-14 h-68 bg-slate-700 relative">
                      <div className="w-1 h-8 bg-amber-400/80 mx-auto -mt-8" />
                    </div>
                    <div className="w-10 h-52 bg-slate-800" />
                    <div className="w-16 h-72 bg-slate-700" />
                    <div className="w-10 h-40 bg-slate-800" />
                  </div>

                  {/* Holographic Glowing Gold Stock Chart Overlay */}
                  <div className="relative z-10 p-5 rounded-2xl bg-[#090b12]/80 border border-[#dfb15b]/40 backdrop-blur-md shadow-2xl m-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-white uppercase">Portfolio Growth Index</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs border border-emerald-500/30">
                        ▲ +12.48%
                      </span>
                    </div>

                    {/* Glowing gold curve */}
                    <svg viewBox="0 0 300 80" className="w-full h-24 overflow-visible">
                      <defs>
                        <linearGradient id="opt2Grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dfb15b" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#dfb15b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,65 Q 50,70 90,45 T 180,35 T 250,15 T 300,5 L 300,80 L 0,80 Z"
                        fill="url(#opt2Grad)"
                      />
                      <path
                        d="M 0,65 Q 50,70 90,45 T 180,35 T 250,15 T 300,5"
                        fill="none"
                        stroke="#dfb15b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="300" cy="5" r="4.5" fill="#ffffff" stroke="#dfb15b" strokeWidth="2" className="animate-ping" />
                    </svg>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-800">
                      <span>Execution Speed: <strong>12.4ms</strong></span>
                      <span className="text-[#dfb15b] font-bold">Institutional Alpha Tier</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* OPTION 3: LUXURY FINANCE (3D Holographic Golden Digital Globe)  */}
        {/* ============================================================== */}
        {preset === 3 && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center gap-3 text-xs tracking-[0.3em] font-semibold text-[#e5b75f] uppercase">
                  <span>INVEST</span>
                  <span className="w-1 h-1 rounded-full bg-[#dfb15b]" />
                  <span>ANALYZE</span>
                  <span className="w-1 h-1 rounded-full bg-[#dfb15b]" />
                  <span>ACHIEVE</span>
                </div>

                <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7e6bc] to-[#dfb15b]">
                    ZEVORIQ
                  </span>
                </h1>

                <p className="font-serif text-xl sm:text-2xl text-[#f3dfa2] tracking-wide font-normal max-w-lg">
                  Your Trusted Partner in the Financial Markets
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <button
                    type="button"
                    onClick={onStartTrading}
                    className="px-8 py-3.5 rounded-full gold-gradient-btn text-sm font-bold flex items-center gap-2 cursor-pointer transition transform hover:scale-102"
                  >
                    <span>Start Investing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenDashboard}
                    className="px-8 py-3.5 rounded-full gold-outline-btn text-sm font-semibold flex items-center gap-2 cursor-pointer transition"
                  >
                    <LineChart className="w-4 h-4 text-[#dfb15b]" />
                    <span>View Dashboard</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Holographic Golden 3D Earth Globe */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  
                  {/* Orbital Golden Rings */}
                  <div className="absolute inset-0 rounded-full border border-[#dfb15b]/30 animate-spin [animation-duration:35s]" />
                  <div className="absolute inset-6 rounded-full border border-dashed border-[#dfb15b]/40 animate-spin [animation-duration:25s] [animation-direction:reverse]" />
                  <div className="absolute inset-12 rounded-full border border-[#dfb15b]/20" />

                  {/* Golden Glowing Globe Core */}
                  <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#14120a] via-[#3b2b0a] to-[#dfb15b]/30 border-2 border-[#dfb15b]/60 flex items-center justify-center shadow-[0_0_50px_rgba(223,177,91,0.3)]">
                    <Globe2 className="w-36 h-36 text-[#edd28e] opacity-80 stroke-[1.2]" />

                    {/* Floating Holographic Finance Badges */}
                    <div className="absolute -top-3 left-4 p-2.5 rounded-xl bg-[#14141e]/90 border border-[#dfb15b]/50 shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-white">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>$4.8B Volume</span>
                    </div>

                    <div className="absolute -bottom-2 right-4 p-2.5 rounded-xl bg-[#14141e]/90 border border-[#dfb15b]/50 shadow-xl flex items-center gap-2 text-xs font-mono font-bold text-white">
                      <Lock className="w-4 h-4 text-[#dfb15b]" />
                      <span>SIPC Insured</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom 3 Feature Pills matching Screenshot 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
              <div className="p-5 rounded-2xl bg-[#0e0e16]/90 border border-[#dfb15b]/20 flex items-center gap-4 hover:border-[#dfb15b]/50 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Secure Trading</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Your Security, Our Priority</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e16]/90 border border-[#dfb15b]/20 flex items-center gap-4 hover:border-[#dfb15b]/50 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Real-Time Insights</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Stay Ahead Always</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e16]/90 border border-[#dfb15b]/20 flex items-center gap-4 hover:border-[#dfb15b]/50 transition duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#dfb15b]/10 border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] shrink-0">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Advanced Analytics</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Smarter Decisions</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* OPTION 4: MODERN FINTECH (High-End iPhone Trading App Mockup)   */}
        {/* ============================================================== */}
        {preset === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="flex items-center gap-3 text-xs tracking-[0.3em] font-semibold text-[#e5b75f] uppercase">
                <span>CAPITAL</span>
                <span className="w-1 h-1 rounded-full bg-[#dfb15b]" />
                <span>TRADE</span>
                <span className="w-1 h-1 rounded-full bg-[#dfb15b]" />
                <span>INVEST</span>
              </div>

              <h1 className="font-serif font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7e6bc] to-[#dfb15b]">
                  ZEVORIQ
                </span>
              </h1>

              <p className="font-serif text-xl sm:text-2xl text-white font-normal max-w-lg">
                Empower Your Investments with Intelligence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="px-8 py-3.5 rounded-full gold-gradient-btn text-sm font-bold flex items-center gap-2 cursor-pointer transition transform hover:scale-102"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreMarkets}
                  className="px-8 py-3.5 rounded-full gold-outline-btn text-sm font-semibold flex items-center gap-2 cursor-pointer transition"
                >
                  <Play className="w-3.5 h-3.5 fill-[#dfb15b]" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Right Column: iPhone Mobile Mockup matching Screenshot 4 */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Candlestick backdrop */}
              <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-20 pointer-events-none">
                {[50, 90, 70, 130, 80, 150, 110, 170, 130].map((h, idx) => (
                  <div key={idx} className="w-2 rounded bg-emerald-400" style={{ height: `${h}px` }} />
                ))}
              </div>

              {/* iPhone Frame */}
              <div className="relative z-10 w-72 sm:w-80 rounded-[42px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border-4 border-[#dfb15b]/40">
                {/* Speaker pill notch */}
                <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2" />

                {/* Inner Screen */}
                <div className="bg-[#0b0c12] rounded-[32px] p-4 text-left border border-slate-800 space-y-4">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium">Portfolio Value</span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-0.5">
                      $24,680.50
                    </div>
                    <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                      ▲ +8.24% today
                    </div>
                  </div>

                  {/* Timeframes */}
                  <div className="flex bg-[#12131d] p-1 rounded-xl justify-between text-[11px] font-semibold text-slate-400">
                    {['1D', '1W', '1M', '1Y'].map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => setPhoneTimeframe(tf)}
                        className={`px-3 py-0.5 rounded-lg transition cursor-pointer ${
                          phoneTimeframe === tf ? 'bg-[#dfb15b] text-black font-bold' : 'hover:text-white'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Sparkline Area Curve */}
                  <div className="py-2">
                    <svg viewBox="0 0 240 70" className="w-full h-16 overflow-visible">
                      <path
                        d="M 0,55 Q 40,60 80,40 T 160,25 T 240,5 L 240,70 L 0,70 Z"
                        fill="rgba(16, 185, 129, 0.2)"
                      />
                      <path
                        d="M 0,55 Q 40,60 80,40 T 160,25 T 240,5"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Top Movers list in mobile app */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Top Movers
                    </span>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141522] border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{featuredStock?.logo || '🟢'}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{featuredStock?.symbol || 'NVDA'}</div>
                          <div className="text-[10px] text-slate-400">{featuredStock?.name || 'NVIDIA Corp.'}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-white">${featuredStock?.price?.toFixed(2) || '138.25'}</div>
                        <div className="text-[10px] text-emerald-400 font-bold">+{featuredStock?.changePercent || '4.06'}%</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
