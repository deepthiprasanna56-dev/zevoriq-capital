import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import Modal from '../common/Modal';

export default function TradingTerminal({
  stocks = [],
  selectedStock,
  onSelectStock,
  tradeMode = 'buy', // 'buy' or 'sell'
  userCashBalance = 45200.50,
  userHoldings = [],
  onExecuteTrade,
}) {
  const [activeTab, setActiveTab] = useState(tradeMode); // 'buy' | 'sell'
  const [orderType, setOrderType] = useState('market'); // 'market' | 'limit' | 'stop'
  const [quantity, setQuantity] = useState('10');
  const [limitPrice, setLimitPrice] = useState(selectedStock ? selectedStock.price.toFixed(2) : '100.00');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastExecutedTrade, setLastExecutedTrade] = useState(null);

  const currentPrice = selectedStock ? selectedStock.price : 0;
  const executionPrice = orderType === 'market' ? currentPrice : parseFloat(limitPrice) || currentPrice;
  const numQuantity = Math.max(1, parseInt(quantity, 10) || 0);
  const orderSubtotal = numQuantity * executionPrice;
  const regulatoryFees = (orderSubtotal * 0.0000278).toFixed(2); // SEC simulated fee cents
  const totalCost = (orderSubtotal + parseFloat(regulatoryFees)).toFixed(2);

  // Check how many shares user currently owns if selling
  const userHolding = userHoldings.find((h) => h.symbol === selectedStock?.symbol);
  const sharesOwned = userHolding ? userHolding.shares : 0;

  const canAfford = activeTab === 'buy' ? userCashBalance >= parseFloat(totalCost) : true;
  const canSellShares = activeTab === 'sell' ? sharesOwned >= numQuantity : true;

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    if (!selectedStock) return;
    if (activeTab === 'buy' && !canAfford) {
      alert('Insufficient purchasing power for this transaction.');
      return;
    }
    if (activeTab === 'sell' && !canSellShares) {
      alert(`You only hold ${sharesOwned} shares of ${selectedStock.symbol}.`);
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsConfirmModalOpen(false);

    const tradeReceipt = {
      id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      type: activeTab,
      orderType: orderType.toUpperCase(),
      shares: numQuantity,
      price: executionPrice,
      totalCost: parseFloat(totalCost),
      timestamp: new Date().toLocaleTimeString(),
    };

    setLastExecutedTrade(tradeReceipt);
    setIsSuccessModalOpen(true);

    // Confetti celebration effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: activeTab === 'buy' ? ['#10b981', '#3b82f6', '#60a5fa'] : ['#f43f5e', '#fb7185', '#38bdf8'],
      });
    } catch {
      // Ignore if unavailable
    }

    onExecuteTrade(tradeReceipt);
  };

  const handleViewUpdatedPortfolio = () => {
    setIsSuccessModalOpen(false);
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="terminal" className="py-20 relative border-t border-slate-800/80">
      <div className="w-full px-0">
        
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Smart Routing Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional Trading Desk
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Configure market, limit, or stop-loss orders with direct execution on NYSE/NASDAQ liquidity pools.
          </p>
        </div>

        {/* Main Terminal Widget */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl border border-slate-800/90 shadow-2xl p-6 sm:p-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Order Form */}
            <form onSubmit={handleOpenConfirm} className="lg:col-span-7 space-y-5">
              
              {/* Buy / Sell Tabs */}
              <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                    activeTab === 'buy'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Buy (Long)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sell')}
                  className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                    activeTab === 'sell'
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sell (Short)
                </button>
              </div>

              {/* Asset Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Traded Asset
                </label>
                <div className="relative">
                  <select
                    value={selectedStock?.symbol || 'NVDA'}
                    onChange={(e) => {
                      const found = stocks.find((s) => s.symbol === e.target.value);
                      if (found) {
                        onSelectStock(found);
                        setLimitPrice(found.price.toFixed(2));
                      }
                    }}
                    className="w-full appearance-none bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-blue-500 cursor-pointer pr-10"
                  >
                    {stocks.map((s) => (
                      <option key={s.symbol} value={s.symbol}>
                        {s.symbol} - {s.name} (${s.price.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Order Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'market', label: 'Market Order' },
                    { id: 'limit', label: 'Limit Order' },
                    { id: 'stop', label: 'Stop Loss' },
                  ].map((ot) => (
                    <button
                      key={ot.id}
                      type="button"
                      onClick={() => setOrderType(ot.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        orderType === ot.id
                          ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Price Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Shares (Qty)
                    </label>
                    {activeTab === 'sell' && (
                      <span className="text-[11px] text-slate-400">
                        Owned: <strong className="text-white font-mono">{sharesOwned}</strong>
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-mono font-bold text-sm focus:outline-none focus:border-blue-500"
                    placeholder="10"
                  />
                  {/* Quick percentage / count buttons */}
                  <div className="flex gap-1.5 mt-2">
                    {['1', '5', '10', '25', '50'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(preset)}
                        className="flex-1 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded text-[10px] font-mono font-semibold transition cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    {orderType === 'market' ? 'Execution Price (Market)' : 'Limit Price ($)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-mono">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      disabled={orderType === 'market'}
                      value={orderType === 'market' ? currentPrice.toFixed(2) : limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white font-mono font-bold text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1.5">
                    {orderType === 'market'
                      ? 'Best NBBO Bid/Ask quote applied'
                      : 'Executes at specified limit or better'}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className={`w-full py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider text-white shadow-xl transition transform active:scale-98 cursor-pointer ${
                  activeTab === 'buy'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-950/50'
                    : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-950/50'
                }`}
              >
                Review {activeTab.toUpperCase()} Order for {numQuantity} {selectedStock?.symbol}
              </button>
            </form>

            {/* Right: Real-time Order Summary Card */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Order Receipt Breakdown</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-semibold">
                    Simulated DMA
                  </span>
                </div>

                {/* Stock Highlight */}
                <div className="flex items-center justify-between py-4 border-b border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{selectedStock?.logo}</span>
                    <div>
                      <div className="font-extrabold text-white text-base leading-tight">
                        {selectedStock?.symbol}
                      </div>
                      <div className="text-xs text-slate-400">{selectedStock?.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-mono font-bold text-white">
                      ${currentPrice.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono">Real-time NBBO</div>
                  </div>
                </div>

                {/* Breakdown rows */}
                <div className="py-4 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Order Subtotal:</span>
                    <span className="text-slate-200 font-semibold">${orderSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Commission Fee:</span>
                    <span className="text-emerald-400 font-semibold">$0.00 (Zero Fee)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Regulatory SEC/FINRA:</span>
                    <span className="text-slate-200 font-semibold">${regulatoryFees}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Est. Max Slippage:</span>
                    <span className="text-slate-200 font-semibold">&lt; 0.01%</span>
                  </div>
                </div>

                {/* Total Cost Line */}
                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline font-mono">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Total Estimated:
                  </span>
                  <span className="text-xl font-extrabold text-blue-400">
                    ${totalCost}
                  </span>
                </div>
              </div>

              {/* Purchasing Power Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>Available Cash Balance:</span>
                  <span className="text-white font-mono font-bold">
                    ${userCashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {!canAfford && activeTab === 'buy' && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-[11px] mt-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Insufficient funds for order.</span>
                  </div>
                )}
                {activeTab === 'sell' && !canSellShares && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-[11px] mt-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Quantity exceeds shares held in portfolio.</span>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Order Execution"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Please verify your trade parameters before routing to the clearing exchange:
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Action:</span>
              <span className={`font-bold ${activeTab === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activeTab.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Symbol:</span>
              <span className="font-bold text-white">{selectedStock?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Quantity:</span>
              <span className="font-bold text-white">{numQuantity} shares</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Execution Price:</span>
              <span className="font-bold text-white">${executionPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800">
              <span className="text-slate-300 font-bold">Total Consideration:</span>
              <span className="font-extrabold text-blue-400 text-sm">${totalCost}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(false)}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmOrder}
              className={`flex-1 py-2.5 text-xs font-bold text-white rounded-xl transition cursor-pointer ${
                activeTab === 'buy'
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : 'bg-rose-600 hover:bg-rose-500'
              }`}
            >
              Confirm & Execute
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Order Executed Successfully"
        maxWidth="max-w-md"
      >
        {lastExecutedTrade && (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">Order Filled</h4>
              <p className="text-xs text-slate-400 mt-1">
                Ref ID: {lastExecutedTrade.id} • Filled via NYSE/NASDAQ DMA
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Trade:</span>
                <span className="text-white font-bold">
                  {lastExecutedTrade.type.toUpperCase()} {lastExecutedTrade.shares} {lastExecutedTrade.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fill Price:</span>
                <span className="text-white font-bold">${lastExecutedTrade.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Value:</span>
                <span className="text-emerald-400 font-bold">${lastExecutedTrade.totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Executed At:</span>
                <span className="text-slate-300">{lastExecutedTrade.timestamp}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleViewUpdatedPortfolio}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-lg shadow-blue-600/30"
            >
              View Updated Portfolio
            </button>
          </div>
        )}
      </Modal>

    </section>
  );
}
