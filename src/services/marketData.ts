export interface MarketTick {
  time: string;
  price: number;
  volume: number;
}

export interface MarketTrend {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: MarketTick[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

const SYMBOLS = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'TSLA', name: 'Tesla' },
];

function generateHistory(basePrice: number): MarketTick[] {
  const history: MarketTick[] = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    currentPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
    history.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return history;
}

export function getMockMarketData(): MarketTrend[] {
  return SYMBOLS.map(s => {
    const basePrice = s.symbol === 'BTC' ? 65000 : s.symbol === 'ETH' ? 3500 : 200;
    const history = generateHistory(basePrice);
    const currentPrice = history[history.length - 1].price;
    const prevPrice = history[0].price;
    const change = currentPrice - prevPrice;
    const changePercent = (change / prevPrice) * 100;

    return {
      ...s,
      price: currentPrice,
      change,
      changePercent,
      history,
      sentiment: changePercent > 1 ? 'bullish' : changePercent < -1 ? 'bearish' : 'neutral',
    };
  });
}
