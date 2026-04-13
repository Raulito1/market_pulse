export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const mockNews: Record<string, NewsItem[]> = {
  BTC: [
    { id: '1', title: 'Bitcoin Breaks $90k Resistance as Institutional Interest Surges', source: 'CryptoDaily', time: '10m ago', url: '#', sentiment: 'positive' },
    { id: '2', title: 'New SEC Regulations Could Impact Bitcoin Mining Operations', source: 'MarketWatch', time: '45m ago', url: '#', sentiment: 'neutral' },
    { id: '3', title: 'Whale Alert: $500M in BTC Moved to Cold Storage', source: 'BlockchainNews', time: '2h ago', url: '#', sentiment: 'positive' },
  ],
  ETH: [
    { id: '4', title: 'Ethereum Layer 2 Adoption Reaches All-Time High', source: 'EtherWorld', time: '15m ago', url: '#', sentiment: 'positive' },
    { id: '5', title: 'Vitalik Buterin Proposes New Scalability Upgrade', source: 'TechCrunch', time: '1h ago', url: '#', sentiment: 'positive' },
  ],
  AAPL: [
    { id: '6', title: 'Apple Intelligence Rollout Drives iPhone Upgrade Cycle', source: 'Bloomberg', time: '30m ago', url: '#', sentiment: 'positive' },
    { id: '7', title: 'Supply Chain Reports Suggest Strong Demand for Vision Pro 2', source: 'Reuters', time: '3h ago', url: '#', sentiment: 'positive' },
  ],
  TSLA: [
    { id: '8', title: 'Tesla Q1 Deliveries Beat Analyst Expectations', source: 'CNBC', time: '20m ago', url: '#', sentiment: 'positive' },
    { id: '9', title: 'New Gigafactory Location Rumors Surface in Southeast Asia', source: 'InsideEVs', time: '4h ago', url: '#', sentiment: 'neutral' },
  ],
  NVDA: [
    { id: '10', title: 'NVIDIA Announces Next-Gen Blackwell Ultra Chips', source: 'TheVerge', time: '5m ago', url: '#', sentiment: 'positive' },
    { id: '11', title: 'AI Infrastructure Spending Shows No Signs of Slowing Down', source: 'Forbes', time: '2h ago', url: '#', sentiment: 'positive' },
  ],
  AMZN: [
    { id: '12', title: 'Amazon AWS Revenue Growth Accelerates on AI Demand', source: 'WSJ', time: '1h ago', url: '#', sentiment: 'positive' },
    { id: '13', title: 'New Prime Day Records Set Across Multiple Categories', source: 'RetailDive', time: '5h ago', url: '#', sentiment: 'positive' },
  ]
};

export const getStockNews = (symbol: string): NewsItem[] => {
  return mockNews[symbol] || [
    { id: 'default', title: `Market volatility expected for ${symbol} in coming sessions`, source: 'MarketPulse', time: '1h ago', url: '#', sentiment: 'neutral' }
  ];
};
