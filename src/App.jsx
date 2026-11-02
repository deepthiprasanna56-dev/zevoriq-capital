import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/navbar/Navbar';
import TickerTape from './components/hero/TickerTape';
import Hero from './components/hero/Hero';
import MarketOverview from './components/markets/MarketOverview';
import StockMarket from './components/stocks/StockMarket';
import StockDetailModal from './components/stocks/StockDetailModal';
import TradingTerminal from './components/trading/TradingTerminal';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import WatchlistSection from './components/watchlist/WatchlistSection';
import MarketNews from './components/news/MarketNews';
import WhyChooseUs from './components/whychooseus/WhyChooseUs';
import Footer from './components/footer/Footer';
import Toast from './components/common/Toast';
import AuthModal from './components/common/AuthModal';

import {
  MAJOR_INDICES,
  POPULAR_STOCKS,
  INITIAL_HOLDINGS,
  INITIAL_WATCHLIST_SYMBOLS,
  MARKET_NEWS,
} from './data/marketData';

export default function App() {
  // Primary Platform State
  const [stocks, setStocks] = useState(POPULAR_STOCKS);
  const indices = MAJOR_INDICES;
  const [holdings, setHoldings] = useState(INITIAL_HOLDINGS);
  const [cashBalance, setCashBalance] = useState(45200.50);
  const [watchlistSymbols, setWatchlistSymbols] = useState(INITIAL_WATCHLIST_SYMBOLS);

  // Hero Preset Switcher (1: Premium Minimal Bull, 2: Elegant Dark Skyline, 3: Luxury Finance Globe, 4: Modern Fintech Mobile)
  const [heroPreset, setHeroPreset] = useState(1);

  // Selected Stock Symbol & Trade Mode
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [tradeMode, setTradeMode] = useState('buy');
  const [isStockDetailOpen, setIsStockDetailOpen] = useState(false);

  // Derived selected stock
  const selectedStock = stocks.find((s) => s.symbol === selectedSymbol) || stocks[0];

  // Auth State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [user, setUser] = useState({
    name: 'Alex Mercer',
    email: 'trader.demo@zevoriq.com',
    accountType: 'Pro Trader Tier',
    avatar: 'A',
  });

  // Settings & Notifications
  const [currency, setCurrency] = useState('USD');
  const [toasts, setToasts] = useState([]);
  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState(true);

  // Toast Helper
  const showToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Live Price Simulation Tick Engine
  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      // Pick 1-2 random stocks to tick
      const randomStockIndex = Math.floor(Math.random() * stocks.length);
      const deltaPercent = (Math.random() - 0.49) * 0.8; // between -0.4% and +0.4%

      setStocks((prevStocks) =>
        prevStocks.map((stock, idx) => {
          if (idx !== randomStockIndex) return stock;
          const newPrice = Math.max(1, parseFloat((stock.price * (1 + deltaPercent / 100)).toFixed(2)));
          const priceChange = parseFloat((newPrice - (stock.price - stock.change)).toFixed(2));
          const changePercent = parseFloat(((priceChange / (newPrice - priceChange)) * 100).toFixed(2));
          const updatedSparkline = [...stock.sparkline.slice(1), newPrice];

          return {
            ...stock,
            price: newPrice,
            change: priceChange,
            changePercent: changePercent,
            sparkline: updatedSparkline,
          };
        })
      );

      // Also update matching holding's current price
      setHoldings((prevHoldings) =>
        prevHoldings.map((h) => {
          const match = stocks[randomStockIndex];
          if (h.symbol === match?.symbol) {
            return { ...h, currentPrice: match.price };
          }
          return h;
        })
      );
    }, 3800);

    return () => clearInterval(interval);
  }, [isLiveSimulationActive, stocks]);

  // Handle Trade Execution from Terminal
  const handleExecuteTrade = (tradeReceipt) => {
    if (tradeReceipt.type === 'buy') {
      // Deduct cash
      setCashBalance((prev) => Math.max(0, prev - tradeReceipt.totalCost));

      // Update or add to holdings
      setHoldings((prevHoldings) => {
        const existingIndex = prevHoldings.findIndex((h) => h.symbol === tradeReceipt.symbol);
        if (existingIndex >= 0) {
          const existing = prevHoldings[existingIndex];
          const newShares = existing.shares + tradeReceipt.shares;
          const totalSpent = existing.shares * existing.avgBuyPrice + tradeReceipt.totalCost;
          const newAvgPrice = totalSpent / newShares;

          const updated = [...prevHoldings];
          updated[existingIndex] = {
            ...existing,
            shares: newShares,
            avgBuyPrice: parseFloat(newAvgPrice.toFixed(2)),
            currentPrice: tradeReceipt.price,
          };
          return updated;
        } else {
          return [
            ...prevHoldings,
            {
              symbol: tradeReceipt.symbol,
              name: tradeReceipt.name,
              shares: tradeReceipt.shares,
              avgBuyPrice: tradeReceipt.price,
              currentPrice: tradeReceipt.price,
              logo: selectedStock?.logo || '🟢',
            },
          ];
        }
      });

      showToast({
        type: 'success',
        title: `Order Filled: Bought ${tradeReceipt.shares} ${tradeReceipt.symbol}`,
        message: `Executed at $${tradeReceipt.price.toFixed(2)} via NYSE/NASDAQ DMA route.`,
      });
    } else {
      // Sell order: Add cash
      setCashBalance((prev) => prev + tradeReceipt.totalCost);

      // Reduce or remove holding
      setHoldings((prevHoldings) => {
        const existingIndex = prevHoldings.findIndex((h) => h.symbol === tradeReceipt.symbol);
        if (existingIndex < 0) return prevHoldings;

        const existing = prevHoldings[existingIndex];
        const remainingShares = existing.shares - tradeReceipt.shares;

        if (remainingShares <= 0) {
          return prevHoldings.filter((h) => h.symbol !== tradeReceipt.symbol);
        } else {
          const updated = [...prevHoldings];
          updated[existingIndex] = {
            ...existing,
            shares: remainingShares,
            currentPrice: tradeReceipt.price,
          };
          return updated;
        }
      });

      showToast({
        type: 'success',
        title: `Order Filled: Sold ${tradeReceipt.shares} ${tradeReceipt.symbol}`,
        message: `Settled proceeds of $${tradeReceipt.totalCost.toFixed(2)} credited to liquid cash.`,
      });
    }
  };

  // Toggle Watchlist
  const handleToggleWatchlist = (symbol) => {
    const isPresent = watchlistSymbols.includes(symbol);
    if (isPresent) {
      setWatchlistSymbols((prev) => prev.filter((s) => s !== symbol));
      showToast({
        type: 'info',
        title: 'Removed from Watchlist',
        message: `${symbol} was unpinned from your active watchlist.`,
      });
    } else {
      setWatchlistSymbols((prev) => [...prev, symbol]);
      showToast({
        type: 'success',
        title: 'Pinned to Watchlist',
        message: `${symbol} is now monitored with live alerts.`,
      });
    }
  };

  // Deposit Demo Funds
  const handleDepositFunds = () => {
    setCashBalance((prev) => prev + 10000);
    showToast({
      type: 'success',
      title: 'Demo Liquidity Credited',
      message: '+$10,000.00 instantly added to your available purchasing power.',
    });
  };

  // Quick Trade Stock trigger (scrolls to terminal)
  const handleTradeStock = (stock, mode = 'buy') => {
    setSelectedSymbol(stock.symbol);
    setTradeMode(mode);
    const element = document.getElementById('terminal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Stock Detail Modal
  const handleOpenStockDetail = (stock) => {
    setSelectedSymbol(stock.symbol);
    setIsStockDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-slate-100 flex flex-col font-sans">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        user={user}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onSignOut={() => {
          setUser(null);
          showToast({
            type: 'info',
            title: 'Logged Out',
            message: 'Your trading session has been safely secured and closed.',
          });
        }}
        currency={currency}
        onChangeCurrency={setCurrency}
        onQuickSearchSelect={(stock) => handleOpenStockDetail(stock)}
        popularStocks={stocks}
        heroPreset={heroPreset}
        onChangeHeroPreset={setHeroPreset}
      />

      {/* 2. Live Marquee Ticker Tape */}
      <div className="pt-16 sm:pt-20">
        <TickerTape
          indices={indices}
          stocks={stocks}
          onSelectAsset={(item) => {
            if (!item.isIndex) {
              handleTradeStock(item.raw, 'buy');
            } else {
              showToast({
                type: 'info',
                title: `${item.symbol} Benchmark`,
                message: `${item.raw.name} is currently trading at $${item.price.toFixed(2)} (${item.changePercent >= 0 ? '+' : ''}${item.changePercent}%).`,
              });
            }
          }}
        />
      </div>

      <main className="flex-1">
        {/* 3. Hero Section (Renders Option 1, 2, 3, or 4 with luxury black/gold aesthetic) */}
        <Hero
          preset={heroPreset}
          onStartTrading={() => {
            const el = document.getElementById('terminal');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreMarkets={() => {
            const el = document.getElementById('markets');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDashboard={() => {
            const el = document.getElementById('portfolio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAuth={(mode) => {
            setAuthModalMode(mode);
            setIsAuthModalOpen(true);
          }}
          featuredStock={selectedStock}
        />

        {/* 4. Market Overview Section */}
        <MarketOverview
          indices={indices}
          onSelectAsset={(item) => {
            showToast({
              type: 'info',
              title: `${item.symbol} Benchmark`,
              message: `${item.name} is currently trading at $${item.price.toFixed(2)} (${item.changePercent >= 0 ? '+' : ''}${item.changePercent}%).`,
            });
          }}
        />

        {/* 5. Stock Market Section */}
        <StockMarket
          stocks={stocks}
          watchlistSymbols={watchlistSymbols}
          onToggleWatchlist={handleToggleWatchlist}
          onTradeStock={handleTradeStock}
          onOpenStockDetail={handleOpenStockDetail}
        />

        {/* 6. Trading Terminal Section */}
        <TradingTerminal
          key={`${selectedStock?.symbol}-${tradeMode}`}
          stocks={stocks}
          selectedStock={selectedStock}
          onSelectStock={(stock) => setSelectedSymbol(stock.symbol)}
          tradeMode={tradeMode}
          userCashBalance={cashBalance}
          userHoldings={holdings}
          onExecuteTrade={handleExecuteTrade}
        />

        {/* 7. Portfolio Dashboard Section */}
        <PortfolioDashboard
          cashBalance={cashBalance}
          holdings={holdings}
          onTradeHolding={handleTradeStock}
          onDepositFunds={handleDepositFunds}
        />

        {/* 8. Watchlist Section */}
        <WatchlistSection
          stocks={stocks}
          watchlistSymbols={watchlistSymbols}
          onToggleWatchlist={handleToggleWatchlist}
          onTradeStock={handleTradeStock}
          onOpenStockDetail={handleOpenStockDetail}
          isLiveSimulationActive={isLiveSimulationActive}
          onToggleLiveSimulation={() => {
            setIsLiveSimulationActive((prev) => !prev);
            showToast({
              type: 'info',
              title: `Live Price Simulation ${!isLiveSimulationActive ? 'Enabled' : 'Paused'}`,
              message: !isLiveSimulationActive
                ? 'Market prices will now update automatically in real time.'
                : 'Real-time price ticks have been paused.',
            });
          }}
        />

        {/* 9. Market News & Insights */}
        <MarketNews news={MARKET_NEWS} />

        {/* 10. Why Choose Us Section */}
        <WhyChooseUs
          onOpenSignup={() => {
            setAuthModalMode('signup');
            setIsAuthModalOpen(true);
          }}
        />
      </main>

      {/* 11. Footer */}
      <Footer onShowToast={showToast} />

      {/* Stock Deep Dive Detail Modal */}
      <StockDetailModal
        isOpen={isStockDetailOpen}
        onClose={() => setIsStockDetailOpen(false)}
        stock={selectedStock}
        isWatchlisted={selectedStock ? watchlistSymbols.includes(selectedStock.symbol) : false}
        onToggleWatchlist={handleToggleWatchlist}
        onTrade={(stock, mode) => handleTradeStock(stock, mode)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={(userData) => {
          setUser(userData);
          showToast({
            type: 'success',
            title: `Welcome, ${userData.name}!`,
            message: `Trading account authenticated under ${userData.accountType}.`,
          });
        }}
      />

      {/* Dynamic Toast Alerts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}
