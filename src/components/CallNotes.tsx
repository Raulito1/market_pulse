import React from 'react';
import { TrendingUp, Quote, Cloud, BarChart2 } from 'lucide-react';
import { ClientQuote, WordCloudWord, CallNoteTicker } from '../services/clientData';
import { cn } from '@/lib/utils';

interface CallNotesProps {
  quotes: ClientQuote[];
  wordCloud: WordCloudWord[];
  tickers: CallNoteTicker[];
}

const wordSizeClasses = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
const wordOpacityClasses = ['opacity-50', 'opacity-60', 'opacity-70', 'opacity-85', 'opacity-100'];

export const CallNotes: React.FC<CallNotesProps> = ({ quotes, wordCloud, tickers }) => {
  return (
    <div className="space-y-6">
      {/* Client Quotes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold tracking-tight">Client Quotes</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quotes.map((quote, i) => (
            <div
              key={quote.id}
              className="rounded-lg border border-border bg-card p-4 space-y-2 hover:border-primary/30 transition-colors"
            >
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Quote {i + 1}</span>
              <p className="text-xs text-foreground/80 leading-relaxed italic">{quote.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Word Cloud + Top Tickers — side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Word Cloud */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Cloud className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold tracking-tight">Call Notes Word Cloud</h3>
          </div>
          <div className="px-5 py-5 flex flex-wrap gap-x-3 gap-y-2 items-center justify-center min-h-[140px]">
            {wordCloud.map(({ word, weight }) => (
              <span
                key={word}
                className={cn(
                  'font-mono font-bold text-primary transition-colors cursor-default hover:text-primary/80',
                  wordSizeClasses[weight - 1],
                  wordOpacityClasses[weight - 1],
                )}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Top Call Note Tickers */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <BarChart2 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold tracking-tight">Top Call Note Tickers</h3>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground">by Mention Frequency</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left px-4 py-2 text-[10px] font-mono text-muted-foreground font-normal">#</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono text-muted-foreground font-normal">Ticker</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono text-muted-foreground font-normal">Mentions</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono text-muted-foreground font-normal">Context</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono text-muted-foreground font-normal">Quote</th>
                  <th className="text-right px-4 py-2 text-[10px] font-mono text-muted-foreground font-normal">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tickers.map((ticker) => (
                  <tr key={ticker.rank} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-muted-foreground">{ticker.rank}</td>
                    <td className="px-4 py-2.5 font-mono font-bold text-primary">{ticker.ticker}</td>
                    <td className="px-4 py-2.5 font-mono">{ticker.mentions}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{ticker.context}</td>
                    <td className="px-4 py-2.5 text-muted-foreground max-w-[200px] truncate">{ticker.quote}</td>
                    <td className="px-4 py-2.5 text-right">
                      <span className="flex items-center justify-end gap-1 text-emerald-400 font-mono text-[10px] font-bold">
                        <TrendingUp className="w-3 h-3" />
                        {ticker.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
