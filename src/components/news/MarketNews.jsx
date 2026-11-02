import { useState } from 'react';
import {
  Newspaper,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Modal from '../common/Modal';

export default function MarketNews({ news = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Macro & Fed', 'AI & Tech', 'Crypto & Digital Assets', 'Commodities & Energy'];

  const filteredNews = activeFilter === 'All'
    ? news
    : news.filter((n) => n.category.includes(activeFilter));

  return (
    <section id="news" className="py-20 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Institutional Research & News</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Market Intelligence Wire
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Curated macroeconomic disclosures, earnings reports, semiconductor capex updates, and regulatory developments.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-slate-800/80 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-blue-900/80 text-blue-300 border border-blue-500/30 backdrop-blur-md">
                    {article.category}
                  </span>

                  {/* Sentiment Badge */}
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md ${
                      article.sentiment === 'Bullish'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {article.sentiment}
                  </span>
                </div>

                {/* Article Details */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] font-mono mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.time}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {article.headline}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer: Source and Read More button */}
              <div className="p-5 pt-0 border-t border-slate-800/60 mt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 truncate max-w-[130px] font-medium">
                  {article.source}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticle(article);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition cursor-pointer"
                >
                  <span>Read Full</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={
            <span className="flex items-center gap-2 text-sm text-blue-400 font-mono">
              <Sparkles className="w-4 h-4" />
              <span>{selectedArticle.category}</span>
            </span>
          }
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {selectedArticle.headline}
            </h2>

            <div className="flex items-center justify-between py-2 border-y border-slate-800 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span>By {selectedArticle.source}</span>
                <span>•</span>
                <span>{selectedArticle.time}</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded font-bold ${
                  selectedArticle.sentiment === 'Bullish'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}
              >
                {selectedArticle.sentiment} Sentiment
              </span>
            </div>

            <img
              src={selectedArticle.image}
              alt=""
              className="w-full h-56 object-cover rounded-xl border border-slate-800"
            />

            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-200">{selectedArticle.summary}</p>
              <p>{selectedArticle.fullContent}</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-300">
              <strong className="block text-white mb-1">Key Desk Takeaway:</strong>
              Liquidity conditions favor structured risk allocations across benchmark technology semiconductors and sovereign duration instruments.
            </div>

            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Close Briefing
            </button>
          </div>
        </Modal>
      )}

    </section>
  );
}
