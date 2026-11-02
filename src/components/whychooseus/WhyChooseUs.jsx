import {
  ShieldCheck,
  Zap,
  Bot,
  Coins,
  TrendingUp,
  Headphones,
  Check,
  Cpu,
} from 'lucide-react';
import { PLATFORM_PERKS } from '../../data/marketData';

export default function WhyChooseUs({ onOpenSignup }) {
  const iconMap = {
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    Bot: Bot,
    Coins: Coins,
    TrendingUp: TrendingUp,
    Headphones: Headphones,
  };

  const comparisonRows = [
    { feature: 'Commission on US Equities', zevoriq: '$0.00 (Zero)', legacy: '$4.95 - $9.95 / trade' },
    { feature: 'Order Execution Latency', zevoriq: '< 15 milliseconds', legacy: '180 - 450 milliseconds' },
    { feature: 'Direct Market Access (DMA)', zevoriq: 'NYSE & NASDAQ native', legacy: 'Internalizer PFOF routing' },
    { feature: 'AI Flow & Sentiment Signal', zevoriq: 'Real-time integrated', legacy: 'Paid add-on ($200/mo)' },
    { feature: 'Multi-Asset Unified Vault', zevoriq: 'Stocks, ETFs, Crypto, Commodities', legacy: 'Fragmented separate accounts' },
    { feature: 'Support Availability', zevoriq: '24/7 Priority Trading Desk', legacy: 'Limited business hours' },
  ];

  return (
    <section id="why-us" className="py-20 relative border-t border-slate-800/80">
      <div className="w-full px-0">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Institutional Edge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why High-Volume Traders Choose Zevoriq Capital
          </h2>
          <p className="text-slate-400 text-base mt-3 leading-relaxed">
            Built from the ground up on high-frequency, memory-mapped matching engines, multi-layer cold-storage vaults, and real-time algorithmic execution.
          </p>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PLATFORM_PERKS.map((perk, index) => {
            const IconComponent = iconMap[perk.icon] || Zap;
            return (
              <div
                key={index}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800/80 relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 group-hover:bg-blue-600/20 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="glass-panel rounded-3xl border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Platform Benchmark Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              How Zevoriq Capital compares against traditional retail and legacy banking brokerages
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-sans uppercase text-[11px]">
                <tr>
                  <th className="py-4 px-5">Capability / Protocol</th>
                  <th className="py-4 px-5 text-blue-400 font-bold bg-blue-950/20">
                    Zevoriq Capital
                  </th>
                  <th className="py-4 px-5 text-slate-400">Traditional Legacy Brokers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-5 font-sans font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 font-bold text-emerald-400 bg-blue-950/20 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.zevoriq}</span>
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      <span>{row.legacy}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA Banner inside matrix */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-sm font-bold text-white">Ready to elevate your trading execution?</div>
              <div className="text-xs text-slate-400">Open an institutional or retail account in under 2 minutes.</div>
            </div>
            <button
              onClick={onOpenSignup}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition transform active:scale-95 shrink-0"
            >
              Get Started Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
