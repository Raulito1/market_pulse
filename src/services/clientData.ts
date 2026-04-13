export interface VoiceOfClientData {
  callCount: number;
  questionCount: number;
  clientCount: number;
  withInvestmentContext: number;
  dateRange: string;
  sentiment: 'NEUTRAL' | 'BULLISH' | 'BEARISH';
  dominance: string;
  headline: string;
  subtext: string;
  tradeRead: {
    body: string;
    items: { label: string; description: string }[];
  };
}

export interface MetaNarrative {
  id: string;
  title: string;
  description: string;
  clientCount: number;
  mentions: number;
  tags: string[];
  trend: 'Rising' | 'Falling' | 'Static';
}

export interface ClientConcern {
  id: string;
  rank: number;
  label: string;
  mentions: number;
  change: number;
  urgency: 'high' | 'medium' | 'low';
  trend: 'Rising' | 'Falling' | 'Static';
}

export interface ActionItem {
  label: string;
  count: number;
  maxCount: number;
  sentiment: 'defensive' | 'opportunistic' | 'de-risking' | 'neutral';
  trend: 'Rising' | 'Falling' | 'Static';
}

export interface ClientQuote {
  id: string;
  text: string;
  context: string;
}

export interface WordCloudWord {
  word: string;
  weight: number; // 1-5
}

export interface CallNoteTicker {
  rank: number;
  ticker: string;
  mentions: number;
  context: string;
  quote: string;
  trend: 'Rising' | 'Falling' | 'Static';
}

export interface WhatChanged {
  id: string;
  title: string;
  description: string;
  date: string;
  tickers: string[];
}

export interface CrossSignalTrend {
  id: string;
  score: number;
  title: string;
  status: 'Rising' | 'Falling' | 'Static' | 'Surging';
  chains: string[];
  description: string;
  relatedTickers: string[];
  muniScore?: number;
}

// --- Mock Data ---

export const voiceOfClientData: VoiceOfClientData = {
  callCount: 27381,
  questionCount: 56333,
  clientCount: 32181,
  withInvestmentContext: 45882,
  dateRange: '2026-03-26 through 2026-03-31',
  sentiment: 'NEUTRAL',
  dominance: 'DOMINANT',
  headline: 'Trade tape is defensive overall, but more barbelled than one-way risk-off',
  subtext:
    'The week contained one-way T-bill and short-duration demand with selective equity buying for orders, while larger-ticket equity selling still persisted in pares of broad beta and tech by notional. The right label is not "equities-are-caught" or "equities-are-sold" — it is more a wider cyclical/diversified reallocation into longer-duration demand in interest-rate sensitive areas.',
  tradeRead: {
    body: 'The original read of defensive positioning, short-duration demand, and selective hedging will holds, but the week now reads less like one-way de-risking and more like a barbelled tape.',
    items: [
      {
        label: 'THESIS',
        description:
          'Buy participation improved modestly, but equities were net-net risk-on across the board.',
      },
      {
        label: 'SECTOR',
        description:
          'The dominant implemented trade was still short-duration cash management, not duration extension and not broad risk engagement.',
      },
      {
        label: 'NOTE',
        description:
          'Energy ticked like a source of funds rather than a chase, while international equity showed a meaningfully diversification bid.',
      },
    ],
  },
};

