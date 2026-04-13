import React from 'react';
import { GitCommitHorizontal, ArrowUpDown, AlertTriangle } from 'lucide-react';
import { TradeAnalysisData } from '../services/clientData';

interface TradeAnalysisProps {
  data: TradeAnalysisData;
}

export const TradeAnalysis: React.FC<TradeAnalysisProps> = ({ data }) => {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
          <ArrowUpDown className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Trade Analysis Revision</h2>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
        {/* Headline */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-sm font-semibold leading-snug text-foreground">{data.headline}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex gap-2">
              <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-1.5 py-0.5 rounded shrink-0 h-fit mt-0.5">
                Changed
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">{data.changed}</p>
            </div>
            <div className="flex gap-2">
              <span className="text-[9px] font-mono font-bold text-muted-foreground bg-muted/20 border border-border px-1.5 py-0.5 rounded shrink-0 h-fit mt-0.5">
                Unchanged
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">{data.unchanged}</p>
            </div>
          </div>
        </div>

        {/* Top Equity Order Flow */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
            Top Equity Order Flow
          </p>
          <div className="flex flex-wrap gap-2">
            {data.equityOrderFlow.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-[10px] font-mono bg-muted/20 border border-border rounded px-2 py-1"
              >
                <span className="font-bold text-primary">{item.symbol}</span>
                <span className="text-muted-foreground">{item.price}</span>
                <span className="text-foreground/70">{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Income */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <GitCommitHorizontal className="w-3.5 h-3.5 text-blue-400" />
            <p className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase">
              Fixed Income — Very strong short-duration safety and cash-management demand.
            </p>
          </div>
          <ul className="space-y-2">
            {data.fixedIncomeItems.map((item, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                <span className="text-primary shrink-0 mt-0.5">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Notable Outliers */}
        <div className="px-5 py-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <p className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              Notable Outliers
            </p>
          </div>
          <div className="space-y-3">
            {data.notableOutliers.map((item, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed border-l-2 border-border pl-3 hover:border-primary/50 transition-colors">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
