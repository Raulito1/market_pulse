import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Mic } from 'lucide-react';
import { VoiceOfClientData } from '../services/clientData';
import { cn } from '@/lib/utils';

interface VoiceOfClientProps {
  data: VoiceOfClientData;
}

export const VoiceOfClient: React.FC<VoiceOfClientProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(true);

  const sentimentColors = {
    NEUTRAL: 'text-violet-400 border-violet-400/40 bg-violet-400/10',
    BULLISH: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    BEARISH: 'text-red-400 border-red-400/40 bg-red-400/10',
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
            <Mic className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Voice of the Client</h2>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border border-border bg-card space-y-0 overflow-hidden">
              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 border-b border-border bg-muted/30">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-mono font-bold">{data.callCount.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-mono">calls analyzed</span>
                </div>
                <span className="text-border hidden sm:block">·</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-mono font-bold">{data.clientCount.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-mono">clients</span>
                </div>
                <span className="text-border hidden sm:block">·</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-mono font-bold">{data.withInvestmentContext.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground font-mono">with investment context</span>
                </div>
                <span className="ml-auto text-xs font-mono text-muted-foreground">{data.dateRange}</span>
              </div>

              {/* Sentiment Badge */}
              <div className="px-5 pt-4 pb-2 flex items-center gap-2">
                <span className={cn(
                  'text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border',
                  sentimentColors[data.sentiment]
                )}>
                  {data.sentiment}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border text-muted-foreground border-border bg-muted/20">
                  {data.dominance}
                </span>
              </div>

              {/* Headline */}
              <div className="px-5 pb-3">
                <h3 className="text-lg font-bold leading-snug">{data.headline}</h3>
              </div>

              {/* Subtext */}
              <div className="px-5 pb-5 border-b border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">{data.subtext}</p>
              </div>

              {/* Trade Read Update */}
              <div className="px-5 py-4 space-y-4">
                <p className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">Trade Read Update</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.tradeRead.body}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {data.tradeRead.items.map((item) => (
                    <div key={item.label} className="space-y-1.5 p-3 rounded-md bg-muted/20 border border-border">
                      <p className="text-[9px] font-mono font-bold tracking-widest text-muted-foreground uppercase">{item.label}</p>
                      <p className="text-xs text-foreground/80 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
