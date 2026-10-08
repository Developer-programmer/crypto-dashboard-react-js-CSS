import React, { useMemo, useState } from 'react'

const coins = [
  { name: 'Bitcoin', symbol: 'BTC', price: 67432.18, change: 2.34, marketCap: '1.32T', volume: '28.4B', color: '#f7931a', mark: '₿', holding: '0.845 BTC', value: '$56,981.69', spark: [25, 30, 27, 38, 32, 45, 42, 51, 46, 58, 54, 68] },
  { name: 'Ethereum', symbol: 'ETH', price: 3521.64, change: 1.82, marketCap: '422.8B', volume: '14.2B', color: '#8995f7', mark: '◆', holding: '8.24 ETH', value: '$29,018.31', spark: [23, 28, 25, 37, 32, 43, 39, 48, 44, 57, 52, 65] },
  { name: 'Solana', symbol: 'SOL', price: 178.52, change: 5.67, marketCap: '79.4B', volume: '3.1B', color: '#9c78f5', mark: '≋', holding: '42.5 SOL', value: '$7,586.05', spark: [18, 25, 21, 34, 29, 46, 37, 51, 48, 65, 57, 76] },
  { name: 'USD Coin', symbol: 'USDC', price: 1.00, change: 0.01, marketCap: '32.1B', volume: '5.8B', color: '#2775ca', mark: '$', holding: '4,250 USDC', value: '$4,250.00', spark: [50, 51, 50, 49, 50, 50, 51, 50, 50, 49, 50, 50] },
  { name: 'BNB', symbol: 'BNB', price: 598.42, change: -0.74, marketCap: '88.6B', volume: '1.2B', color: '#f3ba2f', mark: '◆', holding: '3.8 BNB', value: '$2,273.99', spark: [70, 63, 68, 55, 60, 49, 56, 44, 51, 40, 45, 37] },
  { name: 'XRP', symbol: 'XRP', price: 0.6248, change: -1.23, marketCap: '34.6B', volume: '962M', color: '#dfe6f0', mark: '✕', holding: '1,240 XRP', value: '$774.75', spark: [71, 65, 68, 54, 60, 51, 56, 43, 49, 40, 44, 34] },
]