export const metaNarratives: MetaNarrative[] = [
  {
    id: 'mn1',
    title: 'Yield Seeking Without Taking Full Duration Risk',
    description:
      'Many clients looked for ways to earn yield in cash, money market funds, Treasuries, CDs, and municipal ladders rather than taking full equity or duration risk. The pattern points to a defensive but still return-aware posture.',
    clientCount: 2130,
    mentions: 17,
    tags: ['PUBLIC CREDIT', 'FOLLOWING'],
    trend: 'Rising',
  },
  {
    id: 'mn2',
    title: 'Selective Interest in Alternatives and Private Credit',
    description:
      'Alternatives remained a significant area of interest, especially private credit, infrastructure, structured notes, and other non-correlated opportunities. Interest was accompanied by diligence questions around liquidity, preference to wait for another manager in 2025, flagged for infrastructure investing to address global uncertainty.',
    clientCount: 1229,
    mentions: 4,
    tags: ['PUBLIC CREDIT', 'FOLLOWING'],
    trend: 'Rising',
  },
  {
    id: 'mn3',
    title: 'Flight to Safety amid Macro and Geopolitical Volatility',
    description:
      'Clients repeatedly referenced volatility, inflation, risks, and geopolitical shocks, often pairing those concerns with requests for safer allocations or slower deployment. Advisors generally recommended keeping liquidity high, staying patient, and emphasizing resilience over aggressive timing.',
    clientCount: 1112,
    mentions: 9,
    tags: ['MUNI', 'FOLLOWING'],
    trend: 'Falling',
  },
  {
    id: 'mn4',
    title: 'Tech and AI Concentration Anxiety',
    description:
      'A meaningful share of investment-relevant notes contained commentary on technology exposure, especially AI-linked names and single stock concentration. Clients wanted help balancing upside participation with concerns about overweighted valuation risk.',
    clientCount: 1041,
    mentions: 2,
    tags: ['EQUITY', 'FOLLOWING'],
    trend: 'Rising',
  },
  {
    id: 'mn5',
    title: 'Tax-Aware Portfolio Management',
    description:
      'A consistent secondary theme was using tax-loss harvesting, gain management, and gifting strategies to improve after-tax outcomes. These notes were usually linked to broader allocation decisions rather than stand-alone administrative tax questions.',
    clientCount: 768,
    mentions: 2,
    tags: ['MUNI', 'FOLLOWING'],
    trend: 'Rising',
  },
  {
    id: 'mn6',
    title: 'Active Search for Downside Protection',
    description:
      'Hedges and advisors frequently active, don\'t wait to build up exposure in downside buffers, structured notes as tools to protect downside while preserving some upside. This reflects a market posture that is cautious not fully risk-off.',
    clientCount: 534,
    mentions: 1,
    tags: ['OPTIONS', 'FOLLOWING'],
    trend: 'Static',
  },
  {
    id: 'mn7',
    title: 'Competitive Reallocation Into Better Yield Platforms',
    description:
      'A smaller but notable cohort of calls focused investment decisions to competitive comparatives, with clients willing to move assets if further above current platform. Implementation options were available elsewhere.',
    clientCount: 390,
    mentions: 1,
    tags: ['EQUITY', 'FOLLOWING'],
    trend: 'Falling',
  },
];

export const clientConcerns: ClientConcern[] = [
  { id: 'cc1', rank: 1, label: 'Yield and cash positioning', mentions: 5379, change: 3, urgency: 'medium', trend: 'Rising' },
  { id: 'cc2', rank: 2, label: 'Private credit and alternatives diligence', mentions: 2811, change: 3, urgency: 'medium', trend: 'Rising' },
  { id: 'cc3', rank: 3, label: 'Market volatility and geopolitics', mentions: 2989, change: 3, urgency: 'high', trend: 'Rising' },
  { id: 'cc4', rank: 4, label: 'Tech and AI concentration risk', mentions: 1339, change: -3, urgency: 'medium', trend: 'Falling' },
  { id: 'cc5', rank: 5, label: 'Tax-aware repositioning', mentions: 768, change: 0, urgency: 'low', trend: 'Static' },
  { id: 'cc6', rank: 6, label: 'Need for downside protection', mentions: 534, change: 1, urgency: 'high', trend: 'Rising' },
  { id: 'cc7', rank: 7, label: 'Competitive move / transferring assets', mentions: 390, change: -2, urgency: 'medium', trend: 'Falling' },
];

