import { useState } from 'react';
import {
  TrendingUp,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import LegalModal from './LegalModal';

export default function Footer({ onShowToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [legalModalType, setLegalModalType] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setNewsletterEmail('');
    if (onShowToast) {
      onShowToast({
        id: Date.now(),
        type: 'success',
        title: 'Subscription Confirmed',
        message: 'You have been added to Zevoriq Capital Daily Market Morning Bell briefs.',
      });
    }
  };

  return (
    <>
      <footer className="bg-[#05080e] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* Brand column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl tracking-tight text-white font-['Plus_Jakarta_Sans']">
                      ZEVORIQ
                    </span>
                    <span className="font-light text-xl tracking-wider text-blue-400">
                      CAPITAL
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
                    Global Markets & Institutional Liquidity
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Next-generation trading infrastructure delivering sub-15ms order execution, algorithmic analytics, and institutional multi-asset custody for global capital allocators.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  aria-label="X / Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  aria-label="Discord Community"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Subscribe to Institutional Morning Intelligence
                </h4>
                <p className="text-slate-400 text-xs mb-4 max-w-md">
                  Pre-market order flow summaries, Federal Reserve commentary, and key earnings catalyst previews delivered to your inbox every trading day at 08:00 EST.
                </p>
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter institutional email..."
                    className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 pt-4 text-[11px] text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Core Matching Engines: Nominal (0.00% Packet Loss)</span>
              </div>
            </div>

          </div>

          {/* Middle Row: Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-slate-800/80">
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Markets & Assets
              </h5>
              <ul className="space-y-2">
                <li><a href="#markets" className="hover:text-white transition">US Major Indices</a></li>
                <li><a href="#stocks" className="hover:text-white transition">Trending Equities</a></li>
                <li><a href="#markets" className="hover:text-white transition">Spot Digital Assets</a></li>
                <li><a href="#markets" className="hover:text-white transition">Global Commodities</a></li>
                <li><a href="#stocks" className="hover:text-white transition">Semiconductor Sector</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Trading Solutions
              </h5>
              <ul className="space-y-2">
                <li><a href="#terminal" className="hover:text-white transition">Direct DMA Terminal</a></li>
                <li><a href="#portfolio" className="hover:text-white transition">Portfolio Risk Modeling</a></li>
                <li><a href="#watchlist" className="hover:text-white transition">Multi-Asset Watchlists</a></li>
                <li><a href="#terminal" className="hover:text-white transition">Smart Limit Orders</a></li>
                <li><a href="#why-us" className="hover:text-white transition">Sub-15ms Co-location</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Intelligence & Tools
              </h5>
              <ul className="space-y-2">
                <li><a href="#news" className="hover:text-white transition">Market Wire News</a></li>
                <li><a href="#news" className="hover:text-white transition">Macro Sentiment Feed</a></li>
                <li><a href="#why-us" className="hover:text-white transition">Institutional Platform</a></li>
                <li><a href="#home" className="hover:text-white transition">API Documentation</a></li>
                <li><a href="#home" className="hover:text-white transition">System Status (99.99%)</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Global Headquarters
              </h5>
              <ul className="space-y-2.5 text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>One World Trade Center, Floor 74, New York, NY 10007</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>+1 (800) 849-ZEVORIQ</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>desk@zevoriqcapital.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row: Legal Disclaimers & Copyright */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Zevoriq Capital Global Markets Inc. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setLegalModalType('privacy')}
                className="hover:text-slate-300 transition"
              >
                Privacy Safeguard
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModalType('terms')}
                className="hover:text-slate-300 transition"
              >
                Terms of Execution
              </button>
              <span>•</span>
              <button
                onClick={() => setLegalModalType('risk')}
                className="hover:text-slate-300 transition text-amber-400/90 font-semibold"
              >
                FINRA / SIPC Disclosure
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Legal Disclosures Modal */}
      <LegalModal
        isOpen={!!legalModalType}
        onClose={() => setLegalModalType(null)}
        type={legalModalType}
      />
    </>
  );
}
