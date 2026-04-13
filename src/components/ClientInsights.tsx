import React from 'react';
import { TrendingUp, TrendingDown, Minus, Users, Activity } from 'lucide-react';
import { ClientConcern, ActionItem } from '../services/clientData';
import { cn } from '@/lib/utils';

interface ClientInsightsProps {
  concerns: ClientConcern[];
  actionItems: ActionItem[];
}

const TrendIndicator: React.FC<{ trend: 'Rising' | 'Falling' | 'Static' }> = ({ trend }) => {
  if (trend === 'Rising') return (
    <span className="flex items-center gap-0.5 text-[9px] font-mono text-emerald-400">
      <TrendingUp className="w-3 h-3" /> Rising
    </span>
  );
  if (trend === 'Falling') return (
    <span className="flex items-center gap-0.5 text-[9px] font-mono text-red-400">
      <TrendingDown className="w-3 h-3" /> Falling
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-[9px] font-mono text-muted-foreground">
      <Minus className="w-3 h-3" /> Static
    </span>
  );
};

const urgencyColors = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-muted-foreground',
};

const sentimentBarColors: Record<ActionItem['sentiment'], string> = {
  defensive: 'bg-blue-500',
  opportunistic: 'bg-emerald-500',
  'de-risking': 'bg-red-500',
  neutral: 'bg-muted-foreground',
};

const sentimentBadgeColors: Record<ActionItem['sentiment'], string> = {
  defensive: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  opportunistic: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  'de-risking': 'text-red-400 border-red-400/30 bg-red-400/10',
  neutral: 'text-muted-foreground border-border bg-muted/20',
};

export const ClientInsights: React.FC<ClientInsightsProps> = ({ concerns, actionItems }) => {
  const maxMentions = Math.max(...concerns.map((c) => c.mentions));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Client Concerns */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold tracking-tight">Client Concerns</h3>
        </div>
        <div className="divide-y divide-border">
          {concerns.map((concern) => (
            <div key={concern.id} className="px-5 py-3 flex items-center gap-3 group hover:bg-muted/20 transition-colors">
              {/* Rank */}
              <span className="text-[10px] font-mono text-muted-foreground w-4 shrink-0">
                #{concern.rank}
              </span>

              {/* Bar + Label */}
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium truncate">{concern.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', urgencyColors[concern.urgency])}
                      style={{ width: `${(concern.mentions / maxMentions) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    {concern.mentions.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Change + Trend */}
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <span className={cn(
                  'text-[10px] font-mono font-bold',
                  concern.change > 0 ? 'text-emerald-400' : concern.change < 0 ? 'text-red-400' : 'text-muted-foreground'
                )}>
                  {concern.change > 0 ? '+' : ''}{concern.change}
                </span>
                <TrendIndicator trend={concern.trend} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Client Sentiment / Action Items */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold tracking-tight">Action Items</h3>
        </div>
        <div className="px-5 py-4 space-y-4">
          {actionItems.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border',
                    sentimentBadgeColors[item.sentiment]
                  )}>
                    {item.sentiment}
                  </span>
                  <TrendIndicator trend={item.trend} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', sentimentBarColors[item.sentiment])}
                    style={{ width: `${(item.count / item.maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground w-12 text-right shrink-0">
                  {item.count.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