export const actionItems: ActionItem[] = [
  { label: 'options strategy', count: 10289, maxCount: 10289, sentiment: 'defensive', trend: 'Rising' },
  { label: 'new allocation', count: 1471, maxCount: 10289, sentiment: 'opportunistic', trend: 'Rising' },
  { label: 'cash raise', count: 1531, maxCount: 10289, sentiment: 'defensive', trend: 'Rising' },
  { label: 'liquidation', count: 1349, maxCount: 10289, sentiment: 'de-risking', trend: 'Static' },
  { label: 'hold/do nothing', count: 596, maxCount: 10289, sentiment: 'neutral', trend: 'Static' },
  { label: 'tax-loss harvest', count: 104, maxCount: 10289, sentiment: 'opportunistic', trend: 'Static' },
  { label: 'rebalance', count: 57, maxCount: 10289, sentiment: 'defensive', trend: 'Static' },
];

export const clientQuotes: ClientQuote[] = [
  {
    id: 'q1',
    text: '"Client explained the features and rates of JP Morgan\'s IODN. VP Treasury Securities review market fund (1.5% 1-day SEC yield, daily liquidity, short tax-exempt interest) and compared it to available CD rates (1 year at 2.41%, 2-year at 2.40%, short term ladders/15% up to 3.57%)."',
    context: '',
  },
  {
    id: 'q2',
    text: '"The Advisor explained the rationale behind the proposed allocations, including a $250,000 allocation to the iShares/Goldman Sachs strategy as a complement to the AI investment theme and the division of International exposure between different managers for prudence and tax."',
    context: '',
  },
  {
    id: 'q3',
    text: '"Client reviewed several investment strategies: Dimensional fund for diversified private equity secondaries exposure. Vista for technology venture capital (with a preference to wait for another manager in 2025). Squared for infrastructure investing to address global uncertainty."',
    context: '',
  },
  {
    id: 'q4',
    text: '"Mike inquired about a special OpenAI fund previously available through JP Morgan, but was informed by the Mike (Advisor) that the fund is now closed and was not accessible to clients with a net worth above $5M-$5B due to institutional qualification requirements."',
    context: '',
  },
];

export const wordCloudWords: WordCloudWord[] = [
  { word: 'options', weight: 5 },
  { word: 'cash', weight: 5 },
  { word: 'investment', weight: 5 },
  { word: 'fund', weight: 4 },
  { word: 'market', weight: 4 },
  { word: 'yield', weight: 4 },
  { word: 'money market', weight: 4 },
  { word: 'treasury', weight: 3 },
  { word: 'private credit', weight: 3 },
  { word: 'volatility', weight: 3 },
  { word: 'allocation', weight: 3 },
  { word: 'liquidation', weight: 3 },
  { word: 'AI', weight: 2 },
  { word: 'tax', weight: 2 },
  { word: 'returns', weight: 2 },
  { word: 'muni', weight: 2 },
  { word: 'gold', weight: 1 },
  { word: 'structure', weight: 1 },
  { word: 'SPX', weight: 1 },
];

export const callNoteTickers: CallNoteTicker[] = [
  {
    rank: 1,
    ticker: 'OpenAI',
    mentions: 415,
    context: 'question',
    quote: 'The Advisor referenced the private AI Scala Bot Operates Cycles for software development and commented on the possibility.',
    trend: 'Rising',
  },
  {
    rank: 2,
    ticker: 'MSFT',
    mentions: 138,
    context: 'question',
    quote: 'Microsoft (MSFT) put at a $235 strike for April 17, 2025 equity as a $93 limit in the margin account.',
    trend: 'Rising',
  },
  {
    rank: 3,
    ticker: 'AAPL',
    mentions: 125,
    context: 'question',
    quote: 'The Advisor discussed the current investment strategy highlighting opportunities in AI and the significant capital raise.',
    trend: 'Rising',
  },
  {
    rank: 4,
    ticker: 'GOOG',
    mentions: 118,
    context: 'question',
    quote: 'The Advisor discussed option pricing and decided to place a trade for Nvidia (NVDA) setting a put to sell at the price and.',
    trend: 'Rising',
  },
  {
    rank: 5,
    ticker: 'NVDA',
    mentions: 212,
    context: 'question',
    quote: 'Client and Haresh discussed option moves for May 16, 2025 options for 500 and 575 strike prices and.',
    trend: 'Rising',
  },
  {
    rank: 6,
    ticker: 'META',
    mentions: 106,
    context: 'question',
    quote: 'Carey asked for quotations in Meta options for May 16, 2025 options for 500 and 575 at the prices and.',
    trend: 'Rising',
  },
];

