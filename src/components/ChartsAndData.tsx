import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, Trophy } from 'lucide-react';
import { TrendLeaderboardItem, TopTickerRow } from '../services/clientData';
import { cn } from '@/lib/utils';

interface ChartsAndDataProps {
  leaderboard: TrendLeaderboardItem[];
  topTickers: TopTickerRow[];
}

const statusStyles: Record<TopTickerRow['status'], string> = {
  Static: 'text-muted-foreground border-border bg-muted/20',
  Reversed: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  New: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  Mixed: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
};

export const ChartsAndData: React.FC<ChartsAndDataProps> = ({ leaderboard, topTickers }) => {
  const maxScore = Math.max(...leaderboard.map((l) => l.score));

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 border border-primary/30">
          <BarChart2 className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Charts &amp; Data</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Trend Score Leaderboard */}
        <div className="lg:col-span-1 rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">
              Trend Score Leaderboard
            </p>
          </div>
          <div className="px-4 py-3 space-y-3">
            {leaderboard.map((item, i) => (
              <div key={item.ticker} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono text-muted-foreground w-3">{i + 1}</span>
                    <span className="text-xs font-mono font-bold text-primary">{item.ticker}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold">{item.score}</span>
                    <span className={cn(
                      'flex items-center gap-0.5 text-[9px] font-mono',
                      item.change > 0 ? 'text-emerald-400' : item.change < 0 ? 'text-red-400' : 'text-muted-foreground'
                    )}>
                      {item.change > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : item.change < 0 ? <TrendingDown className="w-2.5 h-2.5" /> : null}
                      {item.change > 0 ? '+' : ''}{item.change}
                    </span>
                  </div>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-primary/80' : 'bg-primary/50'
                    )}
                    style={{ width: `${(item.score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tickers Table */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <p className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase">Top Tickers</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {['#', 'Ticker', 'Role', 'Trades', 'Notional', 'Direction', 'Change', 'Sell Mentions'].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-[9px] font-mono text-muted-foreground font-normal whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topTickers.map((row) => (
                  <React.Fragment key={row.rank}>
                    <tr className="hover:bg-muted/10 transition-colors border-b border-border/50">
                      <td className="px-3 py-2 font-mono text-muted-foreground">{row.rank}</td>
                      <td className="px-3 py-2">
                        <div>
                          <span className="font-mono font-bold text-primary">{row.ticker}</span>
                          <p className="text-[9px] text-muted-foreground leading-none mt-0.5 max-w-[140px] truncate">{row.name}</p>
                        </div>
                      </td>
                      <td className="px-3 py-2 font-mono text-muted-foreground">{row.role}</td>
                      <td className="px-3 py-2 font-mono">{row.trades.toLocaleString()}</td>
                      <td className="px-3 py-2 font-mono text-xs">{row.notional}</td>
                      <td className="px-3 py-2 text-[10px] text-muted-foreground whitespace-nowrap">{row.direction}</td>
                      <td className="px-3 py-2 font-mono">
                        {row.change > 0 ? (
                          <span className="text-emerald-400">+{row.change}</span>
                        ) : row.change < 0 ? (
                          <span className="text-red-400">{row.change}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        <span className={cn(
                          'text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border',
                          statusStyles[row.status]
                        )}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                    {row.note && (
                      <tr className="border-b border-border/30 bg-muted/5">
                        <td />
                        <td colSpan={7} className="px-3 pb-2 pt-0">
                          <p className="text-[9px] font-mono text-muted-foreground/70">{row.note}</p>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
