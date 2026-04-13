import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, BookOpen } from 'lucide-react';
import { MetaNarrative } from '../services/clientData';
import { cn } from '@/lib/utils';

interface MetaNarrativesProps {
  narratives: MetaNarrative[];
}

const TrendBadge: React.FC<{ trend: MetaNarrative['trend'] }> = ({ trend }) => {
  if (trend === 'Rising') return (
    <span className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 rounded">
      <TrendingUp className="w-2.5 h-2.5" /> Rising
    </span>
  );
  if (trend === 'Falling') return (
    <span className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-red-400 border border-red-400/30 bg-red-400/10 px-1.5 py-0.5 rounded">
      <TrendingDown className="w-2.5 h-2.5" /> Falling
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-muted-foreground border border-border bg-muted/20 px-1.5 py-0.5 rounded">
      <Minus className="w-2.5 h-2.5" /> Static
    </span>
  );
};

export const MetaNarratives: React.FC<MetaNarrativesProps> = ({ narratives }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Meta-Narratives</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {narratives.map((narrative, i) => (
          <motion.div
            key={narrative.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg border border-border bg-card p-4 space-y-3 hover:border-primary/40 transition-colors"
          >
            {/* Rank + Trend */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">#{i + 1}</span>
              <TrendBadge trend={narrative.trend} />
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold leading-snug">{narrative.title}</h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">{narrative.description}</p>

            {/* Footer stats */}
            <div className="pt-1 border-t border-border flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-mono font-bold">{narrative.clientCount.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">clients</span>
                </div>
                <span className="text-border">·</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-mono font-bold">{narrative.mentions}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">mentions</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {narrative.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      'text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border',
                      tag === 'PUBLIC CREDIT' && 'text-blue-400 border-blue-400/30 bg-blue-400/10',
                      tag === 'MUNI' && 'text-violet-400 border-violet-400/30 bg-violet-400/10',
                      tag === 'EQUITY' && 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
                      tag === 'OPTIONS' && 'text-amber-400 border-amber-400/30 bg-amber-400/10',
                      tag === 'FOLLOWING' && 'text-muted-foreground border-border bg-muted/20',
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