const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL']
const chartData = {
  '1D': [31, 34, 29, 39, 37, 43, 39, 51, 48, 53, 49, 60, 57, 64, 58, 69, 65, 75, 71, 83, 78, 88, 84, 95],
  '1W': [24, 30, 26, 36, 32, 42, 39, 48, 45, 56, 51, 60, 57, 66, 62, 72, 68, 77, 73, 85, 79, 91, 86, 96],
  '1M': [20, 28, 25, 34, 30, 40, 36, 47, 43, 52, 49, 59, 53, 64, 61, 70, 66, 76, 72, 80, 75, 89, 84, 96],
  '3M': [18, 24, 22, 31, 27, 38, 35, 42, 40, 53, 47, 56, 52, 64, 59, 68, 65, 73, 69, 81, 76, 88, 84, 96],
  '1Y': [12, 19, 17, 26, 23, 32, 28, 40, 35, 47, 43, 54, 48, 62, 57, 69, 64, 76, 71, 82, 78, 90, 85, 96],
  ALL: [8, 15, 13, 22, 19, 29, 25, 36, 32, 44, 39, 51, 46, 58, 53, 66, 62, 75, 69, 81, 76, 89, 84, 96],
}

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></>,
    chart: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 6-7" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="3" /><path d="M3 9h18M16 14h2" /><path d="M6 5V4a2 2 0 0 1 2-2h10" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.3 1-1.4 2.4-1.6-.6a8 8 0 0 1-1.7 1l-.3 1.7h-2.8l-.3-1.7a8 8 0 0 1-1.7-1l-1.6.6L8 16.1l1.3-1a7 7 0 0 1 0-2l-1.3-1L9.4 10l1.6.6a8 8 0 0 1 1.7-1l.3-1.7h2.8l.3 1.7a8 8 0 0 1 1.7 1l1.6-.6 1.4 2.4-1.3 1a7 7 0 0 1-.1 1.6Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M5 17v3h14v-3" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function formatPrice(value) {
  return value < 1 ? `$${value.toFixed(4)}` : `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function getRangeLabels(range, now = new Date()) {
  if (range === '1D') return ['12:00 AM', '4:00 AM', '8:00 AM', '12:00 PM', '4:00 PM', '8:00 PM']
  const days = { '1W': 7, '1M': 30, '3M': 90, '1Y': 365, ALL: 365 * 5 }[range]
  const options = range === '1W' ? { weekday: 'short' } : range === '1Y' ? { month: 'short', year: '2-digit' } : range === 'ALL' ? { year: 'numeric' } : { month: 'short', day: 'numeric' }
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now)
    date.setDate(date.getDate() - Math.round(days * (5 - index) / 5))
    return new Intl.DateTimeFormat('en-US', options).format(date)
  })
}

function exportPortfolio() {
  const rows = [
    ['Asset', 'Symbol', 'Price (USD)', '24h Change (%)', 'Holdings', 'Value (USD)'],
    ...coins.map((coin) => [coin.name, coin.symbol, coin.price, coin.change, coin.holding, coin.value.replace(/[$,]/g, '')]),
  ]
  const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'coinly-portfolio.csv'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

function Sparkline({ values, positive }) {
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${100 - value}`).join(' ')
  return <svg className={`sparkline ${positive ? 'positive' : 'negative'}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-label={`${positive ? 'Upward' : 'Downward'} price trend`}>
    <polyline points={points} vectorEffect="non-scaling-stroke" />
  </svg>
}

function Chart({ range }) {
  const values = chartData[range]
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 1000},${180 - value * 1.45}`).join(' ')
  return <svg className="portfolio-chart" viewBox="0 0 1000 210" preserveAspectRatio="none" role="img" aria-label={`Portfolio value chart for ${range}`}>
    <defs>
      <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#b7f36b" stopOpacity=".22" />
        <stop offset="100%" stopColor="#b7f36b" stopOpacity="0" />
      </linearGradient>
    </defs>
    {[25, 70, 115, 160].map((y) => <line key={y} x1="0" y1={y} x2="1000" y2={y} className="chart-grid" />)}
    <polygon points={`0,210 ${points} 1000,210`} fill="url(#chartFill)" />
    <polyline points={points} className="chart-line" />
    <circle cx="1000" cy={180 - values[values.length - 1] * 1.45} r="4" className="chart-dot" />
  </svg>
}