export const whatChangedItems: WhatChanged[] = [
  {
    id: 'wc1',
    title: 'The March 13 committee-proposal headlines likely triggered the shift from Tuesday\'s index liquidation to Wednesday\'s selective de-risking in SPY, VOO, and some mega-cap AI providers around the gap.',
    description: '',
    date: 'Mon Mar 13',
    tickers: ['SPY', 'VOO', 'QQQ'],
  },
  {
    id: 'wc2',
    title: 'Thursday\'s fade to de-correlation hopes, oil surge, and simultaneous sell-off made for a confusing inflection, showing why risk-off has now shifted from mostly reactive to Thursday all-but-certain to continue to move.',
    description: '',
    date: 'Thu Mar 14',
    tickers: ['OIL', 'VIX', 'GLD'],
  },
  {
    id: 'wc3',
    title: 'The Area withdrawal-cap story on March 15 is the clearest recent reason in private-credit concentration notes to proceed with diligence in detailed alternatives, rapidly strong, and.',
    description: '',
    date: 'Fri Mar 15',
    tickers: ['BDC', 'PRIV'],
  },
  {
    id: 'wc4',
    title: 'The Meta-Google-verdicts on March 16 likely added a fresh, new-macro reason to trim or hedge mega-cap platform exposure, catalyzing the shift in tech conversations from thematic excitement toward.',
    description: '',
    date: 'Sat Mar 16',
    tickers: ['META', 'GOOG', 'AAPL'],
  },
];

export const crossSignalTrends: CrossSignalTrend[] = [
  {
    id: 'cs1',
    score: 100,
    title: 'Flight to Safety: Short-Duration Cash Management & Treasury Demand',
    status: 'Static',
    chains: ['Strong', 'Full Show', 'Confirmed'],
    description:
      'The fixed income read should be more emphatic, not less. The cleanest implemented trade was still short-duration cash management, not duration extension and not broad risk engagement.',
    relatedTickers: ['TLT', 'SHY', 'BIL', 'SGOV'],
  },
  {
    id: 'cs2',
    score: 100,
    title: 'Geopolitical Volatility: Iran, Oil & Headline-Driven Volatility',
    status: 'Static',
    chains: ['Strong', 'Full Show', 'Confirmed'],
    description:
      'Call notes keep macro and geopolitical volatility firmly on the table, and the broader client response continues to favor caution rather than "buying the dip" as a flavor of risk engagement.',
    relatedTickers: ['USO', 'VIX', 'GLD', 'TLT'],
  },
  {
    id: 'cs3',
    score: 100,
    title: 'Private AI Allocation Frenzy (OpenAI / Anthropic)',
    status: 'Surging',
    chains: ['Strong', 'Full Show', 'Confirmed'],
    description:
      'The AI allocation read is still more active on the ticker-level count, but the broader trade read is still more around active on positions rather than being a dominant or near-dominant allocation telling.',
    relatedTickers: ['MSFT', 'GOOG', 'NVDA', 'META'],
  },
  {
    id: 'cs4',
    score: 108,
    title: 'Tech Concentration De-Risking',
    status: 'Rising',
    chains: ['Strong', 'Full Show', 'Confirmed'],
    description:
      'Tech interest was down clearly active but this macro-driven beat is that large-dollar tech selling still outweighed large-ticket tech buying on the broader tape, including single-stock to ongoing concentration.',
    relatedTickers: ['AAPL', 'MSFT', 'NVDA', 'META'],
  },
  {
    id: 'cs5',
    score: 100,
    title: 'Gold as Safe Haven & Portfolio Hedge',
    status: 'Static',
    chains: ['Strong', 'Full Show', 'Confirmed'],
    description:
      'Calls add client confirmation that gold is being discussed as a hedge and store of value, providing broader cross-signal confirmation.',
    relatedTickers: ['GLD', 'IAU', 'GDXJ'],
  },
  {
    id: 'cs6',
    score: 100,
    title: 'Yield & Income Search (Fixed Income, Private Credit, Munis)',
    status: 'Surging',
    chains: ['Strong', 'Full Show', 'Confirmed'],
    description:
      'This trend should be tightened up in emphasis — it is still a top-three topic area and should be treated as confirmation and not merely a flavor trade.',
    relatedTickers: ['MUB', 'HYG', 'LQD', 'AGG'],
  },
];

