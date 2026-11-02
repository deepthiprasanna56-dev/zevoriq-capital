import Modal from '../common/Modal';
import { AlertTriangle } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, type = 'privacy' }) {
  const titles = {
    privacy: 'Privacy Safeguard & Data Encryption Protocol',
    terms: 'Platform Terms of Execution & Trading Rules',
    risk: 'Regulatory Risk Disclosure & FINRA / SIPC Notice',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titles[type] || 'Legal Disclosures'}>
      <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
        {type === 'privacy' && (
          <>
            <p>
              At <strong>Zevoriq Capital Global Markets Inc.</strong>, we treat client identity, trading strategies, and position structures with the highest standards of cryptographic security and institutional confidentiality.
            </p>
            <h4 className="text-white font-bold text-sm mt-3">1. Information Encryption</h4>
            <p>
              All customer telemetry, API session credentials, and transaction orders are encoded using end-to-end 256-bit AES encryption with ephemeral session rotation.
            </p>
            <h4 className="text-white font-bold text-sm mt-3">2. Zero Data Brokering</h4>
            <p>
              We never monetize, auction, or syndicate client order books or behavioral profiles to third-party high-frequency market makers or predatory algorithmic desks.
            </p>
            <h4 className="text-white font-bold text-sm mt-3">3. Multi-Party Computation</h4>
            <p>
              Digital asset keys and multi-currency vault entitlements are managed through threshold signature schemes (TSS) without single points of compromise.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <p>
              These Terms of Service govern the usage of the Zevoriq Capital trading engine, web terminal, and automated market APIs.
            </p>
            <h4 className="text-white font-bold text-sm mt-3">1. Execution Best Efforts</h4>
            <p>
              Market orders are routed with smart order routing (SOR) across registered National Best Bid and Offer (NBBO) exchanges. While latency is targeted under 15ms, market disruptions may impact execution speed.
            </p>
            <h4 className="text-white font-bold text-sm mt-3">2. Simulated Paper Trading & Live Tiers</h4>
            <p>
              Accounts marked as Pro Demo use simulated liquidity fills based on real-time market data feeds for educational and algorithmic testing purposes.
            </p>
            <h4 className="text-white font-bold text-sm mt-3">3. Prohibited Exploitative Practices</h4>
            <p>
              Users agree not to engage in spoofing, layering, wash trading, or abusive latency arbitrage against matching engines.
            </p>
          </>
        )}

        {type === 'risk' && (
          <>
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-amber-300 flex items-start gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong>High-Risk Investment Warning:</strong> Trading equities, options, digital assets, and derivatives carries substantial risk of capital loss and may not be suitable for all investors.
              </div>
            </div>
            <p>
              Securities are offered through Zevoriq Capital Securities LLC, Member FINRA / SIPC. Cash and securities accounts are protected by the Securities Investor Protection Corporation (SIPC) up to $500,000 (including $250,000 for claims for cash).
            </p>
            <p className="mt-2">
              Cryptocurrency trading is provided through Zevoriq Digital Prime LLC and is not covered by SIPC or FDIC protections. Past performance of any security or index does not guarantee future results or returns.
            </p>
          </>
        )}

        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
          >
            I Acknowledge
          </button>
        </div>
      </div>
    </Modal>
  );
}
