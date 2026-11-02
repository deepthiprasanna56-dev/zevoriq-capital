import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Clock,
} from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onSignOut,
  currency,
  onChangeCurrency,
  onQuickSearchSelect,
  popularStocks = [],
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Live clock in EST / UTC
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Markets', href: '#markets' },
    { name: 'Stocks', href: '#stocks' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Watchlist', href: '#watchlist' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'News', href: '#news' },
    { name: 'Why Us', href: '#why-us' },
  ];

  const filteredStocks = searchQuery.trim()
    ? popularStocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080c14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/50 py-3'
            : 'bg-transparent py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <a href="#home" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition">
                <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-['Plus_Jakarta_Sans']">
                    ZEVORIQ
                  </span>
                  <span className="font-light text-lg sm:text-xl tracking-wider text-blue-400">
                    CAPITAL
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Institutional Liquidity</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60 backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Header Right Tools & Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Live Market Clock badge */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentTime || '09:30:00 EST'}</span>
              </div>

              {/* Quick Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition"
                title="Search stocks"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded border border-slate-700">
                  /
                </kbd>
              </button>

              {/* Currency Selector */}
              <div className="relative hidden sm:block">
                <select
                  value={currency}
                  onChange={(e) => onChangeCurrency(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none pr-7"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* User Account / Auth Actions */}
              {user ? (
                <div className="flex items-center gap-2 pl-1">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border border-blue-500/30 rounded-xl">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      {user.avatar}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-semibold text-white leading-tight">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-blue-400 leading-none">
                        {user.accountType}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/80 transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md shadow-blue-600/30 transition transform active:scale-95"
                  >
                    Open Account
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-18 left-0 right-0 p-4 bg-slate-900 border-b border-slate-800 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {currentTime}
              </span>
              <div className="flex items-center gap-2">
                <span>Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => onChangeCurrency(e.target.value)}
                  className="bg-slate-800 text-slate-200 text-xs rounded px-2 py-1"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 text-sm font-semibold text-slate-200 bg-slate-800/60 rounded-xl hover:bg-blue-600 hover:text-white transition"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {!user && (
              <div className="flex gap-2 pt-3 border-t border-slate-800 mt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Stock Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-10">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Search className="w-5 h-5 text-blue-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stocks by symbol or company (e.g. NVDA, Tesla)..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 max-h-72 overflow-y-auto">
              {filteredStocks.length > 0 ? (
                <div className="space-y-1">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => {
                        onQuickSearchSelect(stock);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{stock.logo}</span>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                            {stock.symbol}
                          </div>
                          <div className="text-xs text-slate-400">{stock.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono font-bold text-white">
                          ${stock.price.toFixed(2)}
                        </div>
                        <div
                          className={`text-xs font-semibold ${
                            stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {stock.changePercent >= 0 ? '+' : ''}
                          {stock.changePercent}%
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No assets matching "{searchQuery}"
                </div>
              ) : (
                <div className="text-xs text-slate-400 p-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Popular Traded Symbols:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {popularStocks.slice(0, 6).map((s) => (
                      <button
                        key={s.symbol}
                        onClick={() => {
                          onQuickSearchSelect(s);
                          setIsSearchOpen(false);
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono font-semibold transition"
                      >
                        {s.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
