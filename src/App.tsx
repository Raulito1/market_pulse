/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeadlineTicker } from './components/HeadlineTicker';
import { MarketCard } from './components/MarketCard';
import { MainChart } from './components/MainChart';
import { InsightsPanel, Insight } from './components/InsightsPanel';
import { getMockMarketData, MarketTrend } from './services/marketData';
import {
  voiceOfClientData,
  metaNarratives,
  clientConcerns,
  actionItems,
  clientQuotes,
  wordCloudWords,
  callNoteTickers,
  whatChangedItems,
  crossSignalTrends,
  advisorQuestions,
  trendLeaderboard,
  topTickerRows,
  tradeAnalysisData,
  emergingSignals,
} from './services/clientData';
import { VoiceOfClient } from './components/VoiceOfClient';
import { MetaNarratives } from './components/MetaNarratives';
import { ClientInsights } from './components/ClientInsights';
import { CallNotes } from './components/CallNotes';
import { MarketChanges } from './components/MarketChanges';
import { WhatAdvisorsAreAsking } from './components/WhatAdvisorsAreAsking';
import { ChartsAndData } from './components/ChartsAndData';
import { TradeAnalysis } from './components/TradeAnalysis';
import { EmergingSignals } from './components/EmergingSignals';
import { motion, AnimatePresence } from 'motion/react';

async function getMarketInsights(marketData: MarketTrend[]): Promise<Omit<Insight, 'id'>[]> {
  await new Promise(resolve => setTimeout(resolve, 800));
  const top = marketData[0];
  return [
    {
      title: 'Momentum Signal',
      description: `${top?.symbol ?? 'BTC'} is showing strong upward momentum with volume 23% above its 30-day average.`,
    },
    {
      title: 'Volatility Alert',
      description: 'Market volatility has increased this week. Consider tightening stop-loss levels on open positions.',
    },
    {
      title: 'Correlation Shift',
      description: 'BTC-ETH correlation dropped to 0.62 — lowest in 90 days — suggesting diverging market narratives.',
    },
  ];
}

export default function App() {
  const [marketData, setMarketData] = useState<MarketTrend[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTC');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [compareSymbols, setCompareSymbols] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Apply theme class to html element
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Trigger transition effect
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(timer);
  }, [isDark]);

  useEffect(() => {
    // Initial data
    const data = getMockMarketData();
    setMarketData(data);
    
    // Update data every 5 seconds
    const interval = setInterval(() => {
      setMarketData(getMockMarketData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const newInsights = await getMarketInsights(marketData);
      // Add unique IDs to insights
      const insightsWithIds = newInsights.map((insight: any, index: number) => ({
        ...insight,
        id: `${Date.now()}-${index}`
      }));
      setInsights(insightsWithIds);
      setLoadingInsights(false);
    };

    if (marketData.length > 0 && insights.length === 0) {
      fetchInsights();
    }
  }, [marketData, insights.length]);

  const toggleCompare = (symbol: string) => {
    setCompareSymbols(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol) 
        : prev.length < 2 ? [...prev, symbol] : prev
    );
  };

  const handleDismissInsight = (id: string) => {
    setInsights(prev => prev.filter(insight => insight.id !== id));
  };

  const selectedTrend = marketData.find(t => t.symbol === selectedSymbol) || marketData[0];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary pointer-events-none z-[100]"
          />
        )}
      </AnimatePresence>
      <Header 
        isDark={isDark} 
        onToggleTheme={() => setIsDark(!isDark)} 
        marketData={marketData}
        onSelectSymbol={(symbol) => {
          setSelectedSymbol(symbol);
          setCompareSymbols(prev => prev.filter(s => s !== symbol));
          // Reset insights when symbol changes to trigger a new fetch
          setInsights([]);
        }}
        selectedSymbol={selectedSymbol}
      />
      <HeadlineTicker marketData={marketData} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Ticker Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {marketData.map((trend) => (
              <motion.div
                key={trend.symbol}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <MarketCard 
                  trend={trend} 
                  isSelected={selectedSymbol === trend.symbol}
                  onClick={() => {
                    setSelectedSymbol(trend.symbol);
                    // Remove from comparison if it's the new main symbol
                    setCompareSymbols(prev => prev.filter(s => s !== trend.symbol));
                    // Reset insights when symbol changes
                    setInsights([]);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedTrend && (
              <MainChart 
                trend={selectedTrend} 
                allTrends={marketData}
                compareSymbols={compareSymbols}
                onToggleCompare={toggleCompare}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel 
              insights={insights} 
              loading={loadingInsights} 
              onDismiss={handleDismissInsight}
            />
          </div>
        </div>

        {/* What Advisors Are Asking */}
        <WhatAdvisorsAreAsking
          questions={advisorQuestions}
          totalInvestmentRelevant={advisorQuestions.reduce((s, q) => s + q.investmentRelevant, 0)}
        />

        {/* Charts & Data */}
        <ChartsAndData leaderboard={trendLeaderboard} topTickers={topTickerRows} />

        {/* Trade Analysis Revision */}
        <TradeAnalysis data={tradeAnalysisData} />

        {/* Emerging Signals */}
        <EmergingSignals signals={emergingSignals} />

        {/* Voice of the Client */}
        <VoiceOfClient data={voiceOfClientData} />

        {/* Meta-Narratives */}
        <MetaNarratives narratives={metaNarratives} />

        {/* Client Concerns + Action Items */}
        <ClientInsights concerns={clientConcerns} actionItems={actionItems} />

        {/* Client Quotes + Word Cloud + Top Tickers */}
        <CallNotes quotes={clientQuotes} wordCloud={wordCloudWords} tickers={callNoteTickers} />

        {/* What Changed + Cross-Signal Trends */}
        <MarketChanges whatChanged={whatChangedItems} crossSignals={crossSignalTrends} />

        {/* Footer Stats Bar */}
        <footer className="border-t border-border pt-8 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Global Volume', value: '$142.8B', change: '+12.4%' },
              { label: 'Market Cap', value: '$2.4T', change: '-0.8%' },
              { label: 'Fear & Greed', value: '64', change: 'Greed' },
              { label: 'Volatility Index', value: '18.2', change: '+2.1%' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-mono font-bold">{stat.value}</span>
                  <span className="text-[10px] font-mono text-emerald-500">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
