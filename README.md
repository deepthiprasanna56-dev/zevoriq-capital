# Zevoriq Capital

Zevoriq Capital is a responsive, finance-themed trading dashboard built with React and Vite. Explore sample market data, manage a simulated portfolio, and try a front-end trading workflow in a polished, dark interface.

> **Demo only:** This project does not connect to a brokerage, execute real trades, or provide live market data or financial advice. Prices and account activity are simulated, and changes are kept in browser memory only. Reloading the page resets the demo.

## Features

- **Market overview** — Browse sample global indices, equities, crypto assets, and commodities with price-change indicators and sparklines.
- **Stock explorer** — Filter and browse featured stocks in grid or table view, open a detail panel, and add symbols to your watchlist.
- **Simulated trading terminal** — Try buy and sell flows with market, limit, and stop order options, quantity controls, and an order confirmation step.
- **Portfolio dashboard** — Review demo holdings, cash balance, and estimated portfolio performance; trades and demo deposits update the dashboard during the session.
- **Watchlist and price simulation** — Track selected symbols and toggle simulated price movement.
- **Market news** — Browse sample articles by category and open article details.
- **Responsive interface** — Navigate the dashboard on desktop and mobile, with symbol search available from the navigation bar (`/`).

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for trade confirmation effects

## Getting started

### Prerequisites

- Node.js and npm

### Install and run

```bash
git clone <repository-url>
cd zevoriq-capital
npm install
npm run dev
```

Open the local URL printed by Vite to use the app.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
  components/   Dashboard sections and reusable UI components
  data/         Sample market, portfolio, and news data
  App.jsx       Application state and page composition
  index.css     Tailwind import and global styles
public/         Static assets
```

## Deployment

Build the project with `npm run build`, then deploy the generated `dist/` directory to any static hosting provider that supports single-page applications. Configure the host to serve `index.html` for application routes.

## Disclaimer

Zevoriq Capital is a software demonstration, not a financial service. It is not affiliated with a broker or exchange. Do not enter real credentials or use the simulated prices, orders, or performance figures to make investment decisions.
