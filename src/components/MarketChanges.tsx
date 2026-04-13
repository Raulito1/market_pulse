import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, Zap, Clock } from 'lucide-react';
import { WhatChanged, CrossSignalTrend } from '../services/clientData';
import { cn } from '@/lib/utils';

interface MarketChangesProps {
  whatChanged: WhatChanged[];
  crossSignals: CrossSignalTrend[];
}

type SortKey = 'score' | 'status';
type DirectionFilter = 'All' | 'Rising' | 'Falling' | 'Static' | 'Surging';

const statusColors: Record<CrossSignalTrend['status'], string> = {
  Rising: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  Falling: 'text-red-400 border-red-400/30 bg-red-400/10',
  Static: 'text-muted-foreground border-border bg-muted/20',
  Surging: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
};

const StatusBadge: React.FC<{ status: CrossSignalTrend['status'] }> = ({ status }) => (
  <span className={cn('text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border', statusColors[status])}>
    {status}
  </span>
);

export const MarketChanges: React.FC<MarketChangesProps> = ({ whatChanged, crossSignals }) => {
  const [sortBy, setSortBy] = useState<SortKey>('score');
  const [direction, setDirection] = useState<DirectionFilter>('All');

  const filtered = crossSignals
    .filter((s) => direction === 'All' || s.status === direction)
    .sort((a, b) => sortBy === 'score' ? b.score - a.score : a.status.localeCompare(b.status));

  const directions: DirectionFilter[] = ['All', 'Rising', 'Falling', 'Static', 'Surging'];

  return (
    <div className="space-y-8">
      {/* What Changed */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">What Changed Since Tuesday</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {whatChanged.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-card p-4 space-y-3 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {item.tickers.map((t) => (
                  <span key={t} className="text-[9px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
                <span className="ml-auto text-[9px] font-mono text-muted-foreground">{item.date}</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cross-Signal Trends */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Cross-Signal Trends</h2>

          {/* Controls */}
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono text-muted-foreground">Sort:</span>
            {(['score', 'status'] as SortKey[]).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={cn(
                  'text-[10px] font-mono px-2 py-0.5 rounded border transition-colors capitalize',
                  sortBy === s
                    ? 'text-primary border-primary/40 bg-primary/10'
                    : 'text-muted-foreground border-border hover:text-foreground'
                )}
              >
                {s}
              </button>
            ))}
            <span className="text-[10px] font-mono text-muted-foreground ml-2">Direction:</span>
            {directions.map((d) => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={cn(
                  'text-[10px] font-mono px-2 py-0.5 rounded border transition-colors',
                  direction === d
                    ? 'text-primary border-primary/40 bg-primary/10'
                    : 'text-muted-foreground border-border hover:text-foreground'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((signal, i) => (
            <motion.div
              key={signal.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-lg border border-border bg-card p-4 space-y-3 hover:border-primary/30 transition-colors"
            >
              {/* Score + Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-mono font-bold">{signal.score}</span>
                  {signal.muniScore && (
                    <span className="text-xs font-mono text-muted-foreground">/{signal.muniScore}</span>
                  )}
                </div>
                <StatusBadge status={signal.status} />
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold leading-snug">{signal.title}</h3>

              {/* Chain badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {signal.chains.map((chain) => (
                  <span
                    key={chain}
                    className="text-[9px] font-mono font-bold text-muted-foreground border border-border bg-muted/20 px-1.5 py-0.5 rounded"
                  >
                    {chain}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed">{signal.description}</p>

              {/* Related tickers */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-border">
                {signal.relatedTickers.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