// ── What Advisors Are Asking ──────────────────────────────────────────────────

export interface AdvisorHeadline {
  text: string;
  source: string;
}

export interface AdvisorQuestion {
  id: string;
  rank: number;
  label: string;
  investmentRelevant: number;
  headlines: AdvisorHeadline[];
}

export const advisorQuestions: AdvisorQuestion[] = [
  {
    id: 'aq1', rank: 1, label: 'Yield and cash positioning', investmentRelevant: 5379,
    headlines: [
      { text: 'Global Forecasting group sees yields staying elevated through Q3 as inflation persists', source: 'Bloomberg' },
      { text: 'Area Caps Withdrawals Amid Private Credit Gating Concerns', source: 'WSJ' },
      { text: 'One studies more than 450 points...', source: 'Reuters' },
      { text: 'US Zero Coupons Against Meta...', source: 'FT' },
    ],
  },
  {
    id: 'aq2', rank: 2, label: 'Private credit and alternatives diligence', investmentRelevant: 2811,
    headlines: [
      { text: 'Private Credit Secondaries See Record Inflows Amid Liquidity Demand', source: 'Bloomberg' },
      { text: 'Infrastructure Debt Gains Traction as Institutional Alternative', source: 'FT' },
    ],
  },
  {
    id: 'aq3', rank: 3, label: 'Market volatility and geopolitics', investmentRelevant: 2989,
    headlines: [
      { text: 'Fed Minutes Reveal Split on Pace of Rate Cuts Amid Inflation Uncertainty', source: 'WSJ' },
      { text: 'Middle East Tensions Fuel Safe-Haven Demand in Gold and Treasuries', source: 'Reuters' },
    ],
  },
  {
    id: 'aq4', rank: 4, label: 'Tech and AI concentration risk', investmentRelevant: 1339,
    headlines: [
      { text: 'Magnificent 7 Valuation Premium at Decade High, Sparking Rebalance Talks', source: 'Bloomberg' },
    ],
  },
  {
    id: 'aq5', rank: 5, label: 'Tax-aware repositioning', investmentRelevant: 768,
    headlines: [],
  },
  {
    id: 'aq6', rank: 6, label: 'Need for downside protection', investmentRelevant: 534,
    headlines: [],
  },
  {
    id: 'aq7', rank: 7, label: 'Competitive move / transferring assets', investmentRelevant: 390,
    headlines: [],
  },
];

// ── Charts & Data ─────────────────────────────────────────────────────────────

export interface TrendLeaderboardItem {
  ticker: string;
  score: number;
  change: number;
}

export interface TopTickerRow {
  rank: number;
  ticker: string;
  name: string;
  role: string;
  trades: number;
  notional: string;
  direction: string;
  change: number;
  sellMentions: number;
  status: 'Static' | 'Reversed' | 'New' | 'Mixed';
  note?: string;
}

