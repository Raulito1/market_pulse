import React from 'react';
import Marquee from 'react-fast-marquee';
import { MarketTrend } from '@/src/services/marketData';

interface HeadlineTickerProps {
  marketData: MarketTrend[];
}

export const HeadlineTicker: React.FC<HeadlineTickerProps> = ({ marketData }) => {
  if (marketData.length === 0) return null;

  return (
    <div className="bg-primary/10 border-y border-border py-2 overflow-hidden">
      <Marquee speed={50} gradient={false}>
        <div className="flex items-center gap-8 whitespace-nowrap px-4">
          {marketData.map((trend) => (
            <div key={trend.symbol} className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold text-white">{trend.symbol}</span>
              <span className="text-muted-foreground">${trend.price.toLocaleString()}</span>
              <span className={trend.changePercent >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                {trend.changePercent >= 0 ? '▲' : '▼'} {Math.abs(trend.changePercent).toFixed(2)}%
              </span>
            </div>
          ))}
          <span className="text-primary/40 mx-4">|</span>
        </div>
      </Marquee>
    </div>
  );
};
