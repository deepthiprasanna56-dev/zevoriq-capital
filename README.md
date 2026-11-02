# Zevoriq Capital — Next-Gen Trading & Investment Platform

![Zevoriq Capital Platform Preview](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80)

> A modern, high-performance, responsive Trading & Investment Web Platform built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**. Designed to provide traders and institutional capital allocators with real-time market data, direct DMA execution simulations, portfolio tracking, and interactive depth analytics.

---

## 🌟 Key Features & Sections

### 1. Dynamic Navigation & Market Bar
- **Brand Identity**: Futuristic gradient logo with live status indicator.
- **Live Market Clock**: Real-time EST clock indicator tracking market sessions.
- **Instant Search Modal**: Global hotkey (`/`) search across all equity symbols and company profiles.
- **Currency Switcher**: Real-time multi-currency support (`USD $`, `EUR €`, `GBP £`, `INR ₹`).
- **Institutional Authentication**: Interactive Auth Modal with one-click demo credentials for retail traders and institutional desks.
- **Mobile Responsive Drawer**: Smooth slide-over navigation menu for mobile devices.

### 2. Live Marquee Ticker Tape
- Infinite smooth CSS ticker marquee streaming real-time prices for major global indices (S&P 500, NASDAQ, Dow Jones, FTSE 100, Nikkei 225, Bitcoin, Ethereum, Gold, Crude Oil) and popular equities.

### 3. Hero Section
- High-impact headline with neon gradient typography and value propositions.
- **Interactive Live Hero Widget**: Real-time price fluctuations, active order book depth preview (Top Bid / Ask), timeframe buttons (`1D`, `1W`, `1M`, `1Y`), and quick Buy/Sell triggers.
- Institutional trust badges: Zero Commission, SIPC Protection (\$500,000), Sub-15ms Execution.

### 4. Global Market Overview
- Comprehensive multi-asset index cards with 24h high/low and volume metrics.
- Up/Down indicators and crisp SVG Sparkline area charts.
- Category filters: **All Markets**, **US Equities**, **Global Indices**, **Crypto Assets**, **Commodities**.

### 5. Stock Market Section
- Curated list of popular & trending equities (`NVDA`, `AAPL`, `MSFT`, `TSLA`, `AMZN`, `GOOGL`, `META`, `AMD`, `PLTR`, `COIN`, `JPM`, `LLY`).
- **Dual View Modes**: Switch between sleek **Grid Cards View** and institutional **Pro Data Table View**.
- Filter by sector pills (*Semiconductors*, *Consumer Electronics*, *Cloud AI*, *Clean Tech*, *Banking*).
- Interactive Sparklines, Star-to-Watchlist quick toggles, and Direct Buy/Sell action buttons.

### 6. Stock Deep-Dive Analytics Modal
- Full company intelligence breakdown.
- Multi-timeframe trend curve (`1D`, `1W`, `1M`, `1Y`).
- Fundamental key statistics: Market Cap, P/E Ratio, Analyst Consensus meter, Target Price.

### 7. Institutional Trading Terminal
- Order type switching: **Market Order**, **Limit Order**, **Stop Loss**.
- Quantity presets (`1`, `5`, `10`, `25`, `50`) with instant subtotal and regulatory fee calculations.
- Available cash purchasing power validation and position checks.
- Order confirmation modal with risk review.
- Success confirmation dialogue with celebratory confetti animation (`canvas-confetti`) and instant portfolio sync.

### 8. Real-Time Portfolio Dashboard
- **Key Performance KPIs**:
  - Total Portfolio Value (dynamically updated on trades)
  - Total Unrealized Profit/Loss (\$) and ROI (%)
  - Today's Session Change
  - Available Liquid Purchasing Power
- **Interactive Performance Chart**: Responsive SVG area curve with hover tooltips displaying historical valuation points.
- **Active Holdings Table**: Breakdown of owned shares, cost basis, current market value, unrealized P&L, and quick liquidate / buy more actions.
- **Deposit Demo Funds Action**: Add \$10,000 in simulated liquidity with 1 click.

### 9. Personalized Watchlist
- Pin / unpin any security with one click.
- **Live Price Simulation Engine**: Toggle live price ticking ON/OFF to simulate real-time market oscillations with green/red flashes.
- Quick symbol add selector dropdown.

### 10. Market News Wire & Research
- Curated macroeconomic, AI technology, crypto ETF, and energy reports.
- Sentiment tags (*Bullish*, *Neutral*, *Bearish*) and read time indicators.
- **Read More Interactive Reader**: Full article modal with desk takeaways and source citations.

### 11. Platform Benchmark Matrix (Why Choose Us)
- Comparison table highlighting Zevoriq Capital advantages vs traditional legacy retail brokers (Execution Latency, DMA Routing, AI Sentiment, Zero Commission).

### 12. Institutional Footer & Legal Disclosures
- Newsletter subscription form with automated confirmation toasts.
- Interactive **Legal Disclosure Modal** with tabs for:
  - Privacy Safeguard & Data Encryption Protocol
  - Platform Terms of Execution
  - FINRA / SIPC Regulatory Notice

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **FX / Feedback**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (tested with Node.js 20+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/zevoriq-capital.git

# Navigate into the project folder
cd zevoriq-capital

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Linting

```bash
# Run production build
npm run build

# Run ESLint validation
npm run lint

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import the `zevoriq-capital` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Click **Deploy Site**.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