export const trendLeaderboard: TrendLeaderboardItem[] = [
  { ticker: 'TLT', score: 94, change: 12 },
  { ticker: 'SPY', score: 88, change: -5 },
  { ticker: 'GLD', score: 82, change: 8 },
  { ticker: 'QQQ', score: 76, change: -3 },
  { ticker: 'BIL', score: 71, change: 2 },
  { ticker: 'NVDA', score: 65, change: -11 },
  { ticker: 'META', score: 58, change: 4 },
  { ticker: 'HYG', score: 52, change: 6 },
];

export const topTickerRows: TopTickerRow[] = [
  {
    rank: 1, ticker: 'BOOMGOODS', name: 'JPM PREMIUM DEPOSIT – CBRM', role: 'MMF', trades: 3048,
    notional: 'N/A', direction: 'net sell', change: 0, sellMentions: 0, status: 'Static',
    note: 'Week: 3.4K orders (03-31 buy) | $327K notional (02-19 buy)',
  },
  {
    rank: 2, ticker: '48124Z893', name: 'JPMORGAN 100% US TREAS-PREM', role: 'MMF', trades: 2328,
    notional: '$548,000,000', direction: 'net sell', change: 0, sellMentions: 0, status: 'Static',
    note: 'Week: N/A',
  },
  {
    rank: 3, ticker: 'SPY', name: 'STATE STREET SPDR S&P 500 ETF (SPY)', role: 'ETF', trades: 263,
    notional: '$253,000,000', direction: 'net sell → net buy', change: 82, sellMentions: 0, status: 'Reversed',
    note: 'Week: 54Y orders (03-31 buy) | $327K notional (02-19 buy)',
  },
  {
    rank: 4, ticker: 'MSFT', name: 'MICROSOFT CORP (MSFT)', role: 'Equity', trades: 318,
    notional: '$19,200,000', direction: 'net sell', change: 130, sellMentions: 0, status: 'Reversed',
    note: 'Week: 327 orders (03-31 buy) | $15.9M notional (03-31 buy)',
  },
  {
    rank: 5, ticker: '48ZDA0375', name: 'JPMORGAN 100% US TREAS-CAP', role: 'MMF', trades: 419,
    notional: '$7,485,000,000', direction: 'mixed', change: 0, sellMentions: 0, status: 'Mixed',
    note: '',
  },
  {
    rank: 6, ticker: 'VOO', name: 'VANGUARD S&P 500 ETF (VOO)', role: 'ETF', trades: 282,
    notional: '$304,500,000', direction: 'net buy', change: 43, sellMentions: 0, status: 'New',
    note: 'Week: 385 orders (03-31 buy) | $348M notional (03-31 buy)',
  },
  {
    rank: 7, ticker: 'NVDA', name: 'NVIDIA CORP (NVDA)', role: 'Equity', trades: 208,
    notional: '$162,400,000', direction: 'mixed', change: 113, sellMentions: 0, status: 'New',
    note: '',
  },
  {
    rank: 8, ticker: 'META', name: 'META PLATFORMS INC', role: 'Equity', trades: 191,
    notional: '$54,000,000', direction: 'net buy', change: 100, sellMentions: 0, status: 'New',
    note: 'Week: 307 orders (03-31 buy) | $96.9M notional (03-31 sell)',
  },
  {
    rank: 9, ticker: '912787TE7', name: 'TREASURY BILL 8 06/26/26', role: 'T-Bill', trades: 184,
    notional: '$340,500,000', direction: 'net buy', change: 0, sellMentions: 0, status: 'New',
    note: '',
  },
  {
    rank: 10, ticker: '912787UN8', name: 'TREASURY BILL 8 09/24/26', role: 'T-Bill', trades: 182,
    notional: '$583,600,000', direction: 'net buy', change: 0, sellMentions: 0, status: 'New',
    note: '',
  },
];

// ── Trade Analysis ────────────────────────────────────────────────────────────

