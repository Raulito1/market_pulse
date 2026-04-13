import React, { useState } from 'react';
import { MessageSquare, ExternalLink, AlertCircle } from 'lucide-react';
import { AdvisorQuestion } from '../services/clientData';
import { cn } from '@/lib/utils';

interface WhatAdvisorsAreAskingProps {
  questions: AdvisorQuestion[];
  totalInvestmentRelevant: number;
}

export const WhatAdvisorsAreAsking: React.FC<WhatAdvisorsAreAskingProps> = ({
  questions,
  totalInvestmentRelevant,
}) => {
  const [selectedId, setSelectedId] = useState<string>(questions[0]?.id ?? '');

  const selected = questions.find((q) => q.id === selectedId);
  const noHeadlineItems = questions.filter((q) => q.headlines.length === 0);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
          <MessageSquare className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">What Advisors Are Asking</h2>
        <span className="text-[10px] font-mono font-bold tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
          {totalInvestmentRelevant.toLocaleString()} investment-relevant
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left — Question List */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card overflow-hidden divide-y divide-border">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedId(q.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/20',
                selectedId === q.id && 'bg-primary/5 border-l-2 border-l-primary'
              )}
            >
              <span className="text-[10px] font-mono text-muted-foreground w-4 shrink-0">#{q.rank}</span>
              <span className={cn('text-sm flex-1', selectedId === q.id ? 'text-foreground font-medium' : 'text-foreground/80')}>
                {q.label}
              </span>
              {q.headlines.length === 0 ? (
                <span className="text-[9px] font-mono text-amber-400 border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                  No Headlines
                </span>
              ) : (
                <span className="text-[9px] font-mono text-blue-400 shrink-0">
                  {q.headlines.length} headline{q.headlines.length > 1 ? 's' : ''}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right — Headlines + Volume */}
        <div className="lg:col-span-2 space-y-4">
          {/* Selected headlines */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">
                Headlines — {selected?.label}
              </p>
            </div>

            {selected && selected.headlines.length > 0 ? (
              <div className="divide-y divide-border">
                {selected.headlines.map((h, i) => (
                  <div key={i} className="px-4 py-3 flex items-start gap-2 group hover:bg-muted/20 transition-colors">
                    <ExternalLink className="w-3 h-3 text-primary mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs text-foreground/80 leading-relaxed">{h.text}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{h.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 flex flex-col items-center justify-center gap-2 text-center">
                <AlertCircle className="w-5 h-5 text-muted-foreground/50" />
                <p className="text-xs font-mono text-muted-foreground">No Headlines Found</p>
              </div>
            )}
          </div>

          {/* Question Volume — mini bar chart */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Question Volume</p>
            </div>
            <div className="px-4 py-3 space-y-2">
              {questions.slice(0, 5).map((q) => {
                const max = questions[0].investmentRelevant;
                const pct = (q.investmentRelevant / max) * 100;
                return (
                  <div key={q.id} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[140px]">{q.label}</span>
                      <span className="text-[10px] font-mono text-foreground">{q.investmentRelevant.toLocaleString()}</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          selectedId === q.id ? 'bg-primary' : 'bg-primary/40'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Headlines section */}
            {noHeadlineItems.length > 0 && (
              <div className="px-4 pb-4 pt-1 border-t border-border mt-2">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  <p className="text-[10px] font-mono font-bold text-amber-400">No Headlines Found</p>
                </div>
                <ul className="space-y-1">
                  {noHeadlineItems.map((q) => (
                    <li key={q.id} className="text-[10px] font-mono text-muted-foreground">
                      · {q.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