function App() {
  const [range, setRange] = useState('1D')
  const [activeNav, setActiveNav] = useState('Overview')
  const [activeFilter, setActiveFilter] = useState('All assets')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState(['BTC', 'SOL'])
  const [showFavorites, setShowFavorites] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredCoins = useMemo(() => coins.filter((coin) => {
    const matchesQuery = `${coin.name} ${coin.symbol}`.toLowerCase().includes(query.toLowerCase())
    const matchesFavorite = !showFavorites || favorites.includes(coin.symbol)
    return matchesQuery && matchesFavorite
  }), [favorites, query, showFavorites])

  const toggleFavorite = (symbol) => {
    setFavorites((current) => current.includes(symbol) ? current.filter((item) => item !== symbol) : [...current, symbol])
  }

  const announce = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const navItems = [
    { label: 'Overview', icon: 'grid' },
    { label: 'Markets', icon: 'chart' },
    { label: 'Portfolio', icon: 'wallet' },
    { label: 'Transactions', icon: 'clock' },
  ]
  const total = 100884.79
  const change = range === '1D' ? 2.43 : range === '1W' ? 5.18 : range === '1M' ? 8.72 : range === '3M' ? 12.64 : range === '1Y' ? 18.33 : 25.16
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()).toUpperCase()
  const labels = getRangeLabels(range)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#overview" onClick={() => setActiveNav('Overview')}>
          <span className="brand-mark"><span /></span>
          <span>coinly<span className="brand-dot">.</span></span>
        </a>
        <div className="workspace-switcher">
          <span className="workspace-avatar">A</span>
          <span className="workspace-copy"><strong>Alex Morgan</strong><small>Personal account</small></span>
          <Icon name="chevron" size={15} />
        </div>
        <div className="nav-label">MENU</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => <button key={item.label} className={`nav-item ${activeNav === item.label ? 'active' : ''}`} onClick={() => { setActiveNav(item.label); setMobileNavOpen(false) }}>
            <Icon name={item.icon} /><span>{item.label}</span>{item.label === 'Markets' && <span className="nav-live-dot" />}
          </button>)}
        </nav>
        <div className="nav-label tools-label">PREFERENCES</div>
        <nav className="main-nav">
          <button className={`nav-item ${activeNav === 'Settings' ? 'active' : ''}`} onClick={() => { setActiveNav('Settings'); setMobileNavOpen(false) }}><Icon name="settings" /><span>Settings</span></button>
          <button className="nav-item" onClick={() => announce('Help center is coming soon.')}><span className="help-icon">?</span><span>Help center</span><span className="external-arrow">↗</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-shape shape-one" /><div className="upgrade-shape shape-two" />
            <div className="upgrade-icon">✦</div>
            <strong>Level up your<br />crypto game</strong>
            <p>Get deeper insights with Coinly Pro.</p>
            <button onClick={() => announce('Coinly Pro plans are coming soon.')}>Explore Pro <span>↗</span></button>
          </div>
          <button className="profile-button" onClick={() => announce('Account settings opened.')}>
            <span className="profile-avatar">AM</span>
            <span className="profile-copy"><strong>Alex Morgan</strong><small>Free plan</small></span>
            <Icon name="more" />
          </button>
        </div>
      </aside>

      {mobileNavOpen && <button className="mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <main className="main-content" id="overview">
        <header className="topbar">
          <button className="mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Icon name="menu" /></button>
          <div className="breadcrumb"><span>Pages</span><span className="breadcrumb-slash">/</span><strong>{activeNav}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Icon name="search" size={17} /><input aria-label="Search assets" placeholder="Search anything..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => announce('You’re all caught up!')}><Icon name="bell" size={18} /><span /></button>
            <span className="topbar-divider" />
            <button className="topbar-avatar" aria-label="Open account menu" onClick={() => announce('Account menu opened.')}>AM</button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div><p className="eyebrow">{today} <span className="live-indicator"><i /> MARKET OPEN</span></p><h1>Good morning, Alex <span className="wave">✦</span></h1><p className="welcome-subtitle">Here’s what’s happening with your portfolio today.</p></div>
            <div className="welcome-actions"><button className="button button-secondary" onClick={exportPortfolio}><Icon name="download" size={16} /> Export</button><button className="button button-primary" onClick={() => announce('Crypto purchases are not connected in this demo.')}><Icon name="plus" size={17} /> Buy crypto</button></div>
          </section>

          <section className="stat-grid" aria-label="Market summary">
            <article className="stat-card portfolio-stat">
              <div className="stat-heading"><span>Total balance</span><button className="subtle-select" onClick={() => announce('Showing your full portfolio.')}>USD <Icon name="chevron" size={13} /></button></div>
              <div className="stat-value">$100,884<span>.79</span></div>
              <div className="stat-foot"><span className="change-pill positive-pill"><Icon name="arrow" size={12} /> 2.43%</span><span className="stat-period">vs. yesterday</span></div>
              <div className="stat-decoration decoration-green" />
            </article>
            <article className="stat-card">
              <div className="stat-heading"><span>Bitcoin price</span><span className="coin-badge bitcoin-badge">₿</span></div>
              <div className="stat-value">$67,432<span>.18</span></div>
              <div className="stat-foot"><span className="change-pill positive-pill"><Icon name="arrow" size={12} /> 2.34%</span><span className="stat-period">past 24 hours</span></div>
              <Sparkline values={coins[0].spark} positive />
            </article>
            <article className="stat-card">
              <div className="stat-heading"><span>Ethereum price</span><span className="coin-badge ethereum-badge">◆</span></div>
              <div className="stat-value">$3,521<span>.64</span></div>
              <div className="stat-foot"><span className="change-pill positive-pill"><Icon name="arrow" size={12} /> 1.82%</span><span className="stat-period">past 24 hours</span></div>
              <Sparkline values={coins[1].spark} positive />
            </article>
            <article className="stat-card market-stat">
              <div className="stat-heading"><span>Market sentiment</span><span className="sentiment-icon">◉</span></div>
              <div className="sentiment-value">Greed <span>72</span></div>
              <div className="sentiment-meter"><span /></div>
              <div className="sentiment-scale"><span>Fear</span><span>Neutral</span><span>Greed</span></div>
              <span className="sentiment-caption">Investors are feeling optimistic</span>
            </article>
          </section>

          <section className="content-grid">
            <div className="main-column">
              <article className="panel portfolio-panel">
                <div className="panel-header">
                  <div><div className="panel-title-line"><h2>Portfolio overview</h2><span className="info-mark" title="Your total portfolio value over time">i</span></div><p className="panel-description">Track your balance and performance</p></div>
                  <button className="period-select" onClick={() => announce('Portfolio view: all assets.')}>All assets <Icon name="chevron" size={14} /></button>
                </div>
                <div className="portfolio-total-row"><div><strong>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong><span className="portfolio-total-label">Total portfolio value</span></div><div className="chart-change"><span className="change-pill positive-pill"><Icon name="arrow" size={12} /> {change}%</span><span>Past {range === '1D' ? '24 hours' : range}</span></div></div>
                <div className="chart-wrap"><div className="chart-y-labels"><span>$105k</span><span>$100k</span><span>$95k</span><span>$90k</span></div><Chart range={range} /></div>
                <div className="chart-bottom"><div className="chart-x-labels">{labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}</div><div className="range-tabs" role="group" aria-label="Chart time range">{ranges.map((item) => <button key={item} className={range === item ? 'selected' : ''} onClick={() => setRange(item)}>{item}</button>)}</div></div>
              </article>

              <article className="panel assets-panel">
                <div className="panel-header assets-panel-header">
                  <div><h2>Your assets</h2><p className="panel-description">Manage and track your crypto holdings</p></div>
                  <button className={`watch-filter ${showFavorites ? 'watch-filter-active' : ''}`} onClick={() => setShowFavorites((value) => !value)}><Icon name="star" size={14} /> Watchlist</button>
                </div>
                <div className="asset-filters" role="group" aria-label="Asset filters">{['All assets', 'Top gainers', 'Top losers'].map((filter) => <button key={filter} className={activeFilter === filter ? 'filter-active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
                <div className="asset-table-wrap">
                  <table className="asset-table">
                    <thead><tr><th>Asset <span>↕</span></th><th>Price</th><th>24h change</th><th>24h chart</th><th>Holdings</th><th aria-label="Actions" /></tr></thead>
                    <tbody>{filteredCoins.filter((coin) => activeFilter === 'Top gainers' ? coin.change > 0 : activeFilter === 'Top losers' ? coin.change < 0 : true).map((coin) => <tr key={coin.symbol}>
                      <td><div className="asset-name-cell"><button className={`favorite-button ${favorites.includes(coin.symbol) ? 'is-favorite' : ''}`} aria-label={`${favorites.includes(coin.symbol) ? 'Remove' : 'Add'} ${coin.name} ${favorites.includes(coin.symbol) ? 'from' : 'to'} watchlist`} onClick={() => toggleFavorite(coin.symbol)}><Icon name="star" size={13} /></button><span className="asset-coin-icon" style={{ '--coin-color': coin.color }}>{coin.mark}</span><span className="asset-name-copy"><strong>{coin.name}</strong><small>{coin.symbol}</small></span></div></td>
                      <td className="price-cell">{formatPrice(coin.price)}</td>
                      <td><span className={`table-change ${coin.change >= 0 ? 'text-positive' : 'text-negative'}`}>{coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%</span></td>
                      <td><Sparkline values={coin.spark} positive={coin.change >= 0} /></td>
                      <td><span className="holding-value">{coin.holding}</span><small className="holding-subvalue">{coin.value}</small></td>
                      <td><button className="row-action" aria-label={`More ${coin.name} actions`} onClick={() => announce(`${coin.name} asset options opened.`)}><Icon name="more" size={17} /></button></td>
                    </tr>)}</tbody>
                  </table>
                  {filteredCoins.length === 0 && <div className="empty-state">No assets match “{query}”. Try another search.</div>}
                  {filteredCoins.length > 0 && filteredCoins.filter((coin) => activeFilter === 'Top gainers' ? coin.change > 0 : activeFilter === 'Top losers' ? coin.change < 0 : true).length === 0 && <div className="empty-state">No assets in this view yet.</div>}
                </div>
                <button className="view-all-button" onClick={() => { setActiveFilter('All assets'); setShowFavorites(false); setQuery('') }}>View all assets <span>→</span></button>
              </article>
            </div>

            <aside className="right-column">
              <article className="panel watchlist-panel">
                <div className="side-panel-heading"><div><h2>My watchlist</h2><p className="panel-description">Your favorite assets</p></div><button className="icon-button small-icon-button" aria-label="Add asset to watchlist" onClick={() => announce('Search for an asset to add it to your watchlist.')}><Icon name="plus" size={17} /></button></div>
                <div className="watchlist-items">{coins.filter((coin) => favorites.includes(coin.symbol)).slice(0, 4).map((coin) => <div className="watchlist-item" key={coin.symbol}><span className="asset-coin-icon" style={{ '--coin-color': coin.color }}>{coin.mark}</span><span className="watch-copy"><strong>{coin.symbol}</strong><small>{coin.name}</small></span><span className="watch-price"><strong>{formatPrice(coin.price)}</strong><small className={coin.change >= 0 ? 'text-positive' : 'text-negative'}>{coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%</small></span><div className="watch-spark"><Sparkline values={coin.spark} positive={coin.change >= 0} /></div></div>)}</div>
                <button className="view-watchlist" onClick={() => { setShowFavorites(true); document.querySelector('.assets-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>View watchlist <span>→</span></button>
              </article>

              <article className="market-card">
                <div className="market-card-top"><span className="market-card-icon">◈</span><span className="market-live"><i /> LIVE MARKET</span></div>
                <p className="market-label">TOTAL CRYPTO MARKET CAP</p>
                <strong className="market-total">$2.48T</strong>
                <span className="market-change"><Icon name="arrow" size={13} /> 1.64% <span>past 24h</span></span>
                <div className="market-card-chart"><Sparkline values={[18, 24, 20, 37, 31, 44, 39, 52, 49, 58, 53, 69, 65, 81, 73, 88, 84, 96]} positive /></div>
                <div className="market-card-footer"><span>BTC dominance</span><strong>54.2%</strong></div>
              </article>

              <article className="panel movers-panel">
                <div className="side-panel-heading"><div><h2>Top movers</h2><p className="panel-description">Biggest changes today</p></div><button className="text-link" onClick={() => { setActiveNav('Markets'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>See all</button></div>
                <div className="mover-row"><span className="mover-icon mover-purple">S</span><span className="mover-copy"><strong>Sei</strong><small>SEI</small></span><Sparkline values={[15, 20, 17, 30, 27, 39, 34, 50, 46, 58, 53, 68]} positive /><span className="mover-gain">+12.48%</span></div>
                <div className="mover-row"><span className="mover-icon mover-blue">A</span><span className="mover-copy"><strong>Arbitrum</strong><small>ARB</small></span><Sparkline values={[17, 23, 20, 34, 29, 43, 37, 51, 47, 62, 56, 71]} positive /><span className="mover-gain">+8.32%</span></div>
                <div className="mover-row"><span className="mover-icon mover-red">A</span><span className="mover-copy"><strong>Avalanche</strong><small>AVAX</small></span><Sparkline values={[19, 24, 22, 32, 28, 39, 35, 48, 44, 58, 52, 66]} positive /><span className="mover-gain">+6.91%</span></div>
              </article>

              <div className="disclaimer"><span>◈</span> Market data is illustrative and for informational purposes only.</div>
            </aside>
          </section>
          <footer className="page-footer"><span>© 2024 Coinly, Inc.</span><span>Designed for clarity. Built for your next move.</span><button onClick={() => announce('All systems are operational.')}>All systems operational <i /></button></footer>
        </div>
      </main>
      {notice && <div className="toast" role="status"><span className="toast-check">✓</span>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" size={14} /></button></div>}
    </div>
  )
}

export default App