export interface EquityOrderItem {
  symbol: string;
  price: string;
  action: string;
  change: string;
}

export interface TradeAnalysisData {
  headline: string;
  changed: string;
  unchanged: string;
  equityOrderFlow: EquityOrderItem[];
  fixedIncomeItems: string[];
  notableOutliers: string[];
}

export const tradeAnalysisData: TradeAnalysisData = {
  headline: 'Barbelled tape strong fixed-income defense, selective equity buying by orders, but mixed-to-cautious equity notional.',
  changed: 'Equity was more constructive than the earlier session implied on ticket count, but the notional mix remains mixed and in some declines still defensive.',
  unchanged: 'Short-duration demand, defensive cash management, and selective hedging still anchor the overall interpretation.',
  equityOrderFlow: [
    { symbol: 'BRK', price: '$441', action: 'ord = $4.31 buy', change: '' },
    { symbol: 'MSFT', price: 'ord', action: '$2.07 = $4.31 buy', change: '' },
    { symbol: 'SPY', price: 'ord', action: '$1.45 = $4.31 buy', change: '' },
    { symbol: 'NVDA', price: 'ord', action: '$4.45 = $4.35 buy', change: '' },
    { symbol: 'QQQ', price: 'ord', action: '$9.45 = $4.31 buy', change: '' },
    { symbol: 'META', price: 'ord', action: '$2.42 = $4.31 sell', change: '' },
    { symbol: 'MSFT', price: 'ord', action: '$5.50 = $2.37 buy', change: '' },
  ],
  fixedIncomeItems: [
    'Many smaller clients were buying, especially in ETFs and quality growth.',
    'Fewer larger tickets were in equities, particularly in parts of broad beta and tech.',
    'Fixed income remained the cleanest implemented trade, with overwhelming T-bill and short-duration demand.',
    'Energy was one of the clearest weekly source-of-funds rotations.',
    'The best synthesis is "buy participation improved modestly" not "equities were net-risk-on across the board".',
  ],
  notableOutliers: [
    'Large-ticket investment and liquidity discussions were common, with multiple notes referencing $250,000-$25,000+ decisions tied to capital calls, concentrated positions, or lease moves.',
    'Private credit notes often paired interest in yield with explicit concern about redemption gates, fund liquidity, or sector concentration, which is a meaningful diligence signal rather than a generic alternatives mention.',
    'OpenAI appeared as a recurring focal point in capital-call and private-market discussions, standing out as a distinctive AI-related private investment theme in the dataset.',
    'A non-trivial subset of investment notes featured firm comparisons or asset movement from competitors suggesting investment decisions are intertwined with platform and service selection.',
    'The biggest conversation on execution gaps is hedging: 20-30% of investment-relevant calls referenced options overlays, while listed options trading in the trade tape faded after Tuesday.',
    'Neutral-routine tint still dominates aggregate call volume, but the highest-signal themes was disproportionately cautious: yield seeking, geopolitical safety, and concentration management.',
  ],
};

// ── Emerging Signals ──────────────────────────────────────────────────────────

export interface EmergingSignal {
  id: string;
  isNew: boolean;
  score: number;
  title: string;
  description: string;
  firstSeen: string;
}

export const emergingSignals: EmergingSignal[] = [
  {
    id: 'es1',
    isNew: true,
    score: 89,
    title: 'Energy Liquidation Funding Equity and Safe-Haven Repositioning',
    description:
      'Energy was one of the cleanest rotation signals in the dataset. Clients were not chasing the oil spike and instead appeared to be using strength to reduce energy exposure.',
    firstSeen: '2026-03-26',
  },
  {
    id: 'es2',
    isNew: true,
    score: 94,
    title: 'Private Credit & Alternatives Diligence',
    description:
      'New call notes confirm that alternatives demand is no longer just educational or question-driven. Clients are doing real diligence on private credit, infrastructure, gating, and liquidity terms.',
    firstSeen: '2026-03-25',
  },
];
