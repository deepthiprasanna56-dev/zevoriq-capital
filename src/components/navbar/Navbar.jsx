import { useState, useEffect } from 'react';
import {
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onSignOut,
  currency,
  onChangeCurrency,
  onQuickSearchSelect,
  popularStocks = [],
  heroPreset = 1,
  onChangeHeroPreset,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Global shortcut '/' to open search modal
    const handleKeyDown = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Markets', href: '#markets' },
    { name: 'Stocks', href: '#stocks' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Watchlist', href: '#watchlist' },
    { name: 'About', href: '#why-us' },
  ];

  const filteredStocks = searchQuery.trim()
    ? popularStocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleNavClick = (e, name, href) => {
    e.preventDefault();
    setActiveTab(name);
    setIsMobileMenuOpen(false);
    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/95 backdrop-blur-xl border-b border-[#dfb15b]/20 shadow-2xl shadow-black/80 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Left: Luxury ZEVORIQ Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'Home', '#home')}
              className="flex items-center gap-3 group shrink-0 cursor-pointer select-none"
            >
              {/* Golden Faceted Z Mark */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#f8e5b4] via-[#dfb15b] to-[#996a1e] p-[1.5px] shadow-lg shadow-[#dfb15b]/25 group-hover:shadow-[#dfb15b]/45 transition duration-300">
                <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  {/* Subtle inner gold sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#dfb15b]/15 to-transparent pointer-events-none" />
                  <span className="font-serif font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff2cb] via-[#e5b75f] to-[#b8862d] tracking-tighter">
                    Z
                  </span>
                </div>
              </div>

              {/* Brand Title */}
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-2xl tracking-[0.15em] text-[#f5dfa3] group-hover:text-white transition duration-200">
                  ZEVORIQ
                </span>
              </div>
            </a>

            {/* 2. Center: Desktop Navigation Links with Gold Underline Active state */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.name, link.href)}
                    className={`relative px-4 py-2 text-xs sm:text-sm tracking-wide font-medium transition-colors cursor-pointer ${
                      isActive ? 'text-[#edd28e]' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent shadow-[0_0_8px_#dfb15b]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* 3. Right: Search Icon + Currency + Login + Gold Sign Up Pill */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Preset Selector Pill (Option 1 to Option 4 switcher) */}
              <div className="hidden xl:flex items-center gap-1 p-1 bg-[#12121a] rounded-xl border border-[#dfb15b]/30 text-xs">
                <span className="px-2 text-[10px] font-bold text-[#e5b75f] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#e5b75f]" />
                  Theme:
                </span>
                {[
                  { id: 1, label: 'Opt 1 (Bull)' },
                  { id: 2, label: 'Opt 2 (Skyline)' },
                  { id: 3, label: 'Opt 3 (Globe)' },
                  { id: 4, label: 'Opt 4 (Fintech)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeHeroPreset(opt.id)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      heroPreset === opt.id
                        ? 'bg-gradient-to-r from-[#edd28e] to-[#c99532] text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title={`Switch to ${opt.label}`}
                  >
                    {opt.id}
                  </button>
                ))}
              </div>

              {/* Currency Selector */}
              <div className="relative hidden sm:block">
                <select
                  value={currency}
                  onChange={(e) => onChangeCurrency(e.target.value)}
                  className="bg-[#12121a] border border-slate-800 hover:border-[#dfb15b]/40 text-slate-300 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#dfb15b] cursor-pointer appearance-none pr-7 transition"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Search Icon Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-slate-300 hover:text-[#f5dfa3] hover:bg-slate-900 border border-transparent hover:border-slate-800 transition cursor-pointer"
                title="Search stocks (press /)"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* User Account / Auth Actions */}
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12121a] border border-[#dfb15b]/30 rounded-xl">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-[#dfb15b] to-[#b8862d] flex items-center justify-center text-xs font-bold text-black shadow-sm">
                      {user.avatar}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-xs font-semibold text-white leading-tight">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-[#e5b75f] leading-none">
                        {user.accountType}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenAuth('login')}
                    className="px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white rounded-xl hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('signup')}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-[#0c0c0e] gold-gradient-btn rounded-xl transition cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition cursor-pointer"
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
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 p-5 bg-[#0d0d14] border-b border-[#dfb15b]/20 shadow-2xl flex flex-col gap-3">
            
            {/* Theme switcher on mobile */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="text-[#e5b75f] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Hero Theme:
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onChangeHeroPreset(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                      heroPreset === num
                        ? 'bg-[#dfb15b] text-black shadow'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.name, link.href)}
                  className="p-3 text-sm font-semibold text-slate-200 bg-[#14141e] border border-slate-800 rounded-xl hover:border-[#dfb15b]/50 hover:text-[#f5dfa3] transition cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {!user && (
              <div className="flex gap-2 pt-3 border-t border-slate-800 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-xl cursor-pointer"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="flex-1 py-2.5 text-xs font-bold text-black gold-gradient-btn rounded-xl cursor-pointer"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-[#0e0e16] border border-[#dfb15b]/30 rounded-2xl shadow-2xl p-4 z-10">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Search className="w-5 h-5 text-[#dfb15b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stocks by symbol or company (e.g. NVDA, Tesla)..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded bg-slate-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
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
                      type="button"
                      onClick={() => {
                        onQuickSearchSelect(stock);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{stock.logo}</span>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-[#dfb15b] transition">
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
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#dfb15b] mb-2">
                    Popular Traded Symbols:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {popularStocks.slice(0, 6).map((s) => (
                      <button
                        key={s.symbol}
                        type="button"
                        onClick={() => {
                          onQuickSearchSelect(s);
                          setIsSearchOpen(false);
                        }}
                        className="px-2.5 py-1 bg-[#151520] hover:bg-slate-800 border border-slate-800 hover:border-[#dfb15b]/40 text-slate-300 rounded-lg text-xs font-mono font-semibold transition cursor-pointer"
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
